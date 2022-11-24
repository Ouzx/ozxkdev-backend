import React, { useState, Ref } from "react";
import JoditEditor, { Jodit } from "jodit-react";

interface props {
  height: number;
}
// TODO: Bullet points are not working
const RichTextBox = React.forwardRef((prop: props, ref: Ref<Jodit>) => {
  const [content, setContent] = useState("");
  const height = prop.height;
  return (
    <JoditEditor
      ref={ref}
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
});

export default RichTextBox;
