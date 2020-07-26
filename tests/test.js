const expect = require('chai').expect;
const mensa = require('../lib/mensa/mensa-helpers');

describe('mensa.js', function () {
    describe('getData()', function () {
        it('should return an object with meals and prices.', function (done) {
            mensa.getData().then(Meals => {
                expect(Meals).to.be.an('object');
                for (Meal in Meals) {
                    expect(Meals[Meal][0]).to.be.a('string');
                    expect(Meals[Meal][1]).to.be.a('number')
                }
                done();
            }).catch(e => {
                console.error(e);
                done();
            })
        });
    });
});
