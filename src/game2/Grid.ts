class Grid extends egret.Sprite {
    public static width = 60;
    public static height = 60;
    private _numLabel:eui.Label;
    private _bg:egret.Sprite;

    public checkFlag:boolean = false;
    public moveFlag:boolean = false;
    public isHeightLight:boolean = false;
    public num = 0;
    public row:number = 0;
    public column:number = 0;

    public constructor(row, column) {
        super();
        this.row = row;
        this.column = column;

        this.width = Grid.width;
        this.height = Grid.height;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.init();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    }

    private init() {
        this._bg = new egret.Sprite();
        this.addChild(this._bg);

        this._numLabel = new eui.Label();
        this._numLabel.touchEnabled = false;
        this.addChild(this._numLabel);
    }

    private resetColor() {
        var color = GameAddOneCfg.colorArray[this.num - 1];
        this._bg.graphics.clear();
        this._bg.graphics.beginFill(color, 1);
        this._bg.graphics.drawRoundRect(0, 0, Grid.width, Grid.height, 20, 20);
        this._bg.graphics.endFill();
    }

    public setNum(n) {
        this.num = n;
        this._numLabel.text = n.toString();
        this._numLabel.anchorOffsetX = this._numLabel.width / 2;
        this._numLabel.anchorOffsetY = this._numLabel.height / 2;
        this._numLabel.x = this.width / 2;
        this._numLabel.y = this.height / 2;
        this.resetColor();
    }

    public onClick() {
        if (this.isHeightLight) {//  突出显示,决定生成的位置
            var event = new GameAddOneEvent(GameAddOneEvent.CellAddPos);
            this.dispatchEvent(event);
        } else {// add one
            this.num++;
            var tw = egret.Tween.get(this);
            tw
                .to({scaleX: 0.7, scaleY: 1.1}, 100)
                .to({scaleX: 1, scaleY: 0.8}, 80)
                .to({scaleX: 1, scaleY: 1}, 10)
                .call(function () {
                    this.setNum(this.num);
                    var event = new GameAddOneEvent(GameAddOneEvent.CellAddOne);
                    this.dispatchEvent(event);
                }, this);
        }
    }

    public removeSelf() {
        if (this.moveFlag == false) {
            this.moveFlag = true;
            GridMgr.RemoveCell(this);
            var tw = egret.Tween.get(this);
            tw.to({scaleX: 0.6, scaleY: 0.6}, 300, egret.Ease.backOut)
                .call(function () {
                    this.moveFlag = false;
                    var event:GameAddOneEvent = new GameAddOneEvent(GameAddOneEvent.CellRemove);
                    this.dispatchEvent(event);
                    this.parent.removeChild(this);
                }, this);
        }
    }

    public highlightShow() {
        this.isHeightLight = true;
        var color = GameAddOneCfg.colorArray[this.num - 1];
        this._bg.graphics.clear();
        this._bg.graphics.beginFill(color, 1);
        this._bg.graphics.drawCircle(Grid.width / 2, Grid.height / 2, Grid.width / 2);
        //this._bg.graphics.drawRoundRect(0, 0, Grid.width, Grid.height, 10, 10);
        this._bg.graphics.endFill();
    }

    public normalShow() {
        this.isHeightLight = false;
        this.resetColor();
    }

    public moveToPos(row, column) {
        if (this.moveFlag == false) {
            this.moveFlag = true;
            this.row = row;
            this.column = column;
            var x = GridMgr.getPositionX(this.column);
            var y = GridMgr.getPositionY(this.row);
            var tw = egret.Tween.get(this);
            tw.to({x: x, y: y}, 400, egret.Ease.bounceOut)
                .call(function () {
                    this.moveFlag = false;
                    var event:GameAddOneEvent = new GameAddOneEvent(GameAddOneEvent.CellMoveOver);
                    this.dispatchEvent(event);
                }, this);
        }
    }

    public fill() {
        if (this.moveFlag == false) {
            this.moveFlag = true;
            var x = GridMgr.getPositionX(this.column);
            var y = -Grid.height;
            this.x = x;
            this.y = y;
            var desx = GridMgr.getPositionX(this.column);
            var desy = GridMgr.getPositionY(this.row);
            var tw = egret.Tween.get(this);
            tw.to({x: desx, y: desy}, 400, egret.Ease.bounceOut)
                .call(function () {
                    this.moveFlag = false;
                    var event:GameAddOneEvent = new GameAddOneEvent(GameAddOneEvent.CellMoveOver);
                    this.dispatchEvent(event);
                }, this);
        }
    }
}
