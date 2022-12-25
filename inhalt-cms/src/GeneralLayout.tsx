import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";

const GeneralLayout = () => {
  const [user, setUser] = useLocalStorage("user");

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default GeneralLayout;
