import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import env from "@/env";

interface GenerationConfig {
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
  responseMimeType: string;
  responseSchema: any;
}

const schema = {
  description: "generate awkward but not offensive questions",
  type: SchemaType.OBJECT,
  properties: {
    questions: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        description:
          "Generate awkward, embarrassing but not explicitly vulgar questions like 'What's your most embarrassing habit?', 'When did you last cry?', 'What's your weirdest fear?'",
      },
    },
  },
  required: ["questions"],
};

export interface ExtractedData {
  questions: string[];
  // randomQuestions: string[];
}

// 4. Initialize the AI client
const genAI = new GoogleGenerativeAI(env.NEXT_PUBLIC_GEMINI_API_KEY);

// 5. Create model with configuration
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // or "gemini-1.5-pro" for better accuracy
});

const generationConfig: GenerationConfig = {
  temperature: 1, // Creativity level (0-2)
  topP: 0.95, // Nucleus sampling
  topK: 64, // Top-k sampling
  maxOutputTokens: 8192, // Max response length
  responseMimeType: "application/json", // Force JSON output
  responseSchema: schema, // Enforce structure
};

// 6. Start a chat session (for context continuity)
export const chat = model.startChat({
  history: [],
  generationConfig,
});
