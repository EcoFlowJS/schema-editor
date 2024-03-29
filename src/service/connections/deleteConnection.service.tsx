import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const deleteConnectionService = async (
  ConnectionName: string
): Promise<ApiResponse> => {
  const res = await axios.delete(`schema/connection/${ConnectionName}`);

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default deleteConnectionService;
