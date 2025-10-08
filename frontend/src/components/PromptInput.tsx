"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface PromptInputProps {
  setImageURL: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export default function PromptInput({
  setImageURL,
  setLoading,
  loading,
}: PromptInputProps) {
  const [prompt, setPrompt] = useState<string>("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (!BACKEND_URL) return console.error("Backend URL not set");

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setImageURL(data.url);
    } catch (err) {
      console.error("Image generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your mural..."
        className="w-2/3 p-2 text-black rounded"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}
