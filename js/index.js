const config = new Config();

const background = new Background({ config });

const engine = new Engine();

const pipes = new Pipes({ config });

const bird = new Bird({ config });

const score = new Score({ config, bird, pipes});

// check if sources loaded
config.img.onload = () => {
    engine.beforeStart();
    config.btn.style = 'display: block';
};
// start game drawing by clicking button
function startGame() {
    config.btn.style = 'display: none';
    engine.isGameStarted = true;
    engine.startGame();
}
// start game button listener
config.btn.addEventListener('click', startGame);