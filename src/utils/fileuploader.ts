import { read, utils } from "xlsx";

// reviews 배열을 받아서 청크로 나누는 함수
const chunkTextFromReviews = (reviews: (string | number | undefined | null)[], chunkSize = 500, overlap = 50) => {
  // 비어있는 셀 제거 및 문자열 변환
  const filtered = reviews.filter((v) => v !== undefined && v !== null && v !== "").map(String);
  // 모든 리뷰를 하나의 문자열로 병합
  const text = filtered.join("\n");
  // 지정된 크기로 나누기
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
};

// 파일 객체를 직접 받아 처리하는 함수
export const handleFileObjectUpload = async (file: File): Promise<{ title: string, chunks: string[] }> => {
  if (!file) return { title: "", chunks: [] };
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(sheet, { header: 1 }) as any[];
        const title = jsonData[1]?.[1] ? String(jsonData[1][1]) : "";
        const reviews = jsonData.slice(1).map((row: any) => row[5]);
        const chunks = chunkTextFromReviews(reviews);
        resolve({ title, chunks });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

// 기존 input 이벤트 핸들러는 그대로 둡니다
export const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;
  await handleFileObjectUpload(file);
};
