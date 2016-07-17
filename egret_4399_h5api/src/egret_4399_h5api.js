/**
 * 用于白鹭引擎的API接口回调函数
 * Created by shaov on 2014/11/11.
 */
var egret_4399_h5api = (function () {
    /**
     * 初始化游戏
     * @param gameId        游戏编号
     * @param gameName      游戏名称
     * @param gameWidth     游戏宽
     * @param gameHeight    游戏高
     */
    function initGame(gameId, gameName, gameWidth, gameHeight) {
        h5api.initGame(gameId, gameName, gameWidth, gameHeight);
    }

    /**
     *进度条接口
     * @param num
     */
    function progress(num) {
        h5api.progress(num);
    }

    /**
     * 微信环境检测接口
     */
    function isWeixinBrowser() {
        return h5api.isWeixinBrowser();
    }

    /**
     * 分享提示接口
     */
    function share(str) {
        h5api.share(str);
    }

    /**
     * 更多游戏接口
     */
    function moreGame() {
        h5api.moreGame();
    }

    /**
     * 提交积分到排行榜
     * @param num
     * @param callback
     */
    function submitScore(num, callback, thisObject) {
        function submitScoreCallback(data) {
            callback.call(thisObject, data);
        }

        h5api.submitScore(num, submitScoreCallback);
    }

    /**
     * 获取排行榜
     * @param callback
     */
    function getRank(callback, thisObject) {
        function getRankCallback(data) {
            callback.call(thisObject, data);
        }

        h5api.getRank(getRankCallback);
    }

    return{
        initGame: initGame,
        progress: progress,
        isWeixinBrowser: isWeixinBrowser,
        share: share,
        moreGame: moreGame,
        submitScore: submitScore,
        getRank: getRank
    };
})();