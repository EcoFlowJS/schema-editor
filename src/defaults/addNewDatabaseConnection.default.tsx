import { ConnectionDefinations } from "@eco-flow/types";

const addNewDatabaseConnection: ConnectionDefinations = {
  ConnectionName: "",
  dbDriver: "",
  mongoConnectionString: "",
  SqliteFileName: "",
  SqliteFileLoc: "",
  Host: "localhost",
  Port: 0,
  Username: "",
  Password: "",
  isSSL: false,
  Database: "",
};

export default addNewDatabaseConnection;
