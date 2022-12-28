import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
// import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";

class Uploader {
  uploadSelectedFile() {}
  uploadByUrl(url, { setPreview }) {
    console.log("uploadByUrl", url);

    setPreview(url);
    return api.uploadFileByURL(url);
  }
  uploadByFile() {}
}

export default {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: "http://localhost:8000/api/uploadFile", // Your backend file uploader endpoint
        byUrl: "http://localhost:8000/api/fetchUrl", // Your endpoint that provides uploading by Url
        // uploader: new Uploader(),
      },
      additionalRequestHeaders: {
        // bearer localStorage > user > accessToken
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).accessToken
        }`,
      },
    },
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
};
