enum LevelState{NONE, OPEN, CLOSE}

class IndexButton extends eui.Component {
    private bg:eui.Image;
    private lvLabel:eui.Label;
    private icon:eui.Image;

    private state:LevelState = LevelState.NONE;
    private lvNumber:number = 0;

    public constructor() {
        super();
        this.skinName = "IndexButtonSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    public get lv() {
        return this.lvNumber;
    }

    public set lv(v) {
        this.lvNumber = v;
        this.lvLabel.text = this.lvNumber.toString();

        if (this.lvNumber < parseInt(PlayerData.data.fightLv)) {
            // 已经通关了
            this.setData(LevelState.OPEN);
        } else if (this.lvNumber == parseInt(PlayerData.data.fightLv)) {
            this.setData(LevelState.OPEN);
            this.showIcon();
        } else {
            // 还没有通关
            this.setData(LevelState.CLOSE);
        }
    }

    private showIcon() {
        this.icon.visible = true;
        var tw = egret.Tween.get(this.icon, {loop: true});
        var y = this.icon.y;
        tw.to({y: y + 20}, 1200, egret.Ease.backIn)
            .to({y: y}, 500, egret.Ease.backOut);
    }

    public setData(state:LevelState) {
        this.state = state;

        this.bg.source = this.getStateImage();
    }

    private addStage() {
    }

    private getStateImage() {
        if (this.state == LevelState.CLOSE) {
            return "selet_g_lock_png";
        } else if (this.state == LevelState.OPEN) {
            return "selet_g_green_png";
        }
        return "";
    }
}