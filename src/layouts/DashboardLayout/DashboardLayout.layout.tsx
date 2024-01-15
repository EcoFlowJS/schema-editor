import { useLayoutEffect } from "react";
import Dashboard from "../../pages/Dashboard/Dashboard.page";

export default function DashboardLayout() {
  useLayoutEffect(() => {
    document.title = "Schema Dashboard";
    window.history.replaceState(null, document.title, window.location.href);
  }, []);
  return <Dashboard />;
}
