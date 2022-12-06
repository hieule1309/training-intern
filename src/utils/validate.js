import { FILE_TYPE } from "@/constants/index";

export function getFileType(name) {
  const pdf = new RegExp("([a-zA-Z0-9s_\\.-:])+(.pdf)$");
  const excel = new RegExp("([a-zA-Z0-9s_\\.-:])+(.xls|.xlsx|.csv)$");
  const word = new RegExp("([a-zA-Z0-9s_\\.-:])+(.doc|.docx)$");
  if (excel.test(name.toLowerCase())) {
    return FILE_TYPE.EXCEL;
  } else if (pdf.test(name.toLowerCase())) {
    return FILE_TYPE.PDF;
  } else if (word.test(name.toLowerCase())) {
    return FILE_TYPE.DOC;
  } else {
    return FILE_TYPE.UNKNOW;
  }
}
export function validateDuplicate(file, fileList) {
  var result = fileList.some((f) => {
    return f.name === file.name;
  });
  return result;
}
export function maxFilesUpload(files, data) {
  return files.length <= data;
}
export function limitFileType(name, data) {
  let ext = name.split(".").pop().toLowerCase();
  return data.some((f) => f === ext);
}
export function filesMaxLength(files, data) {
  return files.length + 1 <= data;
}
