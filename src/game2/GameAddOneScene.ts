class GameAddOneScene extends egret.DisplayObjectContainer {
    private cellPanel:egret.Sprite;

    public constructor() {
        super();
        GridMgr.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
    }

    private onAddStage() {
        this.createStage();
        this.createAllCell();
    }

    private createStage() {
        var bg = new egret.Sprite();
        bg.graphics.beginFill(0x888888, 1);
        bg.graphics.drawRect(0, 0, Display.winSize.width, Display.winSize.height);
        bg.graphics.endFill();
        this.addChild(bg);
    }

    private createAllCell() {
        this.cellPanel = new egret.Sprite();
        this.cellPanel.graphics.beginFill(0xf4a60, 1);
        var w:number = Grid.width * 6 + 5 * 5;
        var h:number = Grid.height * 6 + 5 * 5;
        this.cellPanel.graphics.drawRect(0, 0, w, h);
        this.cellPanel.graphics.endFill();
        this.addChild(this.cellPanel);
        this.cellPanel.width = w;
        this.cellPanel.height = h;
        this.cellPanel.anchorOffsetX = w / 2;
        this.cellPanel.anchorOffsetY = h;
        this.cellPanel.x = Display.winSize.cx;
        this.cellPanel.y = Display.winSize.height - 10;

        var json = RES.getRes("cellCfg_json");
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                var cell = this.createCell(i, j);
                var num = parseInt(json[1][i][j]);
                cell.setNum(num);
                this.cellPanel.addChild(cell);
            }
        }
    }

    private createCell(row, column) {
        var cell = new Grid(row, column);
        var num = GridMgr.getDifferentNum(row, column);
        cell.setNum(num);
        GridMgr.addCell(cell);
        cell.x = GridMgr.getPositionX(column);
        cell.y = GridMgr.getPositionY(row);

        cell.addEventListener(GameAddOneEvent.CellAddOne, this.onCellAddOne, this);
        cell.addEventListener(GameAddOneEvent.CellRemove, this.onCellRemove, this);
        cell.addEventListener(GameAddOneEvent.CellAddPos, this.onCellAddPos, this);
        cell.addEventListener(GameAddOneEvent.CellMoveOver, this.onCellMoveOver, this);
        return cell;
    }

    private onCellMoveOver(touch:egret.TouchEvent) {
        if (GridMgr.isMoveOver()) {
            GridMgr.allCellTurnToNormal();// 所有的cell变为normal
            var list = GridMgr.getCleanList();
            if (list) {
                for (var k in list) {
                    var cell = list[k];
                    cell.removeSelf();
                }
            }

        }
    }

    private fillAllCell() {
        for (var row = GameAddOneCfg.Grid.row - 1; row >= 0; row--) {
            for (var column = 0; column < GameAddOneCfg.Grid.column; column++) {
                var cell = GridMgr._cellArray[row][column];
                if (cell == null) {
                    var newCell = this.createCell(row, column);
                    newCell.fill();
                    this.cellPanel.addChild(newCell);
                }
            }
        }
    }

    private onCellAddPos(touch:egret.TouchEvent) {
        egret.log("addPos");
        //确定了位置
        var cell = touch.currentTarget;
        var cellArr = GridMgr.getSameCellByCell(cell);//得到要消除的cell
        for (var k in cellArr) {
            var item = cellArr[k];
            item.removeSelf();
        }

    }

    private onCellAddOne(touch:egret.TouchEvent) {// Cell自增了1
        // 消除3个在一起的cell
        // 找到相同的

        // 相同的cell突出显示

        var cell = touch.currentTarget;
        var cellArr = GridMgr.getSameCellByCell(cell);
        cellArr.push(cell);
        if (cellArr.length >= 3) {
            for (var k in cellArr) {
                var item = cellArr[k];
                item.highlightShow();
            }
        } else {
            GridMgr.dropAllCell();
            GridMgr.allCellTurnToNormal();
            this.fillAllCell();
        }
    }

    private onCellRemove(touch:egret.TouchEvent) {
        if (GridMgr.isMoveOver()) {
            console.log("remove");
            GridMgr.dropAllCell();
            GridMgr.allCellTurnToNormal();
            this.fillAllCell();
        }
    }


}