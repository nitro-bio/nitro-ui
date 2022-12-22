import { useCircularSelectionRect } from "@Ariadne/hooks/useSelection";
import { useEffect, useRef, useState } from "react";
import { getIndexes } from "..";
import {
  AnnotatedSequence,
  Annotation,
  AriadneSelection,
  AriadneSearch,
} from "../types";
import CircularAnnotationGutter from "./CircularAnnotations";
import CircularIndex from "./CircularIndex";
import { findIndexFromAngle, genArc } from "./circularUtils";

export interface Props {
  sequence: AnnotatedSequence;
  annotations: Annotation[];
  search: AriadneSearch | null;
  resetSearch: () => void;
}

const SVG_SIZE = 300;
const SVG_PADDING = 30;
export const CircularViewer = ({
  sequence,
  annotations,
  search,
  resetSearch,
}: Props) => {
  const { cx, cy, sizeX, sizeY, radius } = {
    cx: SVG_SIZE / 2,
    cy: SVG_SIZE / 2,
    sizeX: SVG_SIZE,
    sizeY: SVG_SIZE,
    radius: (SVG_SIZE - SVG_PADDING) / 2,
  };
  const [selection, setSelection] = useState<AriadneSelection | null>(null);

  const [selections, setSelections] = useState<AriadneSelection[]>([]);

  const selectionRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (
      search &&
      sequence.raw.includes(search.searchString.toUpperCase()) &&
      search.strand === "main"
    ) {
      setSelection(null);
      const result = getIndexes(sequence.raw, search.searchString, false);
      setSelections(result);
    } else if (search?.strand === "complement") {
      let splitString = sequence.raw.split("");
      splitString = splitString.reverse();
      const basePairMap: any = { A: "T", T: "A", C: "G", G: "C" };
      const complement = splitString.map((base: string) => {
        return basePairMap[base];
      });

      const complementString = complement.join("");

      const result = getIndexes(complementString, search.searchString, true);

      setSelections(result);
    } else if (search?.strand === "both") {
      const forwardResult = getIndexes(
        sequence.raw,
        search.searchString,
        false
      );

      let splitString = sequence.raw.split("");
      splitString = splitString.reverse();
      const basePairMap: any = { A: "T", T: "A", C: "G", G: "C" };
      const complement = splitString.map((base: string) => {
        return basePairMap[base];
      });

      const complementString = complement.join("");

      const reverseResult = getIndexes(
        complementString,
        search.searchString,
        true
      );
      console.log(reverseResult);

      const result = forwardResult.concat(reverseResult);

      setSelections(result);
    } else {
      setSelections([]);
    }
  }, [search]);

  const getSelections = () => {
    return selections.map((selection: AriadneSelection, index: number) => {
      const { start, end, direction } = selection;
      if (start === null || end === null) {
        return null;
      }
      const center = { x: cx, y: cy };
      const innerRadius = radius - 10;
      const outerRadius = radius;
      let length = -1;
      if (end > start) {
        if (direction === "forward") {
          length = end - start;
        } else {
          length = sequence.annotated.length - end + start;
        }
      } else {
        if (direction === "forward") {
          length = sequence.annotated.length - start + end;
        } else {
          length = start - end;
        }
      }

      const offset = direction === "forward" ? start : end;
      const seqLength = sequence.annotated.length;

      const arc = genArc({
        center,
        innerRadius,
        largeArc: length > seqLength / 2 ? true : false,
        length,
        offset,
        outerRadius,
        seqLength,
        direction,
      });
      return (
        <path
          key={index}
          d={arc}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    });
  };

  return (
    <div>
      <div className="font-mono flex select-none items-center justify-center font-thin text-brand-800 dark:text-brand-600">
        <svg
          ref={selectionRef}
          viewBox={`0 0 ${sizeX} ${sizeY}`}
          xmlns="http://www.w3.org/2000/svg"
          fontFamily="inherit"
          fontSize="inherit"
          fontWeight="inherit"
          className={`stroke-current`}
          width={sizeX}
          height={sizeY}
        >
          <CircularIndex cx={cx} cy={cy} radius={radius} sequence={sequence} />
          <CircularAnnotationGutter
            sequence={sequence}
            annotations={annotations}
            cx={cx}
            cy={cy}
            radius={radius}
          />

          {getSelections()}
          <CircularSelection
            sequence={sequence}
            selection={selection}
            cx={cx}
            cy={cy}
            radius={radius}
            selectionRef={selectionRef}
            setSelection={setSelection}
            setSelections={() => setSelections([])}
          />

          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            fill="currentColor"
            stroke="currentColor"
            alignmentBaseline="middle"
            fontSize={"1rem"}
          >
            {sequence.annotated.length} bp
          </text>
        </svg>
      </div>
    </div>
  );
};

const CircularSelection = ({
  radius,
  cx,
  cy,
  selection,
  selectionRef,
  setSelection,
  setSelections,
  sequence,
}: {
  radius: number;

  cx: number;
  cy: number;
  selectionRef: React.RefObject<SVGSVGElement>;
  setSelection: (selection: AriadneSelection) => void;
  selection: AriadneSelection | null;
  setSelections: () => void;
  sequence: AnnotatedSequence;
}) => {
  /* Collect internal selection data and propogate up */
  const {
    start: internalSelectionStart,
    end: internalSelectionEnd,
    direction: internalDirection,
  } = useCircularSelectionRect(selectionRef);
  useEffect(
    function propagateSelectionUp() {
      if (
        selectionRef.current &&
        internalSelectionStart &&
        internalSelectionEnd &&
        internalDirection
      ) {
        setSelections();
        const start = findIndexFromAngle({
          angle: internalSelectionStart,
          seqLength: sequence.annotated.length,
        });
        const end = findIndexFromAngle({
          angle: internalSelectionEnd,
          seqLength: sequence.annotated.length,
        });
        let prevLength = selection
          ? Math.abs(selection.end - selection.start)
          : 0;
        let newLength = Math.abs(end - start);
        if (internalDirection === "counterclockwise" && selection) {
          prevLength =
            selection.end + sequence.annotated.length - selection.start;
          newLength = end + sequence.annotated.length - start;
        }
        const deltaLength = Math.abs(prevLength - newLength);
        const deltaThreshold = Math.max(0.7 * sequence.annotated.length, 10);

        if (deltaLength > deltaThreshold && selection) {
          setSelection({
            start,
            end,
            direction: selection?.direction,
          });

          return;
        }
        setSelection({
          start,
          end,
          direction: internalDirection === "clockwise" ? "forward" : "reverse",
        });
      }
    },
    [internalSelectionStart, internalSelectionEnd]
  );

  if (selection === null) {
    return null;
  }

  /* Display selection data that has trickled down */

  const { start, end, direction } = selection;
  if (start === null || end === null) {
    return null;
  }
  const center = { x: cx, y: cy };
  const innerRadius = radius;
  const outerRadius = radius + 10;
  let length = -1;
  if (end > start) {
    if (direction === "forward") {
      length = end - start;
    } else {
      length = sequence.annotated.length - end + start;
    }
  } else {
    if (direction === "forward") {
      length = sequence.annotated.length - start + end;
    } else {
      length = start - end;
    }
  }

  const offset = direction === "forward" ? start : end;
  const seqLength = sequence.annotated.length;
  /* console.table({ start, end, direction, length, offset, seqLength }); */

  const arc = genArc({
    center,
    innerRadius,
    largeArc: length > seqLength / 2 ? true : false,
    length,
    offset,
    outerRadius,
    seqLength,
    direction,
  });
  return (
    <g>
      <path
        d={arc}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};
