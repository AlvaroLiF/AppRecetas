"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const receta_model_1 = require("../models/receta.model");
class RecetaController {
    nuevaReceta(req, res) {
        const nuevaReceta = {
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            cookingTime: req.body.cookingTime,
            ingredients: req.body.ingredients,
            ingredientsCount: req.body.ingredientsCount,
            steps: req.body.steps,
        };
        receta_model_1.Receta.create(nuevaReceta, (err, recetaCreada) => {
            if (err) {
                return res.status(500).json({
                    status: 'fail',
                    message: 'Error al crear la receta',
                    error: err,
                });
            }
            res.status(201).json({
                status: 'success',
                data: recetaCreada,
            });
        });
    }
    obtenerReceta(req, res) {
        const recetaId = req.params.id;
        receta_model_1.Receta.findById(recetaId, (err, receta) => {
            if (err) {
                return res.status(500).json({
                    status: 'fail',
                    message: 'Error al obtener la receta',
                    error: err,
                });
            }
            if (!receta) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Receta no encontrada',
                });
            }
            res.status(200).json({
                status: 'success',
                data: receta,
            });
        });
    }
    obtenerTodasLasRecetas(req, res) {
        receta_model_1.Receta.find({}, (err, recetas) => {
            if (err) {
                return res.status(500).json({
                    status: 'fail',
                    message: 'Error al obtener las recetas',
                    error: err,
                });
            }
            res.status(200).json({
                status: 'success',
                data: recetas,
            });
        });
    }
    actualizarReceta(req, res) {
        const recetaId = req.params.id;
        const actualizacion = req.body;
        receta_model_1.Receta.findByIdAndUpdate(recetaId, actualizacion, { new: true }, (err, receta) => {
            if (err) {
                return res.status(500).json({
                    status: 'fail',
                    message: 'Error al actualizar la receta',
                    error: err,
                });
            }
            if (!receta) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Receta no encontrada',
                });
            }
            res.status(200).json({
                status: 'success',
                data: receta,
            });
        });
    }
    eliminarReceta(req, res) {
        const recetaId = req.params.id;
        receta_model_1.Receta.findByIdAndRemove(recetaId, (err, receta) => {
            if (err) {
                return res.status(500).json({
                    status: 'fail',
                    message: 'Error al eliminar la receta',
                    error: err,
                });
            }
            if (!receta) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Receta no encontrada',
                });
            }
            res.status(200).json({
                status: 'success',
                data: receta,
            });
        });
    }
}
exports.default = RecetaController;
