import React, { useEffect } from "react";
import { Button, FlexboxGrid, Input, Panel, SelectPicker, Tabs } from "rsuite";
import { useNavigate, useParams } from "react-router-dom";
import "./style.less";
import addTableCollectionData from "../../../defaults/addTableCollectionData.default";
import { useNotification } from "@eco-flow/components-lib";
import { TbDatabase } from "react-icons/tb";
import { useAtom } from "jotai";
import { tableList } from "../../../store/schemaEditor.store";
import createCollectionTable from "../../../service/database/createCollectionTable.service";
import { ApiResponse } from "@eco-flow/types";

export default function CreateTable() {
  const { id, driver } = useParams();
  const navigate = useNavigate();

  const [collectionORtable, setCollectionORTable] = useAtom(tableList);
  const [sendData, setSendData] = React.useState(addTableCollectionData);
  const [errorMessage, setErrorMessage] = React.useState<{
    show: boolean;
    message: string;
    header?: string;
  }>({
    show: false,
    message: "",
  });
  const [isLoading, setLoading] = React.useState(false);

  const errorNotification = useNotification({
    type: "error",
    placement: "bottomEnd",
    header: (
      <>
        {errorMessage.header
          ? errorMessage.header
          : `Error adding ${
              driver === "knex"
                ? "Table"
                : driver === "mongo"
                ? "Collection "
                : ""
            }`}
      </>
    ),
    children: <>{errorMessage.show ? errorMessage.message : ""}</>,
  });

  const handleSubmit = () => {
    if (sendData.name.trim().length === 0) {
      setErrorMessage({
        show: true,
        message: `Enter database ${
          driver === "knex" ? "table" : driver === "mongo" ? "collection " : ""
        } name.`,
      });
      return;
    }

    if (!/^[a-zA-Z_$][a-zA-Z_$0-9]*$/g.test(sendData.name.trim())) {
      setErrorMessage({
        show: true,
        message: `${
          driver === "knex" ? "Table" : driver === "mongo" ? "Collection " : ""
        } name must not contain any spcial characters.`,
      });
      return;
    }

    if (collectionORtable.includes(sendData.name)) {
      setErrorMessage({
        show: true,
        message: `${
          driver === "knex" ? "Table" : driver === "mongo" ? "Collection " : ""
        } already exists in the database.`,
      });
      return;
    }

    setLoading(true);
    createCollectionTable(id!, sendData).then(
      (response: ApiResponse) => {
        setLoading(false);
        if (response.success) {
          setCollectionORTable(response.payload.collectionsORtables);
          navigate(
            `/editor/schema/database/${id}/${driver}/${response.payload.currentCollectionTableName}`
          );
        }
      },
      (reject: ApiResponse) => {
        setLoading(false);
        if (reject.error)
          setErrorMessage({
            show: true,
            header: reject.payload.code,
            message: `Error creating ${
              driver === "knex"
                ? "Table"
                : driver === "mongo"
                ? "Collection "
                : ""
            }.`,
          });
      }
    );
  };

  useEffect(() => {
    if (errorMessage.show) {
      errorNotification.show();
      setErrorMessage({ ...errorMessage, show: false });
    }
  }, [errorMessage]);

  return (
    <Panel
      bordered
      header={
        <div>
          <h4>
            Create{" "}
            {driver === "knex"
              ? "Table"
              : driver === "mongo"
              ? "Collection "
              : ""}
          </h4>
        </div>
      }
      style={{ backgroundColor: "var(--rs-gray-800)" }}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.Tab
          eventKey="1"
          title={
            <>
              {`${
                driver === "knex"
                  ? "Table"
                  : driver === "mongo"
                  ? "Collection "
                  : ""
              } Configuration`}
            </>
          }
          icon={<TbDatabase />}
        >
          <Panel style={{ marginTop: "1rem" }}>
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={11}>
                <label htmlFor="collectionTableName">Entity name :-</label>
                <Input
                  id="collectionTableName"
                  size="lg"
                  style={{ marginTop: 5 }}
                  placeholder="Entity name"
                  autoComplete="off"
                  disabled={isLoading}
                  onChange={(value) =>
                    setSendData({ ...sendData, name: value })
                  }
                />
              </FlexboxGrid.Item>
              {driver === "knex" ? (
                <>
                  <FlexboxGrid.Item colspan={2} />
                  <FlexboxGrid.Item colspan={11}>
                    <label htmlFor="TableLike">Create table like :-</label>
                    <SelectPicker
                      id="TableLike"
                      data={collectionORtable.map((value) => {
                        return { label: value, value: value };
                      })}
                      searchable={false}
                      size="lg"
                      style={{ marginTop: 5, width: "100%" }}
                      disabled={isLoading}
                      onSelect={(value) =>
                        setSendData({ ...sendData, tableLike: value })
                      }
                      onClean={() =>
                        setSendData({ ...sendData, tableLike: null })
                      }
                    />
                  </FlexboxGrid.Item>
                </>
              ) : (
                <></>
              )}
            </FlexboxGrid>
          </Panel>
          <Panel>
            <FlexboxGrid
              justify="space-between"
              align="middle"
              style={{ padding: "2px 10px" }}
            >
              <FlexboxGrid.Item>
                <Button
                  disabled={isLoading}
                  onClick={() => navigate(`/editor/schema/database/${id}`)}
                  style={{ minWidth: 180 }}
                >
                  Cancel
                </Button>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <Button
                  appearance="primary"
                  loading={isLoading}
                  onClick={handleSubmit}
                  color="cyan"
                  style={{ minWidth: 180 }}
                >
                  Create
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Panel>
        </Tabs.Tab>
      </Tabs>
    </Panel>
  );
}
