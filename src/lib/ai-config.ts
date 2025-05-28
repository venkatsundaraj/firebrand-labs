import {
  GoogleGenerativeAI,
  SchemaType,
  ChatSession,
} from "@google/generative-ai";
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

const scenarioSchema = {
  description: "Funny worst case scenario prediction",
  type: SchemaType.OBJECT,
  properties: {
    scenario: {
      type: SchemaType.STRING,
      description: "A humorous worst-case scenario prediction",
    },
    explanation: {
      type: SchemaType.STRING,
      description: "Why this scenario might happen based on the answers",
    },
    humor_level: {
      type: SchemaType.NUMBER,
      description: "Humor level from 1-10",
    },
  },
  required: ["scenario", "explanation", "humor_level"],
};

export interface ExtractedData {
  questions: string[];
  // randomQuestions: string[];
}

export interface WorstScenarioData {
  scenario: string;
  explanation: string;
  humor_level: number; // 1-10 scale
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

const scenarioConfig: GenerationConfig = {
  temperature: 1.2, // Higher creativity for humor
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 2000,
  responseMimeType: "application/json",
  responseSchema: scenarioSchema,
};

// 6. Start a chat session (for context continuity)
export const chat = model.startChat({
  history: [],
  generationConfig,
});

export const scenarioChat: ChatSession = model.startChat({
  history: [],
  generationConfig: scenarioConfig,
});
