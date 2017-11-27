
//値を表す式
class ValueExpr {
    constructor(value) {
        this._value = value;
    }
    result() { return this._value;}
}

//二項演算子を表す式
class BinaryExpr {
    constructor(left,right,op) {
        this._left = left;
        this._right = right;
        this._op = op
    }
    result() {
        switch (op) {
            case "+":
                return this._left + this._right;
                break;
            case "-":
                return this._left - this._right;
                break;
            case "*":
                return this._left * this._right;
                break;
            case "/":
                return this._left / this._right;
                break;
        }
    }
}

function parser(tokenList) {

}