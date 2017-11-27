class Token {
    constructor(tokenType, str) {
        this._str = str;
        this._tokenType = tokenType;
    }

    get str() { return this._str; }
    get tokenType() { return this._tokenType;}
}


function test() {
    var inputText = document.getElementById("inputText").value;
    var numRe = /^[0-9]+/g;
    var hoge=numRe.exec(inputText);
    document.getElementById("resultText").value = hoge 
    document.getElementById("resultText").value += "length:"+hoge[0].length;
}

function lexer() {
    var inputText = document.getElementById("inputText").value;
    var tokenList = new Array();
    var numRe = /^[0-9]+/;
    var opRe = /^[\+\-\*\/]/;
    var temp;
    while (true) {
        temp = numRe.exec(inputText);
        if (temp != null) {
            inputText = inputText.substr(temp[0].length);
            tokenList.push(new Token("num", temp[0]));
            continue;
        }
        temp = opRe.exec(inputText);
        if (temp != null) {
            inputText = inputText.substr(temp[0].length);
            tokenList.push(new Token("op", temp[0]));
            continue;
        }
        break;
    }
    TokenListPrint(tokenList);
    return tokenList;
}

function TokenListPrint(tokenList) {
    var tokenText = document.getElementById("tokenText");
    tokenText.value = "";
    tokenList.forEach(item=> {
        tokenText.value += item.tokenType+" : "+item.str+"\r\n";
    });
}