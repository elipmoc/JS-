

function scriptload(scriptName) {
    let head = document.getElementsByTagName("body");
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", scriptName);
    head[0].insertBefore(script, head[0].firstChild);
}

function load() {
    scriptload("originalTypes.js");
    scriptload("intrinsicFuncTable.js");
    scriptload("operatorTable.js");
    scriptload("lexer.js")
    scriptload("parser.js");
}