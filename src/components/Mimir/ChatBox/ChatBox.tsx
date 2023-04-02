import useGPT3, { Conversation, Message, USER_ROLE } from "@hooks/useGPT3";
import { classNames } from "@utils/stringUtils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ChatBoxProps {
  apiKey: string | null;
  apiUrl: string | null;
}

interface FormData {
  message: string;
}

export const ChatBox = ({ apiUrl, apiKey }: ChatBoxProps) => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [messages, setMessages] = useState<Conversation>([]);
  const {
    conversation: gptResponse,
    isLoading,
    error,
  } = useGPT3({
    apiUrl,
    apiKey,
    conversation: messages,
  });

  const onSubmit = (data: FormData) => {
    setMessages((prev: Conversation) => [
      ...prev,
      {
        content: data.message,
        role: USER_ROLE,
      },
    ]);
    setValue("message", "");
  };
  useEffect(
    function syncGPTResponse() {
      if (gptResponse) {
        setMessages(gptResponse);
      }
    },
    [gptResponse]
  );

  return (
    <div className="flex flex-col">
      {messages.map((message: Message, index) => (
        <div
          key={index}
          className={`chat ${
            message.role === "user" ? "chat-end" : "chat-start"
          }`}
        >
          <div
            className={classNames(
              "chat-bubble chat-bubble",
              message.role === "user"
                ? "chat-bubble-primary"
                : "chat-bubble-secondary"
            )}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div className="chat chat-end">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input
            type="text"
            placeholder="Type your message"
            className="chat-input"
            {...register("message")}
          />
          <button type="submit" className="chat-submit">
            Send
          </button>
        </form>
        {error && <div className="chat-error">Error: {error.message}</div>}
        {isLoading && <div className="chat-loading">Loading...</div>}
      </div>
    </div>
  );
};
