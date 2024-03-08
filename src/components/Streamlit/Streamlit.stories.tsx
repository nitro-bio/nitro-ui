import { CircularViewer } from "@Ariadne/CircularViewer";
import { generateRandomSequences } from "@Ariadne/storyUtils";
import { useEffect } from "react";
import {
  AriadneStreamlitSchema,
  CircularViewerStreamlit,
} from "@Streamlit/Ariadne";
import { LinearViewerStreamlit } from "./LinearViewerStreamlit";
import { useStreamlitMock } from "@Streamlit/hooks";
import { z } from "zod";

export default {
  title: "Streamlit/Ariadne",
  component: CircularViewer,
};

export const CircularViewerStory = () => {
  const { sendToReact } = useStreamlitMock({
    zodSchema: AriadneStreamlitSchema,
    scrubUnclonable: true,
  });
  useRandomAriadneDataStreamlit({
    maxSequences: 1,
    maxLength: 1000,
    sendToReact,
  });
  return <CircularViewerStreamlit />;
};

export const LinearViewerStory = () => {
  const { sendToReact } = useStreamlitMock({
    zodSchema: AriadneStreamlitSchema,
    scrubUnclonable: true,
  });
  useRandomAriadneDataStreamlit({
    maxSequences: 4,
    maxLength: 1000,
    sendToReact,
  });

  return <LinearViewerStreamlit />;
};

const useRandomAriadneDataStreamlit = ({
  maxSequences,
  maxLength,
  sendToReact,
}: {
  maxSequences: number;
  maxLength: number;
  sendToReact: (data: z.infer<typeof AriadneStreamlitSchema>) => void;
}) => {
  useEffect(function initializeStreamlitData() {
    const selection = null;
    const { sequences, annotations } = generateRandomSequences({
      maxSequences,
      maxLength,
    });
    sendToReact({
      sequences,
      annotations,
      selection,
    });
  }, []);
};
