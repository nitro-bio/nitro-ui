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
  const [error, setError] = useState<Error | null>(null);

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
          setData(null);
          setError(parsed.error);
        }
      }
    }
    window.parent.addEventListener("message", onDataFromStreamlit);
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
  return { data, setData: sendToStreamlit, error };
};

type StreamlitType =
  | "streamlit:componentChanged"
  | "streamlit:componentReady"
  | "streamlit:render"
  | "streamlit:setFrameHeight";

function sendMessageToStreamlitClient(type: StreamlitType, data: unknown) {
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

type Primitive = string | number | boolean | null | undefined;

const removeUnclonable = (
  data: unknown,
): Record<string, unknown> | unknown[] | Primitive => {
  // remove all functions from data
  const scrubbedData: Record<string, unknown> = {};
  if (data === undefined || data === null) {
    return null;
  }
  if (typeof data !== "object") {
    return data as Primitive;
  }

  // eslint-disable-next-line prefer-const
  if (Array.isArray(data)) {
    return data.map((v) => {
      return removeUnclonable(v as Record<string, unknown>);
    });
  }
  // key isn't reassigned, but value is, silence the error for key
  // eslint-disable-next-line prefer-const
  for (let [key, value] of Object.entries(data)) {
    if (typeof value === "function") {
      console.debug(`[useStreamlit] removing function ${key}`);
      continue;
    }
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        value = value.map((v) => {
          return removeUnclonable(v as Record<string, unknown>);
        });
      } else {
        value = removeUnclonable(value as Record<string, unknown>);
      }
    }
    scrubbedData[key] = value;
  }
  return scrubbedData;
};
