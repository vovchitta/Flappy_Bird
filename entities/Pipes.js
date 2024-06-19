class Pipes {
    constructor({ config }) {
        this._config = config;
        this._canvas = config.canvas;
        this._ctx = config.ctx;
        this._img = config.img;
        this._upperBackgroundHeight = config.upperBackgroundHeight;
        this._upperPipeSource = config.upperPipeSource;
        this._upperPipe = config.upperPipe;
        this._upperPipeExtensionSource = config.upperPipeExtensionSource;
        this._upperPipeExtension = config.upperPipeExtension;
        this._lowerPipeExtensionSource = config.lowerPipeExtensionSource,
        this._lowerPipeExtension = config.lowerPipeExtension,
        this._lowerPipeSource = config.lowerPipeSource,
        this._lowerPipe = config.lowerPipe,
        this._index = config.index;
        this._holeBetweenPipes = config.holeBetweenPipes;
        this._firstPipeX = config.firstPipeX; 
        this._secondPipeX = config.secondPipeX;
        this._pipesArray = config.pipesArray;
        this._pipesArray2 = config.pipesArray2;
        this._SPEED = config.SPEED;
    }
    
    // getting random pipes height
    randomPipesHeight() {
        this._randomHeight = Math.floor(Math.random() * (this._upperBackgroundHeight * 0.45 - this._upperBackgroundHeight * 0.15) + this._upperBackgroundHeight * 0.15);
        this._pipesArray.push(this._randomHeight);
        this._pipesArray2.push(this._randomHeight);
        return this._pipesArray, this._pipesArray2; 
    }

    // pipes x-coordinate drawing formulas
    countFirstPipeX() {
        this._firstPipeX -= Math.floor(0.3 * this._config.SPEED);
        if (this._firstPipeX + this._upperPipe.width <= 0) {
            this._firstPipeX = this._canvas.width;
            this._pipesArray = [];
        } return this._firstPipeX;
    }

    countSecondPipeX() {
        this._secondPipeX -= Math.floor(0.3 * this._config.SPEED);
        if (this._secondPipeX + this._upperPipe.width <= 0) {
            this._secondPipeX = this._canvas.width;
            this._pipesArray2 = [];
        } return this._secondPipeX;
    }

    drawUpperPipe() {
        // drawing an upper pipe
        this.randomPipesHeight();
        // frame animation variable
        this._index += 0.3

        this.countFirstPipeX();
        this.countSecondPipeX();

        this._ctx.drawImage(
            this._img,
    
            this._upperPipeSource.x,
            this._upperPipeSource.y,
            this._upperPipeSource.width,
            this._upperPipeSource.height,
    
            this._firstPipeX,
            this._upperPipe.y,
            this._upperPipe.width,
            this._pipesArray[0]
        );

        this._ctx.drawImage(
            this._img,
    
            this._upperPipeSource.x,
            this._upperPipeSource.y,
            this._upperPipeSource.width,
            this._upperPipeSource.height,
    
            this._secondPipeX,
            this._upperPipe.y,
            this._upperPipe.width,
            this._pipesArray2[1]
        );

        // drawing an upper pipe extension
        this._ctx.drawImage(
            this._img,

            this._upperPipeExtensionSource.x,
            this._upperPipeExtensionSource.y,
            this._upperPipeExtensionSource.width,
            this._upperPipeExtensionSource.height,

            this._firstPipeX,
            this._pipesArray[0],
            this._upperPipeExtension.width,
            this._upperPipeExtension.height
        );

        this._ctx.drawImage(
            this._img,

            this._upperPipeExtensionSource.x,
            this._upperPipeExtensionSource.y,
            this._upperPipeExtensionSource.width,
            this._upperPipeExtensionSource.height,

            this._secondPipeX,
            this._pipesArray2[1],
            this._upperPipeExtension.width,
            this._upperPipeExtension.height
        );
    }

    drawLowerPipe() {
        // drawing a lower pipe extension
        this._ctx.drawImage(
            this._img,
    
            this._lowerPipeExtensionSource.x,
            this._lowerPipeExtensionSource.y,
            this._lowerPipeExtensionSource.width,
            this._lowerPipeExtensionSource.height,
    
            this._firstPipeX,
            this._pipesArray[0] + this._holeBetweenPipes,
            this._lowerPipeExtension.width,
            this._lowerPipeExtension.height
        );

        this._ctx.drawImage(
            this._img,
    
            this._lowerPipeExtensionSource.x,
            this._lowerPipeExtensionSource.y,
            this._lowerPipeExtensionSource.width,
            this._lowerPipeExtensionSource.height,
    
            this._secondPipeX,
            this._pipesArray2[1] + this._holeBetweenPipes,
            this._lowerPipeExtension.width,
            this._lowerPipeExtension.height
        );

        // drawing a lower pipe
        this._ctx.drawImage(
            this._img,
    
            this._lowerPipeSource.x,
            this._lowerPipeSource.y,
            this._lowerPipeSource.width,
            this._lowerPipeSource.height,
    
            this._firstPipeX,
            this._pipesArray[0] + this._holeBetweenPipes + this._lowerPipeExtension.height,
            this._lowerPipe.width,
            this._upperBackgroundHeight - (this._pipesArray[0] + this._holeBetweenPipes + this._lowerPipeExtension.height)
        );

        this._ctx.drawImage(
            this._img,
    
            this._lowerPipeSource.x,
            this._lowerPipeSource.y,
            this._lowerPipeSource.width,
            this._lowerPipeSource.height,
    
            this._secondPipeX,
            this._pipesArray2[1] + this._holeBetweenPipes + this._lowerPipeExtension.height,
            this._lowerPipe.width,
            this._upperBackgroundHeight - (this._pipesArray2[1] + this._holeBetweenPipes + this._lowerPipeExtension.height)
        );
    }

}