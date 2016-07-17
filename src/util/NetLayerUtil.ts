
class NetLayerUtil extends egret.DisplayObjectContainer {
    private curLayer;
    public constructor() {
        super();
    }
    public addWaitLayer() {
        // 先移除所有的netLayer
        this.removeChildren();
        // 添加网络layer
        var layer = new NetWait();
        this.curLayer = layer;
        this.addChild(layer);
    }
    public addOutLineLayer() {
        // 先移除所有的netLayer
        this.removeChildren();
        // 添加网络layer
        var layer = new NetError("该账号已在其他地方登录,是否重新登录?");
        this.curLayer = layer;
        this.addChild(layer);
    }
    public addErrorLayer(){
        // 先移除所有的netLayer
        this.removeChildren();
        // 添加网络layer
        var layer = new NetError();
        this.curLayer = layer;
        this.addChild(layer);
    }
    public cleanLayer() {
        this.removeChildren();
    }
}