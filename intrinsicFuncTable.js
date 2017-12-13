//組み込み関数を登録しておくテーブル
class IntrinsicFuncTable {
    constructor() {
        this._funcArray =
            {
                "max": { "body": (a) => { return a[0] > a[1] ? a[0] : a[1] }, "args": 2 }
                , "min": { "body": (a) => { return a[0] > a[1] ? a[1] : a[0] }, "args": 2 }
                , "equal": { "body": (a) => { return a[0] == a[1] }, "args": 2 }
                , "if": { "body": (a) => { return a[0] ? a[1] : a[2] }, "args": 3 }
                , "flip": { "body": (a) => {return a[0].Do(a[2]).Do(a[1]); }, "args": 3 }
                , "sub": { "body": (a) => { return a[0] - a[1]; }, "args": 2 }
                , "add": { "body": (a) => { return a[0] + a[1]; }, "args": 2 }
                , "mul": { "body": (a) => { return a[0] * a[1]; }, "args": 2 }
                , "div": { "body": (a) => { return a[0] / a[1]; }, "args": 2 }
                , "minus": { "body": (a) => { return -a[0]; }, "args": 1 }
                , "pi": { "body": (a) => { return Math.PI; }, "args": 0 }
                , "pow": { "body": (a) => { return Math.pow(a[0],a[1]); }, "args": 2 }
                , "sin": { "body": (a) => { return Math.sin(a[0]); }, "args": 1 }
                , "cos": { "body": (a) => { return Math.cos(a[0]); }, "args": 1 }
                , "tan": { "body": (a) => { return Math.tan(a[0]); }, "args": 1 }
                , "abs": { "body": (a) => { return Math.abs(a[0]); }, "args": 1 }
                , "true": { "body": (a) => { return true; }, "args": 0 }
                , "false": { "body": (a) => { return false; }, "args": 0 }
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