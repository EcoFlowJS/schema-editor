import { Outlet, useLocation } from "react-router-dom";
import initService from "../../service/init/init.service";
import useNavagator from "../../utils/redirect/redirect";
import { useEffect } from "react";

export default function BaseLayout() {
  const redirect = (url: string) => () => {
    window.location.replace(window.location.origin + url);
  };
  const status = initService();
  const navigate = useNavagator();
  const location = useLocation();

  useEffect(() => {
    if (status.isNew && !status.isLoggedIn) redirect("/auth/setup");
    if (!status.isNew && !status.isLoggedIn) redirect("/auth/login");
    if (!status.isNew && status.isLoggedIn)
      navigate(location.pathname.substring("/editor/schema/".length));
    if (
      location.pathname === "/editor/schema" ||
      location.pathname === "/editor/schema/"
    )
      navigate("dashboard");
  }, [location.pathname]);

  return <Outlet />;
}
