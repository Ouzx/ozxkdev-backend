import edjsParser from "@herii/editorjs-parser";

const parser = new edjsParser();
export const parse = (editorjs_data) => parser.parse(editorjs_data);
