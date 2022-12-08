import { InfinitySpin } from "react-loader-spinner";

const LoadIngdicator: React.FC<{
  color?: string;
  backgroundColor?: string;
}> = ({ color = "black", backgroundColor = "gray-100" }) => {
  return (
    <div
      className={`flex flex-1 self-center items-center justify-center bg-${backgroundColor}`}
    >
      <InfinitySpin color={color} />
    </div>
  );
};

export default LoadIngdicator;
