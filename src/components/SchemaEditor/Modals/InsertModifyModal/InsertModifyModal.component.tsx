import { ApiResponse, DatabaseColumnInfo } from "@eco-flow/types";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  databaseDatas,
  openInsertModifyModal,
} from "../../../../store/schemaEditor.store";
import { Button, Divider, Modal } from "rsuite";
import InsertModifyKnex from "./InsertModifyKnex/InsertModifyKnex.component";
import InsertModifyMongo from "./InsertModifyMongo/InsertModifyMongo.component";
import insertDatabaseData from "../../../../service/database/insertDatabaseData.service";
import updateDatabaseData from "../../../../service/database/updateDatabaseData.service";
import {
  errorNotification,
  successNotification,
} from "../../../../store/notification.store";

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
}: InsertModifyModalProps) {
  const { id, driver, collectonORtable } = useParams();
  const [isOpen, setOpen] = useAtom(openInsertModifyModal);
  const setDatabaseData = useAtom(databaseDatas)[1];

  const successNoti = useAtom(successNotification)[1];
  const errorNoti = useAtom(errorNotification)[1];

  const [isLoading, setLoading] = React.useState(false);
  const [modalData, setModalData] = useState<{ [key: string]: any }>({});

  const handleModalClose = (event?: React.SyntheticEvent<Element, Event>) => {
    if (!confirm("Are you sure? Your changes will be lost.")) {
      if (event) event.preventDefault();
      return;
    }
    setOpen(false);
  };

  const handelInsertUpdate = () => {
    const sendData = { ...modalData };
    if (sendData.hasOwnProperty("_id")) delete sendData._id;
    Object.keys(sendData).forEach((key) => {
      if (typeof sendData[key] === "object" && sendData[key] !== null)
        sendData[key] =
          typeof sendData[key].validate !== "undefined"
            ? sendData[key].validate
              ? sendData[key].value
              : "{}"
            : sendData[key];
    });

    const handleSuccessInserUpdates = (response: ApiResponse) => {
      setLoading(false);
      if (response.success) {
        successNoti({
          show: true,
          header: "Insertion Success",
          message: "Data insertion into database successful",
        });
        setDatabaseData(
          response.payload.data.map((value: any, index: number) => {
            return {
              id: index,
              data: value,
            };
          })
        );
        setOpen(false);
      }
    };

    const handleErrorInserUpdates = (reject: ApiResponse) => {
      setLoading(false);
      if (reject.error)
        errorNoti({
          show: true,
          header: "Insertion Error",
          message:
            typeof reject.payload === "object"
              ? reject.payload.sqlMessage
              : reject.payload,
        });
    };

    if (mode === "insert") {
      setLoading(true);
      insertDatabaseData(id!, collectonORtable!, sendData).then(
        handleSuccessInserUpdates,
        handleErrorInserUpdates
      );
    }

    if (mode === "edit") {
      setLoading(true);
      updateDatabaseData(
        id!,
        collectonORtable!,
        { ...defaultValue },
        sendData
      ).then(handleSuccessInserUpdates, handleErrorInserUpdates);
    }
  };

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
          disabled={isLoading}
          style={{ minWidth: 100 }}
          onClick={() => setOpen(false)}
          appearance="subtle"
        >
          Cancel
        </Button>
        <Button
          loading={isLoading}
          style={{ minWidth: 100 }}
          onClick={handelInsertUpdate}
          appearance="primary"
        >
          {mode === "insert" ? "Insert" : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
