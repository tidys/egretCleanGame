class GameData {
    public static enterLv:number = 0;
    public static curStep:number = 0;
    public static targetStep:number = 0;
    public static curScore:number = 0;
    public static targetScore:number = 0;
    public static isOver:boolean = false;
    public static isWin:boolean = false;

    public static reset() {
        this.enterLv = 0;

        this.curStep = 0;
        this.targetStep = 0;

        this.curScore = 0;
        this.targetScore = 0;

        this.isOver = false;
        this.isWin = false;
    }

    public static initLvData(lv) {
        this.reset();
        var data = CfgFileMgr.getLvCfgDatayId(lv);
        GameData.targetScore = parseInt(data["score"]);
        GameData.targetStep = parseInt(data["step"]);
        GameData.curStep = GameData.targetStep;
        GameData.enterLv = lv;
    }
}
enum GameState {
    DealLogic,// 处理游戏逻辑中
    Play//玩游戏中
}
;