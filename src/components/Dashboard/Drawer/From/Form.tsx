import React, { MutableRefObject, useEffect, useState } from "react";
import {
  Container,
  Input,
  InputNumber,
  SelectPicker,
  Stack,
  Toggle,
} from "rsuite";
import Validator from "./Validator";
import DB_DriverList from "./DB_DriverList";
import { ConnectionDefinations } from "@eco-flow/types";
import {
  Form,
  FormGroup,
  InputEnv,
  InputPasswordEnv,
} from "@eco-flow/components-lib";

interface FromGroupProps {
  Ref?: MutableRefObject<null>;
  OnSubmit?: (value: any) => void;
  disabled?: boolean;
  reset?: boolean;
}

export default function ({
  OnSubmit = () => {},
  Ref,
  disabled = false,
  reset = false,
}: FromGroupProps) {
  const [dbDriverValue, setDbDriverValue] = useState("");
  const [value, setValue] = useState<ConnectionDefinations>({
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
  const [isSSL, setIsSSL] = useState(false);
  const [isEnvMongoConnectionString, setEnvMongoConnectionString] =
    useState(false);
  const [isEnvUsername, setEnvUsername] = useState(false);
  const [isEnvPassword, setEnvPassword] = useState(false);
  const [isEnvDatabase, setEnvDatabase] = useState(false);

  useEffect(() => {
    if (value.dbDriver === "MySQL") setValue({ ...value, Port: 3306 });

    if (value.dbDriver === "PostgreSQL") setValue({ ...value, Port: 5432 });
  }, [value.dbDriver]);

  useEffect(() => {
    if (reset) {
      reset = false;
      setDbDriverValue("");
      setValue({
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
      setIsSSL(false);
    }
  }, [reset]);

  return (
    <>
      <Container style={{ minHeight: "100%" }}>
        <Form
          disabled={disabled}
          model={Validator}
          checkTrigger="none"
          style={{ minHeight: "100%" }}
          onChange={(changed) => setValue({ ...value, ...changed })}
          formValue={value}
          onSubmit={(status, event) => {
            event.preventDefault();
            const Data: ConnectionDefinations = { ...value };
            if (isEnvMongoConnectionString)
              Data.mongoConnectionString = `env(${Data.mongoConnectionString})`;
            if (isEnvUsername) Data.Username = `env(${Data.Username})`;
            if (isEnvPassword) Data.Password = `env(${Data.Password})`;
            if (isEnvDatabase) Data.Database = `env(${Data.Database})`;
            status ? OnSubmit(Data) : OnSubmit({});
          }}
        >
          <FormGroup
            name="ConnectionName"
            label="Name"
            accepter={Input}
            autoComplete="off"
            placeholder="Name"
            size="lg"
          />
          <FormGroup
            name="dbDriver"
            label="Databse Driver"
            accepter={SelectPicker}
            data={DB_DriverList}
            searchable={false}
            style={{ width: 224 }}
            defaultValue={dbDriverValue}
            placeholder="Select Database Driver"
            onSelect={setDbDriverValue}
          />
          {dbDriverValue !== "" ? (
            dbDriverValue === "MongoDB" ? (
              <>
                <FormGroup
                  name="mongoConnectionString"
                  label="Connection String"
                  accepter={InputEnv}
                  autoComplete="off"
                  placeholder="Connection String"
                  size="lg"
                  envCheckbox
                  envCheckboxOnChange={setEnvMongoConnectionString}
                />
              </>
            ) : dbDriverValue === "Sqlite" ? (
              <>
                <FormGroup
                  name="SqliteFileName"
                  label="File Name"
                  accepter={Input}
                  autoComplete="off"
                  placeholder="Sqlite File Name"
                  size="lg"
                />
                <FormGroup
                  name="SqliteFileLoc"
                  label="File Location"
                  accepter={Input}
                  autoComplete="off"
                  placeholder="Sqlite File Location"
                  size="lg"
                />
              </>
            ) : (
              <>
                <FormGroup
                  name="Host"
                  label="Host"
                  accepter={Input}
                  autoComplete="off"
                  placeholder="localhost"
                  size="lg"
                />
                <FormGroup
                  name="Port"
                  label="Port"
                  accepter={InputNumber}
                  placeholder="3000"
                  size="lg"
                  min={1}
                  max={65535}
                />
                <FormGroup
                  name="Username"
                  label="Username"
                  accepter={InputEnv}
                  autoComplete="off"
                  placeholder="Username"
                  size="lg"
                  envCheckbox
                  envCheckboxOnChange={setEnvUsername}
                />
                <FormGroup
                  name="Password"
                  label="Password"
                  accepter={InputPasswordEnv}
                  placeholder="Password"
                  size="lg"
                  envCheckbox
                  envCheckboxOnChange={setEnvPassword}
                />
                <FormGroup
                  name="Database"
                  label="Database Name"
                  accepter={InputEnv}
                  autoComplete="off"
                  placeholder="Database Name"
                  size="lg"
                  envCheckbox
                  envCheckboxOnChange={setEnvDatabase}
                />
                <Stack spacing={20}>
                  Enable SSL:
                  <Toggle
                    disabled={disabled}
                    onChange={(val) => {
                      setIsSSL(val);
                      setValue({ ...value, isSSL: val });
                    }}
                    checked={isSSL}
                  />
                </Stack>
              </>
            )
          ) : null}
          <input type="submit" hidden ref={Ref} />
        </Form>
      </Container>
    </>
  );
}
