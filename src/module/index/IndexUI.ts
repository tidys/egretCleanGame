class IndexUI extends eui.Component {
    private addGoldBtn:eui.Image;
    private addHeartBtn:eui.Image;

    public constructor() {
        super();
        this.skinName = "IndexUISkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        this.addGoldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //GH.showAd();

            new Tips().show("功能暂未开放");
        }, this);
        this.addHeartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //Director.getInstance().repleaceScene(new IndexScene());
            new Tips().show("功能暂未开放");
        }, this);
    }
}