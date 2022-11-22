import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const TextBox: React.FC<{ height: number }> = ({ height }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("<b>Start writing</b>");

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={{
        readonly: false,
        height,
      }}
      onBlur={(newValue: string) => {
        setContent(newValue);
      }}
    />
  );
};

export default TextBox;
