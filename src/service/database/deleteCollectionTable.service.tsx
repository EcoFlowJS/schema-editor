import { ApiResponse } from "@ecoflow/types";
import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";

const deleteCollectionTable = async (
  id: string,
  collectionTable: string
): Promise<ApiResponse> => {
  const res = await axios.delete(
    `schema/collectionsORtables/${id}/${collectionTable}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default deleteCollectionTable;
