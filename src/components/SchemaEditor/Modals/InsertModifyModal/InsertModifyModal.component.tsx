import { ApiResponse, DatabaseColumnInfo } from "@ecoflow/types";
import { useAtom } from "jotai";
import { SyntheticEvent, useState } from "react";
import { useParams } from "react-router-dom";
import {
  databaseDatas,
  openInsertModifyModal,
} from "../../../../store/schemaEditor.store";
import { Button, Modal } from "rsuite";
import InsertModifyKnex from "./InsertModifyKnex/InsertModifyKnex.component";
import InsertModifyMongo from "./InsertModifyMongo/InsertModifyMongo.component";
import insertDatabaseData from "../../../../service/database/insertDatabaseData.service";
import updateDatabaseData from "../../../../service/database/updateDatabaseData.service";
import {
  errorNotification,
  successNotification,
  warningNotification,
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
  const warningNoti = useAtom(warningNotification)[1];

  const [isLoading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<{ [key: string]: any }>({});

  const handleModalClose = (event?: SyntheticEvent<Element, Event>) => {
    if (!confirm("Are you sure? Your changes will be lost.")) {
      if (event) event.preventDefault();
      return;
    }
    setOpen(false);
  };

  const handleSuccessInserUpdates = (response: ApiResponse) => {
    setLoading(false);
    if (response.success) {
      if (
        typeof response.payload.modifiedCount !== "undefined" &&
        response.payload.modifiedCount === 0
      )
        warningNoti({
          show: true,
          header: "Insertion Warning",
          message:
            "Nothing was updated as the old record and the new record are same.",
        });
      else
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

  const handelInsertUpdate = () => {
    const sendData =
      driver === "knex"
        ? handelInsertUpdateKnex({ ...modalData })
        : handelInsertUpdateMongo({ ...modalData });

    if (typeof sendData !== "undefined" && mode === "insert") {
      setLoading(true);
      insertDatabaseData(id!, collectonORtable!, sendData).then(
        handleSuccessInserUpdates,
        handleErrorInserUpdates
      );
    }

    if (typeof sendData !== "undefined" && mode === "edit") {
      const oldData = { ...defaultValue };
      if (oldData && oldData.data && typeof oldData.data === "string")
        oldData.data = JSON.parse(oldData.data);

      setLoading(true);
      updateDatabaseData(id!, collectonORtable!, { ...oldData }, sendData).then(
        handleSuccessInserUpdates,
        handleErrorInserUpdates
      );
    }
  };

  const handelInsertUpdateKnex = (sendData: {
    [x: string]: any;
  }): { [x: string]: any } => {
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

    return sendData;
  };

  const handelInsertUpdateMongo = (sendData: {
    [x: string]: any;
  }): { [x: string]: any } | undefined => {
    const { id, editorValue } = sendData;
    const { value, validate } = editorValue;
    if (!validate) {
      errorNoti({
        show: true,
        header: "Error Validating",
        message: "Validation database data failed.",
      });
      return;
    }

    const formattedValue = JSON.parse(value);
    return {
      id: id,
      value: formattedValue,
    };
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
