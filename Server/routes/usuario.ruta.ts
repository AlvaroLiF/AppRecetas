import { Router } from "express";
import usuarioController from "../controllers/usuario.controlador";
import { verificaToken } from "../middlewares/verificaToken";

export const usuarioRuta = Router();
usuarioRuta.post('/newUser', usuarioController.prototype.newUser);
usuarioRuta.post('/login', usuarioController.prototype.login);
usuarioRuta.get('/getEmail', verificaToken, usuarioController.prototype.getEmail);
usuarioRuta.get('/renewToken', verificaToken, usuarioController.prototype.renuevaToken);