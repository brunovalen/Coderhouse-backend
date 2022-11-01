app = require('./src/app')
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(` Servidor iniciado en http://localhost:${PORT}`)
})
server.on('error', (err) => console.log(err));