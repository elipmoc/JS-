﻿/*
BNF

binaryExpr
    : addExpr
    ;

addExpr
    : mulExpr , { addOp,mulExpr}
    ;

mulExpr
    : funcCall , {mulOp,funcCall}
    ;

funcCall
    : funcName ,{funcName}
    ;

funcName
    : id | num | wrapExpr | arrayWrap | lambda
    ;

lambda
    : "\" , {id} , "->" , binaryExpr
    ;

arrayWrap
    :"[" , rangeArray|array, "]"
    ;

array
    : [binaryExpr,{ "," , binaryExpr }]
    ;

rangeArray
    : binaryExpr,binaryExpr..binaryExpr
    ;

addOp
    : '+' | '-'
    ;

mulOp
    : '*' | '/'
    ;

id
    : [a-z] , { [a-z] | [A-Z] | [0-9]}
    ;

num
    : [0-9]+
    ;

wrapExpr
    : '(' , binaryExpr , ')'
    ;
*/

//hscalcライブラリのロード
hscalc.load();
let graph;
window.onload = () => {
    graph = new Graph("myCanvas");
    graph.setScale(1, 1);
};

//トークンの出力
function TokenListPrint(tokenList) {
    let tokenText = document.getElementById("tokenText");
    tokenText.value = "";
    tokenList.forEach(item => {
        tokenText.value += item.tokenType + " : " + item.str + "\r\n";
    });
}

function start() {
    graph.reset();
    let lexerRet = hscalc.lexer(document.getElementById("inputText").value);
    TokenListPrint(lexerRet.tokenList);
    if (lexerRet.errorFlag) {
        document.getElementById("resultText").value = "トークンエラー";
        return;
    }
    let parser = new hscalc.Parser(lexerRet.tokenList, graph.extendGraphFunc);
    document.getElementById("resultText").value =
        parser.doParse();
    graph.update();
}
