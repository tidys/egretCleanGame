class TiledScene extends egret.DisplayObjectContainer {

    private map:tiled.TMXTilemap = null;

    private prePoint = {x: 0, y: 0};

    public constructor() {
        super();
        this.initBg();
        this.onLoadMap();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoved, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }

    private addToStage() {
    }

    private initBg() {
        var shap = new egret.Shape();
        shap.graphics.beginFill(0xC1CBFF);
        shap.graphics.drawRect(0, 0, Display.winSize.width, Display.winSize.height);
        shap.graphics.endFill();
        this.addChild(shap);
    }

    private onLoadMap() {
        var url:string = "resource/tiled/map.tmx";
        var urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
            var data:any = egret.XML.parse(event.target.data);
            this.map = new tiled.TMXTilemap(2000, 2000, data, url);
            this.map.render();

            this.map.addEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, this.onLoaded, this);
            this.addChildAt(this.map, 1);
        }, this);
        urlLoader.load(new egret.URLRequest(url));
    }

    private onLoaded() {
        if (this.map) {
            this.map.visible = true;
            var layers = this.map.getLayers();
            for (var k in layers) {
                var item = layers[k];
                var type = item.__class__;
                //TMXLayer, TMXObjectGroup, TMXLayer
                if (type == "tiled.TMXLayer") {
                    var tmxLayer:tiled.TMXLayer = <tiled.TMXLayer>item;
                    var tile = tmxLayer.getTile(0, 0);
                    var tileId = tmxLayer.getTileId(0, 0);
                } else if (type == "tiled.TMXObjectGroup") {
                    var tmxObjGroup:tiled.TMXObjectGroup = <tiled.TMXObjectGroup>item;
                    var count = tmxObjGroup.getObjectCount();
                    for (var i = 0; i < count; i++) {
                        //tmxObjGroup.getObjectById(6);
                        var obj:tiled.TMXObject = tmxObjGroup.getObjectByIndex(i);
                        if (obj.isEllipse) {//椭圆
                            //egret.log(obj.id.toString() + "椭圆");
                            var p = new EllipseShapData();
                            p.pos = new egret.Point(obj.x, obj.y);
                            p.ra = obj.width;
                            p.rb = obj.height;

                        } else if (obj.isImage) {// 图片
                            //egret.log(obj.id.toString() + "图片");
                        } else if (obj.isPolygon) {// 多边形
                            //egret.log(obj.id.toString() + "多边形");
                            //var p = new PolygonShapData();
                            //p.pos = new egret.Point(obj.x,obj.y);
                            //p.pointArray = obj.


                        } else if (obj.isPolyLine) {// 折线
                            //egret.log(obj.id.toString() + "折线");
                        } else {// 矩形
                            //egret.log(obj.id.toString() + "矩形");
                        }
                    }
                }
            }
            var objects = this.map.getObjects();
            for (var k in objects) {
                var a = objects[k];
                var tmp = 0;
            }
        }
    }

    private onTouchBegan(touch:egret.TouchEvent) {
        this.prePoint.x = touch.stageX;
        this.prePoint.y = touch.stageY;
    }

    private onTouchEnd(touch:egret.TouchEvent) {

    }


    private onTouchMoved(touch:egret.TouchEvent) {
        if (this.map) {
            var x = touch.stageX;
            var y = touch.stageY;
            var diffx = x - this.prePoint.x;
            var diffy = y - this.prePoint.y;
            var mapx = this.map.x;
            var mapy = this.map.y;
            this.map.x = mapx + diffx;
            this.map.y = mapy + diffy;
            this.prePoint.x = x;
            this.prePoint.y = y;
        }
    }
}