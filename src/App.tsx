import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import themeMode from "./store/theme.mode";
import { CustomProvider } from "rsuite";
import Loading from "./components/Loading/Loading.component";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.componennt";
import Routes from "./routes/Routes";

function App() {
  const [darkMode] = useAtom(themeMode);
  useEffect(() => {
    document.title = "Loading...";
  }, []);
  return (
    <CustomProvider theme={darkMode ? "dark" : "light"}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes />
        </ErrorBoundary>
      </Suspense>
    </CustomProvider>
  );
}

export default App;
