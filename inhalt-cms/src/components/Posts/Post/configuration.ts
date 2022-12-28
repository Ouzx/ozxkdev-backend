import { EditorConfig } from "@editorjs/editorjs";
import tools from "./tools";
const configuration: EditorConfig = {
  holder: "editor",
  tools,
  autofocus: true,
  placeholder: "Let`s write an awesome story!",
  // readOnly: true,
  onReady: () => {
    console.log("Editor is ready to work!X");
  },
  onChange: (api, event) => {
    console.log("Now I know that Editor's content changed!", event);
  },
};

export default configuration;
