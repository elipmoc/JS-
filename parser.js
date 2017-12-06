
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
        this._op = op;
    }
    result() {
        var leftValue=this._left.result();
        var rightValue=this._right.result();

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

    isSuccess() { return !this._errorFlag;}

    success(expr) { this._expr = expr; this._msg = ""; this._errorFlag = false;}

    error(msg) {
        this._msg += msg+"\r\n";
        this._errorFlag = true;
    }

}

class Parser{
    constructor(tokenList) {
        this._tokenList=tokenList;
        this._nowIndex=0;
    }

    visitStart() {
        var result = this.visitSiki();
        if (result.isSuccess()) {
            if (this._nowIndex < this._tokenList.length) {
                result.error("文法エラー");
                return result;
            }
        }
        return result;
    }

    visitSiki() {
        var checkPoint = this._nowIndex;
        var left = this.visitKou();
        if (left.isSuccess()) {
            var nowToken = this._tokenList[this._nowIndex];
            while(this._nowIndex < this._tokenList.length &&
                nowToken.tokenType == "op" &&
                (nowToken.str == "+" || nowToken.str == "-")) {
                let op = nowToken.str;
                console.log(op);
                this._nowIndex++;
                let right = this.visitKou();
                if (right.isSuccess())
                    left.success (new BinaryExpr(left.expr, right.expr, op));
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

    visitKou() {
        var checkPoint = this._nowIndex;
        var left = this.visitInsu();
        if (left.isSuccess()) {
            var nowToken = this._tokenList[this._nowIndex];
            while (this._nowIndex < this._tokenList.length &&
                nowToken.tokenType == "op" &&
                (nowToken.str == "*" || nowToken.str == "/")) {
                let op = nowToken.str;
                this._nowIndex++;
                let right = this.visitInsu();
                if (right.isSuccess())
                    left.success(new BinaryExpr(left.expr, right.expr, op));
                else{
                    this._nowIndex = checkPoint;
                    right.error("演算子\""+op+"\"の右辺に対応する値がありません");
                    return right;
                }
                nowToken = this._tokenList[this._nowIndex];
            }
            return left;
        }
        this._nowIndex = checkPoint;
        return left;
    }

    visitInsu() {
        if (this._nowIndex >= this._tokenList.length) {
            let result = new Result();
            result.error("");
            return result;
        }
        let checkPoint = this._nowIndex;
        if (this._tokenList[this._nowIndex].str == "(") {
            this._nowIndex++;
            let result = this.visitSiki();
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

        let result = this.visitSeisu();
        if (!result.isSuccess())
            this._nowIndex = checkPoint;
        return result;
    }

    visitSeisu() {
        let result = new Result();
        if (this._nowIndex < this._tokenList.length) {
            if (this._tokenList[this._nowIndex].tokenType == "num") {
                var expr = new ValueExpr(Number(this._tokenList[this._nowIndex].str));
                this._nowIndex++;

                result.success(expr);
                return result;
            }
            else {
                result.error("整数ではありません");
                return result;
            }
        }
        else {
            result.error("");
            return result;
        }
    }

    doParse() {
        var resultText = document.getElementById("resultText");
        let result=this.visitStart();
        if (result.isSuccess())
            resultText.value = result.expr.result();
        else
            resultText.value = result.msg;
    }



}

