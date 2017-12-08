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
        if (this.needArgs==0)
            return this._funcInfo["body"](this._argList);
        if (arg != undefined) {
            this._argList.push(arg);
            if (this.needArgs == 0)
                return this._funcInfo["body"](this._argList);
        }
        return new FuncType(this._funcInfo, this._argList);
    }

    get needArgs() {
        return this._funcInfo["args"] - this._argList.length;
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
        if (this._arg != undefined) {
            return this._funcType.Do(this._arg.result());
        }
        return this._funcType.Do();

    }

    get needArgs() {
        return this._funcType.needArgs;
    }
}

//パース結果の保存するクラス
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

    doParse() {
        var resultText = document.getElementById("resultText");
        let result = this.visitExpr();
        if (result.isSuccess())
            resultText.value = result.expr.result();
        else
            resultText.value = result.msg;
    }

    visitExpr() {
        var result = this.visitAddExpr();
        if (result.isSuccess()) {
            if (this._nowIndex < this._tokenList.length) {
                result.error("文法エラー");
                return result;
            }
        }
        return result;
    }

    visitAddExpr() {
        var checkPoint = this._nowIndex;
        var left = this.visitMulExpr();
        if (left.isSuccess()) {
            var nowToken = this._tokenList[this._nowIndex];
            while (this._nowIndex < this._tokenList.length &&
                nowToken.tokenType == "op" &&
                (nowToken.str == "+" || nowToken.str == "-")) {
                let op = nowToken.str;
                this._nowIndex++;
                let right = this.visitMulExpr();
                if (right.isSuccess())
                    left.success(new BinaryExpr(left.expr, right.expr, op));
                else {
                    this._nowIndex = checkPoint;
                    right.error("演算子\"" + op + "\"の左辺に対応する値がありません");
                    return right;
                }
                nowToken = this._tokenList[this._nowIndex];
            }
            return left;
        }
        this._nowIndex = checkPoint;
        return left;
    }

    visitMulExpr() {
        var checkPoint = this._nowIndex;
        var left = this.visitFuncCall();
        if (left.isSuccess()) {
            var nowToken = this._tokenList[this._nowIndex];
            while (this._nowIndex < this._tokenList.length &&
                nowToken.tokenType == "op" &&
                (nowToken.str == "*" || nowToken.str == "/")) {
                let op = nowToken.str;
                this._nowIndex++;
                let right = this.visitFuncCall();
                if (right.isSuccess())
                    left.success(new BinaryExpr(left.expr, right.expr, op));
                else {
                    this._nowIndex = checkPoint;
                    right.error("演算子\"" + op + "\"の右辺に対応する値がありません");
                    return right;
                }
                nowToken = this._tokenList[this._nowIndex];
            }
            return left;
        }
        this._nowIndex = checkPoint;
        return left;
    }

    visitFuncCall() {
        var checkPoint = this._nowIndex;
        let result = this.visitFuncName();
        if (result.isSuccess()) {

            while (true) {
                if (("needArgs" in result.expr) == false) {
                    if (!this.visitFuncName().isSuccess()) break;
                    result.error("関数ではないものに引数を渡そうとしました");
                    this._nowIndex = checkPoint;
                    return result;
                }
                let argResult = this.visitFuncName();
                if (argResult.isSuccess()) {
                    if (result.expr.needArgs == 0) {
                        result.error("関数に渡す引数の数が不正です");
                        this._nowIndex = checkPoint;
                        return result;
                    }
                    result.success(new FuncCallExpr(result.expr.result(), argResult.expr))
                }
                else
                {
                    break;
                }
            }            
        }
        return result;

    }

    visitFuncName() {
        if (this._nowIndex >= this._tokenList.length) {
            let result=new Result();
            result.error("");
            return result;
        }

        let result = new Result();
        if (this._tokenList[this._nowIndex].tokenType == "num") {
            result.success(new ValueExpr(Number(this._tokenList[this._nowIndex].str)));
            this._nowIndex++;
            return result;
        }
        else if (this._tokenList[this._nowIndex].tokenType == "identifier") {
            let funcName = this._tokenList[this._nowIndex].str;
            let funcInfo = this._intrinsicFuncTable.getFuncInfo(funcName);
            if (funcInfo != null) {
                result.success(new FuncCallExpr(new FuncType(funcInfo)));
                this._nowIndex++;
                return result;
            }
            result.error("定義されていない識別子です");
            return result;
        }
        else {
           return this.visitWrapExpr();
        }
    }

    visitWrapExpr() {
        let checkPoint = this._nowIndex;
        if (this._tokenList[this._nowIndex].str == "(") {
            this._nowIndex++;
            let result = this.visitAddExpr();
            if (result.isSuccess()) {
                if (this._nowIndex < this._tokenList.length && this._tokenList[this._nowIndex].str == ")") {
                    this._nowIndex++;
                    return result;
                }
                result.error("左かっこに対応する右かっこがありません");
            }
            this._nowIndex = checkPoint;
            return result;
        }
        let result = new Result();
        result.error("");
        this._nowIndex = checkPoint;
        return result;
    }
}