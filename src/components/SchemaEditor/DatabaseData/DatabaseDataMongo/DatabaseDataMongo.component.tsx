import {
  Divider,
  FlexboxGrid,
  IconButton,
  Panel,
  Placeholder,
  Stack,
} from "rsuite";
import { useAtom } from "jotai";
import {
  databaseDatas,
  openInsertModifyModal,
} from "../../../../store/schemaEditor.store";
import { AlertModal, IconWrapper } from "@eco-flow/components-lib";
import { BiPencil, BiTrash } from "react-icons/bi";
import {
  errorNotification,
  successNotification,
} from "../../../../store/notification.store";
import { useParams } from "react-router-dom";
import "./style.less";
import { InsertModifyModalMode } from "../../Modals/InsertModifyModal/InsertModifyModal.component";
import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { ApiResponse } from "@eco-flow/types";
import deleteDatabaseData from "../../../../service/database/deleteDatabaseData.service";

interface DatabaseDataMongoProps {
  setModalMode?: React.Dispatch<React.SetStateAction<InsertModifyModalMode>>;
  setModalEditValues?: React.Dispatch<any>;
}

export default function DatabaseDataMongo({
  setModalMode = React.useState<InsertModifyModalMode>("edit")[1],
  setModalEditValues = React.useState<any>({})[1],
}: DatabaseDataMongoProps) {
  const urlParams = useParams();
  const [databaseData, setDatabaseData] = useAtom(databaseDatas);
  const setOpen = useAtom(openInsertModifyModal)[1];
  const errorNoti = useAtom(errorNotification)[1];
  const successNoti = useAtom(successNotification)[1];
  const [isLoading, setLoading] = useState(false);
  const [isLoadingRecordDelete, setLoadingRecordDelete] = React.useState(false);

  const [alertModal, setAlertModal] = React.useState<{
    show: boolean;
    id?: string;
  }>({
    show: false,
  });

  const [dbData, setDBData] = useState<
    {
      id: string;
      data: string;
    }[]
  >([]);

  const handleModify = (id: string) => {
    setOpen(true);
    setModalMode("edit");
    setModalEditValues(dbData.filter((value: any) => value.id === id)[0]);
  };

  const handleDeleteRecord = () => {
    if (typeof alertModal.id === "undefined") {
      errorNoti({
        show: true,
        header: "Record Removal Error",
        message: "Record deletion id missmatched",
      });
      return;
    }

    setLoadingRecordDelete(true);
    const { id, collectonORtable } = urlParams;
    deleteDatabaseData(id!, collectonORtable!, alertModal.id).then(
      (response: ApiResponse) => {
        setLoadingRecordDelete(false);
        if (response.success) {
          successNoti({
            show: true,
            header: "Record Removal Success",
            message: "Record removal from database successful",
          });
          setDatabaseData(
            response.payload.data.map((value: any, index: number) => {
              return {
                id: index,
                data: value,
              };
            })
          );
          setAlertModal({ show: false });
        }
      },
      (reject: ApiResponse) => {
        setLoadingRecordDelete(false);
        if (reject.error)
          errorNoti({
            show: true,
            header: "Record Removal Error",
            message:
              typeof reject.payload === "object"
                ? reject.payload.sqlMessage
                : reject.payload,
          });
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    setDBData(
      databaseData.map(({ data }) => {
        const _id = data["_id"];
        delete data["_id"];
        return {
          id: _id,
          data: JSON.stringify(data, null, 2),
        };
      })
    );
    setLoading(false);
  }, [databaseData]);

  return (
    <>
      {isLoading ? (
        <Panel>
          <Placeholder.Paragraph rows={5} active />
        </Panel>
      ) : (
        <Panel
          bodyFill
          header={<small>{databaseData.length} entries found</small>}
        >
          <Stack spacing={10} direction="column" alignItems="stretch" wrap>
            {dbData.map(({ id, data }) => {
              return (
                <Panel key={id} bordered>
                  <FlexboxGrid>
                    <FlexboxGrid.Item colspan={2}>
                      <FlexboxGrid style={{ flexDirection: "column" }}>
                        <FlexboxGrid.Item>
                          <Stack
                            direction="column"
                            spacing={10}
                            divider={
                              <Divider style={{ margin: 0, width: 30 }} />
                            }
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
                              onClick={() =>
                                setAlertModal({ show: true, id: id })
                              }
                            />
                          </Stack>
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </FlexboxGrid.Item>

                    <FlexboxGrid.Item colspan={22}>
                      <Panel
                        header={`Document ID : ${id}`}
                        bordered
                        style={{ backgroundColor: "#1e1e1e" }}
                      >
                        <Editor
                          options={{
                            readOnly: true,
                            contextmenu: false,
                            minimap: { enabled: false },
                            quickSuggestions: false,
                            suggest: {
                              showProperties: false,
                            },
                            inlineSuggest: { enabled: false },
                            fontSize: 16,
                          }}
                          wrapperProps={{ fontSize: 20 }}
                          height={250}
                          language="json"
                          theme="vs-dark"
                          value={data}
                        />
                      </Panel>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </Panel>
              );
            })}
          </Stack>
        </Panel>
      )}

      <AlertModal
        open={alertModal.show}
        onClose={() => setAlertModal({ show: false })}
        CancelButtonProps={{
          disabled: isLoadingRecordDelete,
          appearance: "subtle",
          color: "cyan",
          onClick: () => setAlertModal({ show: false }),
        }}
        confirmButtonProps={{
          loading: isLoadingRecordDelete,
          appearance: "primary",
          color: "red",
          onClick: handleDeleteRecord,
        }}
      >
        <AlertModal.Header>Are you sure?</AlertModal.Header>
        <AlertModal.Body>
          Deleting a record is permanent and can't be restored back.
        </AlertModal.Body>
      </AlertModal>
    </>
  );
}
