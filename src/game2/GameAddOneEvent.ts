class GameAddOneEvent extends egret.Event {
    public static GameOver:string = "GameOver";
    public static CellAddOne:string = "CellAddOne";
    public static CellRemove:string = "CellRemove";
    public static CellAddPos:string = "CellAddPos";
    public static CellMoveOver:string = "CellMoveOver";

    public constructor(type:string, bubbles:boolean = false, cancelAble:boolean = false) {
        super(type, bubbles, cancelAble);
    }
}