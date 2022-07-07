import React, { useEffect, useRef } from "react";

export default function TextArea({ value, action, className }) {
  const textArea = useRef();

  useEffect(() => {
    if (textArea.current) {
      textArea.current.style.height = textArea.current.scrollHeight + "px";
    }
  }, [textArea]);

  return (
    <textarea
      ref={textArea}
      rows="1"
      style={{ resize: "none" }}
      className={className}
      placeholder="write your text here..."
      value={value}
      onChange={(e) => {
        action(e);
        textArea.current.style.height =
          Math.max(textArea.current.scrollHeight, 30) + "px";
      }}
    ></textarea>
  );
}
