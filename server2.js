const app = require('./src2/app2')
const PORT = 4545;
const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));