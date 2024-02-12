import { useEffect, useState } from "react";
import { ZodSchema } from "zod";

export const useStreamlit = <T extends Record<string, unknown>>({
  ref,
  zodSchema,
  scrubUnclonable,
}: {
  ref: React.RefObject<HTMLDivElement>;
  zodSchema: ZodSchema<T>;
  scrubUnclonable?: boolean;
}) => {
  const [data, setData] = useState<T | null>(null);

  const sendToStreamlit = (next: T) => {
    sendMessageToStreamlitClient(
      "streamlit:componentChanged",
      scrubUnclonable ? removeUnclonable(next) : next,
    );
  };

  useEffect(function subscribeToStreamlit() {
    sendMessageToStreamlitClient("streamlit:componentReady", { apiVersion: 1 });
    function onDataFromStreamlit(event: {
      data: {
        type: string;
        args: { key: string; value: T };
      };
    }) {
      if (event.data.type !== "streamlit:render") {
        return;
      } else {
        console.debug("[useStreamlit] Received message", event.data.args);
        const parsed = zodSchema.safeParse(event.data.args);
        if (parsed.success) {
          setData(parsed.data);
        } else {
          console.error(parsed.error);
          throw new Error(`Invalid data from Streamlit`);
        }
      }
    }
    window.parent.addEventListener("message", onDataFromStreamlit);
    console.log("[useStreamlit] subscribed to streamlit");
  }, []);

  useEffect(
    function resizeStreamlitFrameDebounced() {
      const timeoutId = setTimeout(function resizeStreamlitFrame() {
        if (ref.current) {
          sendMessageToStreamlitClient("streamlit:setFrameHeight", {
            height: ref.current.scrollHeight,
          });
        }
      }, 100);
      return function cleanup() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    },
    [ref.current?.scrollHeight],
  );
  return { data, setData: sendToStreamlit };
};

type StreamlitType =
  | "streamlit:componentChanged"
  | "streamlit:componentReady"
  | "streamlit:render"
  | "streamlit:setFrameHeight";

function sendMessageToStreamlitClient(
  type: StreamlitType,
  data: Record<string, unknown>,
) {
  console.debug("[useStreamlit]", type, data);
  const outData = Object.assign(
    {
      isStreamlitMessage: true,
      type: type,
    },
    data,
  );
  window.parent.postMessage(outData, "*");
}

export const useStreamlitMock = <T extends Record<string, unknown>>({
  zodSchema,
  scrubUnclonable,
}: {
  zodSchema: ZodSchema<T>;
  scrubUnclonable?: boolean;
}) => {
  useEffect(function setupMock() {
    const receiveFromReact = (event: MessageEvent) => {
      if (event.data.type !== "streamlit:componentChanged") {
        return;
      } else {
        console.debug("[useStreamlitMock] received", event.data, "from react");
        const parsed = zodSchema.parse(event.data);
        sendToReact(parsed);
      }
    };
    window.parent.addEventListener("message", receiveFromReact);
  }, []);

  const sendToReact = (next: T) => {
    window.parent.postMessage({
      isStreamlitMessage: true,
      type: "streamlit:render",
      args: scrubUnclonable ? removeUnclonable(next) : next,
    });
    console.debug("[useStreamlitMock] sent", next, "to react");
  };

  return { sendToReact };
};

const removeUnclonable = (data: Record<string, unknown>) => {
  // remove all functions from data
  const scrubbedData: Record<string, unknown> = {};
  // eslint-disable-next-line prefer-const
  for (let [key, value] of Object.entries(data)) {
    if (typeof value !== "function") {
      if (Array.isArray(value)) {
        value = value.map((v) => {
          if (typeof v === "object" && v !== null) {
            return removeUnclonable(v as Record<string, unknown>);
          }
          return v;
        });
      } else if (typeof value === "object" && value !== null) {
        value = removeUnclonable(value as Record<string, unknown>);
      }
      scrubbedData[key] = value;
    } else {
      console.debug(`[useStreamlit] removing function ${key}`);
    }
  }
  return scrubbedData;
};
