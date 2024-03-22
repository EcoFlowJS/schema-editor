import { ConnectionDefinations } from "@eco-flow/types";
import axios from "../../utils/axios/axios";

const editConnectionService = async (connections: ConnectionDefinations) => {
  connections.Port = Number(connections.Port);
  const data = await axios.patch("schema/connection", connections, {
    headers: { "Content-Type": "application/json" },
  });

  return data.data;
};

export default editConnectionService;
