import React, { useState, forwardRef, useEffect, Ref } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setDarkMode } from "../redux/features/themeSlice";
// import { useLocalStorage } from "../hooks/useLocalStorage";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";

interface ToggleProps {
  enabled: boolean;
}
export const Toggle = forwardRef((props: ToggleProps, ref: Ref<any>) => {
  const [enabled, setEnabled] = useState(props.enabled);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setDarkMode(enabled));
  }, [enabled]);

  useEffect(() => {
    setEnabled(props.enabled);
  }, [props.enabled]);

  return (
    <div className="flex  justify-center items-center mr-3 ">
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
        {
          <img
            src={enabled ? moon : sun}
            className={
              "bg-white h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (!enabled ? null : "transform translate-x-5 rotate-45")
            }
          ></img>
        }
      </div>
    </div>
  );
});

const DarkModeToggle = () => {
  const [enabled, setEnabled] = useState(false);
  // TODO: add local storage

  return <Toggle enabled={enabled} />;
};

export default DarkModeToggle;
