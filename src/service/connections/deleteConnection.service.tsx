import axios from "../../utils/axios/axios";

const deleteConnectionService = async (
  ConnectionName: string
): Promise<any> => {
  return (await axios.delete("schema/connection", { data: { ConnectionName } }))
    .data;
};

export default deleteConnectionService;
