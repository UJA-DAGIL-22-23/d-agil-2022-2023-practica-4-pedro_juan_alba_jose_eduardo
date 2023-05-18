/**
 * @file proxy-routes.js
 * @description Objeto que almacena las rutas que deben ser consideradas por el proxy.
 * Cualquier URL que empiece por /personas es derivada al ms de personas; igual para /proyectos, etc.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const ROUTES = [
    {
        url: '/karate',
        proxy: {
            target: "http://localhost:8003",
            changeOrigin: true,
            pathRewrite: {
                [`^/karate`]: '',
            },
        }
    },
    {
        url: '/alpinismo',
        proxy: {
            target: "http://localhost:8002",
            changeOrigin: true,
            pathRewrite: {
                [`^/alpinismo`]: '',
            },
        }
    },
    {
        url: '/snowboard',
        proxy: {
            target: "http://localhost:8004",
            changeOrigin: true,
            pathRewrite: {
                [`^/snowboard`]: '',
            },
        }
    },
    {
        url: '/todo',
        proxy: {
            target: "http://localhost:8006",
            changeOrigin: true,
            pathRewrite: {
                [`^/todo`]: '',
                [`^/alpinismo`]: '',
            },
        }
    },

    {
        url: '/hokey',
        proxy: {
            target: "http://localhost:8005",
            changeOrigin: true,
            pathRewrite: {
                [`^/hokey`]: '',
            },
        }
    },
    {
        url: '/kayak',
        proxy: {
            target: "http://localhost:8005",
            changeOrigin: true,
            pathRewrite: {
                [`^/kayak`]: '',
            },
        }
    }
]

exports.routes = ROUTES;