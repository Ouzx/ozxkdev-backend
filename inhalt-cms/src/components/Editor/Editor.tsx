import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import configuration from "./configuration";
import { stripHtml } from "string-strip-html";

const DEFAULT_INITIAL_DATA = (): OutputData => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "Your title goes here",
          level: 1,
        },
      },
    ],
  };
};

const getTitle = (content: OutputData) => {
  for (let i = 0; i < content.blocks.length; i++) {
    if (content.blocks[i].type == "header" && content.blocks[i].data.text) {
      return content.blocks[i].data.text;
    }
  }
  return "";
};

const getAbstract = (content: OutputData) => {
  let abstract = "";
  let headerTaken = false;
  for (let i = 0; i < content.blocks.length; i++) {
    if (
      content.blocks[i].type == "header" &&
      content.blocks[i].data.text &&
      !headerTaken
    ) {
      headerTaken = true;
    } else if (
      content.blocks[i].type == "header" ||
      content.blocks[i].type == "paragraph"
    ) {
      abstract += stripHtml(content.blocks[i].data.text).result + " ";
    }
    if (abstract.length >= 200) break;
  }
  return abstract;
};

const getThumbnail = (content: OutputData) => {
  for (let i = 0; i < content.blocks.length; i++) {
    if (content.blocks[i].type == "image" && content.blocks[i].data.file.url) {
      return content.blocks[i].data.file.url;
    }
  }
  return "";
};

const Editor = () => {
  const ejInstance = useRef<EditorJS | null>();

  const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const config = {
      ...configuration,
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await editor.saver.save();
        setEditorData(content);
      },
    };
    const editor = new EditorJS(config);
  };

  return (
    <div className="container">
      <div id="editor"></div>
    </div>
  );
};

export default Editor;
