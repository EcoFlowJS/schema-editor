import axios from "../../utils/axios/axios";

const deleteConnectionService = (ConnectionName: string): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      resolve(
        (
          await axios.delete("schema/connection", {
            data: { ConnectionName: ConnectionName },
          })
        ).data
      );
    } catch (err) {
      reject(err);
    }
  });
};

export default deleteConnectionService;
