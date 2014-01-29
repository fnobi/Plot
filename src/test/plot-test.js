var assert = chai.assert;

describe('plot', function () {
    it('play functions in order', function (done) {
        var array = [];

        new Plot([function (next) {
            array.push('1');
            setTimeout(next);
        }, function (next) {
            array.push('2');
            setTimeout(next);
        }, function (next) {
            array.push('3');
            setTimeout(next);
        }, function (next) {
            array.push('4');
            setTimeout(next);
        }, function (next) {
            assert.equal(array.join(''), '1234');
            next();
        }]).play(done);
    });

    it('write scenes and asign', function (done) {
        var plot = new Plot([
            'set_a',
            'set_b',
            'set_c',
            'end'
        ]);

        var hoge = null;

        plot.scene('set_a', function (next) {
            hoge = 'a';
            next();
        });

        plot.scene('set_b', function (next) {
            assert.equal(hoge, 'a');
            hoge = 'b';
            next();
        });

        plot.scene('set_c', function (next) {
            assert.equal(hoge, 'b');
            hoge = 'c';
            next();
        });

        plot.scene('end', function (next) {
            assert.equal(hoge, 'c');
            next();
        });

        plot.play(done);
    });

    it('parallel', function (done) {
        var plot = new Plot([
            'set_value',
            'end'
        ]);

        var hoge = null;
        var moge = null;

        plot.scene('set_value', function (next) {
            hoge = 'a';
            next();
        });

        plot.scene('set_value', function (next) {
            moge = 'b';
            next();
        });

        plot.scene('end', function (next) {
            assert.equal(hoge, 'a');
            assert.equal(moge, 'b');
            next();
        });

        plot.play(done);
    });
});
