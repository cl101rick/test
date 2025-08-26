const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configure Multer for disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Files will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using timestamp and original extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Create the Multer upload middleware
const upload = multer({ storage: storage });

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route to handle file uploads
app.post('/upload', upload.single('myFile'), (req, res) => {
    if (req.file) {
        res.send('File uploaded successfully: ' + req.file.filename);
    } else {
        res.status(400).send('No file uploaded.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
