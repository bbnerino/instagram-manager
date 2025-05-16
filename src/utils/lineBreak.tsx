import React from "react";

const LineBreak = ({ children }: { children: string }) => {
  return (
    <div>
      {children.split("\n").map((line, idx) => (
        <React.Fragment key={idx}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default LineBreak;
