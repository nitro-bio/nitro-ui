import { useCircularSelectionRect } from "@Ariadne/hooks/useSelection";
import { useEffect, useRef, useState } from "react";
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
  size: number;
  annotations: Annotation[];
  search: AriadneSearch | null;
  resetSearch: () => void;
}

export const CircularViewer = ({
  sequence,
  size,
  annotations,
  search,
  resetSearch,
}: Props) => {
  const { cx, cy, sizeX, sizeY, radius } = {
    cx: size / 2,
    cy: size / 2,
    sizeX: size,
    sizeY: size,
    radius: (size - 10) / 2,
  };
  const [scrollVal, setScrollVal] = useState(0);

  const [selection, setSelection] = useState<AriadneSelection | null>(null);

  const [selections, setSelections] = useState<AriadneSelection[]>([]);

  const handleScroll = (e: React.WheelEvent<SVGSVGElement>) => {
    /* smooth out scroll value */

    setScrollVal(Math.round(e.deltaY / 10) + scrollVal);
  };

  const selectionRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (
      search &&
      sequence.raw.includes(search.searchString.toUpperCase()) &&
      search.strand === "main"
    ) {
      setSelection(null);
      const indices = [];
      let index = 0;
      let startIndex = 0;

      while (
        (index = sequence.raw.indexOf(
          search.searchString.toUpperCase(),
          startIndex
        )) > -1
      ) {
        indices.push(index);
        startIndex = index + search.searchString.length;
      }

      const sec: any = [];
      indices.forEach((item: number, index: number) => {
        if (index <= 24) {
          const start = item;
          const end = start + search.searchString.length - 1;

          sec.push({
            start: start,
            end: end,
            direction: "forward",
            clicked: false,
          });
        }
      });
      setSelections(sec);
    } else if (search && search.strand === "complement") {
      const splitString = sequence.raw.split("");
      const basePairMap: any = { A: "T", T: "A", C: "G", G: "C" };
      const complement = splitString.map((base: string) => {
        return basePairMap[base];
      });

      const complementString = complement.join("");

      if (complementString.includes(search.searchString.toUpperCase())) {
        const indices = [];
        let index = 0;
        let startIndex = 0;

        while (
          (index = complementString.indexOf(
            search.searchString.toUpperCase(),
            startIndex
          )) > -1
        ) {
          indices.push(index);
          startIndex = index + search.searchString.length;
        }
        const sec: any = [];
        indices.forEach((item: number, index: number) => {
          if (index <= 24) {
            const start = item;
            const end = start + search.searchString.length - 1;

            sec.push({
              start: start,
              end: end,
              direction: "forward",
              clicked: false,
            });
          }
        });
        setSelections(sec);
        console.log(sec);
      }
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
          onWheel={(e) => handleScroll(e)}
        >
          <CircularIndex
            cx={cx}
            cy={cy}
            radius={radius}
            sequence={sequence}
            scrollVal={scrollVal}
          />
          <CircularAnnotationGutter
            sequence={sequence}
            annotations={annotations}
            cx={cx}
            cy={cy}
            radius={radius}
            scrollVal={scrollVal}
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
    <path
      d={arc}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};
