class Graph {
    constructor(canvas) {
        this._stage = new createjs.Stage(canvas);
        this._minX = -this._stage.canvas.width / 2;
        this._minY = -this._stage.canvas.height / 2;
        this._maxX = this._stage.canvas.width / 2;
        this._maxY = this._stage.canvas.height / 2;
        this._extendGraphFunc = {
            "dot": { "body": (a) => { this.dot(a[0], a[1]); return null; }, "args": 2 }
        };

    }

    get extendGraphFunc() { return this._extendGraphFunc; }

    setScale(x, y) {
        this._stage.scaleX = x;
        this._stage.scaleY = y;
        this._stage.canvas.width = (this._maxX - this._minX) * x;
        this._stage.canvas.height = (this._maxY - this._minY) * y;
    }

    positionFixX(x) { return x - this._minX; }
    positionFixY(y) { return -y - this._minY; }

    setMinX(minX) {
        this._minX = minX;
        this._stage.canvas.width = (this._maxX - this._minX) * this._stage.scaleX;
    }
    setMaxX(maxX) {
        this._maxX = maxX;
        this._stage.canvas.width = (this._maxX - this._minX) * this._stage.scaleX;
    }
    setMinY(minY) {
        this._minY = minY;
        this._stage.canvas.height = (this._maxY - this._minY) * this._stage.scaleY;
    }
    setMaxY(maxY) {
        this._maxY = maxY;
        this._stage.canvas.height = (this._maxY - this._minY) * this._stage.scaleY;
    }

    dot(x, y) {
        let dot = new createjs.Shape();
        dot.graphics.beginFill("black").
            drawRect(this.positionFixX(x), this.positionFixY(y), 1, 1);
        this._stage.addChild(dot);
    }

    reset() {
        this._stage.clear();
        this._stage.removeAllChildren();
    }

    update() {
        this._stage.update();
    }
};
