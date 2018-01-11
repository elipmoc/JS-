//値を表す式
hscalc.ValueExpr = class {
    constructor(value) {
        this._value = value;
    }
    result() { return this._value; }
    get needArgs() { return 0; }
};

//新提案の二項演算子を表す式
hscalc.BinaryExpr = class {
    constructor(left, right, opInfo) {
        this._left = left;
        this._right = right;
        this._opInfo = opInfo;
    }
    result() {
        var leftValue = this._left.result();
        var rightValue = this._right.result();
        return this._opInfo["body"](leftValue, rightValue);
    }

    get needArgs() { return 0; }
}

//関数を呼び出しを表す式
hscalc.FuncCallExpr = class {
    //（関数型,引数一つ）
    constructor(funcExpr, arg) {
        this._funcExpr = funcExpr;
        this._arg = arg;
    }
    result() {
        if (this._arg != undefined) {
            return this._funcExpr.result().Do(this._arg.result());
        }
        return this._funcExpr.result().Do();

    }

    get needArgs() {
        return this._funcType.needArgs;
    }
}
