/*
haskellならこうかけるのに！！！！
data Kind = AnyType|WrapKind Kind | Kind Kind Kind
*/


//何かの型を表すクラス
hscalc.AnyType = class {
    constructor() {
    }
    isAnyType() { return true; }
    isWrapKind() { return false; }
}

//kindを（）したもの
hscalc.WrapKind = class {
    constructor(kind) {
        this._kind = kind;
    }
    isAnyType() { return false; }
    isWrapKind() { return true; }
    get kind() { return kind; }
}

//型Kindを保持するクラス
hscalc.Kind = class {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    isAnyType() { return false; }
    isWrapKind() { return false; }
    get left() { return this._left; }
    get right() { return this._right; }
}

/*
//Kindのleftを落とす
hscalc.dropLeftKind = (kind) => {
    if (kind.right.isAnyType() || kind.right.isWrapKind()) {
        return kind.right;
    }
    new hscalc.kind(kind.right.left, kind.right.right);
}*/

//KindまたはAnyTypeまたはWrapKindを結合して新たなKindを生成する
hscalc.concatKindOrType = (a, b) => {
    return new hscalc.kind(a, b);
}

//aとbがマッチするかチェックする
hscalc.matchCheck = (a, b) => {
    if (a.isAnyType()) {
        if (b.isAnyType())
            return true;
        if (b.isWrapKind()) {
            return hscalc.matchCheck(a, b.kind);
        }
        return false;
    }

    if (a.isWrapKind()) {
        if (b.isAnyType())
            return true;
        if (b.isWrapKind()) {
            return hscalc.matchCheck(a.kind, b.kind);
        }
        hscalc.matchCheck(a.kind, b);
    }

    if (b.isAnyType())
        return true;
    if (b.isWrapKind())
        return hscalc.matchCheck(a, b.kind);
    return hscalc.matchCheck(a.left, b.left) && hscalc.matchCheck(a.right, b.right);
}

//aをbに関数適応した時の結果の型を得る
hscalc.applyKind = (a, b) => {
    if (b.isAnyType())
        return undefined;
    if (b.isWrapKind())
        return hscalc.applyKind(a, b.kind);

    if (hscalc.matchCheck(a, b.left)) {
        return b.right;
    }

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