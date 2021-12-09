const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('title', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ title: 'Milanesa a la napolitana' });
      });
    });
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({ summary: 'Milanesa a la napolitana' });
      });
    });
    describe('image', () => {
      it('should work when image its null', () => {
        Recipe.create({ image: null });
      });
      it('should work when image its a valid url', () => {
        Recipe.create({ image: 'http://www.google.com/image.jpg' });
      });
    });
    describe('instructions', () => {
      it('should work when instructions is not passed', () => {
        Recipe.create({});
      })
      it('should work when instructions is passed', () => {
        Recipe.create({ instructions: 'do it' });
      })
    });
  });
});
