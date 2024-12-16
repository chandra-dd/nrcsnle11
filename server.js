const express = require('express');
const next = require('next');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Enable express to handle JSON and URL encoded data
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // API route for file upload
  server.post('/api/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), '/public/images');
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).send('Error in file upload');
        return;
      }

      const uploadedFile = files.file[0];
      const uploadedFilePath = uploadedFile.filepath;

      res.status(200).json({ fileUrl: `/images/${path.basename(uploadedFilePath)}` });
    });
  });

  // API route for file deletion
  server.delete('/api/delete', (req, res) => {
    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).send('File name is required');
    }

    const filePath = path.join(process.cwd(), 'public', 'images', fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file
      res.status(200).send('File deleted');
    } else {
      res.status(404).send('File not found');
    }
  });

  // Default handler for other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server on port 4000 (or any port you prefer)
  server.listen(4000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:4000');
  });
});
