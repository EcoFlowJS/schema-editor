import { AlertModal } from "@ecoflow/components-lib";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Input } from "rsuite";
import { tableList } from "../../../store/schemaEditor.store";
import {
  errorNotification,
  successNotification,
} from "../../../store/notification.store";
import renameCollectionTable from "../../../service/database/renameCollectionTable.service";
import { ApiResponse } from "@ecoflow/types";

interface RenameTableProps {
  openCloseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default function RenameTable({ openCloseState }: RenameTableProps) {
  const [renameCollectionTableAlertModal, setRenameCollectionTableAlertModal] =
    openCloseState;
  const navigate = useNavigate();
  const { id, driver, collectonORtable } = useParams();
  const [collectionORTable, setCollectionORTable] = useAtom(tableList);
  const [renameCollectionTableInput, setRenameCollectionTableInput] =
    React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const setSuccessNotification = useAtom(successNotification)[1];
  const setErrorNotification = useAtom(errorNotification)[1];

  const handleRename = () => {
    if (renameCollectionTableInput.trim().length === 0) {
      setErrorNotification({
        show: true,
        header: `Error adding ${
          driver === "knex" ? "Table" : driver === "mongo" ? "Collection " : ""
        }`,
        message: `Enter database ${
          driver === "knex" ? "table" : driver === "mongo" ? "collection " : ""
        } name.`,
      });
      return;
    }

    if (
      !/^[a-zA-Z_$][a-zA-Z_$0-9]*$/g.test(renameCollectionTableInput.trim())
    ) {
      setErrorNotification({
        show: true,
        header: `Error adding ${
          driver === "knex" ? "Table" : driver === "mongo" ? "Collection " : ""
        }`,
        message: `${
          driver === "knex" ? "Table" : driver === "mongo" ? "Collection " : ""
        } name must not contain any spcial characters.`,
      });
      return;
    }

    if (collectionORTable.includes(renameCollectionTableInput)) {
      setErrorNotification({
        show: true,
        header: `Error adding ${
          driver === "knex" ? "Table" : driver === "mongo" ? "Collection " : ""
        }`,
        message: `${
          driver === "knex" ? "Table" : driver === "mongo" ? "Collection " : ""
        } already exists in the database.`,
      });
      return;
    }

    setLoading(true);
    renameCollectionTable(
      id!,
      collectonORtable!,
      renameCollectionTableInput
    ).then(
      (response: ApiResponse) => {
        setLoading(false);
        if (response.success) {
          setCollectionORTable(response.payload.collectionsORtables);
          setSuccessNotification({
            show: true,
            header: "Rename success",
            message: `${
              driver === "knex"
                ? "Table"
                : driver === "mongo"
                ? "Collection "
                : ""
            } renamed successfully`,
          });
          setRenameCollectionTableAlertModal(false);
          navigate(
            `/editor/schema/database/${id}/${driver}/${response.payload.newCollectionTableName}`
          );
        }
      },
      (reject: ApiResponse) => {
        setLoading(false);
        if (reject.error)
          setErrorNotification({
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

  useEffect(() => setRenameCollectionTableInput(""), [collectonORtable]);

  return (
    <AlertModal
      open={renameCollectionTableAlertModal}
      onClose={() => setRenameCollectionTableAlertModal(false)}
      confirmButtonProps={{
        disabled: renameCollectionTableInput.trim().length === 0,
        loading: isLoading,
        color: "red",
        onClick: handleRename,
      }}
      CancelButtonProps={{
        disabled: isLoading,
        appearance: "ghost",
        onClick: () => {
          setRenameCollectionTableInput("");
          setRenameCollectionTableAlertModal(false);
        },
      }}
    >
      <AlertModal.Title>
        Rename{" "}
        {driver === "knex" ? "table" : driver === "mongo" ? "collection" : ""}{" "}
        {collectonORtable}
      </AlertModal.Title>
      <Divider />
      <AlertModal.Body>
        <p style={{ padding: "0 5px" }}>
          Enter the new Name for{" "}
          {driver === "knex" ? "table" : driver === "mongo" ? "collection" : ""}{" "}
          to rename it.
        </p>
        <Input
          placeholder={`New ${
            driver === "knex" ? "table" : driver === "mongo" ? "collection" : ""
          } name`}
          style={{ margin: "10px 0" }}
          onChange={setRenameCollectionTableInput}
        />
      </AlertModal.Body>
    </AlertModal>
  );
}
