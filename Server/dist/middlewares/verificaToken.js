"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const token_1 = __importDefault(require("../classes/token"));
const usuario_model_1 = require("../models/usuario.model");
const verificaToken = (req, res, next) => {
    let userToken = req.get('Authorization') || '';
    if (userToken !== '') {
        userToken = userToken.split('Bearer ')[1];
    }
    token_1.default.compareToken(userToken).then((decoded) => __awaiter(void 0, void 0, void 0, function* () {
        const miUsuario = decoded.usuario._id;
        const usuarioBD = yield usuario_model_1.Usuario.findById(miUsuario);
        if (!usuarioBD) {
            res.status(200).json({
                status: 'error',
                mensaje: 'El usuario no existe'
            });
        }
        else {
            req.body.usuario = usuarioBD;
        }
        next();
    })).catch(err => {
        console.log('hay error aquí', err);
        res.status(200).json({
            status: 'fail',
            mensaje: 'err'
        });
    });
};
exports.verificaToken = verificaToken;
