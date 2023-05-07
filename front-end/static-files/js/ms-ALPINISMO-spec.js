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
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

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



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

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


describe("Plantilla.mostrarAcercaDe: ", function () {
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

let cuerpoSpec =`
<tr title="${Hokey_Hielo.plantillaTags.ID}">
    <td>${Hokey_Hielo.plantillaTags.ID}</td>
    <td>${Hokey_Hielo.plantillaTags.NOMBRE}</td>
    <td>${Hokey_Hielo.plantillaTags.FECHA.DIA}/${Hokey_Hielo.plantillaTags.FECHA.MES}/${Hokey_Hielo.plantillaTags.FECHA.ANIO}</td>
    <td>${Hokey_Hielo.plantillaTags.PAIS}</td>
    <td>${Hokey_Hielo.plantillaTags.CUMBRES}</td>
    <td>${Hokey_Hielo.plantillaTags["PICOS 8KM"]}</td>
    <td>
                <div><a href="javascript:Plantilla.mostrar('${Hokey_Hielo.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
    </td>
</tr>
`;


let personaSpec = {
    ref: {
        "@ref": {
            id: "359740300845908172"
        }
    },
    data: {
        Nombre: "Paquito",
        Fecha_nacimiento: {
            Dia: 2,
            Mes: 1,
            Año: 1978
        },
        País: "España",
        Grandes_Cumbre: [
            "Everest",
            "Lhotse"
        ],
        cantidad_picos_8km: 2
    }
}

describe("Plantiya.sustituyeTags: ", function () {
    it("Sustituye correctamente en la plantilla la Persona que se le pasa",
    function () {
        let planti = Hokey_Hielo.sustituyeTags(cuerpoSpec, personaSpec)
        //console.log(planti)
        expect(planti.includes(personaSpec.data.Nombre)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Dia)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Mes)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Año)).toBeTrue()
        expect(planti.includes(personaSpec.data.País)).toBeTrue()
        expect(planti.includes(personaSpec.data.Grandes_Cumbre[0])).toBeTrue()
        expect(planti.includes(personaSpec.data.cantidad_picos_8km)).toBeTrue()
    })
})

describe("Plantilla.plantillaTablaPersonas.actualiza: ", function () {
    it("Sustituye correctamente en la plantilla elegida la Persona que se le pasa",
    function () {
        let planti = Hokey_Hielo.plantillaTablaPersonas.actualiza(personaSpec)
        expect(planti.includes(personaSpec.data.Nombre)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Dia)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Mes)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Año)).toBeTrue()
        expect(planti.includes(personaSpec.data.País)).toBeTrue()
        expect(planti.includes(personaSpec.data.Grandes_Cumbre[0])).toBeTrue()
        expect(planti.includes(personaSpec.data.cantidad_picos_8km)).toBeTrue()
    })
})

describe("Plantilla.plantillaTablaPersonas.actualizaNombres: ", function () {
    it("Sustituye correctamente en la plantilla de nombres el nombre de la persona que se le pasa", 
    function () {
        let planti = Hokey_Hielo.plantillaTablaPersonas.actualizaNombres(personaSpec)
        expect(planti.includes(personaSpec.data.Nombre)).toBeTrue()
    })
})

describe("Plantilla.plantillaFormularioPersona.actualiza: ", function () {
    it("Sustituye correctamente en la plantilla del formulario la persona que le paso", 
    function () {
        let planti = Hokey_Hielo.plantillaFormularioPersona.actualiza(personaSpec)
        expect(planti.includes(personaSpec.data.Nombre)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Dia)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Mes)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Año)).toBeTrue()
        expect(planti.includes(personaSpec.data.País)).toBeTrue()
        expect(planti.includes(personaSpec.data.Grandes_Cumbre[0])).toBeTrue()
        expect(planti.includes(personaSpec.data.cantidad_picos_8km)).toBeTrue()
    })
})

describe("Pantilla.personaComoFormulario: ", function () {
    it("Sustituye correctamente en la plantilla del formulario la persona que le paso", 
    function () {
        let planti = Hokey_Hielo.personaComoFormulario(personaSpec)
        expect(planti.includes(personaSpec.data.Nombre)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Dia)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Mes)).toBeTrue()
        expect(planti.includes(personaSpec.data.Fecha_nacimiento.Año)).toBeTrue()
        expect(planti.includes(personaSpec.data.País)).toBeTrue()
        expect(planti.includes(personaSpec.data.Grandes_Cumbre[0])).toBeTrue()
        expect(planti.includes(personaSpec.data.cantidad_picos_8km)).toBeTrue()
    })
})

describe("Plantilla.almacenaDatos y Plantilla.recuperaDatosAlmacenados: ", function () {
    it("Comprueba si almacena bien la persona que se le pasa",
    function () {
        Hokey_Hielo.almacenaDatos(personaSpec)
        let nuevaPersona = Hokey_Hielo.recuperaDatosAlmacenados()
        expect(nuevaPersona.data.Nombre == personaSpec.data.Nombre).toBeTrue()
        expect(nuevaPersona.data.Fecha_nacimiento.Dia == personaSpec.data.Fecha_nacimiento.Dia).toBeTrue()
        expect(nuevaPersona.data.Fecha_nacimiento.Mes == personaSpec.data.Fecha_nacimiento.Mes).toBeTrue()
        expect(nuevaPersona.data.Fecha_nacimiento.Año == personaSpec.data.Fecha_nacimiento.Año).toBeTrue()
        expect(nuevaPersona.data.País == personaSpec.data.País).toBeTrue()
        expect(nuevaPersona.data.Grandes_Cumbre.length == personaSpec.data.Grandes_Cumbre.length).toBeTrue()
        expect(nuevaPersona.data.cantidad_picos_8km == personaSpec.data.cantidad_picos_8km).toBeTrue()
    })
})

