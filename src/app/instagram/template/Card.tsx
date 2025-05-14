import Image from "next/image";
import React from "react";

const InstagramCard = ({
  item,
  selected,
  onClick
}: {
  item: { imgSrc: string; contents: string };
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-6 mb-6 shadow-md cursor-pointer ${
        selected ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <Image src={item.imgSrc} alt="img" width={400} height={400} />
      <p className="text-gray-500 text-sm mt-4">
        {item.contents.split("\n").map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default InstagramCard;
