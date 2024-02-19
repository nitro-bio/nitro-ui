import { CircularViewer } from "@Ariadne/CircularViewer";
import { generateRandomSequences } from "@Ariadne/storyUtils";
import { useEffect } from "react";
import {
  AriadneStreamlitSchema,
  CircularViewerStreamlit,
} from "@Streamlit/Ariadne";
import { LinearViewerStreamlit } from "./LinearViewerStreamlit";
import { useStreamlitMock } from "@Streamlit/hooks";

export default {
  title: "Streamlit/Ariadne",
  component: CircularViewer,
};

export const CircularViewerStory = () => {
  const { sendToReact } = useStreamlitMock({
    zodSchema: AriadneStreamlitSchema,
    scrubUnclonable: true,
  });

  useEffect(function initializeStreamlitData() {
    const selection = null;
    const { annotatedSequences, stackedAnnotations } = generateRandomSequences({
      maxSequences: 1,
      maxLength: 1000,
    });
    sendToReact({
      sequences: annotatedSequences,
      stackedAnnotations,
      selection,
    });
  }, []);

  return <CircularViewerStreamlit />;
};

export const LinearViewerStory = () => {
  const { sendToReact } = useStreamlitMock({
    zodSchema: AriadneStreamlitSchema,
    scrubUnclonable: true,
  });

  useEffect(function initializeStreamlitData() {
    const selection = null;
    const { annotatedSequences, stackedAnnotations } = generateRandomSequences({
      maxSequences: 2,
      maxLength: 1000,
    });
    sendToReact({
      sequences: annotatedSequences,
      stackedAnnotations,
      selection,
    });
  }, []);

  return <LinearViewerStreamlit />;
};
