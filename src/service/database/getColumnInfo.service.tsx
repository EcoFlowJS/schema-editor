import { ApiResponse } from "@eco-flow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const getColumnInfo = async (
  id: string,
  tableName: string
): Promise<ApiResponse> => {
  const res = await axios.get(`schema/tableColumn/${id}/${tableName}`);

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default getColumnInfo;
