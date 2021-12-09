/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanea a la napolitana',
  summary: 'Una receta de milanesa a la napolitana',
  healthScore: 5,
  image: null,
  diets: ['vegetarian'],
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should get all recipes', () =>
      agent.get('/recipes')
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(101);
      })
    );
  });
  describe('GET /recipes/:id', () => {
    it('should get 200', () =>
      agent.get('/recipes/1').expect(200)
    );
    it('should get a recipe', () =>
      agent.get('/recipes/1')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(1);
      })
    );
  });
  describe('POST /recipe', () => {
    it('should get 201', () =>
      agent.post('/recipe')
      .send(recipe)
      .expect(201)
    );
    it('should create a recipe', () =>
      agent.post('/recipe')
      .send(recipe)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.equal(recipe.title);
      })
    );
  });
  describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/types').expect(200)
    );
    it('should get all types', () =>
      agent.get('/types')
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(9);
      })
    );
  });
});
