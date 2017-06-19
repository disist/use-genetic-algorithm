document.addEventListener("DOMContentLoaded", function (event) {
    window.POS_X, window.POS_Y = 0;

    startRect();

    startPredict();
});

function startRect() {
    var desc = document.getElementById("example"),
        ctx = desc.getContext('2d');

    desc.height = 640;
    desc.width = 960;

    window.POS_X = 0;
    window.POS_Y = desc.height / 2;

    const INTERVAL_MS = 100;

    ctx.beginPath();
    ctx.moveTo(window.POS_X, window.POS_Y);

    setInterval(() => {
        window.POS_X++;

        if (window.POS_X > (desc.width - 200)) {
            window.POS_X -= desc.width - 200;
            ctx.clearRect(0, 0, desc.width, desc.height);

            ctx.beginPath();
        }

        window.POS_Y += _generateY();

        if (window.POS_Y >= desc.height) {
            window.POS_Y = desc.height;
        } else
            if (window.POS_Y <= 0) {
                window.POS_Y = 0;
            }

        ctx.lineTo(window.POS_X, window.POS_Y);
        displayY();

        ctx.stroke();
    }, INTERVAL_MS);
}

function displayY() {
    document.getElementById('Y').textContent = window.POS_Y;
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