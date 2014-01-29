function Plot (sequence) {
    this.sequence = [];
    this.scenes = {};

    if (sequence) {
        this.setSequence(sequence);
    }
}

Plot.prototype.play = function (callback) {
    callback = callback || function () {};

    var sequence = this.sequence || [];

    var self = this;
    (function exec (index) {
        if (!sequence[index]) {
            return callback();
        }

        function done () {
            exec(index + 1);
        }

        var scene = sequence[index];
        var sceneName;
        if (typeof scene != 'string') {
            sceneName = ['scene', +(new Date())].join('_');
            self.scene(sceneName, scene);
        } else {
            sceneName = scene;
        }

        self.playScene(sceneName, done);
    })(0);
};

Plot.prototype.setSequence = function (sequence) {
    this.sequence = sequence;
};

Plot.prototype.playScene = function (sceneName, callback) {
    var self = this;
    var scene = this.scenes[sceneName];

    var cutCount = scene.length;
    var doneCount = 0;

    function done () {
        doneCount++;
        if (cutCount == doneCount) {
            setTimeout(callback);
        }
    }

    for (var i = 0; i < cutCount; i++) {
        (function (cut) {
            if (cut instanceof Plot) {
                cut.play(done);
                return;
            }

            setTimeout(function () {
                cut.apply(self, [done]);
            });
        })(scene[i]);
    }
};

Plot.prototype.scene = function (sceneName, cut) {
    var scene = this.scenes[sceneName];
    if (!scene) {
        scene = [];
    }
    scene.push(cut);
    this.scenes[sceneName] = scene;
};