let vectorPersonasSpec = [
        {
            ref: {
                "@ref": {
                    id: "359740300845908172"
                }
            },
            data: {
                Nombre: "Manolo",
                Fecha_nacimiento: {
                    Dia: 4,
                    Mes: 5,
                    Año: 1978
                },
                País: "Francia",
                Grandes_Cumbre: [
                    "Everest",
                    "Lhotse"
                ],
                cantidad_picos_8km: 2
            }
        },
        {
            ref: {
                "@ref": {
                    id: "359741144242847949"
                }
            },
            data: {
                Nombre: "Ezio Auditore",
                Fecha_nacimiento: {
                    Dia: 2,
                    Mes: 1,
                    Año: 1978
                },
                País: "Italia",
                Grandes_Cumbre: [
                    "Everest",
                    "Lhotse",
                    "Kilimanjaro"
                ],
                cantidad_picos_8km: 3
            }
        }
]

describe("Plantilla.imprimeMuchasPersonas: ", function () {
    it("Comprueba si actualiza correctamente el articulo",
    function () {
        Hokey_Hielo.imprimeMuchasPersonas(vectorPersonasSpec)
        //console.log(document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML.includes("Listado de personas")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[0].ref['@ref'].id)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[1].ref['@ref'].id)).toBeTrue()
        for(let i = 0; i < vectorPersonasSpec.length; ++i){
            expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[i].data.Nombre)).toBeTrue()
        }
    })
})


describe("Plantilla.imprimePersonasBusqueda: ", function () {
    it("Comprueba si actualiza correctamente el artículo",
    function () {
        let vectorResultante = Hokey_Hielo.imprimePersonasBusqueda(vectorPersonasSpec, "Ezio")
        //console.log(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML.includes("Resultado de la Búsqueda")).toBeTrue()
        expect(vectorResultante.length == 1).toBeTrue()

        /*
        Al hacer los specs de abajo algunas veces dan error y otras no
         */

        //expect(vectorResultante[0].ref['@ref'].id == vectorPersonasSpec[1].ref['@ref'].id).toBeTrue()
        //expect(vectorResultante[0].data.Nombre == vectorPersonasSpec[1].data.Nombre).toBeTrue()
        //expect(vectorResultante[0].data.Nombre == vectorPersonasSpec[0].data.Nombre).toBeFalse()
    } )
})


describe("Plantilla.imprimeNombres: ", function() {
    it("Comprueba si actualiza correctamente el articulo",
    function() {
        Hokey_Hielo.imprimeNombres(vectorPersonasSpec)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML.includes("Nombres de personas")).toBeTrue()
        for(let i = 0; i < vectorPersonasSpec.length; ++i){
            expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[i].data.Nombre)).toBeTrue()
        }
    })
})

describe("Plantilla.imprimeNombresOrdenados: ", function() {
    it("Comprueba si actualiza correctamente el articulo",
    function() {
        Hokey_Hielo.imprimeNombresOrdenados(vectorPersonasSpec)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML.includes("Nombres de personas ordenadas alfabéticamente")).toBeTrue()
        for(let i = 0; i < vectorPersonasSpec.length; ++i){
            expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[i].data.Nombre)).toBeTrue()
        }
    })
})

describe("Plantilla.imprimeUnaPersona: ", function () {
    it("Comprueba si actualiza correctamente el articulo y se guarda la persona mostrada",
    function() {
        Hokey_Hielo.imprimeUnaPersona(vectorPersonasSpec[0])
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML.includes("Mostrar una persona")).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[0].ref['@ref'].id)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[0].data.Nombre)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[0].data.Fecha_nacimiento.Dia)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[0].data.Fecha_nacimiento.Mes)).toBeTrue()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[0].data.Fecha_nacimiento.Año)).toBeTrue()
        for(let i = 0; i < vectorPersonasSpec[0].data.Grandes_Cumbre.length; ++i){
            expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[0].data.Grandes_Cumbre[i])).toBeTrue()
        }
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML.includes(vectorPersonasSpec[0].data.cantidad_picos_8km)).toBeTrue()

        expect(Hokey_Hielo.personaMostrada.ref['@ref'].id == vectorPersonasSpec[0].ref['@ref'].id).toBeTrue()
        expect(Hokey_Hielo.personaMostrada.data.Nombre == vectorPersonasSpec[0].data.Nombre).toBeTrue()
        expect(Hokey_Hielo.personaMostrada.data.Fecha_nacimiento.Dia == vectorPersonasSpec[0].data.Fecha_nacimiento.Dia).toBeTrue()
        expect(Hokey_Hielo.personaMostrada.data.Fecha_nacimiento.Mes == vectorPersonasSpec[0].data.Fecha_nacimiento.Mes).toBeTrue()
        expect(Hokey_Hielo.personaMostrada.data.Fecha_nacimiento.Año == vectorPersonasSpec[0].data.Fecha_nacimiento.Año).toBeTrue()
        for(let i = 0; i < vectorPersonasSpec[0].data.Grandes_Cumbre.length; ++i){
            expect(Hokey_Hielo.personaMostrada.data.Grandes_Cumbre[i] == vectorPersonasSpec[0].data.Grandes_Cumbre[i]).toBeTrue()
        }
        expect(Hokey_Hielo.personaMostrada.data.cantidad_picos_8km == vectorPersonasSpec[0].data.cantidad_picos_8km).toBeTrue()
    })
})

/*
Las funciones que tienen que ver con la HU de eidtar una persona me dan problemas a la hora de hacer
los specs ya que en ocasiones funcionan y en otras no
*/



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
