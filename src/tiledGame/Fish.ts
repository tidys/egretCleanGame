class Fish extends eui.Component {
    private mc:egret.MovieClip;

    public constructor() {
        super();
        this.initView();
    }

    private initView() {
        this.mc = Animation.makeAni("fish4");
        if (this.mc) {
            this.mc.gotoAndPlay("run",-1);
            this.addChild(this.mc);
        }


        var tw = egret.Tween.get(this);
        //tw.to({factor: 1}, 5000);
    }

    public swimming(){
        var tw = egret.Tween.get(this,{loop:true});
        tw.to({x:480,y:800},4000);
    }
    // 一般传入的是炮弹的点
    public isUnderAtk(x, y) {
        var b = this.hitTestPoint(x, y);
    }


    //=================================================================================================
    // 和贝塞尔曲线有关
    public get factor() {
        return 0;
    }

    public set factor(value) {
        //这里的P0点是(100,100)，P1点是(300,300)，P2点是(100,500)。
        this.x = (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 100;
        this.y = (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 500;
    }
}