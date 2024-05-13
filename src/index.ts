import  server from './server';
import cors from "cors"
import colors from 'colors'

const port = process.env.PORT || 4000;

server.use(cors());

//server.use(express.json());


server.listen(port, () => {
  console.log(colors.yellow.bold(`Servidor corriendo en http://localhost:${port}`));
});