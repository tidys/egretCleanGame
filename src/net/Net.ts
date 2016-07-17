class Net {
    public static instance:Net = null;
    public _url:string = null;

    public constructor() {
        this._url = "http://localhost:63342/workerMan/Game/Test.php";
    }

    public static getInstance() {
        if (Net.instance == null) {
            Net.instance = new Net();
        }
        return Net.instance;
    }

    public sendHttpRequest(gameMsg:string, gameParm = null) {
        // 新建连接
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        // 传递参数
        var data = JSON.stringify(gameParm);
        var urlVariables:egret.URLVariables = new egret.URLVariables();
        urlVariables.variables = {msg: gameMsg, data: data};
        // 请求内容
        var request:egret.URLRequest = new egret.URLRequest();
        request.method = egret.URLRequestMethod.POST;
        request.url = this._url;
        request.data = urlVariables;
        loader.load(request);
    }

    private onLoadError() {
        console.log("服务器连接失败");
    }

    private onLoadComplete(event:egret.Event) {
        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        var text = loader.data;


        egret.log("返回数据：" + text);
    }
}
