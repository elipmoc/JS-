//組み込み関数の実装
hscalc.IntrinsicFuncTable = class {
    constructor() {
        this._funcArray =
            {
                "max": { "body": (a) => { return a[0] > a[1] ? a[0] : a[1]; }, "args": 2 }
                , "min": { "body": (a) => { return a[0] > a[1] ? a[1] : a[0]; }, "args": 2 }
                , "and": { "body": (a) => { return a[0] && a[1]; }, "args": 2 }
                , "or": { "body": (a) => { return a[0] || a[1]; }, "args": 2 }
                , "mod": { "body": (a) => { return a[0] % a[1]; }, "args": 2 }
                , "equal": { "body": (a) => { return a[0] == a[1]; }, "args": 2 }
                , "if": { "body": (a) => { return a[0] ? a[1] : a[2]; }, "args": 3 }
                , "flip": { "body": (a) => { return a[0].Do(a[2]).Do(a[1]); }, "args": 3 }
                , "sub": { "body": (a) => { return a[0] - a[1]; }, "args": 2 }
                , "add": { "body": (a) => { return a[0] + a[1]; }, "args": 2 }
                , "mul": { "body": (a) => { return a[0] * a[1]; }, "args": 2 }
                , "div": { "body": (a) => { return a[0] / a[1]; }, "args": 2 }
                , "minus": { "body": (a) => { return -a[0]; }, "args": 1 }
                , "pi": { "body": (a) => { return Math.PI; }, "args": 0 }
                , "pow": { "body": (a) => { return Math.pow(a[0], a[1]); }, "args": 2 }
                , "sin": { "body": (a) => { return Math.sin(a[0]); }, "args": 1 }
                , "cos": { "body": (a) => { return Math.cos(a[0]); }, "args": 1 }
                , "tan": { "body": (a) => { return Math.tan(a[0]); }, "args": 1 }
                , "abs": { "body": (a) => { return Math.abs(a[0]); }, "args": 1 }
                , "true": { "body": (a) => { return true; }, "args": 0 }
                , "false": { "body": (a) => { return false; }, "args": 0 }
                , "not": { "body": (a) => { return !a[0]; }, "args": 1 }
                , "map": { "body": (a) => { return new hscalc.MapListType(a[1], a[0]); }, "args": 2 }
                , "show": { "body": (a) => { return a[0].show(); }, "args": 1 }
                , "alert": { "body": (a) => { alert(a[0]); return a[0]; }, "args": 1 }
                , "evalList": {
                    "body": (a) => {
                        while (a[0].next())
                            a[0].get();
                        a[0].reset();
                        return null;
                    }, "args": 1
                }
                , "fold": {
                    "body": (a) => {
                        let temp = undefined;
                        if (a[1].next()) {
                            temp = a[1].get();
                            while (a[1].next()) {
                                temp = a[0].Do(temp).Do(a[1].get());
                            }
                        }
                        a[1].reset();
                        return temp;
                    }, "args": 2
                }
                , "concat": {
                    "body": (a) => {
                        let temp;
                        let array = new Array();
                        while (a[0].next()) {
                            temp = a[0].get();
                            while (temp.next()) {
                                array.push(temp.get());
                            }
                            temp.reset();
                        }
                        a[0].reset();
                        return new hscalc.ListType(array);
                    }, "args": 1
                }
                , "zip": {
                    "body": (a) => {
                        let array = new Array();
                        while (a[0].next() && a[1].next()) {
                            array.push(new hscalc.ListType([a[0].get(), a[1].get()]));
                        }
                        a[0].reset();
                        a[1].reset();
                        return new hscalc.ListType(array);
                    }, "args": 2
                }
                , "zipWith": {
                    "body": (a) => {
                        let array = new Array();
                        while (a[1].next() && a[2].next()) {
                            array.push(
                                a[0].Do(a[1].get())
                                    .Do(a[2].get())
                            );
                        }
                        a[1].reset();
                        a[2].reset();
                        return new hscalc.ListType(array);
                    }, "args": 3
                }
                , "head": {
                    "body": (a) => {
                        if (a[0].next()) {
                            let x = a[0].get();
                            a[0].reset();
                            return x;
                        }
                        return null;
                    }, "args": 1
                }
                , "length": {
                    "body": (a) => {
                        let count = 0;
                        while (a[0].next()) {
                            count++;
                        }
                        a[0].reset();
                        return count;
                    }, "args": 1
                }
                , "merge": {
                    "body": (a) => {
                        return new
                            hscalc.FuncType(
                            {
                                "body": (b) => { return a[0].Do(a[1].Do(b[0])); }, "args": 1
                            }
                            );
                    }
                    , "args": 2
                }
                , "ycomb": {
                    "body": (f) => {
                        return (a => a.Do(a))(
                            new hscalc.FuncType(
                                {
                                    "body": a => f[0].Do(
                                        new hscalc.FuncType(
                                            {
                                                "body": (x) => { return a[0].Do(a[0]).Do(x[0]); }, "args": 1
                                            }
                                        )
                                    ),
                                    "args": 1
                                }));
                    }
                    , "args": 1
                }
            };
    }

    extend(extendIntrinsicFunc) {
        for (let key in extendIntrinsicFunc) {
            this._funcArray[key] = extendIntrinsicFunc[key];
        }
    }

    getFuncInfo(funcName) {
        if (funcName in this._funcArray)
            return this._funcArray[funcName];
        return null;
    }
};
