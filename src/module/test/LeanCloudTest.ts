class LeanCloudTest extends eui.Component {
    private btn:eui.Button;

    public constructor() {
        super();
        this.skinName = "LeanCloudTestSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    public  addStage() {
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn, this);
    }

    private onBtn() {


        // 应用 ID，用来识别应用
        var APP_ID = 'PgJ6NThEgme493wrvexghyRA-gzGzoHsz';

        // 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
        var APP_KEY = 'yuLVnbbIvDbh2xXg85iDJHtr';

        // 初始化
        /*

        AV.init({
            appId: APP_ID,
            appKey: APP_KEY
        });
        var TestObject = AV.Object.extend('TestObject');
        var testObject = new TestObject();
        testObject.save({
            testabc: 'abc123'
        }).then(function() {
            alert('LeanCloud works!');
        }).catch(function(err) {
            alert('error:' + err);
        });
         */
    }
}
