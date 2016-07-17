class GameEnterDlg extends eui.Component {
    private closeBtn:eui.Button;
    private descLabel:eui.Label;
    private goImg:eui.Image;
    private lvLabel:eui.Label;
    private lv;

    public constructor(lv) {
        super();
        this.lv = lv;
        this.skinName = "GameEnterDlgSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.initData();
    }

    private addStage() {
        this.goImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGo, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    }

    private onClose() {
        SoundsMgr.playBtn();
        Director.getInstance().popScene();
    }

    private initData() {
        this.lvLabel.text = this.lv.toString();

        var data = CfgFileMgr.getLvCfgDatayId(this.lv);
        if (data) {
            var str = "在" + data["step"] + "步之内达到" + data["score"] + "分";
            this.descLabel.text = str;
        }
    }

    private onGo() {
        SoundsMgr.playBtn();
        GameData.initLvData(this.lv);
        SceneMgr.gotoGame();
    }
}