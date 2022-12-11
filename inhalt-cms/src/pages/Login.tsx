import { useRef } from "react";
import InputBox from "../components/InputBox";
const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-1 justify-center items-center">
      <form className="flex flex-1 max-w-2xl flex-col space-y-3 justify-center items-center mb-32 p-6 pb-12  bg-gray-100 ">
        <h2>Inhalt Login</h2>
        <InputBox
          type="email"
          id="username"
          title="Username: "
          ref={usernameRef}
        />
        <InputBox
          type="password"
          id="password"
          title="Password: "
          ref={passwordRef}
        />
        <button
          className=" text-slate-50 text-center bg-green-500 hover:bg-green-600 w-24 h-8 rounded-md "
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
