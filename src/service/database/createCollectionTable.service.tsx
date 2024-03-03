import { ApiResponse } from "@eco-flow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const createCollectionTable = async (
  id: string,
  Data: any
): Promise<ApiResponse> => {
  const res = await axios.post(`schema/collectionsORtables/${id}`, Data, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default createCollectionTable;
