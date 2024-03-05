import { AlertModal } from "@eco-flow/components-lib";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tableList } from "../../../store/schemaEditor.store";
import deleteCollectionTable from "../../../service/database/deleteCollectionTable.service";
import { ApiResponse } from "@eco-flow/types";
import {
  errorNotification,
  successNotification,
} from "../../../store/notification.store";
import { Divider, Input } from "rsuite";

interface DeleteTableProps {
  openCloseState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default function DeleteTable({
  openCloseState = React.useState(false),
}: DeleteTableProps) {
  const [deleteCollectionTableAlertModal, setDeleteCollectionTableAlertModal] =
    openCloseState;
  const navigate = useNavigate();
  const { id, driver, collectonORtable } = useParams();
  const setCollectionORTable = useAtom(tableList)[1];
  const [deleteCollectionTableInput, setDeleteCollectionTableInput] =
    React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const setSuccessNotification = useAtom(successNotification)[1];
  const setErrorNotification = useAtom(errorNotification)[1];

  const handleDelete = () => {
    setLoading(true);
    deleteCollectionTable(id!, collectonORtable!).then(
      (response: ApiResponse) => {
        setLoading(false);
        setDeleteCollectionTableAlertModal(false);
        if (response.success) {
          setSuccessNotification({
            show: true,
            header: "Successfully Dropped",
            message: `${
              driver === "knex"
                ? "Table"
                : driver === "mongo"
                ? "Collection "
                : ""
            } dropping success`,
          });
          setCollectionORTable(response.payload.collectionsORtables);
          navigate(`/editor/schema/database/${id}`);
        }
      },
      (reject: ApiResponse) => {
        setLoading(false);
        setDeleteCollectionTableAlertModal(false);
        if (reject.error)
          setErrorNotification({
            show: true,
            header: reject.payload.code,
            message: `Error dropping ${
              driver === "knex"
                ? "table."
                : driver === "mongo"
                ? "collection."
                : ""
            }.`,
          });
      }
    );
  };

  useEffect(() => setDeleteCollectionTableInput(""), [collectonORtable]);
  return (
    <AlertModal
      open={deleteCollectionTableAlertModal}
      onClose={() => setDeleteCollectionTableAlertModal(false)}
      confirmButtonProps={{
        disabled: deleteCollectionTableInput !== collectonORtable,
        loading: isLoading,
        color: "red",
        onClick: handleDelete,
      }}
      CancelButtonProps={{
        disabled: isLoading,
        appearance: "ghost",
        onClick: () => {
          setDeleteCollectionTableInput("");
          setDeleteCollectionTableAlertModal(false);
        },
      }}
    >
      <AlertModal.Title>Are you sure?</AlertModal.Title>
      <Divider />
      <AlertModal.Body>
        <p style={{ padding: "0 5px" }}>
          Write the{" "}
          {driver === "knex" ? "table" : driver === "mongo" ? "collection" : ""}{" "}
          to drop it.
        </p>
        <Input
          placeholder={collectonORtable}
          style={{ margin: "10px 0" }}
          onChange={setDeleteCollectionTableInput}
        />
      </AlertModal.Body>
    </AlertModal>
  );
}
