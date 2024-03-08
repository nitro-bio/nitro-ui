import { Card } from "@ui/Card";
import { BlastResponseDatum } from "../types";

interface AlignmentItem {
  id: string;
  start: number;
  end: number;
  title: string;
  anchor: string;
}
export interface Props {
  sequenceName: string;
  sequenceLength: number;
  results: BlastResponseDatum[];
}
export const GlobalAlignmentViz = ({
  sequenceName,
  sequenceLength,
  results,
}: Props) => {
  const alignmentItems: AlignmentItem[] = results.map((res) => ({
    id: res.id,
    start: res.queryRange[0],
    end: res.queryRange[1],
    title: res.title,
    anchor: `${res.id}`,
  }));

  const bookend = (
    <div className="text-align-center mx-auto my-2 w-full rounded-xl bg-brand-300 p-1 text-center text-xs font-semibold text-brand-800">
      {sequenceName}
    </div>
  );

  const middleAlignmentItem = (item: AlignmentItem, sequenceLength: number) => {
    const [marginLeft, marginRight] = [
      (item.start / sequenceLength) * 100,
      ((sequenceLength - item.end) / sequenceLength) * 100,
    ];

    return (
      <a href={`#card-${item.id}`} key={item.title}>
        <div
          className={
            "text-align-start my-2 cursor-pointer truncate rounded-xl bg-brand-500 p-1 pl-4 text-start text-xs text-white hover:bg-brand-700"
          }
          style={{
            marginLeft: `${marginLeft}%`,
            marginRight: `${marginRight}%`,
          }}
        >
          {item.title}
        </div>
      </a>
    );
  };

  return (
    <Card>
      <header className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <h3 className="space-between flex flex-row text-lg font-medium leading-6 text-brand-600 dark:text-brand-300">
          <span className="flex-1">Alignment Viewer</span>
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-noir-400">
          {results.length} Alignments
        </p>
      </header>
      <div className="overflow-hidden px-4 py-5 sm:px-6">
        <>
          {bookend}
          {alignmentItems.map((m) => middleAlignmentItem(m, sequenceLength))}
          {bookend}
        </>
      </div>
    </Card>
  );
};
