
/**
 * H5API接口
 * Created by shaov on 2014/11/11.
 */
declare class egret_4399_h5api {
    /**
     * 初始化游戏信息
     * @param gameId        游戏编号
     * @param gameName      游戏名称
     * @param gameWidth     游戏高
     * @param gameHeight    游戏宽
     */
    static initGame(gameId:number,gameName:string, gameWidth:number, gameHeight:number):void;

    /**
     * 进度条接口
     * @param progressNum
     * @param progressStr
     */
    static progress(progressNum:number, progressStr:string):void;

    /**
     * 进度条接口
     * @param progressNum
     */
    static progress(progressNum:number):void;

    /**
     * 微信环境检测接口
     */
    static isWeixinBrowser():boolean;

    /**
     * 微信分享接口
     */
    static share(str:string):void;

    /**
     * 更多游戏接口
     */
    static moreGame():void;

    /**
     * 提交积分到排行榜
     * @param num
     * @param callback
     */
    static submitScore(score:number, callback:Function, thisObject:any):void;

    /**
     * 获取排行榜
     * @param callback
     */
    static getRank(callback:Function, thisObject:any):void;
}