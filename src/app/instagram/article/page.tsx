"use client";
import { createArticlePrompt } from "@/constants/prompt/createArticle";
import { askGptWithContext } from "@/utils/askGptWithContext";
import LineBreak from "@/utils/lineBreak";
import React, { useEffect, useState } from "react";

const ArticlePage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [template, setTemplate] = useState<string>("");
  const [article, setArticle] = useState<string>("");

  const [state, setState] = useState<"ready" | "loading" | "success" | "error">("ready");

  useEffect(() => {
    setKeyword(localStorage.getItem("ppt-review-keyword") || "");
    setTemplate(localStorage.getItem("ppt-template") || "");
  }, []);

  const onClickCreate = async () => {
    setState("loading");
    try {
      const prompt = createArticlePrompt(template);
      const article = await askGptWithContext(prompt);
      setArticle(article);
      setState("success");
    } catch (error) {
      setState("error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {state === "ready" && (
        <>
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">인스타그램 리뷰 작성</h1>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">키워드</label>
              <div className="bg-gray-100 border border-gray-300 rounded p-3">
                <LineBreak>{keyword}</LineBreak>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">템플릿</label>
              <div className="bg-gray-100 border border-gray-300 rounded p-3">
                <LineBreak>{template}</LineBreak>
              </div>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
            onClick={onClickCreate}
          >
            작성하기
          </button>
        </>
      )}
      {state === "loading" && (
        <div className="flex justify-center items-center py-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-blue-500 font-semibold">로딩 중...</span>
        </div>
      )}
      {state === "success" && (
        <div className="flex justify-center items-center py-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">인스타그램 피드</h1>
            <div className="bg-gray-100 border border-gray-300 rounded p-3">
              <LineBreak>{article}</LineBreak>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
