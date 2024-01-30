import axios from "../../utils/axios/axios";

const getConnectionsService = () => {
  return new Promise<any>(async (resolve) =>
    resolve((await axios.get("schema/connections")).data)
  );
};

export default getConnectionsService;
