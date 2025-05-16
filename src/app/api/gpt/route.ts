import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { systemPrompt, context } = await req.json();
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: context
            ? `\n다음은 사용자가 업로드한 .엑셀 파일에서 추출된 내용입니다.\nLLM은 이 정보를 기반으로 답변합니다.\n\n[참고 정보]:\n${context}`
            : ""
        }
      ],
      temperature: 0.7
    });
    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "GPT error" }, { status: 500 });
  }
}
