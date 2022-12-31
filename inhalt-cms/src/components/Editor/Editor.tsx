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
  blocks: [],
};

interface props {
  height?: number;
  content: string;
}

const Editor = React.forwardRef((prop: props, ref: Ref<any>) => {
  const ejInstance = useRef<EditorJS | null>();
  const [editorData, setEditorData] = useState<OutputData>(() => {
    if (prop.content) return JSON.parse(prop.content) as OutputData;
    else return DEFAULT_INITIAL_DATA;
  });
  const [count, setCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  useImperativeHandle(
    ref,
    () => {
      return {
        title: getTitle(),
        thumbnail: getThumbnail(),
        content: getContent(),
        raw: JSON.stringify(editorData),
        shortContent: shortContent(),
        urlSuffix: urlSuffix(),
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

  useEffect(() => {
    if (!isReady) {
      setTimeout(() => {
        setCount(count + 1);
      }, 1000); // 1000 milliseconds = 1 second
    }
    if (!prop.content) return;
    if (!ejInstance.current) return console.log("Editor not initialized");

    setIsReady(true);
    const parsed = JSON.parse(prop.content) as OutputData;

    ejInstance.current.blocks.clear();
    ejInstance.current?.blocks.render(parsed);

    //SAVE
    ejInstance.current.saver
      .save()
      .then((outputData: OutputData) => {
        parsed.blocks.forEach((block: any) => {
          outputData.blocks.push(block);
        });
        setEditorData(outputData);
        // ejInstance.current?.blocks.render(parsed);
      })
      .catch((error: any) => {
        console.log("Saving failed: ", error);
      });
  }, [count]);

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
    for (let i = 0; i < editorData?.blocks?.length; i++) {
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
    for (let i = 0; i < editorData?.blocks?.length; i++) {
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
    if (!editorData) return "";
    return parse(editorData);
  };

  const shortContent = () => {
    for (let i = 0; i < editorData?.blocks?.length; i++)
      if (
        editorData.blocks[i].type == "paragraph" &&
        editorData.blocks[i].data.text
      )
        return editorData.blocks[i].data.text;
  };

  const urlSuffix = () => {
    // create from title
    let title = getTitle();
    // parse title to url
    let url = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    return url;
  };

  return (
    <div className="container border">
      <div id="editor"></div>
    </div>
  );
});

export default Editor;
