"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receta = void 0;
const mongoose_1 = require("mongoose");
const recetaSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    ingredients: { type: [String], required: true },
    ingredientsCount: { type: Number, required: true },
    steps: { type: [String], required: true }
}, {
    timestamps: true,
});
exports.Receta = (0, mongoose_1.model)('Receta', recetaSchema);
