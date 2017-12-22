/*
BNF

BinaryExpr
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
    : id | num | wrapExpr | array
    ;

array
    : "[" , [BinaryExpr,{ "," , BinaryExpr }] , "]"
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
load();

//トークンの出力
function TokenListPrint(tokenList) {
    let tokenText = document.getElementById("tokenText");
    tokenText.value = "";
    tokenList.forEach(item => {
        tokenText.value += item.tokenType + " : " + item.str + "\r\n";
    });
}

function start() {
    let lexerRet = lexer(document.getElementById("inputText").value);
    TokenListPrint(lexerRet.tokenList);
    if (lexerRet.errorFlag) {
        document.getElementById("resultText").value = "トークンエラー";
        return;
    }
    let parser = new Parser(lexerRet.tokenList);
    document.getElementById("resultText").value =
        parser.doParse();
}
