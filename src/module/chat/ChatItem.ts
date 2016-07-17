class ChatItem extends eui.Component {
    private wordLabel:eui.Label;

    public constructor(word) {
        super();
        this.skinName = "ChatItemSkin";
        this.wordLabel.text = word.toString();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {

    }

}