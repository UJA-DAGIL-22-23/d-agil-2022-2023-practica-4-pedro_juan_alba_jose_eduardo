const fetch = require("node-fetch"); 

/// Dirección de todos los ms que se van a usar
const URL_MS_ALPINISMO = "http://localhost:8002";
const URL_MS_KARATE = "http://localhost:8003";
const URL_MS_SNOWBOARD= "http://localhost:8004";

/// Necesario para conectar a la BBDD
const faunadb = require('faunadb'),
    q = faunadb.query;


function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}

const CB_MODEL_SELECTS = {
 

/**
 * Método para obtener todos los proyectos de la BBDD y, además, las personas que hay en cada proyecto
 * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
 * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
 */
getTodosNombres: async (req, res) => {
    try {
        
        let url_alpinismo=URL_MS_ALPINISMO+"/getTodas"
        let url_karate=URL_MS_KARATE+"/getTodosDeportistas"
        let url_snowboard=URL_MS_SNOWBOARD+"/getTodas"

        let response_alpinismo = await fetch(url_alpinismo)
        let response_karate = await fetch(url_karate)
        let response_snowboard = await fetch(url_snowboard)

        let alpinismo = await response_alpinismo.json()
        let karate = await response_karate.json()
        let snowboard = await response_snowboard.json()

       
        let arrayKarate = []
        karate.data.forEach(e => {
            arrayKarate.push(e.data.nombre)
        });

        let arraySnowboard = []
        snowboard.data.forEach(e => {
            arraySnowboard.push(e.data.nombre)
        });

        let arrayAlpinismo = []
        alpinismo.data.forEach(e => {
            arrayAlpinismo.push(e.data.Nombre)
        });
        

        let resultado = arrayKarate.concat(arraySnowboard)
        resultado = resultado.concat(arrayAlpinismo)

       
        CORS(res)
            .status(200)
            .json(resultado)
    } catch (error) {
        CORS(res).status(500).json({ error: error.description+"\n ¡¡COMPRUEBE QUE LOS MS FUNCIONEN CORRECTAMENTE" })
    }
},

/**
 * Método para obtener todos los proyectos de la BBDD y, además, las personas que hay en cada proyecto
 * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
 * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
 */
 getTodos: async (req, res) => {
    try {
        
        let url_alpinismo=URL_MS_ALPINISMO+"/getTodas"
        let url_karate=URL_MS_KARATE+"/getTodosDeportistas"
        let url_snowboard=URL_MS_SNOWBOARD+"/getTodas"

        let response_alpinismo = await fetch(url_alpinismo)
        let response_karate = await fetch(url_karate)
        let response_snowboard = await fetch(url_snowboard)

        let alpinismo = await response_alpinismo.json()
        let karate = await response_karate.json()
        let snowboard = await response_snowboard.json()

       
        let arrayKarate = []
        karate.data.forEach(e => {
            arrayKarate.push([e.data.nombre, "Karate"])
        });

        let arraySnowboard = []
        snowboard.data.forEach(e => {
            arraySnowboard.push([e.data.nombre, "Snowboard"])
        });

        let arrayAlpinismo = []
        alpinismo.data.forEach(e => {
            arrayAlpinismo.push([e.data.Nombre, "Alpinismo"])
        });
        

        let resultado = arrayKarate.concat(arraySnowboard)
        resultado = resultado.concat(arrayAlpinismo)

       
        CORS(res)
            .status(200)
            .json(resultado)
    } catch (error) {
        CORS(res).status(500).json({ error: error.description+"\n ¡¡COMPRUEBE QUE LOS MS FUNCIONEN CORRECTAMENTE" })
    }
}
}



/**
* Callbacks adicionales. Fundamentalmente para comprobar que el ms funciona.
*/
const CB_OTHERS = {
    home: async (req, res) => {
        try {
            CORS(res).status(200).json({mensaje: "Microservicio Todo: home"});
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },
}

// Une todos los callbacks en un solo objeto.
// OJO: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
// el último que haya sobreescribe a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }
