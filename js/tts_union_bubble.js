(function (win, doc) {
    var cqol = {
        api:{
            //图媒体大站
            re:'http://re.taotaosou.com/',
            //淘同款
            browser:'http://browser.re.taotaosou.com/',
            //统计埋点接
            log:'http://log.taotaosou.com/',
            kc:'http://show.kc.taotaosou.com/'
        },
        cqol:'cqol',
        /**
         * 发送一个JSONP请求
         */
        getJSONP:function (url, success) {
            var cbnum = 'cb' + this.getJSONP.counter++,
                cbname = 'cqol.getJSONP.' + cbnum,
                script = document.createElement('script');

            //使用jsonp作为参数名
            if (!url.match(/\?/)) {
                url += '?';
            } else {
                url += '&';
            }
            //!url.match(/\?/) ? url += '?' : url += '&';
            url += 'jsonp=' + cbname;

            this.getJSONP[cbnum] = function (response) {
                try {
                    success(response);
                } finally {
                    delete cqol.getJSONP[cbnum];
                    script.parentNode.removeChild(script);
                }
            };

            script.charset = 'utf-8';
            script.src = url;
            document.body.appendChild(script);
        },
        /**
         * 加载js
         * @param url 链接地址
         * @param callback 回调
         */
        load:function (url, callback) {
            var script = document.createElement("script");

            script.type = 'text/javascript';
            script.charset = 'utf-8';
            script.src = url;

            script.onload = script.onreadystatechange = function () {
                if (!script.isLoad && (!script.readyState || script.readyState === "loaded" || script.readyState === "complete")) {
                    script.isLoad = true;
                    if (typeof callback === 'function') {
                        callback(script);
                    }
                    script.onload = script.onreadystatechange = null;
                    script.parentNode.removeChild(script);
                }
            };

            document.body.appendChild(script);
        },
        /**
         * 添加一个事件模型
         * @param {Element} elm dom节点
         * @param {String} type 事件种类
         * @param {Function} fn 回调函数
         */
        addEvent:function (elm, type, fn) {
            if (elm.addEventListener) {
                elm.addEventListener(type, fn, false);
                return true;
            } else if (elm.attachEvent) {
                elm['e' + type + fn] = fn;
                elm[type + fn] = function () {
                    elm['e' + type + fn](win.event);
                };
                elm.attachEvent('on' + type, elm[type + fn]);
                return true;
            }
            return false;
        },
        /**
         * @param {String} name 必填项
         * @param {String} value 必填项
         * @param {String} hour 过期时间
         */
        setCookie:function (opt) {
            var _this = this;
            if (!opt.name || !opt.value) {
                return false;
            }

            opt.hour = opt.hour * 60 * 60;

            this.load(_this.api.kc + 'setCookie.do?name=' + opt.name + '&value=' + opt.value + '&day=' + opt.hour);
        },
        getCSS:function (obj, attr) {
            return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]);
        },
        /**
         * 添加css样式
         * @param {Element} elm dom节点
         * @example
         * setStyle(elm: "", {
             *     "width": "10px",
             *     "height": "20px"
             * })
         */
        setCSS:function (elm, styles, callback) {
            var setStyle = function (prop, val) {
                elm.style[prop] = val;
            };

            for (var prop in styles) {
                if (!styles.hasOwnProperty(prop)) continue;
                setStyle(prop, styles[prop]);
            }
            if(callback) {
               callback();
            }
        },
        /**
         * @param {String} name 必填项
         * @return {Boolean}
         */
        getCookie:function (name, callback) {
            var _this = this;
            if (!name) {
                return false;
            }

            _this.getJSONP(_this.api.kc + 'getCookie.do?name=' + name, function (data) {
                callback(data);
            });
        }
    };
    if (!win.cqol) {
        //创建唯一回函名称的计数器
        cqol.getJSONP.counter = 0;
        win.cqol = cqol;
    }
    (function (c) {
        var global = '__TTS',
            globalBox;
        //var frameSrc = 'http://www.taotaosou.com/albumPic.html';
        var frameSrc = 'http://www.taotaosou.com/about/tts_demo.html';

        function _css(obj, attr, value) {
            if (arguments.length === 2) {
                return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]);
            }
            else if (arguments.length === 3) {
                obj.style[attr] = value + "px";
            }
        }

        var MOVE_TYPE = {
            BUFFER:1,
            FLEX:2
        };

        function StartMove(obj, oTarget, iType, fnCallBack, fnDuring) {
            var fnMove = null;
            if (obj.timer) {
                clearInterval(obj.timer);
            }

            switch (iType) {
                case MOVE_TYPE.BUFFER:
                    fnMove = DoMoveBuffer;
                    break;
                case MOVE_TYPE.FLEX:
                    fnMove = DoMoveFlex;
                    break;
            }

            obj.timer = setInterval(function () {
                fnMove(obj, oTarget, fnCallBack, fnDuring);
            }, 20);
        }

        function DoMoveBuffer(obj, oTarget, fnCallBack, fnDuring) {
            var bStop = true;
            var speed = 0;
            var attr = '';
            var cur = 0;

            for (attr in oTarget) {
                cur = _css(obj, attr);
                speed = (oTarget[attr] - cur) / 5;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (oTarget[attr] !== cur) {
                    bStop = false, _css(obj, attr, cur + speed);
                }
                //oTarget[attr] !== cur && (bStop = false, _css(obj, attr, cur + speed));
            }

            if (fnDuring)fnDuring.call(obj);
            //bStop && (clearInterval(obj.timer), obj.timer = null, fnCallBack && fnCallBack.call(obj));
            if (bStop) {
                clearInterval(obj.timer);
                obj.timer = null;
                if (fnCallBack)fnCallBack.call(obj);
            }
        }

        function DoMoveFlex(obj, oTarget, fnCallBack, fnDuring) {
            var bStop = true;
            var attr = '';
            var cur = 0;

            for (attr in oTarget) {
                if (!obj.oSpeed)obj.oSpeed = {};
                if (!obj.oSpeed[attr])obj.oSpeed[attr] = 0;
                cur = attr === 'opacity' ? parseInt(css(obj, attr).toFixed(2) * 100, 10) : _css(obj, attr);
                //cur=css(obj, attr);
                if (Math.abs(oTarget[attr] - cur) > 1 || Math.abs(obj.oSpeed[attr]) > 1) {
                    bStop = false;

                    obj.oSpeed[attr] += (oTarget[attr] - cur) / 5;
                    obj.oSpeed[attr] *= 0.7;
                    var maxSpeed = 65;
                    if (Math.abs(obj.oSpeed[attr]) > maxSpeed) {
                        obj.oSpeed[attr] = obj.oSpeed[attr] > 0 ? maxSpeed : -maxSpeed;
                    }

                    _css(obj, attr, cur + obj.oSpeed[attr]);
                }
            }

            if (fnDuring)fnDuring.call(obj);
            //bStop && (clearInterval(obj.timer), obj.timer = null, fnCallBack && fnCallBack.call(obj));
            if (bStop) {
                clearInterval(obj.timer);
                obj.timer = null;
                if (fnCallBack)fnCallBack.call(obj);
            }
        }

        /**
         * 埋点统计
         */
        function statistics() {
            for (var n = 0, nLen = arguments.length; n < nLen; n++) {
                c.load(c.api.log + 'browser_statistics.do?type=' + arguments[n] + '&v=' + new Date().getTime());
            }
        }

        /**
         * 初始化
         */
        function init() {
            var unionWrap = doc.getElementById(global + '_union');
            if (!unionWrap) {
                globalBox = doc.createElement('div');
                globalBox.id = global + '_union';
                doc.body.appendChild(globalBox);
                unionWrap = globalBox;
            }
            var bubbleWrap = doc.createElement('div');
            bubbleWrap.id = 'J_tts_bubble';
            bubbleWrap.className = 'media_bubble';

            var strTmpl = '<a href="javascript:;" id="J_tts_bubble_close" title="关闭" class="media_bubble_close">X</a>' +
                '<iframe id="J_tts_bubble_frame" class="media_bubble_frame" src=" ' + frameSrc + '" vspace="0" hspace="0" allowtransparency="true" scrolling="no" marginheight="0" marginwidth="0" frameborder="0">' +
                '</iframe>';
            bubbleWrap.innerHTML = strTmpl;
            unionWrap.appendChild(bubbleWrap);

            var oClose = document.getElementById('J_tts_bubble_close');
            setTimeout(function () {
                c.setCSS(bubbleWrap, {
                    display:'block'
                });
                new StartMove(bubbleWrap, {height:250}, MOVE_TYPE.BUFFER, function () {
                    //成功展示埋点
                    statistics('Union_Adframe_Autoshow');
                });
            }, 800);
            c.addEvent(oClose, 'click', function () {
                new StartMove(bubbleWrap, {height:0}, MOVE_TYPE.BUFFER, function () {
                    c.setCSS(bubbleWrap, {
                        display:"none"
                    });
                    //广告框关闭按钮被用户点击的次数
                    statistics('Union_Adframe_X');
                });
            });
        }

        /**
         * 每隔一小时出一次泡泡
         */
        c.getCookie('TKPaoPao', function (value) {
            var cookieParam = {
                name:'TKPaoPao',
                value:'show',
                hour:'8'
            };
            //init();
            if (value) {
                return false;
            }
            else {
                c.setCookie(cookieParam);
                try {
                    init();
                } catch (ex) {
                    console.error(ex.stack);
                }
            }
        });
    })(cqol);
})(window, document);