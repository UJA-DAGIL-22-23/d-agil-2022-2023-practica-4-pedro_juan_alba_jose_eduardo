/**
 * @file ms-Hokey_Hielo-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Hokey_Hielo Home"
const TITULO_ACERCA_DE = "Hokey_Hielo Acerca de"
const Titulo_mostrar_persona="Mostrar una persona"



const datosDescargadosPrueba = {
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

let prueba={


    datos_personales:[
        {
           ref: {
                "@ref": {
                    id: "362608688750395597"
                }
            },
            data: {
                nombre: "hola",
                apellidos: "mundo",
                fecha: {año: 2021, mes: 2, dia: 3},
                posicion: "profesor",
                años_jugados_NHL: [2017, 2018]

            }
        },
        {
            ref: {
                "@ref": {
                    id: "362608960790855885"
                }
            },
            data: {
                nombre: "hola2",
                apellidos: "mundo2",
                fecha: {año: 2022, mes: 4, dia: 22},
                posicion: "profesor2",
                años_jugados_NHL: [2016, 2017]

            }
        },

    ]
}







// SPECS a probar

describe("Hokey_Hielo.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Hokey_Hielo.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Hokey_Hielo.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Hokey_Hielo.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Hokey_Hielo.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Hokey_Hielo.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Hokey_Hielo.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Hokey_Hielo.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Hokey_Hielo.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Hokey_Hielo.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Hokey_Hielo.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Hokey_Hielo.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hokey_Hielo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Hokey_Hielo.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hokey_Hielo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Hokey_Hielo.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hokey_Hielo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Hokey_Hielo.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hokey_Hielo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Hokey_Hielo.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hokey_Hielo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Hokey_Hielo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hokey_Hielo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Hokey_Hielo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hokey_Hielo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Hokey_Hielo.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })






})

describe("Test de la función personaComoTabla", function() {
    let persona = {
        ref: {
            "@ref": {
                id: "362608688750395597"
            }
        },
        data: {
            nombre: "hola",
            apellidos: "mundo",
            fecha: {año: 2021, mes: 2, dia: 3},
            posicion: "profesor",
            años_jugados_NHL: [2017, 2018]
        }
    };

    it("debe devolver una cadena de texto", function() {
        expect(typeof Hokey_Hielo.personaComoTabla(persona)).toEqual("string");
    });




    it("debe incluir los datos de la persona en la tabla", function() {
        let tabla = Hokey_Hielo.personaComoTabla(persona);
        expect(tabla).toContain("<td>" + persona.data.nombre + "</td>");
        expect(tabla).toContain("<td>" + persona.data.apellidos + "</td>");
        expect(tabla).toContain("<td>" + persona.data.fecha.año + "</td>");
        expect(tabla).toContain("<td>" + persona.data.posicion + "</td>");
        expect(tabla).toContain("<td>" + persona.data.años_jugados_NHL.join(", ") + "</td>");
    });
});




describe('Hokey_Hielo.imprimeMuchasPersonas', function() {
    it('debería llamar a Frontend.Article.actualizar con los datos correctos', function() {
        // Mock de datos
        const vector = prueba.datos_personales;

        // Mock de la función Frontend.Article.actualizar
        spyOn(Frontend.Article, 'actualizar');

        // Llamada a la función
        Hokey_Hielo.imprimeMuchasPersonas(vector);

        // Expect
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de personas', jasmine.any(String));
    });
});





describe("obtenerIdAnterior", function() {


    beforeEach(function() {
        Hokey_Hielo.datosMostrados = prueba.datos_personales;
    });

    it("devuelve el id anterior correctamente cuando hay elementos en el array", function() {
        let idActual = Hokey_Hielo.datosMostrados[1];
        Hokey_Hielo.obtenerIdAnterior(idActual);
        expect(Hokey_Hielo.idAnterior).toEqual("362608688750395597");
    });

    it("devuelve el último id cuando el idActual es el primero del array", function() {
        let idActual = Hokey_Hielo.datosMostrados[0];
        Hokey_Hielo.obtenerIdAnterior(idActual);
        expect(Hokey_Hielo.idAnterior).toEqual("362608960790855885");
    });


});



describe("obtenerIdSiguiente", function() {
    beforeEach(function() {
        Hokey_Hielo.datosMostrados = prueba.datos_personales;
    });

    it("devuelve el id siguiente correctamente cuando hay elementos en el array", function() {
        let idActual = Hokey_Hielo.datosMostrados[0];
        Hokey_Hielo.obtenerIdSiguiente(idActual);
        expect(Hokey_Hielo.idSiguiente).toEqual("362608960790855885");
    });

    it("devuelve el primer id cuando el idActual es el último del array", function() {
        let idActual = Hokey_Hielo.datosMostrados[1];
        Hokey_Hielo.obtenerIdSiguiente(idActual);
        expect(Hokey_Hielo.idSiguiente).toEqual("362608688750395597");
    });

});

describe("almacenaDatos", function() {
    it("asigna la persona correctamente", function() {
        let persona = prueba.datos_personales[0];
        Hokey_Hielo.almacenaDatos(persona);
        expect(Hokey_Hielo.personaMostrada).toEqual(persona);
    });
});





describe("recuperaDatosAlmacenados", function() {
    it("devuelve el valor almacenado en personaMostrada", function() {

        Hokey_Hielo.personaMostrada = prueba.datos_personales[0];
        expect(Hokey_Hielo.recuperaDatosAlmacenados()).toEqual(prueba.datos_personales[0]);
    });
});

describe("Hokey_Hielo.sustituyeTags", function() {
    it("debería reemplazar correctamente las etiquetas de la plantilla con los datos de la persona", function() {
        // Arrange
        var Hokey_Hielo = "ID: {{ID}}, Nombre: {{NOMBRE}}, Apellidos: {{APELLIDOS}}, Año de contratación: {{Año de contratacion}}, Posición: {{Posicion}}, Años jugados en NHL: {{ NHL }}";
        var persona = {
            ref: {
                "@ref": {
                    id: "1234567890"
                }
            },
            data: {
                nombre: "Juan",
                apellidos: "Pérez",
                fecha: {
                    año: 2021,
                    mes: 4,
                    dia: 24
                },
                posicion: "Delantero",
                años_jugados_NHL: [2018, 2019, 2020]
            }
        };
        var resultadoEsperado = "ID: 1234567890, Nombre: Juan, Apellidos: Pérez, Año de contratación: undefined, Posición: Delantero, Años jugados en NHL: 2018,2019,2020";

        // Act
        var resultadoObtenido = Hokey_Hielo.sustituyeTags(Hokey_Hielo, persona);

        // Assert
        expect(resultadoEsperado).toEqual(resultadoEsperado);
    });
});











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
