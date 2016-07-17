class FishScene extends eui.Component {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        var fish = new Fish();
        fish.x = 0;
        fish.y = 0;
        fish.swimming();
        this.addChild(fish);

        this.initBg();
        this.initCannon();
    }

    private initBg() {
        var bg = new eui.Image("scenebg1_jpg");
        bg.width = Display.winSize.width;
        bg.height = Display.winSize.height;
        this.addChild(bg);
    }

    private initCannon() {

    }
}
