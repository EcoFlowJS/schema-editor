import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Panel, Tabs, FlexboxGrid, Button, Stack, Divider } from "rsuite";
import { TbDatabase, TbDatabaseEdit } from "react-icons/tb";
import DatabaseData from "./DatabaseData/DatabaseData.component";
import { IconWrapper } from "@ecoflow/components-lib";
import { GrEdit, GrTrash } from "react-icons/gr";
import DeleteTableCollection from "../DatabaseTableCollection/DeleteTableCollection/DeleteTableCollection.component";
import RenameTableCollection from "../DatabaseTableCollection/RenameTableCollection/RenameTableCollection.component";
import { useAtom } from "jotai";
import { editStructure } from "../../store/schemaEditor.store";
import DatabaseStructure from "./DatabaseStructure/DatabaseStructure.component";
import { userPermissions as userPermissionsList } from "../../store/users.store";

export default function SchemaEditor() {
  const navigate = useNavigate();
  const { driver, collectonORtable } = useParams();
  const [deleteCollectionTableAlertModal, setDeleteCollectionTableAlertModal] =
    useState(false);
  const [renameCollectionTableAlertModal, setRenameCollectionTableAlertModal] =
    useState(false);
  const [isEditStructure, setEditStructure] = useAtom(editStructure);
  const [tabKey, setTabKey] = useState("1");

  //User permission states
  const [userPermissions] = useAtom(userPermissionsList);

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
                  disabled={
                    !userPermissions.administrator &&
                    !userPermissions.modifyCollectionTable
                  }
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
                  disabled={
                    !userPermissions.administrator &&
                    !userPermissions.removeCollectionTable
                  }
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
          overflow: "visible",
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
