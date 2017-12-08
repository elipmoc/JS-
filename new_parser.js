//値を表す式
class ValueExpr {
    constructor(value) {
        this._value = value;
    }
    result() { return this._value; }
}

//二項演算子を表す式
class BinaryExpr {
    constructor(left, right, op) {
        this._left = left;
        this._right = right;
        this._op = op;
    }
    result() {
        var leftValue = this._left.result();
        var rightValue = this._right.result();

        switch (this._op) {
            case "+":
                return leftValue + rightValue;
                break;
            case "-":
                return leftValue - rightValue;
                break;
            case "*":
                return leftValue * rightValue;
                break;
            case "/":
                return leftValue / rightValue;
                break;
        }
    }
}

//関数型
//引数の数が合うまで遅延評価
class FuncType {
    constructor(funcInfo, argList) {
        this._funcInfo = funcInfo;

        if (argList != undefined)
            this._argList = argList;
        else
            this._argList = new Array();
    }

    Do(arg) {
        if (this._argList.length == this._funcInfo["args"])
            return this._funcInfo["body"](this._argList);
        if (arg != undefined)
            this._argList.push(arg);
        return new FuncType(this._funcInfo, this._argList);
    }
}

//関数を呼び出しを表す式
class FuncCallExpr {
    //（関数型,引数一つ）
    constructor(funcType, arg) {
        this._funcType = funcType;
        this._arg = arg;
    }
    result() {
        return this._funcType.Do(this._arg);
    }
}