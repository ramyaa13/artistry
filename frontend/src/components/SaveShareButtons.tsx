"use client";

export default function SaveShareButtons() {
  const handleSave = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "mural.png";
    a.click();
  };

  const handleShare = async () => {
    try {
      const canvas = document.querySelector("canvas") as HTMLCanvasElement;
      if (!canvas) return;

      const dataURL = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataURL)).blob();
      const file = new File([blob], "mural.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My AR Mural",
          text: "Check out my AR mural!",
        });
      } else {
        alert("Sharing not supported on this device");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="absolute bottom-4 right-4 flex gap-3">
      <button
        onClick={handleSave}
        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
      >
        💾 Save
      </button>
      <button
        onClick={handleShare}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
      >
        📤 Share
      </button>
    </div>
  );
}
