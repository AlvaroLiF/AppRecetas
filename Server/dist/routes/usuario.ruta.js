"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRuta = void 0;
const express_1 = require("express");
const usuario_controlador_1 = __importDefault(require("../controllers/usuario.controlador"));
const verificaToken_1 = require("../middlewares/verificaToken");
exports.usuarioRuta = (0, express_1.Router)();
exports.usuarioRuta.post('/newUser', usuario_controlador_1.default.prototype.newUser);
exports.usuarioRuta.post('/login', usuario_controlador_1.default.prototype.login);
exports.usuarioRuta.get('/getEmail', verificaToken_1.verificaToken, usuario_controlador_1.default.prototype.getEmail);
exports.usuarioRuta.get('/renewToken', verificaToken_1.verificaToken, usuario_controlador_1.default.prototype.renuevaToken);
