import { exportModel, importModel } from './export-import.js';

const exportBtn = document.getElementById('export-btn')!;
const importInput = document.getElementById('import-input')! as HTMLInputElement;
const output = document.getElementById('output')!;

exportBtn.addEventListener('click', async () => {
  await exportModel();
});

importInput.addEventListener('change', async (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const model = await importModel(file);
    output.textContent = JSON.stringify(model, null, 2);
  }
});