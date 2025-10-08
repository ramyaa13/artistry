"use client";
import { useState } from "react";
import PromptInput from "@/components/PromptInput";
import ARScene from "@/components/ARScene";
import SaveShareButtons from "@/components/SaveShareButtons";

export default function ARPage() {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <main className="flex flex-col h-screen">
      <div className="p-4 bg-gray-800 text-center">
        <h2 className="text-xl font-semibold mb-2">Markerless AR</h2>
        <PromptInput
          setImageURL={setImageURL}
          setLoading={setLoading}
          loading={loading}
        />
      </div>

      <div className="flex-1 relative">
        <ARScene imageURL={imageURL} />
        <SaveShareButtons />
      </div>
    </main>
  );
}
