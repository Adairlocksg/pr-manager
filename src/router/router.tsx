import Manager from "@/components/manager";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/settings/:id" element={<Manager />} />
    </Routes>
  );
};

export default Router;
