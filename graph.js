class Graph {
    constructor(canvasId) {
        this._stage = new createjs.Stage(canvasId);
        let backGround = new createjs.Shape();
        backGround.graphics.beginFill("black").drawRect(0, 0, 200, 200);
        this._stage.addChild(backGround);
        this._stage.update();
    }
};
