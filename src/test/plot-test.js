var assert = chai.assert;

describe('plot', function () {
    it('exec functions in order', function (done) {
        var plot = new Plot();
        var array = [];

        plot.play([function (next) {
            array.push('1');
            setTimeout(next, 20);
        }, function (next) {
            array.push('2');
            setTimeout(next, 20);
        }, function (next) {
            array.push('3');
            setTimeout(next, 20);
        }, function (next) {
            array.push('4');
            setTimeout(next, 20);
        }, function (next) {
            assert.equal(array.join(''), '1234');
            done();
        }]);
    });
});
