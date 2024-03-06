import { DatabaseTableTypes } from "@eco-flow/types";

const processDatabaseTypeAlias = (type: DatabaseTableTypes): string => {
  switch (type) {
    case "boolean":
      return "boolean";
    case "integer":
      return "number";
    case "string":
      return "text";
    case "datetime":
      return "date";
    case "foreign":
      return "foreign";
    case "json":
      return "json";
    default:
      return "";
  }
};

export default processDatabaseTypeAlias;
