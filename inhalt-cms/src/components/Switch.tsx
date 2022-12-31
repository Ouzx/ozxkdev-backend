import { useState, forwardRef, Ref, useEffect } from "react";

interface ToggleProps {
  enabled: boolean;
}

// TODO: Known issue: It shows the true data but not switching trully
export const Toggle = forwardRef((props: ToggleProps, ref: Ref<any>) => {
  const [enabled, setEnabled] = useState(props.enabled);
  const [status, setStatus] = useState("Public");

  useEffect(() => {
    setStatus(enabled ? "Public" : "Private");
  }, [enabled]);

  useEffect(() => {
    setEnabled(props.enabled);
  }, [props.enabled]);

  return (
    <div className="flex  justify-center items-center ">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={enabled}
        readOnly
        ref={ref}
      />
      <div
        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer mr-3 ${
          enabled ? "bg-purple-700" : "bg-purple-200"
        } `}
        onClick={() => {
          setEnabled(!enabled);
        }}
      >
        <div
          className={
            "bg-white h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
            (!enabled ? null : "transform translate-x-5")
          }
        />
      </div>
      <div>{status}</div>
    </div>
  );
});
