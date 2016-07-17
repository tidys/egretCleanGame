!function (a) {
    "objct" == typeof module && "object" == typeof module.exports ? module.exports = a() : "function" == typeof define && define.amd ? a() : window.GH = a()
}(function () {
    function a() {
        var a = document.createElement("iframe"), b = "http://api.mix.guohead.com/get_h5_ad.php?client=4&spid=" + j.spid + "&pm=default&mixuuid=" + l;
        j.testapi && (b = "http://api.test.guohead.com/get_h5_ad.php?client=4&spid=" + j.spid + "&pm=default&mixuuid=" + l);
        var c, d = new XMLHttpRequest;
        d.open("GET", b, !0), d.onreadystatechange = function (b, e) {
            if (4 == d.readyState)if (c = 4 == d.readyState && 200 == d.status ? -1 != d.getResponseHeader("W-IsErr") : !1, d.responseText.length > 100) {
                var f = d.getResponseHeader("ADTYPE");
                a.contentDocument.write(d.responseText.replace(/<%notH5%>/g, "").replace(/<%ADTYPE%>/, f)), a.contentWindow.IS_GH_H5_CLIENT = "H5"
            } else body.removeChild(a)
        }, d.send(), body = document.getElementsByTagName("body")[0], a.id = "GH_FLOAT_SINGLE_WALL", a.setAttribute("style", "border:none;position:fixed;z-index:999999;left:0;top:0;right:0;bottom:0;width:100%;height:100%"), body.appendChild(a), a.onload = function () {
            a.contentDocument.getElementsByTagName("img").length || a.parentElement.removeChild(a)
        }
    }

    function b(a) {
        "object" == typeof a && (a.spid && (j.spid = encodeURIComponent(a.spid)), j.testapi = a.testapi)
    }

    function c() {
        var a = navigator.userAgent;
        return {
            trident: a.indexOf("Trident") > -1,
            presto: a.indexOf("Presto") > -1,
            webKit: a.indexOf("AppleWebKit") > -1,
            gecko: a.indexOf("Gecko") > -1 && -1 == a.indexOf("KHTML"),
            mobile: !!a.match(/AppleWebKit.*Mobile.*/),
            ios: !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: a.indexOf("Android") > -1 || a.indexOf("Linux") > -1,
            iPhone: a.indexOf("iPhone") > -1,
            iPad: a.indexOf("iPad") > -1,
            webApp: -1 == a.indexOf("Safari"),
            weixin: a.indexOf("MicroMessenger") > -1,
            qq: " qq" == a.match(/\sQQ/i)
        }
    }

    function d() {
        return g("MIXUUID")
    }

    function e() {
        var a = [f(8), f(4), f(4), f(4), f(12)].join("-").toUpperCase();
        return h("MIXUUID", a, 31536e3), a
    }

    function f(a) {
        var b = Math.random().toString(36);
        return a ? b.substr(2, a) : b.substr(2)
    }

    function g(a) {
        for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
            for (var e = c[d]; " " == e.charAt(0);)e = e.substring(1, e.length);
            if (0 == e.indexOf(b))return unescape(e.substring(b.length, e.length))
        }
        return !1
    }

    function h(a, b, c) {
        c = c || 0;
        var d = "";
        if (0 != c) {
            var e = new Date;
            e.setTime(e.getTime() + 1e3 * c), d = "; expires=" + e.toGMTString()
        }
        document.cookie = a + "=" + escape(b) + d + "; path=/"
    }

    var i = {}, j = {}, k = c(), l = (k.android ? 2 : 1, d());
    return l || (l = e()), i.load = a, i.showAd = a, i.config = b, "function" == typeof define && define.amd && define("GH", [], function () {
        return i
    }), i
});