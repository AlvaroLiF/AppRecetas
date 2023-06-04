import bodyParser from "body-parser";
import Server from "./classes/Server";
import cors from "cors";
import { usuarioRuta } from "./routes/usuario.ruta";
import mongoose from "mongoose";
import { recetaRuta } from "./routes/receta.ruta";

const miServidor = new Server();

miServidor.app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
miServidor.app.use(bodyParser.json({ limit: '5mb' }));
miServidor.app.use(cors({
    origin: true,
    credentials: true
}));

miServidor.app.use('/usuario', usuarioRuta);

miServidor.app.use('/recetas', recetaRuta);

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/pruebasApp',
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