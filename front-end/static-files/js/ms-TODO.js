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

// Tags que voy a usar para sustituir los campos
Todo.plantillaTagsCompletas = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "DEPORTE": "### DEPORTE ###"
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

/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
 Todo.descargarCompleto = async function (ruta, callBackFn) {
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
<center><div><a href="javascript:Todo.listarOrdenados()" class="opcion-secundaria mostrar">Ordenar</a></div></center>
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
Todo.plantillaTablaDeportistas = {}

//Tabla para mostrar los nombres de los deportistas
Todo.plantillaTablaDeportistas.cabecera = `
<form method='post' action=''>
    <input type="text" value="" id="form-busqueda"/> 
    <div><a href="javascript:Todo.buscarSubstring()" class="opcion-secundaria mostrar">Buscar</a></div>
</form>
<table width="100%" class="listado-personas">
    <thead>
        <th width="50%">Nombre</th>
        <th width="50%">Deporte</th>
    </thead>
    <tbody>
`;

Todo.plantillaTablaDeportistas.cuerpo = `

    <tr title="${Todo.plantillaTagsCompletas.NOMBRE}">
        <td style="text-align:center;">${Todo.plantillaTagsCompletas.NOMBRE}</td> 
        <td style="text-align:center;">${Todo.plantillaTagsCompletas.DEPORTE}</td>  
    </tr>

`;

Todo.plantillaTablaDeportistas.pie = `
    </tbody>
    </table>

`;

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos del deportista que se le pasa
 * @param {String} Todo Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Todo} deportista Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Todo.sustituyeTags = function (plantilla, deportista) {
    return plantilla
        .replace(new RegExp(Todo.plantillaTags.NOMBRE, 'g'), deportista)
}

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos del deportista que se le pasa
 * @param {String} Todo Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Todo} deportista Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
 Todo.sustituyeTagsCompletas = function (plantilla, deportista) {
    return plantilla
        .replace(new RegExp(Todo.plantillaTagsCompletas.NOMBRE, 'g'), deportista[0])
        .replace(new RegExp(Todo.plantillaTagsCompletas.DEPORTE, 'g'), deportista[1])
}

Todo.plantillaTablaDeportistasSoloNombres.actualiza = function (deportista) {
    return Todo.sustituyeTags(this.cuerpo, deportista)
}

Todo.plantillaTablaDeportistas.actualiza = function (deportista) {
    return Todo.sustituyeTagsCompletas(this.cuerpo, deportista)
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

Todo.mostrarDeportistasCompleto = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/todo/getTodosCompleto"
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

Todo.imprimeTodosDeportistas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector
    let msj = Todo.plantillaTablaDeportistas.cabecera
    // Compongo el contenido que se va a mostrar dentro de la tabla
    vector.forEach(e => msj += Todo.plantillaTablaDeportistas.actualiza(e))
    msj += Todo.plantillaTablaDeportistas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de los nombres de deportistas de todos los deportes", msj)
    return msj
}

Todo.imprimeNombreTodosDeportistasOrdenados = function (vector) {
    vector.sort((a, b) => {
        if (a == b) {
          return 0;
        }
        if (a < b) {
          return -1;
        }
        return 1;
      });
    // console.log(vector) // Para comprobar lo que hay en vector
    let msj = Todo.plantillaTablaDeportistasSoloNombres.cabecera
    // Compongo el contenido que se va a mostrar dentro de la tabla
    vector.forEach(e => msj += Todo.plantillaTablaDeportistasSoloNombres.actualiza(e))
    msj += Todo.plantillaTablaDeportistasSoloNombres.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de los nombres de deportistas de todos los deportes ordenados", msj)
}

/**
 * Función principal para recuperar los nombres de los deportistas desde el MS y, posteriormente, imprimirlas.
 */
Todo.listarTodosNombres = function () {
    Todo.mostrarDeportistas(Todo.imprimeNombreTodosDeportistas);
}

/**
 * Función principal para recuperar los nombres de los deportistas desde el MS y, posteriormente, imprimirlas.
 */
 Todo.listarTodos = function () {
    Todo.mostrarDeportistasCompleto(Todo.imprimeTodosDeportistas);
}

Todo.listarOrdenados = function () {
    Todo.mostrarDeportistas(Todo.imprimeNombreTodosDeportistasOrdenados);
}

/**
 * Función para mostrar en pantalla el nombre y deporte de todas las personas que cumplen con el requisito de busqueda.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
 Todo.buscaPorNombre = function (vector, buscar) {
    let vectorBusqueda = []
    buscar = buscar || document.getElementById("form-busqueda").value.toLowerCase()
    for(let i = 0; i < vector.length; ++i){
        let nombre = vector[i][0].toLowerCase()
        if(nombre.includes(buscar)){
            vectorBusqueda.push(vector[i])
        }
    }

    let msj = Todo.plantillaTablaDeportistas.cabecera
    vectorBusqueda.forEach(e => msj += Todo.plantillaTablaDeportistas.actualiza(e))
    msj += Todo.plantillaTablaDeportistas.pie

    Frontend.Article.actualizar("Resultado de la Búsqueda", msj)
    return vectorBusqueda
}

Todo.buscarSubstring = function() {
    Todo.mostrarDeportistasCompleto(Todo.buscaPorNombre);
}