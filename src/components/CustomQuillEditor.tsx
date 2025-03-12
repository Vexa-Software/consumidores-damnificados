import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface CustomQuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

// 🔹 Función para convertir clases de Quill a Tailwind antes de guardar
export const convertQuillToTailwind = (html: string) => {
  return html
    .replace(/ql-align-center/g, "text-center")
    .replace(/ql-align-right/g, "text-right")
    .replace(/ql-align-justify/g, "text-justify")
    .replace(/ql-align-left/g, "text-left");
};

// 🔹 Función para volver a convertir Tailwind a Quill cuando edites
export const convertTailwindToQuill = (html: string) => {
  return html
    .replace(/text-center/g, "ql-align-center")
    .replace(/text-right/g, "ql-align-right")
    .replace(/text-justify/g, "ql-align-justify")
    .replace(/text-left/g, "ql-align-left");
};

const CustomQuillEditor: React.FC<CustomQuillEditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }], // 🔹 Permite alineación en Quill
      ["clean"],
    ],
  };

  const formats = ["header", "bold", "italic", "underline", "strike", "list", "bullet", "link", "align"];

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className="bg-white"
    />
  );
};

export default CustomQuillEditor;
