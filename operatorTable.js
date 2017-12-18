//組み込み演算子を定義しておくテーブル
class OperatorTable {
    constructor() {
        this._opArray = [

            {"name" : "+" ,"body": (a, b) => { return a + b; }, "infix":"left"}
            , {"name" : "-" , "body": (a, b) => { return a - b; }, "infix": "left" }
            , {"name" : "*" , "body": (a, b) => { return a * b; }, "infix": "left" }
            , {"name" : "/" , "body": (a, b) => { return a / b; }, "infix": "left" }
        ]
    }

    getLength() {
        return this._opArray.length;
    }

    getAt(index) {
        return this._opArray[index];
    }

    getOpInfo(opName) {
        this._opArray.forEach((op) => { 
            if (op["name"] == opName)
                return op;
            });
        return null;
    }
}