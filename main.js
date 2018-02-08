/*
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
    graph =
        new Graph(document.getElementById("canvasFrame").contentWindow
            .document.getElementById("myCanvas"));
    const scaleTextBox = document.getElementById("scaleTextBox");
    scaleTextBox.oninput = (e) => {
        let scale = Number(scaleTextBox.value);
        graph.setScale(scale, scale);
        graph.update();
    };
    const minXTextBox = document.getElementById("minXTextBox");
    const maxXTextBox = document.getElementById("maxXTextBox");
    const minYTextBox = document.getElementById("minYTextBox");
    const maxYTextBox = document.getElementById("maxYTextBox");
    minXTextBox.oninput = (e) => {
        graph.setMinX(minXTextBox.value);
        start();
    };
    maxXTextBox.oninput = (e) => {
        graph.setMaxX(maxXTextBox.value);
        start();
    };
    minYTextBox.oninput = (e) => {
        graph.setMinY(minYTextBox.value);
        start();
    };
    maxYTextBox.oninput = (e) => {
        graph.setMaxY(maxYTextBox.value);
        start();
    };
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
