const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: semua pembayaran
router.get('/', (req, res) => {
  db.query('SELECT * FROM pembayaran ORDER BY tanggal DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST: tambah pembayaran
router.post('/', (req, res) => {
  const { nama_pembeli, nama_produk, jumlah, total_harga } = req.body;
  db.query(
    'INSERT INTO pembayaran (nama_pembeli, nama_produk, jumlah, total_harga) VALUES (?, ?, ?, ?)',
    [nama_pembeli, nama_produk, jumlah, total_harga],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Pembayaran berhasil dicatat' });
    }
  );
});

module.exports = router;