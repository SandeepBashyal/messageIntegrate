require("dotenv").config();

import OpenAI from "openai";
import { openAiResponse } from "../interfaces/openAIInterface";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatCompletion = async (text: string): Promise<openAiResponse> => {
  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: text },
      ],
      model: "gpt-3.5-turbo",
    };
    const content: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    return {
      status: 1,
      response: content.choices[0].message.content,
    };
  } catch (error) {
    return {
      status: 0,
      response: null,
    };
  }
};
