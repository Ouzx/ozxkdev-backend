import React, { useState } from "react";
import eyeOn from "../assets/eyeon.svg";
import eyeOff from "../assets/eyeoff.svg";

const EyeToggle: React.FC<{
  onclick(): void;
}> = (onclick) => {
  const [isOn, setIsOn] = useState(false);
  let icon = isOn ? eyeOn : eyeOff;
  const onClick = () => {
    setIsOn(!isOn);
    onclick.onclick();
  };
  return (
    <button onClick={onClick} className="w-6 h-6 box-border">
      <img src={icon} />
    </button>
  );
};

export default EyeToggle;
