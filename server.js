const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Storage config
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully!');
});

// List files
app.get('/files', (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) return res.send(err);
        res.json(files);
    });
});

// Download file
app.get('/download/:filename', (req, res) => {
    const file = path.join(__dirname, 'uploads', req.params.filename);
    res.download(file);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});