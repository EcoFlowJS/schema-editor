import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Panel,
  Placeholder,
  Tabs,
  FlexboxGrid,
  Button,
  Stack,
  Divider,
} from "rsuite";
import { TbDatabase, TbDatabaseEdit } from "react-icons/tb";
import DatabaseData from "./DatabaseData/DatabaseData.component";
import { IconWrapper } from "@eco-flow/components-lib";
import { GrEdit, GrTrash } from "react-icons/gr";
import DeleteTableCollection from "../DatabaseTableCollection/DeleteTableCollection/DeleteTableCollection.component";
import RenameTableCollection from "../DatabaseTableCollection/RenameTableCollection/RenameTableCollection.component";
import { useAtom } from "jotai";
import { editStructure } from "../../store/schemaEditor.store";
import DatabaseStructure from "./DatabaseStructure/DatabaseStructure.component";

export default function SchemaEditor() {
  const navigate = useNavigate();
  const { id, driver, collectonORtable } = useParams();
  const [deleteCollectionTableAlertModal, setDeleteCollectionTableAlertModal] =
    React.useState(false);
  const [renameCollectionTableAlertModal, setRenameCollectionTableAlertModal] =
    React.useState(false);
  const [isEditStructure, setEditStructure] = useAtom(editStructure);
  const [tabKey, setTabKey] = React.useState("2");

  useEffect(() => {
    if (driver === "knex" || driver === "mongo") return;
    else navigate("/editor/schema/404");
  }, [driver]);

  useEffect(() => {
    if (isEditStructure) {
      setEditStructure(false);
      setTabKey("2");
      console.log(isEditStructure);
    }
  }, [isEditStructure]);

  return (
    <>
      <Panel
        header={
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item>
              <h4>
                {driver === "knex"
                  ? "Table:"
                  : driver === "mongo"
                  ? "Collection :"
                  : ""}{" "}
                {collectonORtable}
              </h4>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Stack
                spacing={10}
                divider={<Divider vertical style={{ margin: 0 }} />}
              >
                <Button
                  title={`Rename ${collectonORtable}`}
                  appearance="subtle"
                  onClick={() => setRenameCollectionTableAlertModal(true)}
                  startIcon={<IconWrapper icon={GrEdit} />}
                >
                  Rename{" "}
                  {driver === "knex"
                    ? "Table"
                    : driver === "mongo"
                    ? "Collection"
                    : ""}
                </Button>
                <Button
                  title={`Delete ${collectonORtable}`}
                  appearance="subtle"
                  color="red"
                  onClick={() => setDeleteCollectionTableAlertModal(true)}
                  startIcon={<IconWrapper icon={GrTrash} />}
                >
                  Drop{" "}
                  {driver === "knex"
                    ? "Table"
                    : driver === "mongo"
                    ? "Collection"
                    : ""}
                </Button>
              </Stack>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        }
        bordered
        style={{
          backgroundColor: "var(--dashboard-subcontent-background-color)",
        }}
      >
        <Tabs
          defaultActiveKey="1"
          activeKey={tabKey}
          onSelect={(key) => setTabKey(key!)}
        >
          <Tabs.Tab eventKey="1" title="Database Data" icon={<TbDatabase />}>
            {tabKey === "1" ? <DatabaseData /> : <></>}
          </Tabs.Tab>
          {driver === "knex" ? (
            <Tabs.Tab
              eventKey="2"
              title="Database Structure"
              icon={<TbDatabaseEdit />}
            >
              {tabKey === "2" ? <DatabaseStructure /> : <></>}
            </Tabs.Tab>
          ) : (
            <></>
          )}
        </Tabs>
      </Panel>
      <DeleteTableCollection
        openCloseState={[
          deleteCollectionTableAlertModal,
          setDeleteCollectionTableAlertModal,
        ]}
      />
      <RenameTableCollection
        openCloseState={[
          renameCollectionTableAlertModal,
          setRenameCollectionTableAlertModal,
        ]}
      />
    </>
  );
}
