// src/utils/embedding.ts

export async function getEmbeddings(texts: string[]) {
  try {
    const response = await fetch("http://localhost:8080/api/embedding/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts }),
    });
    if (!response.ok) throw new Error("API Error");
    const data = await response.json();
    return data.embeddings;
  } catch (error) {
    console.error("Embedding Error:", error);
    return [];
  }
}
