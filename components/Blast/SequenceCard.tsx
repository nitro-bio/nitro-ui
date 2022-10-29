export const SequenceCard = (props: {
  sequenceName: string;
  sequence: string;
}) => {
  const { sequence, sequenceName } = props;

  return (
    <section>
      <div className="overflow-hidden border border-zinc-500 bg-zinc-700/30 shadow-2xl sm:rounded-lg md:mx-8">
        <div className="border-b border-zinc-500  px-4 py-4 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-blue-300">
            {sequenceName}
          </h3>
        </div>
        <div className="break-all px-4 py-5 text-blue-100 sm:px-6">
          {sequence}
        </div>
      </div>
    </section>
  );
};
