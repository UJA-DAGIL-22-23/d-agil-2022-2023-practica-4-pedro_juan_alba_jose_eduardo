/**
 * @file ms-TODO-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS TODO en el front-end
 * @author Juan Llavero Company <jlc00052@red.ujaen.es>
 * @date 16-05-2023
 */

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
