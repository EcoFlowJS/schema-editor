import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";
import { ApiResponse } from "@ecoflow/types";

const deleteDatabaseData = async (
  id: string,
  tableCollection: string,
  dataID: string
) => {
  const res = await axios.delete(
    `schema/DatabaseData/${id}/${tableCollection}/delete/${dataID}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default deleteDatabaseData;
