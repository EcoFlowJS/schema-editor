import React from "react";
import { Input, InputGroup } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";

export default function InputPassword(props: { [key: string]: any }) {
  const [visible, setVisible] = React.useState(false);
  const handleChange = () => {
    setVisible(!visible);
  };

  return (
    <InputGroup inside size={props.size}>
      <Input type={visible ? "text" : "password"} {...props} />
      <InputGroup.Button onClick={handleChange}>
        {visible ? <EyeIcon /> : <EyeSlashIcon />}
      </InputGroup.Button>
    </InputGroup>
  );
}
