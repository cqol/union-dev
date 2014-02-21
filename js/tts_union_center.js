(function (win) {
    var href = win.location.href,
        host = win.location.host,
        ua = win.navigator.userAgent;
    var arrHref = ["lady.qq.com", "luxury.qq.com", "lady.qq.com", "ent.qq.com", "astro.lady.qq.com", "lady.qq.com", "luxury.qq.com", "games.qq.com", "fashion.qq.com", "sports.qq.com", "auto.qq.com",
        "ent.sina.com.cn", "slide.eladies.sina.com.cn", "sports.sina.com.cn", "slide.style.sina.com.cn", "club.eladies.sina.com.cn", "games.sina.com.cn", "slide.baby.sina.com.cn", "blog.sina", "photo.auto.sina.com.cn", "fashion.sina.com.cn",
        "fashion.163.com", "ent.163.com", "sports.163.com", "lady.163.com", "travel.163.com", "fashion.163.com", "game.163.com", "bbs.gz.house.163.com", "auto.163.com",
        "women.sohu.com", "pic.yule.sohu.com", "sports.sohu.com", "club.baobao.sohu.com", "pic.baobao.sohu", "auto.sohu.com",
        "fashion.ifeng.com", "ent.ifeng.com", "games.ifeng.com", "sports.ifeng.com", "auto.ifeng.com", "bitauto.com",
        "ent.cn.yahoo.com/t", "digi.cn.yahoo.com/t", "autos.cn.yahoo.com/t", "travel.cn.yahoo.com/t", "sports.cn.yahoo.com/t", "lady.cn.yahoo.com/t",
        "babytree", "39.net", "image.soso.com/image", "day.2345.com", "88.hinews.cn", "v.youku.com", "user.qzone.qq.com",
        "bbs.duowan.com", "lol.duowan.com", "dnf.duowan.com", "newgame.duowan.com", "soufun.com", "autohome.com.cn", "zhidao.baidu.com",
        "newgame.17173.com", "yoka.com", "qiushibaike.com", "kl688.com", "9yao.com", "imanhua.com", "home.pengyou.com", "wenwen.soso.com/z",
        "news.4399.com", "7k7k.com", "www.4399.com", "ellechina.com", "rayli.com.cn", "aili.com", "che168.com", "t.qq.com", "mail.qq.com", "weibo.com",
        "www.hao123.com", "2345.com", "haoqq.com", "tieba.baidu.com", "tv.sohu.com", "www.baidu.com/s?", "tieba.baidu.com/p",
        "zongheng.com", "aipai.com", "yzz.cn", "iqiyi.com", "kuaiwan.com", "duowan.com", "265g.com", "ali213.net", "xxsy.net", "jjwxc.net",
        "www.itravelqq.com", "travel.sohu.com", "travel.sina.com.cn", "item.jd.com", "v.baidu.com", "car.autohome.com.cn"
    ];

    /**
     * 使用 <script> 加载资源
     * 用来加载 .js 文件和记录埋点
     */
    function load(url, callback) {
        var script = document.createElement('script'),
            container;

        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.src = url;

        script.onload = script.onreadystatechange = function () {
            if (!script.isLoad && (!script.readyState || script.readyState === 'loaded' || script.readyState === 'complete')) {
                script.isLoad = true;
                if (typeof callback === 'function') {
                    callback(script);
                }
                script.onload = script.onreadystatechange = null;
                script.parentNode.removeChild(script);
            }
        };

        if (document.getElementById('site-nav')) {
            container = document.getElementById('site-nav');
        } else {
            container = document.body;
        }

        container.appendChild(script);
    }

    //老站图媒体 与 弹窗
    function oldTmt() {
        for (var i = 0; i < arrHref.length; i++) {
            if (href.indexOf(arrHref[i]) >= 0 ||
                href.match(/^.+image.baidu.com\/detail.+&column=(%E6%9C%8D%E9%A5%B0|%E6%98%8E%E6%98%9F).+$/)) {
                load('http://re.taotaosou.com/browser-static/tmt/tts_union_media.js?t=@@timestamp');
                break;
            }
        }
    }

    // 嵌入广告
    function insetAD() {
        var rhost = /taobao|7k7k|4399|tmall|qidian|user.qzone.qq.com/;
        if (host.match(rhost)) {
            load('http://re.taotaosou.com/browser-static/tmt/insetTmt.js?t=@@timestamp');
        }
    }

    function ready(callback) {
        var ttsDomReady = function (success) {
            if (document.readyState === 'complete') {
                success();
            } else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', success, false);
                win.addEventListener('load', success, false);
            } else {
                document.attachEvent('onreadystatechange', success);
            }
        };

        if (!callback) {
            return false;
        }

        if (ua.match(/MSIE/)) {
            ttsDomReady(function () {
                callback();
            });
        } else {
            callback();
        }
    }

    /**
     * 初始化淘同款
     */
    ready(function () {
        // 嵌入广告
        insetAD();

        // 媒体弹窗
        oldTmt();
    });
})(window);
