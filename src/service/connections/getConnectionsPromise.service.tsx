import axios from "../../utils/axios/axios";

const getConnectionsPromise = (await axios.get("schema/connections")).data;

export default getConnectionsPromise;
