import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";
import { ApiResponse } from "@ecoflow/types";

const updateDatabaseData = async (
  id: string,
  tableCollection: string,
  oldData: { [key: string]: any },
  newData: { [key: string]: any }
) => {
  const res = await axios.patch(
    `schema/DatabaseData/${id}/${tableCollection}/update`,
    { oldData, newData },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default updateDatabaseData;
