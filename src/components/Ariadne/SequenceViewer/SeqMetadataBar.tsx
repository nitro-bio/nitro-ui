import { AriadneSelection, ValidatedSequence } from "@Ariadne/types";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { Combobox } from "@ui/Combobox";
import { ComboboxOption } from "@ui/Combobox/Combobox";
import { useCallback, useState } from "react";
import { ArrowsRightLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export const SeqMetadataBar = ({
  sequences,
  selection,
  setSelection,
}: {
  sequences: ValidatedSequence[];
  selection: AriadneSelection | null;
  setSelection: (selection: AriadneSelection | null) => void;
}) => {
  const [currentSeqIdx, setCurrentSeqIdx] = useState(0);
  const currentSequence = sequences[currentSeqIdx];
  return (
    <nav className="flex flex-row items-start justify-between border">
      <SequenceSelectorTitle
        sequences={sequences}
        currentSeqIdx={currentSeqIdx}
        setCurrentSeqIdx={setCurrentSeqIdx}
      />
      <SelectionSubtitle
        selection={selection}
        setSelection={setSelection}
        sequenceLength={100}
      />
      <ButtonBar
        selection={selection}
        setSelection={setSelection}
        currentSequence={currentSequence}
      />
    </nav>
  );
};

function SequenceSelectorTitle({
  sequences,
  currentSeqIdx,
  setCurrentSeqIdx,
}: {
  sequences: ValidatedSequence[];
  currentSeqIdx: number;
  setCurrentSeqIdx: (idx: number) => void;
}) {
  return (
    <h4 className="text-md flex  w-full flex-col items-start justify-start gap-2 text-brand-100">
      <span className="">Sequence: </span>
      <Combobox
        search={""}
        setSearch={function (search: string): void {
          throw new Error("Function not implemented.");
        }}
        sections={[]}
        onSelect={function (option: ComboboxOption): void {
          throw new Error("Function not implemented.");
        }}
      />
    </h4>
  );
}

function SelectionSubtitle({
  selection,
  setSelection,
  sequenceLength,
}: {
  selection: AriadneSelection | null;

  setSelection: (selection: AriadneSelection | null) => void;
  sequenceLength: number;
}) {
  return (
    <h4 className="text-md flex w-full flex-col items-start  gap-2 text-brand-100">
      {selection ? (
        <>
          Selection:{" "}
          <span className="flex items-center gap-4">
            <input
              type="number"
              min={0}
              max={selection.end}
              value={selection.start}
              onChange={(e) => {
                setSelection({
                  ...selection,
                  start: parseInt(e.target.value) || 0,
                });
              }}
              className="w-14 border-b border-brand-100 bg-transparent text-right text-sm text-brand-100"
            />
            -
            <input
              type="number"
              min={selection.start}
              max={sequenceLength}
              value={selection.end}
              onChange={(e) => {
                setSelection({
                  ...selection,
                  end: parseInt(e.target.value) || sequenceLength,
                });
              }}
              className="w-14 border-b border-brand-100 bg-transparent text-right text-sm text-brand-100"
            />{" "}
            |{" "}
            <select
              value={selection.direction}
              onChange={(e) => {
                setSelection({
                  ...selection,
                  direction: e.target.value as "forward" | "reverse",
                });
              }}
              className="w-18 border-b border-brand-100 bg-transparent text-sm text-brand-100"
            >
              <option value="forward">Forward</option>
              <option value="reverse">Reverse</option>
            </select>
          </span>
        </>
      ) : (
        "No Selection"
      )}
    </h4>
  );
}

export function ButtonBar({
  selection,
  setSelection,
  currentSequence,
}: {
  selection: AriadneSelection | null;
  setSelection: (selection: AriadneSelection | null) => void;
  currentSequence: ValidatedSequence;
}) {
  return (
    <div className="flex h-10 gap-2">
      <InvertButton selection={selection} setSelection={setSelection} />
      <CopyButton selection={selection} sequence={currentSequence} />
    </div>
  );
}

export function InvertButton({
  setSelection,
  selection,
}: {
  setSelection: (selection: AriadneSelection | null) => void;
  selection: AriadneSelection | null;
}) {
  const [buttonState, setButtonState] = useState<
    "Ready" | "Fired" | "Disabled"
  >("Ready");

  useEffect(
    function updateDisabled() {
      if (selection) {
        setButtonState("Ready");
      } else {
        setButtonState("Disabled");
      }
    },
    [selection],
  );
  const buttonIcon = () => {
    switch (buttonState) {
      case "Ready":
        return <ArrowsRightLeftIcon className="h-5 w-5" />;
      case "Fired":
        return <CheckIcon className="h-5 w-5" />;
      case "Disabled":
        return <ArrowsRightLeftIcon className="h-5 w-5" />;
    }
  };

  return (
    <button
      className="rounded-md  bg-noir-600 px-2 py-1 text-noir-200 transition-colors duration-200 ease-in-out hover:bg-noir-700 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={buttonState === "Disabled"}
      onClick={() => {
        if (selection) {
          setSelection({
            ...selection,
            direction:
              selection.direction === "forward" ? "reverse" : "forward",
          });
        }
      }}
    >
      {buttonIcon()}
    </button>
  );
}

export function CopyButton({
  sequence,
  selection,
}: {
  sequence: ValidatedSequence;
  selection: AriadneSelection | null;
}) {
  const [buttonState, setButtonState] = useState<
    "Ready" | "Fired" | "Disabled"
  >("Ready");

  const copyToClipboard = useCallback(() => {
    let seqToCopy = sequence;
    if (selection) {
      if (selection.direction === "forward") {
        seqToCopy = seqToCopy?.slice(selection.start, selection.end + 1);
      } else {
        seqToCopy = sequence.slice(selection.end, selection.start + 1);
      }
    }
    if (!navigator?.clipboard) {
      console.error(
        "Clipboard API not available. Are we on r104 without https in the url? If so, this is because of https://stackoverflow.com/a/51823007.",
      );
      alert("Clipboard API not available without https or on localhost.");
    } else {
      navigator.clipboard
        .writeText(seqToCopy)
        .then(() => {
          setTimeout(() => {
            setButtonState("Ready");
          }, 1000);
          setButtonState("Fired");
        })
        .catch((err) => {
          console.error("Failed to copy to clipboard", err);
        });
    }
  }, [sequence, selection]);
  useEffect(
    function bindCopyEvent() {
      const copyListener = (e: KeyboardEvent) => {
        if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
          if (buttonState === "Disabled") {
            return;
          } else {
            copyToClipboard();
          }
        }
      };
      document.addEventListener("keydown", copyListener);
      return () => {
        document.removeEventListener("keydown", copyListener);
      };
    },
    [copyToClipboard],
  );

  useEffect(
    function updateDisabled() {
      if (selection && selection.end !== selection.start) {
        setButtonState("Ready");
      } else {
        setButtonState("Disabled");
      }
    },
    [selection, sequence.length],
  );

  const buttonIcon = () => {
    switch (buttonState) {
      case "Ready":
        return <ClipboardDocumentListIcon className="h-5 w-5" />;
      case "Fired":
        return <CheckIcon className="h-5 w-5" />;
      case "Disabled":
        return <ClipboardDocumentListIcon className="h-5 w-5" />;
    }
  };

  return (
    <button
      className="grid content-center rounded-md bg-noir-600 px-2 py-1 text-noir-200 transition-colors duration-200 ease-in-out hover:bg-noir-700 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={copyToClipboard}
      disabled={buttonState === "Disabled"}
    >
      {buttonIcon()}
    </button>
  );
}
