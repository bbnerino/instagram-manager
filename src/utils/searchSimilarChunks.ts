import { getEmbeddings } from "@/utils/embedding";
import { cleanAndExtractKeywords } from "@/utils/cleaning";

export async function searchSimilarChunks(query: string, chunks: string[], embeddings: number[][], k = 10) {
  // 1. 쿼리 임베딩 생성
  const queryEmbeddingArr = await getEmbeddings([query]);
  const queryEmbedding = queryEmbeddingArr[0];

  // 2. faiss-search API 호출
  const res = await fetch("/api/faiss-search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeddings,
      queryEmbedding,
      k,
    }),
  });
  const { topKIndices } = await res.json();

  // 3. 청크 추출 및 키워드 정제
  const extractedChunks: string[] = [];
  for (const idx of topKIndices) {
    extractedChunks.push(...chunks[idx].split("\n"));
  }
  const keywords = cleanAndExtractKeywords(extractedChunks);
  return keywords;
} 