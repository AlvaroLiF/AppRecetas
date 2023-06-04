import { NextFunction } from "express";
import Token from "../classes/token";
import { Usuario } from "../models/usuario.model";


export const verificaToken = (req:any, res:any, next:NextFunction)=>{

    let userToken:string = req.get('Authorization') || '';

    if(userToken!==''){
        userToken = userToken.split('Bearer ')[1];
    }
    Token.compareToken(userToken).then(async (decoded:any)=>{
        const miUsuario = decoded.usuario._id;
        const usuarioBD = await Usuario.findById(miUsuario);
        if(!usuarioBD){
            res.status(200).json({
                status:'error',
                mensaje: 'El usuario no existe'
            });
        }
        else{
            req.body.usuario = usuarioBD;
        }
        next();
    }).catch(err =>{
        console.log('hay error aquí', err);
        res.status(200).json({
            status:'fail',
            mensaje:'err'
        });
    });
};