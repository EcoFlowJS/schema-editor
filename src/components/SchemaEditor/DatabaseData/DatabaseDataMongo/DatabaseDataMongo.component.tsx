import { Divider, FlexboxGrid, IconButton, Panel, Stack, Tree } from "rsuite";
import { useAtom } from "jotai";
import { databaseDatas } from "../../../../store/schemaEditor.store";
import { IconWrapper } from "@eco-flow/components-lib";
import { BiPencil, BiTrash } from "react-icons/bi";
import dataProcessor from "./dataProcessor";
import fetchSubDocumenet from "./fetchSubDocumenet";
import { errorNotification } from "../../../../store/notification.store";
import { useParams } from "react-router-dom";
import "./style.less";

export default function DatabaseDataMongo() {
  const urlParams = useParams();
  const [databaseData] = useAtom(databaseDatas);

  const errorNoti = useAtom(errorNotification)[1];

  const handleModify = (id: number) => {};
  const handleDelete = (id: number) => {};

  const dis: string[] = [];

  return (
    <Panel bodyFill header={<small>{databaseData.length} entries found</small>}>
      <Stack spacing={10} direction="column" alignItems="stretch" wrap>
        {databaseData.map(({ id, data }) => {
          const treeData = dataProcessor(data);
          treeData.forEach(({ value }) => {
            if (typeof value === "string" && !dis.includes(value))
              dis.push(value);
          });
          return (
            <Panel key={id} bordered>
              <FlexboxGrid>
                <FlexboxGrid.Item colspan={2}>
                  <FlexboxGrid style={{ flexDirection: "column" }}>
                    <FlexboxGrid.Item>
                      <Stack
                        direction="column"
                        spacing={10}
                        divider={<Divider style={{ margin: 0, width: 30 }} />}
                      >
                        <IconButton
                          appearance="subtle"
                          color="cyan"
                          icon={<IconWrapper icon={BiPencil} />}
                          onClick={() => handleModify(id)}
                        />
                        <IconButton
                          appearance="subtle"
                          color="red"
                          icon={<IconWrapper icon={BiTrash} />}
                          onClick={() => handleDelete(id)}
                        />
                      </Stack>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={22}>
                  <Tree
                    searchable
                    height={200}
                    data={treeData}
                    getChildren={({ value }) =>
                      fetchSubDocumenet(
                        urlParams,
                        data.values["_id"],
                        value as string,
                        errorNoti
                      )
                    }
                    disabledItemValues={dis}
                    virtualized
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Panel>
          );
        })}
      </Stack>
    </Panel>
  );
}
