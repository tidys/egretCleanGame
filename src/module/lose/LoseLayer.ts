class LoseLayer extends eui.Component {
    private btnAgain:eui.Image;
    private closeBtn:eui.Image;

    public constructor() {
        super();
        this.skinName = "LoseLayerSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        SoundsMgr.lose();
    }

    private addStage() {
        this.btnAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgain, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    }

    private onAgain() {
        SceneMgr.rePlayLv();
    }

    private onClose() {
        Director.getInstance().repleaceScene(new IndexScene());
    }
}