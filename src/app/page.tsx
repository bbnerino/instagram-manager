import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">인스타그램 매니저</h1>
      <div className="mt-20">
        <Link
          href="/instagram/template"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          시작하기
        </Link>
      </div>
    </div>
  );
}
