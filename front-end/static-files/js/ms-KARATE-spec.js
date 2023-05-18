/**
 * @file ms-Hokey_Hielo-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Karate en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const tituloKarate = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoKarate = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_KARATE = "Karate Home"
const TITULO_ACERCA_DE_KARATE = "Karate Acerca de"

const datosDescargadosPruebaKarate = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Karate.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Karate.mostrarHome()
            expect(tituloKarate.innerHTML).toBe(TITULO_KARATE)
            expect(elementoKarate.innerHTML).toBe(Karate.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Karate.mostrarHome(23)
            expect(tituloKarate.innerHTML).toBe(TITULO_KARATE)
            expect(elementoKarate.innerHTML).toBe(Karate.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Karate.mostrarHome({})
            expect(tituloKarate.innerHTML).toBe(TITULO_KARATE)
            expect(elementoKarate.innerHTML).toBe(Karate.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Karate.mostrarHome({ foo: "bar" })
            expect(tituloKarate.innerHTML).toBe(TITULO_KARATE)
            expect(elementoKarate.innerHTML).toBe(Karate.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Karate.mostrarHome(datosDescargadosPruebaKarate)
            expect(tituloKarate.innerHTML).toBe(TITULO_KARATE)
            expect(elementoKarate.innerHTML).toBe(datosDescargadosPruebaKarate.mensaje)
        })
})


describe("Karate.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Karate.mostrarAcercaDe()
            expect(tituloKarate.innerHTML).toBe(TITULO_ACERCA_DE_KARATE)
            expect(elementoKarate.innerHTML.search(Karate.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Karate.mostrarAcercaDe(23)
            expect(tituloKarate.innerHTML).toBe(TITULO_ACERCA_DE_KARATE)
            expect(elementoKarate.innerHTML.search(Karate.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Karate.mostrarAcercaDe({})
            expect(tituloKarate.innerHTML).toBe(TITULO_ACERCA_DE_KARATE)
            expect(elementoKarate.innerHTML.search(Karate.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Karate.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(tituloKarate.innerHTML).toBe(TITULO_ACERCA_DE_KARATE)
            expect(elementoKarate.innerHTML.search(Karate.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Karate.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(tituloKarate.innerHTML).toBe(TITULO_ACERCA_DE_KARATE)
            expect(elementoKarate.innerHTML.search(Karate.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Karate.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(tituloKarate.innerHTML).toBe(TITULO_ACERCA_DE_KARATE)
            expect(elementoKarate.innerHTML.search(Karate.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Karate.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(tituloKarate.innerHTML).toBe(TITULO_ACERCA_DE_KARATE)
            expect(elementoKarate.innerHTML.search(Karate.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Karate.mostrarAcercaDe(datosDescargadosPruebaKarate)
            expect(tituloKarate.innerHTML).toBe(TITULO_ACERCA_DE_KARATE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoKarate.innerHTML.search(datosDescargadosPruebaKarate.autor) >= 0).toBeTrue()
            expect(elementoKarate.innerHTML.search(datosDescargadosPruebaKarate.email) >= 0).toBeTrue()
            expect(elementoKarate.innerHTML.search(datosDescargadosPruebaKarate.fecha) >= 0).toBeTrue()
        })
})


let deportista = {
    ref: {
        "@ref": {
            id: "ref persona 1"
        }
    },

    data: {
        nombre: "nombre prueba",
        apellidos: "apellidos prueba",
        fechaNacimiento: {
            dia: 2,
            mes: "mes",
            año: "año"
        },
        nacimiento: "nacimiento prueba",
        edad: 34,
        palmarésMundiales: [1111]
    }
}

let deportista2 = {
    ref: {
        "@ref": {
            id: "ref persona 2"
        }
    },

    data: {
        nombre: "nombre prueba2",
        apellidos: "apellidos prueba2",
        fechaNacimiento: {
            dia: 2,
            mes: "mes",
            año: "año"
        },
        nacimiento: "nacimiento prueba2",
        edad: 34,
        palmarésMundiales: [1111]
    }
}

let cuerpo = `
<tr title="${Karate.plantillaTags.ID}">
    <td>${Karate.plantillaTags.ID}</td>
    <td>${Karate.plantillaTags.NOMBRE}</td>
    <td>${Karate.plantillaTags.APELLIDOS}</td>
    <td>${Karate.plantillaTags.EDAD}</td>
    <td>${Karate.plantillaTags.NACIMIENTO}</td>
    <td>${Karate.plantillaTags.FECHA.DIA}/${Karate.plantillaTags.FECHA.MES}/${Karate.plantillaTags.FECHA.ANIO}</td>
    <td>${Karate.plantillaTags.PALMARES_MUNDIALES}</td>
    <td>
        <div><a href="javascript:Karate.mostrar('${Karate.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
    </td>
</tr>
`;

let formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="10%">Edad</th>
            <th width="15%">Año Nacimiento</th><th width="25%">Fecha</th><th width="25%">Palmarés Mundiales</th>
        </thead>
        <tbody>
            <tr title="${Karate.plantillaTags.ID}">
            <td>${Karate.plantillaTags.ID}</td>
            <td>${Karate.plantillaTags.NOMBRE}</td>
            <td>${Karate.plantillaTags.APELLIDOS}</td>
            <td>${Karate.plantillaTags.EDAD}</td>
            <td>${Karate.plantillaTags.NACIMIENTO}</td>
            <td>${Karate.plantillaTags.FECHA.DIA}/${Karate.plantillaTags.FECHA.MES}/${Karate.plantillaTags.FECHA.ANIO}</td>
            <td>${Karate.plantillaTags.PALMARES_MUNDIALES}</td>
            <td>
                <div><a href="javascript:Karate.eliminar('${Karate.plantillaTags.ID}')" class="opcion-secundaria mostrar">Eliminar</a></div>
                <div><a href="javascript:Karate.procesarHome()" class="opcion-secundaria mostrar">Volver a home</a></div>
                <div><a href="javascript:Karate.editarDeportista('${Karate.plantillaTags.ID}')" class="opcion-secundaria editar">Editar</a></div>
            </td>
        </tbody>
    </table>

    <div><a href="javascript:Karate.botonAnterior('${Karate.plantillaTags.ID}')" class="opcion-secundaria mostrar">Anterior</a></div>
    <div><a href="javascript:Karate.botonSiguiente('${Karate.plantillaTags.ID}')" class="opcion-secundaria mostrar">Siguiente</a></div>
    
</form>
`;




describe("Karate.sustituyeTags: ", function() {
    it("Muestra los datos al sustituir los valores con los datos creados",
        function () {
            let plantilla = Karate.sustituyeTags(cuerpo, deportista)

            expect(plantilla.includes(deportista.data.nombre)).toBeTrue();
            expect(plantilla.includes(deportista.data.apellidos)).toBeTrue();
            expect(plantilla.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
            expect(plantilla.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
            expect(plantilla.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
            expect(plantilla.includes(deportista.data.edad)).toBeTrue();
            expect(plantilla.includes(deportista.data.nacimiento)).toBeTrue();
            expect(plantilla.includes(deportista.data.palmarésMundiales)).toBeTrue();
            
        });
});

let vector = [deportista, deportista2]

describe("Karate.imprimeTodosDeportistas: ", function() {
    const tituloPrueba = "Listado de deportistas"

    it("Muestra los datos de varias personas de ejemplo creadas ",
    function (){
        
        Karate.imprimeTodosDeportistas(vector)

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.apellidos)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.edad)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.nacimiento)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.fechaNacimiento.dia)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.fechaNacimiento.mes)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.fechaNacimiento.año)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.palmarésMundiales)).toBeTrue()

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.apellidos)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.edad)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.nacimiento)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.fechaNacimiento.dia)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.fechaNacimiento.mes)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.fechaNacimiento.año)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.palmarésMundiales)).toBeTrue()
        
    });
});

describe("Karate.imprimeUnDeportista: ", function() {
    const tituloPrueba = "Mostrar una persona"

    it("Muestra los datos de varias personas de ejemplo creadas ",
    function (){
        //let plantilla = Karate.deportistaComoFormulario(deportista)
        Karate.imprimeUnDeportista(deportista)

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.nombre)).toBeTrue()
        
    });
});


describe("Karate.añadirNuevoDeportista: ", function() {
    const tituloPrueba = "Añadir un deportista"

    it("Muestra el formulario de añadir una persona ",
    function (){
        Karate.añadirNuevoDeportista()

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("nombre")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("apellidos")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("dia")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("mes")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("año")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("edad")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("nacimiento")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes("palmares")).toBeTrue()
        
    });
});

describe("Karate.imprimeUnDeportistEditar: ", function() {
    const tituloPrueba = "Editar una persona"

    it("Muestra el formulario con los datos de la persona a editar ",
    function (){
        Karate.imprimeUnDeportistaEditar(deportista)

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.apellidos)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.edad)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.nacimiento)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.fechaNacimiento.dia)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.fechaNacimiento.mes)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.fechaNacimiento.año)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(deportista.data.palmarésMundiales)).toBeTrue()
        
    });
});


describe("Karate.imprimeNombreTodosDeportistas: ", function() {
    const tituloPrueba = "Listado de los nombres de deportistas"

    it("Muestra correctamente los nombres de las personas",
    function (){
        Karate.imprimeNombreTodosDeportistas(vector)

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.nombre)).toBeTrue()
        
    });
});


describe("Karate.ordenarNombres: ", function() {
    const tituloPrueba = "Listado de los nombres de deportistas ordenados alfabéticamente"

    it("Muestra correctamente los nombres de las personas",
    function (){
        Karate.ordenarNombres(vector)

        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML).toBe(tituloPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[0].data.nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vector[1].data.nombre)).toBeTrue()
        
    });
});


describe("Karate.recuperaDatosAlmacenados y Karate.almacenaDatos: ", function() {
    
    it("Muestra los datos del deportista almacenado",
    function (){
        Karate.almacenaDatos(deportista)
        let resultado = Karate.recuperaDatosAlmacenados()
        
        expect(resultado.data.nombre == deportista.data.nombre).toBeTrue();
        expect(resultado.data.apellidos == deportista.data.apellidos).toBeTrue();
        
    });
});

describe("Karate.deportistaComoFormulario: ", function() {
    
    it("Actualiza correctamente los datos del deportista en el formulario",
    function (){
        let plantilla = Karate.deportistaComoFormulario(deportista)
        
        expect(plantilla.includes(deportista.data.nombre)).toBeTrue();
        expect(plantilla.includes(deportista.data.apellidos)).toBeTrue();
        expect(plantilla.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
        expect(plantilla.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
        expect(plantilla.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
        expect(plantilla.includes(deportista.data.edad)).toBeTrue();
        expect(plantilla.includes(deportista.data.nacimiento)).toBeTrue();
        expect(plantilla.includes(deportista.data.palmarésMundiales)).toBeTrue();
        
    });
});

describe("Karate.formularioEditar.actualiza: ", function() {
    
    it("Actualiza correctamente los datos del deportista en el formulario de editar",
    function (){
        let formulario = Karate.formularioEditar.actualiza(deportista)
        
        expect(formulario.includes(deportista.data.nombre)).toBeTrue();
        expect(formulario.includes(deportista.data.apellidos)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
        expect(formulario.includes(deportista.data.edad)).toBeTrue();
        expect(formulario.includes(deportista.data.nacimiento)).toBeTrue();
        expect(formulario.includes(deportista.data.palmarésMundiales)).toBeTrue();
        
    });
});


describe("Karate.deportistaComoFormularioEditar: ", function() {
    
    it("Actualiza correctamente los datos del deportista en el formulario de editar",
    function (){
        let formulario = Karate.deportistaComoFormularioEditar(deportista)
        
        expect(formulario.includes(deportista.data.nombre)).toBeTrue();
        expect(formulario.includes(deportista.data.apellidos)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
        expect(formulario.includes(deportista.data.edad)).toBeTrue();
        expect(formulario.includes(deportista.data.nacimiento)).toBeTrue();
        expect(formulario.includes(deportista.data.palmarésMundiales)).toBeTrue();
        
    });
});


describe("Karate.plantillaTablaDeportistasSoloNombres.actualiza: ", function() {
    
    it("Actualiza correctamente los nombres de los deportistas en la tabla",
    function (){
        let formulario = Karate.plantillaTablaDeportistasSoloNombres.actualiza(deportista)
        
        expect(formulario.includes(deportista.data.nombre)).toBeTrue();
        
    });
});

describe("Karate.plantillaTablaDeportistas.actualiza: ", function() {
    
    it("Actualiza correctamente los datos del deportista en la tabla",
    function (){
        let formulario = Karate.plantillaTablaDeportistas.actualiza(deportista)
        
        expect(formulario.includes(deportista.data.nombre)).toBeTrue();
        expect(formulario.includes(deportista.data.apellidos)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
        expect(formulario.includes(deportista.data.edad)).toBeTrue();
        expect(formulario.includes(deportista.data.nacimiento)).toBeTrue();
        expect(formulario.includes(deportista.data.palmarésMundiales)).toBeTrue();
        
    });
});

describe("Karate.plantillaFormularioDeportista.actualiza: ", function() {
    
    it("Actualiza correctamente los datos del deportista en el formulario",
    function (){
        let formulario = Karate.plantillaFormularioDeportista.actualiza(deportista)
        
        expect(formulario.includes(deportista.data.nombre)).toBeTrue();
        expect(formulario.includes(deportista.data.apellidos)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.dia)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.mes)).toBeTrue();
        expect(formulario.includes(deportista.data.fechaNacimiento.año)).toBeTrue();
        expect(formulario.includes(deportista.data.edad)).toBeTrue();
        expect(formulario.includes(deportista.data.nacimiento)).toBeTrue();
        expect(formulario.includes(deportista.data.palmarésMundiales)).toBeTrue();
        
    });
});


