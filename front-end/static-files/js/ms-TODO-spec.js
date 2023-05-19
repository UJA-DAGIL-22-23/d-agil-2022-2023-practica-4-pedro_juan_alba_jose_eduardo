/**
 * @file ms-TODO-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS TODO en el front-end
 * @author Juan Llavero Company <jlc00052@red.ujaen.es>
 * @date 16-05-2023
 */

// Constantes para usar en las pruebas
const todoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const todoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_Todo = "Todo Home"
const TITULO_ACERCA_DE_Todo = "Todo Acerca de"

const datosDescargadosPruebaTodo = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

// SPECS a probar

describe("Todo.plantillaTablaDeportistas.actualiza: ", function () {
    let deportista1 = ["Juan", "Karate"]
    it("debería devolver una fila de tabla con el nombre y deporte de una persona",
        function () {
            let m = Todo.plantillaTablaDeportistas.actualiza(deportista1)
            expect(m.includes(deportista1[0])).toBeTrue();
            expect(m.includes(deportista1[1])).toBeTrue();
        });
})

describe("Todo.imprimeTodosDeportistas: ", function () {
    let vectorDeportistas = [
        ["Juan", "Karate"], ["Antonio", "Snowboard"]
    ]
    it("debería mostrar todas las personas del vector que se le pasa",
        function () {
            let m = Todo.imprimeTodosDeportistas(vectorDeportistas)
            expect(m.includes(vectorDeportistas[0][0])).toBeTrue();
            expect(m.includes(vectorDeportistas[0][1])).toBeTrue();
            expect(m.includes(vectorDeportistas[1][0])).toBeTrue();
            expect(m.includes(vectorDeportistas[1][1])).toBeTrue();
        });
})

describe("Todo.plantillaTablaDeportistasSoloNombres.actualiza: ", function () {
    let deportistaPrueba = "Prueba"
    it("debería devolver solamente el nombre de las personas",
        function () {
            let m = Todo.plantillaTablaDeportistasSoloNombres.actualiza(deportistaPrueba)
            expect(m.includes(deportistaPrueba)).toBeTrue();
        });
})

describe("Todo.sustituyeTags: ", function () {
    let nombrePrueba = "Nombre"
    it("Sustituye correctamente el nombre por el declarado",
        function () {
            let m = Todo.sustituyeTags(cuerpo, nombrePrueba)
            expect(m.includes(nombrePrueba)).toBeTrue();
        });
})

describe("Todo.imprimeNombreTodosDeportistas: ", function () {
    let vectorPrueba = ["Nombre1", "Nombre2"]
    it("Muestra correctamente los nombres del vector",
        function () {
            let m = Todo.imprimeNombreTodosDeportistas(vectorPrueba)
            expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPrueba[0])).toBeTrue()
            expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPrueba[1])).toBeTrue()
        });
    })


describe("Todo.imprimeNombreTodosDeportistasOrdenados: ", function () {
    let Nombres  =["Paco", "Julián"]
    it("Ordena correctamente los nombres del vector",
        function (){
            Todo.imprimeNombreTodosDeportistasOrdenados(Nombres)
            expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML.includes("Listado de los nombres de deportistas de todos los deportes ordenados")).toBeTrue()
            expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(Nombres[0])).toBeTrue()
            expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(Nombres[1])).toBeTrue()
        });
})

describe("Todo.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Todo.mostrarAcercaDe()
            expect(todoTitulo.innerHTML).toBe(TITULO_ACERCA_DE_Todo)
            expect(todoContenido.innerHTML.search(Todo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Todo.mostrarAcercaDe(23)
            expect(todoTitulo.innerHTML).toBe(TITULO_ACERCA_DE_Todo)
            expect(todoContenido.innerHTML.search(Todo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Todo.mostrarAcercaDe({})
            expect(todoTitulo.innerHTML).toBe(TITULO_ACERCA_DE_Todo)
            expect(todoContenido.innerHTML.search(Todo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Todo.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(todoTitulo.innerHTML).toBe(TITULO_ACERCA_DE_Todo)
            expect(todoContenido.innerHTML.search(Todo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Todo.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(todoTitulo.innerHTML).toBe(TITULO_ACERCA_DE_Todo)
            expect(todoContenido.innerHTML.search(Todo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Todo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(todoTitulo.innerHTML).toBe(TITULO_ACERCA_DE_Todo)
            expect(todoContenido.innerHTML.search(Todo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Todo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(todoTitulo.innerHTML).toBe(TITULO_ACERCA_DE_Todo)
            expect(todoContenido.innerHTML.search(Todo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Todo.mostrarAcercaDe(datosDescargadosPruebaTodo)
            expect(todoTitulo.innerHTML).toBe(TITULO_ACERCA_DE_Todo)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(todoContenido.innerHTML.search(datosDescargadosPruebaTodo.autor) >= 0).toBeTrue()
            expect(todoContenido.innerHTML.search(datosDescargadosPruebaTodo.email) >= 0).toBeTrue()
            expect(todoContenido.innerHTML.search(datosDescargadosPruebaTodo.fecha) >= 0).toBeTrue()
        })
})