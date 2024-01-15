import axios from "../../utils/axios/axios";
import wrapPromise from "../../utils/suspense/wrapPromise";

const promise = new Promise<any>(async (resolve, reject) => {
  try {
    resolve((await axios.get("schema/connections")).data);
  } catch (error) {
    reject(error);
  }
});

export default wrapPromise(promise);
