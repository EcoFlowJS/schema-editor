import { CollectionInfo } from "@eco-flow/types";
import { ItemDataType } from "rsuite/esm/@types/common";

const dataProcessor = (data: CollectionInfo, parent = ""): ItemDataType[] => {
  return data.keys.map((key) => {
    const processedData: ItemDataType = Object.create({});
    processedData.label = `${key} : ${data.values[key]}`;
    processedData.value = data.values[key];

    if (data.types[key] === "array" || data.types[key] === "object") {
      processedData.label = `${key} : ${(data.types[key] as string)
        .charAt(0)
        .toUpperCase()}${(data.types[key] as string).slice(1)}`;
      processedData.value = parent.length > 0 ? parent + "." + key : key;
      processedData.children = [];
    }

    if (data.types[key] === "null") processedData.value = "null";

    return processedData;
  });
};

export default dataProcessor;
