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
import DeleteTable from "../DatabaseTable/DeleteTable/DeleteTable.component";
import RenameTable from "../DatabaseTable/RenameTable/RenameTable.component";

export default function SchemaEditor() {
  const navigate = useNavigate();
  const { id, driver, collectonORtable } = useParams();
  const [deleteCollectionTableAlertModal, setDeleteCollectionTableAlertModal] =
    React.useState(false);
  const [renameCollectionTableAlertModal, setRenameCollectionTableAlertModal] =
    React.useState(false);

  useEffect(() => {
    if (driver === "knex" || driver === "mongo") return;
    else navigate("/editor/schema/404");
  }, [driver]);

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
        style={{ backgroundColor: "var(--rs-gray-800)" }}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.Tab eventKey="1" title="Database Data" icon={<TbDatabase />}>
            <DatabaseData />
          </Tabs.Tab>
          {driver === "knex" ? (
            <Tabs.Tab
              eventKey="2"
              title="Database Structure"
              icon={<TbDatabaseEdit />}
            >
              <Placeholder.Paragraph graph="square" />
            </Tabs.Tab>
          ) : (
            <></>
          )}
        </Tabs>
      </Panel>
      <DeleteTable
        openCloseState={[
          deleteCollectionTableAlertModal,
          setDeleteCollectionTableAlertModal,
        ]}
      />
      <RenameTable
        openCloseState={[
          renameCollectionTableAlertModal,
          setRenameCollectionTableAlertModal,
        ]}
      />
    </>
  );
}
