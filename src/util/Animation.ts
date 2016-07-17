class Animation {
    public static makeAni(effectFile):egret.MovieClip {
        var json = RES.getRes(effectFile + "_json");
        var texture = RES.getRes(effectFile + "_png");
        if (!json || !texture) {
            egret.log("[Animation] 动画文件有问题 " + effectFile);
            return null;
        } else {
            var effectMcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json, texture);
            var effectMc:egret.MovieClip = new egret.MovieClip(effectMcFactory.generateMovieClipData("ani"));
            effectMc.frameRate = 10;
            return effectMc;
        }
    }

    public static makeParticle(file) {
        //var texture = RES.getRes(file.toString() + "_png");
        //var config = RES.getRes(file.toString() + "_json");
        //if (texture && config) {
        //    var p:particle.GravityParticleSystem = new particle.GravityParticleSystem(texture, config);
        //    p.start();
        //    return p;
        //} else {
        //    return null;
        //}
    }
}
