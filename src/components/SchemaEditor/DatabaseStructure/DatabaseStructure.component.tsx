import React, { useEffect } from "react";
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
import { IconWrapper } from "@eco-flow/components-lib";
import {
  DatabaseColumnData,
  DatabaseColumnInfo,
  DatabaseTableTypes as DatabaseTypes,
} from "@eco-flow/types";
import CreateModifyColumnModal from "../Modals/CreateModifyColumnModal/CreateModifyColumnModal.component";
import "./style.less";
import databaseCreateModifySendData from "../../../defaults/databaseCreateModifySendData.default";
import commitSaveTables from "../../../service/database/commitSaveTables.service";

export default function DatabaseStructure() {
  const { id, driver, collectonORtable } = useParams();

  const [isLoading, setLoading] = React.useState(false);

  const [isFetching, setFetching] = React.useState(false);
  const [databaseColumns, setDatabaseColumns] = React.useState<
    DatabaseColumnInfo[]
  >([
    {
      name: "database",
      type: "string",
      alias: "text",
    },
  ]);
  const [sendData, setSendData] = React.useState<DatabaseColumnData>(
    databaseCreateModifySendData
  );

  const [modalCreateModify, setModalCreateModify] = React.useState<{
    open: boolean;
    type: "CREATE" | "MODIFY";
  }>({ open: false, type: "CREATE" });

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

  const modifyDatabaseColumnsHandler = (id: number) => {};

  const deleteDatabaseColumnHandler = (id: number) => {
    const databaseColumnsData = [...databaseColumns];
    const result = databaseColumnsData.splice(id, 1);

    const deleted = [...sendData.deleteDatabaseColumns, ...result];
    setDatabaseColumns(databaseColumnsData);

    const isExist =
      sendData.createDatabaseColumns.filter(
        (t: any) => t.name === result[0].name
      ).length > 0;

    if (isExist) {
      sendData.createDatabaseColumns.filter((t) => t.name !== result[0].name);

      setSendData({
        ...sendData,
        createDatabaseColumns: sendData.createDatabaseColumns.filter(
          (t) => t.name !== result[0].name
        ),
      });
      return;
    }
    setSendData({ ...sendData, deleteDatabaseColumns: deleted });
  };

  const commitSavehandler = () => {
    // setLoading(true);
    commitSaveTables(id!, collectonORtable!, sendData).then((value) => {
      setLoading(false);
      console.log(value);
    });
  };

  useEffect(() => console.log(sendData), [sendData]);
  return (
    <>
      <Panel>
        <FlexboxGrid justify="space-between" align="middle">
          <FlexboxGrid.Item>
            <p style={{ fontSize: "large", color: "var(--text-info-color)" }}>
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
                disabled={isLoading}
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
                  )
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
                <FlexboxGrid.Item></FlexboxGrid.Item>
                <FlexboxGrid.Item style={{ padding: "1rem" }}>
                  <Button
                    disabled={isLoading}
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
                <List.Item
                  key={index}
                  onDoubleClick={() => modifyDatabaseColumnsHandler(index)}
                >
                  <FlexboxGrid justify="space-between" align="middle">
                    <FlexboxGrid.Item
                      colspan={12}
                      style={{ padding: "0 1rem" }}
                    >
                      {column.name}
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
                          appearance="link"
                          onClick={() => modifyDatabaseColumnsHandler(index)}
                          icon={<IconWrapper icon={FaPencil} />}
                        />
                        <IconButton
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
          onDone={addColumnHandler}
        />
      ) : (
        <></>
      )}
    </>
  );
}
