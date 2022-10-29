import { StarIcon } from "@heroicons/react/solid";
import { classNames } from "@utils/stringUtils";
import TextAlignmentViz from "../TextAlignmentViz";

export function ResultCard(props: {
  result: BlastResponseDatum;
  sequenceType: SequenceType;
  topologyType: TopologyType;
}) {
  const {
    result: {
      title,
      subtitle,
      query_range,
      gaps,
      frame,
      id,
      query,
      midline,
      target,
      target_range,
      score,
    },
    sequenceType,
  } = props;
  const unit = (sequenceType: SequenceType) => {
    switch (sequenceType) {
      case "DNA":
        return "bp";
      case "Protein":
        return "aa";
      default:
        throw new Error(`Unexpected Topology type: ${sequenceType}`);
    }
  };
  const divider = (
    <div className="block " aria-hidden="true">
      <div>
        <div className="border-t border-gray-200" />
      </div>
    </div>
  );
  return (
    <article
      id={`card-${id}`}
      aria-labelledby={"result-title-" + id}
      className="group flex flex-col bg-zinc-700/30 px-4 py-6 opacity-60 shadow-xl transition duration-300 ease-in-out hover:scale-105 hover:opacity-100 hover:shadow-zinc-900 sm:rounded-lg"
    >
      <div className="mb-2">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-sm truncate text-sm text-blue-200">
              <p className="hover:underline">{title}</p>
            </div>
            <p className="text-sm text-zinc-300">
              {subtitle}
              {" | "}
              {query_range[1] - query_range[0]} {unit(sequenceType)} match
            </p>
          </div>
        </div>
      </div>
      {divider}
      <div className="mt-2 grow">
        <TextAlignmentViz
          query={query}
          midline={midline}
          target={target}
          query_range={query_range}
          target_range={target_range}
        />
      </div>
      {divider}
      <IconBar score={score} gaps={gaps} frame={frame} />
    </article>
  );
}

function IconBar(props: { score: number; gaps: number; frame: number }) {
  const { score, gaps, frame } = props;
  return (
    <div className="flex-0 mt-6 flex justify-between space-x-8">
      <div className="flex space-x-6">
        <span className="inline-flex items-center text-sm">
          <button
            type="button"
            className="inline-flex space-x-2 text-gray-400 hover:text-zinc-300"
          >
            <StarIcon
              className={classNames(
                "h-5 w-5",
                score > 75 ? "animate-bounce text-yellow-600 delay-300" : ""
              )}
              aria-hidden="true"
            />
            <span className={classNames("font-sm text-blue-200 ")}>
              Score: {score}
            </span>
          </button>
        </span>
        <span className="inline-flex items-center text-sm">
          <button
            type="button"
            className="inline-flex space-x-1 text-gray-400 hover:text-zinc-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>

            <span className="font-sm -mx-4 text-blue-200">{gaps} gaps</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              transform="scale(-1, 1)"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
        <span className="inline-flex items-center text-sm">
          <button
            type="button"
            className="inline-flex space-x-2 text-gray-400 hover:text-zinc-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              strokeWidth={2}
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z" />
            </svg>
            <span className="font-sm text-blue-200">Frame: {frame}</span>
          </button>
        </span>
      </div>
    </div>
  );
}
import Card from "@ui/Card";

export interface Props {
  sequenceName: string;
  sequence: string;
}
export const SequenceCard = ({ sequenceName, sequence }: Props) => {
  return (
    <Card className="text-brand-600 dark:text-brand-300">
      <div className="border-b border-zinc-500 pb-2">
        <h3 className="text-lg font-medium leading-6 ">{sequenceName}</h3>
      </div>
      <div className="break-all py-2">{sequence}</div>
    </Card>
  );
};
