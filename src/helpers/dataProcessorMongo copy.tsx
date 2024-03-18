// import { CollectionInfo } from "@eco-flow/types";
// import getDatabaseData from "../service/database/showDatabaseData.service";
// import { Params } from "react-router-dom";

// const dataProcessorMongo = async (
//   urlParams: Readonly<Params<string>>,
//   data: CollectionInfo,
//   documentID = "",
//   parent = ""
// ) => {
//   const { id, collectonORtable } = urlParams;
//   const values = Object.create({});
//   for await (const key of data.keys) {
//     if (data.types[key] === "array" || data.types[key] === "object") {
//       try {
//         const result = await dataProcessorMongo(
//           urlParams,
//           (
//             await getDatabaseData(
//               id!,
//               collectonORtable!,
//               documentID,
//               parent.length > 0 ? parent + "." + key : key
//             ).catch((err) => {
//               throw err;
//             })
//           ).payload.data[0],
//           documentID,
//           parent.length > 0 ? parent + "." + key : key
//         );

//         values[key] =
//           data.types[key] === "array"
//             ? Object.keys(result).map((key) => result[key])
//             : result;
//       } catch {
//         continue;
//       }
//     } else if (data.types[key] === "binData") {
//       values[key] = `Binary(${data.values[key]})`;
//     } else if (data.types[key] === "date")
//       values[key] = `Date(${data.values[key]})`;
//     else if (data.types[key] === "decimal")
//       values[key] = `MongoDecimal(${data.values[key]["$numberDecimal"]})`;
//     else values[key] = data.values[key];
//   }

//   return values;
// };

// export default dataProcessorMongo;
