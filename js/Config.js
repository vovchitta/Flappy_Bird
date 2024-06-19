class Config {
    constructor() {

        this.spriteSheet = './source/spriteSheet.png';
        this.restartBtnSpriteSheet = './source/restartBtn.png';
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.img = new Image();
        this.restartImg = new Image();
        this.restartImg.src = this.restartBtnSpriteSheet;
        this.img.src = this.spriteSheet;
        this.btn = document.querySelector('.start_btn');
        this.btn.style = 'display: none';
        // variables and arrays for counting pipes x-coordinates
        this.firstPipeX = this.canvas.width * 3;
        this.secondPipeX = this.canvas.width * 3.6;
        this.pipesArray = [];
        this.pipesArray2 = [];
        // game score
        this.score = 0;

        // frame animation variable
        this.index = 0;

        // game speed
        this.SPEED = 23;

        // playing field center 
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;

        // background part

        // upper background height equal to 90% of game board
        this.upperBackgroundHeight = this.canvas.height * 0.9

        this.upperBackgroundSource = {
            x: 0,
            y: 30,
            width: 142,
            height: 180
        }

        this.upperBackground = {
            x: 0,
            y: 0,
            width: this.canvas.width,
            height: this.upperBackgroundHeight
        }

        // lower background height equal to 10% of game board
        this.lowerBackgroundHeight = this.canvas.height * 0.1

        this.lowerBackgroundSource = {
            x: 146,
            y: 0,
            width: 154,
            height: 30
        }

        this.lowerBackground = {
            x: 0,
            y: this.upperBackgroundHeight,
            width: this.canvas.width,
            height: this.lowerBackgroundHeight
        }

        // Pipes part

        this.holeBetweenPipes = this.upperBackgroundHeight * 0.25

        this.upperPipeSource = {
            x: 302,
            y: 0,
            width: 26,
            height: 122
        }

        this.upperPipe = {
            x: 0,
            y: 0,
            width: this.canvas.width * 0.2,
            height:this.canvas.height / 4
        }

        this.upperPipeExtensionSource = {
            x: 302,
            y: 123,
            width: 26,
            height: 12
        }

        this.upperPipeExtension = {
            x: 0,
            y: this.upperPipe.height,
            width: this.canvas.width * 0.2,
            height:this.canvas.height * 0.07
        }

        this.lowerPipeExtensionSource = {
            x: 330,
            y: 0,
            width: 26,
            height: 12
        }

        this.lowerPipeExtension = {
            x: 0,
            y: this.upperPipe.height + this.upperPipeExtension.height + this.holeBetweenPipes,
            width: this.canvas.width * 0.2,
            height: this.canvas.height * 0.07
        }

        this.lowerPipeSource = {
            x: 330,
            y: 12,
            width: 26,
            height: 109
        }

        this.lowerPipe = {
            x: 0,
            y: this.lowerPipeExtension.y + this.lowerPipeExtension.height,
            width: this.canvas.width * 0.2,
            height: this.upperBackgroundHeight - this.lowerPipeExtension.y - this.lowerPipeExtension.height
        }

        // bird part

        this.birdFrames = [
            {
                x: 262,
                y: 62
            },
            {
                x: 262,
                y: 88
            },
            {
                x: 221,
                y: 122
            },
            {
                x: 262,
                y: 88
            }
        ];

        this.bird = {
            sourceWidth: 19,
            sourceHeight: 14,
            width: this.upperPipe.width / 2,
            height: this.holeBetweenPipes * 0.2,
            x: this.centerX - this.upperPipe.width / 2,
            y: this.centerY - (this.holeBetweenPipes * 0.2) / 2
        }
        
        // score part
        
        this.scoreSprites = [
            {
                x: 288,
                y: 100
            },
            {
                x: 289,
                y: 118
            },
            {
                x: 289,
                y: 134
            },
            {
                x: 289,
                y: 150
            },
            {
                x: 287,
                y: 173
            },
            {
                x: 287,
                y: 185
            },
            {
                x: 165,
                y: 245
            },
            {
                x: 175,
                y: 245
            },
            {
                x: 185,
                y: 245
            },
            {
                x: 195,
                y: 245
            }
        ];

        this.scoreSize = {
            spriteWidth: 7,
            spriteHeight: 10,
            width: 40,
            height: 60
        }

        this.finalScoreSize = {
            width: 30,
            height: 50
        }

        this.leftSideScoreSheetSource = {
            x: 146,
            y: 58,
            width: 11,
            height: 57
        }

        this.leftSideScoreSheet = {
            x: this.centerX - this.centerX / 3,
            y: this.centerY - this.centerY / 2,
            width: this.canvas.width / 12,
            height: this.canvas.height / 3
        }

        this.rightSideScoreSheetSource = {
            x: 226,
            y: 58,
            width: 33,
            height: 57
        }

        this.rightSideScoreSheet = {
            x: this.centerX - this.centerX / 3 + this.canvas.width / 12,
            y: this.centerY - this.centerY / 2,
            width: (this.canvas.width / 12) * 3,
            height: this.canvas.height / 3
        }

        this.startBtnSource = {
            x: 242,
            y: 213,
            width: 40,
            height: 13
        }

        this.startBtn = {
            x: this.centerX - (this.canvas.width / 6) / 2,
            y: this.canvas.height * 0.6,
            width: this.canvas.width / 6,
            height: this.canvas.height * 0.06
        }

        this.restartBtnSource = {
            x: 21,
            y: 16,
            width: 164,
            height: 53,
        }

        this.restartBtn = {
            sx: 21,
            sy: 16,
            sWidth: 164,
            sHeight: 53,
            dx: this.centerX - (this.canvas.width / 6) / 2,
            dy: this.canvas.height * 0.6,
            dWidth: this.canvas.width / 6,
            dHeigt: this.canvas.height * 0.06
        }
    }

}