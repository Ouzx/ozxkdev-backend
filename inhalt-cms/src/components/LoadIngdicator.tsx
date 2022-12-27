import { InfinitySpin } from "react-loader-spinner";

const LoadIngdicator: React.FC<{
  color?: string;
  backgroundColor?: string;
  width?: string;
}> = ({ color = "black", backgroundColor = "gray-100", width = "200" }) => {
  return (
    <div
      className={`flex flex-1 self-center items-center justify-center ${backgroundColor}`}
    >
      <InfinitySpin color={color} width={width} />
    </div>
  );
};

export default LoadIngdicator;
