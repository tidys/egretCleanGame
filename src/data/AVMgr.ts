class AVMgr {
    public static test() {
        var APP_ID = 'PgJ6NThEgme493wrvexghyRA-gzGzoHsz';
        var APP_KEY = 'yuLVnbbIvDbh2xXg85iDJHtr';

        AV.init({
            appId: APP_ID,
            appKey: APP_KEY
        });

        var todo = new AV.Object('Test');
        todo.set('title', 'Test');
        todo.set('content', '每周工程师会议，周一下午2点');
        todo.save<AV.Object>().then(
            (data) => {
                var savedTodo:AV.Object = data;
                egret.log("成功");
            },
            (error) => {
                egret.log("失败");
            }
        );
    }
}