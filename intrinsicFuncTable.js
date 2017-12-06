//�g�ݍ��݊֐���o�^���Ă����e�[�u��
class IntrinsicFuncTable {
    constructor() {
        this._funcArray =
            {
                "max": { "body": (a) => { return a[0] > a[1] ? a[0] : a[1] }, "args": 2 }
                , "min": { "body": (a) => { return a[0] > a[1] ? a[1] : a[0] }, "args": 2 }
            }
    }

    //�}�b�`����֐���Ԃ�
    match(funcName, args) {
        if (funcName in this._funcArray) {
            let funcInfo = this._funcArray[funcName];
            if (funcInfo["args"] == args) {
                return funcInfo["body"];
            }
        }
        return null;
    }
}