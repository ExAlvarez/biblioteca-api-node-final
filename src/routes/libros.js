const express = require('express');
const router = express.Router();

let libros = [
  { id: 1, titulo: '1984', autor: 'George Orwell', anio: 1949, genero: 'Distopía', disponible: true },
  { id: 2, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', anio: 1943, genero: 'Fábula', disponible: true }
];

router.get('/', (req, res) => res.json(libros));

router.get('/:id', (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) return res.status(404).json({ mensaje: 'Libro no encontrado' });
  res.json(libro);
});

router.post('/', (req, res) => {
  const nuevoLibro = { id: libros.length + 1, ...req.body };
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});

router.put('/:id', (req, res) => {
  const index = libros.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Libro no encontrado' });
  libros[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(libros[index]);
});

router.patch('/:id', (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) return res.status(404).json({ mensaje: 'Libro no encontrado' });
  Object.assign(libro, req.body);
  res.json(libro);
});

router.delete('/:id', (req, res) => {
  const index = libros.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Libro no encontrado' });
  const eliminado = libros.splice(index, 1);
  res.json(eliminado[0]);
});

module.exports = router;