import { Suspense } from "react";

import { Navigate, Outlet, Await } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";

import Navbar from "./components/Navbar/Navbar";
import LoadIngdicator from "./components/LoadIngdicator";
const ProtectedLayout = () => {
  const [user, setUser] = useLocalStorage("user");

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
          else return Promise.resolve(res);
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
        errorElement={<div>404</div>}
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
