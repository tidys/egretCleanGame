class Display {
    public static _winSize = {width: 0, height: 0, cx: 0, cy: 0};
    public static get winSize():any {
        this._winSize.width = egret.MainContext.instance.stage.stageWidth;
        this._winSize.height = egret.MainContext.instance.stage.stageHeight;
        this._winSize.cx = this._winSize.width / 2;
        this._winSize.cy = this._winSize.height / 2;
        return this._winSize;
    }
    public static get stage():any {
        return egret.MainContext.instance.stage;
    }
}