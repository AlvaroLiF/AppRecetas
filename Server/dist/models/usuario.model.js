"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    usuario: { type: String, unique: true, uniqueCaseInsensitive: true, trim: true },
    pwd: { type: String },
    email: { type: String, unique: true },
    edad: { type: Number }
}, {
    timestamps: true,
});
exports.Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
