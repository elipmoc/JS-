//EBNF
/*

®
    :€ {("+"|"-") , € }
    ;

€
    : ®” { ("*"|"/") , ®” }
    ;

®”
    : [0-9]+ 
    ;
*/

function start() {
    var parser = new Parser(lexer());
    parser.doParse();
}
