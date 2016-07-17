class Logoin extends eui.Component {
    private beganBtn:eui.Image;
    private treeGroup:eui.Group;


    public constructor() {
        super();
        this.skinName = "LogoinSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        this.initDB();
        this.beganBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegan, this);

        var tw = egret.Tween.get(this.beganBtn, {loop: true});
        tw.to({scaleX: 0.8, scaleY: 0.8}, 1000).to({scaleX: 1, scaleY: 1}, 1000);
    }

    private initDB() {
        var data = RES.getRes("tree_json");
        var textureData = RES.getRes("textureTree_json");
        var texture = RES.getRes("textureTree_png");
        var dragonFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(data));
        dragonFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

        var armature:dragonBones.Armature = dragonFactory.buildArmature("Armature");

        this.treeGroup.addChild(armature.display);
        armature.display.x = 150;
        armature.display.y = 200;


        dragonBones.WorldClock.clock.add(armature);
        armature.animation.gotoAndPlay("run", -1, -1, 0);

        egret.Ticker.getInstance().register(
            function (frameTime:number) {
                dragonBones.WorldClock.clock.advanceTime(0.01)
            }, this);
    }

    private onBegan() {
        SoundsMgr.playBtn();
        SceneMgr.gotoIndex();
    }
}