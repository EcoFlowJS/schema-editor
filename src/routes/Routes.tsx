import { Error404 } from "@eco-flow/components-lib";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout/BaseLayout.layout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout.layout";
import DatabaseBaseLayout from "../layouts/DatabaseBaseLayout/DatabaseBaseLayout.layout";
import DatabaseLayout from "../layouts/DatabaseLayout/DatabaseLayout.layout";

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/editor/schema");
  }, []);
  return null;
};

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/editor" element={<Redirect />} />
        <Route path="/editor/schema" element={<BaseLayout />}>
          <Route path="dashboard" element={<DashboardLayout />} />
          <Route path="database" element={<DatabaseBaseLayout />}>
            <Route index element={<Redirect />} />
            <Route path=":id" element={<DatabaseLayout />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
