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

function start() {
    let  lexerRet=lexer();
    if (lexerRet == null) {
        document.getElementById("resultText").value = "トークンエラー";
        return;
    }
    var parser = new Parser(lexerRet);
    parser.doParse();
}
