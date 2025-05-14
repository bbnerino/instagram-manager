export function cleanAndExtractKeywords(textList: string[]): string[] {
  // 1. 공백, 특수문자 제거
  let cleaned = textList.map((text) => text.trim().replace(/\s+/g, " "));
  // 2. 너무 짧은 문장 제거
  cleaned = cleaned.filter((text) => text.length > 5);
  // 3. 중복 제거
  cleaned = Array.from(new Set(cleaned));
  // 4. 의미 없는 단어 제거
  const stopPhrases = ["요", "ㅋㅋ", "ㅎㅎ", "~~~", "^^", "~~", "^^~", "!!", "..", "~~!!", "^^~~", "....", "ㅠㅠ", "ㅠㅠㅠ"];
  cleaned = cleaned.filter((text) => !stopPhrases.some((stop) => text.includes(stop)));
  return cleaned;
} 