//�l��\����
class ValueExpr {
    constructor(value) {
        this._value = value;
    }
    result() { return this._value; }
}

//�񍀉��Z�q��\����
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

//�֐��^
//�����̐��������܂Œx���]��
class FuncType {
    constructor(funcInfo, argList) {
        this._funcInfo = funcInfo;

        if (argList != undefined)
            this._argList = argList;
        else
            this._argList = new Array();
    }

    Do(arg) {
        if (this.needArgs==0)
            return this._funcInfo["body"](this._argList);
        if (arg != undefined)
            this._argList.push(arg);
        return new FuncType(this._funcInfo, this._argList);
    }

    get needArgs() {
        return this._funcInfo["args"] - this._argList.length;
    }


}

//�֐����Ăяo����\����
class FuncCallExpr {
    //�i�֐��^,������j
    constructor(funcType, arg) {
        this._funcType = funcType;
        this._arg = arg;
    }
    result() {
        return this._funcType.Do(this._arg);
    }

    get needArgs() {
        return this._funcType.needArgs;
    }
}

//�p�[�X���ʂ̕ۑ�����N���X
class Result {
    constructor() {
        this._msg = "";
        this._expr = undefined;
        this._errorFlag = false;
    }

    get expr() {
        return this._expr;
    }

    get msg() {
        return this._msg;
    }

    isSuccess() { return !this._errorFlag; }

    success(expr) { this._expr = expr; this._msg = ""; this._errorFlag = false; }

    error(msg) {
        this._msg += msg + "\r\n";
        this._errorFlag = true;
    }
}

class Parser {
    constructor(tokenList) {
        this._tokenList = tokenList;
        this._nowIndex = 0;
        this._intrinsicFuncTable = new IntrinsicFuncTable();
    }

    visitExpr() { }
    visitAddExpr() { }
    visitMulExpr() { }
    visitFuncCall() { }
    visitFuncName() { }
    visitWrapExpr() { }
}