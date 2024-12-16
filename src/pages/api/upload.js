// src/pages/api/upload.js
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable Next.js's default body parsing to handle file uploads
export const config = {
  api: {
    bodyParser: false, // Disables the default body parser to use formidable
  },
};

// Handle the file upload
export default function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "public", "images"); // Set upload destination
    form.keepExtensions = true; // Keep the file extension

    // Parse the incoming request to extract the file
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: "Something went wrong during file upload" });
        return;
      }

      // Access the uploaded file from `files` object
      const uploadedFile = files.file[0]; // Assuming the file field is named 'file'
      const filePath = uploadedFile.filepath;

      // Optionally, rename the file to something more meaningful
      const newFileName = `${Date.now()}_${uploadedFile.originalFilename}`;
      const newFilePath = path.join(form.uploadDir, newFileName);

      // Move the file to the correct location
      fs.renameSync(filePath, newFilePath);

      res.status(200).json({ message: "File uploaded successfully", file: newFileName });
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
