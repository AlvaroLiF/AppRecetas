import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Usuario } from "../models/usuario.model";
import Token from "../classes/token";


export default class usuarioController {

    newUser(req: Request, res: Response) {
        let pwdPlana = req.body.pwd;
        const hash = bcrypt.hashSync(pwdPlana, 10);
        const nuevoUsuario = {
            usuario: req.body.usuario,
            email: req.body.email,
            pwd: hash,
            edad: req.body.edad,
        }
        Usuario.create(nuevoUsuario, (err) => {
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

    login(req: Request, res: Response) {

        let usuarioQueBusco = req.body.usuario;
        let pwdQueBusco = req.body.pwd;

        Usuario.findOne({ usuario: usuarioQueBusco }, null, null, (err, usuarioBD) => {
            if (err || !usuarioBD) {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Usuario y/o contraseña incorrectos'
                });
            }
            else {
                let pwdBD = usuarioBD.pwd;
                let usuarioQueMando = new Usuario();
                usuarioQueMando.usuario = usuarioBD.usuario;
                usuarioQueMando._id = usuarioBD._id;
                if (bcrypt.compareSync(pwdQueBusco, pwdBD)) {
                    return res.status(200).json({
                        status: 'ok',
                        message: 'El usuario existe y es ' + usuarioBD.usuario,
                        token: Token.generaToken(usuarioQueMando)
                    });
                }
                else {
                    return res.status(200).json({
                        status: 'fail',
                        message: 'Usuario y/o contraseña incorrectos'
                    });
                }
            }
        })

    }

    getEmail(req: any, res: Response) {

        let email = req.body.usuario.email;
        let usuarioQueMando = new Usuario();
        usuarioQueMando.usuario = req.body.usuario.usuario;
        usuarioQueMando._id = req.body.usuario._id;
        return res.status(200).json({
            status: 'ok',
            message: 'El usuario existe y su email es ' + email,
            token: Token.generaToken(usuarioQueMando)
        });

    }

    renuevaToken(req:any, res:Response){
        const id = req.body.usuario._id;
        Usuario.findById(id,(err:any, usuarioBD:any)=>{
            if(err){
                res.status(200).json({
                    status:'fail',
                    mensaje:'el usuario no existe'
                })
                throw err;
            }
            if(!usuarioBD){
                res.status(200).json({
                    status:'fail',
                    mensaje:'el usuario no existe'
                })
            }
            else{
                let usuarioQueMando = new Usuario();
                usuarioQueMando.usuario = usuarioBD.usuario;
                usuarioQueMando._id = usuarioBD._id;
                const token = Token.generaToken(usuarioQueMando);
                res.status(200).json({
                    status:'ok',
                    message:'usuario renovado',
                    token
                })
            }
        })
    }

}



