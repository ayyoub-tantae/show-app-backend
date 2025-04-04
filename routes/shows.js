const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database');
const router = express.Router();

// Configuration du stockage des images
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `show-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error('Only images are allowed (JPEG/JPG/PNG)'));
  }
});

// CRUD Operations
router.get('/', (req, res) => {
  db.all('SELECT * FROM shows ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', upload.single('image'), (req, res) => {
  const { title, description, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    `INSERT INTO shows (title, description, category, image) 
     VALUES (?, ?, ?, ?)`,
    [title, description, category, image],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({
        id: this.lastID,
        title,
        description,
        category,
        image
      });
    }
  );
});

// ... (PUT et DELETE similaires à votre code existant)

module.exports = router;