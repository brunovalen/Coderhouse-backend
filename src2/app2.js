const express = require('express');
const app = express();
const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const errorHandler = require('./midllewares/errohandle');
app.set('views', './src2/views');
app.set('view engine', 'ejs');
app.use(errorHandler);
app.get('/productos', async(_req, res, next) => {
    try {
        const productos = await contenedor.getAll();
        res.render('pages/list', { productos })
    } catch (error) {
        next(error)
    }
})

app.get('/', (req, res) => {
    try {
        res.render('pages/form', {})
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