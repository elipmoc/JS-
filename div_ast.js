
//型Kindを保持するクラス
class Kind {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    get Left() { return this._left; }
    get Right() { return this._right; }
}


//数値を表すAST 
class ValueAst {
    constructor() {
        this._kind = new Kind();
    }
    get Kind() { return this._kind; }
}

//関数名を表すAST
class FuncNameAst {
    get Kind() { }
}

//関数に値を1つ適応するAST
class FuncCallAst {
    get Kind() { }
}

//二項演算子のAST
class BinaryAst {
    get Kind() { }

}

//リストを表すAST
class ListAst {
    get Kind() { }

}

//数列表記（範囲指定）リストを表すAST
class RangeListAst {
    get Kind() { }

}