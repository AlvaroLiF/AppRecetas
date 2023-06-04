"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recetaRuta = void 0;
const express_1 = require("express");
const receta_controlador_1 = __importDefault(require("../controllers/receta.controlador"));
const verificaToken_1 = require("../middlewares/verificaToken");
exports.recetaRuta = (0, express_1.Router)();
// Ruta para obtener todas las recetas
exports.recetaRuta.get('/allRecetas', receta_controlador_1.default.prototype.obtenerTodasLasRecetas);
// Ruta para crear una nueva receta
exports.recetaRuta.post('/newReceta', receta_controlador_1.default.prototype.nuevaReceta);
// Ruta para obtener una receta por su ID
exports.recetaRuta.get('/:id', receta_controlador_1.default.prototype.obtenerReceta);
// Ruta para actualizar una receta por su ID
exports.recetaRuta.put('/:id', verificaToken_1.verificaToken, receta_controlador_1.default.prototype.actualizarReceta);
// Ruta para eliminar una receta por su ID
exports.recetaRuta.delete('/:id', verificaToken_1.verificaToken, receta_controlador_1.default.prototype.eliminarReceta);
