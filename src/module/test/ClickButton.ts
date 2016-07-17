class ClickButton extends eui.Component {
    private icon:eui.Image;

    public constructor() {
        super();
        this.skinName = "ClickButtonSkin";
    }

    public set btnIcon(png:any) {
        var btnTexture = RES.getRes(png);
        if (btnTexture) {
            this.icon.source = btnTexture;
            this.icon.x = this.icon.y = 0;
            this.width = btnTexture.textureWidth;
            this.height = btnTexture.textureHeight;
            this.anchorOffsetX = btnTexture.textureWidth / 2;
            this.anchorOffsetY = btnTexture.textureHeight / 2;
        }
    }
    public partAdded(partName:string, instance:any):void{
        super.partAdded(partName, instance);

        //if (instance == this.iconDisplay){
        //    this.iconDisplay.source = this._icon;
        //}
    }
    public get btnIcon() {
        return this.icon.source;
    }
}