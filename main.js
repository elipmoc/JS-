/*
BNF

Binaryexpr
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
    : id | num |wrapExpr
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

function start() {
    let  lexerRet=lexer();
    if (lexerRet == null) {
        document.getElementById("resultText").value = "トークンエラー";
        return;
    }
    var parser = new Parser(lexerRet);
    parser.doParse();
}
