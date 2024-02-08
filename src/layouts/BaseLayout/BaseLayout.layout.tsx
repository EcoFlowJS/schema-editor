import { Outlet, useLocation } from "react-router-dom";
import initService from "../../service/init/init.service";
import useNavagator from "../../utils/redirect/redirect";
import { useEffect } from "react";
import { useAtom } from "jotai";
import initStatusState from "../../store/initStatusState.store";
import { FlexboxGrid } from "rsuite";

export default function BaseLayout() {
  const redirect = (url: string) => {
    window.location.replace(window.location.origin + url);
  };
  const status = initService();
  const navigate = useNavagator();
  const location = useLocation();
  const [_initStatus, setinitStatus] = useAtom(initStatusState);

  useEffect(() => {
    setinitStatus({ ...status });
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

  return (
    <>
      {(!status.isNew && status.isLoggedIn) ||
      (status.isNew && status.isLoggedIn) ? (
        <Outlet />
      ) : (
        <>
          <FlexboxGrid
            style={{ height: "100vh" }}
            justify="center"
            align="middle"
          >
            {status.isNew && !status.isLoggedIn ? "Redirecting to setup" : ""}
            {!status.isNew && !status.isLoggedIn ? "Redirecting to Login" : ""}
          </FlexboxGrid>
        </>
      )}
    </>
  );
}
