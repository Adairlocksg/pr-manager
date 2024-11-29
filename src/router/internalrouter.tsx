import Manager from "@/components/manager/manager";
import { Route, Routes } from "react-router-dom";

const InteralRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<Manager />} />
    </Routes>
  );
};

export default InteralRouter;
