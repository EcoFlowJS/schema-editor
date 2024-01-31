import axios from "../../utils/axios/axios";

const getConnectionConfigPromiseService = (DatabaseID: string): Promise<any> =>
  new Promise<any>(async (resolve, reject) => {
    try {
      resolve((await axios.get(`schema/connectionConfig/${DatabaseID}`)).data);
    } catch (error) {
      reject(error);
    }
  });

export default getConnectionConfigPromiseService;
