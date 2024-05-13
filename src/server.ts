import express from 'express';
import cors, { CorsOptions } from "cors"
import router from './router';
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from './config/swagger';
import db from './config/db';
import colors from 'colors'
import morgan from 'morgan';


//Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue.bold('Conectado a la base de datos'));
    } catch (error) {
        console.log(error);
        console.log(colors.bgRed.white('Hubo un error al conectar a la base de datos'));
    }
}

connectDB();


const server = express();

// const corsOptions: CorsOptions = {
//     origin: process.env.FRONTEND_URL!,
//     credentials: true,
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

//Permitir el uso de cors
server.use(cors());

//Leer datos de formularios
server.use(express.json())

//Aplicacion de Morgan
server.use(morgan('dev'))

//Routing
server.use('/api/productos', router)

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions))

server.get('/api', (req, res) => {
    res.json( {
        message: 'Hola mundo'
    })
})


export default server