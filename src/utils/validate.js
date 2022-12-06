import { FILE_TYPE, MAX_FILES, LIMIT_FILES } from "@/constants/index";

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
export function maxFilesUpload(files) {
  return files.length <= MAX_FILES;
}
export function limitFileType(name) {
  let ext = name.split(".").pop().toLowerCase();
  return LIMIT_FILES.some((f) => f === ext);
}
