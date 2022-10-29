interface BlastResponseDatum {
  id: string;
  query_range: [number, number];
  target_range: [number, number];
  score: number;
  identities: number;
  positives: number;
  gaps: number;
  frame: number;
  sequence_id: string;
  title: string;
  subtitle: string;
  target: string;
  query: string;
  midline: string;
}

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
    start: res.query_range[0],
    end: res.query_range[1],
    title: res.title,
    anchor: `${res.id}`,
  }));

  const bookend = (
    <div className="text-align-center mx-auto my-2 w-full rounded-xl bg-blue-300 p-1 text-center text-xs font-semibold text-blue-800">
      {sequenceName}
    </div>
  );

  const middleAlignmentItem = (item: AlignmentItem, sequenceLength: number) => {
    const [marginLeft, marginRight] = [
      (item.start / sequenceLength) * 100,
      ((sequenceLength - item.end) / sequenceLength) * 100,
    ];

    return (
      <a href={`#card-${item.id}`}>
        <div
          key={item.title}
          className={
            "text-align-start my-2 cursor-pointer truncate rounded-xl bg-blue-500 p-1 pl-4 text-start text-xs text-white hover:bg-blue-700"
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
    <section>
      <div className="overflow-hidden border border-zinc-500 bg-zinc-700/30 shadow-2xl sm:rounded-lg md:mx-8">
        <div className="border-b border-gray-200  px-4 py-4 sm:px-6">
          <h3 className="space-between flex flex-row text-lg font-medium leading-6 text-blue-300">
            <span className="flex-1">Alignment Viewer</span>
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-zinc-400">
            {results.length} Alignments
          </p>
        </div>
        <div className="overflow-hidden px-4 py-5 sm:px-6">
          <>
            {bookend}
            {alignmentItems.map((m) => middleAlignmentItem(m, sequenceLength))}
            {bookend}
          </>
        </div>
      </div>
    </section>
  );
};
