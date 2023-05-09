/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

Plantilla.plantillaTags = {
    "NOMBRE": "### NOMBRE ###",
    "APELLIDO": "### APELLIDO ###",
    "FECHANACIMIENTO": "### FECHANACIMIENTO ###",
    "NVECESPREMIADO": "### NVECESPREMIADO ###",
    "AÑOSPARTICIPACION": "### AÑOSPARTICIPACION ###",
    "TIPOCOMPETICION": "### TIPOCOMPETICION ###"
}

/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
//Personas.plantillaFormularioPersona = {}
Plantilla.plantillaTablaPersonas = {}

// Cabecera de la tabla
Plantilla.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">Nombre</th>
                        <th width="20%">Apellido</th>
                        <th width="20%">fechaNacimiento</th>
                        <th width="10%">nVecesPremiado</th>
                        <th width="15%">añosParticipacion</th>
                        <th width="15%">tipoCompeticion</th>
                    </thead>
                    <tbody>
    `;
/*Personas.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="10%">eMail</th>
                        <th width="15%">Año contratación</th>
                        <th width="15%">Acciones</th>
                    </thead>
                    <tbody>
    `;*/

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo = `
    <tr title="${Personas.plantillaTags.NOMBRE}">
        <td>${Personas.plantillaTags.NOMBRE}</td>
        <td>${Personas.plantillaTags.APELLIDO}</td>
        <td>${Personas.plantillaTags.FECHANACIMIENTO}</td>
        <td>${Personas.plantillaTags.NVECESPREMIADO}</td>
        <td>${Personas.plantillaTags.AÑOSPARTICIPACION}</td>
        <td>${Personas.plantillaTags.TIPOCOMPETICION}</td>
        <td>
            <div><a href="javascript:Personas.mostrar('${Personas.plantillaTags.NOMBRE}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;
/*Personas.plantillaTablaPersonas.cuerpo = `
    <tr title="${Personas.plantillaTags.ID}">
        <td>${Personas.plantillaTags.ID}</td>
        <td>${Personas.plantillaTags.NOMBRE}</td>
        <td>${Personas.plantillaTags.APELLIDOS}</td>
        <td>${Personas.plantillaTags.EMAIL}</td>
        <td>${Personas.plantillaTags["AÑO ENTRADA"]}</td>
        <td>
                    <div><a href="javascript:Personas.mostrar('${Personas.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;*/

// Pie de la tabla
Plantilla.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Plantilla.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Personas.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Personas.plantillaTags.APELLIDO, 'g'), persona.data.apellido)
        .replace(new RegExp(Personas.plantillaTags.FECHANACIMIENTO, 'g'), persona.data.fechaNacimiento)
        .replace(new RegExp(Personas.plantillaTags.EMAIL, 'g'), persona.data.email)
        .replace(new RegExp(Personas.plantillaTags["AÑO ENTRADA"], 'g'), persona.data.año_entrada)
}

/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
    //this.descargarRuta("ksdf", this.mensajeAMostrar);
}




/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Personas.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/personas/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
Personas.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Personas.plantillaTablaPersonas.cabecera
    vector.forEach(e => msj += Personas.plantillaTablaPersonas.actualiza(e))
    msj += Personas.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Personas.listar = function () {
    Personas.recupera(Personas.imprimeMuchasPersonas);
}