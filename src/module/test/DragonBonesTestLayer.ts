class DragonBonesTestLayer extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.init();
    }

    private init() {
        var data = RES.getRes("Robot_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        var dragonFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(data));
        dragonFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

        var armature:dragonBones.Armature = dragonFactory.buildArmature("Robot");

        this.addChild(armature.display);
        armature.display.x = 200;
        armature.display.y = 300;
        armature.display.scaleX = armature.display.scaleY = 0.5;


        dragonBones.WorldClock.clock.add(armature);
        armature.animation.gotoAndPlay("run");

        egret.Ticker.getInstance().register(
            function (frameTime:number) {
                dragonBones.WorldClock.clock.advanceTime(0.01)
            }, this
        );
    }
}