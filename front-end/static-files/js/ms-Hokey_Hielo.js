/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */





"use strict";




/// Creo el espacio de nombres
let Hokey_Hielo = {};

// Plantilla de datosDescargados vacíos
Hokey_Hielo.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    posicion: "",
    fecha: ""
}




/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Hokey_Hielo.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error:Plantilla.descargarRuta: No se han podido acceder al API Gateway")
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
Hokey_Hielo.mostrarHome = function (datosDescargados) {
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
Hokey_Hielo.mostrarAcercaDe = function (datosDescargados) {
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
Hokey_Hielo.procesarHome = function () {
    this.descargarRuta("/hokey/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Hokey_Hielo.procesarAcercaDe = function () {
    this.descargarRuta("/hokey/acercade", this.mostrarAcercaDe);
}

/// Nombre de los campos del formulario para editar una persona
Hokey_Hielo.form = {
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
    POSICION: "form-persona-posicion",
    ANIO: "form-persona-anio",
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Hokey_Hielo.personaMostrada = null

//Tags que voy a usar para sustituir los campos
Hokey_Hielo.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "Año de contratacion": "### AÑO CONTRATACION ###",
    "Posicion": "### Posicion ###",
    " NHL": "###  NHL ###",
}

Hokey_Hielo.datosMostrados = {}



/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Hokey_Hielo.plantillaFormularioPersona = {}

// Cabecera del formulario
Hokey_Hielo.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="10%">Posicion</th>
            <th width="15%">Año contratación</th><th width="25%">Acciones</th>
        </thead>
        <tbody>
            <tr title="${Hokey_Hielo.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled 
                id="form-persona-id"  value="${Hokey_Hielo.plantillaTags.ID}" 
                name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                id="form-persona-nombre" required value="${Hokey_Hielo.plantillaTags.NOMBRE}" 
                name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                id="form-persona-apellidos" value="${Hokey_Hielo.plantillaTags.APELLIDOS}" 
                name="apellidos_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                id="form-persona-posicion" required value="${Hokey_Hielo.plantillaTags.Posicion}" 
                name="posicion-persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                id="form-persona-anio" min="1950" max="2030" size="8" required
                value="${Hokey_Hielo.plantillaTags["Año de contratacion"]}" 
                name="año_contratacion_persona"/></td>
        <td>
                <div><a href="javascript:Hokey_Hielo.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                <div><a href="javascript:Hokey_Hielo.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                <div><a href="javascript:Hokey_Hielo.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
        </td>
        <td>
            <div><a href="javascript:Hokey_Hielo.mostrar(Hokey_Hielo.idAnterior)" class="opcion-secundaria mostrar">Anterior</a></div>
            <div><a href="javascript:Hokey_Hielo.mostrar(Hokey_Hielo.idSiguiente)" class="opcion-secundaria mostrar">Siguiente</a></div>
        </td>
    </tr>

        </tbody>
    </table>
</form>
`;

// Agrega la clase 'alto-contraste-formulario' al formulario
Hokey_Hielo.plantillaFormularioPersona.formulario = Hokey_Hielo.plantillaFormularioPersona.formulario.replace('<form', '<form class="alto-contraste-formulario"');





/// Plantilla para poner los datos de varias personas dentro de una tabla
Hokey_Hielo.plantillaTablaPersonas = {};



// Cabecera de la tabla
Hokey_Hielo.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
    <thead>
        <tr>
            <th width="10%">Id</th>
            <th width="30%">Nombre completo</th>
            <th width="20%">Año de contratación</th>
            <th width="20%">Posición</th>
            <th width="30%">Años de participacion de la NHL</th>
        </tr>
    </thead>
    <tbody>
`;


// Elemento TR que muestra los datos de una persona
Hokey_Hielo.plantillaTablaPersonas.cuerpo = `
    <tr title="${Hokey_Hielo.plantillaTags.ID}">
        <td>${Hokey_Hielo.plantillaTags.ID}</td>
        <td>${Hokey_Hielo.plantillaTags.NOMBRE} ${Hokey_Hielo.plantillaTags.APELLIDOS}</td>
        <td>${Hokey_Hielo.plantillaTags["Año de contratacion"]}</td>
        <td>${Hokey_Hielo.plantillaTags.Posicion}</td>
        <td>${Hokey_Hielo.plantillaTags[" NHL"]}</td>
        <td>
           
            <div><a href="javascript:Hokey_Hielo.mostrar('${Hokey_Hielo.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
            
</div>
        </td>
    </tr>
`;


// Pie de la tabla
Hokey_Hielo.plantillaTablaPersonas.pie = `
    </tbody>
    </table>
`;





Hokey_Hielo.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Hokey_Hielo.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Hokey_Hielo.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Hokey_Hielo.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Hokey_Hielo.plantillaTags["Año de contratacion"], 'g'), persona.data.fecha.anio)
        .replace(new RegExp(Hokey_Hielo.plantillaTags.Posicion, 'g'), persona.data.posicion)
        .replace(new RegExp(Hokey_Hielo.plantillaTags[" NHL"], 'g'), persona.data.anios_jugados_NHL)
}



/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Hokey_Hielo.plantillaTablaPersonas.actualiza = function (persona) {
    return Hokey_Hielo.sustituyeTags(this.cuerpo, persona)
}

