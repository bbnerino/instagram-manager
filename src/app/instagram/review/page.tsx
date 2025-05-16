"use client";
import React, { useState } from "react";
import { handleFileObjectUpload } from "@/utils/fileuploader";
import { getEmbeddings } from "@/utils/embedding";
import { askGptWithContext } from "@/utils/askGptWithContext";
import { reviewKeywordPrompt } from "@/constants/prompt/reviewKeyword";
import { useRouter } from "next/navigation";
import LineBreak from "@/utils/lineBreak";

const InstaReviewPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [state, setState] = useState<"ready" | "loading" | "success" | "error">("ready");

  // 파일 선택 시 state에 저장
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  // 버튼 클릭 시 파일 업로드 처리
  const onUploadClick = async () => {
    setState("loading");
    try {
      if (!file) {
        setState("error");
        return;
      }
      const { title, chunks } = await handleFileObjectUpload(file);
      if (!title || !chunks || chunks.length === 0) {
        setState("error");
        return;
      }
      const embeddings = await getEmbeddings(chunks);
      if (!embeddings || embeddings.length === 0) {
        setState("error");
        return;
      }
      const answer = await askGptWithContext(reviewKeywordPrompt(title), chunks, embeddings);
      if (!answer) {
        setState("error");
        return;
      }
      setKeyword(answer);
      setState("success");
    } catch (e) {
      setState("error");
    }
  };

  const router = useRouter();

  const onClickNext = () => {
    localStorage.setItem("ppt-review-keyword", keyword);
    router.push("/instagram/article");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">인스타그램 리뷰 업로드</h1>

        {state === "ready" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">리뷰 업로드</label>
            <input
              type="file"
              className="cursor-pointer w-full bg-gray-100 border border-gray-300 rounded p-3"
              onChange={onFileChange}
            />
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
              onClick={onUploadClick}
              disabled={!file}
            >
              리뷰 업로드
            </button>
          </div>
        )}
        {state === "loading" && (
          <div className="flex justify-center items-center py-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-blue-500 font-semibold">로딩 중...</span>
          </div>
        )}
        {state === "error" && (
          <div className="flex justify-center items-center py-4">
            <div className="text-red-500 font-semibold">오류가 발생했습니다. 다시 시도해주세요.</div>
          </div>
        )}
        {state === "success" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">키워드</label>
            <div className="bg-gray-100 border border-gray-300 rounded p-3">
              <LineBreak>{keyword}</LineBreak>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
              onClick={onClickNext}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstaReviewPage;
