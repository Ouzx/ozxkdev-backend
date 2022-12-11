import { useRef, useEffect } from "react";
import { useLoginMutation } from "../redux/services/userCore";
import { AuthLoginResponse } from "../redux/types";

import InputBox from "../components/InputBox";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation();

  const toastMsg = () =>
    toast.loading("Logging in", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onClickLogin = () => {
    if (usernameRef.current && passwordRef.current) {
      login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.update(toastMsg(), {
        render: "Login Failed",
        type: "error",
        isLoading: false,
      });
    } else if (isSuccess) {
      toast.update(toastMsg(), {
        render: "Login Successful",
        type: "success",
        isLoading: false,
      });
      if (data) {
        const authData: AuthLoginResponse = data;
        console.log(authData);
        localStorage.setItem("accessToken", authData.accessToken);
        navigate("/");
      }
    }
  }, [isError, isSuccess, isLoading]);

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-1 max-w-2xl flex-col space-y-3 justify-center items-center mb-32 p-6 pb-12  bg-gray-100 ">
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
          onClick={onClickLogin}
        >
          Login
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
