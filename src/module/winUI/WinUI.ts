class WinUI extends eui.Component {
    private numLabel:eui.BitmapLabel;
    private star1:eui.Image;
    private star2:eui.Image;
    private star3:eui.Image;

    private btn1Bg:eui.Image;
    private btn2Bg:eui.Image;
    private btn3Bg:eui.Image;

    private star:number = 0;

    public constructor(star) {
        super();
        this.skinName = "WinUISkin";
        this.star = star;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        SoundsMgr.win();
    }

    private addStage() {
        this.btn1Bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn1, this);
        this.btn2Bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn2, this);
        this.btn3Bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn3, this);
        this.init();
        this.saveData();
        this.initStar();
    }

    private initStar() {
        var arr = [this.star1, this.star2, this.star3];
        for (var k in arr) {
            arr[k].visible = false;
        }
        for (var i = 0; i < this.star; i++) {
            arr[i].visible = true;
        }
    }

    private saveData() {
        PlayerData.saveLv(GameData.enterLv + 1);
    }

    private init() {
        this.numLabel.text = GameData.curScore.toString();
    }

    // 主页
    private clickBtn1() {
        SceneMgr.gotoIndex();
    }

    // 重玩
    private clickBtn2() {
        SceneMgr.rePlayLv();
    }

    // 下一关
    private clickBtn3() {
        GameData.initLvData(GameData.enterLv + 1);
        SceneMgr.gotoGame();

    }
}