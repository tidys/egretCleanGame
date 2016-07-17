class ResLoading extends eui.Component {
    private circle:eui.Image;
    private textLabel:eui.Label;

    private loadGroups = [];//要加载的组
    private index;//当前加载的组序列
    private callback:CallBackFunc;//资源加载完毕之后的回调
    public constructor() {
        super();
        this.skinName = "ResLoadingSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    private update() {
        this.circle.rotation += 3;
    }

    public load(groups, callback?) {
        egret.log("[ResLoading] 加载组:" + groups);
        this.index = 0;
        this.loadGroups = groups;
        this.callback = callback;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.loadGroups[this.index]);
    }

    private isAllLoaded():boolean {
        var b = true;
        for (var i = 0; i < this.loadGroups.length; i++) {
            b = b && RES.isGroupLoaded(this.loadGroups[i]);
        }
        return b;
    }

    private loadFinish() {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this.callback) {
            this.callback.exec();
        }
    }

    private onResourceLoadComplete(event:RES.ResourceEvent) {
        var b = this.isAllLoaded();
        egret.log("[LoadingCircle] group " + event.groupName + " loaded");
        if (b) {
            this.loadFinish();
        } else {
            this.index++;
            RES.loadGroup(this.loadGroups[this.index]);
        }
    }

    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }

    private onResourceProgress(event:RES.ResourceEvent):void {
        this.setProgress(event.itemsLoaded, event.itemsTotal);
        egret_4399_h5api.progress(event.itemsLoaded / event.itemsTotal * 100);
        //var item = event.resItem;
        //console.log(event.groupName + "[" + event.itemsLoaded + "/" + event.itemsTotal + "]:" + item.url);
    }

    private setProgress(current, total):void {
        this.textLabel.text = current + "/" + total;
    }

}
