import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  client: {
    NEXT_PUBLIC_GEMINI_API_KEY: z.string().min(1),
  },
  server: {
    // NEXT_PUBLIC_GEMINI_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
});

export default env;
