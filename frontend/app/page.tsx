import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">🎨 Artsphere</h1>
      <p className="text-lg text-gray-300 mb-8">
        Create & place AI-generated murals in AR.
      </p>
      <Link
        href="/ar"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg"
      >
        Launch AR Experience
      </Link>
    </main>
  );
}
