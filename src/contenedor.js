const fs = require("fs");

class Contenedor {
    constructor(fileName) {
        this._filename = fileName;
        this._readFileOrCreateNewOne();
    }

    async _readFileOrCreateNewOne() {
        try {
            await fs.promises.readFile(this._filename, "utf-8");
        } catch (error) {
            error
                ?
                this._createEmptyFile() :
                console.log(
                    `Error tratando de leer este archivo: ${this._filename}`
                );
        }
    }

    async _createEmptyFile() {
        fs.writeFile(this._filename, "[]", (error) => {
            error
                ?
                console.log(error) :
                console.log(`Archivo ${this._filename} Fue Creado`);
        });
    }

    async getById(id) {
        id = Number(id);
        try {
            const data = await this.getData();
            const parsedData = JSON.parse(data);

            return parsedData.find((producto) => producto.id === id);
        } catch (error) {
            console.log(
                `Error al buscar un elemento por su  ID (${id})`
            );
        }
    }

    async deleteById(id) {
        try {
            id = Number(id);
            const data = await this.getData();
            const parsedData = JSON.parse(data);
            const objectIdToBeRemoved = parsedData.find(
                (producto) => producto.id === id
            );

            if (objectIdToBeRemoved) {
                const index = parsedData.indexOf(objectIdToBeRemoved);
                parsedData.splice(index, 1);
                await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
                return true;
            } else {
                console.log(`ID ${id} no existe`);
                return null;
            }
        } catch (error) {
            console.log(
                `Error al intentar eliminar ID (${id})`
            );
        }
    }

    async updateById(id, newData) {
        try {
            id = Number(id);
            const data = await this.getData();
            const parsedData = JSON.parse(data);
            const objectIdToBeUpdated = parsedData.find(
                (producto) => producto.id === id
            );
            if (objectIdToBeUpdated) {
                const index = parsedData.indexOf(objectIdToBeUpdated);
                const { title, price, src } = newData;

                parsedData[index]['title'] = title;
                parsedData[index]['price'] = price;
                parsedData[index]['src'] = src;
                await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
                return true;
            } else {
                console.log(`ID ${id} no existe`);
                return null;
            }

        } catch (error) {
            `error`
        }
    }

    async save(object) {
        try {
            const allData = await this.getData();
            const parsedData = JSON.parse(allData);

            object.id = parsedData.length + 1;
            parsedData.push(object);

            await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
            return object.id;
        } catch (error) {
            console.log(
                `error al guardar elemento`
            );
        }
    }

    async deleteAll() {
        try {
            await this._createEmptyFile();
        } catch (error) {
            console.log(
                `error al borrar todo`
            );
        }
    }
    title

    async getData() {
        const data = await fs.promises.readFile(this._filename, "utf-8");
        return data;
    }

    async getAll() {
        const data = await this.getData();
        return JSON.parse(data);
    }
}

module.exports = Contenedor;