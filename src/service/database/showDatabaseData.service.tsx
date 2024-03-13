import { ApiResponse } from "@eco-flow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const getDatabaseData = async (
  connectionID: string,
  collectionORtableName: string,
  documentID?: string,
  subKey?: string
): Promise<ApiResponse> => {
  const res = await axios.get(
    `/schema/DatabaseData/${connectionID}/${collectionORtableName}${
      documentID && subKey ? `/${subKey}/${documentID}` : ""
    }`
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default getDatabaseData;
