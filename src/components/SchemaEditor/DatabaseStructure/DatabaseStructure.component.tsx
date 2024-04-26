import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  FlexboxGrid,
  IconButton,
  List,
  Loader,
  Panel,
  Stack,
} from "rsuite";
import { FaPlus, FaCheck, FaTrash, FaPencil } from "react-icons/fa6";
import { IconWrapper } from "@ecoflow/components-lib";
import {
  ApiResponse,
  DatabaseColumnData,
  DatabaseColumnInfo,
} from "@ecoflow/types";
import CreateModifyColumnModal from "../Modals/CreateModifyColumnModal/CreateModifyColumnModal.component";
import "./style.less";
import databaseCreateModifySendData from "../../../defaults/databaseCreateModifySendData.default";
import commitSaveTables from "../../../service/database/commitSaveTables.service";
import getColumnInfo from "../../../service/database/getColumnInfo.service";
import databaseTableTypes from "../../../defaults/databaseTableTypes.default";
import isSameTableColumn from "../../../utils/isSameTableColumn/isSameTableColumn.util";
import { useAtom } from "jotai";
import {
  errorNotification,
  successNotification,
} from "../../../store/notification.store";
import { userPermissions as userPermissionsList } from "../../../store/users.store";

interface ModifyDatabaseColumns {
  oldDatabaseColumns: DatabaseColumnInfo;
  newDatabaseColumns: DatabaseColumnInfo;
}

