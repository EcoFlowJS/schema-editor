import { IconWrapper } from "@ecoflow/components-lib";
import { PiTextTFill } from "react-icons/pi";
import { RadioTile, RadioTileGroup } from "rsuite";

export default function SelectTextFormat({ ...props }: any) {
  return (
    <RadioTileGroup defaultValue="varchar" {...props}>
      <RadioTile
        icon={<IconWrapper icon={PiTextTFill} />}
        label="Short text"
        value="varchar"
      >
        Best for titles, names, links (URL). It create a field with
        varchar(255).
      </RadioTile>
      <RadioTile
        icon={<IconWrapper icon={PiTextTFill} />}
        label="Long text"
        value="text"
      >
        Best for descriptions, biography. It create a field with TEXT.
      </RadioTile>
    </RadioTileGroup>
  );
}
