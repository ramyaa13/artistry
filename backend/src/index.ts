import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: "*", // allow all origins; for production, restrict to your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface GenerateRequest {
  prompt: string;
}

interface GenerateResponse {
  url: string;
}

app.post("/generate", async (req: Request<{}, {}, GenerateRequest>, res: Response<GenerateResponse | { error: string }>) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512",
    });

    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) throw new Error("No image returned from OpenAI");

    res.json({ url: imageUrl });
  } catch (err) {
    console.error("OpenAI generation error:", err);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
  console.log(`Expose via ngrok: npx ngrok http ${port}`);
});