export default function DatabaseStructure() {
  const { id, driver, collectonORtable } = useParams();

  const [isLoading, setLoading] = useState(false);

  const [isFetching, setFetching] = useState(false);
  const [databaseColumns, setDatabaseColumns] = useState<DatabaseColumnInfo[]>(
    []
  );
  const [sendData, setSendData] = useState<DatabaseColumnData>(
    databaseCreateModifySendData
  );

  const [modalCreateModify, setModalCreateModify] = useState<{
    open: boolean;
    type: "CREATE" | "MODIFY";
    editData?: DatabaseColumnInfo;
    id?: number;
  }>({ open: false, type: "CREATE" });

  const suceessNoti = useAtom(successNotification)[1];
  const errorNoti = useAtom(errorNotification)[1];

  //User permission states
  const [userPermissions] = useAtom(userPermissionsList);

  const addColumnHandler = (result: DatabaseColumnInfo) => {
    setDatabaseColumns([...databaseColumns, { ...result }]);
    const isExist =
      sendData.deleteDatabaseColumns.filter((t: any) => t.name === result.name)
        .length > 0;
    if (isExist) {
      setSendData({
        ...sendData,
        deleteDatabaseColumns: sendData.deleteDatabaseColumns.filter(
          (t) => t.name !== result.name
        ),
      });
      return;
    }

    setSendData({
      ...sendData,
      createDatabaseColumns: [...sendData.createDatabaseColumns, result],
    });
  };

  const modifyDatabaseColumnsHandler = (
    tableData: {
      id: number;
      previousData: DatabaseColumnInfo;
    } | null,
    result: DatabaseColumnInfo
  ) => {
    if (tableData === null) return;
    const { id, previousData } = tableData;
    const createDatabaseColumns = [...sendData.createDatabaseColumns];

    databaseColumns.splice(id, 1, result);
    setDatabaseColumns(databaseColumns);

    const isExistCreate =
      createDatabaseColumns.filter((t) => t.name === previousData.name).length >
      0;
    if (isExistCreate) {
      const newCreateDatabaseColumns = createDatabaseColumns.filter(
        (c) => c.name !== previousData.name
      );
      setSendData({
        ...sendData,
        createDatabaseColumns: [...newCreateDatabaseColumns, result],
      });
      return;
    }

    if (isSameTableColumn(previousData, result)) return;

    const isExistUpdateData = sendData.modifyDatabaseColumns.filter(
      (updateData) => updateData.newDatabaseColumns.name === previousData.name
    );
    const newmodifyDatabaseColumns: ModifyDatabaseColumns[] = [];
    const newModify: ModifyDatabaseColumns[] = [];
    if (isExistUpdateData.length > 0) {
      newmodifyDatabaseColumns.concat(
        sendData.modifyDatabaseColumns.filter(
          (updateData) =>
            updateData.newDatabaseColumns.name !== previousData.name
        )
      );
      newModify.push({
        oldDatabaseColumns: isExistUpdateData[0].oldDatabaseColumns,
        newDatabaseColumns: result,
      });
    } else {
      newmodifyDatabaseColumns.concat(sendData.modifyDatabaseColumns);
      newModify.push({
        oldDatabaseColumns: previousData,
        newDatabaseColumns: result,
      });
    }

    const isSame =
      newModify.filter((columnInfo) =>
        isSameTableColumn(
          columnInfo.oldDatabaseColumns,
          columnInfo.newDatabaseColumns
        )
      ).length > 0;
    if (isSame) {
      setSendData({
        ...sendData,
        modifyDatabaseColumns: [...newmodifyDatabaseColumns],
      });
      return;
    }

    setSendData({
      ...sendData,
      modifyDatabaseColumns: [...newmodifyDatabaseColumns, ...newModify],
    });
  };

  const deleteDatabaseColumnHandler = (id: number) => {
    const databaseColumnsData = [...databaseColumns];
    const result = databaseColumnsData.splice(id, 1);

    setDatabaseColumns(databaseColumnsData);

    const isExistCreate =
      sendData.createDatabaseColumns.filter(
        (t: any) => t.name === result[0].name
      ).length > 0;
    if (isExistCreate) {
      setSendData({
        ...sendData,
        createDatabaseColumns: sendData.createDatabaseColumns.filter(
          (t) => t.name !== result[0].name
        ),
      });
      return;
    }

    const isExistDeleteData = sendData.modifyDatabaseColumns.filter(
      (t) => t.newDatabaseColumns.name === result[0].name
    );
    if (isExistDeleteData.length > 0) {
      setSendData({
        ...sendData,
        modifyDatabaseColumns: [
          ...sendData.modifyDatabaseColumns.filter(
            (t) => t.newDatabaseColumns.name !== result[0].name
          ),
        ],
        deleteDatabaseColumns: [
          ...sendData.deleteDatabaseColumns,
          isExistDeleteData[0].oldDatabaseColumns,
        ],
      });
      return;
    }

    setSendData({
      ...sendData,
      deleteDatabaseColumns: [...sendData.deleteDatabaseColumns, ...result],
    });
  };

  const onDoneHandler = (
    type: "CREATE" | "MODIFY",
    result: DatabaseColumnInfo,
    tableData: {
      id: number;
      previousData: DatabaseColumnInfo;
    } | null
  ) => {
    if (type === "CREATE") addColumnHandler(result);
    if (type === "MODIFY") modifyDatabaseColumnsHandler(tableData, result);
  };

  const commitSavehandler = () => {
    setLoading(true);
    commitSaveTables(id!, collectonORtable!, sendData).then(
      (response) => {
        setLoading(false);
        if (response.success) {
          suceessNoti({
            show: true,
            header: "Structure saved",
            message: "Database structure altered and saved successfully",
          });
          setDatabaseColumns(response.payload.columnInfo);
          setSendData(databaseCreateModifySendData);
        }
      },
      (reject: ApiResponse) => {
        setLoading(false);
        if (reject.error)
          errorNoti({
            show: true,
            header: "Structure saved Error",
            message:
              typeof reject.payload === "object"
                ? reject.payload.sqlMessage
                : reject.payload,
          });
      }
    );
  };

  useEffect(() => {
    setFetching(true);
    getColumnInfo(id!, collectonORtable!).then((response) => {
      setFetching(false);
      if (response.success) {
        setDatabaseColumns(response.payload.columnInfo);
        setSendData(databaseCreateModifySendData);
      }
    });
  }, [collectonORtable]);

  return (
    <>
      <Panel>
        <FlexboxGrid justify="space-between" align="middle">
          <FlexboxGrid.Item>
            <p
              style={{
                padding: "0 10px",
                fontSize: "large",
                color: "var(--text-info-color)",
              }}
            >
              Build the data architecture of your{" "}
              {driver === "knex"
                ? "table"
                : driver === "mongo"
                ? "collection"
                : ""}
              .
            </p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <Stack
              divider={<Divider vertical style={{ margin: 0 }} />}
              spacing={10}
            >
              <Button
                disabled={
                  isLoading ||
                  (!userPermissions.administrator &&
                    !userPermissions.modifyDBStructure)
                }
                loading={isFetching}
                appearance="ghost"
                style={{ minWidth: 80 }}
                onClick={() =>
                  setModalCreateModify({ open: true, type: "CREATE" })
                }
                startIcon={<IconWrapper icon={FaPlus} />}
              >
                Add field
              </Button>
              <Button
                disabled={
                  !(
                    sendData.createDatabaseColumns.length > 0 ||
                    sendData.deleteDatabaseColumns.length > 0 ||
                    sendData.modifyDatabaseColumns.length > 0
                  ) ||
                  (!userPermissions.administrator &&
                    !userPermissions.modifyDBStructure)
                }
                loading={isLoading}
                appearance="primary"
                style={{ minWidth: 80 }}
                startIcon={<IconWrapper icon={FaCheck} />}
                onClick={commitSavehandler}
              >
                Save
              </Button>
            </Stack>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Panel
          bordered
          bodyFill
          shaded
          style={{
            marginTop: "1.5rem",
            backgroundColor: "var(--rs-list-bg)",
          }}
        >
          <List style={{ minHeight: 400 }}>
            <List.Item>
              <FlexboxGrid justify="space-between" align="middle">
                <FlexboxGrid.Item colspan={12} style={{ padding: "0 1rem" }}>
                  <small style={{ color: "var(--text-info-color)" }}>
                    Name
                  </small>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={9}>
                  <small style={{ color: "var(--text-info-color)" }}>
                    Type
                  </small>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={3} />
              </FlexboxGrid>
            </List.Item>
            {isFetching ? (
              <List.Item
                style={{
                  position: "absolute",
                  top: 46,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <FlexboxGrid
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                  justify="center"
                  align="middle"
                >
                  <Loader />
                </FlexboxGrid>
              </List.Item>
            ) : databaseColumns.length === 0 ? (
              <FlexboxGrid
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  flexDirection: "column",
                }}
                justify="center"
                align="middle"
              >
                <FlexboxGrid.Item style={{ padding: "1rem" }}>
                  <Button
                    disabled={
                      isLoading ||
                      (!userPermissions.administrator &&
                        !userPermissions.modifyDBStructure)
                    }
                    loading={isFetching}
                    appearance="ghost"
                    style={{ minWidth: 80 }}
                    onClick={() =>
                      setModalCreateModify({ open: true, type: "CREATE" })
                    }
                    startIcon={<IconWrapper icon={FaPlus} />}
                  >
                    Add new field
                  </Button>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  Add your first field to this Table
                </FlexboxGrid.Item>
              </FlexboxGrid>
            ) : (
              databaseColumns.map((column, index) => (
                <List.Item key={index}>
                  <FlexboxGrid justify="space-between" align="middle">
                    <FlexboxGrid.Item
                      colspan={12}
                      style={{ padding: "0 1rem" }}
                    >
                      {databaseTableTypes
                        .filter((t) =>
                          column.alias !== null
                            ? t.alias.toUpperCase() ===
                              column.alias.toUpperCase()
                            : false
                        )
                        .map((t, index) => (
                          <p key={index}>
                            <span
                              style={{ fontSize: "1.4rem", marginRight: 10 }}
                            >
                              <IconWrapper icon={t.icon} />
                            </span>
                            <span style={{ fontSize: "1rem" }}>
                              {column.name}
                            </span>
                          </p>
                        ))}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={9}>
                      {column.alias}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={3}>
                      <Stack
                        divider={<Divider vertical style={{ margin: 0 }} />}
                        spacing={5}
                      >
                        <IconButton
                          className="DatabaseStructureIconButton"
                          appearance="link"
                          onClick={() =>
                            setModalCreateModify({
                              open: true,
                              type: "MODIFY",
                              editData: column,
                              id: index,
                            })
                          }
                          icon={<IconWrapper icon={FaPencil} />}
                        />
                        <IconButton
                          className="DatabaseStructureIconButton"
                          appearance="link"
                          onClick={() => deleteDatabaseColumnHandler(index)}
                          icon={<IconWrapper icon={FaTrash} />}
                        />
                      </Stack>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </List.Item>
              ))
            )}
            {/*  */}
          </List>
        </Panel>
      </Panel>

      {modalCreateModify.open ? (
        <CreateModifyColumnModal
          modalCreateModify={[modalCreateModify, setModalCreateModify]}
          databaseColumns={databaseColumns}
          onDone={(type, result) =>
            onDoneHandler(
              type,
              result,
              modalCreateModify.type === "MODIFY"
                ? {
                    id: modalCreateModify.id!,
                    previousData: modalCreateModify.editData!,
                  }
                : null
            )
          }
        />
      ) : (
        <></>
      )}
    </>
  );
}
