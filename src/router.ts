import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator"
import { handleInputErrors } from "./middlewares";

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *              Product:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                          description: The product ID
 *                          example: 1
 *                      name:
 *                          type: string
 *                          description: The product name
 *                          example: Monitor curvo de 49''
 *                      price:
 *                          type: number
 *                          description: The product price
 *                          example: 300
 *                      availability:
 *                          type: boolean
 *                          description: The product availability
 *                          example: true
 */

/**
 * @swagger
 * /api/productos:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Productos
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *          
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/productos/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Productos
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */

router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById)

/**
 * @swagger
 * /api/productos:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Productos
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 * 
 */

router.post('/',
    //Validación
    body('name')
        .notEmpty().withMessage('El Nombre de producto no puede ir vacío'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El Precio de producto no puede ir vacío')
        .custom(value => value > 0).withMessage('Precio no valido'),

    handleInputErrors,

    createProduct)

/**
 * @swagger
 * /api/productos/{id}:  
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Productos
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product Not Found
 */

router.put('/:id',
    //Validación
    param('id').isInt().withMessage('ID no valido'),

    body('name')
        .notEmpty().withMessage('El Nombre de producto no puede ir vacío'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El Precio de producto no puede ir vacío')
        .custom(value => value > 0).withMessage('Precio no valido'),

    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),

    handleInputErrors,

    updateProduct)

/**
 * @swagger
 * /api/productos/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags: 
 *          - Productos
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

router.patch('/:id',

    param('id').isInt().withMessage('ID no valido'),

    handleInputErrors,

    updateAvailability)

/**
 * @swagger
 * /api/productos/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags: 
 *          - Productos
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),

    handleInputErrors,
    
    deleteProduct
)

export default router;