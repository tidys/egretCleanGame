class SceneMgr {
    public static gotoLogoin() {
        var loading = new ResLoading();
        Director.getInstance().pushScene(loading);
        var call = new CallBackFunc().handler(SceneMgr.onLogo, this, []);
        loading.load(["com", "fruit", "logoin","mp3"], call);
    }

    private static onLogo() {
        var layer = new Logoin();
        Director.getInstance().repleaceScene(layer);
    }

    public static gotoIndex() {
        var loading = new ResLoading();
        Director.getInstance().pushScene(loading);
        var call = new CallBackFunc().handler(SceneMgr.onIndex, this, []);
        loading.load(["map", "index", "json"], call);
    }

    private static onIndex() {
        var index = new IndexScene();
        Director.getInstance().repleaceScene(index);
    }

    ////////////////////////////////////////////////////////////////////
    public static gotoGame() {
        var loading = new ResLoading();
        Director.getInstance().pushScene(loading);
        var call = new CallBackFunc().handler(SceneMgr.onGame, this, []);
        loading.load(["cell", "fruit", "json"], call);
    }

    private static onGame() {
        var game = new GameScene();
        Director.getInstance().repleaceScene(game);
    }

    public static rePlayLv() {
        GameData.curScore = 0;
        GameData.curStep = GameData.targetStep;
        GameData.isOver = false;
        GameData.isWin = false;
        Director.getInstance().repleaceScene(new GameScene());
    }

    ////////////////////////////////////////////////////////////////////
    public static gotoTest() {
        var loading = new ResLoading();
        Director.getInstance().pushScene(loading);
        var call = new CallBackFunc().handler(SceneMgr.onTest, this, []);
        loading.load(["test"], call);
    }

    private static onTest() {
        Director.getInstance().repleaceScene(new Test());
    }

    ////////////////////////////////////////////////////////////////////

    public static gotoChat() {
        Director.getInstance().repleaceScene(new ChatScene());
    }
}