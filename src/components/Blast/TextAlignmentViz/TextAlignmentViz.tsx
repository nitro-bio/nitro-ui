import { classNames } from "@utils/stringUtils";
import { cva, VariantProps } from "class-variance-authority";

export interface Props {
  query: string;
  queryRange: [number, number];
  midline: string;
  target: string;
  targetRange: [number, number];
}

export const TextAlignmentViz = ({
  query,
  midline,
  target,
  queryRange,
  targetRange,
}: Props) => {
  if (!(query.length === midline.length && midline.length === target.length)) {
    throw new Error("query, midline, and target are not same length");
  }

  /* spliting into allButLast, last */
  /* so we can pair last indices with lastQuery and lastTarget chars */
  const allButLast = query.slice(0, -1).split("");
  const [queryLast, midlineLast, targetLast] = [
    query.at(-1),
    midline.at(-1),
    target.at(-1),
  ];

  return (
    <div className="leading-0 items-right font-mono flex flex-wrap bg-white pt-4 text-center text-sm tracking-widest dark:bg-noir-800 md:mx-4">
      <div className="flex flex-row flex-wrap">
        <div className={"mr-2 text-right font-thin tracking-tighter"}>
          <CharComponent type="query" char={`${queryRange[0]}`} />{" "}
          <CharComponent type="midline_bar" char={"|"} />{" "}
          <CharComponent type="target" char={`${targetRange[0]}`} />{" "}
        </div>
        {allButLast.map((queryChar, idx) => {
          const [midlineChar, targetChar] = [midline[idx], target[idx]];
          return (
            <div className="mb-8 select-none" key={idx}>
              <CharComponent type="query" char={queryChar} />{" "}
              <CharComponent
                type={midlineChar === "X" ? "midline_x" : "midline_bar"}
                char={midlineChar}
              />{" "}
              <CharComponent type="target" char={targetChar} />{" "}
            </div>
          );
        })}
        <div className="flex flex-row">
          <div className="select-none" key={"lastChars"}>
            <CharComponent type="query" char={`${queryLast}`} />{" "}
            <CharComponent
              type={midlineLast === "X" ? "midline_x" : "midline_bar"}
              char={`${midlineLast}`}
            />{" "}
            <CharComponent type="target" char={`${targetLast}`} />{" "}
          </div>
          <div
            className={classNames("ml-2 text-left font-thin tracking-tighter")}
          >
            <CharComponent type="query" char={`${queryRange[1]}`} />{" "}
            <CharComponent type="midline_bar" char={"|"} />{" "}
            <CharComponent type="target" char={`${targetRange[0]}`} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

const charStyles = cva("whitespace-pre-wrap", {
  variants: {
    type: {
      query: "dark:text-brand-100 text-brand-400",
      midline_bar: "text-noir-400",
      midline_x: "text-red-400",
      target: "dark:text-brand-300 text-brand-600",
    },
  },
  defaultVariants: {
    type: "query",
  },
});

interface IntermediateCharProps {
  char: string;
}

interface CharProps
  extends VariantProps<typeof charStyles>,
    IntermediateCharProps {}

const CharComponent = ({ char, type }: CharProps) => (
  <div className={charStyles({ type: type || "query" })}>{char}</div>
);
