class Usuario {
    constructor(nombre, apellido, autor, libro, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = {
            autor: [autor],
            libro: [libro]
        };
        this.mascotas = [mascotas];
    }
}

function getFullname(usuario) {
    return (`Nombre Completo: ${usuario.nombre} ${usuario.apellido}`)
}

function addmascota(usuario, mascotaName) {
    return (usuario.mascotas.push(mascotaName))
}

function countMascotas(usuario) {
    return (usuario.mascotas.length)
}

function addBokk(usuario, nombre, autor) {
    return (
        usuario.libros.libro.push(nombre),
        usuario.libros.autor.push(autor)
    )
}

function getbookNames(usuario) {
    return ((usuario.libros.libro))
}
const usuario1 = new Usuario("Bruno", "De Cruz", "Ray dailio", "Principios del nuevo orden mundial", "perro")
console.log(
    addmascota(usuario1, "gato"),
    addmascota(usuario1, "pajaro"),
    countMascotas(usuario1),
    addBokk(usuario1, "el inversor inteligente", "Warren Buffet"),
    getbookNames(usuario1),
    usuario1,
    getFullname(usuario1))