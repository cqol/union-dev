;(function (window, $) {
    var location = window.location,
        host = location.host,
        href = location.href,
        tbListS = 's.taobao.com',
        tbList = 'list.taobao.com',
        domainResult = true,
        API_BROWSER = 'http://www.ttsunion.com/',
        API_TMTAD = 'http://show.kc.taotaosou.com/',
        body = $('body');
    //生效页面
    var domain = [
        'www.taobao.com',
        'www.tmall.com',
        'list.taobao.com',
        's.taobao.com',
        'trade.taobao.com',
        'cart.taobao.com',
        'ju.taobao.com',
        'detail.ju.taobao.com',
        'buy.taobao.com',
        'wuliu.taobao.com',
        //'favorite.taobao.com',
        'shoucang.taobao.com',
        'i.taobao.com',
        'buy.tmall.com',
        'www.7k7k.com',
        'www.4399.com',
        'www.qidian.com',
        'user.qzone.qq.com',
        'item.taobao.com',
        'detail.tmall.com',
        'baoxian.taobao.com',
        'licai.taobao.com'
    ];

    function loadCSS(url) {
        //加载 css 文件，
        //IE6 下无法使用 `innerHTML` <link> 标签，
        //所以这里改用 `createElement`。
        var head = document.head || document.getElementsByTagName('head')[0],
            link = document.createElement('link');

        link.rel = 'stylesheet';
        link.type = 'text/css';

        //Add timestamp
        if (url.match(/\?t=/) || url.match(/&t=/)) {
            url = url;
        } else {
            url += '?t=@@timestamp';
        }

        link.href = url;

        head.appendChild(link);
    }

    function getJSONP(opt) {
        if (typeof opt.url === 'string' && opt.url !== '') {
            var isTimeout = false;

            opt.data = opt.data || {};
            //default: 10s
            opt.timeout = opt.timeout || 10000;

            $.ajax({
                dataType: 'jsonp',
                url: opt.url,
                data: opt.data
            }).done(function (data) {
                    //Get jsonp success
                    if (isTimeout !== true) {
                        isTimeout = undefined;

                        opt.done(data);
                    }
                });

            //Get jsonp timeout
            /*
             * TODO Disable
             setTimeout(function() {
             if (isTimeout !== undefined) {
             isTimeout = true;
             if (opt.fail) {
             opt.fail();
             }
             }
             }, opt.timeout);
             */
        }
    }

    for (var i = 0; i < domain.length; i++) {
        if (host === domain[i]) {
            domainResult = true;
            break;
        } else {
            domainResult = false;
        }
    }
    if (!domainResult) {
        return false;
    }


    //暴露接口
    var siteName = {
        //淘宝 list
        isTBList: host === tbList || host === tbListS,
        //淘宝首页

        isHomeTB: host === 'www.taobao.com',

        isHomeTM: host === 'www.tmall.com',
        // 已购买页
        isTrade: host === 'trade.taobao.com',
        //聚划算页
        isJu: host === 'ju.taobao.com',

        isJuDetail: host === 'detail.ju.taobao.com',
        //淘宝 物流页
        isWuliu: host === 'wuliu.taobao.com',

        is7K7k: host === 'www.7k7k.com',

        is4399: host === 'www.4399.com',

        isCart: host === 'cart.taobao.com',

        isBuy: host === 'buy.taobao.com',

        isTMBuy: host === 'buy.tmall.com',

        isFav: host === 'shoucang.taobao.com',

        isITB: host === 'i.taobao.com',

        isQidian: host === 'www.qidian.com',

        isQzone: host === 'user.qzone.qq.com',

        //淘宝detail
        isTbDetail: host === 'item.taobao.com',

        //天猫detail
        isTmDetail: host === 'detail.tmall.com',

        //淘宝保险
        isBaoxiang: host === 'baoxian.taobao.com',

        isLicai: host === 'licai.taobao.com'
    };
    var api = {
        tmt: {
            status: function () {
                return API_BROWSER + 'getConfig.do?name=jsonp&unionid=10003028&host=' + encodeURIComponent(host) + '&url=' + encodeURIComponent(href) + '&jsonp=?';
            },

            get: function () {
                return API_TMTAD + 'tumeiti.do';
            }
        }
    };
    var model = {
        tmt: {
            status: function () {
                getJSONP({
                    url: api.tmt.status(),
                    done: function (data) {
                        /*data = {"id": 3000100076,
                            "keyType": 2, "minWidth": 300, "minHeight": 300, "maxSize": 1, "bubbleStatus": false,
                            "imgType": ['JPG', 'JPEG', 'PNG'], "priority": ['1'], "confSim": {"adStyle": 1,
                                "tabSize": 3, "popDirect": 1, "popTime": 1, "markerStyle": 1, "markerShow": 1, "hover": 0},
                            "iA": {"st": true,
                                "adList": [
                                    {"pid": 225, "name": "淘宝新首页1", "width": 880, "height": 90, "number": 2, "status": true},
                                    {"pid": 226, "name": " 淘宝list4", "width": 280, "height": 90, "number": 2, "status": true},
                                    {"pid": 223, "name": "淘宝新首页1", "width": 880, "height": 90, "number": 2, "status": true},
                                    {"pid": 224, "name": "淘宝新首页2", "width": 300, "height": 90, "number": 2, "status": true},
                                    {"pid": 227, "name": "已买到的1", "width": 630, "height": 90, "number": 2, "status": true},
                                    {"pid": 228, "name": "已买到的2", "width": 210, "height": 90, "number": 2, "status": true},
                                    {"pid": 229, "name": "已买到的3", "width": 830, "height": 90, "number": 2, "status": true},
                                    {"pid": 233, "name": "聚划算1", "width": 620, "height": 90, "number": 2, "status": true},
                                    {"pid": 234, "name": "聚划算2", "width": 300, "height": 90, "number": 2, "status": true},
                                    {"pid": 235, "name": "聚划算3", "width": 708, "height": 90, "number": 2, "status": true},
                                    {"pid": 230, "name": "物流1", "width": 690, "height": 90, "number": 2, "status": true},
                                    {"pid": 231, "name": "物流2", "width": 300, "height": 90, "number": 2, "status": true},
                                    {"pid": 232, "name": "物流3", "width": 210, "height": 210, "number": 2, "status": true},
                                    {"pid": 236, "name": "4399悬浮", "width": 100, "height": 300, "number": 1, "status": true},
                                    {"pid": 237, "name": "7k7k悬浮", "width": 100, "height": 300, "number": 1, "status": true},
                                    {"pid": 207, "name": "淘宝list1", "width": 230, "height": 230, "number": 1, "status": true},
                                    {"pid": 238, "name": "淘宝新首页4", "width": 880, "height": 90, "number": 1, "status": true},
                                    {"pid": 239, "name": "淘宝新首页5", "width": 300, "height": 90, "number": 1, "status": true},
                                    {"pid": 240, "name": "购物车1", "width": 990, "height": 90, "number": 1, "status": true},
                                    {"pid": 241, "name": "购物车2", "width": 990, "height": 90, "number": 1, "status": true},
                                    {"pid": 242, "name": "淘宝下单页", "width": 950, "height": 90, "number": 1, "status": true},
                                    {"pid": 243, "name": "天猫下单页", "width": 990, "height": 90, "number": 1, "status": true},
                                    {"pid": 244, "name": "旧版收藏夹", "width": 830, "height": 90, "number": 1, "status": true},
                                    {"pid": 245, "name": "新版收藏夹1", "width": 740, "height": 150, "number": 1, "status": true},
                                    {"pid": 246, "name": "新版收藏夹2", "width": 300, "height": 150, "number": 1, "status": true},
                                    {"pid": 247, "name": "我的淘宝1", "width": 720, "height": 90, "number": 1, "status": true},
                                    {"pid": 248, "name": "我的淘宝2", "width": 359, "height": 90, "number": 1, "status": true},
                                    {"pid": 249, "name": "天猫首页1", "width": 940, "height": 90, "number": 1, "status": true},
                                    {"pid": 250, "name": "淘宝list1", "width": 940, "height": 90, "number": 1, "status": true},
                                    {"pid": 205, "name": "淘宝首页2", "width": 300, "height": 300, "number": 2, "status": true}
                                ]}
                        };*/
                        body.trigger('tmt.show', [data]);
                    }
                });
            },
            get: function (adlist, pid, wrap, float) {
                var dataKey;
                if (adlist.length !== 0) {
                    for (var i = 0, len = adlist.length; i < len; i++) {
                        if (adlist[i].pid === pid) {
                            dataKey = adlist[i];
                        }
                    }
                }
                if (typeof dataKey === 'undefined' || !dataKey.status) {
                    wrap.hide();
                    return false;
                }

                body.trigger('tmt.sync.success', [{}, dataKey, wrap, float]);
            },
            showIcon: function(adlist, pid) {
                var dataKey;
                if (adlist.length !== 0) {
                    for (var i = 0, len = adlist.length; i < len; i++) {
                        if (adlist[i].pid === pid) {
                            dataKey = adlist[i];
                        }
                    }
                }
                if (typeof dataKey === 'undefined' || !dataKey.status || typeof localStorage === 'undefined' || localStorage.getItem('show_icon')) {

                    return false;
                } else {
                    return true;
                    //renderIcon(dataKey, wrap);
                }
            },

            fetch: function () {
                this.status();

                body.on('tmt.show', function (e, data) {
                    if (data === false) {
                        return false;
                    } else {
                        if (data.iA.st === false) {
                            return false;
                        } else {
                            body.trigger('tmt.status.init', [data]);
                        }
                    }
                });
            }
        }

    };
    function iconEvent(obj, type) {
        postImg(type + '_rename_ad_success');
        obj.find('.J_icon_body').attr('href','http://tk.taotaosou.com/market/rename/index.html?ditch＝' + type);
        obj.find('.J_icon_close').on('click', function() {
            obj.hide();
            postImg(type + '_rename_ad_close');
            localStorage.setItem('show_icon', true);
        });
        obj.find('.J_icon_body').on('click', function() {
            postImg(type + '_rename_ad_click');
        });
    }
    /**
     * 已图片形式发送一个HTTP请求
     * @param url
     */
    function postImg(type) {
        var img = document.createElement('img'),
            url = 'http://log.taotaosou.com/browser_statistics.do?type=' + type,
            logCon;
        if (typeof url === 'string') {
            //加时间戳，防止走缓存
            if (url.match(/\?/)) {
                url += '&t=';
            } else {
                url += '?t=';
            }
            url += new Date().getTime();
        }
        img.setAttribute('src', url);
        img.setAttribute('width', 0);
        img.setAttribute('height', 0);
        img.style.display = 'none';
        img.onerror = null;
        if (document.getElementById('TK-log')) {
            logCon = document.getElementById('TK-log');
        } else {
            logCon = document.createElement('div');
            logCon.id = 'TK-log';
            document.body.appendChild(logCon);
        }
        logCon.appendChild(img);
    }
    function getBrand(data) {
        var adlist = data.iA.adList;
        var doubleAdWrap,
            AdWrap;
        var float_left = $('<div style="right: 50%; position: fixed; margin-right: 510px; top: 150px;background: #ccc; _position: absolute; _top: expression(documentElement.scrollTop + 200);"></div>'),
            float_right = $('<div style="left: 50%; position: fixed; margin-left: 510px; top: 150px; background: #ccc; _position: absolute; _top: expression(documentElement.scrollTop + 200);"></div>'),
            float_gif3 = $('<div id="niuniu" style="left: 50%; position: fixed; margin-left: 510px; bottom: 100px; _position: absolute; _top: expression(documentElement.scrollTop + 200);"><a class="J_icon_close" title="关闭" href="javascript:;" style="display: block; z-index: 2; position: absolute; top: 25px; right: 10px; height: 15px; width: 15px; _background-image: url(about:blank);"></a><a href="http://tk.taotaosou.com/market/rename/index.html" class="J_icon_body" target="_blank"><img src="http://re.taotaosou.com/browser-static/tmt/h3.gif" alt=""></a></div>'),
            float_gif1 = $('<div style="z-index: 405548810; left: 50%; position: absolute; margin-left: 280px;"><a class="J_icon_close" title="关闭" href="javascript:;" style="display: block; z-index: 2; position: absolute; bottom: 6px; right: 3px; height: 13px; width: 13px; _background-image: url(about:blank);"></a><a href="http://tk.taotaosou.com/market/rename/index.html" class="J_icon_body" target="_blank"><img src="http://re.taotaosou.com/browser-static/tmt/h2.gif" alt=""></a></div>'),
            float_gif2 = $('<div style="z-index: 405548810; position: absolute; margin-left: 410px;"><a class="J_icon_close" title="关闭" href="javascript:;" style="display: block; z-index: 2; position: absolute; bottom: 6px; right: 3px; height: 13px; width: 13px; _background-image: url(about:blank);"></a><a href="http://tk.taotaosou.com/market/rename/index.html" class="J_icon_body" target="_blank"><img src="http://re.taotaosou.com/browser-static/tmt/h4.gif" alt=""></a></div>'),
            float_gif4 = $('<div style="z-index: 405548810; position: absolute; margin: 6px 0 0 33px;"><a class="J_icon_close" title="关闭" href="javascript:;" style="display: block; z-index: 2; position: absolute; bottom: 6px; right: 3px; height: 13px; width: 13px; _background-image: url(about:blank);"></a><a href="http://tk.taotaosou.com/market/rename/index.html" class="J_icon_body" target="_blank"><img src="http://re.taotaosou.com/browser-static/tmt/h4.gif" alt=""></a></div>');

        if (siteName.isTBList) {
            if ($('.tb-bottom')[0]) {
                doubleAdWrap = $('<div id="J_cqol_TTS" style="height: 90px; width: 1170px; margin: 0 auto;"></div>');
                doubleAdWrap.insertBefore($('.tb-bottom'));
                model.tmt.get(adlist, 225, doubleAdWrap, 'left');
                model.tmt.get(adlist, 226, doubleAdWrap, 'right');
            }
            if ($('.ad-p4p-baobei')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertBefore($('.ad-p4p-baobei'));
                model.tmt.get(adlist, 207, AdWrap, 'none');
            }
        }
        else if (siteName.isHomeTB) {
            if ($('#J_Map')[0]) {
                doubleAdWrap = $('<div></div>');
                doubleAdWrap.insertBefore($('#J_Map'));
                model.tmt.get(adlist, 223, doubleAdWrap);
                model.tmt.get(adlist, 224, doubleAdWrap, 'right');
            }
            if ($('#J_Tzh')[0]) {
                doubleAdWrap = $('<div style="height: 300px;"></div>');
                doubleAdWrap.insertBefore($('#J_Tzh'));
                model.tmt.get(adlist, 205, doubleAdWrap, 'none');
            }
            if ($('#J_Sale')[0]) {
                doubleAdWrap = $('<div style="margin-top: 10px;"></div>');
                doubleAdWrap.insertBefore($('#J_Sale'));
                model.tmt.get(adlist, 238, doubleAdWrap);
                model.tmt.get(adlist, 239, doubleAdWrap, 'right');
            }
        }
        else if (siteName.isTrade) {
            if ($('#main-content')[0]) {
                doubleAdWrap = $('<div style="height: 90px; overflow: hidden;"></div>');
                doubleAdWrap.insertBefore($('#main-content'));
                model.tmt.get(adlist, 227, doubleAdWrap);
                model.tmt.get(adlist, 228, doubleAdWrap, 'right');
            }
            if ($('.bought-list')[0]) {
                AdWrap = $('<div style="height: 90px; overflow: hidden; "></div>');
                AdWrap.insertAfter($('.bought-list'));
                model.tmt.get(adlist, 229, AdWrap, 'none');
            }
        }
        else if (siteName.isWuliu) {
            if ($('#wl-order')[0]) {
                AdWrap = $('<div style="height: 90px; overflow: hidden;"></div>');
                AdWrap.insertBefore($('#wl-order'));
                model.tmt.get(adlist, 230, AdWrap);
                model.tmt.get(adlist, 231, AdWrap, 'right');
            }
            if ($('.wl-orderItem')[0]) {
                AdWrap = $('<div style="overflow: hidden;"></div>');
                AdWrap.insertAfter($('.wl-orderItem'));
                model.tmt.get(adlist, 232, AdWrap);
            }
        }
        else if (siteName.isJu) {
            if ($('.mainbanner')[0]) {
                AdWrap = $('<div style="height: 90px; overflow: hidden;"></div>');
                AdWrap.insertBefore($('.mainbanner'));
                model.tmt.get(adlist, 233, AdWrap);
                model.tmt.get(adlist, 234, AdWrap, 'right');
            }
            if ($('.detail-detail')[0]) {
                AdWrap = $('<div style="height: 90px; overflow: hidden;"></div>');
                AdWrap.insertBefore($('.detail-detail'));
                model.tmt.get(adlist, 235, AdWrap);
            }
        }
        else if (siteName.isJuDetail) {
            if ($('.detail-detail')[0]) {
                AdWrap = $('<div style="height: 90px; overflow: hidden;"></div>');
                AdWrap.insertBefore($('.detail-detail'));
                model.tmt.get(adlist, 235, AdWrap);
            }
        }
        else if (siteName.isCart) {
            if ($('#J_Cart')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertBefore($('#J_Cart'));
                model.tmt.get(adlist, 240, AdWrap, 'none');
            }
            if ($('#J_Cart')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertAfter($('#J_Cart'));
                model.tmt.get(adlist, 241, AdWrap, 'none');
            }
            if (model.tmt.showIcon(adlist, 254)) {
                float_gif3.appendTo(body);
                iconEvent(float_gif3, 'TBcart');
            }
        }
        else if (siteName.isBuy) {
            if ($('#J_SiteNav')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertAfter($('#J_SiteNav'));
                model.tmt.get(adlist, 242, AdWrap, 'none');
            }
        }
        else if (siteName.isTMBuy) {
            if ($('#J_Flowstep')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertAfter($('#J_Flowstep'));
                model.tmt.get(adlist, 243, AdWrap, 'none');
            }

        }
        else if (siteName.isFav) {
            if ($('.fav-list')[0]) {
                doubleAdWrap = $('<div style="height: 150px; width: 1070px; margin: 0 auto;"></div>');
                doubleAdWrap.insertAfter($('.fav-list'));
                model.tmt.get(adlist, 245, doubleAdWrap);
                model.tmt.get(adlist, 246, doubleAdWrap, 'right');
            }
            else if ($('#fav-list')[0]) {
                doubleAdWrap = $('<div style="height: 150px; width: 1070px; margin: 0 auto;"></div>');
                doubleAdWrap.insertAfter($('#fav-list'));
                model.tmt.get(adlist, 245, doubleAdWrap);
                model.tmt.get(adlist, 246, doubleAdWrap, 'right');
            }
            if ($('#main-content')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertBefore($('#main-content #tab'));
                model.tmt.get(adlist, 244, AdWrap, 'none');
            }
        }
        else if (siteName.isITB) {
            if ($('#mt-calendar')[0]) {
                doubleAdWrap = $('<div></div>');
                doubleAdWrap.insertAfter($('#mt-calendar'));
                model.tmt.get(adlist, 247, doubleAdWrap);
                model.tmt.get(adlist, 248, doubleAdWrap, 'right');
            }
        }
        else if (siteName.isHomeTM) {
            if ($('#J_Brand')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertBefore($('#J_Brand'));
                model.tmt.get(adlist, 249, AdWrap, 'none');
            }
            if ($('#floorLink3')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertBefore($('#floorLink3'));
                model.tmt.get(adlist, 250, AdWrap, 'none');
            }
            if ($('#J_FloorNvzCon')[0]) {
                doubleAdWrap = $('<div style="overflow: hidden; _zoom: 1; margin: 8px 0;"></div>');
                doubleAdWrap.insertAfter($('#J_FloorNvzCon'));
                model.tmt.get(adlist, 249, doubleAdWrap);
                model.tmt.get(adlist, 250, doubleAdWrap, 'right');
            }
        }
        else if (siteName.isBaoxiang) {
            if ($('.floor-car')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertBefore($('.floor-car'));
                model.tmt.get(adlist, 259, AdWrap, 'none');
            }
        }
        else if (siteName.isLicai) {
            if ($('.index-floor4')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertBefore($('.index-floor4'));
                model.tmt.get(adlist, 260, AdWrap, 'none');
            }
        }
        // 两个广告对联
        else if (siteName.is4399) {
            float_left.appendTo(body);
            float_right.appendTo(body);
            model.tmt.get(adlist, 236, float_left);
            model.tmt.get(adlist, 236, float_right);
            if (model.tmt.showIcon(adlist, 252)) {
                float_gif3.css({
                    'bottom': 300
                }).appendTo(body);
                iconEvent(float_gif3, '4399');
            }
            if ($('.sch_my')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertAfter($('.sch_my'));
                model.tmt.get(adlist, 210, AdWrap, 'none');
            }
            if ($('#blank_hs')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertAfter($('#blank_hs'));
                model.tmt.get(adlist, 209, AdWrap, 'none');
            }
        }
        else if (siteName.is7K7k) {
            float_left.appendTo(body);
            float_right.appendTo(body);
            model.tmt.get(adlist, 237, float_left);
            model.tmt.get(adlist, 237, float_right);
            if (model.tmt.showIcon(adlist, 253)) {
                float_gif3.css({
                    'bottom': 300
                }).appendTo(body);

                iconEvent(float_gif3, '7k7k');
            }
            if ($('.main-top')[0]) {
                AdWrap = $('<div></div>');
                AdWrap.insertAfter($('.main-top').eq(0));
                model.tmt.get(adlist, 211, AdWrap, 'none');
            }
        }
        else if (siteName.isQidian) {
            if ($('.top_searchbox')) {
                AdWrap = $('<div style="height: 90px; width: 960px; margin: 0 auto"></div>');
                AdWrap.insertBefore($('.DH11'));
                AdWrap.html(frameStr(960, 90, 'http://www.taotaosou.com/about/tts_demo.html'));
                AdWrap.html('<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="960" height="90" src="http://www.taotaosou.com/about/tts_demo.html"></iframe>');
            }
        }
        //新年活动入口
        else if (siteName.isTbDetail) {
            var getTKcon = null,
                getIdscon = null,
                delyTKcon = null,
                delyIdscon = null;
            if (model.tmt.showIcon(adlist, 255)) {
                delyTKcon = setInterval(function() {
                    if (document.getElementById('TK-con')) {
                        getTKcon = $('#TK-con');
                        float_gif2.css({
                            'top': getTKcon.offset().top - 69,
                            'left': getTKcon.offset().left
                        }).appendTo(body);
                        //$('<div><a href="#" target="_blank"><img src="http://re.taotaosou.com/browser-static/tmt/h2.gif" alt=""></a></div>').appendTo('#J_PromoPrice');
                        iconEvent(float_gif2, 'TBdetail');
                        clearInterval(delyTKcon);
                        delyTKcon = null;
                    }
                }, 200);
            }
            if (model.tmt.showIcon(adlist, 258)) {
                delyIdscon = setInterval(function() {
                    if (document.getElementById('lds_rcmd_hbox')) {
                        getIdscon = $('#lds_rcmd_hbox');
                        float_gif4.appendTo(getIdscon);
                        iconEvent(float_gif4, 'TBfind');
                        clearInterval(delyIdscon);
                        delyIdscon = null;
                    }
                }, 200)
            }
        }
        else if (siteName.isTmDetail) {
            var getTKcon = null,
                getIdscon = null,
                delyTKcon = null,
                delyIdscon = null;
            if (model.tmt.showIcon(adlist, 256)) {
                delyTKcon = setInterval(function() {
                    if (document.getElementById('TK-con')) {
                        getTKcon = $('#TK-con');
                        float_gif1.css({
                            'top': getTKcon.offset().top - 84
                        }).appendTo(body);
                        //$('<div><a href="#" target="_blank"><img src="http://re.taotaosou.com/browser-static/tmt/h2.gif" alt=""></a></div>').appendTo('#J_PromoPrice');
                        iconEvent(float_gif1, 'TMdetail');
                        clearInterval(delyTKcon);
                        delyTKcon = null;
                    }
                }, 200);
            }
            if (model.tmt.showIcon(adlist, 257)) {
                delyIdscon = setInterval(function() {
                    if (document.getElementById('lds_rcmd_hbox')) {
                        getIdscon = $('#lds_rcmd_hbox');
                        float_gif4.appendTo(getIdscon);
                        iconEvent(float_gif4, 'TMfind');
                        clearInterval(delyIdscon);
                        delyIdscon = null;
                    }
                }, 200)
            }
        }
        else if (siteName.isQzone) {
            if (model.tmt.showIcon(adlist, 251)) {
                float_gif3.appendTo(body);
                iconEvent(float_gif3, 'qzone');
            }
        }

    }

    function frameStr(w, h, url) {
        var str = '<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="' +
            w + '" height="' + h + '" src="' + url + '&height=' + h + '&width=' + w + '"></iframe>';

        return str;
    }

    function frameUrl(key, pid) {
        var str = 'http://show.kc.taotaosou.com/brand.do?brandKeyword=' +
            encodeURIComponent(key) + '&keyword=' + encodeURIComponent(key) + '&brandItemSize=3&keywordType=true&source=' + pid +
            '&brandRandom=100&adType=2&itemSize=3';
        return str;
    }

    /**
     *
     * @param data 对应数据
     * @param dataKey 配置数据
     * @param warp 容器
     * @param float 浮动方向
     */
    function render(data, dataKey, warp, float) {
        /*if (data.pinpai.length === 0) {
            warp.hide();
        }*/
        var con;
        //bigData;
        //dataTmpl = '<ul>{{each brandData}}<li {{if frist}}class="on"{{/if}}>${index}</li>{{/each}}</ul><div id="banner_list">{{each brandData}}<a href="${href}"target="_blank"><img src="${media}"title="${title}"border="0"></a>{{/each}}</div>';
        if (float === 'right') {
            con = $('<div class="J_TTS_banner" style="float: right;"></div>');
        }
        else if (float === 'none') {
            con = $('<div class="J_TTS_banner" style="float: none; margin: 0 auto;"></div>');
        }
        else if (float === 'left') {
            con = $('<div class="J_TTS_banner" style="float: left;"></div>');
        }
        else {
            con = $('<div class="J_TTS_banner"></div>');
        }

        con.css({
            'width': dataKey.width,
            'height': dataKey.height
        }).appendTo(warp);
        con.html(frameStr(dataKey.width, dataKey.height, frameUrl(dataKey.name, dataKey.pid)));
        /*$.each(data.pinpai, function (i, item) {
         if (i === 0) {
         $.extend(item, {
         frist:true
         });
         }
         $.extend(item, {
         index:i + 1,
         href: 'http://search.taotaosou.com/transfer.htm?' + item.href
         });
         });
         bigData = {
         brandData:data.pinpai
         };
         $.tmpl(dataTmpl, bigData).appendTo(con);
         if (data.pinpai.length === 1) {
         con.find('.on').hide();
         }
         tabSlid(con);*/
    }

    //轮播
    /*function tabSlid(box) {
     var t = 0, n = 0, count;
     var itemList = box.find('#banner_list a'),
     listNum = box.find('li');
     count = box.find('#banner_list a').length;
     if (count === 1) {
     return;
     }
     box.find('#banner_list a:not(:first-child)').hide();
     box.find('li').on('click', function () {
     var i = $(this).text() - 1;//获取Li元素内的值，即1，2，3，4
     n = i;
     if (i >= count) {
     return false;
     }
     itemList.filter(':visible').fadeOut(500).parent().children().eq(i).fadeIn(1000);
     $(this).toggleClass('on');
     $(this).siblings().removeAttr('class');
     });
     t = setInterval(function () {
     n = n >= (count - 1) ? 0 : ++n;
     listNum.eq(n).trigger('click');
     }, 4000);
     box.on('mouseenter', function () {
     clearInterval(t);
     });
     box.on('mouseleave', function () {
     t = setInterval(function () {
     n = n >= (count - 1) ? 0 : ++n;
     listNum.eq(n).trigger('click');
     }, 4000);
     });
     }*/

    loadCSS('http://re.taotaosou.com/browser-static/tmt/insetTmt.css');
    model.tmt.fetch();
    body.on({
        'tmt.status.init': function (e, data) {
            body.on({
                'tmt.sync.success': function (e, data, dataKey, warp, float) {
                    render(data, dataKey, warp, float);
                }
            });
            getBrand(data);
        }
    });
})(window, TTSUI);