import { useAtom } from "jotai";
import React, { Suspense, memo, useRef, useState } from "react";
import { Button, Divider, Drawer, Placeholder } from "rsuite";
import {
  editConnectionDrawerOpenClose,
  editConnectionName,
} from "../../../../store/Connections.store";
import { ConnectionResponse } from "@eco-flow/types";
import DrawerBody from "./DrawerBody";
import getConnectionConfigService from "../../../../service/connections/getConnectionConfig.service";
import { AlertModal } from "@eco-flow/components-lib";
import "@eco-flow/components-lib/style.css";
import deleteConnectionService from "../../../../service/connections/deleteConnection.service";

export default function EditConnectionDrawer() {
  const [editNewConnectionDraawer, setEditNewConnectionDrawer] = useAtom(
    editConnectionDrawerOpenClose
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigloading, setIsConfigloading] = useState(false);
  const [connectionName, setConnectionName] = useAtom(editConnectionName);
  const [updateResponse, setUpdateResponse] = useState<ConnectionResponse>({});
  const [deleteResponse, setDeleteResponse] = useState<ConnectionResponse>({});
  const formRef = useRef(null);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);

  const connectionDeleteHandler = () => {
    deleteConnectionService(connectionName).then((val) => console.log(val));
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
              loading={isLoading}
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
            OnSubmit={async (value) => {
              console.log(value);
              if (Object.keys(value).length > 0) {
                setIsLoading(true);
              }
            }}
            disabled={isLoading}
            DatabaseSuspenseHandler={getConnectionConfigService(connectionName)}
            onLoaded={setIsConfigloading}
          />
        </Drawer.Body>
      </Drawer>
      <AlertModal
        open={openDeleteConfirmModal}
        confirmButtonText="Comfirm"
        CancelButtonText="Cancel"
        confirmButtonProps={{ color: "red", onClick: connectionDeleteHandler }}
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
