import { IndexFlatL2 } from "faiss-node";

export function createFaissIndex(embeddings: number[][]) {
  if (!embeddings.length) throw new Error("No embeddings provided");
  const dimension = embeddings[0].length;
  const index = new IndexFlatL2(dimension);
  embeddings.forEach(vec => index.add(vec));
  return index;
}

export function searchFaissIndex(index: any, queryEmbedding: number[], k: number) {
  const results = index.search(queryEmbedding, k);
  return results.labels; // top-k 인덱스 배열
} 