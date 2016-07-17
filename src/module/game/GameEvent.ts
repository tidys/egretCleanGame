class GameEvent extends egret.Event {
    public static CleanOver:string = "CleanOver";
    public static DropOver:string = "DropOver";

    public constructor(type:string, bubbles:boolean = false, cancelAble:boolean = false) {
        super(type, bubbles, cancelAble);
    }
}