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
})