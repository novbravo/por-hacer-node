const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            console.log('Hubo un error al registrar los datos'.red);
        } else {
            console.log('El registro se guardó con éxito'.green);
        }
    });
};

const leerDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
};

const crear = (descripcion) => {
    leerDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return listadoPorHacer;
};

const getListado = () => {
    leerDB();
    return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {
    leerDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
    } else {
        console.log('No existe la tarea ingresada');
    }

};

const borrar = (descripcion) => {
    leerDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        console.log('No existe la tarea ingresada');
        return false;
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};