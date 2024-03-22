import React, { MutableRefObject, useEffect, useState } from "react";
import Form from "../From/Form";
import { useNotification } from "@eco-flow/components-lib";
import {
  ConnectionDefinations,
  DatabaseConnectionConfig,
} from "@eco-flow/types";
import { Placeholder } from "rsuite";

interface DrawerBodyProps {
  Ref?: MutableRefObject<null>;
  OnSubmit?: (value: any) => void;
  disabled?: boolean;
  reset?: boolean;
  DatabaseSuspenseHandler?: Promise<any>;
  onLoaded?: (value: boolean) => void;
}

export default function DrawerBody({
  DatabaseSuspenseHandler,
  disabled = false,
  onLoaded = () => {},
  ...props
}: DrawerBodyProps) {
  const [connectionConfig, setConnectionConfig] = useState<{
    payload: DatabaseConnectionConfig[];
    count: number;
  }>({
    payload: [],
    count: 0,
  });
  const [isLoading, setLoading] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  const [isError, setError] = useState(false);
  const [formDefaultValue, setFormDefaultValue] =
    useState<ConnectionDefinations>({
      ConnectionName: "",
      dbDriver: "",
      mongoConnectionString: "",
      SqliteFileName: "",
      SqliteFileLoc: "",
      Host: "localhost",
      Port: 0,
      Username: "",
      Password: "",
      isSSL: false,
      Database: "",
    });

  useEffect(() => {
    DatabaseSuspenseHandler!.then((val) => {
      setConnectionConfig(val);
      setLoading(false);
      onLoaded(true);
    });
  }, []);

  const errorNoti = useNotification({
    header: "Connection Fetching Error",
    type: "error",
    placement: "bottomEnd",
    children: <>Error While Fetching Connection Details</>,
  });

  useEffect(() => {
    if (!isLoading) {
      if (connectionConfig.count !== 1) setError(true);
      else {
        const { name, driver, connections } = connectionConfig.payload[0];
        let FormData: ConnectionDefinations = {
          ConnectionName: "",
          dbDriver: "",
          mongoConnectionString: "",
          SqliteFileName: "",
          SqliteFileLoc: "",
          Host: "localhost",
          Port: 0,
          Username: "",
          Password: "",
          isSSL: false,
          Database: "",
        };
        switch (driver) {
          case "MONGO":
            FormData = { ...FormData, dbDriver: "MongoDB" };
            break;
          case "SQLite":
            FormData = { ...FormData, dbDriver: "Sqlite" };
            break;
          case "PGSQL":
            FormData = {
              ...FormData,
              dbDriver: "PostgreSQL",
            };
            break;
          case "MYSQL":
            FormData = {
              ...FormData,
              dbDriver: "MySQL",
            };
            break;
          default:
            setError(true);
            break;
        }
        if (name) FormData = { ...FormData, ConnectionName: name };

        if (connections!.connectionString)
          FormData = {
            ...FormData,
            mongoConnectionString: connections!.connectionString,
          };

        if (connections!.filename) {
          const path = connections!.filename.replace(/\\/g, "/");
          FormData = {
            ...FormData,
            SqliteFileLoc: path.substring(0, path.lastIndexOf("/")),
            SqliteFileName: path.substring(path.lastIndexOf("/") + 1),
          };
        }

        if (connections!.host)
          FormData = { ...FormData, Host: connections!.host };
        if (connections!.port)
          FormData = { ...FormData, Port: connections!.port };
        if (connections!.user)
          FormData = {
            ...FormData,
            Username: connections!.user,
          };
        if (connections!.password)
          FormData = {
            ...FormData,
            Password: connections!.password,
          };
        if (connections!.ssl)
          FormData = { ...FormData, isSSL: connections!.ssl };
        if (connections!.database)
          FormData = {
            ...FormData,
            Database: connections!.database,
          };

        setFormDefaultValue(FormData);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setDisabled(true);
      errorNoti.show();
    }
  }, [isError]);

  return (
    <>
      {isLoading ? (
        <Placeholder.Paragraph rows={5} active />
      ) : (
        <Form
          disabled={isDisabled ? isDisabled : disabled}
          defaultValue={formDefaultValue}
          isUpdate
          {...props}
        />
      )}
    </>
  );
}
