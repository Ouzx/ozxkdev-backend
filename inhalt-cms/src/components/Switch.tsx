import { useState, forwardRef, Ref } from "react";

interface ToggleProps {
  enabled: boolean;
}

export const Toggle = forwardRef((props: ToggleProps, ref: Ref<any>) => {
  const [enabled, setEnabled] = useState(props.enabled);
  const [status, setStatus] = useState("Public");
  return (
    <div className="flex relative items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
            ref={ref}
          />
          <div
            onClick={() => {
              setEnabled(!enabled);
              if (enabled) setStatus("Private");
              else setStatus("Public");
            }}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-700"
          ></div>
          <span className="ml-2 text-sm font-medium text-gray-900">
            {status}
          </span>
        </label>
      </div>
    </div>
  );
});
