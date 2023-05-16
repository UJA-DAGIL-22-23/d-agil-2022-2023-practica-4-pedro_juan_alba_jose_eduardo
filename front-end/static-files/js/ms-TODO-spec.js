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
