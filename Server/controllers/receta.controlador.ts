import { Request, Response } from 'express';
import { Receta } from '../models/receta.model';


export default class RecetaController {

  nuevaReceta(req: Request, res: Response) {
    const nuevaReceta = {
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      cookingTime: req.body.cookingTime,
      ingredients: req.body.ingredients,
      ingredientsCount: req.body.ingredientsCount,
      steps: req.body.steps,
    }
    Receta.create(nuevaReceta, (err, recetaCreada) => {
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

  obtenerReceta(req: Request, res: Response) {
    const recetaId = req.params.id;

    Receta.findById(recetaId, (err: any, receta: any) => {
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

  obtenerTodasLasRecetas(req: Request, res: Response) {
    Receta.find({}, (err: any, recetas: any) => {
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

  actualizarReceta(req: Request, res: Response) {
    const recetaId = req.params.id;
    const actualizacion = req.body;

    Receta.findByIdAndUpdate(recetaId, actualizacion, { new: true }, (err, receta) => {
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

  eliminarReceta(req: Request, res: Response) {
    const recetaId = req.params.id;

    Receta.findByIdAndRemove(recetaId, (err: any, receta: any) => {
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
