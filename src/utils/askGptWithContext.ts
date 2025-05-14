import { searchSimilarChunks } from "@/utils/searchSimilarChunks";

export async function askGptWithContext(systemPrompt: string, chunks: string[], embeddings: number[][]) {
  const query = "상품 특징 추출";
  const relevantChunks = await searchSimilarChunks(query, chunks, embeddings, 10);
  const context = relevantChunks.join("\n\n");

  // LLM 호출 (API Route 활용)
  const res = await fetch("/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemPrompt,
      context,
    }),
  });
  const data = await res.json();
  return data.result;
} 