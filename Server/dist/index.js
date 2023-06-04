"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const Server_1 = __importDefault(require("./classes/Server"));
const cors_1 = __importDefault(require("cors"));
const usuario_ruta_1 = require("./routes/usuario.ruta");
const mongoose_1 = __importDefault(require("mongoose"));
const receta_ruta_1 = require("./routes/receta.ruta");
const miServidor = new Server_1.default();
miServidor.app.use(body_parser_1.default.urlencoded({ limit: '5mb', extended: true }));
miServidor.app.use(body_parser_1.default.json({ limit: '5mb' }));
miServidor.app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
miServidor.app.use('/usuario', usuario_ruta_1.usuarioRuta);
miServidor.app.use('/recetas', receta_ruta_1.recetaRuta);
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect('mongodb://127.0.0.1:27017/pruebasApp', 
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true}
(err) => {
    if (err) {
        console.log("error", err);
        throw err;
    }
    else {
        console.log(`Conectado a la base de datos`);
    }
});
miServidor.start(() => {
    console.log('Servidor iniciado en el puerto ' + miServidor.port);
});
