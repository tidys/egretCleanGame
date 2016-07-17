class Cell extends egret.Sprite {
    public static CellWidth = 60;
    public static CellHeight = 60;
    public id = 0;
    public row = 0;
    public column = 0;
    public moveFlag:boolean = false;
    public checkFlag:boolean = false;// 检查标志
    private sprite:eui.Image = null;


    private isAction:boolean = false;
    public isSelected:boolean = false;

    public constructor(id) {
        super();
        this.id = id;
        this.sprite = new eui.Image();
        this.addChild(this.sprite);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        this.init();
        //this.initTouch();

    }

    public init() {
        var idpng = ["1_png", "2_png", "3_png", "4_png", "5_png",];
        idpng = ["game_Apple_png", "game_Blueberry_png",
            "game_Grape_png", "game_Lemon_png", "game_Watermelon_png"];
        var res = idpng[this.id - 1];
        var texture = RES.getRes(res);
        if (texture) {
            this.width = Cell.CellWidth;//texture.textureWidth;
            this.height = Cell.CellHeight;// texture.textureHeight;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;

            this.sprite.source = texture;
            this.sprite.width = Cell.CellWidth;
            this.sprite.height = Cell.CellHeight;
            this.sprite.anchorOffsetX = this.sprite.width / 2;
            this.sprite.anchorOffsetY = this.sprite.height / 2;
            this.sprite.x = this.width / 2;
            this.sprite.y = this.height / 2;
        }
    }

    private initTouch() {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
    }

    private onBegan() {
        egret.log("Cell Touch Began");
    }

    // 提示动作
    public noticeAction() {
        egret.Tween.removeTweens(this);
        var tw = egret.Tween.get(this, {loop: true});
        tw.to({scaleX: 0.8, scaleY: 0.8}, 300)
            .to({scaleX: 1, scaleY: 1}, 300);
    }

    public setSelect(b) {
        if (this.isSelected != b) {
            this.isSelected = b;
            if (b) {
                // 选中状态
                this.runSelectedAni();
            } else {
                // 非选中状态

            }
        }
    }

    private runSelectedAni() {
        if (this.isAction == false) {
            this.isAction = true;
            SoundsMgr.clickCell();
            egret.Tween.removeTweens(this);
            var tw = egret.Tween.get(this);
            tw.to({scaleX: 0.8, scaleY: 1.3}, 100, egret.Ease.bounceIn)
                .to({scaleX: 1.1, scaleY: 1}, 100, egret.Ease.bounceOut)
                .to({scaleX: 1, scaleY: 1}, 100, egret.Ease.backIn)
                .call(function () {
                    this.isAction = false;
                }, this);
        }
    }

    private onMove() {

    }

    private onEnd() {

    }

    public clean() {
        Util.removeByElements(CellMgr.cleanList, this);
        CellMgr.cleanCell(this);

        var tw = egret.Tween.get(this);
        tw.to({scaleX: 0.4, scaleY: 0.4}, 200)
            .call(function () {
                this.sendCleanOverEvent();
            }, this)
            .wait(50)
            .call(function (args) {
                if (this.parent) {
                    this.parent.removeChild(this);
                } else {
                    egret.log("no parent");
                }
            }, this, [this]);

    }

    private sendCleanOverEvent() {
        var event:GameEvent = new GameEvent(GameEvent.CleanOver);
        this.dispatchEvent(event);
    }

    private getDistance(began, end):number {
        var disX = Math.pow(end.x - began.x, 2);
        var disY = Math.pow(end.y - began.y, 2);
        var dis = Math.sqrt(disX + disY);
        return dis;
    }

    private moveSpeed:number = 400;

    public drop(row, column) {
        var x = CellMgr.getCellPosX(column);
        var y = CellMgr.getCellPosY(row);


        var dis = this.getDistance({x: this.x, y: this.y}, {x: x, y: y});
        var time = (dis / this.moveSpeed) * 1000;

        this.moveFlag = true;
        CellMgr.setCell(this, row, column);
        var tw = egret.Tween.get(this);
        tw.to({x: x, y: y}, time, egret.Ease.bounceOut).call(function () {
            this.moveFlag = false;
            this.sendDropOverEvent();
        }, this);

    }

    private sendDropOverEvent() {
        var event:GameEvent = new GameEvent(GameEvent.DropOver);
        this.dispatchEvent(event);
    }


}
