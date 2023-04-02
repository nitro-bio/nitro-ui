import { useState, useEffect } from "react";
import { z } from "zod";
export const USER_ROLE = "user";
const BOT_ROLE = "assistant";
const messageSchema = z.object({
  role: z.enum([USER_ROLE, BOT_ROLE]),
  content: z.string(),
});
export type Message = z.infer<typeof messageSchema>;
const conversationSchema = z.array(messageSchema);
export type Conversation = z.infer<typeof conversationSchema>;

const responseSchema = z.object({
  conversation: conversationSchema,
});
interface GPT3Response {
  conversation: Conversation;
}
interface UseGPT3Props {
  apiUrl: string | null;
  apiKey: string | null;
  conversation: Conversation;
}

export const useGPT3 = ({ apiUrl, apiKey, conversation }: UseGPT3Props) => {
  const [response, setResponse] = useState<GPT3Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGPT3 = async () => {
      if (!apiKey) {
        setError(new Error("No API key provided"));
        return;
      }
      if (!apiUrl) {
        setError(new Error("No API URL provided"));
        return;
      }
      setIsLoading(true);
      setError(null);
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversation,
          openaiApiUrl: apiUrl,
          openaiApiKey: apiKey,
        }),
      };

      try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        if (!response.ok) {
          setError(new Error(data.message));
        } else {
          try {
            const parsedResponse = responseSchema.parse(data);
            setResponse(parsedResponse);
          } catch (e: unknown) {
            setError(e as Error);
          }
        }
      } catch (err: unknown) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (
      conversation.length > 0 &&
      conversation?.[conversation.length - 1].role === USER_ROLE
    ) {
      fetchGPT3();
    }
  }, [apiUrl, conversation]);

  return { conversation: response?.conversation, isLoading, error };
};

export default useGPT3;
