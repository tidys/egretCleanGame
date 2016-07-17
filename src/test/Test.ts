class Test extends eui.Component {
    private btn:eui.Button;
    private label:eui.Label;

    public constructor() {
        super();
        this.skinName = "TestSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        this.btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtn, this);
        //this.initMusic();


    }

    private initMusic() {
        var music:egret.Sound = RES.getRes("bg_mp3");
        if (music) {
            music.play(0, 1);
        }

    }

    private onBtn() {
        this.label.strokeColor = 0x00ff00;
        this.label.stroke = 1;

        var music:egret.Sound = RES.getRes("bg_mp3");
        if (music) {
            music.play(0, 1);
        }
    }
}