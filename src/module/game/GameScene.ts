class GameScene extends egret.DisplayObjectContainer {
    private linePanel:egret.Sprite;
    private cellPanel:egret.Sprite;
    private pointLine:eui.Image;
    private pointLineBeganCell:Cell;// 提示点的起点cell

    private state:GameState = GameState.Play;

    private toBottom:number = 250;// 距离底部的距离
    private btn:eui.Button;
    private UILayer:GameUI;
    private map:tiled.TMXTilemap = null;

    public constructor() {
        super();
        this.UILayer = new GameUI();
        this.addChild(this.UILayer);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.onLoadMap();
    }

    //////////////////////tiled////////////////////////////////////////////////
    private onLoadMap() {
        var url:string = "resource/cleanGame/tmx/map1.tmx";
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
            this.map.scaleX = this.map.scaleY = 8 / 9;
            return;
            var layers = this.map.getLayers();
            for (var k in layers) {


                var item = layers[k];
                var name = item._name;
                for (var i = 0; i < item._rows; i++) {
                    for (var j = 0; j < item._cols; j++) {

                        var tiled = item.getTile(i, j);
                        var id = item.getTileId(i, j);
                        egret.log(name + ":" + i + "," + j + " => id:" + id);
                        if (id == 38) {
                            tiled.visible = false;
                        }
                    }
                }


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

    ////////////////////////////////////////////////////////////////////////////////
    private addStage() {
        this.initStage();
        this.initLinePanel();
        this.initCellPanel();
        this.initCell();

        this.addChildAt(this.UILayer, 1000);
    }

    private onBtn() {

    }

    private initStage() {
        var bg = new egret.Sprite();
        bg.name = "stageBg";
        bg.graphics.beginFill(0x999999, 0.8);
        bg.graphics.drawRect(0, 0, Display.winSize.width, Display.winSize.height);
        bg.graphics.endFill();
        bg.visible = false;
        this.addChild(bg);
    }

    private initCell() {
        CellMgr.cleanList = [];
        CellMgr.cleanCellArray();
        for (var i = 0; i < GameCfg.row; i++) {
            for (var j = 0; j < GameCfg.column; j++) {
                var id = CellMgr.genInitCellId(i, j);
                var cell:Cell = this.createCell(i, j, id);
                cell.x = CellMgr.getCellPosX(j);
                cell.y = CellMgr.getCellPosY(i);
            }
        }
    }

    private createCell(row, column, id):Cell {
        var cell = new Cell(id);
        cell.row = row;
        cell.column = column;
        cell.addEventListener(GameEvent.CleanOver, this.cleanOneByeOne, this);
        cell.addEventListener(GameEvent.DropOver, this.onDropOver, this);
        CellMgr.cellArray[row][column] = cell;
        this.cellPanel.addChild(cell);
        return cell;
    }

    private initLinePanel() {
        this.linePanel = new egret.Sprite();
        this.linePanel.name = "linePanel";
        this.linePanel.width = GameCfg.column * Cell.CellWidth + (GameCfg.column - 1) * GameCfg.columnSpace;
        this.linePanel.height = GameCfg.row * Cell.CellHeight + (GameCfg.row - 1) * GameCfg.rowSpace;
        this.linePanel.anchorOffsetX = this.linePanel.width / 2;
        this.linePanel.anchorOffsetY = this.linePanel.height;
        this.linePanel.x = Display.winSize.cx;
        this.linePanel.y = Display.winSize.height - this.toBottom;

        this.linePanel.graphics.beginFill(0x00ff00, 0);
        this.linePanel.graphics.drawRect(0, 0, this.linePanel.width, this.linePanel.height);
        this.linePanel.graphics.endFill();


        this.addChild(this.linePanel);
    }

    private initCellPanel() {
        this.cellPanel = new egret.Sprite();
        this.cellPanel.name = "cellPanel";
        this.cellPanel.width = GameCfg.column * Cell.CellWidth + (GameCfg.column - 1) * GameCfg.columnSpace;
        this.cellPanel.height = GameCfg.row * Cell.CellHeight + (GameCfg.row - 1) * GameCfg.rowSpace;
        this.cellPanel.anchorOffsetX = this.cellPanel.width / 2;
        this.cellPanel.anchorOffsetY = this.cellPanel.height;
        this.cellPanel.x = Display.winSize.cx;
        this.cellPanel.y = Display.winSize.height - this.toBottom;

        //this.cellPanel.graphics.beginFill(0x0000ff, 0.5);
        //this.cellPanel.graphics.drawRect(0, 0, this.cellPanel.width, this.cellPanel.height);
        //this.cellPanel.graphics.endFill();

        var rect = new eui.Rect(this.cellPanel.width, this.cellPanel.height, 0x0000ff);
        rect.alpha = 0;
        this.cellPanel.addChild(rect);

        this.cellPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegan, this);
        this.cellPanel.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.cellPanel.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.cellPanel.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSide, this);
        this.addChild(this.cellPanel);
    }

    private outSide() {
        this.onEnd();
    }

    private onBegan(touch:egret.TouchEvent) {
        if (this.state == GameState.Play) {
            this.deleteCleanList();
            var x = touch.stageX;
            var y = touch.stageY;
            var cell:Cell = CellMgr.getTouchCell(x, y);
            if (cell) {
                cell.setSelect(true);
                this.pushCleanCell(cell);
                egret.log("row: " + cell.row + ", column: " + cell.column);

                //提示线
                var point = new egret.Point(cell.x, cell.y);
                this.createPointLine(point);
                this.pointLineBeganCell = cell;
            }
        }
    }


    private createPointLine(p:egret.Point) {
        if (this.pointLine) {
            if (this.pointLine.parent) {
                this.pointLine.parent.removeChild(this.pointLine);
            }
        }
        this.pointLine = new eui.Image();
        this.pointLine.texture = RES.getRes("line_png");
        this.pointLine.width = 0;
        this.pointLine.anchorOffsetX = 0;
        this.pointLine.anchorOffsetY = this.pointLine.height / 2;
        this.pointLine.x = p.x;
        this.pointLine.y = p.y;
        this.linePanel.addChild(this.pointLine);
    }

    // 舞台坐标x, y 更新提示线的结束点
    private updatePointLineEnd(x, y) {
        if (this.pointLine && this.pointLineBeganCell) {
            var linePoint = new egret.Point(this.pointLineBeganCell.x, this.pointLineBeganCell.y);
            // 坐标转换
            var p = this.linePanel.globalToLocal(x, y);
            var distance = egret.Point.distance(linePoint, p);
            this.pointLine.width = distance;
            this.pointLine.x = linePoint.x;
            this.pointLine.y = linePoint.y;
            this.pointLine.anchorOffsetX = 0;
            this.pointLine.anchorOffsetY = this.pointLine.height / 2;
            var angle = this.getAngle(linePoint, p);
            this.pointLine.rotation = angle;

        }
    }

    // 更新提示线的起点
    private updatePointLineBegan(x, y) {
        var len = CellMgr.cleanList.length;
        if (len > 0) {
            var topCell = CellMgr.cleanList[len - 1];
            this.pointLineBeganCell = topCell;
            this.updatePointLineEnd(x, y);
        }
    }

    private onMove(touch:egret.TouchEvent) {
        if (this.state == GameState.Play) {
            var x = touch.stageX;
            var y = touch.stageY;
            this.updatePointLineEnd(x, y);
            var cell:Cell = CellMgr.getTouchCell(x, y);
            if (cell) {
                if (cell.isSelected) {
                    // 倒数第二个要回退
                    var b = CellMgr.getIsLastTwoInCleanList(cell);
                    if (b) {
                        CellMgr.removeTopLine();
                        var topItem = CellMgr.removeTopItemInCleanList();
                        topItem.setSelect(false);
                        this.updatePointLineBegan(x, y);
                    }
                } else {
                    // 是否符合周围的
                    var sameID = CellMgr.getCleanListID();
                    var isArround = CellMgr.isInArround(cell);
                    if (cell.id == sameID &&  // 类型相同,推入消除队列
                        isArround) {// 在上个cell的周围
                        cell.setSelect(true);
                        this.pushCleanCell(cell);
                        this.updatePointLineBegan(x, y);
                    }
                }
            }
        }
    }

    private onEnd() {
        // 判断消除
        var listLenght = CellMgr.cleanList.length;
        egret.log("可以消除的数量为: " + listLenght);
        if (listLenght >= GameCfg.baseCleanNum) {
            if (this.state == GameState.Play) {
                this.state = GameState.DealLogic;
                this.cleanOneByeOne();
            }
        }
        for (var k in CellMgr.cleanList) {
            var item:Cell = CellMgr.cleanList[k];
            item.setSelect(false);
        }
        this.cleanAllLine();
    }

    private cleanAllLine() {
        this.linePanel.removeChildren();
    }

    private cleanIndex = 0;

    private cleanOneByeOne() {
        var len = CellMgr.cleanList.length;
        if (len == 0) {
            // 清理完毕
            this.deleteCleanList();
            this.dropAndFillCell();
        } else {// 清除下一个
            var item:Cell = CellMgr.cleanList[0];
            // 痕迹 . 分数
            this.createDirtyAndScore(item);
            item.clean();

            SoundsMgr.removeCell(this.cleanIndex);
            this.cleanIndex++;
        }
    }

    private createDirtyAndScore(cell:Cell) {
        // 痕迹
        var dirtyArr = ["apple_png", "blueberry_png",
            "mangosteen_png", "lemon_png", "watermelon_png"];
        var id = cell.id;

        var dirty = new eui.Image(dirtyArr[id - 1]);
        var texture = RES.getRes(dirtyArr[id - 1]);
        dirty.anchorOffsetX = texture.textureWidth / 2;
        dirty.anchorOffsetY = texture.textureHeight / 2;
        dirty.x = cell.x;
        dirty.y = cell.y;
        dirty.scaleX = dirty.scaleY = 0;
        var rotation = Math.random() * 360;
        dirty.rotation = rotation;
        this.cellPanel.addChild(dirty);

        var tw = egret.Tween.get(dirty);
        tw.to({scaleX: 1.2, scaleY: 1.2}, 400, egret.Ease.bounceOut)
            .wait(200)
            .to({alpha: 0}, 100)
            .call(function (node) {
                if (node && node.parent) {
                    node.parent.removeChild(node);
                }
            }, this, [dirty]);

        // 分数
        var score = 10;
        this.UILayer.addScore(score);
        var scoreLabel = new eui.Label();
        scoreLabel.text = score.toString();
        scoreLabel.anchorOffsetX = scoreLabel.width / 2;
        scoreLabel.anchorOffsetY = scoreLabel.height / 2;
        scoreLabel.x = cell.x;
        scoreLabel.y = cell.y;
        this.cellPanel.addChild(scoreLabel);
        var tw2 = egret.Tween.get(scoreLabel);
        tw2.to({y: cell.y - 40}, 400)
            .call(function (node) {
                if (node && node.parent) {
                    node.parent.removeChild(node);
                }
            }, this, [scoreLabel]);
    }

    private deleteCleanList() {
        CellMgr.cleanList = [];
        CellMgr.lineArray = [];
        this.cleanIndex = 0;
    }

    private onDropOver() {
        var b = CellMgr.isAllMove();
        if (b == false) {
            egret.log("Drop over");
            this.onStepOver();
        }
    }

    private onStepOver() {
        this.state = GameState.Play;
        this.UILayer.reduceStep();
    }

    private dropAndFillCell() {
        // 下落
        for (var i = GameCfg.row - 1; i >= 0; i--) {
            for (var j = 0; j < GameCfg.column; j++) {
                var item:Cell = CellMgr.cellArray[i][j];
                if (item != null) {
                    var ret = CellMgr.getDropRowAndColumn(item);
                    var row = ret.row;
                    var column = ret.column;
                    if (item.row != row || item.column != column) {
                        item.drop(ret.row, ret.column);
                    }
                }
            }
        }
        // 填充
        var emptyPosArr = CellMgr.getEmptyCell();
        for (var k in emptyPosArr) {
            var emptyRow = emptyPosArr[k].row;
            var emptyColumn = emptyPosArr[k].column;
            var id = CellMgr.genDropCellId(emptyRow, emptyColumn);
            var cell = this.createCell(emptyRow, emptyColumn, id);
            cell.x = CellMgr.getCellPosX(emptyColumn);
            cell.y = -Cell.CellHeight / 2;
            cell.drop(emptyRow, emptyColumn);
            //egret.log(emptyRow + "," + emptyColumn);

        }
    }

    private pushCleanCell(cell) {
        CellMgr.cleanList.push(cell);
        var length = CellMgr.cleanList.length;
        if (length > 1) {
            var fromCell = CellMgr.cleanList[length - 2];
            this.drawLine(fromCell, cell);
            // 提示线更新起点
        }
    }

    private drawLine(fromCell:Cell, toCell:Cell) {
        var lineTexture = RES.getRes("line_png");
        var line = new eui.Image();
        line.texture = lineTexture;
        line.anchorOffsetX = 0;
        line.anchorOffsetY = lineTexture.textureHeight / 2;
        this.linePanel.addChild(line);
        CellMgr.lineArray.push(line);

        line.x = fromCell.x;
        line.y = fromCell.y;

        // 宽度
        var fromPoint:egret.Point = new egret.Point(fromCell.x, fromCell.y);
        var toPoint:egret.Point = new egret.Point(toCell.x, toCell.y);
        var distance = egret.Point.distance(fromPoint, toPoint);
        line.width = distance;
        // 旋转角度
        var angle = this.getAngle(fromPoint, toPoint);
        line.rotation = angle;
    }

    private getRotateAngle(fromCell:Cell, toCell:Cell) {
        var angle = 0;
        var fromRow = fromCell.row;
        var fromColumn = fromCell.column;
        var toRow = toCell.row;
        var toColumn = toCell.column;

        if (fromRow < toRow) {// 下划线
            if (fromColumn == toColumn) {// 正下方
                angle = 90;
            } else if (fromColumn == toColumn - 1) {//右下
                angle = 45;
            } else if (fromColumn == toColumn + 1) {// 左下
                angle = 135;
            }
        } else if (fromRow > toRow) {
            if (fromColumn == toColumn) {// 正下方
                angle = -90;
            } else if (fromColumn == toColumn - 1) {//右下
                angle = -45;
            } else if (fromColumn == toColumn + 1) {// 左下
                angle = -135;
            }
        } else if (fromRow == toRow) {
            if (fromColumn == toColumn - 1) {//右
                angle = 0;
            } else if (fromColumn == toColumn + 1) {// 左
                angle = 180;
            }
        }
        return angle;
    }

    // 角度的取值范围 [0, 360]
    private getAngle(beganPoint:egret.Point, endPoint:egret.Point) {
        var x = endPoint.x - beganPoint.x;
        var y = Math.abs(endPoint.y - beganPoint.y);
        var z = egret.Point.distance(beganPoint, endPoint);
        var a = Math.round(Math.asin(y / z) / Math.PI * 180);// 最终的角度
        // 这个角度取值区间[0,90] 米型结构
        if (beganPoint.x > endPoint.x) {// 2,3 象限
            if (beganPoint.y > endPoint.y) {// 2
                a = a + 180;
            } else if (beganPoint.y < endPoint.y) {// 3
                a = 180 - a;
            } else if (beganPoint.y == endPoint.y) {
                a = 180;
            }
        } else if (beganPoint.x < endPoint.x) {// 1,4 象限
            if (beganPoint.y > endPoint.y) {//1
                a = 360 - a;
            } else if (beganPoint.y < endPoint.y) {//4
                a = a;
            } else if (beganPoint.y == endPoint.y) {
                a = 0;
            }
        } else if (beganPoint.x == endPoint.x) {
            if (beganPoint.y > endPoint.y) {//上滑
                a = 270;
            } else if (beganPoint.y < endPoint.y) {// 下滑
                a = 90;
            }
        }
        return a;
    }
}
