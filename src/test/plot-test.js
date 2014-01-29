var assert = chai.assert;

describe('plot', function () {
    it('play functions in order', function (done) {
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

    it('write scenes and asign', function (done) {
        var plot = new Plot([
            'set_a',
            'set_b',
            'set_c',
            'end'
        ]);

        var hoge = null;

        plot.cut('set_a', function (next) {
            hoge = 'a';
            next();
        });

        plot.cut('set_b', function (next) {
            assert.equal(hoge, 'a');
            hoge = 'b';
            next();
        });

        plot.cut('set_c', function (next) {
            assert.equal(hoge, 'b');
            hoge = 'c';
            next();
        });

        plot.cut('end', function (next) {
            assert.equal(hoge, 'c');
            done();
        });

        plot.play();
    });

    it('parallel', function (done) {
        var plot = new Plot([
            'set_value',
            'end'
        ]);

        var hoge = null;
        var moge = null;

        plot.cut('set_value', function (next) {
            hoge = 'a';
            next();
        });

        plot.cut('set_value', function (next) {
            moge = 'b';
            next();
        });

        plot.cut('end', function (next) {
            assert.equal(hoge, 'a');
            assert.equal(moge, 'b');
            done();
        });

        plot.play();
    });
});
