import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export async function exportModel() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Model');

  sheet.addRow(['Key', 'Value']);
  sheet.addRow(['Project Name', 'Solar Project X']);
  sheet.addRow(['Distance From Coast', '>25 miles']);

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), 'model.xlsx');
}

export async function importModel(file: File) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(await file.arrayBuffer());

  const sheet = workbook.getWorksheet('Model');
  const model: Record<string, any> = {};

  if (sheet) {
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // skip header
        const key = row.getCell(1).text;
        const value = row.getCell(2).text;
        model[key] = value;
      }
    });
  } else {
    throw new Error("Worksheet 'Model' not found in the file.");
  }

  return model;
}
