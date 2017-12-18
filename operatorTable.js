//組み込み演算子を定義しておくテーブル
class OperatorTable {
    constructor() {
        this._opArray = {

            "+": { "body": (a, b) => { return a + b; }, "infix":"left"}
            , "-": { "body": (a, b) => { return a - b; }, "infix": "left" }
            , "*": { "body": (a, b) => { return a * b; },  "infix": "left" }
            , "/": { "body": (a, b) => { return a / b; },  "infix": "left" }
        }
    }

    getOpInfo(opName) {
        if (opName in this._opArray)
            return this._opArray[opName];
        return null;
    }
}