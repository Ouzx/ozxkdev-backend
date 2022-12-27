import React, { useState, Ref } from "react";

interface Props {
  title: string;
  value?: string;
  id?: string;
  type?: string;
}

const InputBox = React.forwardRef(
  (props: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <div>
        <label className="block" htmlFor={props.id}>
          {props.title}
        </label>
        <input
          type={props.type || "text"}
          id={props.id}
          name={props.id}
          ref={ref}
          defaultValue={props.value}
          required
          className="p-1 pl-2 border border-gray-400 rounded-md"
        />
      </div>
    );
  }
);

export default InputBox;
