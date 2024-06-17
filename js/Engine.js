class Engine {
    constructor() {
        this._config = new Config();


        this._background = new Background({ config: this._config });

        this._pipes = new Pipes({ config: this._config });

        this._bird = new Bird({ config: this._config });

        this._score = new Score({ config: this._config, bird: this._bird, pipes: this._pipes});

        this.gameLoop = null;
    }

    gameOver() {
        this._config.SPEED = 0;
        document.removeEventListener('mousedown', this._bird.handleMouseDown); 
        document.removeEventListener('keydown', this._bird.handleSpacePress);
        this._score.drawScoreSheet();
        this._score.drawBestScore();
        this._score.drawStartBtn();
        this._config.btn.style = 'display: block';
        cancelAnimationFrame(this.gameLoop);
    }

    checkCollisions() {
        if (this._bird._bird.y + this._bird._bird.height >= this._config.upperBackgroundHeight) {
            this._bird._bird.y = this._config.upperBackgroundHeight - this._bird._bird.height;
            this.gameOver();
        }
        if(this._bird._bird.x < this._pipes._firstPipeX + this._config.upperPipe.width) {
            if(this._bird._bird.x + this._config.bird.width >= this._pipes._firstPipeX && 
                this._bird._bird.y <= this._pipes._pipesArray[0] + this._pipes._upperPipeExtension.height) {
                    this.gameOver();
            } else if(this._bird._bird.x + this._config.bird.width >= this._pipes._firstPipeX &&
                this._bird._bird.y + this._config.bird.height >= this._pipes._pipesArray[0] + this._pipes._holeBetweenPipes) {
                    this.gameOver();
                }
            }
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

    basicBird() {
        this._config.ctx.fillRect(this._bird._bird.x + 10 , this._bird._bird.y + 10, this._config.bird.width - 10, this._config.bird.height - 10);
    }

    lines() {
        this._config.ctx.fillRect(this._config.centerX, 0, 1, this._config.canvas.height);
        this._config.ctx.fillRect(0, this._config.centerY, this._config.canvas.width, 1);
    }

    // drawing a game

    drawGame() {

        this._render = ()=> {

            this._background.drawBackground();

            this._pipes.drawUpperPipe();
            this._pipes.drawLowerPipe();


            this._bird.inputHandler();
            this._bird.drawBird();
            // this.basicBird();

            this.checkCollisions(); 

            this._score.updateScore();
            this._score.drawCurrentScore();

            // this.lines();

            if(this._config.SPEED > 0) {
                this.gameLoop = window.requestAnimationFrame(this._render);
            };
        };
        this._config.img.onload = this._render;
    }
}