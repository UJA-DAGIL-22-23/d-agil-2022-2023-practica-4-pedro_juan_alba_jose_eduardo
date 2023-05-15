/**
 * @file Todo.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Todo = {};

// Tags que voy a usar para sustituir los campos
Todo.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
}

// Plantilla de datosDescargados vacíos
Todo.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Todo.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}

Todo.plantillaTablaDeportistasSoloNombres = {}


//Tabla para mostrar los nombres de los deportistas
Todo.plantillaTablaDeportistasSoloNombres.cabecera = `<table width="100%" class="listado-nombre-deportistas">
<thead>
    
    <th width="50%">Nombre</th>
</thead>
<tbody>
`;



Todo.plantillaTablaDeportistasSoloNombres.cuerpo = `

    <tr title="${Todo.plantillaTags.NOMBRE}">
        <td style="text-align:center;">${Todo.plantillaTags.NOMBRE}</td>  
    </tr>

`;

Todo.plantillaTablaDeportistasSoloNombres.pie = `
    </tbody>
    </table>

`

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos del deportista que se le pasa
 * @param {String} Todo Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Todo} deportista Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Todo.sustituyeTags = function (plantilla, deportista) {
    return plantilla
        //.replace(new RegExp(Todo.plantillaTags.ID, 'g'), deportista.ref['@ref'].id)   
        .replace(new RegExp(Todo.plantillaTags.NOMBRE, 'g'), deportista.data.nombre)
}


Todo.plantillaTablaDeportistasSoloNombres.actualiza = function (deportista) {
    return Todo.sustituyeTags(this.cuerpo, deportista)
}


Todo.mostrarDeportistas = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/todo/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los deportistas que se han descargado
    let vectorDeportistas = null
    if (response) {
        vectorDeportistas = await response.json()
        callBackFn(vectorDeportistas)
    }
}


Todo.imprimeNombreTodosDeportistas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector
    let msj = Todo.plantillaTablaDeportistasSoloNombres.cabecera
    // Compongo el contenido que se va a mostrar dentro de la tabla
    vector.forEach(e => msj += Todo.plantillaTablaDeportistasSoloNombres.actualiza(e))
    msj += Todo.plantillaTablaDeportistasSoloNombres.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de los nombres de deportistas de todos los deportes", msj)
}


/**
 * Función principal para recuperar los nombres de los deportistas desde el MS y, posteriormente, imprimirlas.
 */
Todo.listarTodosNombres = function () {
    Todo.mostrarDeportistas(Todo.imprimeNombreTodosDeportistas);
}
