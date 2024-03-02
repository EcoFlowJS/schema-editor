import { useAtom } from "jotai";
import { Button, Drawer as RDrawer } from "rsuite";
import { openDrawer } from "../../../store/schemaEditor.store";
import { useParams } from "react-router-dom";
import { DatabaseDataResult } from "@eco-flow/types";
import InsertEditDataForm from "./InsertEditDataForm/InsertEditDataForm.component";
import React from "react";

export type DrawerMode = "insert" | "edit";

interface DrawerProps {
  columnInfo: DatabaseDataResult["columns"];
  mode?: DrawerMode;
  defaultValue?: any;
  onSuccess?: (result: any) => void;
}

export default function Drawer({
  columnInfo,
  mode = "insert",
  defaultValue = {},
}: DrawerProps) {
  const { id, driver, collectonORtable } = useParams();
  const [isOpen, setOpen] = useAtom(openDrawer);
  const [databaseInsertValues, setDatabaseInsertValues] = React.useState({});
  const [databaseUpdateValues, setDatabaseUpdateValues] = React.useState({});

  return (
    <RDrawer
      size="50rem"
      placement="bottom"
      backdrop="static"
      open={isOpen}
      onClose={() => setOpen(false)}
    >
      <RDrawer.Header>
        <RDrawer.Title>
          {mode === "insert" ? (
            <>
              {`Insert data into ${
                driver === "knex"
                  ? "table"
                  : driver === "mongo"
                  ? "collection"
                  : ""
              } : `}
              <strong>{collectonORtable?.toUpperCase()}</strong>
            </>
          ) : mode === "edit" ? (
            <>
              {`Update data into ${
                driver === "knex"
                  ? "table"
                  : driver === "mongo"
                  ? "collection"
                  : ""
              } : `}
              <strong>{collectonORtable?.toUpperCase()}</strong>
            </>
          ) : (
            <></>
          )}
        </RDrawer.Title>
        <RDrawer.Actions>
          <Button style={{ minWidth: 80 }} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            style={{ minWidth: 80 }}
            onClick={() => {
              setOpen(false);
              if (mode === "edit") console.log(databaseUpdateValues);
              if (mode === "insert") console.log(databaseInsertValues);
            }}
            appearance="primary"
          >
            {mode === "insert" ? "Insert" : mode === "edit" ? "Update" : ""}
          </Button>
        </RDrawer.Actions>
      </RDrawer.Header>
      <RDrawer.Body>
        {mode === "insert" ? (
          <InsertEditDataForm
            mode="insert"
            columnInfo={columnInfo}
            onChange={(value) => setDatabaseInsertValues(value)}
            onLoad={setDatabaseInsertValues}
          />
        ) : mode === "edit" ? (
          <InsertEditDataForm
            mode="update"
            columnInfo={columnInfo}
            formDefaultValue={defaultValue}
            onChange={(value) => setDatabaseUpdateValues(value)}
            onLoad={setDatabaseUpdateValues}
          />
        ) : (
          <></>
        )}
      </RDrawer.Body>
    </RDrawer>
  );
}
