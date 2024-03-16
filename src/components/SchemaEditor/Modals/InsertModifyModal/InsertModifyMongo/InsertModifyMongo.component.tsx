import { Editor } from "@monaco-editor/react";
import { InsertModifyModalMode } from "../InsertModifyModal.component";
import { Panel } from "rsuite";
import { useEffect, useState } from "react";

interface InsertModifyMongoProps {
  mode: InsertModifyModalMode;
  defaultValue?: { [key: string]: any };
  onChange?: (value: { [key: string]: any }) => void;
  onLoad?: () => void;
}

export default function InsertModifyMongo({
  mode,
  defaultValue = {},
  onLoad = () => {},
  onChange = () => {},
}: InsertModifyMongoProps) {
  const { id, data } = defaultValue;
  const [editorValue, setEditorValue] = useState({
    value: mode === "edit" ? data : "{}",
    validate: true,
  });

  useEffect(onLoad, []);
  useEffect(() => onChange({ id, editorValue }), [editorValue]);

  return (
    <Panel bordered style={{ backgroundColor: "#1e1e1e" }}>
      <Editor
        options={{
          contextmenu: false,
          minimap: { enabled: false },
          quickSuggestions: false,
          suggest: {
            showProperties: false,
          },
          inlineSuggest: { enabled: false },
          fontSize: 16,
        }}
        wrapperProps={{ fontSize: 20 }}
        height={400}
        language="json"
        theme="vs-dark"
        value={editorValue.value}
        onChange={(val) => setEditorValue({ ...editorValue, value: val! })}
        onValidate={(result) =>
          result.length === 0
            ? setEditorValue({ ...editorValue, validate: true })
            : setEditorValue({ ...editorValue, validate: false })
        }
      />
    </Panel>
  );
}
