import { useAtom } from "jotai";
import React, { Suspense, memo, useEffect, useRef, useState } from "react";
import { Button, Divider, Drawer, Placeholder } from "rsuite";
import {
  databaseGetConnectionList,
  editConnectionDrawerOpenClose,
  editConnectionName,
} from "../../../../store/Connections.store";
import { ApiResponse } from "@eco-flow/types";
import DrawerBody from "./DrawerBody";
import getConnectionConfigService from "../../../../service/connections/getConnectionConfig.service";
import { AlertModal, useNotification } from "@eco-flow/components-lib";
import "@eco-flow/components-lib/style.css";
import deleteConnectionService from "../../../../service/connections/deleteConnection.service";
import editConnectionService from "../../../../service/connections/editConnection.service";

export default function EditConnectionDrawer() {
  const [editNewConnectionDraawer, setEditNewConnectionDrawer] = useAtom(
    editConnectionDrawerOpenClose
  );
  const [_databaseConnectionList, setDatabaseConnectionList] = useAtom(
    databaseGetConnectionList
  );

  const [isConfigloading, setIsConfigloading] = useState(false);
  const [connectionName, setConnectionName] = useAtom(editConnectionName);
  const [updateResponse, setUpdateResponse] = useState<ApiResponse>({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteResponse, setDeleteResponse] = useState<ApiResponse>({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const formRef = useRef(null);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);

  const successDeleteNotification = useNotification({
    header: "Connection Removal Success",
    type: "success",
    children: (
      <>{deleteResponse.success ? deleteResponse.payload.message : <></>}</>
    ),
  });

  const errorDeleteNotification = useNotification({
    header: "Connection Removal Error",
    type: "error",
    children: (
      <>{deleteResponse.error ? deleteResponse.payload.message : <></>}</>
    ),
  });

  const successUpdateNotification = useNotification({
    header: "Connection Update Success",
    type: "success",
    children: (
      <>{updateResponse.success ? updateResponse.payload.message : <></>}</>
    ),
  });

  const errorupdateNotification = useNotification({
    header: "Connection Update Error",
    type: "error",
    children: (
      <>{updateResponse.error ? updateResponse.payload.message : <></>}</>
    ),
  });

  useEffect(() => {
    if (deleteResponse.success) {
      setOpenDeleteConfirmModal(false);
      setEditNewConnectionDrawer(false);
      setDatabaseConnectionList(deleteResponse.payload.connectionList);
      successDeleteNotification.show();
    }
    if (deleteResponse.error) {
      setOpenDeleteConfirmModal(false);
      errorDeleteNotification.show();
    }
  }, [deleteResponse]);

  useEffect(() => {
    setUpdateLoading(false);
    if (updateResponse.error) errorupdateNotification.show();
    if (updateResponse.success) {
      setEditNewConnectionDrawer(false);
      setDatabaseConnectionList(updateResponse.payload.connectionList);
      successUpdateNotification.show();
      setConnectionName("");
    }
  }, [updateResponse]);

  const connectionDeleteHandler = () => {
    setDeleteLoading(true);
    deleteConnectionService(connectionName).then((val) => {
      setDeleteLoading(false);
      setDeleteResponse(val);
    });
  };

  return (
    <>
      <Drawer
        backdrop="static"
        open={editNewConnectionDraawer}
        onClose={async () => {
          setEditNewConnectionDrawer(false);
          setConnectionName("");
        }}
      >
        <Drawer.Header>
          <Drawer.Title>Edit Connection</Drawer.Title>
          <Drawer.Actions>
            <Button
              appearance="primary"
              color="red"
              onClick={() => setOpenDeleteConfirmModal(true)}
              disabled={!isConfigloading}
            >
              Delete
            </Button>
            <Button
              loading={updateLoading}
              type="submit"
              onClick={() => (formRef.current! as any).click()}
              appearance="primary"
              disabled={!isConfigloading}
            >
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <DrawerBody
            Ref={formRef}
            OnSubmit={(value) => {
              if (Object.keys(value).length > 0) {
                setUpdateLoading(true);
                editConnectionService(value).then(setUpdateResponse);
              }
            }}
            disabled={updateLoading}
            DatabaseSuspenseHandler={getConnectionConfigService(connectionName)}
            onLoaded={setIsConfigloading}
          />
        </Drawer.Body>
      </Drawer>
      <AlertModal
        open={openDeleteConfirmModal}
        confirmButtonText="Comfirm"
        CancelButtonText="Cancel"
        confirmButtonProps={{
          color: "red",
          onClick: connectionDeleteHandler,
          disabled: deleteLoading,
        }}
        CancelButtonProps={{ onClick: () => setOpenDeleteConfirmModal(false) }}
        size="sm"
      >
        <h6>Do you Want Remove Database Connections?</h6>
        <Divider />
        <p>
          Removing Database connection{" "}
          <u>
            <strong>{connectionName}</strong>
          </u>{" "}
          will also stop function of nodes connected with this connection.
        </p>
      </AlertModal>
    </>
  );
}
