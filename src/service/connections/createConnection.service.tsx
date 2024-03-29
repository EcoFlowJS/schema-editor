import { ConnectionDefinations } from "@ecoflow/types";
import axios from "../../utils/axios/axios";

const createConnectionService = async (connections: ConnectionDefinations) => {
  connections.Port = Number(connections.Port);
  const data = await axios.post("schema/connection", connections, {
    headers: { "Content-Type": "application/json" },
  });

  return data.data;
};

export default createConnectionService;
