function Plot (opts) {
    this.scenes = [];
}

Plot.prototype.play = function (immediate) {
    if (immediate) {
        this.setScenes(immediate);
    }

    var scenes = this.scenes || [];

    (function exec (index) {
        if (!scenes[index]) {
            return;
        }
        scenes[index](function () {
            exec(index + 1);
        });
    })(0);
};

Plot.prototype.setScenes = function (scenes) {
    this.scenes = scenes;
};
