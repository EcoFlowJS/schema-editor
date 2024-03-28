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
import { useNotification } from "@eco-flow/components-lib";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../../store/notification.store";
import { Socket } from "socket.io-client";
import fetchUserPermissions from "../../service/user/fetchUserPermissions.service";
import {
  permissionFetched,
  userPermissions as userPermissionsList,
} from "../../store/users.store";
import defaultPermissions from "../../defaults/defaultPermissions.default";
import {
  connectSocketIO,
  disconnectSocketIO,
} from "../../utils/socket.io/socket.io";
import baseSocketIOHndlers from "./baseSocketIO.handlers";
import userSignoutService from "../../service/user/userSignout.service";

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

  const [successNotificationMessage, setSuccessNotificationMessage] =
    useAtom(successNotification);
  const [errorNotificationMessage, setErrorNotificationMessage] =
    useAtom(errorNotification);
  const [warningNotificationMessage, setWarningNotificationMessage] =
    useAtom(warningNotification);

  //User Permissions states
  const [userPermissions, setUserPermissions] = useAtom(userPermissionsList);
  const [isPermissionsFetched, setPermissionFetched] =
    useAtom(permissionFetched);
  const [isSocketConnected, setSocketConnected] = useState(false);
  let socket: Socket | null = null;

  const errorNoti = useNotification({
    type: "error",
    header: (
      <>
        {errorNotificationMessage.header ? errorNotificationMessage.header : ""}
      </>
    ),
    placement: errorNotificationMessage.placement,
    children: (
      <>
        {errorNotificationMessage.message
          ? errorNotificationMessage.message
          : ""}
      </>
    ),
  });

  const successNoti = useNotification({
    type: "success",
    header: (
      <>
        {successNotificationMessage.header
          ? successNotificationMessage.header
          : ""}
      </>
    ),
    placement: successNotificationMessage.placement,
    children: (
      <>
        {successNotificationMessage.message
          ? successNotificationMessage.message
          : ""}
      </>
    ),
  });

  const warningNoti = useNotification({
    type: "warning",
    header: (
      <>
        {warningNotificationMessage.header
          ? warningNotificationMessage.header
          : ""}
      </>
    ),
    placement: warningNotificationMessage.placement,
    children: (
      <>
        {warningNotificationMessage.message
          ? warningNotificationMessage.message
          : ""}
      </>
    ),
  });

  //initial state change
  useEffect(() => {
    initService().then((status) => {
      setinitStatus({ ...status });
      setLoading(false);
    });

    return () => {
      if (isSocketConnected && socket !== null) disconnectSocketIO(socket)();
    };
  }, []);

  //setting up user status
  useEffect(() => {
    if (!isLoading) {
      if (initStatus.isNew && !initStatus.isLoggedIn) redirect("/auth/setup");
      if (!initStatus.isNew && !initStatus.isLoggedIn) redirect("/auth/login");
      if (!initStatus.isNew && initStatus.isLoggedIn) {
        navigate(location.pathname.substring("/editor/schema/".length));
        if (
          location.pathname === "/editor/schema" ||
          location.pathname === "/editor/schema/"
        )
          navigate("dashboard");
        fetchUserPermissions("Permissions").then((response) => {
          if (response.success) {
            setPermissionFetched(true);
            setUserPermissions({
              ...defaultPermissions,
              ...response.payload.permissions,
            });
          }
        });
      }
    }
  }, [location.pathname, initStatus]);

  //socket connection and disconnect
  useEffect(() => {
    if (
      !isLoading &&
      !initStatus.isNew &&
      initStatus.isLoggedIn &&
      socket === null
    ) {
      socket = socket !== null ? socket : connectSocketIO(initStatus.userID);
      socket.on("connect", () => setSocketConnected(true));
      socket.on("disconnect", () => setSocketConnected(false));
      baseSocketIOHndlers(socket, initStatus.userID!).onRoleUpdate(
        ({ isActiveUser, roles }) => {
          if (!isActiveUser) {
            setinitStatus({ ...initStatus, isLoggedIn: false });
            userSignoutService().then(() => {
              if (socket !== null) {
                disconnectSocketIO(socket)();
                socket = null;
              }
            });
            return;
          }
          setUserPermissions({ ...defaultPermissions, ...roles });
        }
      );
      return;
    }

    if (socket !== null) disconnectSocketIO(socket)();
  }, [initStatus]);

  //Check if user has permissions for Schema Editor.
  useEffect(() => {
    if (
      isPermissionsFetched &&
      !userPermissions.administrator &&
      !userPermissions.schemaEditor
    )
      redirect("/auth/login");
  }, [userPermissions]);

  //Logout state change
  useEffect(() => {
    if (loggedOut) {
      setLoggedOut(false);
      setinitStatus({ ...initStatus, isLoggedIn: false });
    }
  }, [loggedOut]);

  //Login state chnage
  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(false);
      setinitStatus({ ...initStatus, isLoggedIn: true });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (successNotificationMessage.show) {
      setSuccessNotificationMessage({
        ...successNotificationMessage,
        show: false,
      });
      successNoti.show();
    }
  }, [successNotificationMessage]);

  useEffect(() => {
    if (errorNotificationMessage.show) {
      setErrorNotificationMessage({ ...errorNotificationMessage, show: false });
      errorNoti.show();
    }
  }, [errorNotificationMessage]);

  useEffect(() => {
    if (warningNotificationMessage.show) {
      setWarningNotificationMessage({
        ...warningNotificationMessage,
        show: false,
      });
      warningNoti.show();
    }
  }, [warningNotificationMessage]);

  return (
    <>
      {isLoading ||
      (!initStatus.isNew && initStatus.isLoggedIn && !isPermissionsFetched) ? (
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
