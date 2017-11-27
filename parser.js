
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

class Parser{
    constructor(tokenList) {
        this._tokenList=tokenList;
        this._nowIndex=0;
    }

    visitValue() {
        if (this._tokenList[this._nowIndex].tokenType == "num") {
            var expr = new ValueExpr(Number(this._tokenList[this._nowIndex].str));
            this._nowIndex++;
            return expr;
        }
        else return null;
    }

    visitBinary() {
        var checkPoint = this._nowIndex;
        var left = this.visitValue();
        if (left != null) {
            if (this._nowIndex < this._tokenList.length &&
                this._tokenList[this._nowIndex].tokenType == "op") {
                var op = this._tokenList[this._nowIndex].str;
                this._nowIndex++;
                var right = this.visitValue();
                if (right != null)
                    return new BinaryExpr(left, right, op);
            }
            else left;
        }
        this._nowIndex = checkPoint;
        return null;
    }

    doParse() {
        var resultText = document.getElementById("resultText");
        resultText.value= this.visitBinary().result();
    }



}

