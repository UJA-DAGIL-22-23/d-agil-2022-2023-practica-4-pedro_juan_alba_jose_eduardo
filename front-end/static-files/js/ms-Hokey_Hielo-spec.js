/**
 * @file ms-Hokey_Hielo-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const HokeyTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const HokeyContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_HOKEY = "Hokey_Hielo Home"
const TITULO_ACERCA_DE_HOKEY = "Hokey_Hielo Acerca de"




const datosDescargadosPruebaHokey = {
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
