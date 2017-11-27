function start() {
    var parser = new Parser(lexer());
    parser.doParse();
}
