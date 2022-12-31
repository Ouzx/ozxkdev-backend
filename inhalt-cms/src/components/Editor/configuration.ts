import { EditorConfig } from "@editorjs/editorjs";
import tools from "./tools";
const configuration: EditorConfig = {
  holder: "editor",
  tools,
  autofocus: true,
  placeholder: "Let`s write an awesome story!",
  inlineToolbar: true,
};

export default configuration;
