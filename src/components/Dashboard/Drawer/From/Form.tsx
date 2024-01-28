import React, { MutableRefObject, useEffect, useState } from "react";
import {
  Container,
  Form,
  Input,
  InputNumber,
  Modal,
  SelectPicker,
  Stack,
  Toggle,
} from "rsuite";
import FormGroup from "../../../Form/FromGroup/FromGroup";
import Validator from "./Validator";
import DB_DriverList from "./DB_DriverList";
import InputPassword from "../../../Form/InputPassword/InputPassword";

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
  const [value, setValue] = useState({
    ConnectionName: "",
    dbDriver: "",
    mongoConnectionStrinng: "",
    SqliteFileName: "",
    SqliteFileLoc: "",
    Host: "localhost",
    Port: 0,
    Username: "",
    Password: "",
    isSSL: false,
  });
  const [isSSL, setIsSSL] = React.useState(false);

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
        mongoConnectionStrinng: "",
        SqliteFileName: "",
        SqliteFileLoc: "",
        Host: "localhost",
        Port: 0,
        Username: "",
        Password: "",
        isSSL: false,
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
            status ? OnSubmit(value) : OnSubmit({});
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
                  name="mongoConnectionStrinng"
                  label="Connection String"
                  accepter={Input}
                  autoComplete="off"
                  placeholder="Connection String"
                  size="lg"
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
                  accepter={Input}
                  autoComplete="off"
                  placeholder="Username"
                  size="lg"
                />
                <FormGroup
                  name="Password"
                  label="Password"
                  accepter={InputPassword}
                  placeholder="Password"
                  size="lg"
                />
                <FormGroup
                  name="Database"
                  label="Database Name"
                  accepter={Input}
                  autoComplete="off"
                  placeholder="Database Name"
                  size="lg"
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
