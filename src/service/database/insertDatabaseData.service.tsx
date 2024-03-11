import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";
import { ApiResponse } from "@eco-flow/types";

const insertDatabaseData = async (
  id: string,
  tableCollection: string,
  insertData: { [key: string]: any }
) => {
  const res = await axios.post(
    `schema/DatabaseData/${id}/${tableCollection}/insert`,
    { insertData },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default insertDatabaseData;
