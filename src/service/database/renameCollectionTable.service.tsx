import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const renameCollectionTable = async (
  id: string,
  collectionTableOldName: string,
  collectionTableNewName: string
): Promise<ApiResponse> => {
  const res = await axios.patch(
    `schema/collectionsORtables/${id}`,
    { collectionTableOldName, collectionTableNewName },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default renameCollectionTable;
