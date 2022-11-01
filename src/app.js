const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', './src/views');
app.set('view engine', 'pug');
const errorHandler = require('./midllewares/errohandle');
const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json");
app.use(errorHandler);
app.get('/productos', async(_req, res, next) => {
    try {
        const products = await contenedor.getAll();
        res.render('list', {
            products: products
        })
    } catch (error) {
        next(error)
    }
})

app.get('/', (_req, res, next) => {
    try {
        res.render('form', {})
    } catch (error) {
        next(error)
    }
})

app.post('/productos', async(req, res) => {
    try {
        const { body } = req;
        await contenedor.save(body);
        res.redirect('/');
    } catch (error) {
        next(error)
    }
})


module.exports = app;