const Contenedor = require("./main");
const express = require('express');
const app = express();
const PORT = 8080;
const contenedor = new Contenedor("productos.json");
app.get('/', (_req, res) => {
    res.send('Hola tipeee una de las siguientes url para continuar /productos o /productoRandom')
});

app.get('/productos', async(req, res) => {
    const allProducts = await contenedor.getAll();
    res.json(allProducts);
});

app.get('/productoRandom', async(_req, res) => {
    const allProducts = await contenedor.getAll();
    const maxId = allProducts.length;

    const randomNumber = generateRandomNumber(1, maxId);
    const randomProduct = await contenedor.getById(randomNumber);

    res.json(randomProduct);

})
const generateRandomNumber = (min, max) => {
    return Math.floor((Math.random() * (max + 1 - min)) + min);
}

const server = app.listen(PORT, () => {
    console.log(`Servido ubicado en http://localhost:${PORT}`)
})

server.on('error', (error) => console.log(error));