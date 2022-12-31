import { useNavigate } from "react-router-dom";
import svgImg from "../assets/cat";

const FourOhFour = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex items-center">
      <div className="container bg-white flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Sorry I couldn't find this page.{" "}
          </p>
          <p className="mb-8">
            But dont worry, you can find plenty of other things on my homepage.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-purple bg-purple-600 active:bg-purple-600 hover:bg-purple-700"
          >
            Back to homepage
          </button>
        </div>
        <div className="max-w-lg">{svgImg}</div>
      </div>
    </div>
  );
};

export default FourOhFour;
