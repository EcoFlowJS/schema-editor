import { CollectionInfo } from "@eco-flow/types";
import { Panel, PanelGroup, Tree } from "rsuite";
import FolderFillIcon from "@rsuite/icons/FolderFill";
import PageIcon from "@rsuite/icons/Page";
import { ItemDataType } from "rsuite/esm/@types/common";

interface DatabaseDataMongoProps {
  databaseData?: {
    id: number;
    data: CollectionInfo;
  }[];
}

export default function DatabaseDataMongo({
  databaseData = [],
}: DatabaseDataMongoProps) {
  const disabledItemValues: any[] = [];

  const fetchNodes = () =>
    new Promise<ItemDataType>((resolve) =>
      setTimeout(
        () =>
          resolve([
            {
              label: "Database",
              value: Math.random(),
              children: [],
            },
          ]),
        1000
      )
    );

  return (
    <PanelGroup>
      {databaseData.map(({ id, data }) => {
        const ata = data.keys.map((key, index) => {
          return {
            label: key,
            value: data.values[key],
            children: data.types[key] === "object" ? ([] as any) : null,
          };
        });
        return (
          <Panel>
            <Tree
              data={ata}
              virtualized
              showIndentLine
              getChildren={fetchNodes}
              renderTreeNode={(node) => {
                return (
                  <>
                    {node.children ? <FolderFillIcon /> : <PageIcon />}{" "}
                    {node.label}
                  </>
                );
              }}
            />
          </Panel>
        );
      })}
    </PanelGroup>
  );
}
