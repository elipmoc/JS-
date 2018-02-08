class Graph {
    constructor(canvasId) {
        this._stage = new createjs.Stage(canvasId);
        this._minX = -this._stage.canvas.width / 2;
        this._minY = -this._stage.canvas.height / 2;
        this._maxX = this._stage.canvas.width / 2;
        this._maxY = this._stage.canvas.height / 2;
    }

    setScale(x, y) {
        this._stage.scaleX = x;
        this._stage.scaleY = y;
        this._stage.canvas.width = (this._maxX - this._minX) * x;
        this._stage.canvas.height = (this._maxY - this._minY) * y;
    }

    positionFixX(x) { return x - this._minX; }
    positionFixY(y) { return -y - this._minY; }

    setMinMaxPx(minX, minY, maxX, maxY) {
        this._minX = minX;
        this._minY = minY;
        this._maxX = maxX;
        this._maxY = maxY;
        this._stage.scaleX = x;
        this._stage.scaleY = y;
        this._stage.canvas.width = (this._maxX - this._minX) * x;
        this._stage.canvas.height = (this._maxY - this._minY) * y;
    }

    dot(x, y) {
        let dot = new createjs.Shape();
        dot.graphics.beginFill("black").
            drawRect(this.positionFixX(x), this.positionFixY(y), 1, 1);
        this._stage.addChild(dot);
    }

    update() {
        this._stage.update();
    }
};
