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

function listShow(list) {
    let str = "[";
    while (list.next()) {
        str += String(list.get()) + ",";
    }
    list.reset();
    if (str.length != 1)
        str = str.substr(0, str.length - 1);
    return str + "]";
}

//リスト型
class ListType {

    constructor(array) {
        this._array = array;
        this._index = -1;
    }

    get() { return this._array[this._index].result(); }

    next() {
        this._index++;
        return this._array.length > this._index;
    }

    reset() { this._index = -1; }

    show() {
        return listShow(this);
    }
}

class MapListType {

    constructor(list, f) {
        this._list = list;
        this._f = f;
    }

    get() { return this._f.Do(this._list.get()); }

    next() {
        return this._list.next();
    }

    reset() { this._list.reset(); }

    show() {
        return listShow(this);
    }
}

class RangeListType {
    constructor(first, second, end) {
        this._delta = second - first;
        this._now = first - this._delta;
        this._init = this._now;
        this._end = end;
    }

    get() { return this._now; }

    next() {
        this._now += this._delta;
        if (this._delta > 0 && this._end >= this._now)
            return true;
        if (this._delta < 0 && this._end <= this._now)
            return true;
        return false;
    }

    reset() { this._now = this._init; }

    show() {
        return listShow(this);
    }
}
