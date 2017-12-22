//関数型
//引数の数が合うまで遅延評価
class FuncType {
    constructor(funcInfo, argList) {
        this._funcInfo = funcInfo;

        if (argList != undefined)
            this._argList = argList.concat();
        else
            this._argList = new Array();
    }

    Do(arg) {
        if (this.needArgs == 0) {
            return this._funcInfo["body"](this._argList);
        }
        if (arg != undefined) {
            let newArgList = this._argList.concat();
            newArgList.push(arg);
            if (this._funcInfo["args"] - newArgList.length == 0)
                return this._funcInfo["body"](newArgList);
            return new FuncType(this._funcInfo, newArgList);
        }
        return new FuncType(this._funcInfo, this._argList);
    }

    get needArgs() {
        return this._funcInfo["args"] - this._argList.length;
    }
}

//リスト型
class ListType {

    constructor(array) {
        this._array = array;
        this._index = -1;
    }

    get() { return this._array[this._index]; }

    next() {
        this._index++;
        return this.array.length > this._index;
    }

    reset() { this._index = -1; }

}