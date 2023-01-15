import React, { useState, Ref } from "react";

interface Props {
  title: string;
  value?: string;
  id?: string;
  type?: string;
  icon?: React.ReactNode;
}

const InputBox = React.forwardRef(
  (props: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="relative">
        <label className="block" htmlFor={props.id}>
          {props.title}
        </label>
        <div>
          <input
            type={props.type || "text"}
            id={props.id}
            name={props.id}
            ref={ref}
            defaultValue={props.value}
            required
            className="p-1 pl-2 border box-border text-black border-gray-400 rounded-md"
          />
          <div className="absolute box-border right-1 top-1/2">
            {props.icon}
          </div>
        </div>
      </div>
    );
  }
);

export default InputBox;
