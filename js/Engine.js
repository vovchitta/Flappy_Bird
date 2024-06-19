class Engine {
    constructor() {
        this._config = new Config();


        this._background = new Background({ config: this._config });

        this._pipes = new Pipes({ config: this._config });

        this._bird = new Bird({ config: this._config });

        this._score = new Score({ config: this._config, bird: this._bird, pipes: this._pipes });

        this.isGameStarted = false;

        this.handleMouseDown = (event) => {
            if (event.type === 'mousedown') {
                this._bird._velocity = this._bird._lift;
            }
        };
        this.handleSpacePress = (event) => {
            if (event.key === ' ') {
                this._bird._velocity = this._bird._lift;
            }
        };
    }

    inputHandler() {
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('keydown', this.handleSpacePress);
    }
    // create nwe objects fir starting new game
    reset() {
        this._config = new Config();
        this._background = new Background({ config: this._config });
        this._pipes = new Pipes({ config: this._config });
        this._bird = new Bird({ config: this._config });
        this._score = new Score({ config: this._config, bird: this._bird, pipes: this._pipes });
    }
    // game over settings
    gameOver() {
        this._config.SPEED = 0;
        document.removeEventListener('mousedown', this.handleMouseDown); 
        document.removeEventListener('keydown', this.handleSpacePress);
        this._score.drawScoreSheet();
        this._score.drawBestScore();
        this._score.drawRestartBtn();
        this._config.btn.style = 'display: block';
    }
    // calling game over function based on game rules
    checkCollisions() {
        // check if bird takes a ground
        if (this._bird._bird.y + this._bird._bird.height >= this._config.upperBackgroundHeight) {
            this._bird._bird.y = this._config.upperBackgroundHeight - this._bird._bird.height;
            this.gameOver();
        }
        // check if bird crash into first pipe
        if(this._bird._bird.x < this._pipes._firstPipeX + this._config.upperPipe.width) {
            if(this._bird._bird.x + this._config.bird.width >= this._pipes._firstPipeX && 
                this._bird._bird.y <= this._pipes._pipesArray[0] + this._pipes._upperPipeExtension.height) {
                    this.gameOver();
            } else if(this._bird._bird.x + this._config.bird.width >= this._pipes._firstPipeX &&
                this._bird._bird.y + this._config.bird.height >= this._pipes._pipesArray[0] + this._pipes._holeBetweenPipes) {
                    this.gameOver();
                }
            }
        // check if bird crash into second pipe
        if(this._bird._bird.x < this._pipes._secondPipeX + this._config.upperPipe.width) {
            if(this._bird._bird.x + this._config.bird.width >= this._pipes._secondPipeX &&
                this._bird._bird.y <= this._pipes._pipesArray2[1] + this._pipes._upperPipeExtension.height) {
                    this.gameOver();
            } else if(this._bird._bird.x + this._config.bird.width >= this._pipes._secondPipeX &&
                this._bird._bird.y + this._config.bird.height >= this._pipes._pipesArray2[1] + this._pipes._holeBetweenPipes) {
                    this.gameOver();
                }
        }
    }
    // drawing start screen of the game
    startScreen() {
        this.draw = ()=> {
            this._background.drawBackground();
            this._bird.drawBirdAtStart();
            this._score.drawStartBtn();
            if(this.isGameStarted === false) {
                this.request = window.requestAnimationFrame(this.draw)
            }
        };
    }


    // drawing a game

    drawGame() {

        this._render = ()=> {
            this._background.drawBackground();
            this._pipes.drawUpperPipe();
            this._pipes.drawLowerPipe();
            this.inputHandler();
            this._bird.drawBird();
            this.checkCollisions();     
            this._score.updateScore();
            this._score.drawCurrentScore();
            // stop animation if game is over
            if(this._config.SPEED > 0) {
                this.gameLoop = window.requestAnimationFrame(this._render);
            }               
        };
    }
    // calling game drawing render function
    startGame() {
        this.reset();
        this.drawGame();
        this._render();
    }
    // calling start screen render function
    beforeStart() {
        this.startScreen();
        this.draw();
    }
}