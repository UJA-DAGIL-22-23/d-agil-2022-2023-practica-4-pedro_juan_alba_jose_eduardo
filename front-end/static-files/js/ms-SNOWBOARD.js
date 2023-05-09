/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

 "use strict";

 /// Creo el espacio de nombres
 let SNOWBOARD = {};
 
 SNOWBOARD.anteriorID = "";
 SNOWBOARD.siguienteID = "";
 
 /// Vector con las SNOWBOARD obtenidas de la base de datos
 SNOWBOARD.vectorPersonas = [];
 
 /// Vector con las IDs de las SNOWBOARD obtenidas de la base de datos
 SNOWBOARD.vectorPersonasID = [];

 // Plantilla de datosDescargados vacíos
 SNOWBOARD.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS SNOWBOARD al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
 SNOWBOARD.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio SNOWBOARD
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS SNOWBOARD
 */
 SNOWBOARD.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("SNOWBOARD Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS SNOWBOARD
 */
 SNOWBOARD.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("SNOWBOARD Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
 SNOWBOARD.procesarHome = function () {
    this.descargarRuta("/snowboard/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
 SNOWBOARD.procesarAcercaDe = function () {
    this.descargarRuta("/snowboard/acercade", this.mostrarAcercaDe);
}

 
 // Tags que voy a usar para sustituir los campos
 SNOWBOARD.plantillaTags = {
     "ID": "### ID ###",
     "NOMBRE": "### NOMBRE ###",
     "APELLIDO": "### APELLIDO ###",
     "FECHA DE ACIMIENTO": "### FECHA DE ACIMIENTO ###",
     "PAÍS": "### PAÍS ###",
     "PARTICIPACIONES MUNDIALES": "### PARTICIPACIONES MUNDIALES ###",
     "MEDALLAS DE ORO": "### MEDALLAS DE ORO ###",
     "ANTERIOR": "### ANTERIOR ###",
     "SIGUIENTE": "### SIGUIENTE ###"
 }
 
 /// Plantilla para poner los datos de varias SNOWBOARD dentro de una tabla
 SNOWBOARD.plantillaTablaPersonas = {}
 
 
 // Cabecera de la tabla
 SNOWBOARD.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                 <thead>
                     <th width="10%" aria-sort="ascending"><a href="javascript:SNOWBOARD.ordenarPor('ID')">ID<span aria-hidden="true"></span></a></th>
                     <th width="10%"><a href="javascript:SNOWBOARD.ordenarPor('nombre')">Nombre<span aria-hidden="true"></span></a></th>
                     <th width="20%"><a href="javascript:SNOWBOARD.ordenarPor('apellido')">Apellido<span aria-hidden="true"></span></a></th>
                     <th width="10%"><a href="javascript:SNOWBOARD.ordenarPor('fechaNacimiento')">Fecha de nacimiento<span aria-hidden="true"></span></a></th>
                     <th width="10%"><a href="javascript:SNOWBOARD.ordenarPor('pais')">País<span aria-hidden="true"></span></a></th>
                     <th width="15%"><a href="javascript:SNOWBOARD.ordenarPor('partMundiales')">Participaciones mundiales<span aria-hidden="true"></span></a></th>
                     <th width="10%"><a href="javascript:SNOWBOARD.ordenarPor('medallasOro')">Medallas de oro<span aria-hidden="true"></span></a></th>
                     <th></th>
                 </thead>
                 <tbody>
 `;
 
 // Elemento TR que muestra los datos de una persona
 SNOWBOARD.plantillaTablaPersonas.cuerpo = `
 <tr title="${SNOWBOARD.plantillaTags.ID}">
     <td>${SNOWBOARD.plantillaTags.ID}</td>
     <td>${SNOWBOARD.plantillaTags.NOMBRE}</td>
     <td>${SNOWBOARD.plantillaTags.APELLIDO}</td>
     <td>${SNOWBOARD.plantillaTags["FECHA DE ACIMIENTO"]}</td>
     <td>${SNOWBOARD.plantillaTags.PAÍS}</td>
     <td>${SNOWBOARD.plantillaTags["PARTICIPACIONES MUNDIALES"]}</td>
     <td>${SNOWBOARD.plantillaTags["MEDALLAS DE ORO"]}</td>
     <td>
         <div>
             <a href="javascript:SNOWBOARD.mostrar('${SNOWBOARD.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a>
         </div>
     </td>
 </tr>
 `;
 
 // Pie de la tabla
 SNOWBOARD.plantillaTablaPersonas.pie = `        </tbody>
              </table>
              `;
 
 SNOWBOARD.plantillaParaUnaPersona = function () {
     SNOWBOARD.plantillaTablaPersonas.cuerpo = `
     <tr title="${SNOWBOARD.plantillaTags.ID}">
         <td>${SNOWBOARD.plantillaTags.ID}</td>
         <td>${SNOWBOARD.plantillaTags.NOMBRE}</td>
         <td>${SNOWBOARD.plantillaTags.APELLIDO}</td>
         <td>${SNOWBOARD.plantillaTags["FECHA DE ACIMIENTO"]}</td>
         <td>${SNOWBOARD.plantillaTags.PAÍS}</td>
         <td>${SNOWBOARD.plantillaTags["PARTICIPACIONES MUNDIALES"]}</td>
         <td>${SNOWBOARD.plantillaTags["MEDALLAS DE ORO"]}</td>
         <td>
             <div>
                 <a href="javascript:SNOWBOARD.mostrar('${SNOWBOARD.anteriorID}')" class="opcion-secundaria mostrar">Anterior</a>
             </div>
         </td>
         <td>
             <div>
                 <a href="javascript:SNOWBOARD.mostrar('${SNOWBOARD.siguienteID}')" class="opcion-secundaria mostrar">Siguiente</a>
             </div>
         </td>
     </tr>
     `;
 }
 
 SNOWBOARD.plantaillaParaVariasPersonas = function () {
     SNOWBOARD.plantillaTablaPersonas.cuerpo = `
     <tr title="${SNOWBOARD.plantillaTags.ID}">
         <td>${SNOWBOARD.plantillaTags.ID}</td>
         <td>${SNOWBOARD.plantillaTags.NOMBRE}</td>
         <td>${SNOWBOARD.plantillaTags.APELLIDO}</td>
         <td>${SNOWBOARD.plantillaTags["FECHA DE ACIMIENTO"]}</td>
         <td>${SNOWBOARD.plantillaTags.PAÍS}</td>
         <td>${SNOWBOARD.plantillaTags["PARTICIPACIONES MUNDIALES"]}</td>
         <td>${SNOWBOARD.plantillaTags["MEDALLAS DE ORO"]}</td>
         <td>
             <div>
                 <a href="javascript:SNOWBOARD.mostrar('${SNOWBOARD.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a>
             </div>
         </td>
     </tr>
     `;
 }
 
 SNOWBOARD.form = {
     NOMBRE: "form-persona-nombre",
     APELLIDO: "form-persona-apellido",
     PAÍS: "form-persona-pais",
     ["MEDALLAS DE ORO"]: "form-persona-medallas"
 }
 
 //Persona que se muestra actualmente
 SNOWBOARD.personaMostrada = null
 
 /// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
 SNOWBOARD.plantillaFormularioPersona = {}
 
 // Cabecera del formulario
 SNOWBOARD.plantillaFormularioPersona.formulario = `
 <form method='post' action=''>
     <table width="100%" class="listado-personas">
         <thead>
             <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Apellido</th><th width="10%">Fecha de nacimiento</th>
             <th width="15%">País</th><th width="25%">Participaciones mundiales</th><th width="10%">Medallas de oro</th>
         </thead>
         <tbody>
             <tr title="${SNOWBOARD.plantillaTags.ID}">
                 <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                         value="${SNOWBOARD.plantillaTags.ID}" 
                         name="id_persona"/>
                 </td>
                 <td><input type="text" class="form-persona-elemento editable" disabled
                         id="form-persona-nombre" required value="${SNOWBOARD.plantillaTags.NOMBRE}" 
                         name="nombre_persona"/>
                 </td>
                 <td><input type="text" class="form-persona-elemento editable" disabled
                         id="form-persona-apellido" value="${SNOWBOARD.plantillaTags.APELLIDO}" 
                         name="apellido_persona"/>
                 </td>
                 <td><input type="text" class="form-persona-elemento" disabled
                         id="form-persona-fechaN" value="${SNOWBOARD.plantillaTags["FECHA DE ACIMIENTO"]}" 
                         name="fechaN_persona"/>
                 </td>
                 <td><input type="text" class="form-persona-elemento editable" disabled
                         id="form-persona-pais" required value="${SNOWBOARD.plantillaTags.PAÍS}" 
                         name="pais_persona"/>
                 </td>
                 <td><input type="text" class="form-persona-elemento" disabled
                         id="form-persona-participaciones" required value="${SNOWBOARD.plantillaTags["PARTICIPACIONES MUNDIALES"]}" 
                         name="participaciones_persona"/>
                 </td>
                 <td><input type="number" class="form-persona-elemento editable" disabled
                         id="form-persona-medallas" max="20" required value="${SNOWBOARD.plantillaTags["MEDALLAS DE ORO"]}" 
                         name="medallas_persona"/>
                 </td>
             </tr>
         </tbody>
     </table>
 </form>
 <table width="100%" class="listado-personas">
     <tr>
         <td></td>
         <td>
             <div>
                 <a href="javascript:SNOWBOARD.mostrar('${SNOWBOARD.plantillaTags.ANTERIOR}')" class="opcion-secundaria mostrar">Anterior</a>
             </div>
         </td>
         <td>
             <div><a href="javascript:SNOWBOARD.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
         </td>
         <td>
             <div><a href="javascript:SNOWBOARD.editar()" class="opcion-secundaria mostrar">Editar</a></div>
         </td>
         <td>
             <div><a href="javascript:SNOWBOARD.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
         </td>
         <td>
             <div>
                 <a href="javascript:SNOWBOARD.mostrar('${SNOWBOARD.plantillaTags.SIGUIENTE}')" class="opcion-secundaria mostrar">Siguiente</a>
             </div>
         </td>
         <td></td>
     </tr>
 </table>
 `;
 
 /**
  * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
  * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
  * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
  * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
  */           
  SNOWBOARD.sustituyeTags = function (plantilla, persona) {
     return plantilla
         .replace(new RegExp(SNOWBOARD.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
         .replace(new RegExp(SNOWBOARD.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
         .replace(new RegExp(SNOWBOARD.plantillaTags.APELLIDO, 'g'), persona.data.apellido)
         .replace(new RegExp(SNOWBOARD.plantillaTags["FECHA DE ACIMIENTO"], 'g'), persona.data.fechaNacimiento.dia + "/" + persona.data.fechaNacimiento.mes + "/" + persona.data.fechaNacimiento.año)
         .replace(new RegExp(SNOWBOARD.plantillaTags.PAÍS, 'g'), persona.data.pais)
         .replace(new RegExp(SNOWBOARD.plantillaTags["PARTICIPACIONES MUNDIALES"], 'g'), persona.data.partMundiales)
         .replace(new RegExp(SNOWBOARD.plantillaTags["MEDALLAS DE ORO"], 'g'), persona.data.medallasOro)
         .replace(new RegExp(SNOWBOARD.plantillaTags.ANTERIOR, 'g'), SNOWBOARD.anteriorID)
         .replace(new RegExp(SNOWBOARD.plantillaTags.SIGUIENTE, 'g'), SNOWBOARD.siguienteID)
 }
              
 /**
  * Función que recuperar todas las SNOWBOARD llamando al MS SNOWBOARD
  * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
  */
 SNOWBOARD.recupera = async function (callBackFn) {
     let response = null
 
     // Intento conectar con el microservicio SNOWBOARD
     try {
         const url = Frontend.API_GATEWAY + "/snowboard/getTodas"
         response = await fetch(url)
 
     } catch (error) {
         alert("Error: No se han podido acceder al API Gateway")
         console.error(error)
         //throw error
     }
 
     // Muestro todas las SNOWBOARD que se han descargado
     let vectorPersonas = null
     if (response) {
         vectorPersonas = await response.json()
         SNOWBOARD.vectorPersonas = vectorPersonas.data
         callBackFn(vectorPersonas.data)
     }
 }
 
 /**
  * Función que recuperar todas las SNOWBOARD llamando al MS SNOWBOARD. 
  * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
  * @param {String} idPersona Identificador de la persona a mostrar
  * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
  */
  SNOWBOARD.recuperaUnaPersona = async function (idPersona, callBackFn) {
     try {
         const url = Frontend.API_GATEWAY + "/snowboard/getPorId/" + idPersona
         const response = await fetch(url);
         if (response) {
             const persona = await response.json()
             callBackFn(persona)
         }
     } catch (error) {
         alert("Error: No se han podido acceder al API Gateway")
         console.error(error)
     }
 }
 
 /**
  * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
  * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
  * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
  */
 SNOWBOARD.plantillaTablaPersonas.actualiza = function (persona) {
     return SNOWBOARD.sustituyeTags(this.cuerpo, persona)
 }
 
 /**
  * Actualiza el formulario con los datos de la persona que se le pasa
  * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
  * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
  */
 SNOWBOARD.plantillaFormularioPersona.actualiza = function (persona) {
     return SNOWBOARD.sustituyeTags(this.formulario, persona)
 }
 
 /**
  * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
  * @param {persona} Persona Objeto con los datos de la persona
  * @returns Una cadena con la tabla que tiene ya los datos actualizados
  */
 SNOWBOARD.personaComoFormulario = function (persona) {
     return SNOWBOARD.plantillaFormularioPersona.actualiza(persona);
 }
 
 /**
  * Función para mostrar en pantalla todas las SNOWBOARD que se han recuperado de la BBDD.
  * @param {Vector_de_SNOWBOARD} vector Vector con los datos de las SNOWBOARD a mostrar
  */
  SNOWBOARD.imprimeMuchasPersonas = function (vector) {
     SNOWBOARD.plantaillaParaVariasPersonas();
 
     // Compongo el contenido que se va a mostrar dentro de la tabla
     let msj = SNOWBOARD.plantillaTablaPersonas.cabecera
     SNOWBOARD.vectorPersonasID = []
     vector.forEach(p => SNOWBOARD.vectorPersonasID.push(p.ref['@ref'].id))
     vector.forEach(e => msj += SNOWBOARD.plantillaTablaPersonas.actualiza(e))
     msj += SNOWBOARD.plantillaTablaPersonas.pie
 
     // Borro toda la info de Article y la sustituyo por la que me interesa
     Frontend.Article.actualizar("Listado de SNOWBOARD", msj)
 }
 
 /**
  * Imprime los datos de una persona como una tabla usando la plantilla del formulario.
  * @param {persona} Persona Objeto con los datos de la persona
  * @returns Una cadena con la tabla que tiene ya los datos actualizados
  */
  SNOWBOARD.personaComoTabla = function (persona) {
     return SNOWBOARD.plantillaTablaPersonas.cabecera
         + SNOWBOARD.plantillaTablaPersonas.actualiza(persona)
         + SNOWBOARD.plantillaTablaPersonas.pie;
 }
 
 /**
  * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
  * @param {persona} persona Datos de la persona a mostrar
  */
  SNOWBOARD.imprimeUnaPersona = function (persona) {
     SNOWBOARD.anteriorID = SNOWBOARD.anterior(persona.ref['@ref'].id)
     SNOWBOARD.siguienteID = SNOWBOARD.siguiente(persona.ref['@ref'].id)
     
     //SNOWBOARD.plantillaParaUnaPersona();
     let msj = SNOWBOARD.personaComoFormulario(persona);
 
     // Borro toda la info de Article y la sustituyo por la que me interesa
     Frontend.Article.actualizar("Mostrar una persona", msj)
 
     SNOWBOARD.almacenaDatos(persona)
     return msj
 }
 
 /**
  * Función principal para recuperar las SNOWBOARD desde el MS y, posteriormente, imprimirlas.
  */
  SNOWBOARD.listar = function () {
     SNOWBOARD.recupera(SNOWBOARD.imprimeMuchasPersonas);
 }
 
 /**
  * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
  * @param {String} idPersona Identificador de la persona a mostrar
  */
  SNOWBOARD.mostrar = function (idPersona) {
     this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
 }
 
 /**
  * Función para actualizar la variable que almacena el ID de la persona anterior a la actual
  */
 SNOWBOARD.anterior = function (idPersona) {
     if (SNOWBOARD.vectorPersonasID.length == 0)
         return "No hay Personas"
     for (let i = 1; i < SNOWBOARD.vectorPersonasID.length; i++){
         if (SNOWBOARD.vectorPersonasID[i] == idPersona){
             return SNOWBOARD.vectorPersonasID[i - 1]
         }
     } 
     return SNOWBOARD.vectorPersonasID[SNOWBOARD.vectorPersonasID.length - 1];
 }
 
 /**
  * Función para actualizar la variable que almacena el ID de la persona siguiente a la actual
  */
  SNOWBOARD.siguiente = function (idPersona) {
     if (SNOWBOARD.vectorPersonasID.length == 0)
         return "No hay Personas"
     for (let i = 0; i < SNOWBOARD.vectorPersonasID.length - 1; i++){
         if (SNOWBOARD.vectorPersonasID[i] == idPersona){
             return SNOWBOARD.vectorPersonasID[i + 1]
         }
     }
     return SNOWBOARD.vectorPersonasID[0];
 }
 
 /**
  * Almacena los datos de la persona que se está mostrando
  * @param {Persona} persona Datos de la persona a almacenar
  */
  SNOWBOARD.almacenaDatos = function (persona) {
     SNOWBOARD.personaMostrada = persona;
 }
 
 /**
  * Recupera los valores almacenados de la persona que se estaba mostrando
  * @return Datos de la persona a almacenada
  */
  SNOWBOARD.recuperaDatosAlmacenados = function () {
     return this.personaMostrada;
 }
 
 /**
  * Establece disable = habilitando en los campos editables
  * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
  * @returns El propio objeto SNOWBOARD, para concatenar llamadas
  */
  SNOWBOARD.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
     deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
     for (let campo in SNOWBOARD.form) {
         document.getElementById(SNOWBOARD.form[campo]).disabled = deshabilitando
     }
     return this
 }
 
 /**
  * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
  * @returns El propio objeto SNOWBOARD, para concatenar llamadas
  */
  SNOWBOARD.opcionesMostrarOcultar = function (classname, mostrando) {
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
  * Función que permite modificar los datos de una persona
  */
  SNOWBOARD.editar = function () {
     SNOWBOARD.opcionesMostrarOcultar("opcion-secundaria", false)
     SNOWBOARD.opcionesMostrarOcultar("opcion-terciaria editar", true)
     SNOWBOARD.habilitarDeshabilitarCamposEditables(false)
 }
 
 /**
  * Función que permite cancelar la acción sobre los datos de una persona
  */
 SNOWBOARD.cancelar = function () {
     SNOWBOARD.imprimeUnaPersona(SNOWBOARD.recuperaDatosAlmacenados())
     SNOWBOARD.habilitarDeshabilitarCamposEditables(true)
     SNOWBOARD.opcionesMostrarOcultar("opcion-terciaria editar", false)
     SNOWBOARD.opcionesMostrarOcultar("opcion-secundaria", true)
 }
 
 /**
  * Función para guardar los nuevos datos de una persona
  */
 SNOWBOARD.guardar = async function () {
     try {
         let url = Frontend.API_GATEWAY + "/snowboard/setTodo/"
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
                 "id": id_persona,
                 "nombre": document.getElementById("form-persona-nombre").value,
                 "apellido": document.getElementById("form-persona-apellido").value,
                 "pais": document.getElementById("form-persona-pais").value,
                 "medallasOro": document.getElementById("form-persona-medallas").value,
             }), // body data type must match "Content-Type" header
         })
         SNOWBOARD.mostrar(id_persona)
     } catch (error) {
         alert("Error: No se han podido acceder al API Gateway " + error)
     }
 }
 
 SNOWBOARD.ordenarPor = function (param) {
     let aux;
 
     switch (param) {
         case "ID":
             for (let i = 0; i < SNOWBOARD.vectorPersonas.length; i++){
                 for (let j = i; j < SNOWBOARD.vectorPersonas.length - 1; j++){
                     if (SNOWBOARD.vectorPersonas[i].ref['@ref'].id < SNOWBOARD.vectorPersonas[j + 1].ref['@ref'].id){
                         aux = SNOWBOARD.vectorPersonas[i]
                         SNOWBOARD.vectorPersonas[i] = SNOWBOARD.vectorPersonas[j + 1]
                         SNOWBOARD.vectorPersonas[j + 1] = aux
                     }
                 }
             }
             break;
         case "nombre":
             for (let i = 0; i < SNOWBOARD.vectorPersonas.length; i++){
                 for (let j = i; j < SNOWBOARD.vectorPersonas.length - 1; j++){
                     if (SNOWBOARD.vectorPersonas[i].data.nombre > SNOWBOARD.vectorPersonas[j + 1].data.nombre){
                         aux = SNOWBOARD.vectorPersonas[i]
                         SNOWBOARD.vectorPersonas[i] = SNOWBOARD.vectorPersonas[j + 1]
                         SNOWBOARD.vectorPersonas[j + 1] = aux
                     }
                 }
             }
             break;
         case "apellido":
             for (let i = 0; i < SNOWBOARD.vectorPersonas.length; i++){
                 for (let j = i; j < SNOWBOARD.vectorPersonas.length - 1; j++){
                     if (SNOWBOARD.vectorPersonas[i].data.apellido > SNOWBOARD.vectorPersonas[j + 1].data.apellido){
                         aux = SNOWBOARD.vectorPersonas[i]
                         SNOWBOARD.vectorPersonas[i] = SNOWBOARD.vectorPersonas[j + 1]
                         SNOWBOARD.vectorPersonas[j + 1] = aux
                     }
                 }
             }
             break;
         case "pais":
             for (let i = 0; i < SNOWBOARD.vectorPersonas.length; i++){
                 for (let j = i; j < SNOWBOARD.vectorPersonas.length - 1; j++){
                     if (SNOWBOARD.vectorPersonas[i].data.pais > SNOWBOARD.vectorPersonas[j + 1].data.pais){
                         aux = SNOWBOARD.vectorPersonas[i]
                         SNOWBOARD.vectorPersonas[i] = SNOWBOARD.vectorPersonas[j + 1]
                         SNOWBOARD.vectorPersonas[j + 1] = aux
                     }
                 }
             }
             break;
         case "medallasOro":
             for (let i = 0; i < SNOWBOARD.vectorPersonas.length; i++){
                 for (let j = i; j < SNOWBOARD.vectorPersonas.length - 1; j++){
                     if (SNOWBOARD.vectorPersonas[i].data.medallasOro < SNOWBOARD.vectorPersonas[j + 1].data.medallasOro){
                         aux = SNOWBOARD.vectorPersonas[i]
                         SNOWBOARD.vectorPersonas[i] = SNOWBOARD.vectorPersonas[j + 1]
                         SNOWBOARD.vectorPersonas[j + 1] = aux
                     }
                 }
             }
             break;
         case "fechaNacimiento":
             for (let i = 0; i < SNOWBOARD.vectorPersonas.length; i++){
                 for (let j = i; j < SNOWBOARD.vectorPersonas.length - 1; j++){
                     if (SNOWBOARD.vectorPersonas[i].data.fechaNacimiento.año > SNOWBOARD.vectorPersonas[j + 1].data.fechaNacimiento.año){
                         aux = SNOWBOARD.vectorPersonas[i]
                                 SNOWBOARD.vectorPersonas[i] = SNOWBOARD.vectorPersonas[j + 1]
                                 SNOWBOARD.vectorPersonas[j + 1] = aux
                     } else if (SNOWBOARD.vectorPersonas[i].data.fechaNacimiento.año == SNOWBOARD.vectorPersonas[j + 1].data.fechaNacimiento.año){
                         if (SNOWBOARD.vectorPersonas[i].data.fechaNacimiento.mes > SNOWBOARD.vectorPersonas[j + 1].data.fechaNacimiento.mes){
                             aux = SNOWBOARD.vectorPersonas[i]
                                 SNOWBOARD.vectorPersonas[i] = SNOWBOARD.vectorPersonas[j + 1]
                                 SNOWBOARD.vectorPersonas[j + 1] = aux
                         } else if (SNOWBOARD.vectorPersonas[i].data.fechaNacimiento.mes == SNOWBOARD.vectorPersonas[j + 1].data.fechaNacimiento.mes){
                             if ((SNOWBOARD.vectorPersonas[i].data.fechaNacimiento.dia > SNOWBOARD.vectorPersonas[j + 1].data.fechaNacimiento.dia)){
                                 aux = SNOWBOARD.vectorPersonas[i]
                                 SNOWBOARD.vectorPersonas[i] = SNOWBOARD.vectorPersonas[j + 1]
                                 SNOWBOARD.vectorPersonas[j + 1] = aux
                             }
                         }
                     }
                 }
             }
             break;
         case "partMundiales":
             for (let i = 0; i < SNOWBOARD.vectorPersonas.length; i++){
                 for (let j = i; j < SNOWBOARD.vectorPersonas.length - 1; j++){
                     if (SNOWBOARD.vectorPersonas[i].data.partMundiales.length < SNOWBOARD.vectorPersonas[j + 1].data.partMundiales.length){
                         aux = SNOWBOARD.vectorPersonas[i]
                         SNOWBOARD.vectorPersonas[i] = SNOWBOARD.vectorPersonas[j + 1]
                         SNOWBOARD.vectorPersonas[j + 1] = aux
                     }
                 }
             }
             break;
         default:
             return false;
     }
 
     SNOWBOARD.imprimeMuchasPersonas(SNOWBOARD.vectorPersonas)
     return true
 }