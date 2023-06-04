import { model, Schema } from "mongoose";
import { IReceta } from "../interfaces/receta.interfaces";

const recetaSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    ingredients: { type: [String], required: true },
    ingredientsCount: { type: Number, required: true },
    steps: { type: [String], required: true }
}, {
    timestamps: true,
}
);

export const Receta = model<IReceta>('Receta', recetaSchema);