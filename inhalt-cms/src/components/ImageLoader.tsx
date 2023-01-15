import React, { useState } from "react";
interface Props {
  src: string;
}

export const ImageLoader = (props: Props) => {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      {!loading ? (
        <img
          className="w-full min-w-[12rem] h-48 md:w-48 object-cover rounded-lg"
          alt="post"
          src={
            "https://images.unsplash.com/photo-1668712841504-d392ff984d9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
          }
        />
      ) : null}
      <img
        src={props.src}
        className={`w-full min-w-[12rem] h-48 md:w-48 object-cover rounded-lg ${
          loading ? "hidden" : "block"
        }`}
        onLoad={() => setLoading(true)}
        onError={() => setLoading(false)}
      />
    </div>
  );
};
