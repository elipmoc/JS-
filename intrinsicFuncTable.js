//組み込み関数を登録しておくテーブル
class IntrinsicFuncTable {
    constructor() {
        this._funcArray =
            {
                "max": { "body": (a) => { return a[0] > a[1] ? a[0] : a[1] }, "args": 2 }
                , "min": { "body": (a) => { return a[0] > a[1] ? a[1] : a[0] }, "args": 2 }
                , "equal": { "body": (a) => { return a[0] == a[1] }, "args": 2 }
                , "if": { "body": (a) => { return a[0] ? a[1] : a[2] }, "args": 3 }
            }
    }

    //マッチする関数を返す
    match(funcName, args) {
        if (funcName in this._funcArray) {
            let funcInfo = this._funcArray[funcName];
            if (funcInfo["args"] == args) {
                return funcInfo["body"];
            }
        }
        return null;
    }

    getFuncInfo(funcName) {
        if (funcName in this._funcArray)
            return  this._funcArray[funcName];
        return null;
    }
}