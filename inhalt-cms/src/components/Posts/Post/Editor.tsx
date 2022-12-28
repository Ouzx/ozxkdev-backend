import EditorJS from "@editorjs/editorjs";
import configuration from "./configuration";

const Editor = () => {
  const editor = new EditorJS(configuration);

  const save = () =>
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  return (
    <div className="container">
      <div id="editor"></div>
    </div>
  );
};

export default Editor;
