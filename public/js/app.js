const express = require('express');
const app = express();
const Contenedor = require('./contenedor');
const contenedor = new Contenedor("productos.json");
app.get('/productos', async(_req, res, next) => {
    try {
        const productos = await contenedor.getAll();
        res.render('pages/list', { productos })
    } catch (error) {
        next(error)
    }
})
app.post('/productos', async(req, res, next) => {
    try {
        const { body } = req;
        await contenedor.save(body);
        res.redirect('/');
    } catch (error) {
        next(error)
    }
})
app.get('/', (_req, res, next) => {
    try {
        res.render('pages/form', {})
    } catch (error) {
        next(error)
    }
})
module.exports = app;