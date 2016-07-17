class GameMissionProgress extends eui.Component {
    public constructor() {
        super();
        this.skinName = "GameMissionProgressSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {

    }
}