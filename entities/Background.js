class Background {
    constructor({ config }) {
        this._config = config;
        this._canvas = config.canvas;
        this._ctx = config.ctx;
        this._img = config.img;
        this._upperBackgroundSource = config.upperBackgroundSource;
        this._upperBackground = config.upperBackground;
        this._lowerBackgroundSource = config.lowerBackgroundSource;
        this._lowerBackground = config.lowerBackground;
        this._index = config.index;
    }

    // drawing a background
    drawBackground() {
        // frame animation variable
        this._index += 0.3

        // backgroundX movement formula
        this._movingBackgroundX = -((this._index * this._config.SPEED) % this._canvas.width);

        // hidden backgroundX
        this._hiddenBackgroundX = this._movingBackgroundX + this._canvas.width;

        // drawing an initial position of upper background
        this._ctx.drawImage(
            this._img, 

            this._upperBackgroundSource.x,
            this._upperBackgroundSource.y,
            this._upperBackgroundSource.width,
            this._upperBackgroundSource.height,

            this._movingBackgroundX,
            this._upperBackground.y,
            this._upperBackground.width,
            this._upperBackground.height
        );

        // drawing a hidden upper background that moves forward
        this._ctx.drawImage(
            this._img, 

            this._upperBackgroundSource.x,
            this._upperBackgroundSource.y,
            this._upperBackgroundSource.width,
            this._upperBackgroundSource.height,

            this._hiddenBackgroundX,
            this._upperBackground.y,
            this._upperBackground.width,
            this._upperBackground.height
        );

        // drawing an initial position of lower background
        this._ctx.drawImage(
            this._img,

            this._lowerBackgroundSource.x,
            this._lowerBackgroundSource.y,
            this._lowerBackgroundSource.width,
            this._lowerBackgroundSource.height,

            this._movingBackgroundX,
            this._lowerBackground.y,
            this._lowerBackground.width,
            this._lowerBackground.height
        );

        // drawing a hidden lower background that moves forward
        this._ctx.drawImage(
            this._img,

            this._lowerBackgroundSource.x,
            this._lowerBackgroundSource.y,
            this._lowerBackgroundSource.width,
            this._lowerBackgroundSource.height,

            this._hiddenBackgroundX,
            this._lowerBackground.y,
            this._lowerBackground.width,
            this._lowerBackground.height
        );
    }

}