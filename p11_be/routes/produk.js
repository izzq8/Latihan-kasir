const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: ambil semua produk
router.get('/', (req, res) => {
  db.query('SELECT * FROM produk', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST: tambah produk baru
router.post('/', (req, res) => {
  const { nama, harga } = req.body;
  db.query('INSERT INTO produk (nama, harga) VALUES (?, ?)', [nama, harga], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, nama, harga });
  });
});

// DELETE: hapus produk
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM produk WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Produk dihapus' });
  });
});

module.exports = router;