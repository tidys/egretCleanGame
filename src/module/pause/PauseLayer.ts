class PauseLayer extends eui.Component {
    private btn1:eui.Button;
    private btn2:eui.Button;
    private btn3:eui.Button;

    public constructor() {
        super();
        this.skinName = "PauseLayerSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundsMgr.playBtn();
            // 回到游戏
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }, this);
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundsMgr.playBtn();
            // 重新开始
            SceneMgr.rePlayLv();
        }, this);
        this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundsMgr.playBtn();
            //退出
            Director.getInstance().repleaceScene(new IndexScene());

        }, this);
    }
}