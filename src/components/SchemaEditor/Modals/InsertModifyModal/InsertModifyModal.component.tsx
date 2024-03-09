import { DatabaseColumnInfo } from "@eco-flow/types";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { openInsertModifyModal } from "../../../../store/schemaEditor.store";
import { Button, Divider, Modal } from "rsuite";
import InsertModifyKnex from "./InsertModifyKnex/InsertModifyKnex.component";
import InsertModifyMongo from "./InsertModifyMongo/InsertModifyMongo.component";

export type InsertModifyModalMode = "insert" | "edit";

interface InsertModifyModalProps {
  mode: InsertModifyModalMode;
  defaultValue?: { [key: string]: any };
  columnInfo: DatabaseColumnInfo[];
}

export default function InsertModifyModal({
  mode,
  columnInfo,
  defaultValue,
  ...props
}: InsertModifyModalProps) {
  const { id, driver, collectonORtable } = useParams();
  const [isOpen, setOpen] = useAtom(openInsertModifyModal);

  const [modalData, setModalData] = useState({});

  const handleModalClose = () => setOpen(false);

  return (
    <Modal size="lg" overflow open={isOpen} onClose={handleModalClose}>
      <Modal.Header>
        <Modal.Title>{`${mode === "insert" ? "Insert into" : "Modify"} ${
          driver === "knex" ? "table" : driver === "mongo" ? "collection" : ""
        }: ${collectonORtable}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {driver === "knex" ? (
          <InsertModifyKnex
            mode={mode}
            columnInfo={columnInfo}
            defaultValue={{ ...defaultValue }}
            onChange={setModalData}
            onLoad={() => setModalData({})}
          />
        ) : (
          <></>
        )}
        {driver === "mongo" ? (
          <InsertModifyMongo
            mode={mode}
            columnInfo={columnInfo}
            defaultValue={{ ...defaultValue }}
            onChange={setModalData}
            onLoad={() => setModalData({})}
          />
        ) : (
          <></>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ minWidth: 100 }}
          onClick={handleModalClose}
          appearance="subtle"
        >
          Cancel
        </Button>
        <Button
          style={{ minWidth: 100 }}
          onClick={() => {
            handleModalClose();
            console.log(id, modalData);
          }}
          appearance="primary"
        >
          {mode === "insert" ? "Insert" : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
