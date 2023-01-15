import { useRef, useEffect, useState } from "react";
import { useLoginMutation } from "../redux/services/userCore";
import { AuthLoginResponse } from "../redux/types";
import { useAppDispatch } from "../redux/hooks";
import { setLogin } from "../redux/features/authSlice";

import InputBox from "../components/InputBox";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import DarkModeToggle from "../components/DarkModeToggle";

import EyeToggle from "../components/EyeToggle";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [user, setUser] = useLocalStorage("user");
  const [isOn, setIsOn] = useState(false);
  const onClickEye = () => {
    setIsOn(!isOn);
  };

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

  const logme = () => {
    const authData: AuthLoginResponse = data;

    if (authData.accessToken) {
      setUser(authData);
    }
    dispatch(setLogin(authData));
    navigate("/");
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
        logme();
      }
    }
  }, [isError, isSuccess, isLoading]);
  // const [eyeToggle, isOn] = EyeToggle();
  return (
    <div className="flex flex-1 justify-center items-center h-screen">
      <div className="flex flex-1 max-w-2xl relative flex-col space-y-3 justify-center items-center mb-32 p-6 pb-12 dark:bg-dblackOver dark:text-white bg-gray-100 ">
        <h2>Inhalt Login</h2>
        <div className="absolute top-4 right-4">
          <DarkModeToggle />
        </div>
        <InputBox
          type="email"
          id="username"
          title="Username: "
          ref={usernameRef}
        />
        <InputBox
          type={isOn ? "text" : "password"}
          id="password"
          title="Password: "
          ref={passwordRef}
          icon={<EyeToggle onclick={onClickEye} />}
        />
        <button
          className=" text-slate-50 text-center dark:bg-purple-700 dark:hover:bg-purple-800 bg-purple-500 hover:bg-purple-600 w-24 h-8 rounded-md "
          onClick={onClickLogin}
        >
          Login
        </button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
    </div>
  );
};

export default Login;
