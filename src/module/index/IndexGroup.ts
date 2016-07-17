class IndexGroup extends eui.Component {

    private btn1:IndexButton;
    private btn2:IndexButton;
    private btn3:IndexButton;
    private btn4:IndexButton;
    private btn5:IndexButton;
    private btn6:IndexButton;
    private btn7:IndexButton;
    private btn8:IndexButton;
    private btn9:IndexButton;
    private btn10:IndexButton;
    private btn11:IndexButton;
    private btn12:IndexButton;
    private btn13:IndexButton;

    public constructor() {
        super();
        this.skinName = "IndexGroupSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {

        var buttonArr = [this.btn1, this.btn2, this.btn3, this.btn4, this.btn5, this.btn6,
            this.btn7, this.btn8, this.btn9, this.btn10, this.btn11, this.btn12, this.btn13];
        for (var k in buttonArr) {
            var itemBtn = buttonArr[k];
            itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        }
    }

    private clickBtn(touch:egret.TouchEvent) {
        SoundsMgr.playBtn();
        var btn:IndexButton = touch.currentTarget;
        var lv = btn.lv;
        if (lv <= parseInt(PlayerData.data.fightLv)) {
            Director.getInstance().pushScene(new GameEnterDlg(lv));
        } else {
            new Tips().show("不能进入");
        }
    }
}