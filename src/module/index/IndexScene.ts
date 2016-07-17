class IndexScene extends eui.Component {
    private prePoint:egret.Point = new egret.Point();
    private scroller:eui.Scroller;
    private list:eui.List;

    private indexUI;

    public constructor() {
        super();
        this.indexUI = new IndexUI();
        this.addChild(this.indexUI);

        this.skinName = "IndexSceneSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);

    }

    private addStage() {
        this.initData();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegan, this);
        return;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    }

    private initData() {
        this.list.addChild(new IndexGroup());

        //滚动到屏幕可见区域
        var arr = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 256,
            "5": 559,
            "6": 778,
            "7": 1000,
            "8": 1284,
            "9": 1461,
            "10": 1617,
            "11": 1640,
            "12": 1640,
            "13": 1640
        };
        this.list.scrollV = arr[PlayerData.data.fightLv.toString()];
    }

    private onBegan(touch:egret.TouchEvent) {
        this.prePoint.x = touch.stageX;
        this.prePoint.y = touch.stageY;
    }

    private onMove(touch:egret.TouchEvent) {
        var x = touch.stageX;
        var y = touch.stageY;

        var diffy = 0;

        this.prePoint.x = x;
        this.prePoint.y = y;
    }


    private onEnd(touch:egret.TouchEvent) {
        this.prePoint.x = touch.stageX;
        this.prePoint.y = touch.stageY;
    }

}