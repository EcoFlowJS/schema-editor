import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import themeMode from "./store/theme.mode";
import { CustomProvider, Loader } from "rsuite";
import Loading from "./components/Loading/Loading.component";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.componennt";
import Routes from "./routes/Routes";
import { isClosedServer, isRestartingServer } from "./store/server.store";
import isServerOnline from "./service/server/isServerOnline.service";

function App() {
  const [darkMode] = useAtom(themeMode);
  const [restartingServer, setRestartingServer] = useAtom(isRestartingServer);
  const [closedServer, setClosedServer] = useAtom(isClosedServer);

  useEffect(() => {
    document.title = "Loading...";
    isServerOnline([setClosedServer, setRestartingServer]);
  }, []);

  return (
    <>
      {typeof closedServer === "boolean" && closedServer ? (
        <></>
      ) : (
        <CustomProvider theme={darkMode ? "dark" : "light"}>
          {typeof restartingServer === "boolean" && restartingServer ? (
            <Loader backdrop content="loading..." />
          ) : (
            <Suspense fallback={<Loading />}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Routes />
              </ErrorBoundary>
            </Suspense>
          )}
        </CustomProvider>
      )}
    </>
  );
}

export default App;
