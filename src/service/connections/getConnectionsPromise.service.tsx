import axios from "../../utils/axios/axios";
import wrapPromise from "../../utils/suspense/wrapPromise";

const getConnectionsPromise = wrapPromise(
  new Promise<any>(async (resolve, reject) => {
    try {
      resolve((await axios.get("schema/connections")).data);
    } catch (error) {
      reject(error);
    }
  })
);

export default getConnectionsPromise;
