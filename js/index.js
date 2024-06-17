const config = new Config();

const background = new Background({ config });

const engine = new Engine();

const pipes = new Pipes({ config });

const bird = new Bird({ config });

const score = new Score({ config, bird, pipes});

function startGame() {
    engine.drawGame();
}

window.addEventListener('click', startGame());
