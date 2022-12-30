import React, {
  useEffect,
  useRef,
  useState,
  Ref,
  useImperativeHandle,
} from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import configuration from "./configuration";
import { parse } from "./parser";

const DEFAULT_INITIAL_DATA: OutputData = {
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

interface props {
  height?: number;
  value?: string;
}

const Editor = React.forwardRef((prop: props, ref: Ref<any>) => {
  const ejInstance = useRef<EditorJS | null>();
  const [editorData, setEditorData] =
    useState<OutputData>(DEFAULT_INITIAL_DATA);

  useImperativeHandle(
    ref,
    () => {
      return {
        title: getTitle(),
        thumbnail: getThumbnail(),
        content: getContent(),
      };
    },
    [ejInstance.current, editorData]
  );

  useEffect(() => {
    if (!ejInstance?.current) {
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
      onChange: () => {
        ejInstance.current?.saver
          .save()
          .then((outputData: OutputData) => {
            setEditorData(outputData);
          })
          .catch((error: any) => {
            console.log("Saving failed: ", error);
          });
      },
    };
    const editor = new EditorJS(config);
  };

  const getTitle = () => {
    for (let i = 0; i < editorData.blocks.length; i++) {
      if (
        editorData.blocks[i].type == "header" &&
        editorData.blocks[i].data.text
      ) {
        return editorData.blocks[i].data.text;
      }
    }
    return "";
  };

  const getThumbnail = () => {
    for (let i = 0; i < editorData.blocks.length; i++) {
      if (
        editorData.blocks[i].type == "image" &&
        editorData.blocks[i].data.file.url
      ) {
        return editorData.blocks[i].data.file.url;
      }
    }
    return "";
  };

  const getContent = () => {
    const x = parse(editorData);
    return x;
  };

  return (
    <div className="container">
      <div id="editor"></div>
    </div>
  );
});

export default Editor;
