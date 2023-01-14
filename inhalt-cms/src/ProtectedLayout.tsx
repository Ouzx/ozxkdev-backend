import { Suspense } from "react";

import { AuthLoginResponse } from "./redux/types";
import { useAppDispatch } from "./redux/hooks";
import { setLogin } from "./redux/features/authSlice";

import { Navigate, Outlet, Await } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";

import Navbar from "./components/Navbar/Navbar";
import LoadIngdicator from "./components/LoadIngdicator";
import { FourOhFour } from "./pages";
const ProtectedLayout = () => {
  const [user, setUser] = useLocalStorage("user");

  // update authSlice with user data
  const dispatch = useAppDispatch();
  const authData: AuthLoginResponse = user!;

  if (!user) return <Navigate to="/404" replace={true} />;

  const validator = async () => {
    try {
      const result = await fetch("http://localhost:8000/auth/validate-token", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.accessToken!}`,
        },
      })
        .then((res) => {
          if (!res.ok) return Promise.reject(res);
          else {
            dispatch(setLogin(authData));
            return Promise.resolve(res);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return (
    <Suspense fallback={<LoadIngdicator />}>
      <Await
        resolve={validator()}
        errorElement={<FourOhFour />}
        children={
          <>
            <Navbar />
            <Outlet />
          </>
        }
      />
    </Suspense>
  );
};

export default ProtectedLayout;
