const fs = require("fs");

class Contenedor {
    constructor(fileName) {
        this.filename = fileName;
        this.crearArchivo();
    }

    async crearArchivo() {
        fs.writeFile(this.filename, "[]", (error) => {
            error
                ?
                console.log(error) :
                console.log(`archivo ya creadon con el mismo nombre`);
        });
    }

    async getById(id) {
        try {
            const data = await this.getData();
            const parsedData = JSON.parse(data);

            return parsedData.find((producto) => producto.id === id);
        } catch (error) {
            console.log(
                `error con este id: (${id})`
            );
        }
    }

    async deleteById(id) {
        try {
            const data = await this.getData();
            const parsedData = JSON.parse(data);
            const objectoparasacar = parsedData.find(
                (producto) => producto.id === id
            );

            if (objectoparasacar) {
                const index = parsedData.indexOf(objectoparasacar);
                parsedData.splice(index, 1);
                await fs.promises.writeFile(this.filename, JSON.stringify(parsedData));
            } else {
                console.log(`ID ${id} no existe en este archivo`);
                return null;
            }
        } catch (error) {
            console.log(
                `erro al intentar eliminar ete  ID (${id})`
            );
        }
    }

    async save(object) {
        try {
            const allData = await this.getData();
            const parsedData = JSON.parse(allData);

            object.id = parsedData.length + 1;
            parsedData.push(object);

            await fs.promises.writeFile(this.filename, JSON.stringify(parsedData));
            return object.id;
        } catch (error) {
            console.log(
                `error al guardar archivo`
            );
        }
    }

    async deleteAll() {
        try {
            await this.crearArchivo();
        } catch (error) {
            console.log(
                `error al eliminar todos los archivos`
            );
        }
    }

    async getData() {
        const data = await fs.promises.readFile(this.filename, "utf-8");
        return data;
    }

    async getAll() {
        const data = await this.getData();
        return JSON.parse(data);
    }
}


const main = async() => {
    const contenedor = new Contenedor("productos.json");
    const id1 = await contenedor.save({ title: "sacapuntas", price: 200, url: "images.google.com" });
    const id2 = await contenedor.save({ title: "marcador", price: 400, url: "images.google.com" });
    const id3 = await contenedor.save({ title: "tijeras", price: 600, url: "images.google.com" });

    console.log(id1, id2, id3);

    const object2 = await contenedor.getById(2);
    console.log(object2);
    const todoslosObjetos = await contenedor.getAll();
    console.log(todoslosObjetos);
    await contenedor.deleteById(2);

    const objetosEnElArchivo = await contenedor.getAll();
    console.log(objetosEnElArchivo);
    await contenedor.deleteAll();
}

main();