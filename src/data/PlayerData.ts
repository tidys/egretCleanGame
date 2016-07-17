class PlayerData {
    public static data = {fightLv: "1", gold: 0, heart: 0};// Õ½¶·µÄ¹Ø¿¨
    public static saveLv(lv) {
        if (lv >= this.data.fightLv) {
            this.data.fightLv = lv;
        }
        this.save();
    }

    public static initData() {
        var localData = egret.localStorage.getItem("gameLocalData");
        if (localData) {
            this.data = JSON.parse(localData);
        }
    }

    private static save() {
        var s = JSON.stringify(this.data);
        egret.localStorage.setItem("gameLocalData", s);
    }

}