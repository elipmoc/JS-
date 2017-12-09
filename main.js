//EBNF
/*

式
    :項 {("+"|"-") , 項 }
    ;

項
    : 関数呼び出し { ("*"|"/") , 関数呼び出し }
    ;

関数呼び出し
    : ( 識別子 , ( 因数 )+ ) | 因数
    ;

因数
    : ( "(" , 式 , ")" ) | 整数 
    ;

識別子
    : [a-z] , { alpha | [0-9] }
    ;

alpha
    : [a-z] | [A-Z]
    ;

整数
    : [0-9]+ 
    ;
*/


/*
新BNF考案

expr
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
    : '(' , expr , ')'
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
