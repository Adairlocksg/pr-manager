import Login from "@/components/login/login";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};

export default Router;
