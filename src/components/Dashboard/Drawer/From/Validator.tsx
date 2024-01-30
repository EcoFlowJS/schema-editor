import { ConnectionDefinations } from "@eco-flow/types";
import { Schema } from "rsuite";

const { StringType, NumberType } = Schema.Types;

const Validator = Schema.Model({
  ConnectionName: StringType().isRequired("Please provide Connection Name."),
  dbDriver: StringType().isRequired("Select Database Driver"),
  mongoConnectionString: StringType().when((schema) => {
    const checkResult = schema.dbDriver.value;
    return checkResult === "MongoDB"
      ? StringType().isRequired("Please provide Connection String.")
      : StringType();
  }),
  SqliteFileName: StringType().when((schema) => {
    const checkResult = schema.dbDriver.value;
    return checkResult === "Sqlite"
      ? StringType().isRequired("Please provide Sqlite File Name.")
      : StringType();
  }),
  SqliteFileLoc: StringType().when((schema) => {
    const checkResult = schema.dbDriver.value;
    return checkResult === "Sqlite"
      ? StringType().isRequired("Please provide Sqlite File Location.")
      : StringType();
  }),
  Host: StringType().when((schema) => {
    const checkResult = schema.dbDriver.value;
    return checkResult === "MySQL" || checkResult === "PostgreSQL"
      ? StringType().isRequired("Please provide Host.")
      : StringType();
  }),
  Port: NumberType().when((schema) => {
    const checkResult = schema.dbDriver.value;
    return checkResult === "MySQL" || checkResult === "PostgreSQL"
      ? NumberType()
          .isRequired("Please provide Port.")
          .min(1, "Port must be greater than or equal to 1.")
          .max(65535, "Port must be less than or equal to 65535.")
      : NumberType();
  }),
  Username: StringType().when((schema) => {
    const checkResult = schema.dbDriver.value;
    return checkResult === "MySQL" || checkResult === "PostgreSQL"
      ? StringType().isRequired("Please provide Username.")
      : StringType();
  }),
  Database: StringType().when((schema) => {
    const checkResult = schema.dbDriver.value;
    return checkResult === "MySQL" || checkResult === "PostgreSQL"
      ? StringType().isRequired("Please provide Database Name.")
      : StringType();
  }),
});

export default Validator;
