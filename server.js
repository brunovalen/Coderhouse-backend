const express = require('express');
const app = require('./public/js/app');
const errorHandler = require('./src/midllewares/errohandle');
const { Server: HttpServer } = require('http');
const { Server: IoServer } = require('socket.io');
const { engine } = require('express-handlebars');
const Contenedor = require('./public/js/contenedor')
const http = new HttpServer(app);
const io = new IoServer(http);
const contenedor = new Contenedor("productos.json");
const chat = new Contenedor("chat.json");
app.use(errorHandler);
app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/src/views/layouts',
    partialsDir: __dirname + '/src/views/partials'
}))
io.on('connection', async(socket) => {

    const productos = await contenedor.getAll();
    socket.emit('bienvenidoLista', productos)

    const mensajes = await chat.getAll();
    socket.emit('home', mensajes)

    socket.on('msg', async(data) => {
        await chat.save(data);
        const mensajes = await chat.getAll();
        io.sockets.emit('list', mensajes)
    })

    socket.on('product', async(data) => {
        await contenedor.save(data);

        const productos = await contenedor.getAll();
        io.sockets.emit('update', productos);
    })
})

const PORT = 8080;
http.listen(PORT, () => {
    console.log(` servido iniciado en  http://localhost:${PORT}`)
})

http.on('error', (err) => console.log(err))