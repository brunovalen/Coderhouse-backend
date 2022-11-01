const express = require('express');
const router = express.Router();
const Contenedor = require('../contenedor')
const contenedor = new Contenedor("productos.json");
router.get('/', async(_req, res, next) => {
    try {
        const products = await contenedor.getAll();
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
})
router.get('/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await contenedor.getById(id);
        product
            ?
            res.status(200).json(product) :
            res.status(404).json({ error: "Producto no encontrado" });
    } catch (error) {
        next(error)
    }

})
router.post('/', async(req, res, next) => {
    try {
        const { body } = req;
        const newProductId = await contenedor.save(body);
        res.status(200).json(`Producto agregado con el ID: ${newProductId}`)
    } catch (error) {
        next(error)
    }
})
router.put('/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const wasUpdated = await contenedor.updateById(id, body);
        wasUpdated
            ?
            res.status(200).json(`El producto de ID: ${id} fue actualizado`) :
            res.status(404).json(`El producto no fue actualizado porque no se encontró el ID: ${id}`);
    } catch (error) {
        next(error)
    }
})
router.delete('/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const wasDeleted = await contenedor.deleteById(id);
        wasDeleted
            ?
            res.status(200).json(`El producto de ID: ${id} fue borrado`) :
            res.status(404).json(`El producto no fue borrado porque no se encontró el ID: ${id}`);
    } catch (error) {
        next(error)
    }
})
module.exports = router