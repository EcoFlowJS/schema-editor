import { Outlet, useLocation } from "react-router-dom";
import { initService } from "../../service/init/init.service";
import useNavagator from "../../utils/redirect/redirect";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import initStatusState, {
  isLoggedIn,
  isLoggedOut,
} from "../../store/initStatusState.store";
import { FlexboxGrid } from "rsuite";
import Loading from "../../components/Loading/Loading.component";

export default function BaseLayout() {
  const redirect = (url: string) => {
    window.location.replace(window.location.origin + url);
  };
  const navigate = useNavagator();
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [initStatus, setinitStatus] = useAtom(initStatusState);
  const [loggedOut, setLoggedOut] = useAtom(isLoggedOut);
  const [loggedIn, setLoggedIn] = useAtom(isLoggedIn);

  useEffect(() => {
    initService().then((status) => {
      setinitStatus({ ...status });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (initStatus.isNew && !initStatus.isLoggedIn) redirect("/auth/setup");
      if (!initStatus.isNew && !initStatus.isLoggedIn) redirect("/auth/login");
      if (!initStatus.isNew && initStatus.isLoggedIn)
        navigate(location.pathname.substring("/editor/schema/".length));
      if (
        location.pathname === "/editor/schema" ||
        location.pathname === "/editor/schema/"
      )
        navigate("dashboard");
    }
  }, [location.pathname, initStatus]);

  useEffect(() => {
    if (loggedOut) {
      setLoggedOut(false);
      setinitStatus({ ...initStatus, isLoggedIn: false });
    }
  }, [loggedOut]);

  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(false);
      setinitStatus({ ...initStatus, isLoggedIn: true });
    }
  }, [loggedIn]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (!initStatus.isNew && initStatus.isLoggedIn) ||
        (initStatus.isNew && initStatus.isLoggedIn) ? (
        <Outlet />
      ) : (
        <>
          <FlexboxGrid
            style={{ height: "100vh" }}
            justify="center"
            align="middle"
          >
            {initStatus.isNew && !initStatus.isLoggedIn
              ? "Redirecting to setup"
              : ""}
            {!initStatus.isNew && !initStatus.isLoggedIn
              ? "Redirecting to Login"
              : ""}
          </FlexboxGrid>
        </>
      )}
    </>
  );
}
