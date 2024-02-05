import { ApiResponse } from "@eco-flow/types";
import axios from "../../utils/axios/axios";

const isBackedEndOnlineService = async (): Promise<ApiResponse> => {
  try {
    return (await axios.get("/server/isOnline")).data as ApiResponse;
  } catch {
    return {
      error: true,
      payload: { isServerOnline: false },
    };
  }
};

const isServerOnline = ([_restartingServer, setRestartingServer]: [
  Awaited<any>,
  any
]) => {
  // const [_restartingServer, setRestartingServer] = useAtom(isRestartingServer);
  isBackedEndOnlineService().then((val) => {
    if (val.success) setTimeout(() => setRestartingServer(false), 1000);
    if (val.error) {
      setRestartingServer(true);
      setTimeout(
        () => isServerOnline([_restartingServer, setRestartingServer]),
        1000
      );
    }
  });
};

export default isServerOnline;
