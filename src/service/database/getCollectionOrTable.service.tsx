import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";
import { ApiResponse } from "@ecoflow/types";

const getCollectionOrTable = async (
  connectionName: string
): Promise<ApiResponse> => {
  const res = await axios.get(`schema/collectionsORtables/${connectionName}`);

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default getCollectionOrTable;
