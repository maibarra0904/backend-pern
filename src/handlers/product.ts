import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
        //limit: 2
    })

    try {
        res.json({data: products})    
    } catch (error) {
        console.log(error)
    }
    
}

export const createProduct = async(req: Request, res: Response) =>{

    try {
        const product = await Product.create(req.body)

        res.status(201).json({data: product})
    } catch (error) {
        console.log(error)
    }

    
}

export const getProductById = async (req: Request, res: Response) => {
    
    
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
                             //Product.findOne(req.params) //Esto esto permitiria hacer busqueda de registros por precio, nombre, id, etc...

        if(!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }
                            
        res.json({data: product})

    } catch (error) {
        console.log(error)
    }
    
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
                             //Product.findOne(req.params) //Esto esto permitiria hacer busqueda de registros por precio, nombre, id, etc...

        if(!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }

        //Actualizar
        await product.update(req.body)
        await product.save()
                            
        res.json({data: product})

    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }
        
        const productUpdated = {...product.dataValues,
            'availability': !product.dataValues.availability
        }

        await product.update(productUpdated)
        await product.save()
                            
        res.json({data: product})

    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }

        await product.destroy()
        
        res.json({message: 'Producto eliminado'})
    } catch (error) {
        console.log(error)
    }
}