﻿//組み込み演算子を定義しておくテーブル
class OperatorTable {
    constructor() {
        this._opArray = [
            {
                "name": "$", "body": (a, b) => {
                    return a.Do(b);
                }, "associative": "right", "opType": "infix"
            }
            , { "name": "||", "body": (a, b) => { return a || b; }, "associative": "left", "opType": "infix" }
            , { "name": "&&", "body": (a, b) => { return a && b; }, "associative": "left", "opType": "infix" }
            , { "name": "+", "body": (a, b) => { return a + b; }, "associative": "left","opType":"infix" }
            , { "name": "-", "body": (a, b) => { return a - b; }, "associative": "left", "opType": "infix" }
            , { "name": "*", "body": (a, b) => { return a * b; }, "associative": "left", "opType": "infix" }
            , { "name": "/", "body": (a, b) => { return a / b; }, "associative": "left", "opType": "infix" }
            , { "name": "^", "body": (a, b) => { return Math.pow(a, b); }, "associative": "right", "opType": "infix" }
            ,{
                "name": ".", "body": (a,b) => {
                    return new
                        FuncType(
                            {
                                "body": (c) => { return a.Do(b.Do(c[0])); }, "args": 1
                            }
                        );
                }, "associative": "right", "opType": "infix"
            }
        ]
    }

    getLength() {
        return this._opArray.length;
    }

    getAt(index) {
        return this._opArray[index];
    }

    getOpInfo(opName) {
        this._opArray.forEach((op) => { 
            if (op["name"] == opName)
                return op;
            });
        return null;
    }
}