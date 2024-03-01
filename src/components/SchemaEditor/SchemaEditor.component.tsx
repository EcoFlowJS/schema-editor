import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Panel, Placeholder, Tabs } from "rsuite";
import { TbDatabase, TbDatabaseEdit } from "react-icons/tb";
import DatabaseData from "./DatabaseData/DatabaseData.component";

export default function SchemaEditor() {
  const navigate = useNavigate();
  const { id, driver, collectonORtable } = useParams();

  useEffect(() => {
    if (driver === "knex" || driver === "mongo") return;
    else navigate("/editor/schema/404");
  }, [driver]);

  return (
    <Panel
      header={
        <div>
          <h4>
            {driver === "knex"
              ? "Table:"
              : driver === "mongo"
              ? "Collection :"
              : ""}{" "}
            {collectonORtable}
          </h4>
        </div>
      }
      bordered
      style={{ backgroundColor: "var(--rs-gray-800)" }}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.Tab eventKey="1" title="Database Data" icon={<TbDatabase />}>
          <DatabaseData />
        </Tabs.Tab>
        <Tabs.Tab
          eventKey="2"
          title="Database Structure"
          icon={<TbDatabaseEdit />}
        >
          <Placeholder.Paragraph graph="square" />
        </Tabs.Tab>
      </Tabs>
    </Panel>
  );
}
