
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
        this._expr=undefined;
    }

    get expr() {
        return this._expr;
    }

    isSuccess() { return this._msg == "";}

    success(expr) { this._expr = expr; this._msg = ""; }

    error(msg) {
        this._msg += msg;
    }

}

class Parser{
    constructor(tokenList) {
        this._tokenList=tokenList;
        this._nowIndex=0;
    }

    visitSiki() {
        var checkPoint = this._nowIndex;
        var left = this.visitKou();
        if (left != null) {
            var nowToken = this._tokenList[this._nowIndex];
            while(this._nowIndex < this._tokenList.length &&
                nowToken.tokenType == "op" &&
                (nowToken.str == "+" || nowToken.str == "-")) {
                let op = nowToken.str;
                console.log(op);
                this._nowIndex++;
                let right = this.visitKou();
                if (right != null)
                    left = new BinaryExpr(left, right, op);
                else {
                    this._nowIndex = checkPoint;
                    return null;
                }
                nowToken = this._tokenList[this._nowIndex];
            }
            return left;
        }
        this._nowIndex = checkPoint;
        return null;
    }

    visitKou() {
        var checkPoint = this._nowIndex;
        var left = this.visitSeisu();
        if (left != null) {
            var nowToken = this._tokenList[this._nowIndex];
            while (this._nowIndex < this._tokenList.length &&
                nowToken.tokenType == "op" &&
                (nowToken.str == "*" || nowToken.str == "/")) {
                let op = nowToken.str;
                this._nowIndex++;
                let right = this.visitSeisu();
                if (right != null)
                    left=new BinaryExpr(left, right, op);
                else{
                    this._nowIndex = checkPoint;
                    return null;
                }
                nowToken = this._tokenList[this._nowIndex];
            }
            return left;
        }
        this._nowIndex = checkPoint;
        return null;
    }

    visitSeisu() {
        if (this._tokenList[this._nowIndex].tokenType == "num") {
            var expr = new ValueExpr(Number(this._tokenList[this._nowIndex].str));
            this._nowIndex++;
            return expr;
        }
        else return null;
    }

    doParse() {
        var resultText = document.getElementById("resultText");
        resultText.value= this.visitSiki().result();
    }



}

