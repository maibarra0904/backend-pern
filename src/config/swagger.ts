import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Productos',
                description: 'Endpoints para productos'
            }
        ],
        info: {
            title: 'REST API de productos / Express / TypeScript',
            version: '1.0.0',
            description: "API Docs for Products"
        }
    },
    apis: ['./src/handlers/*.ts', './src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `.link { 
            content: url('https://uae-vinculacion-computacion.netlify.app/_next/image?url=%2Flogo.jpg&w=1920&q=75');
            height: 120px;
            width: 60px;
        },
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
            `, // Para ocultar la barra superior de Swagger
    customSiteTitle: "Documentacion", // Para cambiar el título de la página
    customCssUrl: '/custom.css', // Ruta al archivo CSS personalizado
}

export default swaggerSpec;

export {
    swaggerUiOptions
}