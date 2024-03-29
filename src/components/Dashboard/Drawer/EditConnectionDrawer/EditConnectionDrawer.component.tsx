import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { Button, Divider, Drawer } from "rsuite";
import {
  databaseGetConnectionList,
  editConnectionDrawerOpenClose,
  editConnectionName,
} from "../../../../store/Connections.store";
import { ApiResponse } from "@ecoflow/types";
import DrawerBody from "./DrawerBody";
import getConnectionConfigService from "../../../../service/connections/getConnectionConfig.service";
import { AlertModal } from "@ecoflow/components-lib";
import "@ecoflow/components-lib/style.css";
import deleteConnectionService from "../../../../service/connections/deleteConnection.service";
import editConnectionService from "../../../../service/connections/editConnection.service";
import {
  errorNotification,
  successNotification,
} from "../../../../store/notification.store";

export default function EditConnectionDrawer() {
  const [editNewConnectionDraawer, setEditNewConnectionDrawer] = useAtom(
    editConnectionDrawerOpenClose
  );
  const setDatabaseConnectionList = useAtom(databaseGetConnectionList)[1];

  const [isConfigloading, setIsConfigloading] = useState(false);
  const [connectionName, setConnectionName] = useAtom(editConnectionName);
  const [updateResponse, setUpdateResponse] = useState<ApiResponse>({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const formRef = useRef(null);

  const setSuccessNotification = useAtom(successNotification)[1];
  const setErrorNotification = useAtom(errorNotification)[1];

  useEffect(() => {
    setUpdateLoading(false);
    if (updateResponse.error)
      setErrorNotification({
        show: true,
        message: updateResponse.payload.message,
        header: "Connection Update Error",
      });
    if (updateResponse.success) {
      setEditNewConnectionDrawer(false);
      setDatabaseConnectionList(updateResponse.payload.connectionList);
      setSuccessNotification({
        show: true,
        header: "Connection Update Success",
        message: updateResponse.payload.message,
      });
      setConnectionName("");
    }
  }, [updateResponse]);

  return (
    <>
      <Drawer
        backdrop="static"
        open={editNewConnectionDraawer}
        onClose={() => {
          setEditNewConnectionDrawer(false);
          setConnectionName("");
        }}
      >
        <Drawer.Header>
          <Drawer.Title>Edit Connection</Drawer.Title>
          <Drawer.Actions>
            <Button
              appearance="ghost"
              onClick={() => {
                setEditNewConnectionDrawer(false);
                setConnectionName("");
              }}
            >
              Cancel
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
    </>
  );
}
