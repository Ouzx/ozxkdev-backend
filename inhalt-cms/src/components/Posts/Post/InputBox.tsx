import React, { useState, Ref } from "react";

interface props {
  title: string;
}

const InputBox = React.forwardRef((prop: props, ref: Ref<HTMLInputElement>) => {
  return (
    <div>
      <p>{prop.title}</p>
      <input ref={ref} className=" border border-gray-400 rounded-md" />
    </div>
  );
});

export default InputBox;
