/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const kayakTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const kayakContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_KAYAK = "Kayak Home"
const TITULO_ACERCA_DE_KAYAK = "Kayak Acerca de"

const datosDescargadosPruebaKayak = {
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

describe("Kayak.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Kayak.mostrarHome()
            expect(kayakTitulo.innerHTML).toBe(TITULO_HOME_KAYAK)
            expect(kayakContenido.innerHTML).toBe(Kayak.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Kayak.mostrarHome(23)
            expect(kayakTitulo.innerHTML).toBe(TITULO_HOME_KAYAK)
            expect(kayakContenido.innerHTML).toBe(Kayak.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Kayak.mostrarHome({})
            expect(kayakTitulo.innerHTML).toBe(TITULO_HOME_KAYAK)
            expect(kayakContenido.innerHTML).toBe(Kayak.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Kayak.mostrarHome({ foo: "bar" })
            expect(kayakTitulo.innerHTML).toBe(TITULO_HOME_KAYAK)
            expect(kayakContenido.innerHTML).toBe(Kayak.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Kayak.mostrarHome(datosDescargadosPruebaKayak)
            expect(kayakTitulo.innerHTML).toBe(TITULO_HOME_KAYAK)
            expect(kayakContenido.innerHTML).toBe(datosDescargadosPruebaKayak.mensaje)
        })
})


describe("Kayak.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Kayak.mostrarAcercaDe()
            expect(kayakTitulo.innerHTML).toBe(TITULO_ACERCA_DE_KAYAK)
            expect(kayakContenido.innerHTML.search(Kayak.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Kayak.mostrarAcercaDe(23)
            expect(kayakTitulo.innerHTML).toBe(TITULO_ACERCA_DE_KAYAK)
            expect(kayakContenido.innerHTML.search(Kayak.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Kayak.mostrarAcercaDe({})
            expect(kayakTitulo.innerHTML).toBe(TITULO_ACERCA_DE_KAYAK)
            expect(kayakContenido.innerHTML.search(Kayak.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Kayak.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(kayakTitulo.innerHTML).toBe(TITULO_ACERCA_DE_KAYAK)
            expect(kayakContenido.innerHTML.search(Kayak.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Kayak.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(kayakTitulo.innerHTML).toBe(TITULO_ACERCA_DE_KAYAK)
            expect(kayakContenido.innerHTML.search(Kayak.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Kayak.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(kayakTitulo.innerHTML).toBe(TITULO_ACERCA_DE_KAYAK)
            expect(kayakContenido.innerHTML.search(Kayak.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Kayak.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(kayakTitulo.innerHTML).toBe(TITULO_ACERCA_DE_KAYAK)
            expect(kayakContenido.innerHTML.search(Kayak.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Kayak.mostrarAcercaDe(datosDescargadosPruebaKayak)
            expect(kayakTitulo.innerHTML).toBe(TITULO_ACERCA_DE_KAYAK)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(kayakContenido.innerHTML.search(datosDescargadosPruebaKayak.autor) >= 0).toBeTrue()
            expect(kayakContenido.innerHTML.search(datosDescargadosPruebaKayak.email) >= 0).toBeTrue()
            expect(kayakContenido.innerHTML.search(datosDescargadosPruebaKayak.fecha) >= 0).toBeTrue()
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */