//値を表す式
class ValueExpr {
    constructor(value) {
        this._value = value;
    }
    result() { return this._value; }
    get needArgs() { return 0; }
}

//新提案の二項演算子を表す式
class BinaryExpr {
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
        this._operatorTable = new OperatorTable();
    }

    doParse() {
        let result = this.visitExpr();
        if (result.isSuccess())
            return result.expr.result();
        else
            return result.msg;
    }

    visitExpr() {
        var result = this.visitOperatorExpr(0);
        if (result.isSuccess()) {
            if (this._nowIndex < this._tokenList.length) {
                result.error("文法エラー");
                return result;
            }
        }
        return result;
    }

    visitOperatorExpr(index) {
        if (index >= this._operatorTable.getLength())
            return this.visitFuncCall();
        let op = this._operatorTable.getAt(index);
        if (op["associative"] == "right")
            return this.visitRightBinaryExpr(index);
        if (op["associative"] == "left")
            return this.visitLeftBinaryExpr(index);
    }

    visitRightBinaryExpr(index) {
        var checkPoint = this._nowIndex;
        var left = this.visitOperatorExpr(index + 1);
        if (left.isSuccess()) {
            var nowToken = this._tokenList[this._nowIndex];
            let op = this._operatorTable.getAt(index);
            if (this._nowIndex < this._tokenList.length &&
                nowToken.tokenType == "op" &&
                (nowToken.str == op["name"])) {
                this._nowIndex++;
                let right = this.visitRightBinaryExpr(index);
                if (right.isSuccess())
                    left.success(new BinaryExpr(left.expr, right.expr, op));
                else {
                    this._nowIndex = checkPoint;
                    right.error("演算子\"" + op["name"] + "\"の左辺に対応する値がありません");
                    return right;
                }
                nowToken = this._tokenList[this._nowIndex];
            }
            return left;
        }
        this._nowIndex = checkPoint;
        return left;
    }

    visitLeftBinaryExpr(index) {
        var checkPoint = this._nowIndex;
        var left = this.visitOperatorExpr(index + 1);
        if (left.isSuccess()) {
            var nowToken = this._tokenList[this._nowIndex];
            let op = this._operatorTable.getAt(index);
            while (this._nowIndex < this._tokenList.length &&
                nowToken.tokenType == "op" &&
                (nowToken.str == op["name"])) {
                this._nowIndex++;
                let right = this.visitOperatorExpr(index + 1);
                if (right.isSuccess())
                    left.success(new BinaryExpr(left.expr, right.expr, op));
                else {
                    this._nowIndex = checkPoint;
                    right.error("演算子\"" + op["name"] + "\"の左辺に対応する値がありません");
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

                let func = result.expr.result();
                if (
                    (typeof func != "object") ||
                    (("needArgs" in func) == false)
                ) {
                    if (!this.visitFuncName().isSuccess()) break;
                    result.error("関数ではないものに引数を渡そうとしました");
                    this._nowIndex = checkPoint;
                    return result;
                }

                let argResult = this.visitFuncName();
                if (argResult.isSuccess())
                    result.success(new FuncCallExpr(func, argResult.expr))
                else
                    break;
            }
        }
        return result;
    }

    visitFuncName() {
        let result = new Result();
        if (this._nowIndex >= this._tokenList.length) {
            result.error("文法エラー");
            return result;
        }

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
            result = this.visitWrapExpr();
            if (result.isSuccess())
                return result;
        }
        return this.visitArrayWrap();
    }

    visitWrapExpr() {
        let checkPoint = this._nowIndex;
        if (this._tokenList[this._nowIndex].str == "(") {
            this._nowIndex++;
            let result = this.visitOperatorExpr(0);
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
        result.error("文法エラー");
        this._nowIndex = checkPoint;
        return result;
    }

    visitArrayWrap() {
        let checkPoint = this._nowIndex;
        if (this._tokenList[this._nowIndex].str == "[") {
            this._nowIndex++;
            let result = this.visitArray();
            if (result.isSuccess())
                if (this._tokenList[this._nowIndex].str == "]") {
                    this._nowIndex++;
                    return result;
                }
                else
                    result.error("]がありません");
            this._nowIndex = checkPoint;
            return result;
        }
        let result = new Result();
        result.error("文法エラー");
        return result;
    }

    visitArray() {
        let checkPoint = this._nowIndex;
        let result = this.visitOperatorExpr(0);
        if (result.isSuccess()) {
            let array = new Array();
            while (true) {
                array.push(result.expr);
                if (this._tokenList[this._nowIndex].str == ",")
                    this._nowIndex++;
                else
                    break;
                result = this.visitOperatorExpr(0);
                if (result.isSuccess() == false) {
                    this._nowIndex = checkPoint;
                    result.error("リストの式が不正です");
                    return result;
                }
            }
            result = new Result();
            result.success(new ValueExpr(new ListType(array)));
            return result;
        }
        else {
            result = new Result();
            result.success(new ValueExpr(new ListType(new Array())));
            return result;
        }

        this._nowIndex = checkPoint;
        result = new Result();
        result.error("文法エラー");
        return result;
    }

}