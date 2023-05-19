const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor Todo:', () => {

describe("/getTodosNombres", () => {
  it('Devuelve un vector de tamaño 10 al consultar mediante getTodosNombres', (done) => {
    supertest(app)
      .get('/getTodos')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body.length ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.length === 44);
      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });
})

describe("/getTodos", () => {
  it('Devuelve un vector de tamaño 10 al consultar mediante getTodos', (done) => {
    supertest(app)
      .get('/getTodosCompleto')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body.length ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.length === 44);
      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });
})

describe('Rutas / y /acercade', () => {
  it('Devuelve MS Plantilla Home Page', (done) => {
    supertest(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.hasOwnProperty('mensaje'));
        assert(res.body.mensaje === "Microservicio MS Plantilla: home");

      })
      .end((error) => { error ? done.fail(error) : done() })
  });
  it('Devuelve MS Plantilla Acerca De', (done) => {
    supertest(app)
      .get('/acercade')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.hasOwnProperty('mensaje'));
        assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

      })
      .end((error) => { error ? done.fail(error) : done() })
  });
})
})