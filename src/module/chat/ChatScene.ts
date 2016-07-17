class ChatScene extends eui.Component {
    private group:eui.Group;
    private inputWord:eui.TextInput;
    private sendBtn:eui.Button;

    public constructor() {
        super();
        this.skinName = "ChatSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSend, this);
    }

    private onSend() {
        var word = this.inputWord.text;
        if (word) {
            var sendData = {word: word};
            Net.getInstance().sendHttpRequest(NetMsg.arr.chat.send, sendData);
        }
    }
}