import {Router} from 'express';
import RecetaController from '../controllers/receta.controlador';
import { verificaToken } from '../middlewares/verificaToken';

export const recetaRuta = Router();

// Ruta para obtener todas las recetas
recetaRuta.get('/allRecetas', RecetaController.prototype.obtenerTodasLasRecetas);

// Ruta para crear una nueva receta
recetaRuta.post('/newReceta', RecetaController.prototype.nuevaReceta);

// Ruta para obtener una receta por su ID
recetaRuta.get('/:id', RecetaController.prototype.obtenerReceta);

// Ruta para actualizar una receta por su ID
recetaRuta.put('/:id', verificaToken, RecetaController.prototype.actualizarReceta);

// Ruta para eliminar una receta por su ID
recetaRuta.delete('/:id', verificaToken, RecetaController.prototype.eliminarReceta);
