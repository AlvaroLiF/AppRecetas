"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_model_1 = require("../models/usuario.model");
const token_1 = __importDefault(require("../classes/token"));
class usuarioController {
    newUser(req, res) {
        let pwdPlana = req.body.pwd;
        const hash = bcrypt_1.default.hashSync(pwdPlana, 10);
        const nuevoUsuario = {
            usuario: req.body.usuario,
            email: req.body.email,
            pwd: hash,
            edad: req.body.edad,
        };
        usuario_model_1.Usuario.create(nuevoUsuario, (err) => {
            if (err) {
                return res.status(200).json({
                    status: 'fail',
                    message: 'error al crear el usuario',
                    err
                });
            }
            else {
                return res.status(200).json({
                    status: 'ok',
                    message: 'usuario creado correctamente',
                });
            }
        });
    }
    login(req, res) {
        let usuarioQueBusco = req.body.usuario;
        let pwdQueBusco = req.body.pwd;
        usuario_model_1.Usuario.findOne({ usuario: usuarioQueBusco }, null, null, (err, usuarioBD) => {
            if (err || !usuarioBD) {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Usuario y/o contraseña incorrectos'
                });
            }
            else {
                let pwdBD = usuarioBD.pwd;
                let usuarioQueMando = new usuario_model_1.Usuario();
                usuarioQueMando.usuario = usuarioBD.usuario;
                usuarioQueMando._id = usuarioBD._id;
                if (bcrypt_1.default.compareSync(pwdQueBusco, pwdBD)) {
                    return res.status(200).json({
                        status: 'ok',
                        message: 'El usuario existe y es ' + usuarioBD.usuario,
                        token: token_1.default.generaToken(usuarioQueMando)
                    });
                }
                else {
                    return res.status(200).json({
                        status: 'fail',
                        message: 'Usuario y/o contraseña incorrectos'
                    });
                }
            }
        });
    }
    getEmail(req, res) {
        let email = req.body.usuario.email;
        let usuarioQueMando = new usuario_model_1.Usuario();
        usuarioQueMando.usuario = req.body.usuario.usuario;
        usuarioQueMando._id = req.body.usuario._id;
        return res.status(200).json({
            status: 'ok',
            message: 'El usuario existe y su email es ' + email,
            token: token_1.default.generaToken(usuarioQueMando)
        });
    }
    renuevaToken(req, res) {
        const id = req.body.usuario._id;
        usuario_model_1.Usuario.findById(id, (err, usuarioBD) => {
            if (err) {
                res.status(200).json({
                    status: 'fail',
                    mensaje: 'el usuario no existe'
                });
                throw err;
            }
            if (!usuarioBD) {
                res.status(200).json({
                    status: 'fail',
                    mensaje: 'el usuario no existe'
                });
            }
            else {
                let usuarioQueMando = new usuario_model_1.Usuario();
                usuarioQueMando.usuario = usuarioBD.usuario;
                usuarioQueMando._id = usuarioBD._id;
                const token = token_1.default.generaToken(usuarioQueMando);
                res.status(200).json({
                    status: 'ok',
                    message: 'usuario renovado',
                    token
                });
            }
        });
    }
}
exports.default = usuarioController;
