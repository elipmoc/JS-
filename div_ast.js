
//型Kindを保持するクラス
hscalc.Kind = class {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    get Left() { return this._left; }
    get Right() { return this._right; }
}


//数値を表すAST 
hscalc.ValueAst = class {


    constructor(value) {
        this._value = value;
        this._kind = new Kind();
    }
    get Kind() { return this._kind; }
    get Value() { return this._value; }
}

//関数名を表すAST
hscalc.FuncNameAst = class {
    get Kind() { }
}

//関数に値を1つ適応するAST
hscalc.FuncCallAst = class {
    get Kind() { }
}

//二項演算子のAST
hscalc.BinaryAst = class {
    get Kind() { }

}

//リストを表すAST
hscalc.ListAst = class {
    get Kind() { }

}

//数列表記（範囲指定）リストを表すAST
hscalc.RangeListAst = class {
    get Kind() { }

}