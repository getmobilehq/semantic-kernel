import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Quill modules to add features like toolbar, image upload, etc.
const textEditorModule = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

// Quill formats to specify allowed styles
const textEditorFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "background",
];

const BodyEditor = ({ content, setContent, label }) => {
  return (
    <div className='mb-5'>
      <div className='pb-2'>{label}</div>
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={textEditorModule}
        formats={textEditorFormats}
      />
    </div>
  );
};

export default BodyEditor;
