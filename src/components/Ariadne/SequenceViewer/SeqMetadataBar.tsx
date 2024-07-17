import { AriadneSelection, ValidatedSequence } from "@Ariadne/types";
import {
  ArrowsRightLeftIcon,
  CheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@ui/Button/Button";
import { Input } from "@ui/Input/Input";
import { classNames } from "@utils/stringUtils";
import { useCallback, useEffect, useState } from "react";

export const SeqMetadataBar = ({
  sequences,
  sequenceLabels,
  selection,
  setSelection,
  className,
}: {
  className?: string;
  sequences: ValidatedSequence[];
  sequenceLabels: string[];
  selection: AriadneSelection | null;
  setSelection: (selection: AriadneSelection | null) => void;
}) => {
  const [currentSeqIdx, setCurrentSeqIdx] = useState(0);
  const currentSequence = sequences[currentSeqIdx];
  return (
    <nav
      className={classNames(
        "mb-4 flex flex-row items-start justify-between text-noir-800 dark:text-noir-100",
        className,
      )}
    >
      <SequenceSelectorTitle
        sequenceLabels={sequenceLabels}
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
  sequenceLabels,
  currentSeqIdx,
  setCurrentSeqIdx,
}: {
  sequenceLabels: string[];
  currentSeqIdx: number;
  setCurrentSeqIdx: (idx: number) => void;
}) {
  return (
    <h4 className="text-md flex flex-col items-start justify-start gap-2">
      <span className="">Sequence: </span>
      <select
        value={currentSeqIdx}
        onChange={(e) => {
          setCurrentSeqIdx(parseInt(e.target.value));
        }}
        className="w-18 rounded-md border-b bg-transparent text-sm "
      >
        {sequenceLabels.map((label, idx) => (
          <option key={idx} value={idx}>
            {label}
          </option>
        ))}
      </select>
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
  const defaultInitialSelection: AriadneSelection = {
    start: 0,
    end: sequenceLength,
    direction: "forward",
  };
  return (
    <h4 className="text-md flex flex-col gap-3">
      Selection:{" "}
      <span className="flex items-center gap-4">
        <Input
          type="number"
          className="min-w-12 "
          min={0}
          max={selection?.end ?? sequenceLength}
          value={selection?.start ?? defaultInitialSelection.start}
          onChange={(e) => {
            setSelection({
              ...(selection ?? defaultInitialSelection),
              start: parseInt(e.target.value) || 0,
            });
          }}
        />
        -
        <Input
          type="number"
          className="min-w-12 "
          min={selection?.start ?? 0}
          max={sequenceLength}
          value={selection?.end ?? sequenceLength}
          onChange={(e) => {
            setSelection({
              ...(selection ?? defaultInitialSelection),
              end: parseInt(e.target.value) || sequenceLength,
            });
          }}
        />{" "}
        |{" "}
        <select
          value={selection?.direction ?? "forward"}
          onChange={(e) => {
            setSelection({
              ...(selection ?? defaultInitialSelection),
              direction: e.target.value as "forward" | "reverse",
            });
          }}
          className="w-18 rounded-md border-b bg-transparent text-sm "
        >
          <option value="forward">Forward</option>
          <option value="reverse">Reverse</option>
        </select>
      </span>
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
    <div className="my-auto flex gap-2">
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
    <Button
      size="sm"
      variant="outline"
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
    </Button>
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
    let seqToCopy = sequence.join("");
    if (selection) {
      if (selection.direction === "forward") {
        seqToCopy = seqToCopy?.slice(selection.start, selection.end + 1);
      } else {
        seqToCopy = seqToCopy.slice(selection.end, selection.start + 1);
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
    <Button
      variant="outline"
      size="sm"
      onClick={copyToClipboard}
      disabled={buttonState === "Disabled"}
    >
      {buttonIcon()}
    </Button>
  );
}
