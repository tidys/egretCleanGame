// 形状数据
class EllipseShapData {//椭圆
    public pos:egret.Point;
    public ra:number = 0;//长半径
    public rb:number = 0;//短半径
}
class PolygonShapData {//多边形
    public pos:egret.Point;
    public pointArray:Array<egret.Point> = [];
}
class PolyLineShapData {//折线
    public pos:egret.Point;
    public pointArray:Array<egret.Point> = [];
}
class RectangleShapData {//矩形
    public pos:egret.Point;
    public width:number = 0;
    public height:number = 0;
}