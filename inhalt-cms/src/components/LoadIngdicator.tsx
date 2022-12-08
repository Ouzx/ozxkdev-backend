import { InfinitySpin } from "react-loader-spinner";

const LoadIngdicator: React.FC<{
  color: string;
  backgroundColor?: string;
}> = ({ color, backgroundColor = "gray-100" }) => {
  return (
    <div
      className={`flex flex-1 items-center justify-center bg-${backgroundColor}`}
    >
      <InfinitySpin color={color} />
    </div>
  );
};

export default LoadIngdicator;
