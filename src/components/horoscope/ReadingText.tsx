import React from "react";
import { parseReading } from "@/lib/readingText";

function ReadingText({ text }: { text: string }) {
  const blocks = parseReading(text);
  if (blocks.length === 0) return null;
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
        if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </>
  );
}

export default ReadingText;
