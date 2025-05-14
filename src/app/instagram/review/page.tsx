"use client";
import React, { useState } from "react";
import { handleFileObjectUpload } from "@/utils/fileuploader";
import { getEmbeddings } from "@/utils/embedding";
import { askGptWithContext } from "@/utils/askGptWithContext";
import { reviewKeywordPrompt } from "@/constants/prompt/reviewKeyword";

const InstaReviewPage = () => {
  const [file, setFile] = useState<File | null>(null);

  // 파일 선택 시 state에 저장
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  // 버튼 클릭 시 파일 업로드 처리
  const onUploadClick = async () => {
    if (!file) return;
    const chunks = await handleFileObjectUpload(file);
    console.log("chunks", chunks[0]);
    const embeddings = await getEmbeddings(chunks);
    console.log("embeddings", embeddings);
    const answer = await askGptWithContext(reviewKeywordPrompt, chunks, embeddings);
    console.log("GPT 답변:", answer);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">인스타그램 리뷰 업로드</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">리뷰 업로드</label>
          <input
            type="file"
            className="cursor-pointer w-full bg-gray-100 border border-gray-300 rounded p-3"
            onChange={onFileChange}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
          onClick={onUploadClick}
          disabled={!file}
        >
          리뷰 업로드
        </button>
      </div>
    </div>
  );
};

export default InstaReviewPage;
