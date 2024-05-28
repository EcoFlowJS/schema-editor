import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const directoryFetcher = async (
  path?: string,
  type?: "Directory" | "File"
): Promise<ApiResponse> => {
  const res = await axios.post(
    `directoriesStatus`,
    { path, type },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default directoryFetcher;
