import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import GeneralLayout from "./GeneralLayout";
import { Login, Home, Post, Search } from "./pages";
import ProtectedLayout from "./ProtectedLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<GeneralLayout />}>
        <Route path="/santacruze" element={<Login />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/search/:searchValue" element={<Search />} />
      </Route>
      <Route path="*" element={<div>404 {}</div>} />
    </>
  )
);
