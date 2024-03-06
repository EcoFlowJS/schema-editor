import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";
import { ApiResponse, DatabaseColumnData } from "@eco-flow/types";

const commitSaveTables = async (
  id: string,
  table: string,
  columnData: DatabaseColumnData
) => {
  const res = await axios.post(
    `schema/tableColumn/${id}/${table}`,
    { columnData },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default commitSaveTables;
