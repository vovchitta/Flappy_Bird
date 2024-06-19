class Score {
    constructor({ config, bird, pipes }) {
        this._config = config;
        this._bird = bird;
        this._pipes = pipes;
        this._bestScore = localStorage.getItem('bestScore');
        this._scoreArr = [0];
        this._result = [0];
        this._bestScoreArr = [this._bestScore];
        this._bestResult = [0];
        
        // getting x-coordinate variable for drawing current score
        this._floatingCurrentScoreX = this._config.centerX - this._config.scoreSize.width / 2;
        // getting x-coordinate variable for drawing last score
        this._floatingLastScoreX = this._config.centerX - this._config.finalScoreSize.width / 2;
        // getting x-coordinate variable for drawing best score
        this._floatingBestScoreX = this._config.centerX - this._config.finalScoreSize.width / 2;
        // moving best score digits to center
        if(this._bestScore > 9) {
            this._floatingBestScoreX = this._config.centerX;
        }
        if(this._bestScore > 99) {
            this._floatingBestScoreX = this._config.centerX + this._config.finalScoreSize.width / 2
        };
    }

    updateScore() {
        // drawing best score equal 0 if playing very first time
        if(this._bestScore === null) {
            this._bestScoreArr = [0];
        }
        // updating current and best score
        if(this._bird._bird.x + this._config.bird.width === this._pipes._firstPipeX + this._config.upperPipe.width / 2 ||
        this._bird._bird.x + this._config.bird.width === this._pipes._secondPipeX + this._config.upperPipe.width / 2) {
            this._config.score++;
            this._scoreArr.unshift(this._config.score);
            this._scoreArr.pop();
            this._result = this._scoreArr.toString().split('').map(Number);
            if(this._config.score > this._bestScore) {
                this._bestScore = this._config.score;
                localStorage.setItem('bestScore', this._bestScore);
                this._bestScoreArr.pop();
                this._bestScoreArr.push(this._bestScore);
            }
            if(this._config.score === 10) {
                this._floatingCurrentScoreX = this._config.centerX;
                this._floatingLastScoreX = this._config.centerX;
            }
            if(this._config.score === 100) {
                this._floatingCurrentScoreX = this._config.centerX + this._config.scoreSize.width / 2;
                this._floatingLastScoreX = this._config.centerX + this._config.finalScoreSize.width / 2
            }
            if(this._config.score === 999) {
                alert('YOU HAVE REACHED THE MAXIMUM SCORE !!!');
                this._config.endGame();
            }
        } 
    }

    drawCurrentScore() {
        console.log(this._bird._bird.x + this._config.bird.width, '', this._pipes._firstPipeX + this._config.upperPipe.width);
        this._config.ctx.drawImage(
            this._config.img,

            this._config.scoreSprites[this._result[this._result.length - 1]].x,
            this._config.scoreSprites[this._result[this._result.length - 1]].y,
            this._config.scoreSize.spriteWidth,
            this._config.scoreSize.spriteHeight,

            this._floatingCurrentScoreX,
            this._config.centerY / 8,
            this._config.scoreSize.width,
            this._config.scoreSize.height
        );
        if(this._config.score > 9) {
            this.drawSecondCurrentScore();
        }
        if(this._config.score > 99) {
            this.drawThirdCurrentScore();
        }
    }

    // drawing score part
    drawSecondCurrentScore() {
        this._config.ctx.drawImage(
            this._config.img,

            this._config.scoreSprites[this._result[this._result.length - 2]].x,
            this._config.scoreSprites[this._result[this._result.length - 2]].y,
            this._config.scoreSize.spriteWidth,
            this._config.scoreSize.spriteHeight,

            this._floatingCurrentScoreX - this._config.scoreSize.width,
            this._config.centerY / 8,
            this._config.scoreSize.width,
            this._config.scoreSize.height
        )
    }

    drawThirdCurrentScore() {
        this._config.ctx.drawImage(
            this._config.img,

            this._config.scoreSprites[this._result[this._result.length - 3]].x,
            this._config.scoreSprites[this._result[this._result.length - 3]].y,
            this._config.scoreSize.spriteWidth,
            this._config.scoreSize.spriteHeight,

            this._floatingCurrentScoreX - this._config.scoreSize.width * 2,
            this._config.centerY / 8,
            this._config.scoreSize.width,
            this._config.scoreSize.height
        )
    }

    drawSecondFinalScore() {
        this._config.ctx.drawImage(
            this._config.img,

            this._config.scoreSprites[this._result[this._result.length - 2]].x,
            this._config.scoreSprites[this._result[this._result.length - 2]].y,
            this._config.scoreSize.spriteWidth,
            this._config.scoreSize.spriteHeight,

            this._floatingLastScoreX - this._config.finalScoreSize.width,
            this._config.centerY - this._config.centerY / 3.5,
            this._config.finalScoreSize.width,
            this._config.finalScoreSize.height
        );
    }

    drawThirdFinalScore() {
        this._config.ctx.drawImage(
            this._config.img,

            this._config.scoreSprites[this._result[this._result.length - 3]].x,
            this._config.scoreSprites[this._result[this._result.length - 3]].y,
            this._config.scoreSize.spriteWidth,
            this._config.scoreSize.spriteHeight,

            this._floatingLastScoreX - this._config.finalScoreSize.width * 2,
            this._config.centerY - this._config.centerY / 3.5,
            this._config.finalScoreSize.width,
            this._config.finalScoreSize.height
        );
    }

    drawScoreSheet() {
        // score sheet part

        // drawing left side of score sheet
        this._config.ctx.drawImage(
            this._config.img,

            this._config.leftSideScoreSheetSource.x,
            this._config.leftSideScoreSheetSource.y,
            this._config.leftSideScoreSheetSource.width,
            this._config.leftSideScoreSheetSource.height,

            this._config.leftSideScoreSheet.x,
            this._config.leftSideScoreSheet.y,
            this._config.leftSideScoreSheet.width,
            this._config.leftSideScoreSheet.height
        );
        // drawing right side of score sheet
        this._config.ctx.drawImage(
            this._config.img,

            this._config.rightSideScoreSheetSource.x,
            this._config.rightSideScoreSheetSource.y,
            this._config.rightSideScoreSheetSource.width,
            this._config.rightSideScoreSheetSource.height,

            this._config.rightSideScoreSheet.x,
            this._config.rightSideScoreSheet.y,
            this._config.rightSideScoreSheet.width,
            this._config.rightSideScoreSheet.height
        );
        // final score part

        // drawing a last character of final score 
        this._config.ctx.drawImage(
            this._config.img,

            this._config.scoreSprites[this._result[this._result.length - 1]].x,
            this._config.scoreSprites[this._result[this._result.length - 1]].y,
            this._config.scoreSize.spriteWidth,
            this._config.scoreSize.spriteHeight,

            this._floatingLastScoreX,
            this._config.centerY - this._config.centerY / 3.5,
            this._config.finalScoreSize.width,
            this._config.finalScoreSize.height
        );
        // drawing second character of final score
        if(this._config.score > 9) {
            this.drawSecondFinalScore();
        }
        // drawing a first character of final score
        if(this._config.score > 99) {
            this.drawThirdFinalScore();
        }
    }

    drawSecondBestScore() {
        // drawing second character of the best score
        this._config.ctx.drawImage(
            this._config.img,

            this._config.scoreSprites[this._bestResult[this._bestResult.length - 2]].x,
            this._config.scoreSprites[this._bestResult[this._bestResult.length - 2]].y,
            this._config.scoreSize.spriteWidth,
            this._config.scoreSize.spriteHeight,

            this._floatingBestScoreX - this._config.finalScoreSize.width,
            this._config.centerY - this._config.centerY / 18,
            this._config.finalScoreSize.width,
            this._config.finalScoreSize.height
        );
    }

    drawThirdBestScore() {
        // drawing first character of the best score
        this._config.ctx.drawImage(
            this._config.img,

            this._config.scoreSprites[this._bestResult[this._bestResult.length - 3]].x,
            this._config.scoreSprites[this._bestResult[this._bestResult.length - 3]].y,
            this._config.scoreSize.spriteWidth,
            this._config.scoreSize.spriteHeight,

            this._floatingBestScoreX - this._config.finalScoreSize.width * 2,
            this._config.centerY - this._config.centerY / 18,
            this._config.finalScoreSize.width,
            this._config.finalScoreSize.height
        );
    }

    // best score part
    drawBestScore() {
        this._bestResult = this._bestScoreArr.toString().split('').map(Number);
        // drawing a last character of the best score 
        this._config.ctx.drawImage(
            this._config.img,

            this._config.scoreSprites[this._bestResult[this._bestResult.length - 1]].x,
            this._config.scoreSprites[this._bestResult[this._bestResult.length - 1]].y,
            this._config.scoreSize.spriteWidth,
            this._config.scoreSize.spriteHeight,

            this._floatingBestScoreX,
            this._config.centerY - this._config.centerY / 18,
            this._config.finalScoreSize.width,
            this._config.finalScoreSize.height
        );
        
        if(this._bestScore > 9) {
            this.drawSecondBestScore();
        }
        if(this._bestScore > 99) {
            this.drawThirdBestScore();
        }
    }
    // drawing buttons for start and restart
    drawStartBtn() {
        this._config.ctx.drawImage(
            this._config.img,

            this._config.startBtnSource.x,
            this._config.startBtnSource.y,
            this._config.startBtnSource.width,
            this._config.startBtnSource.height,

            this._config.startBtn.x,
            this._config.startBtn.y,
            this._config.startBtn.width,
            this._config.startBtn.height
        );
    }

    drawRestartBtn() {
        this._config.ctx.drawImage(
            this._config.restartImg,

            this._config.restartBtnSource.x,
            this._config.restartBtnSource.y,
            this._config.restartBtnSource.width,
            this._config.restartBtnSource.height,

            this._config.startBtn.x,
            this._config.startBtn.y,
            this._config.startBtn.width,
            this._config.startBtn.height
        );
    }
}