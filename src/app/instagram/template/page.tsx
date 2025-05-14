"use client";

import React, { useState } from "react";
import InstagramCard from "./Card";
import Link from "next/link";

interface InstagramTemplateItem {
  id: number;
  imgSrc: string;
  contents: string;
}

const InstagramTemplatePage = () => {
  const list: InstagramTemplateItem[] = [
    {
      id: 1,
      imgSrc: "/images/template1.png",
      contents: `플래시 터뜨리고 예쁘게들 찍던데
                 제가 하니까 뭔가 살짝
                 싸이월드 감성인 것 같은 ... 헿 😅

                 요 박시 긴팔티 홈웨어로 입으니까
                 넘 편하구 좋다요 !!!!!
                 전컬러 다 소장해야지 🩶🩶`
    },
    {
      id: 2,
      imgSrc: "/images/template2.png",
      contents: `진짜 편하고 이쁜 인생슬랙스 추천드릴게요🫶
                29,900원 기획특가로 나온 슬랙스인데 퀄리티 미쳤습니다🔥🔥

                허리 전체밴딩이라 진짜 편한 착용감인데,
                투턱 디테일이 있어서 꾸밀때 입어도 포인트되서 이쁜 슬랙스 예요 :)

                찰랑찰랑한 소재감에 차르르 떨어지는 와이드핏으로
                셔츠부터 가디건, 반팔이랑 코디하면 봄부터 가을까지 뽕뽑을 수 있어요😎`
    },
    {
      id: 3,
      imgSrc: "/images/template3.png",
      contents: `체형커버하기 좋은 버뮤다팬츠 소개해드릴게요😎

                3만원대 가성비 좋고
                중청, 연청, 흑청 근본컬러에

                사이즈는 S부터 3XL 구성으로
                누구든 사이즈 걱정 없이 입을 수 있어요❗️

                무릎아래로 자연스럽게 떨어지는 8부 기장!

                널널한 허벅지 핏으로
                마른사람에게는 체형보완
                허벅돼들에겐 여유있는 핏 가능합니다 !

                일반 리벳이 아니라 별모양 리벳으로 배바지해도 포인트가 되어주고

                특히 이 사이드핀턱 디테일이 포인트가 되어주니까
                집에있는 어떤 옷이든 잘 어울릴거에요 :)

                품절되기전에 이 버뮤다팬츠는 얼른 챙겨가세요🙌`
    },
    {
      id: 4,
      imgSrc: "/images/template4.png",
      contents: `업데이트 때마다 항상 큰 사랑을 받는
                레이어드 상품!!

                따뜻해진 날씨에 맞게
                가벼운 레이어드 나시를 만들어왔어요🤍
                아우터나 상의와 함께 코디하기 좋고,
                끈 나시가 아니라서
                아우터를 오픈하여 함께 입어도 부담스럽지 않아요〰👀

                [BAONHAUS] 포틀 셔링 레이어드 나시`
    }
  ];
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const [text, setText] = useState<string>("");
  return (
    <>
      <h1 className="text-2xl font-bold mt-10">템플릿 선택</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {list.map((item, index) => (
          <InstagramCard
            selected={selectedItem === item.id}
            onClick={() => setSelectedItem(item.id)}
            key={index}
            item={item}
          />
        ))}
        <div className="mt-10">
          <textarea
            onClick={() => setSelectedItem(0)}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-40 border rounded-lg p-2"
          />
        </div>
        <div className="mt-10 flex justify-end items-center">
          <h2 className="text-xl font-bold text-blue-400">{selectedItem ? `${selectedItem}번 템플릿` : "직접 입력"}</h2>
          <Link href="/instagram/review" className="bg-blue-500 text-white ml-4 px-4 py-2 rounded-md">
            다음
          </Link>
        </div>
      </div>
    </>
  );
};

export default InstagramTemplatePage;
