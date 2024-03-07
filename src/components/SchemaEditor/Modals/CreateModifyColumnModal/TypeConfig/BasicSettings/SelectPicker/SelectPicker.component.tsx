import React from "react";
import { SelectPicker as RSelectPicker } from "rsuite";

export default function SelectPicker({ onChange, ...props }: any) {
  return (
    <RSelectPicker
      onChange={onChange}
      onClean={() => {
        onChange(null);
      }}
      {...props}
    />
  );
}
