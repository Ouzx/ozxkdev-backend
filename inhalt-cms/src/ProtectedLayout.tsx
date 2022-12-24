import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Navbar from "./components/Navbar/Navbar";
const ProtectedLayout = () => {
  const [user, setUser] = useLocalStorage("user");
  console.log(user);

  if (!user) {
    return <Navigate to="/santacruze" />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
