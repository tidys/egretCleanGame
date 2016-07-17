
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/dragonbones/dragonbones.js",
	"libs/modules/tiled/tiled.js",
	"libs/modules/physics/physics.js",
	"libs/modules/test/test.js",
	"libs/modules/Pomelo/Pomelo.js",
	"libs/modules/AV/AV.js",
	"libs/modules/dcagent/dcagent.js",
	"libs/modules/egret_4399_h5api/egret_4399_h5api.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/data/AVMgr.js",
	"bin-debug/data/CfgFileMgr.js",
	"bin-debug/data/DCAgentMgr.js",
	"bin-debug/data/PlayerData.js",
	"bin-debug/data/SceneMgr.js",
	"bin-debug/data/SoundsMgr.js",
	"bin-debug/game2/GameAddOneCfg.js",
	"bin-debug/game2/GameAddOneEvent.js",
	"bin-debug/game2/GameAddOneScene.js",
	"bin-debug/game2/Grid.js",
	"bin-debug/game2/GridMgr.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/module/chat/ChatItem.js",
	"bin-debug/module/chat/ChatScene.js",
	"bin-debug/module/game/Cell.js",
	"bin-debug/module/game/CellMgr.js",
	"bin-debug/module/game/CleanWithLineGameScene.js",
	"bin-debug/module/game/GameCfg.js",
	"bin-debug/module/game/GameData.js",
	"bin-debug/module/game/GameEvent.js",
	"bin-debug/module/game/GameMissionProgress.js",
	"bin-debug/module/game/GameProgress.js",
	"bin-debug/module/game/GameScene.js",
	"bin-debug/module/game/GameUI.js",
	"bin-debug/module/index/GameEnterDlg.js",
	"bin-debug/module/index/IndexButton.js",
	"bin-debug/module/index/IndexGroup.js",
	"bin-debug/module/index/IndexScene.js",
	"bin-debug/module/index/IndexUI.js",
	"bin-debug/module/loading/ResLoading.js",
	"bin-debug/module/logoin/Logoin.js",
	"bin-debug/module/lose/LoseLayer.js",
	"bin-debug/module/pause/PauseLayer.js",
	"bin-debug/module/test/ClickButton.js",
	"bin-debug/module/test/DragonBonesTestLayer.js",
	"bin-debug/module/test/LeanCloudTest.js",
	"bin-debug/module/winUI/WinUI.js",
	"bin-debug/net/Net.js",
	"bin-debug/net/NetError.js",
	"bin-debug/net/NetMsg.js",
	"bin-debug/net/NetWait.js",
	"bin-debug/test/Test.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/tiledGame/Cannon.js",
	"bin-debug/tiledGame/Fish.js",
	"bin-debug/tiledGame/FishScene.js",
	"bin-debug/tiledGame/ShapData.js",
	"bin-debug/tiledGame/TiledScene.js",
	"bin-debug/util/Animation.js",
	"bin-debug/util/CallBackFunc.js",
	"bin-debug/util/Director.js",
	"bin-debug/util/Display.js",
	"bin-debug/util/GuidLayerUtil.js",
	"bin-debug/util/NetLayerUtil.js",
	"bin-debug/util/Tips.js",
	"bin-debug/util/Util.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};