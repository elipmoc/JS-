
//何かの型を表すクラス
hscalc.AnyType = class {
    constructor(left, right) {
    }

    isAnyType() { return true; }
}

//型Kindを保持するクラス
hscalc.Kind = class {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    isAnyType() { return false; }
    get left() { return this._left; }
    get right() { return this._right; }
}

//Kindのleftを落とす
hscalc.dropLeftKind = (kind) => {
    if (kind.right.isAnyType()) {
        return kind.right;
    }
    new hscalc.kind(kind.right.left, kind.right.right);
}

//KindまたはAnyTypeを結合して新たなKindを生成する
hscalc.concatKindOrType = (a, b) => {
    return new hscalc.kind(a, b);
}

//数値を表すAST 
hscalc.ValueAst = class {


    constructor(value) {
        this._value = value;
        this._kind = new hscalc.AnyType();
    }
    get kind() { return this._kind; }
    get value() { return this._value; }
}

//関数名を表すAST
hscalc.FuncNameAst = class {
    get kind() { }
}

//関数に値を1つ適応するAST
hscalc.FuncCallAst = class {
    get kind() { }
}

//二項演算子のAST
hscalc.BinaryAst = class {
    get kind() { }

}

//リストを表すAST
hscalc.ListAst = class {
    get kind() { }

}

//数列表記（範囲指定）リストを表すAST
hscalc.RangeListAst = class {
    get kind() { }

}