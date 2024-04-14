import { Plate } from "@udecode/plate-common";
import { Editor } from "@ui/Editor/Editor";
import { createFontColorPlugin } from "@udecode/plate-font";
const plugins = [createFontColorPlugin()];
export const SequenceInput = () => {
  return (
    <Plate plugins={plugins}>
      <Editor placeholder="Type..." />
    </Plate>
  );
};
