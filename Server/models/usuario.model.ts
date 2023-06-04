import { model, Schema } from "mongoose";
import { IUsuario } from "../interfaces/usuario.interfaces";

const usuarioSchema = new Schema({
    usuario: { type: String, unique: true, uniqueCaseInsensitive: true, trim: true },
    pwd: { type: String },
    email: { type: String, unique: true },
    edad: { type: Number }
}, {
    timestamps: true,
}
);

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);