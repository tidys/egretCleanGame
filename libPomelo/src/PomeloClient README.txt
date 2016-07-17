将所有文件复制到你白鹭项目的根目录下，然后编辑项目根目录中 egretProperties.json 文件，向其中的 modules 数组内添加以下模块描述：
{
	"name": "PomeloClient",
	"path": "."
}

之后在你的业务代码里，就可以使用 Pomelo 这个类了（存在于根模块中）。

代码示例：

var pomelo:Pomelo = new Pomelo();

pomelo.on('io-error', function(e:any):void {
	// 错误处理
});

pomelo.on('close', function(e:any):void {
	// 连接关闭
});

// 连接到服务器 127.0.0.1:3010
pomelo.init({
	host: '127.0.0.1',
	port: '3010'
}, function(response:any):void {
	if (response.code === 200) {
		// 连接成功
	}
});


// 接收服务端推送的消息
pomelo.on('onChat', function(response:any):void {
	// response 对象就是服务器推送回来的对象
});

// 向服务器发起标准请求
pomelo.request(
	'connector.entryHandler.entry',
	'hello pomelo && egret',
	function(response:any):void {
		// response 对象就是服务器响应并反馈的对象
});

// 向服务器发起不需要反馈的通知
pomelo.notify(
	'connector.entryHandler.entry',
	'hello pomelo && egret'
});

// 主动从服务器断开连接
pomelo.disconnect();