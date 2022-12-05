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
  var result = false;
  let list = fileList.filter((f) => {
    return !f.name.includes(file.name);
  });
  if (list.length === fileList.length) {
    result = false;
  } else result = true;
  return result;
}
