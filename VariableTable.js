hscalc.VariableTable = class {
    constructor() {
        this._environment = new Array();
        this._environment.push({});
    }
    isExist(name) { return this._environment[this._environment.length - 1][name] }
    regist(name, value) { this._environment[this._environment.length - 1][name] = value; }
    pushEnvironment() { this._environment.push({}); }
    popEnvironment() { this._environment.pop(); }
};