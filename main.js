//EBNF
/*

式
    :項 {("+"|"-") , 項 }
    ;

項
    : 因数 { ("*"|"/") , 因数 }
    ;

因数
    : 整数 | ( "(" , 式 , ")" )
    ;

整数
    : [0-9]+ 
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
