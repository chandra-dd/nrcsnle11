import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).send('Method Not Allowed');
  }

  const { fileName } = req.body;

  if (!fileName) {
    return res.status(400).send('File name is required');
  }

  const filePath = path.join(process.cwd(), 'public', 'images', fileName);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);  // Delete the file
    res.status(200).send('File deleted');
  } else {
    res.status(404).send('File not found');
  }
}
