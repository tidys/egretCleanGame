class CfgFileMgr {
    public static  getLvCfgDatayId(v) {
        var format = Util.formatString(["%04s", v]);
        var json = RES.getRes("lvcfg_json");
        for (var k in json) {
            var item = json[k];
            var id = item["id"];
            if (id == format.toString()) {
                return item;
            }
        }
        return null;
    }
}