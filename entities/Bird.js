class Bird {
    constructor({ config }) {
        this._config = config;
        this._canvas = config.canvas;
        this._ctx = config.ctx;
        this._img = config.img;
        this._birdFrames = config.birdFrames;
        this._bird = config.bird;
        this._centerX = config.centerX;
        this._centerY = config.centerY;
        this._holeBetweenPipes = config.holeBetweenPipes;
        this._upperBackgroundHeight = config.upperBackgroundHeight;
        this._endGame = config.endGame;
        this._index = config.index;

        this._velocity = 0;
        this._gravity = 0.5;
        this._lift = -8;
        
        // wings flapping index
        this._birdFlapping = 0;

        this._angle = 0;

        this.handleMouseDown = (event) => {
            if (event.type === 'mousedown') {
                this._velocity = this._lift;
            }
        };
        this.handleSpacePress = (event) => {
            if (event.key === ' ') {
                this._velocity = this._lift;
            }
        };
    }

    inputHandler() {
            document.addEventListener('mousedown', this.handleMouseDown);
            document.addEventListener('keydown', this.handleSpacePress);
        }

    updateBird() {
        this._velocity += this._gravity;
        this._bird.y += this._velocity;

        if(this._velocity < 0) {
            this._birdFlapping += 0.2;
        }
        if(this._velocity < 5) {
            this._angle = -30;      
        }
        if(this._angle > 0 || this._angle < 90) {
            this._angle += 3;
        }
        if(this._angle > 90) {
            this._angle = 90;
        }
        if (this._bird.y <= 0) {
            this._bird.y = 0;
        }
        if(this._angle > 30) {
            this._index = 1;
        }
    }

    // drawing a bird
    drawBird() {
        // increase index for bird to start flapping
        this._birdFlapping += 0.1;
        // bird flapping animation counter
        this._index = Math.floor(this._birdFlapping % 4);

        this._ctx.save();
        this.updateBird();
        this._ctx.translate(this._bird.x + this._bird.width / 2, this._bird.y + this._bird.height / 2);
        this._ctx.rotate(this._angle * ((Math.PI / 180)));
        this._ctx.drawImage(
            this._img,
            this._birdFrames[this._index].x,
            this._birdFrames[this._index].y,
            this._bird.sourceWidth,
            this._bird.sourceHeight,
            -this._bird.width / 2,
            -this._bird.height / 2,
            this._bird.width,
            this._bird.height
        );
        this._ctx.restore();
    }
}