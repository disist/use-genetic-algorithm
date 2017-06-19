document.addEventListener("DOMContentLoaded", function (event) {
    window.INIT_X, window.INIT_Y = 0;

    startRect();

    startPredict();
});

function startRect() {
    var desc = document.getElementById("example"),
        ctx = desc.getContext('2d');

    desc.height = 640;
    desc.width = 960;

    window.INIT_X = 0;
    window.INIT_Y = desc.height / 2;

    const INTERVAL_MS = 100;

    ctx.beginPath();
    ctx.moveTo(window.INIT_X, window.INIT_Y);

    setInterval(() => {
        window.INIT_X++;

        if (window.INIT_X > (desc.width - 200)) {
            window.INIT_X -= desc.width - 200;
            ctx.clearRect(0, 0, desc.width, desc.height);

            ctx.beginPath();
        }

        window.INIT_Y += _generateY();

        if (window.INIT_Y >= desc.height) {
            window.INIT_Y = desc.height;
        } else
            if (window.INIT_Y <= 0) {
                window.INIT_Y = 0;
            }

        ctx.lineTo(window.INIT_X, window.INIT_Y);
        displayY();

        ctx.stroke();
    }, INTERVAL_MS);
}

function displayY() {
    document.getElementById('Y').innerHTML = window.INIT_Y;
}

function startPredict() {
    var genetic = Genetic.create();

    genetic.optimize = Genetic.Optimize.Minimize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.FittestRandom;
}

function _generateY() {
    const RANDOM_RANGE = 50;

    return ~~(Math.random() * RANDOM_RANGE) - (RANDOM_RANGE / 2);
}