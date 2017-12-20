class Token {
    constructor(tokenType, str) {
        this._str = str;
        this._tokenType = tokenType;
    }

    get str() { return this._str; }
    get tokenType() { return this._tokenType; }
}

function lexer() {
    var inputText = document.getElementById("inputText").value;
    var tokenList = new Array();
    var numRe = /^[0-9]+/;
    var opRe = /^[\+\-\*\/÷×＊\.$\^]|^(&&)|^(\|\|)/;
    var simbolRe = /^[()]/;
    var identifierRe = /^[a-z]([a-z]|[A-Z]|[0-9])*/;
    var skipRe = /^ /;
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
        temp = simbolRe.exec(inputText);
        if (temp != null) {
            inputText = inputText.substr(temp[0].length);
            tokenList.push(new Token("simbol", temp[0]));
            continue;
        }
        temp = identifierRe.exec(inputText);
        if (temp != null) {
            inputText = inputText.substr(temp[0].length);
            tokenList.push(new Token("identifier", temp[0]));
            continue;
        }
        temp = skipRe.exec(inputText);
        if (temp != null) {
            inputText = inputText.substr(temp[0].length);
            continue;
        }
        break;
    }
    TokenListPrint(tokenList);
    if (inputText.length != 0) {
        return null;
    }
    return tokenList;
}

function TokenListPrint(tokenList) {
    var tokenText = document.getElementById("tokenText");
    tokenText.value = "";
    tokenList.forEach(item => {
        tokenText.value += item.tokenType + " : " + item.str + "\r\n";
    });
}