import { CollectionInfo } from "@eco-flow/types";
import { ItemDataType } from "rsuite/esm/@types/common";

const dataProcessorMongo = (
  data: CollectionInfo,
  parent = ""
): ItemDataType[] => {
  return data.keys.map((key) => {
    const processedData: ItemDataType = Object.create({});
    processedData.label = `${key} : ${data.values[key]}`;
    processedData.value = JSON.stringify({
      key: key,
      value: data.values[key],
    });

    if (data.types[key] === "array" || data.types[key] === "object") {
      processedData.label = `${key} : ${(data.types[key] as string)
        .charAt(0)
        .toUpperCase()}${(data.types[key] as string).slice(1)}`;
      processedData.value = JSON.stringify({
        key: key,
        value: parent.length > 0 ? parent + "." + key : key,
        type: data.types[key],
      });
      processedData.children = [];
    }

    if (data.types[key] === "null")
      processedData.value = JSON.stringify({
        key: key,
        value: "null",
      });

    return processedData;
  });
};