/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Hokey_Hielo.plantillaFormularioPersona.actualiza = function (persona) {
    return Hokey_Hielo.sustituyeTags(this.formulario, persona)
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Hokey_Hielo.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/hokey/getTodas"
        console.log("URL", url)
        response = await fetch(url)

    } catch (error) {
        alert("Error:recupera: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        Hokey_Hielo.datosMostrados= vectorPersonas.data
        //console.log("DatosMostrados",Plantilla.datosMostrados)
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función que recuperar todas las personas llamando al MS Personas.
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Hokey_Hielo.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {

        const url = Frontend.API_GATEWAY + "/hokey/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error:recupera una persona: No se han podido acceder al API Gateway")
        console.error(error)
    }
}


/**
 * Imprime los datos de una persona como una tabla usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Hokey_Hielo.personaComoTabla = function (persona) {
    return Hokey_Hielo.plantillaTablaPersonas.cabecera
        + Hokey_Hielo.plantillaTablaPersonas.actualiza(persona)
        + Hokey_Hielo.plantillaTablaPersonas.pie;
}


/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Hokey_Hielo.personaComoFormulario = function (persona) {
    return Hokey_Hielo.plantillaFormularioPersona.actualiza( persona );
}


/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Hokey_Hielo.imprimeMuchasPersonas = function (vector) {
     console.log("expect Imprime muchas personas",vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Hokey_Hielo.plantillaTablaPersonas.cabecera
        vector.forEach(e => msj += Hokey_Hielo.plantillaTablaPersonas.actualiza(e))

    msj += Hokey_Hielo.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa

    Frontend.Article.actualizar("Listado de personas", msj)


}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Hokey_Hielo.imprimeUnaPersona = function (persona) {


    console.log("expect", persona);
    // Llamo a las funciones obtenerIdAnterior y obtenerIdSiguiente para actualizar las variables de ID
    Hokey_Hielo.obtenerIdAnterior(persona);
    Hokey_Hielo.obtenerIdSiguiente(persona);

    let msj = Hokey_Hielo.personaComoTabla(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj);

    // Actualiza el objeto que guarda los datos mostrados
    Hokey_Hielo.almacenaDatos(persona);

    // Actualiza la información mostrada en la plantilla
    msj = Hokey_Hielo.personaComoFormulario(persona);
    Frontend.Article.actualizar("Mostrar una persona", msj);

    // Agrega la clase 'alto-contraste' al cuerpo del documento
    document.body.classList.add('alto-contraste');
};



Hokey_Hielo.obtenerIdAnterior =  function (idActual) {
    let idAnterior
    for(let i=0; i<Hokey_Hielo.datosMostrados.length; i++){
        if(Hokey_Hielo.datosMostrados[i].ref['@ref'].id === idActual.ref['@ref'].id){
            if(i === 0){
                idAnterior = Hokey_Hielo.datosMostrados[Hokey_Hielo.datosMostrados.length-1]
            }else{
                idAnterior = Hokey_Hielo.datosMostrados[i-1]
            }
        }
    }
    // Actualizo la variable que almacena el ID anterior
    console.log("anterior",idAnterior)
    Hokey_Hielo.idAnterior=idAnterior.ref['@ref'].id;


}

Hokey_Hielo.obtenerIdSiguiente = function (idActual) {
    let idSiguiente
    for(let i=0; i<Hokey_Hielo.datosMostrados.length; i++){
        if(Hokey_Hielo.datosMostrados[i].ref['@ref'].id === idActual.ref['@ref'].id){
            if(i === Hokey_Hielo.datosMostrados.length-1){
                idSiguiente = Hokey_Hielo.datosMostrados[0]
            }else{
                idSiguiente = Hokey_Hielo.datosMostrados[i+1]
            }
        }
    }


    // Actualizo la variable que almacena el ID anterior
    console.log("siguiente",idSiguiente)
    Hokey_Hielo.idSiguiente=idSiguiente.ref['@ref'].id;



}



/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Hokey_Hielo.almacenaDatos = function (persona) {
    Hokey_Hielo.personaMostrada = persona;
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */

Hokey_Hielo.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Hokey_Hielo.listar = function () {
    Hokey_Hielo.recupera(Hokey_Hielo.imprimeMuchasPersonas);
}


/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
Hokey_Hielo.mostrar = function (idPersona) {
    console.log('Mostrar: ', idPersona)
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}





/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Hokey_Hielo.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Hokey_Hielo.form) {
        document.getElementById(Hokey_Hielo.form[campo]).disabled = deshabilitando
    }
    return this
}


/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Hokey_Hielo.deshabilitarCamposEditables = function () {
    Hokey_Hielo.habilitarDeshabilitarCamposEditables(true)
    return this
}


/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Hokey_Hielo.habilitarCamposEditables = function () {
    Hokey_Hielo.habilitarDeshabilitarCamposEditables(false)
    return this
}


/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Hokey_Hielo.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Hokey_Hielo.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}


/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Hokey_Hielo.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Hokey_Hielo.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}


/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Hokey_Hielo.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}


/**
 * Función que permite modificar los datos de una persona
 */
Hokey_Hielo.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
Hokey_Hielo.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}



/**
 * Función para guardar los nuevos datos de una persona
 */
Hokey_Hielo.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/hokey/setTodo/"
        let id_persona = document.getElementById("form-persona-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_persona": id_persona,
                "nombre_persona": document.getElementById("form-persona-nombre").value,
                "apellidos_persona": document.getElementById("form-persona-apellidos").value,
                "posicion_persona": document.getElementById("form-persona-posicion").value,
                "año_entrada_persona": document.getElementById("form-persona-anio").value



            }), // body data type must match "Content-Type" header
        })
        /*
        Error: "No procesa bien la respuesta devuelta"
        if (response) {
            const persona = await response.json()
            alert(persona)
        }

         */

        Hokey_Hielo.mostrar(id_persona)
    } catch (error) {
        alert("Error,Plantilla.guardar: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}


















