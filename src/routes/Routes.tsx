import { Error404 } from "@ecoflow/components-lib";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout/BaseLayout.layout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout.layout";
import DatabaseBaseLayout from "../layouts/DatabaseBaseLayout/DatabaseBaseLayout.layout";
import DatabaseIntro from "../components/DatabaseIntro/DatabaseIntro.component";
import SchemaEditor from "../components/SchemaEditor/SchemaEditor.component";
import Database from "../pages/Database/Database.component";
import CreateTableCollection from "../components/DatabaseTableCollection/CreateTableCollection/CreateTableCollection.component";

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/editor/schema");
  }, []);
  return null;
};

export default function () {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />
      <Route path="/editor" element={<Redirect />} />
      <Route path="/editor/schema" element={<BaseLayout />}>
        <Route path="dashboard" element={<DashboardLayout />} />
        <Route path="database" element={<DatabaseBaseLayout />}>
          <Route index element={<Redirect />} />
          <Route path=":id" element={<Database />}>
            <Route index element={<DatabaseIntro />} />
            <Route
              path=":driver/:collectonORtable"
              element={<SchemaEditor />}
            />
            <Route path="create/:driver" element={<CreateTableCollection />} />
          </Route>
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <Error404 showBackButton onClick={() => navigate("/editor/schema")} />
        }
      />
    </Routes>
  );
}
