/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "SNOWBOARD Home"
const TITULO_ACERCA_DE = "SNOWBOARD Acerca de"

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

//Personas para probar los tests
let persona = {
    ref: {
        "@ref": {
            id: "214145321233"
        }
    },
    ts: 1680537333040000,
    data: {
        nombre: "Andreas",
        apellido: "Prommegger",
        fechaNacimiento: {
            dia: 10,
            mes: 11,
            año: 1980
        },
        pais: "Austria",
        partMundiales: [
            2003,
            2004,
            2006,
            2009,
            2015
        ],
        medallasOro: 3
    }
}

let otra = {
    ref: {
        "@ref": {
            id: "1244351234"
        }
    },
    ts: 1680537333040000,
    data: {
        nombre: "Andrew",
        apellido: "Prom",
        fechaNacimiento: {
            dia: 1,
            mes: 1,
            año: 1985
        },
        pais: "Austria",
        partMundiales: [
            2003,
            2004
        ],
        medallasOro: 2
    }
}

let vectorP = [
    persona, otra
]



// SPECS a probar

describe("SNOWBOARD.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            SNOWBOARD.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(SNOWBOARD.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            SNOWBOARD.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(SNOWBOARD.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            SNOWBOARD.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(SNOWBOARD.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            SNOWBOARD.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(SNOWBOARD.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            SNOWBOARD.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("SNOWBOARD.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            SNOWBOARD.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(SNOWBOARD.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            SNOWBOARD.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(SNOWBOARD.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            SNOWBOARD.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(SNOWBOARD.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            SNOWBOARD.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(SNOWBOARD.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            SNOWBOARD.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(SNOWBOARD.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            SNOWBOARD.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(SNOWBOARD.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            SNOWBOARD.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(SNOWBOARD.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            SNOWBOARD.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("SNOWBOARD.personaComoTabla: ", function () {
    let d = {
        ref: {
            "@ref": {
                id: "214145321233"
            }
        },
        ts: 1680537333040000,
        data: {
            nombre: "Andreas",
            apellido: "Prommegger",
            fechaNacimiento: {
                dia: 10,
                mes: 11,
                año: 1980
            },
            pais: "Austria",
            partMundiales: [
                2003,
                2004,
                2006,
                2009,
                2015
            ],
            medallasOro: 3
        }
    }

    it("debería devolver una fila de tabla con los datos de una persona",
        function () {
            let msj = SNOWBOARD.personaComoTabla(d)
            expect(msj.includes(d.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(d.data.nombre)).toBeTrue();
            expect(msj.includes(d.data.apellido)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(d.data.pais)).toBeTrue();
            expect(msj.includes(d.data.partMundiales)).toBeTrue();
            expect(msj.includes(d.data.medallasOro)).toBeTrue();
        });
})

describe("SNOWBOARD.sustituyeTags: ", function () {

    it("debería devolver una fila de tabla con los datos de una persona",
        function () {
            let msj = SNOWBOARD.personaComoTabla(persona)
            expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(persona.data.nombre)).toBeTrue();
            expect(msj.includes(persona.data.apellido)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(persona.data.pais)).toBeTrue();
            expect(msj.includes(persona.data.partMundiales)).toBeTrue();
            expect(msj.includes(persona.data.medallasOro)).toBeTrue();
        });
})

describe("SNOWBOARD.plantillaTablaPersonas.actualiza: ", function () {
    let d = {
        ref: {
            "@ref": {
                id: "214145321233"
            }
        },
        ts: 1680537333040000,
        data: {
            nombre: "Andreas",
            apellido: "Prommegger",
            fechaNacimiento: {
                dia: 10,
                mes: 11,
                año: 1980
            },
            pais: "Austria",
            partMundiales: [
                2003,
                2004,
                2006,
                2009,
                2015
            ],
            medallasOro: 3
        }
    }

    it("debería devolver una fila de tabla con los datos de una persona",
        function () {
            let msj = SNOWBOARD.plantillaTablaPersonas.actualiza(d)
            expect(msj.includes(d.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(d.data.nombre)).toBeTrue();
            expect(msj.includes(d.data.apellido)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(d.data.pais)).toBeTrue();
            expect(msj.includes(d.data.partMundiales)).toBeTrue();
            expect(msj.includes(d.data.medallasOro)).toBeTrue();
        });
})

describe("SNOWBOARD.imprimeMuchasPersonas: ", function () {

    it("debería mostrar todas las personas del vector que se le pasa, almacenando en el vector SNOWBOARD.vectorPersonasID las IDs de cada persona",
        function () {
            SNOWBOARD.imprimeMuchasPersonas(vectorP)
            for (let i = 0; i < vectorP.length; i++){
                expect(vectorP[i].ref['@ref'].id == SNOWBOARD.vectorPersonasID[i]).toBeTrue();
            }
        });
})

describe("SNOWBOARD.anterior: ", function () {

    it("debería devolver el id correcto, o en su defecto el primer id",
        function () {
            SNOWBOARD.vectorPersonasID = [ "214145321233235", "21414567844321233", "214145321234233" ]
            expect(SNOWBOARD.anterior("214145321233235") == "214145321234233").toBeTrue();
            expect(SNOWBOARD.anterior("214145321234233") == "21414567844321233").toBeTrue();
            expect(SNOWBOARD.anterior("adsadasf") == "214145321234233").toBeTrue();
            expect(SNOWBOARD.anterior(0) == "214145321234233").toBeTrue();
        });
})

describe("SNOWBOARD.siguiente: ", function () {

    it("debería devolver el id correcto, o en su defecto el último id",
        function () {
            SNOWBOARD.vectorPersonasID = [ "214145321233235", "21414567844321233", "214145321234233" ]
            expect(SNOWBOARD.siguiente("214145321233235") == "21414567844321233").toBeTrue();
            expect(SNOWBOARD.siguiente("214145321234233") == "214145321233235").toBeTrue();
            expect(SNOWBOARD.siguiente("adsadasf") == "214145321233235").toBeTrue();
            expect(SNOWBOARD.siguiente(0) == "214145321233235").toBeTrue();
        });
})

describe("SNOWBOARD.almacenaDatos: ", function () {
    SNOWBOARD.almacenaDatos(persona)

    it("se debería haber almacenado correctamente la persona en la variable SNOWBOARD.personaMostrada",
        function () {
            expect(SNOWBOARD.personaMostrada == persona).toBeTrue();
            expect(SNOWBOARD.personaMostrada == otra).toBeFalse();
            expect(SNOWBOARD.personaMostrada == null).toBeFalse();
        });
})

describe("SNOWBOARD.recuperaDatosAlmacenados: ", function () {
    SNOWBOARD.personaMostrada = persona

    it("debe devolver la persona que se hay almacenada (p)",
        function () {
            expect(SNOWBOARD.recuperaDatosAlmacenados() == persona).toBeTrue();
            expect(SNOWBOARD.recuperaDatosAlmacenados() == otra).toBeFalse();
            expect(SNOWBOARD.recuperaDatosAlmacenados() == null).toBeFalse();
        });
})

describe("SNOWBOARD.plantillaFormularioPersona.actualiza: ", function () {

    it("debería devolver una fila de tabla con los datos de una persona, utilizando la función de SNOWBOARD.plantillaFormularioPersona",
        function () {
            let msj = SNOWBOARD.plantillaFormularioPersona.actualiza(persona)
            expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(persona.data.nombre)).toBeTrue();
            expect(msj.includes(persona.data.apellido)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(persona.data.pais)).toBeTrue();
            expect(msj.includes(persona.data.partMundiales)).toBeTrue();
            expect(msj.includes(persona.data.medallasOro)).toBeTrue();
        });
})

describe("SNOWBOARD.personaComoFormulario: ", function () {

    it("debería devolver una fila de tabla con los datos de una persona, utilizando la función de SNOWBOARD.personaComoFormulario",
        function () {
            let msj = SNOWBOARD.personaComoFormulario(persona)
            expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(persona.data.nombre)).toBeTrue();
            expect(msj.includes(persona.data.apellido)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(persona.data.pais)).toBeTrue();
            expect(msj.includes(persona.data.partMundiales)).toBeTrue();
            expect(msj.includes(persona.data.medallasOro)).toBeTrue();
        });
})

describe("SNOWBOARD.imprimeUnaPersona: ", function () {

    it("debería mostrar la persona que se le pasa como parámetro",
        function () {
            let msj = SNOWBOARD.imprimeUnaPersona(persona)
            expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(persona.data.nombre)).toBeTrue();
            expect(msj.includes(persona.data.apellido)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(persona.data.pais)).toBeTrue();
            expect(msj.includes(persona.data.partMundiales)).toBeTrue();
            expect(msj.includes(persona.data.medallasOro)).toBeTrue();
        });
})

describe("SNOWBOARD.ordenarPor: ", function () {
    
    it("debería ordenar el vector SNOWBOARD.vectorPersonas según el parámetro pasado y posteriormente mostrar la lista de personas",
        function () {
            expect(SNOWBOARD.ordenarPor("ID")).toBeTrue();
            expect(SNOWBOARD.ordenarPor("nombre")).toBeTrue();
            expect(SNOWBOARD.ordenarPor("apellido")).toBeTrue();
            expect(SNOWBOARD.ordenarPor("pais")).toBeTrue();
            expect(SNOWBOARD.ordenarPor("fechaNacimiento")).toBeTrue();
            expect(SNOWBOARD.ordenarPor("partMundiales")).toBeTrue();
            expect(SNOWBOARD.ordenarPor("medallasOro")).toBeTrue();
            expect(SNOWBOARD.ordenarPor("Nada")).toBeFalse();
        });
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
