import { exec } from 'child_process'
import path from 'path';
import { fileURLToPath } from 'url'



export const getPython = async (req, res) => {
  console.time('python')
  exec('conda activate tensorflow && python python/test.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    const trimmedData = stdout.trim();
    let jsonData = trimmedData
    if (trimmedData.startsWith('[')) {
      jsonData = JSON.parse(trimmedData);
    }
    console.timeEnd('python')
    res.status(200).json(jsonData);
  });


}