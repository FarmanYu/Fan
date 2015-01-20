/*!
 * Cookies.js - 0.3.1
 * Wednesday, April 24 2013 @ 2:28 AM EST
 *
 * Copyright (c) 2013, Scott Hamper
 * Licensed under the MIT license,
 * http://www.opensource.org/licenses/MIT
 */
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.3
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
function FastClick(t, e) {
    "use strict";

    function n(t, e) {
        return function() {
            return t.apply(e, arguments);
        };
    }
    var o;
    if (e = e || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null,
        this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = e.touchBoundary || 10,
        this.layer = t, this.tapDelay = e.tapDelay || 200, !FastClick.notNeeded(t)) {
        for (var i = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = this, r = 0, a = i.length; a > r; r++) s[i[r]] = n(s[i[r]], s);
        deviceIsAndroid && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0),
                t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0),
            t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1),
            t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1),
            Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, n, o) {
                var i = Node.prototype.removeEventListener;
                "click" === e ? i.call(t, e, n.hijacked || n, o) : i.call(t, e, n, o);
            }, t.addEventListener = function(e, n, o) {
                var i = Node.prototype.addEventListener;
                "click" === e ? i.call(t, e, n.hijacked || (n.hijacked = function(t) {
                    t.propagationStopped || n(t);
                }), o) : i.call(t, e, n, o);
            }), "function" == typeof t.onclick && (o = t.onclick, t.addEventListener("click", function(t) {
                o(t);
            }, !1), t.onclick = null);
    }
}

! function(t) {
    "use strict";
    var e = function(t, n, o) {
        return 1 === arguments.length ? e.get(t) : e.set(t, n, o);
    };
    e._document = document, e._navigator = navigator, e.defaults = {
        path: "/"
    }, e.get = function(t) {
        return e._cachedDocumentCookie !== e._document.cookie && e._renewCache(), e._cache[t];
    }, e.set = function(n, o, i) {
        return i = e._getExtendedOptions(i), i.expires = e._getExpiresDate(o === t ? -1 : i.expires),
            e._document.cookie = e._generateCookieString(n, o, i), e;
    }, e.expire = function(n, o) {
        return e.set(n, t, o);
    }, e._getExtendedOptions = function(n) {
        return {
            path: n && n.path || e.defaults.path,
            domain: n && n.domain || e.defaults.domain,
            expires: n && n.expires || e.defaults.expires,
            secure: n && n.secure !== t ? n.secure : e.defaults.secure
        };
    }, e._isValidDate = function(t) {
        return "[object Date]" === Object.prototype.toString.call(t) && !isNaN(t.getTime());
    }, e._getExpiresDate = function(t, n) {
        switch (n = n || new Date(), typeof t) {
            case "number":
                t = new Date(n.getTime() + 1e3 * t);
                break;

            case "string":
                t = new Date(t);
        }
        if (t && !e._isValidDate(t)) throw new Error("`expires` parameter cannot be converted to a valid Date instance");
        return t;
    }, e._generateCookieString = function(t, e, n) {
        t = encodeURIComponent(t), e = (e + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent),
            n = n || {};
        var o = t + "=" + e;
        return o += n.path ? ";path=" + n.path : "", o += n.domain ? ";domain=" + n.domain : "",
            o += n.expires ? ";expires=" + n.expires.toGMTString() : "", o += n.secure ? ";secure" : "";
    }, e._getCookieObjectFromString = function(n) {
        for (var o = {}, i = n ? n.split("; ") : [], s = 0; s < i.length; s++) {
            var r = e._getKeyValuePairFromCookieString(i[s]);
            o[r.key] === t && (o[r.key] = r.value);
        }
        return o;
    }, e._getKeyValuePairFromCookieString = function(t) {
        var e = t.indexOf("=");
        return e = 0 > e ? t.length : e, {
            key: decodeURIComponent(t.substr(0, e)),
            value: decodeURIComponent(t.substr(e + 1))
        };
    }, e._renewCache = function() {
        e._cache = e._getCookieObjectFromString(e._document.cookie), e._cachedDocumentCookie = e._document.cookie;
    }, e._areEnabled = function() {
        return e._navigator.cookieEnabled || "1" === e.set("cookies.js", 1).get("cookies.js");
    }, e.enabled = e._areEnabled(), "function" == typeof define && define.amd ? define(function() {
        return e;
    }) : "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = e),
        exports.Cookies = e) : window.Cookies = e;
}();

var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0,
    deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
    deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
    deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
    deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;

FastClick.prototype.needsClick = function(t) {
    "use strict";
    switch (t.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (t.disabled) return !0;
            break;

        case "input":
            if (deviceIsIOS && "file" === t.type || t.disabled) return !0;
            break;

        case "label":
        case "video":
            return !0;
    }
    return /\bneedsclick\b/.test(t.className);
}, FastClick.prototype.needsFocus = function(t) {
    "use strict";
    switch (t.nodeName.toLowerCase()) {
        case "textarea":
            return !0;

        case "select":
            return !deviceIsAndroid;

        case "input":
            switch (t.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                    return !1;
            }
            return !t.disabled && !t.readOnly;

        default:
            return /\bneedsfocus\b/.test(t.className);
    }
}, FastClick.prototype.sendClick = function(t, e) {
    "use strict";
    var n, o;
    document.activeElement && document.activeElement !== t && document.activeElement.blur(),
        o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null),
        n.forwardedTouchEvent = !0, t.dispatchEvent(n);
}, FastClick.prototype.determineEventType = function(t) {
    "use strict";
    return deviceIsAndroid && "select" === t.tagName.toLowerCase() ? "mousedown" : "click";
}, FastClick.prototype.focus = function(t) {
    "use strict";
    var e;
    deviceIsIOS && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type ? (e = t.value.length,
        t.setSelectionRange(e, e)) : t.focus();
}, FastClick.prototype.updateScrollParent = function(t) {
    "use strict";
    var e, n;
    if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
        n = t;
        do {
            if (n.scrollHeight > n.offsetHeight) {
                e = n, t.fastClickScrollParent = n;
                break;
            }
            n = n.parentElement;
        } while (n);
    }
    e && (e.fastClickLastScrollTop = e.scrollTop);
}, FastClick.prototype.getTargetElementFromEventTarget = function(t) {
    "use strict";
    return t.nodeType === Node.TEXT_NODE ? t.parentNode : t;
}, FastClick.prototype.onTouchStart = function(t) {
    "use strict";
    var e, n, o;
    if (t.targetTouches.length > 1) return !0;
    if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0],
        deviceIsIOS) {
        if (o = window.getSelection(), o.rangeCount && !o.isCollapsed) return !0;
        if (!deviceIsIOS4) {
            if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
            this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e);
        }
    }
    return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e,
        this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0;
}, FastClick.prototype.touchHasMoved = function(t) {
    "use strict";
    var e = t.changedTouches[0],
        n = this.touchBoundary;
    return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1;
}, FastClick.prototype.onTouchMove = function(t) {
    "use strict";
    return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1,
        this.targetElement = null), !0) : !0;
}, FastClick.prototype.findControl = function(t) {
    "use strict";
    return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
}, FastClick.prototype.onTouchEnd = function(t) {
    "use strict";
    var e, n, o, i, s, r = this.targetElement;
    if (!this.trackingClick) return !0;
    if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
    if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, n = this.trackingClickStart,
        this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (s = t.changedTouches[0],
            r = document.elementFromPoint(s.pageX - window.pageXOffset, s.pageY - window.pageYOffset) || r,
            r.fastClickScrollParent = this.targetElement.fastClickScrollParent), o = r.tagName.toLowerCase(),
        "label" === o) {
        if (e = this.findControl(r)) {
            if (this.focus(r), deviceIsAndroid) return !1;
            r = e;
        }
    } else if (this.needsFocus(r)) return t.timeStamp - n > 100 || deviceIsIOS && window.top !== window && "input" === o ? (this.targetElement = null, !1) : (this.focus(r), this.sendClick(r, t), deviceIsIOS && "select" === o || (this.targetElement = null,
        t.preventDefault()), !1);
    return deviceIsIOS && !deviceIsIOS4 && (i = r.fastClickScrollParent, i && i.fastClickLastScrollTop !== i.scrollTop) ? !0 : (this.needsClick(r) || (t.preventDefault(),
        this.sendClick(r, t)), !1);
}, FastClick.prototype.onTouchCancel = function() {
    "use strict";
    this.trackingClick = !1, this.targetElement = null;
}, FastClick.prototype.onMouse = function(t) {
    "use strict";
    return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0,
        t.stopPropagation(), t.preventDefault(), !1) : !0 : !0;
}, FastClick.prototype.onClick = function(t) {
    "use strict";
    var e;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null),
        e);
}, FastClick.prototype.destroy = function() {
    "use strict";
    var t = this.layer;
    deviceIsAndroid && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0),
            t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0),
        t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1),
        t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1);
}, FastClick.notNeeded = function(t) {
    "use strict";
    var e, n, o;
    if ("undefined" == typeof window.ontouchstart) return !0;
    if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
        if (!deviceIsAndroid) return !0;
        if (e = document.querySelector("meta[name=viewport]")) {
            if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
            if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0;
        }
    }
    if (deviceIsBlackBerry10 && (o = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),
            o[1] >= 10 && o[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
        if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
        if (document.documentElement.scrollWidth <= window.outerWidth) return !0;
    }
    return "none" === t.style.msTouchAction ? !0 : !1;
}, FastClick.attach = function(t, e) {
    "use strict";
    return new FastClick(t, e);
}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
    "use strict";
    return FastClick;
}) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach,
    module.exports.FastClick = FastClick) : window.FastClick = FastClick;

var Prism = function() {
    var t = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
        e = self.Prism = {
            util: {
                encode: function(t) {
                    return t instanceof n ? new n(t.type, e.util.encode(t.content), t.alias) : "Array" === e.util.type(t) ? t.map(e.util.encode) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
                },
                type: function(t) {
                    return Object.prototype.toString.call(t).match(/\[object (\w+)\]/)[1];
                },
                clone: function(t) {
                    var n = e.util.type(t);
                    switch (n) {
                        case "Object":
                            var o = {};
                            for (var i in t) t.hasOwnProperty(i) && (o[i] = e.util.clone(t[i]));
                            return o;

                        case "Array":
                            return t.slice();
                    }
                    return t;
                }
            },
            languages: {
                extend: function(t, n) {
                    var o = e.util.clone(e.languages[t]);
                    for (var i in n) o[i] = n[i];
                    return o;
                },
                insertBefore: function(t, n, o, i) {
                    i = i || e.languages;
                    var s = i[t];
                    if (2 == arguments.length) {
                        o = arguments[1];
                        for (var r in o) o.hasOwnProperty(r) && (s[r] = o[r]);
                        return s;
                    }
                    var a = {};
                    for (var c in s)
                        if (s.hasOwnProperty(c)) {
                            if (c == n)
                                for (var r in o) o.hasOwnProperty(r) && (a[r] = o[r]);
                            a[c] = s[c];
                        }
                    return e.languages.DFS(e.languages, function(e, n) {
                        n === i[t] && e != t && (this[e] = a);
                    }), i[t] = a;
                },
                DFS: function(t, n, o) {
                    for (var i in t) t.hasOwnProperty(i) && (n.call(t, i, t[i], o || i), "Object" === e.util.type(t[i]) ? e.languages.DFS(t[i], n) : "Array" === e.util.type(t[i]) && e.languages.DFS(t[i], n, i));
                }
            },
            highlightAll: function(t, n) {
                for (var o, i = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), s = 0; o = i[s++];) e.highlightElement(o, t === !0, n);
            },
            highlightElement: function(n, o, i) {
                for (var s, r, a = n; a && !t.test(a.className);) a = a.parentNode;
                if (a && (s = (a.className.match(t) || [, ""])[1], r = e.languages[s]), r) {
                    n.className = n.className.replace(t, "").replace(/\s+/g, " ") + " language-" + s,
                        a = n.parentNode, /pre/i.test(a.nodeName) && (a.className = a.className.replace(t, "").replace(/\s+/g, " ") + " language-" + s);
                    var c = n.textContent;
                    if (c) {
                        var l = {
                            element: n,
                            language: s,
                            grammar: r,
                            code: c
                        };
                        e.hooks.run("before-highlight", l), l.highlightedCode = e.highlight(l.code, l.grammar, l.language),
                            e.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, i && i.call(n),
                            e.hooks.run("after-highlight", l);
                    }
                }
            },
            highlight: function(t, o, i) {
                var s = e.tokenize(t, o);
                return n.stringify(e.util.encode(s), i);
            },
            tokenize: function(t, n) {
                var o = e.Token,
                    i = [t],
                    s = n.rest;
                if (s) {
                    for (var r in s) n[r] = s[r];
                    delete n.rest;
                }
                t: for (var r in n)
                    if (n.hasOwnProperty(r) && n[r]) {
                        var a = n[r];
                        a = "Array" === e.util.type(a) ? a : [a];
                        for (var c = 0; c < a.length; ++c) {
                            var l = a[c],
                                u = l.inside,
                                p = !!l.lookbehind,
                                h = 0,
                                d = l.alias;
                            l = l.pattern || l;
                            for (var f = 0; f < i.length; f++) {
                                var g = i[f];
                                if (i.length > t.length) break t;
                                if (!(g instanceof o)) {
                                    l.lastIndex = 0;
                                    var y = l.exec(g);
                                    if (y) {
                                        p && (h = y[1].length);
                                        var m = y.index - 1 + h,
                                            y = y[0].slice(h),
                                            v = y.length,
                                            w = m + v,
                                            b = g.slice(0, m + 1),
                                            _ = g.slice(w + 1),
                                            k = [f, 1];
                                        b && k.push(b);
                                        var C = new o(r, u ? e.tokenize(y, u) : y, d);
                                        k.push(C), _ && k.push(_), Array.prototype.splice.apply(i, k);
                                    }
                                }
                            }
                        }
                    }
                return i;
            },
            hooks: {
                all: {},
                add: function(t, n) {
                    var o = e.hooks.all;
                    o[t] = o[t] || [], o[t].push(n);
                },
                run: function(t, n) {
                    var o = e.hooks.all[t];
                    if (o && o.length)
                        for (var i, s = 0; i = o[s++];) i(n);
                }
            }
        },
        n = e.Token = function(t, e, n) {
            this.type = t, this.content = e, this.alias = n;
        };
    return n.stringify = function(t, o, i) {
        if ("string" == typeof t) return t;
        if ("[object Array]" == Object.prototype.toString.call(t)) return t.map(function(e) {
            return n.stringify(e, o, t);
        }).join("");
        var s = {
            type: t.type,
            content: n.stringify(t.content, o, i),
            tag: "span",
            classes: ["token", t.type],
            attributes: {},
            language: o,
            parent: i
        };
        if ("comment" == s.type && (s.attributes.spellcheck = "true"), t.alias) {
            var r = "Array" === e.util.type(t.alias) ? t.alias : [t.alias];
            Array.prototype.push.apply(s.classes, r);
        }
        e.hooks.run("wrap", s);
        var a = "";
        for (var c in s.attributes) a += c + '="' + (s.attributes[c] || "") + '"';
        return "<" + s.tag + ' class="' + s.classes.join(" ") + '" ' + a + ">" + s.content + "</" + s.tag + ">";
    }, self.Prism;
}();

Prism.languages.markup = {
        comment: /<!--[\w\W]*?-->/g,
        prolog: /<\?.+?\?>/,
        doctype: /<!DOCTYPE.+?>/,
        cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
        tag: {
            pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
            inside: {
                tag: {
                    pattern: /^<\/?[\w:-]+/i,
                    inside: {
                        punctuation: /^<\/?/,
                        namespace: /^[\w-]+?:/
                    }
                },
                "attr-value": {
                    pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
                    inside: {
                        punctuation: /=|>|"/g
                    }
                },
                punctuation: /\/?>/g,
                "attr-name": {
                    pattern: /[\w:-]+/g,
                    inside: {
                        namespace: /^[\w-]+?:/
                    }
                }
            }
        },
        entity: /\&#?[\da-z]{1,8};/gi
    }, Prism.hooks.add("wrap", function(t) {
        "entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"));
    }), Prism.languages.css = {
        comment: /\/\*[\w\W]*?\*\//g,
        atrule: {
            pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
            inside: {
                punctuation: /[;:]/g
            }
        },
        url: /url\((["']?).*?\1\)/gi,
        selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
        property: /(\b|\B)[\w-]+(?=\s*:)/gi,
        string: /("|')(\\?.)*?\1/g,
        important: /\B!important\b/gi,
        punctuation: /[\{\};:]/g,
        "function": /[-a-z0-9]+(?=\()/gi
    }, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
        style: {
            pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
            inside: {
                tag: {
                    pattern: /<style[\w\W]*?>|<\/style>/gi,
                    inside: Prism.languages.markup.tag.inside
                },
                rest: Prism.languages.css
            },
            alias: "language-css"
        }
    }), Prism.languages.insertBefore("inside", "attr-value", {
        "style-attr": {
            pattern: /\s*style=("|').+?\1/gi,
            inside: {
                "attr-name": {
                    pattern: /^\s*style/gi,
                    inside: Prism.languages.markup.tag.inside
                },
                punctuation: /^\s*=\s*['"]|['"]\s*$/,
                "attr-value": {
                    pattern: /.+/gi,
                    inside: Prism.languages.css
                }
            },
            alias: "language-css"
        }
    }, Prism.languages.markup.tag)), Prism.languages.clike = {
        comment: [{
            pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
            lookbehind: !0
        }, {
            pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
            lookbehind: !0
        }],
        string: /("|')(\\?.)*?\1/g,
        "class-name": {
            pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
            lookbehind: !0,
            inside: {
                punctuation: /(\.|\\)/
            }
        },
        keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
        "boolean": /\b(true|false)\b/g,
        "function": {
            pattern: /[a-z0-9_]+\(/gi,
            inside: {
                punctuation: /\(/
            }
        },
        number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
        operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
        ignore: /&(lt|gt|amp);/gi,
        punctuation: /[{}[\];(),.:]/g
    }, Prism.languages.javascript = Prism.languages.extend("clike", {
        keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
        number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
    }), Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
            lookbehind: !0
        }
    }), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
        script: {
            pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
            inside: {
                tag: {
                    pattern: /<script[\w\W]*?>|<\/script>/gi,
                    inside: Prism.languages.markup.tag.inside
                },
                rest: Prism.languages.javascript
            },
            alias: "language-javascript"
        }
    }), Prism.languages.php = Prism.languages.extend("clike", {
        keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,
        constant: /\b[A-Z0-9_]{2,}\b/g,
        comment: {
            pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,
            lookbehind: !0
        }
    }), Prism.languages.insertBefore("php", "keyword", {
        delimiter: /(\?>|<\?php|<\?)/gi,
        variable: /(\$\w+)\b/gi,
        "package": {
            pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        }
    }), Prism.languages.insertBefore("php", "operator", {
        property: {
            pattern: /(->)[\w]+/g,
            lookbehind: !0
        }
    }), Prism.languages.markup && (Prism.hooks.add("before-highlight", function(t) {
        "php" === t.language && (t.tokenStack = [], t.backupCode = t.code, t.code = t.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function(e) {
            return t.tokenStack.push(e), "{{{PHP" + t.tokenStack.length + "}}}";
        }));
    }), Prism.hooks.add("before-insert", function(t) {
        "php" === t.language && (t.code = t.backupCode, delete t.backupCode);
    }), Prism.hooks.add("after-highlight", function(t) {
        if ("php" === t.language) {
            for (var e, n = 0; e = t.tokenStack[n]; n++) t.highlightedCode = t.highlightedCode.replace("{{{PHP" + (n + 1) + "}}}", Prism.highlight(e, t.grammar, "php"));
            t.element.innerHTML = t.highlightedCode;
        }
    }), Prism.hooks.add("wrap", function(t) {
        "php" === t.language && "markup" === t.type && (t.content = t.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'));
    }), Prism.languages.insertBefore("php", "comment", {
        markup: {
            pattern: /<[^?]\/?(.*?)>/g,
            inside: Prism.languages.markup
        },
        php: /\{\{\{PHP[0-9]+\}\}\}/g
    })), Prism.languages.coffeescript = Prism.languages.extend("javascript", {
        comment: [/([#]{3}\s*\r?\n(.*\s*\r*\n*)\s*?\r?\n[#]{3})/g, /(\s|^)([#]{1}[^#^\r^\n]{2,}?(\r?\n|$))/g],
        keyword: /\b(this|window|delete|class|extends|namespace|extend|ar|let|if|else|while|do|for|each|of|return|in|instanceof|new|with|typeof|try|catch|finally|null|undefined|break|continue)\b/g
    }), Prism.languages.insertBefore("coffeescript", "keyword", {
        "function": {
            pattern: /[a-z|A-z]+\s*[:|=]\s*(\([.|a-z\s|,|:|{|}|\"|\'|=]*\))?\s*-&gt;/gi,
            inside: {
                "function-name": /[_?a-z-|A-Z-]+(\s*[:|=])| @[_?$?a-z-|A-Z-]+(\s*)| /g,
                operator: /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g
            }
        },
        "attr-name": /[_?a-z-|A-Z-]+(\s*:)| @[_?$?a-z-|A-Z-]+(\s*)| /g
    }), Prism.languages.c = Prism.languages.extend("clike", {
        string: /("|')([^\n\\\1]|\\.|\\\r*\n)*?\1/g,
        keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/g,
        operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\//g
    }), Prism.languages.insertBefore("c", "string", {
        property: {
            pattern: /((^|\n)\s*)#\s*[a-z]+([^\n\\]|\\.|\\\r*\n)*/gi,
            lookbehind: !0,
            inside: {
                string: {
                    pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/g,
                    lookbehind: !0
                }
            }
        }
    }), delete Prism.languages.c["class-name"], delete Prism.languages.c["boolean"],
    Prism.languages.cpp = Prism.languages.extend("c", {
        keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/g,
        "boolean": /\b(true|false)\b/g,
        operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/g
    }), Prism.languages.insertBefore("cpp", "keyword", {
        "class-name": {
            pattern: /(class\s+)[a-z0-9_]+/gi,
            lookbehind: !0
        }
    }), Prism.languages.python = {
        comment: {
            pattern: /(^|[^\\])#.*?(\r?\n|$)/g,
            lookbehind: !0
        },
        string: /"""[\s\S]+?"""|("|')(\\?.)*?\1/g,
        keyword: /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,
        "boolean": /\b(True|False)\b/g,
        number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,
        operator: /[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,
        ignore: /&(lt|gt|amp);/gi,
        punctuation: /[{}[\];(),.:]/g
    }, Prism.languages.ruby = Prism.languages.extend("clike", {
        comment: /#[^\r\n]*(\r?\n|$)/g,
        keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
        builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
        constant: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g
    }), Prism.languages.insertBefore("ruby", "keyword", {
        regex: {
            pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
            lookbehind: !0
        },
        variable: /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
        symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g
    }),
    function(t, e) {
        "use strict";

        function n(t, e) {
            var n, o;
            e = e || {}, t = "raven" + t.substr(0, 1).toUpperCase() + t.substr(1), document.createEvent ? (n = document.createEvent("HTMLEvents"),
                n.initEvent(t, !0, !0)) : (n = document.createEventObject(), n.eventType = t);
            for (o in e) l(e, o) && (n[o] = e[o]);
            if (document.createEvent) document.dispatchEvent(n);
            else try {
                document.fireEvent("on" + n.eventType.toLowerCase(), n);
            } catch (i) {}
        }

        function o(t) {
            this.name = "RavenConfigError", this.message = t;
        }

        function i(t) {
            var e = U.exec(t),
                n = {},
                i = 7;
            try {
                for (; i--;) n[H[i]] = e[i] || "";
            } catch (s) {
                throw new o("Invalid DSN: " + t);
            }
            if (n.pass) throw new o("Do not specify your private key in the DSN!");
            return n;
        }

        function s(t) {
            return "undefined" == typeof t;
        }

        function r(t) {
            return "function" == typeof t;
        }

        function a(t) {
            return "string" == typeof t;
        }

        function c(t) {
            for (var e in t) return !1;
            return !0;
        }

        function l(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }

        function u(t, e) {
            var n, o;
            if (s(t.length))
                for (n in t) l(t, n) && e.call(null, n, t[n]);
            else if (o = t.length)
                for (n = 0; o > n; n++) e.call(null, n, t[n]);
        }

        function p() {
            A = "?sentry_version=4&sentry_client=raven-js/" + F.VERSION + "&sentry_key=" + I;
        }

        function h(t, e) {
            var o = [];
            t.stack && t.stack.length && u(t.stack, function(t, e) {
                var n = d(e);
                n && o.push(n);
            }), n("handle", {
                stackInfo: t,
                options: e
            }), g(t.name, t.message, t.url, t.lineno, o, e);
        }

        function d(t) {
            if (t.url) {
                var e, n = {
                        filename: t.url,
                        lineno: t.line,
                        colno: t.column,
                        "function": t.func || "?"
                    },
                    o = f(t);
                if (o) {
                    var i = ["pre_context", "context_line", "post_context"];
                    for (e = 3; e--;) n[i[e]] = o[e];
                }
                return n.in_app = !(!O.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n["function"]) || /raven\.(min\.)?js$/.test(n.filename)),
                    n;
            }
        }

        function f(t) {
            if (t.context && O.fetchContext) {
                for (var e = t.context, n = ~~(e.length / 2), o = e.length, i = !1; o--;)
                    if (e[o].length > 300) {
                        i = !0;
                        break;
                    }
                if (i) {
                    if (s(t.column)) return;
                    return [
                        [], e[n].substr(t.column, 50), []
                    ];
                }
                return [e.slice(0, n), e[n], e.slice(n + 1)];
            }
        }

        function g(t, e, n, o, i, s) {
            var r, a;
            e += "", ("Error" !== t || e) && (O.ignoreErrors.test(e) || (i && i.length ? (n = i[0].filename || n,
                i.reverse(), r = {
                    frames: i
                }) : n && (r = {
                frames: [{
                    filename: n,
                    lineno: o,
                    in_app: !0
                }]
            }), e = m(e, 100), O.ignoreUrls && O.ignoreUrls.test(n) || (!O.whitelistUrls || O.whitelistUrls.test(n)) && (a = o ? e + " at " + o : e,
                w(y({
                    exception: {
                        type: t,
                        value: e
                    },
                    stacktrace: r,
                    culprit: n,
                    message: a
                }, s)))));
        }

        function y(t, e) {
            return e ? (u(e, function(e, n) {
                t[e] = n;
            }), t) : t;
        }

        function m(t, e) {
            return t.length <= e ? t : t.substr(0, e) + "\u2026";
        }

        function v() {
            var t = {
                url: document.location.href,
                headers: {
                    "User-Agent": navigator.userAgent
                }
            };
            return document.referrer && (t.headers.Referer = document.referrer), t;
        }

        function w(t) {
            _() && (t = y({
                    project: $,
                    logger: O.logger,
                    site: O.site,
                    platform: "javascript",
                    request: v()
                }, t), t.tags = y(O.tags, t.tags), t.extra = y(O.extra, t.extra), c(t.tags) && delete t.tags,
                c(t.extra) && delete t.extra, R && (t.user = R), r(O.dataCallback) && (t = O.dataCallback(t)), (!r(O.shouldSendCallback) || O.shouldSendCallback(t)) && (L = t.event_id || (t.event_id = C()),
                    b(t)));
        }

        function b(t) {
            var e = new Image(),
                o = N + A + "&sentry_data=" + encodeURIComponent(JSON.stringify(t));
            e.onload = function() {
                n("success", {
                    data: t,
                    src: o
                });
            }, e.onerror = e.onabort = function() {
                n("failure", {
                    data: t,
                    src: o
                });
            }, e.src = o;
        }

        function _() {
            return M ? N ? !0 : (S("error", "Error: Raven has not been configured."), !1) : !1;
        }

        function k(t) {
            for (var e, n = [], o = 0, i = t.length; i > o; o++) e = t[o], a(e) ? n.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : e && e.source && n.push(e.source);
            return new RegExp(n.join("|"), "i");
        }

        function C() {
            return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                var e = 16 * Math.random() | 0,
                    n = "x" == t ? e : 3 & e | 8;
                return n.toString(16);
            });
        }

        function S(e, n) {
            t.console && console[e] && F.debug && console[e](n);
        }

        function E() {
            var e = t.RavenConfig;
            e && F.config(e.dsn, e.config).install();
        }
        var x = {
                remoteFetching: !1,
                collectWindowErrors: !0,
                linesOfContext: 7
            },
            T = [].slice,
            P = "?";
        x.wrap = function(t) {
            function e() {
                try {
                    return t.apply(this, arguments);
                } catch (e) {
                    throw x.report(e), e;
                }
            }
            return e;
        }, x.report = function() {
            function n(t) {
                a(), f.push(t);
            }

            function o(t) {
                for (var e = f.length - 1; e >= 0; --e) f[e] === t && f.splice(e, 1);
            }

            function i() {
                c(), f = [];
            }

            function s(t, e) {
                var n = null;
                if (!e || x.collectWindowErrors) {
                    for (var o in f)
                        if (l(f, o)) try {
                            f[o].apply(null, [t].concat(T.call(arguments, 2)));
                        } catch (i) {
                            n = i;
                        }
                    if (n) throw n;
                }
            }

            function r(t, e, n, o, i) {
                var r = null;
                if (m) x.computeStackTrace.augmentStackTraceWithInitialElement(m, e, n, t), u();
                else if (i) r = x.computeStackTrace(i),
                    s(r, !0);
                else {
                    var a = {
                        url: e,
                        line: n,
                        column: o
                    };
                    a.func = x.computeStackTrace.guessFunctionName(a.url, a.line), a.context = x.computeStackTrace.gatherContext(a.url, a.line),
                        r = {
                            message: t,
                            url: document.location.href,
                            stack: [a]
                        }, s(r, !0);
                }
                return h ? h.apply(this, arguments) : !1;
            }

            function a() {
                d || (h = t.onerror, t.onerror = r, d = !0);
            }

            function c() {
                d && (t.onerror = h, d = !1, h = e);
            }

            function u() {
                var t = m,
                    e = g;
                g = null, m = null, y = null, s.apply(null, [t, !1].concat(e));
            }

            function p(e, n) {
                var o = T.call(arguments, 1);
                if (m) {
                    if (y === e) return;
                    u();
                }
                var i = x.computeStackTrace(e);
                if (m = i, y = e, g = o, t.setTimeout(function() {
                        y === e && u();
                    }, i.incomplete ? 2e3 : 0), n !== !1) throw e;
            }
            var h, d, f = [],
                g = null,
                y = null,
                m = null;
            return p.subscribe = n, p.unsubscribe = o, p.uninstall = i, p;
        }(), x.computeStackTrace = function() {
            function e(e) {
                if (!x.remoteFetching) return "";
                try {
                    var n = function() {
                            try {
                                return new t.XMLHttpRequest();
                            } catch (e) {
                                return new t.ActiveXObject("Microsoft.XMLHTTP");
                            }
                        },
                        o = n();
                    return o.open("GET", e, !1), o.send(""), o.responseText;
                } catch (i) {
                    return "";
                }
            }

            function n(t) {
                if (!a(t)) return [];
                if (!l(_, t)) {
                    var n = ""; - 1 !== t.indexOf(document.domain) && (n = e(t)), _[t] = n ? n.split("\n") : [];
                }
                return _[t];
            }

            function o(t, e) {
                var o, i = /function ([^(]*)\(([^)]*)\)/,
                    r = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,
                    a = "",
                    c = 10,
                    l = n(t);
                if (!l.length) return P;
                for (var u = 0; c > u; ++u)
                    if (a = l[e - u] + a, !s(a)) {
                        if (o = r.exec(a)) return o[1];
                        if (o = i.exec(a)) return o[1];
                    }
                return P;
            }

            function i(t, e) {
                var o = n(t);
                if (!o.length) return null;
                var i = [],
                    r = Math.floor(x.linesOfContext / 2),
                    a = r + x.linesOfContext % 2,
                    c = Math.max(0, e - r - 1),
                    l = Math.min(o.length, e + a - 1);
                e -= 1;
                for (var u = c; l > u; ++u) s(o[u]) || i.push(o[u]);
                return i.length > 0 ? i : null;
            }

            function r(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, "\\$&");
            }

            function c(t) {
                return r(t).replace("<", "(?:<|&lt;)").replace(">", "(?:>|&gt;)").replace("&", "(?:&|&amp;)").replace('"', '(?:"|&quot;)').replace(/\s+/g, "\\s+");
            }

            function u(t, e) {
                for (var o, i, s = 0, r = e.length; r > s; ++s)
                    if ((o = n(e[s])).length && (o = o.join("\n"),
                            i = t.exec(o))) return {
                        url: e[s],
                        line: o.substring(0, i.index).split("\n").length,
                        column: i.index - o.lastIndexOf("\n", i.index) - 1
                    };
                return null;
            }

            function p(t, e, o) {
                var i, s = n(e),
                    a = new RegExp("\\b" + r(t) + "\\b");
                return o -= 1, s && s.length > o && (i = a.exec(s[o])) ? i.index : null;
            }

            function h(e) {
                for (var n, o, i, s, a = [t.location.href], l = document.getElementsByTagName("script"), p = "" + e, h = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, d = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, f = 0; f < l.length; ++f) {
                    var g = l[f];
                    g.src && a.push(g.src);
                }
                if (i = h.exec(p)) {
                    var y = i[1] ? "\\s+" + i[1] : "",
                        m = i[2].split(",").join("\\s*,\\s*");
                    n = r(i[3]).replace(/;$/, ";?"), o = new RegExp("function" + y + "\\s*\\(\\s*" + m + "\\s*\\)\\s*{\\s*" + n + "\\s*}");
                } else o = new RegExp(r(p).replace(/\s+/g, "\\s+"));
                if (s = u(o, a)) return s;
                if (i = d.exec(p)) {
                    var v = i[1];
                    if (n = c(i[2]), o = new RegExp("on" + v + "=[\\'\"]\\s*" + n + "\\s*[\\'\"]", "i"),
                        s = u(o, a[0])) return s;
                    if (o = new RegExp(n), s = u(o, a)) return s;
                }
                return null;
            }

            function d(t) {
                if (!t.stack) return null;
                for (var e, n, r = /^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?((?:file|https?|chrome-extension):.*?):(\d+)(?::(\d+))?\)?\s*$/i, a = /^\s*(\S*)(?:\((.*?)\))?@((?:file|https?|chrome).*?):(\d+)(?::(\d+))?\s*$/i, c = t.stack.split("\n"), l = [], u = /^(.*) is undefined$/.exec(t.message), h = 0, d = c.length; d > h; ++h) {
                    if (e = a.exec(c[h])) n = {
                        url: e[3],
                        func: e[1] || P,
                        args: e[2] ? e[2].split(",") : "",
                        line: +e[4],
                        column: e[5] ? +e[5] : null
                    };
                    else {
                        if (!(e = r.exec(c[h]))) continue;
                        n = {
                            url: e[2],
                            func: e[1] || P,
                            line: +e[3],
                            column: e[4] ? +e[4] : null
                        };
                    }!n.func && n.line && (n.func = o(n.url, n.line)), n.line && (n.context = i(n.url, n.line)),
                        l.push(n);
                }
                return l.length ? (l[0].line && !l[0].column && u ? l[0].column = p(u[1], l[0].url, l[0].line) : l[0].column || s(t.columnNumber) || (l[0].column = t.columnNumber + 1), {
                    name: t.name,
                    message: t.message,
                    url: document.location.href,
                    stack: l
                }) : null;
            }

            function f(t) {
                for (var e, n = t.stacktrace, s = / line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i, r = n.split("\n"), a = [], c = 0, l = r.length; l > c; c += 2)
                    if (e = s.exec(r[c])) {
                        var u = {
                            line: +e[1],
                            column: +e[2],
                            func: e[3] || e[4],
                            args: e[5] ? e[5].split(",") : [],
                            url: e[6]
                        };
                        if (!u.func && u.line && (u.func = o(u.url, u.line)), u.line) try {
                            u.context = i(u.url, u.line);
                        } catch (p) {}
                        u.context || (u.context = [r[c + 1]]), a.push(u);
                    }
                return a.length ? {
                    name: t.name,
                    message: t.message,
                    url: document.location.href,
                    stack: a
                } : null;
            }

            function g(e) {
                var s = e.message.split("\n");
                if (s.length < 4) return null;
                var r, a, p, h, d = /^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,
                    f = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,
                    g = /^\s*Line (\d+) of function script\s*$/i,
                    y = [],
                    m = document.getElementsByTagName("script"),
                    v = [];
                for (a in m) l(m, a) && !m[a].src && v.push(m[a]);
                for (a = 2, p = s.length; p > a; a += 2) {
                    var w = null;
                    if (r = d.exec(s[a])) w = {
                        url: r[2],
                        func: r[3],
                        line: +r[1]
                    };
                    else if (r = f.exec(s[a])) {
                        w = {
                            url: r[3],
                            func: r[4]
                        };
                        var b = +r[1],
                            _ = v[r[2] - 1];
                        if (_ && (h = n(w.url))) {
                            h = h.join("\n");
                            var k = h.indexOf(_.innerText);
                            k >= 0 && (w.line = b + h.substring(0, k).split("\n").length);
                        }
                    } else if (r = g.exec(s[a])) {
                        var C = t.location.href.replace(/#.*$/, ""),
                            S = r[1],
                            E = new RegExp(c(s[a + 1]));
                        h = u(E, [C]), w = {
                            url: C,
                            line: h ? h.line : S,
                            func: ""
                        };
                    }
                    if (w) {
                        w.func || (w.func = o(w.url, w.line));
                        var x = i(w.url, w.line),
                            T = x ? x[Math.floor(x.length / 2)] : null;
                        w.context = x && T.replace(/^\s*/, "") === s[a + 1].replace(/^\s*/, "") ? x : [s[a + 1]],
                            y.push(w);
                    }
                }
                return y.length ? {
                    name: e.name,
                    message: s[0],
                    url: document.location.href,
                    stack: y
                } : null;
            }

            function y(t, e, n, s) {
                var r = {
                    url: e,
                    line: n
                };
                if (r.url && r.line) {
                    t.incomplete = !1, r.func || (r.func = o(r.url, r.line)), r.context || (r.context = i(r.url, r.line));
                    var a = / '([^']+)' /.exec(s);
                    if (a && (r.column = p(a[1], r.url, r.line)), t.stack.length > 0 && t.stack[0].url === r.url) {
                        if (t.stack[0].line === r.line) return !1;
                        if (!t.stack[0].line && t.stack[0].func === r.func) return t.stack[0].line = r.line,
                            t.stack[0].context = r.context, !1;
                    }
                    return t.stack.unshift(r), t.partial = !0, !0;
                }
                return t.incomplete = !0, !1;
            }

            function m(t, e) {
                for (var n, i, s, r = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, a = [], c = {}, l = !1, u = m.caller; u && !l; u = u.caller)
                    if (u !== v && u !== x.report) {
                        if (i = {
                                url: null,
                                func: P,
                                line: null,
                                column: null
                            }, u.name ? i.func = u.name : (n = r.exec(u.toString())) && (i.func = n[1]), s = h(u)) {
                            i.url = s.url, i.line = s.line, i.func === P && (i.func = o(i.url, i.line));
                            var d = / '([^']+)' /.exec(t.message || t.description);
                            d && (i.column = p(d[1], s.url, s.line));
                        }
                        c["" + u] ? l = !0 : c["" + u] = !0, a.push(i);
                    }
                e && a.splice(0, e);
                var f = {
                    name: t.name,
                    message: t.message,
                    url: document.location.href,
                    stack: a
                };
                return y(f, t.sourceURL || t.fileName, t.line || t.lineNumber, t.message || t.description),
                    f;
            }

            function v(t, e) {
                var n = null;
                e = null == e ? 0 : +e;
                try {
                    if (n = f(t)) return n;
                } catch (o) {
                    if (b) throw o;
                }
                try {
                    if (n = d(t)) return n;
                } catch (o) {
                    if (b) throw o;
                }
                try {
                    if (n = g(t)) return n;
                } catch (o) {
                    if (b) throw o;
                }
                try {
                    if (n = m(t, e + 1)) return n;
                } catch (o) {
                    if (b) throw o;
                }
                return {};
            }

            function w(t) {
                t = (null == t ? 0 : +t) + 1;
                try {
                    throw new Error();
                } catch (e) {
                    return v(e, t + 1);
                }
            }
            var b = !1,
                _ = {};
            return v.augmentStackTraceWithInitialElement = y, v.guessFunctionName = o, v.gatherContext = i,
                v.ofCaller = w, v;
        }();
        var D, L, N, R, I, $, A, B = t.Raven,
            M = !(!t.JSON || !t.JSON.stringify),
            O = {
                logger: "javascript",
                ignoreErrors: [],
                ignoreUrls: [],
                whitelistUrls: [],
                includePaths: [],
                collectWindowErrors: !0,
                tags: {},
                extra: {}
            },
            j = !1,
            F = {
                VERSION: "1.1.16",
                debug: !0,
                noConflict: function() {
                    return t.Raven = B, F;
                },
                config: function(t, e) {
                    if (N) return S("error", "Error: Raven has already been configured"), F;
                    if (!t) return F;
                    var n = i(t),
                        o = n.path.lastIndexOf("/"),
                        s = n.path.substr(1, o);
                    return e && u(e, function(t, e) {
                            O[t] = e;
                        }), O.ignoreErrors.push("Script error."), O.ignoreErrors.push("Script error"), O.ignoreErrors.push("Javascript error: Script error on line 0"),
                        O.ignoreErrors.push("Javascript error: Script error. on line 0"), O.ignoreErrors = k(O.ignoreErrors),
                        O.ignoreUrls = O.ignoreUrls.length ? k(O.ignoreUrls) : !1, O.whitelistUrls = O.whitelistUrls.length ? k(O.whitelistUrls) : !1,
                        O.includePaths = k(O.includePaths), I = n.user, $ = n.path.substr(o + 1), N = "//" + n.host + (n.port ? ":" + n.port : "") + "/" + s + "api/" + $ + "/store/",
                        n.protocol && (N = n.protocol + ":" + N), O.fetchContext && (x.remoteFetching = !0),
                        O.linesOfContext && (x.linesOfContext = O.linesOfContext), x.collectWindowErrors = !!O.collectWindowErrors,
                        p(), F;
                },
                install: function() {
                    return _() && !j && (x.report.subscribe(h), j = !0), F;
                },
                context: function(t, n, o) {
                    return r(t) && (o = n || [], n = t, t = e), F.wrap(t, n).apply(this, o);
                },
                wrap: function(t, n) {
                    function o() {
                        for (var e = [], o = arguments.length, i = !t || t && t.deep !== !1; o--;) e[o] = i ? F.wrap(t, arguments[o]) : arguments[o];
                        try {
                            return n.apply(this, e);
                        } catch (s) {
                            throw F.captureException(s, t), s;
                        }
                    }
                    if (s(n) && !r(t)) return t;
                    if (r(t) && (n = t, t = e), !r(n)) return n;
                    if (n.__raven__) return n;
                    for (var i in n) l(n, i) && (o[i] = n[i]);
                    return o.__raven__ = !0, o.__inner__ = n, o;
                },
                uninstall: function() {
                    return x.report.uninstall(), j = !1, F;
                },
                captureException: function(t, e) {
                    if (!(t instanceof Error)) return F.captureMessage(t, e);
                    D = t;
                    try {
                        x.report(t, e);
                    } catch (n) {
                        if (t !== n) throw n;
                    }
                    return F;
                },
                captureMessage: function(t, e) {
                    return w(y({
                        message: t + ""
                    }, e)), F;
                },
                setUserContext: function(t) {
                    return R = t, F;
                },
                setExtraContext: function(t) {
                    return O.extra = t || {}, F;
                },
                setTagsContext: function(t) {
                    return O.tags = t || {}, F;
                },
                lastException: function() {
                    return D;
                },
                lastEventId: function() {
                    return L;
                }
            };
        F.setUser = F.setUserContext;
        var H = "source protocol user pass host port path".split(" "),
            U = /^(?:(\w+):)?\/\/(\w+)(:\w+)?@([\w\.-]+)(?::(\d+))?(\/.*)/;
        o.prototype = new Error(), o.prototype.constructor = o, E(), t.Raven = F, "function" == typeof define && define.amd && define("raven", [], function() {
            return F;
        });
    }(this),
    /*
     * Copyright 2013-2015 Thibaut Courouble and other contributors
     *
     * This source code is licensed under the terms of the Mozilla
     * Public License, v. 2.0, a copy of which may be obtained at:
     * http://mozilla.org/MPL/2.0/
     */
    function() {
        console.log(this)
    }.call(this),
    function() {
        var t, e, n, o, i, s, r, a, c, l, u, p, h, d;
        t = {
            json: "application/json",
            html: "text/html"
        }, this.ajax = function(t) {
            var s;
            return o(t), h(t), s = new XMLHttpRequest(), s.open(t.type, t.url, t.async), n(s, t),
                i(s, t), s.send(t.data), t.async ? {
                    abort: e.bind(void 0, s)
                } : p(s, t);
        }, ajax.defaults = {
            async: !0,
            dataType: "json",
            timeout: 3e4,
            type: "GET"
        }, o = function(t) {
            var e;
            for (e in ajax.defaults) null == t[e] && (t[e] = ajax.defaults[e]);
        }, h = function(t) {
            t.data && ("GET" === t.type ? (t.url += "?" + d(t.data), t.data = null) : t.data = d(t.data));
        }, d = function(t) {
            var e, n;
            return function() {
                var o;
                o = [];
                for (e in t) n = t[e], o.push("" + encodeURIComponent(e) + "=" + encodeURIComponent(n));
                return o;
            }().join("&");
        }, n = function(t, e) {
            e.async && (t.timer = setTimeout(l.bind(void 0, t, e), e.timeout), t.onreadystatechange = function() {
                4 === t.readyState && (clearTimeout(t.timer), r(t, e));
            });
        }, i = function(e, n) {
            var o, i, r;
            n.headers || (n.headers = {}), n.contentType && (n.headers["Content-Type"] = n.contentType), !n.headers["Content-Type"] && n.data && "GET" !== n.type && (n.headers["Content-Type"] = "application/x-www-form-urlencoded"),
                n.dataType && (n.headers.Accept = t[n.dataType] || n.dataType), s(n.url) && (n.headers["X-Requested-With"] = "XMLHttpRequest"),
                r = n.headers;
            for (o in r) i = r[o], e.setRequestHeader(o, i);
        }, r = function(t, e) {
            var n, o;
            200 <= (o = t.status) && 300 > o ? null != (n = p(t, e)) ? c(n, t, e) : a("invalid", t, e) : a("error", t, e);
        }, c = function(t, e, n) {
            var o;
            null != (o = n.success) && o.call(n.context, t, e, n);
        }, a = function(t, e, n) {
            var o;
            null != (o = n.error) && o.call(n.context, t, e, n);
        }, l = function(t, e) {
            t.abort(), a("timeout", t, e);
        }, e = function(t) {
            clearTimeout(t.timer), t.onreadystatechange = null, t.abort();
        }, s = function(t) {
            return 0 !== t.indexOf("http") || 0 === t.indexOf(location.origin);
        }, p = function(t, e) {
            return "json" === e.dataType ? u(t.responseText) : t.responseText;
        }, u = function(t) {
            try {
                return JSON.parse(t);
            } catch (e) {}
        };
    }.call(this),
    function() {
        var t = [].slice;
        this.Events = {
            on: function(t, e) {
                var n, o, i, s, r;
                if (t.indexOf(" ") >= 0)
                    for (r = t.split(" "), i = 0, s = r.length; s > i; i++) n = r[i],
                        this.on(n, e);
                else(null != (o = null != this._callbacks ? this._callbacks : this._callbacks = {})[t] ? o[t] : o[t] = []).push(e);
                return this;
            },
            off: function(t, e) {
                var n, o, i, s, r, a, c;
                if (t.indexOf(" ") >= 0)
                    for (a = t.split(" "), s = 0, r = a.length; r > s; s++) i = a[s],
                        this.off(i, e);
                else(n = null != (c = this._callbacks) ? c[t] : void 0) && (o = n.indexOf(e)) >= 0 && (n.splice(o, 1),
                    n.length || delete this._callbacks[t]);
                return this;
            },
            trigger: function() {
                var e, n, o, i, s, r, a, c;
                if (i = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], o = null != (a = this._callbacks) ? a[i] : void 0)
                    for (c = o.slice(0),
                        s = 0, r = c.length; r > s; s++) n = c[s], "function" == typeof n && n.apply(null, e);
                return "all" !== i && this.trigger.apply(this, ["all", i].concat(t.call(e))),
                    this;
            },
            removeEvent: function(t) {
                var e, n, o, i;
                if (null != this._callbacks)
                    for (i = t.split(" "), n = 0, o = i.length; o > n; n++) e = i[n],
                        delete this._callbacks[e];
                return this;
            }
        };
    }.call(this),
    /*
     * Based on github.com/visionmedia/page.js
     * Licensed under the MIT license
     * Copyright 2012 TJ Holowaychuk <tj@vision-media.ca>
     */
    function() {
        var t, e, n, o, i, s, r, a, c, l, u;
        l = !1, i = null, n = [], this.page = function(t, o) {
            var i;
            "function" == typeof t ? page("*", t) : "function" == typeof o ? (i = new e(t), n.push(i.middleware(o))) : "string" == typeof t ? page.show(t, o) : page.start(t);
        }, page.start = function(t) {
            null == t && (t = {}), l || (l = !0, addEventListener("popstate", a), addEventListener("click", r),
                page.replace(o(), null, null, !0));
        }, page.stop = function() {
            l && (l = !1, removeEventListener("click", r), removeEventListener("popstate", a));
        }, page.show = function(e, n) {
            var o;
            if (e !== (null != i ? i.path : void 0)) return o = new t(e, n), i = o.state, page.dispatch(o),
                o.pushState(), u(), o;
        }, page.replace = function(e, n, o, s) {
            var r;
            return r = new t(e, n || i), r.init = s, i = r.state, o || page.dispatch(r), r.replaceState(),
                s || o || u(), r;
        }, page.dispatch = function(t) {
            var e, o;
            e = 0, (o = function() {
                var i;
                (i = n[e++]) && i(t, o);
            })();
        }, o = function() {
            return location.pathname + location.search + location.hash;
        }, t = function() {
            function t(t, e) {
                var n, o;
                this.path = null != t ? t : "/", this.state = null != e ? e : {}, this.pathname = this.path.replace(/(?:\?([^#]*))?(?:#(.*))?$/, function(t) {
                        return function(e, n, o) {
                            return t.query = n, t.hash = o, "";
                        };
                    }(this)), null == (n = this.state).id && (n.id = this.constructor.stateId++), null == (o = this.state).sessionId && (o.sessionId = this.constructor.sessionId),
                    this.state.path = this.path;
            }
            return t.initialPath = o(), t.sessionId = Date.now(), t.stateId = 0, t.isInitialPopState = function(t) {
                return t.path === this.initialPath && 1 === this.stateId;
            }, t.isSameSession = function(t) {
                return t.sessionId === this.sessionId;
            }, t.prototype.pushState = function() {
                history.pushState(this.state, "", this.path);
            }, t.prototype.replaceState = function() {
                history.replaceState(this.state, "", this.path);
            }, t;
        }(), e = function() {
            function t(t, e) {
                this.path = t, null == e && (e = {}), this.keys = [], this.regexp = c(this.path, this.keys);
            }
            return t.prototype.middleware = function(t) {
                return function(e) {
                    return function(n, o) {
                        var i;
                        e.match(n.pathname, i = []) ? (n.params = i, t(n, o)) : o();
                    };
                }(this);
            }, t.prototype.match = function(t, e) {
                var n, o, i, s, r, a, c;
                if (i = this.regexp.exec(t)) {
                    for (c = i.slice(1), n = r = 0, a = c.length; a > r; n = ++r) s = c[n], "string" == typeof s && (s = decodeURIComponent(s)), (o = this.keys[n]) ? e[o.name] = s : e.push(s);
                    return !0;
                }
            }, t;
        }(), c = function(t, e) {
            return t instanceof RegExp ? t : (t instanceof Array && (t = "(" + t.join("|") + ")"),
                t = t.replace(/\/\(/g, "(?:/").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(t, n, o, i, s, r) {
                    var a;
                    return null == n && (n = ""), null == o && (o = ""), e.push({
                            name: i,
                            optional: !!r
                        }), a = r ? "" : n, a += "(?:", r && (a += n), a += o, a += s || (o ? "([^/.]+?)" : "([^/]+?)"),
                        a += ")", r && (a += r), a;
                }).replace(/([\/.])/g, "\\$1").replace(/\*/g, "(.*)"), new RegExp("^" + t + "$"));
        }, a = function(e) {
            e.state && !t.isInitialPopState(e.state) && (t.isSameSession(e.state) ? page.replace(e.state.path, e.state) : location.reload());
        }, r = function(t) {
            var e;
            if (!(1 !== t.which || t.metaKey || t.ctrlKey || t.shiftKey || t.defaultPrevented)) {
                for (e = t.target; e && "A" !== e.tagName;) e = e.parentElement;
                e && !e.target && s(e.href) && (t.preventDefault(), page.show(e.pathname + e.search + e.hash));
            }
        }, s = function(t) {
            return 0 === t.indexOf("" + location.protocol + "//" + location.hostname);
        }, u = function() {
            "function" == typeof ga && ga("send", "pageview", location.pathname + location.search + location.hash),
                "undefined" != typeof _gauges && null !== _gauges && _gauges.push(["track"]);
        };
    }.call(this),
    function() {
        this.Store = function() {
            function t() {}
            return t.prototype.get = function(t) {
                try {
                    return JSON.parse(localStorage.getItem(t));
                } catch (e) {}
            }, t.prototype.set = function(t, e) {
                try {
                    return localStorage.setItem(t, JSON.stringify(e)), !0;
                } catch (n) {}
            }, t.prototype.del = function(t) {
                try {
                    return localStorage.removeItem(t), !0;
                } catch (e) {}
            }, t.prototype.clear = function() {
                try {
                    return localStorage.clear(), !0;
                } catch (t) {}
            }, t;
        }();
    }.call(this),
    function() {
        //console.log(this)
        var t, e, n, o, i, s = [].slice;
        this.$ = function(t, e) {
            null == e && (e = document);
            try {
                return e.querySelector(t);
            } catch (n) {}
        }, this.$$ = function(t, e) {
            null == e && (e = document);
            try {
                return e.querySelectorAll(t);
            } catch (n) {}
        }, $.id = function(t) {
            return document.getElementById(t);
        }, $.hasChild = function(t, e) {
            if (t)
                for (; e;) {
                    if (e === t) return !0;
                    if (e === document.body) return;
                    e = e.parentElement;
                }
        }, $.closestLink = function(t, e) {
            for (null == e && (e = document.body); t;) {
                if ("A" === t.tagName) return t;
                if (t === e) return;
                t = t.parentElement;
            }
        }, $.on = function(t, e, n, o) {
            var i, s, r, a;
            if (null == o && (o = !1), e.indexOf(" ") >= 0)
                for (a = e.split(" "), s = 0, r = a.length; r > s; s++) i = a[s],
                    $.on(t, i, n);
            else t.addEventListener(e, n, o);
        }, $.off = function(t, e, n, o) {
            var i, s, r, a;
            if (null == o && (o = !1), e.indexOf(" ") >= 0)
                for (a = e.split(" "), s = 0, r = a.length; r > s; s++) i = a[s],
                    $.off(t, i, n);
            else t.removeEventListener(e, n, o);
        }, $.trigger = function(t, e, n, o) {
            var i;
            null == n && (n = !0), null == o && (o = !0), i = document.createEvent("Event"),
                i.initEvent(e, n, o), t.dispatchEvent(i);
        }, $.click = function(t) {
            var e;
            e = document.createEvent("MouseEvent"), e.initMouseEvent("click", !0, !0, window, null, 0, 0, 0, 0, !1, !1, !1, !1, 0, null),
                t.dispatchEvent(e);
        }, $.stopEvent = function(t) {
            t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation();
        }, i = function(t) {
            var e, n, o, i, s;
            if (n = document.createDocumentFragment(), $.isCollection(t))
                for (s = $.makeArray(t),
                    o = 0, i = s.length; i > o; o++) e = s[o], n.appendChild(e);
            else n.innerHTML = t;
            return n;
        }, $.append = function(t, e) {
            "string" == typeof e ? t.insertAdjacentHTML("beforeend", e) : ($.isCollection(e) && (e = i(e)),
                t.appendChild(e));
        }, $.prepend = function(t, e) {
            t.firstChild ? "string" == typeof e ? t.insertAdjacentHTML("afterbegin", e) : ($.isCollection(e) && (e = i(e)),
                t.insertBefore(e, t.firstChild)) : $.append(e);
        }, $.before = function(t, e) {
            ("string" == typeof e || $.isCollection(e)) && (e = i(e)), t.parentElement.insertBefore(e, t);
        }, $.after = function(t, e) {
            ("string" == typeof e || $.isCollection(e)) && (e = i(e)), t.nextSibling ? t.parentElement.insertBefore(e, t.nextSibling) : t.parentElement.appendChild(e);
        }, $.remove = function(t) {
            var e, n, o, i;
            if ($.isCollection(t))
                for (i = $.makeArray(t), n = 0, o = i.length; o > n; n++) e = i[n],
                    e.parentElement.removeChild(e);
            else t.parentElement.removeChild(t);
        }, $.empty = function(t) {
            for (; t.firstChild;) t.removeChild(t.firstChild);
        }, $.batchUpdate = function(t, e) {
            var n, o;
            n = t.parentNode, o = t.nextSibling, n.removeChild(t), e(t), o ? n.insertBefore(t, o) : n.appendChild(t);
        }, $.rect = function(t) {
            return t.getBoundingClientRect();
        }, $.offset = function(t, e) {
            var n, o;
            for (null == e && (e = document.body), o = 0, n = 0; t && t !== e;) o += t.offsetTop,
                n += t.offsetLeft, t = t.offsetParent;
            return {
                top: o,
                left: n
            };
        }, $.scrollParent = function(t) {
            for (var e;
                (t = t.parentElement) && !(t.scrollTop > 0) && "auto" !== (e = getComputedStyle(t).overflowY) && "scroll" !== e;);
            return t;
        }, $.scrollTo = function(t, e, n, o) {
            var i, s, r, a;
            if (null == n && (n = "center"), null == o && (o = {}), t && (null == e && (e = $.scrollParent(t)),
                    e && (s = e.clientHeight, e.scrollHeight > s))) switch (a = $.offset(t, e).top,
                n) {
                case "top":
                    e.scrollTop = a - (null != o.margin ? o.margin : 20);
                    break;

                case "center":
                    e.scrollTop = a - Math.round(s / 2 - t.offsetHeight / 2);
                    break;

                case "continuous":
                    r = e.scrollTop, i = t.offsetHeight, a <= r + i * (o.topGap || 1) ? e.scrollTop = a - i * (o.topGap || 1) : a >= r + s - i * ((o.bottomGap || 1) + 1) && (e.scrollTop = a - s + i * ((o.bottomGap || 1) + 1));
            }
        }, $.scrollToWithImageLock = function() {
            var t, e, n, o, i, r, a;
            if (e = arguments[0], o = arguments[1], t = 3 <= arguments.length ? s.call(arguments, 2) : [],
                null == o && (o = $.scrollParent(e)), o)
                for ($.scrollTo.apply($, [e, o].concat(s.call(t))),
                    a = o.getElementsByTagName("img"), i = 0, r = a.length; r > i; i++) n = a[i], n.complete || ! function() {
                    var i, r, a;
                    return i = function(n) {
                        return clearTimeout(r), a(n.target), $.scrollTo.apply($, [e, o].concat(s.call(t)));
                    }, a = function(t) {
                        return $.off(t, "load", i);
                    }, $.on(n, "load", i), r = setTimeout(a.bind(null, n), 3e3);
                }();
        }, $.lockScroll = function(t, e) {
            var n, o;
            (n = $.scrollParent(t)) ? (o = $.rect(t).top, n !== document.body && n !== document.documentElement && (o -= $.rect(n).top),
                e(), n.scrollTop = $.offset(t, n).top - o) : e();
        }, $.extend = function() {
            var t, e, n, o, i, r, a;
            for (o = arguments[0], n = 2 <= arguments.length ? s.call(arguments, 1) : [], r = 0,
                a = n.length; a > r; r++)
                if (e = n[r])
                    for (t in e) i = e[t], o[t] = i;
            return o;
        }, $.makeArray = function(t) {
            return Array.isArray(t) ? t : Array.prototype.slice.apply(t);
        }, $.isCollection = function(t) {
            return Array.isArray(t) || "function" == typeof(null != t ? t.item : void 0);
        }, t = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }, e = /[&<>"'\/]/g, $.escape = function(n) {
            return n.replace(e, function(e) {
                return t[e];
            });
        }, n = /([.*+?^=!:${}()|\[\]\/\\])/g, $.escapeRegexp = function(t) {
            return t.replace(n, "\\$1");
        }, $.urlDecode = function(t) {
            return decodeURIComponent(t.replace(/\+/g, "%20"));
        }, $.noop = function() {}, $.popup = function(t) {
            open(t.href || t, "_blank");
        }, $.isTouchScreen = function() {
            return "undefined" != typeof ontouchstart;
        }, $.isWindows = function() {
            var t;
            return (null != (t = navigator.platform) ? t.indexOf("Win") : void 0) >= 0;
        }, $.isMac = function() {
            var t;
            return (null != (t = navigator.userAgent) ? t.indexOf("Mac") : void 0) >= 0;
        }, o = {
            className: "highlight",
            delay: 1e3
        }, $.highlight = function(t, e) {
            null == e && (e = {}), e = $.extend({}, o, e), t.classList.add(e.className), setTimeout(function() {
                return t.classList.remove(e.className);
            }, e.delay);
        };
    }.call(this),
    function() {
        var t, e = [].slice;
        this.app = {
            $: $,
            $$: $$,
            collections: {},
            models: {},
            templates: {},
            views: {},
            init: function() {
                try {
                    this.initErrorTracking();
                } catch (t) {}
                this.browserCheck() && (this.showLoading(), this.store = new Store(), app.AppCache.isEnabled() && (this.appCache = new app.AppCache()),
                    this.settings = new app.Settings(), this.docs = new app.collections.Docs(), this.disabledDocs = new app.collections.Docs(),
                    this.entries = new app.collections.Entries(), this.router = new app.Router(), this.shortcuts = new app.Shortcuts(),
                    this.document = new app.views.Document(), this.isMobile() && (this.mobile = new app.views.Mobile()),
                    navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && (document.documentElement.style.height = "" + window.innerHeight + "px"),
                    this.DOC ? this.bootOne() : this.DOCS ? this.bootAll() : this.onBootError());
            },
            browserCheck: function() {
                return this.isSupportedBrowser() ? !0 : (document.body.className = "", document.body.innerHTML = app.templates.unsupportedBrowser, !1);
            },
            initErrorTracking: function() {
                this.isInvalidLocation() ? new app.views.Notif("InvalidLocation") : (this.config.sentry_dsn && Raven.config(this.config.sentry_dsn, {
                    whitelistUrls: [/devdocs/],
                    includePaths: [/devdocs/],
                    ignoreErrors: [/dpQuery/]
                }).install(), this.previousErrorHandler = onerror, window.onerror = this.onWindowError.bind(this));
            },
            bootOne: function() {
                this.doc = new app.models.Doc(this.DOC), this.docs.reset([this.doc]), this.doc.load(this.start.bind(this), this.onBootError.bind(this), {
                    readCache: !0
                }), new app.views.Notice("singleDoc", this.doc), delete this.DOC;
            },
            bootAll: function() {
                var t, e, n, o, i;
                for (e = this.settings.getDocs(), i = this.DOCS, n = 0, o = i.length; o > n; n++) t = i[n], (e.indexOf(t.slug) >= 0 ? this.docs : this.disabledDocs).add(t);
                this.docs.sort(), this.disabledDocs.sort(), this.docs.load(this.start.bind(this), this.onBootError.bind(this), {
                    readCache: !0,
                    writeCache: !0
                }), delete this.DOCS;
            },
            start: function() {
                var t, e, n, o, i, s, r, a;
                for (r = this.docs.all(), n = 0, i = r.length; i > n; n++) {
                    for (t = r[n], this.entries.add(t.toEntry()), a = t.types.all(), o = 0, s = a.length; s > o; o++) e = a[o],
                        this.entries.add(e.toEntry());
                    this.entries.add(t.entries.all());
                }
                this.db = new app.DB(), this.trigger("ready"), this.router.start(), this.hideLoading(),
                    this.doc || this.welcomeBack(), this.removeEvent("ready bootError");
            },
            welcomeBack: function() {
                var t;
                return this.visitCount = this.store.get("count") || 0, this.store.set("count", ++this.visitCount),
                    5 === this.visitCount && new app.views.Notif("Share", {
                        autoHide: null
                    }), (10 === this.visitCount || (t = app.store.get("news")) && 14173056e5 >= t) && new app.views.Notif("Thanks", {
                        autoHide: null
                    }), new app.views.News();
            },
            reload: function() {
                this.docs.clearCache(), this.disabledDocs.clearCache(), this.appCache ? this.appCache.reload() : window.location = "/";
            },
            reset: function() {
                var t;
                this.store.clear(), this.settings.reset(), this.db.reset(), null != (t = this.appCache) && t.update(),
                    window.location = "/";
            },
            showLoading: function() {
                document.body.classList.remove("_noscript"), document.body.classList.add("_loading");
            },
            hideLoading: function() {
                document.body.classList.remove("_booting"), document.body.classList.remove("_loading");
            },
            indexHost: function() {
                return this.config[this.appCache && this.settings.hasDocs() ? "index_path" : "docs_host"];
            },
            onBootError: function() {
                var t;
                t = 1 <= arguments.length ? e.call(arguments, 0) : [], this.trigger("bootError"),
                    this.hideLoading();
            },
            onWindowError: function() {
                var t;
                t = 1 <= arguments.length ? e.call(arguments, 0) : [], this.isInjectionError.apply(this, t) ? this.onInjectionError() : this.isAppError.apply(this, t) && ("function" == typeof this.previousErrorHandler && this.previousErrorHandler.apply(this, t),
                    this.hideLoading(), this.errorNotif || (this.errorNotif = new app.views.Notif("Error")),
                    this.errorNotif.show());
            },
            onInjectionError: function() {
                this.injectionError || (this.injectionError = !0, alert("JavaScript code has been injected in the page which prevents DevDocs from running correctly.\nPlease check your browser extensions/addons. "),
                    Raven.captureMessage("injection error"));
            },
            isInjectionError: function() {
                return window.$ !== app.$ || window.$$ !== app.$$;
            },
            isAppError: function(t, e) {
                return e && -1 !== e.indexOf("devdocs") && e.indexOf(".js") === e.length - 3;
            },
            isSupportedBrowser: function() {
                var e, n, o, i;
                try {
                    n = {
                        bind: !!Function.prototype.bind,
                        pushState: !!history.pushState,
                        matchMedia: !!window.matchMedia,
                        classList: !!document.body.classList,
                        insertAdjacentHTML: !!document.body.insertAdjacentHTML,
                        defaultPrevented: document.createEvent("CustomEvent").defaultPrevented === !1,
                        cssGradients: t()
                    };
                    for (o in n)
                        if (i = n[o], !i) return Raven.captureMessage("unsupported/" + o), !1;
                    return !0;
                } catch (s) {
                    return e = s, Raven.captureMessage("unsupported/exception", {
                        extra: {
                            error: e
                        }
                    }), !1;
                }
            },
            isSingleDoc: function() {
                return !(!this.DOC && !this.doc);
            },
            isMobile: function() {
                return null != this._isMobile ? this._isMobile : this._isMobile = matchMedia("(max-device-width: 767px), (max-device-height: 767px)").matches || -1 !== navigator.userAgent.indexOf("Android") && -1 !== navigator.userAgent.indexOf("Mobile") || -1 !== navigator.userAgent.indexOf("IEMobile");
            },
            isInvalidLocation: function() {
                return "production" === this.config.env && 0 !== location.host.indexOf(app.config.production_host);
            }
        }, t = function() {
            var t;
            return t = document.createElement("div"), t.style.cssText = "background-image: -webkit-linear-gradient(top, #000, #fff); background-image: linear-gradient(to top, #000, #fff);",
                t.style.backgroundImage.indexOf("gradient") >= 0;
        }, $.extend(app, Events);
    }.call(this),
    function() {
        app.config = {
            default_docs: ["css", "dom", "dom_events", "html", "http", "javascript"],
            docs_host: "http://localhost",
            env: "production",
            history_cache_size: 10,
            index_path: "/docs",
            max_results: 50,
            production_host: "localhost",
            search_param: "q",
            //sentry_dsn: "https://5df3f4c982314008b52b799b1f25ad9d@app.getsentry.com/11245",
            version: "1420510951"
        };
    }.call(this),
    function() {
        var t = function(t, e) {
            return function() {
                return t.apply(e, arguments);
            };
        };
        app.AppCache = function() {
            function e() {
                this.onUpdateReady = t(this.onUpdateReady, this), this.onProgress = t(this.onProgress, this),
                    this.checkForUpdate = t(this.checkForUpdate, this), this.cache = applicationCache,
                    this.cache.status === this.cache.UPDATEREADY && this.onUpdateReady(), $.on(this.cache, "progress", this.onProgress),
                    $.on(this.cache, "updateready", this.onUpdateReady), this.lastCheck = Date.now(),
                    $.on(window, "focus", this.checkForUpdate);
            }
            return $.extend(e.prototype, Events), e.isEnabled = function() {
                try {
                    return applicationCache && applicationCache.status !== applicationCache.UNCACHED;
                } catch (t) {}
            }, e.prototype.update = function() {
                try {
                    this.cache.update();
                } catch (t) {}
            }, e.prototype.reload = function() {
                this.reloading = !0, $.on(this.cache, "updateready noupdate error", function() {
                    return window.location = "/";
                }), this.update();
            }, e.prototype.checkForUpdate = function() {
                Date.now() - this.lastCheck > 864e5 && (this.lastCheck = Date.now(), this.update());
            }, e.prototype.onProgress = function(t) {
                this.trigger("progress", t);
            }, e.prototype.onUpdateReady = function() {
                this.reloading || new app.views.Notif("UpdateReady", {
                    autoHide: null
                }), this.trigger("updateready");
            }, e;
        }();
    }.call(this),
    function() {
        var t = function(t, e) {
            return function() {
                return t.apply(e, arguments);
            };
        };
        app.DB = function() {
            function e() {
                this.onOpenError = t(this.onOpenError, this), this.onOpenSuccess = t(this.onOpenSuccess, this),
                    this.useIndexedDB = this.useIndexedDB(), this.indexedDBVersion = this.indexedDBVersion(),
                    this.callbacks = [];
            }
            var n;
            return n = "docs", e.prototype.db = function(t) {
                var e;
                if (!this.useIndexedDB) return t();
                if (this.callbacks.push(t), !this.open) try {
                    this.open = !0, e = indexedDB.open(n, this.indexedDBVersion), e.onsuccess = this.onOpenSuccess,
                        e.onerror = this.onOpenError, e.onupgradeneeded = this.onUpgradeNeeded;
                } catch (o) {
                    this.onOpenError();
                }
            }, e.prototype.onOpenSuccess = function(t) {
                var e;
                try {
                    e = t.target.result, this.checkedBuggyIDB || (e.transaction(["docs", app.docs.all()[0].slug], "readwrite").abort(),
                        this.checkedBuggyIDB = !0);
                } catch (n) {
                    try {
                        e.close();
                    } catch (n) {}
                    return void this.onOpenError();
                }
                this.runCallbacks(e), this.open = !1, e.close();
            }, e.prototype.onOpenError = function(t) {
                null != t && t.preventDefault(), this.useIndexedDB = this.open = !1, this.runCallbacks();
            }, e.prototype.runCallbacks = function(t) {
                for (var e; e = this.callbacks.shift();) e(t);
            }, e.prototype.onUpgradeNeeded = function(t) {
                var e, n, o, i, s, r, a, c;
                for (e = t.target.result, e.objectStoreNames.contains("docs") || e.createObjectStore("docs"),
                    a = app.docs.all(), o = 0, s = a.length; s > o; o++) n = a[o], e.objectStoreNames.contains(n.slug) || e.createObjectStore(n.slug);
                for (c = app.disabledDocs.all(), i = 0, r = c.length; r > i; i++) n = c[i], e.objectStoreNames.contains(n.slug) || e.createObjectStore(n.slug);
            }, e.prototype.store = function(t, e, n, o) {
                this.db(function(i) {
                    return function(s) {
                        var r, a, c, l;
                        if (!s) return void o();
                        l = s.transaction(["docs", t.slug], "readwrite"), l.oncomplete = function() {
                            var e;
                            null != (e = i.cachedDocs) && (e[t.slug] = t.mtime), l.error ? o() : n();
                        }, c = l.objectStore(t.slug), c.clear();
                        for (a in e) r = e[a], c.add(r, a);
                        c = l.objectStore("docs"), c.put(t.mtime, t.slug);
                    };
                }(this));
            }, e.prototype.unstore = function(t, e, n) {
                this.db(function(o) {
                    return function(i) {
                        var s, r;
                        return i ? (r = i.transaction(["docs", t.slug], "readwrite"), r.oncomplete = function() {
                            var i;
                            null != (i = o.cachedDocs) && delete i[t.slug], r.error ? n() : e();
                        }, s = r.objectStore(t.slug), s.clear(), s = r.objectStore("docs"), void s["delete"](t.slug)) : void n();
                    };
                }(this));
            }, e.prototype.version = function(t, e) {
                var n;
                return null != (n = this.cachedVersion(t)) ? void e(n) : void this.db(function(n) {
                    var o, i, s;
                    return n ? (s = n.transaction(["docs"], "readonly"), i = s.objectStore("docs"),
                        o = i.get(t.slug), o.onsuccess = function() {
                            e(o.result);
                        }, void(o.onerror = function(t) {
                            t.preventDefault(), e(!1);
                        })) : void e(!1);
                });
            }, e.prototype.cachedVersion = function(t) {
                return this.cachedDocs ? this.cachedDocs[t.slug] || !1 : void 0;
            }, e.prototype.versions = function(t, e) {
                var n;
                return (n = this.cachedVersions(t)) ? void e(n) : this.db(function(n) {
                    var o, i, s;
                    return n ? (s = n.transaction(["docs"], "readonly"), s.oncomplete = function() {
                        return e(o);
                    }, i = s.objectStore("docs"), o = {}, void t.forEach(function(t) {
                        var e;
                        e = i.get(t.slug), e.onsuccess = function() {
                            o[t.slug] = e.result;
                        }, e.onerror = function(e) {
                            e.preventDefault(), o[t.slug] = !1;
                        };
                    })) : void e(!1);
                });
            }, e.prototype.cachedVersions = function(t) {
                var e, n, o, i;
                if (this.cachedDocs) {
                    for (n = {}, o = 0, i = t.length; i > o; o++) e = t[o], n[e.slug] = this.cachedVersion(e);
                    return n;
                }
            }, e.prototype.load = function(t, e, n) {
                return this.shouldLoadWithIDB(t) ? (n = this.loadWithXHR.bind(this, t, e, n), this.loadWithIDB(t, e, n)) : this.loadWithXHR(t, e, n);
            }, e.prototype.loadWithXHR = function(t, e, n) {
                return ajax({
                    url: t.fileUrl(),
                    dataType: "html",
                    success: e,
                    error: n
                });
            }, e.prototype.loadWithIDB = function(t, e, n) {
                return this.db(function(o) {
                    return function(i) {
                        var s, r, a;
                        return i ? (a = i.transaction([t.doc.slug], "readonly"), r = a.objectStore(t.doc.slug),
                            s = r.get(t.dbPath()), s.onsuccess = function() {
                                s.result ? e(s.result) : n();
                            }, s.onerror = function(t) {
                                t.preventDefault(), n();
                            }, void(o.cachedDocs || o.loadDocsCache(i))) : void n();
                    };
                }(this));
            }, e.prototype.loadDocsCache = function(t) {
                var e, n, o;
                this.cachedDocs = {}, o = t.transaction(["docs"], "readonly"), n = o.objectStore("docs"),
                    e = n.openCursor(), e.onsuccess = function(t) {
                        return function(e) {
                            var n;
                            (n = e.target.result) && (t.cachedDocs[n.key] = n.value, n["continue"]());
                        };
                    }(this), e.onerror = function(t) {
                        t.preventDefault();
                    };
            }, e.prototype.shouldLoadWithIDB = function(t) {
                return this.useIndexedDB && (!this.cachedDocs || this.cachedDocs[t.doc.slug]);
            }, e.prototype.reset = function() {
                try {
                    "undefined" != typeof indexedDB && null !== indexedDB && indexedDB.deleteDatabase(n);
                } catch (t) {}
            }, e.prototype.useIndexedDB = function() {
                return !app.isSingleDoc() && !!window.indexedDB;
            }, e.prototype.indexedDBVersion = function() {
                return "production" === app.config.env ? app.config.version : Date.now() / 1e3;
            }, e;
        }();
    }.call(this),
    function() {
        app.Router = function() {
            function t() {
                var t, e, n, o, i, s;
                for (i = this.constructor.routes, n = 0, o = i.length; o > n; n++) s = i[n], e = s[0],
                    t = s[1], page(e, this[t].bind(this));
                this.setInitialPath();
            }
            return $.extend(t.prototype, Events), t.routes = [
                    ["*", "before"],
                    ["/", "root"],
                    ["/offline", "offline"],
                    ["/about", "about"],
                    ["/news", "news"],
                    ["/help", "help"],
                    ["/:doc-:type/", "type"],
                    ["/:doc/", "doc"],
                    ["/:doc/:path(*)", "entry"],
                    ["*", "notFound"]
                ],
                t.prototype.start = function() {
                    page.start();
                }, t.prototype.show = function(t) {
                    page.show(t);
                }, t.prototype.triggerRoute = function(t) {
                    this.trigger(t, this.context), this.trigger("after", t, this.context);
                }, t.prototype.before = function(t, e) {
                    this.context = t, this.trigger("before", t), e();
                }, t.prototype.doc = function(t, e) {
                    var n;
                    (n = app.docs.findBy("slug", t.params.doc) || app.disabledDocs.findBy("slug", t.params.doc)) ? (t.doc = n,
                        t.entry = n.toEntry(), this.triggerRoute("entry")) : e();
                }, t.prototype.type = function(t, e) {
                    var n, o;
                    n = app.docs.findBy("slug", t.params.doc), (o = null != n ? n.types.findBy("slug", t.params.type) : void 0) ? (t.doc = n,
                        t.type = o, this.triggerRoute("type")) : e();
                }, t.prototype.entry = function(t, e) {
                    var n, o;
                    n = app.docs.findBy("slug", t.params.doc), (o = null != n ? n.findEntryByPathAndHash(t.params.path, t.hash) : void 0) ? (t.doc = n,
                        t.entry = o, this.triggerRoute("entry")) : e();
                }, t.prototype.root = function() {
                    app.isSingleDoc() ? setTimeout(function() {
                        return window.location = "/";
                    }, 0) : this.triggerRoute("root");
                }, t.prototype.offline = function() {
                    this.triggerRoute("offline");
                }, t.prototype.about = function(t) {
                    t.page = "about", this.triggerRoute("page");
                }, t.prototype.news = function(t) {
                    t.page = "news", this.triggerRoute("page");
                }, t.prototype.help = function(t) {
                    t.page = "help", this.triggerRoute("page");
                }, t.prototype.notFound = function() {
                    this.triggerRoute("notFound");
                }, t.prototype.isRoot = function() {
                    return "/" === location.pathname;
                }, t.prototype.setInitialPath = function() {
                    var t;
                    (t = location.pathname.replace(/^\/{2,}/g, "/")) !== location.pathname && page.replace(t + location.search + location.hash, null, !0),
                        this.isRoot() && (t = this.getInitialPath()) && page.replace(t + location.search, null, !0);
                }, t.prototype.getInitialPath = function() {
                    var t;
                    try {
                        return null != (t = new RegExp("#/(.+)").exec(decodeURIComponent(location.hash))) ? t[1] : void 0;
                    } catch (e) {}
                }, t.prototype.replaceHash = function(t) {
                    page.replace(location.pathname + location.search + (t || ""), null, !0);
                }, t;
        }();
    }.call(this),
    function() {
        function t() {
            return a = m.indexOf(d), a >= 0 ? (c = m.lastIndexOf(d), a !== c ? Math.max(e(), (a = c) && e()) : e()) : void 0;
        }

        function e() {
            if (g = 100 - (v - f), a > 0) {
                if (m.charAt(a - 1) === i) g += a - 1;
                else {
                    if (1 === f) return;
                    for (r = a - 2; r >= 0 && m.charAt(r) !== i;) r--;
                    g -= a - r + (v - f - a);
                }
                for (y = 0, r = a - 2; r >= 0;) m.charAt(r) === i && y++, r--;
                g -= y;
            }
            for (y = 0, r = v - f - a - 1; r >= 0;) m.charAt(a + f + r) === i && y++, r--;
            return g -= 5 * y, Math.max(1, g);
        }

        function n() {
            return f >= v || m.indexOf(d) >= 0 || !(l = s.exec(m)) ? void 0 : (u = l.index, p = l[0].length,
                g = o(), (l = s.exec(m.slice(r = m.lastIndexOf(i) + 1))) ? (u = r + l.index, p = l[0].length,
                    Math.max(g, o())) : g);
        }

        function o() {
            return 0 === u || m.charAt(u - 1) === i ? Math.max(66, 100 - p) : u + p === v ? Math.max(33, 67 - p) : Math.max(1, 34 - p);
        }
        var i, s, r, a, c, l, u, p, h, d, f, g, y, m, v, w = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            b = {}.hasOwnProperty,
            _ = function(t, e) {
                function n() {
                    this.constructor = t;
                }
                for (var o in e) b.call(e, o) && (t[o] = e[o]);
                return n.prototype = e.prototype, t.prototype = new n(), t.__super__ = e.prototype,
                    t;
            };
        i = ".", d = f = m = v = h = s = a = c = l = u = p = g = y = r = null, app.Searcher = function() {
            function e(t) {
                null == t && (t = {}), this.matchChunks = w(this.matchChunks, this), this.match = w(this.match, this),
                    this.options = $.extend({}, i, t);
            }
            var o, i;
            return $.extend(e.prototype, Events), o = 2e4, i = {
                max_results: app.config.max_results,
                fuzzy_min_length: 3
            }, e.prototype.find = function(t, e, n) {
                this.kill(), this.data = t, this.attr = e, this.query = n, this.setup(), this.isValid() ? this.match() : this.end();
            }, e.prototype.setup = function() {
                d = this.query = this.normalizeQuery(this.query), f = d.length, this.dataLength = this.data.length,
                    this.matchers = [t], this.totalResults = 0, this.setupFuzzy();
            }, e.prototype.setupFuzzy = function() {
                f >= this.options.fuzzy_min_length ? (s = this.queryToFuzzyRegexp(d), this.matchers.push(n)) : s = null;
            }, e.prototype.isValid = function() {
                return f > 0;
            }, e.prototype.end = function() {
                this.totalResults || this.triggerResults([]), this.trigger("end"), this.free();
            }, e.prototype.kill = function() {
                this.timeout && (clearTimeout(this.timeout), this.free());
            }, e.prototype.free = function() {
                this.data = this.attr = this.dataLength = this.matchers = this.matcher = this.query = this.totalResults = this.scoreMap = this.cursor = this.timeout = null;
            }, e.prototype.match = function() {
                !this.foundEnough() && (this.matcher = this.matchers.shift()) ? (this.setupMatcher(),
                    this.matchChunks()) : this.end();
            }, e.prototype.setupMatcher = function() {
                this.cursor = 0, this.scoreMap = new Array(101);
            }, e.prototype.matchChunks = function() {
                this.matchChunk(), this.cursor === this.dataLength || this.scoredEnough() ? (this.delay(this.match),
                    this.sendResults()) : this.delay(this.matchChunks);
            }, e.prototype.matchChunk = function() {
                var t, e;
                for (h = this.matcher, t = 0, e = this.chunkSize(); e >= 0 ? e > t : t > e; e >= 0 ? t++ : t--) m = this.data[this.cursor][this.attr],
                    v = m.length, (g = h()) && this.addResult(this.data[this.cursor], g), this.cursor++;
            }, e.prototype.chunkSize = function() {
                return this.cursor + o > this.dataLength ? this.dataLength % o : o;
            }, e.prototype.scoredEnough = function() {
                var t;
                return (null != (t = this.scoreMap[100]) ? t.length : void 0) >= this.options.max_results;
            }, e.prototype.foundEnough = function() {
                return this.totalResults >= this.options.max_results;
            }, e.prototype.addResult = function(t, e) {
                var n, o;
                ((n = this.scoreMap)[o = Math.round(e)] || (n[o] = [])).push(t), this.totalResults++;
            }, e.prototype.getResults = function() {
                var t, e, n, o;
                for (e = [], o = this.scoreMap, n = o.length - 1; n >= 0; n += -1) t = o[n], t && e.push.apply(e, t);
                return e.slice(0, this.options.max_results);
            }, e.prototype.sendResults = function() {
                var t;
                t = this.getResults(), t.length && this.triggerResults(t);
            }, e.prototype.triggerResults = function(t) {
                this.trigger("results", t);
            }, e.prototype.delay = function(t) {
                return this.timeout = setTimeout(t, 1);
            }, e.prototype.normalizeQuery = function(t) {
                return t.replace(/\s/g, "").toLowerCase();
            }, e.prototype.queryToFuzzyRegexp = function(t) {
                var e, n, o, i;
                for (n = t.split(""), r = o = 0, i = n.length; i > o; r = ++o) e = n[r], n[r] = $.escapeRegexp(e);
                return new RegExp(n.join(".*?"));
            }, e;
        }(), app.SynchronousSearcher = function(t) {
            function e() {
                return this.match = w(this.match, this), e.__super__.constructor.apply(this, arguments);
            }
            return _(e, t), e.prototype.match = function() {
                return this.matcher && (this.allResults || (this.allResults = []), this.allResults.push.apply(this.allResults, this.getResults())),
                    e.__super__.match.apply(this, arguments);
            }, e.prototype.free = function() {
                return this.allResults = null, e.__super__.free.apply(this, arguments);
            }, e.prototype.end = function() {
                return this.sendResults(!0), e.__super__.end.apply(this, arguments);
            }, e.prototype.sendResults = function(t) {
                var e;
                return t && (null != (e = this.allResults) ? e.length : void 0) ? this.triggerResults(this.allResults) : void 0;
            }, e.prototype.delay = function(t) {
                return t();
            }, e;
        }(app.Searcher);
    }.call(this),
    function() {
        app.Settings = function() {
            function t() {}
            return t.prototype.hasDocs = function() {
                try {
                    return !!Cookies.get("docs");
                } catch (t) {}
            }, t.prototype.getDocs = function() {
                var t;
                try {
                    return (null != (t = Cookies.get("docs")) ? t.split("/") : void 0) || app.config.default_docs;
                } catch (e) {
                    return app.config.default_docs;
                }
            }, t.prototype.setDocs = function(t) {
                try {
                    Cookies.set("docs", t.join("/"), {
                        path: "/",
                        expires: 1e8
                    });
                } catch (e) {}
            }, t.prototype.reset = function() {
                try {
                    Cookies.expire("docs");
                } catch (t) {}
            }, t;
        }();
    }.call(this),
    function() {
        var t = function(t, e) {
            return function() {
                return t.apply(e, arguments);
            };
        };
        app.Shortcuts = function() {
            function e() {
                this.onKeypress = t(this.onKeypress, this), this.onKeydown = t(this.onKeydown, this),
                    this.isWindows = $.isWindows(), this.start();
            }
            return $.extend(e.prototype, Events), e.prototype.start = function() {
                $.on(document, "keydown", this.onKeydown), $.on(document, "keypress", this.onKeypress);
            }, e.prototype.stop = function() {
                $.off(document, "keydown", this.onKeydown), $.off(document, "keypress", this.onKeypress);
            }, e.prototype.onKeydown = function(t) {
                var e;
                e = t.ctrlKey || t.metaKey ? t.altKey || t.shiftKey ? void 0 : this.handleKeydownSuperEvent(t) : t.shiftKey ? t.altKey ? void 0 : this.handleKeydownShiftEvent(t) : t.altKey ? this.handleKeydownAltEvent(t) : this.handleKeydownEvent(t),
                    e === !1 && t.preventDefault();
            }, e.prototype.onKeypress = function(t) {
                var e;
                t.ctrlKey || t.metaKey || (e = this.handleKeypressEvent(t), e === !1 && t.preventDefault());
            }, e.prototype.handleKeydownEvent = function(t) {
                var e;
                if (!t.target.form && 65 <= (e = t.which) && 90 >= e) return void this.trigger("typing");
                switch (t.which) {
                    case 8:
                        if (!t.target.form) return this.trigger("typing");
                        break;

                    case 13:
                        return this.trigger("enter");

                    case 27:
                        return this.trigger("escape");

                    case 32:
                        return this.trigger("pageDown"), !1;

                    case 33:
                        return this.trigger("pageUp");

                    case 34:
                        return this.trigger("pageDown");

                    case 35:
                        return this.trigger("end");

                    case 36:
                        return this.trigger("home");

                    case 37:
                        if (!t.target.value) return this.trigger("left");
                        break;

                    case 38:
                        return this.trigger("up"), !1;

                    case 39:
                        if (!t.target.value) return this.trigger("right");
                        break;

                    case 40:
                        return this.trigger("down"), !1;
                }
            }, e.prototype.handleKeydownSuperEvent = function(t) {
                switch (t.which) {
                    case 13:
                        return this.trigger("superEnter");

                    case 37:
                        if (!this.isWindows) return this.trigger("superLeft"), !1;
                        break;

                    case 38:
                        return this.trigger("home"), !1;

                    case 39:
                        if (!this.isWindows) return this.trigger("superRight"), !1;
                        break;

                    case 40:
                        return this.trigger("end"), !1;
                }
            }, e.prototype.handleKeydownShiftEvent = function(t) {
                var e;
                return !t.target.form && 65 <= (e = t.which) && 90 >= e ? void this.trigger("typing") : 32 === t.which ? (this.trigger("pageUp"), !1) : void 0;
            }, e.prototype.handleKeydownAltEvent = function(t) {
                switch (t.which) {
                    case 9:
                        return this.trigger("altRight", t);

                    case 37:
                        if (this.isWindows) return this.trigger("superLeft"), !1;
                        break;

                    case 38:
                        return this.trigger("altUp"), !1;

                    case 39:
                        if (this.isWindows) return this.trigger("superRight"), !1;
                        break;

                    case 40:
                        return this.trigger("altDown"), !1;

                    case 70:
                        return this.trigger("altF", t);

                    case 71:
                        return this.trigger("altG"), !1;

                    case 82:
                        return this.trigger("altR"), !1;
                }
            }, e.prototype.handleKeypressEvent = function(t) {
                return 63 !== t.which || t.target.value ? void 0 : (this.trigger("help"), !1);
            }, e;
        }();
    }.call(this),
    function() {
        app.Collection = function() {
            function t(t) {
                null == t && (t = []), this.reset(t);
            }
            return t.prototype.model = function() {
                return app.models[this.constructor.model];
            }, t.prototype.reset = function(t) {
                var e, n, o;
                for (null == t && (t = []), this.models = [], n = 0, o = t.length; o > n; n++) e = t[n],
                    this.add(e);
            }, t.prototype.add = function(t) {
                var e, n, o, i;
                if (t instanceof app.Model) this.models.push(t);
                else if (t instanceof Array)
                    for (n = 0,
                        o = t.length; o > n; n++) e = t[n], this.add(e);
                else t instanceof app.Collection ? (i = this.models).push.apply(i, t.all()) : this.models.push(new(this.model())(t));
            }, t.prototype.size = function() {
                return this.models.length;
            }, t.prototype.isEmpty = function() {
                return 0 === this.models.length;
            }, t.prototype.each = function(t) {
                var e, n, o, i;
                for (i = this.models, n = 0, o = i.length; o > n; n++) e = i[n], t(e);
            }, t.prototype.all = function() {
                return this.models;
            }, t.prototype.findBy = function(t, e) {
                var n, o, i, s;
                for (s = this.models, o = 0, i = s.length; i > o; o++)
                    if (n = s[o], n[t] === e) return n;
            }, t.prototype.findAllBy = function(t, e) {
                var n, o, i, s, r;
                for (s = this.models, r = [], o = 0, i = s.length; i > o; o++) n = s[o], n[t] === e && r.push(n);
                return r;
            }, t;
        }();
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            },
            n = [].slice;
        app.collections.Docs = function(t) {
            function o() {
                return o.__super__.constructor.apply(this, arguments);
            }
            var i;
            return e(o, t), o.model = "Doc", o.prototype.sort = function() {
                return this.models.sort(function(t, e) {
                    return t = t.name.toLowerCase(), e = e.name.toLowerCase(), e > t ? -1 : t > e ? 1 : 0;
                });
            }, i = 3, o.prototype.load = function(t, e, o) {
                var s, r, a, c;
                for (r = 0, a = function(e) {
                        return function() {
                            r < e.models.length ? e.models[r].load(a, s, o) : r === e.models.length + i - 1 && t(),
                                r++;
                        };
                    }(this), s = function() {
                        var t;
                        t = 1 <= arguments.length ? n.call(arguments, 0) : [], e && (e.apply(null, t), e = null),
                            a();
                    }, c = 0; i >= 0 ? i > c : c > i; i >= 0 ? c++ : c--) a();
            }, o.prototype.clearCache = function() {
                var t, e, n, o;
                for (o = this.models, e = 0, n = o.length; n > e; e++) t = o[e], t.clearCache();
            }, o.prototype.uninstall = function(t) {
                var e, n;
                return e = 0, (n = function(o) {
                    return function() {
                        return e < o.models.length ? o.models[e++].uninstall(n, n) : t();
                    };
                }(this))();
            }, o.prototype.getInstallStatuses = function(t) {
                return app.db.versions(this.models, function(e) {
                    var n, o;
                    if (e)
                        for (n in e) o = e[n], e[n] = {
                            installed: !!o,
                            mtime: o
                        };
                    return t(e);
                });
            }, o;
        }(app.Collection);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.collections.Entries = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.model = "Entry", n;
        }(app.Collection);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.collections.Types = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.model = "Type", n;
        }(app.Collection);
    }.call(this),
    function() {
        app.Model = function() {
            function t(t) {
                var e, n;
                for (e in t) n = t[e], this[e] = n;
            }
            return t;
        }();
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.models.Doc = function(t) {
            function n() {
                n.__super__.constructor.apply(this, arguments), this.reset(this);
            }
            return e(n, t), n.prototype.reset = function(t) {
                this.resetEntries(t.entries), this.resetTypes(t.types);
            }, n.prototype.resetEntries = function(t) {
                this.entries = new app.collections.Entries(t), this.entries.each(function(t) {
                    return function(e) {
                        return e.doc = t;
                    };
                }(this));
            }, n.prototype.resetTypes = function(t) {
                this.types = new app.collections.Types(t), this.types.each(function(t) {
                    return function(e) {
                        return e.doc = t;
                    };
                }(this));
            }, n.prototype.fullPath = function(t) {
                return null == t && (t = ""), "/" !== t[0] && (t = "/" + t), "/" + this.slug + t;
            }, n.prototype.fileUrl = function(t) {
                return "" + app.config.docs_host + this.fullPath(t);
            }, n.prototype.dbUrl = function() {
                return "" + app.config.docs_host + "/" + this.db_path + "?" + this.mtime;
            }, n.prototype.indexUrl = function() {
                return "" + app.indexHost() + "/" + this.index_path + "?" + this.mtime;
            }, n.prototype.toEntry = function() {
                return new app.models.Entry({
                    doc: this,
                    name: this.name,
                    path: "index"
                });
            }, n.prototype.findEntryByPathAndHash = function(t, e) {
                var n;
                return e && (n = this.entries.findBy("path", "" + t + "#" + e)) ? n : "index" === t ? this.toEntry() : this.entries.findBy("path", t);
            }, n.prototype.load = function(t, e, n) {
                var o;
                return null == n && (n = {}), n.readCache && this._loadFromCache(t) ? void 0 : (o = function(e) {
                    return function(o) {
                        e.reset(o), t(), n.writeCache && e._setCache(o);
                    };
                }(this), ajax({
                    url: this.indexUrl(),
                    success: o,
                    error: e
                }));
            }, n.prototype.clearCache = function() {
                app.store.del(this.slug);
            }, n.prototype._loadFromCache = function(t) {
                var e, n;
                if (n = this._getCache()) return e = function(e) {
                    return function() {
                        e.reset(n), t();
                    };
                }(this), setTimeout(e, 0), !0;
            }, n.prototype._getCache = function() {
                var t;
                if (t = app.store.get(this.slug)) return t[0] === this.mtime ? t[1] : void this.clearCache();
            }, n.prototype._setCache = function(t) {
                app.store.set(this.slug, [this.mtime, t]);
            }, n.prototype.install = function(t, e) {
                var n, o;
                this.installing || (this.installing = !0, n = function(t) {
                    return function() {
                        t.installing = null, e();
                    };
                }(this), o = function(e) {
                    return function(o) {
                        e.installing = null, app.db.store(e, o, t, n);
                    };
                }(this), ajax({
                    url: this.dbUrl(),
                    success: o,
                    error: n
                }));
            }, n.prototype.uninstall = function(t, e) {
                var n, o;
                this.installing || (this.installing = !0, o = function(e) {
                    return function() {
                        e.installing = null, t();
                    };
                }(this), n = function(t) {
                    return function() {
                        t.installing = null, e();
                    };
                }(this), app.db.unstore(this, o, n));
            }, n.prototype.getInstallStatus = function(t) {
                app.db.version(this, function(e) {
                    return t({
                        installed: !!e,
                        mtime: e
                    });
                });
            }, n;
        }(app.Model);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.models.Entry = function(t) {
            function n() {
                n.__super__.constructor.apply(this, arguments), this.text = this.searchValue();
            }
            var o, i, s, r;
            return e(n, t), r = /\:?\ |#|::|->/g, s = /\(.*?\)$/, i = /\ event$/, o = /\.+/g,
                n.prototype.searchValue = function() {
                    return this.name.toLowerCase().replace("...", " ").replace(i, "").replace(r, ".").replace(o, ".").replace(s, "").trim();
                }, n.prototype.fullPath = function() {
                    return this.doc.fullPath(this.isIndex() ? "" : this.path);
                }, n.prototype.dbPath = function() {
                    return this.path.replace(/#.*/, "");
                }, n.prototype.filePath = function() {
                    return this.doc.fullPath(this._filePath());
                }, n.prototype.fileUrl = function() {
                    return this.doc.fileUrl(this._filePath());
                }, n.prototype._filePath = function() {
                    var t;
                    return t = this.path.replace(/#.*/, ""), ".html" !== t.slice(-5) && (t += ".html"),
                        t;
                }, n.prototype.isIndex = function() {
                    return "index" === this.path;
                }, n.prototype.getType = function() {
                    return this.doc.types.findBy("name", this.type);
                }, n.prototype.loadFile = function(t, e) {
                    return app.db.load(this, t, e);
                }, n;
        }(app.Model);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.models.Type = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.fullPath = function() {
                return "/" + this.doc.slug + "-" + this.slug + "/";
            }, n.prototype.entries = function() {
                return this.doc.entries.findAllBy("type", this.name);
            }, n.prototype.toEntry = function() {
                return new app.models.Entry({
                    doc: this.doc,
                    name: "" + this.doc.name + " / " + this.name,
                    path: ".." + this.fullPath()
                });
            }, n;
        }(app.Model);
    }.call(this),
    function() {
        var t = [].slice;
        app.View = function() {
            function e() {
                this.setupElement(), this.el.className && (this.originalClassName = this.el.className),
                    this.constructor.className && this.resetClass(), this.refreshElements(), "function" == typeof this.init && this.init(),
                    this.refreshElements();
            }
            return $.extend(e.prototype, Events), e.prototype.setupElement = function() {
                null == this.el && (this.el = "string" == typeof this.constructor.el ? $(this.constructor.el) : this.constructor.el ? this.constructor.el : document.createElement(this.constructor.tagName || "div"));
            }, e.prototype.refreshElements = function() {
                var t, e, n;
                if (this.constructor.elements) {
                    n = this.constructor.elements;
                    for (t in n) e = n[t], this[t] = this.find(e);
                }
            }, e.prototype.addClass = function(t) {
                this.el.classList.add(t);
            }, e.prototype.removeClass = function(t) {
                this.el.classList.remove(t);
            }, e.prototype.resetClass = function() {
                var t, e, n, o;
                if (this.el.className = this.originalClassName || "", this.constructor.className)
                    for (o = this.constructor.className.split(" "),
                        e = 0, n = o.length; n > e; e++) t = o[e], this.addClass(t);
            }, e.prototype.find = function(t) {
                return $(t, this.el);
            }, e.prototype.findAll = function(t) {
                return $$(t, this.el);
            }, e.prototype.findByClass = function(t) {
                return this.findAllByClass(t)[0];
            }, e.prototype.findLastByClass = function(t) {
                var e;
                return e = this.findAllByClass(t)[0], e[e.length - 1];
            }, e.prototype.findAllByClass = function(t) {
                return this.el.getElementsByClassName(t);
            }, e.prototype.findByTag = function(t) {
                return this.findAllByTag(t)[0];
            }, e.prototype.findLastByTag = function(t) {
                var e;
                return e = this.findAllByTag(t), e[e.length - 1];
            }, e.prototype.findAllByTag = function(t) {
                return this.el.getElementsByTagName(t);
            }, e.prototype.append = function(t) {
                $.append(this.el, t.el || t);
            }, e.prototype.appendTo = function(t) {
                $.append(t.el || t, this.el);
            }, e.prototype.prepend = function(t) {
                $.prepend(this.el, t.el || t);
            }, e.prototype.prependTo = function(t) {
                $.prepend(t.el || t, this.el);
            }, e.prototype.before = function(t) {
                $.before(this.el, t.el || t);
            }, e.prototype.after = function(t) {
                $.after(this.el, t.el || t);
            }, e.prototype.remove = function(t) {
                $.remove(t.el || t);
            }, e.prototype.empty = function() {
                $.empty(this.el), this.refreshElements();
            }, e.prototype.html = function(t) {
                this.empty(), this.append(t);
            }, e.prototype.tmpl = function() {
                var e, n;
                return e = 1 <= arguments.length ? t.call(arguments, 0) : [], (n = app.templates).render.apply(n, e);
            }, e.prototype.delay = function() {
                var e, n, o;
                return o = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], n = "number" == typeof e[e.length - 1] ? e.pop() : 0,
                    setTimeout(o.bind.apply(o, [this].concat(t.call(e))), n);
            }, e.prototype.onDOM = function(t, e) {
                $.on(this.el, t, e);
            }, e.prototype.offDOM = function(t, e) {
                $.off(this.el, t, e);
            }, e.prototype.bindEvents = function() {
                var t, e, n, o, i;
                if (this.constructor.events) {
                    n = this.constructor.events;
                    for (e in n) t = n[e], this.onDOM(e, this[t]);
                }
                if (this.constructor.routes) {
                    o = this.constructor.routes;
                    for (e in o) t = o[e], app.router.on(e, this[t]);
                }
                if (this.constructor.shortcuts) {
                    i = this.constructor.shortcuts;
                    for (e in i) t = i[e], app.shortcuts.on(e, this[t]);
                }
            }, e.prototype.unbindEvents = function() {
                var t, e, n, o, i;
                if (this.constructor.events) {
                    n = this.constructor.events;
                    for (e in n) t = n[e], this.offDOM(e, this[t]);
                }
                if (this.constructor.routes) {
                    o = this.constructor.routes;
                    for (e in o) t = o[e], app.router.off(e, this[t]);
                }
                if (this.constructor.shortcuts) {
                    i = this.constructor.shortcuts;
                    for (e in i) t = i[e], app.shortcuts.off(e, this[t]);
                }
            }, e.prototype.addSubview = function(t) {
                return (this.subviews || (this.subviews = [])).push(t);
            }, e.prototype.activate = function() {
                var t, e, n, o;
                if (!this.activated) {
                    if (this.bindEvents(), this.subviews)
                        for (o = this.subviews, e = 0, n = o.length; n > e; e++) t = o[e],
                            t.activate();
                    return this.activated = !0, !0;
                }
            }, e.prototype.deactivate = function() {
                var t, e, n, o;
                if (this.activated) {
                    if (this.unbindEvents(), this.subviews)
                        for (o = this.subviews, e = 0, n = o.length; n > e; e++) t = o[e],
                            t.deactivate();
                    return this.activated = !1, !0;
                }
            }, e.prototype.detach = function() {
                this.deactivate(), $.remove(this.el);
            }, e;
        }();
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.Content = function(e) {
            function o() {
                return this.onAltF = t(this.onAltF, this), this.onClick = t(this.onClick, this),
                    this.afterRoute = t(this.afterRoute, this), this.beforeRoute = t(this.beforeRoute, this),
                    this.onEntryLoaded = t(this.onEntryLoaded, this), this.onEntryLoading = t(this.onEntryLoading, this),
                    this.onBootError = t(this.onBootError, this), this.onReady = t(this.onReady, this),
                    this.scrollPageDown = t(this.scrollPageDown, this), this.scrollPageUp = t(this.scrollPageUp, this),
                    this.scrollStepDown = t(this.scrollStepDown, this), this.scrollStepUp = t(this.scrollStepUp, this),
                    this.scrollToBottom = t(this.scrollToBottom, this), this.scrollToTop = t(this.scrollToTop, this),
                    o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.el = "._content", o.loadingClass = "_content-loading", o.events = {
                click: "onClick"
            }, o.shortcuts = {
                altUp: "scrollStepUp",
                altDown: "scrollStepDown",
                pageUp: "scrollPageUp",
                pageDown: "scrollPageDown",
                home: "scrollToTop",
                end: "scrollToBottom",
                altF: "onAltF"
            }, o.routes = {
                before: "beforeRoute",
                after: "afterRoute"
            }, o.prototype.init = function() {
                this.scrollEl = app.isMobile() ? document.body : this.el, this.scrollMap = {}, this.scrollStack = [],
                    this.rootPage = new app.views.RootPage(), this.staticPage = new app.views.StaticPage(),
                    this.offlinePage = new app.views.OfflinePage(), this.typePage = new app.views.TypePage(),
                    this.entryPage = new app.views.EntryPage(), this.entryPage.on("loading", this.onEntryLoading).on("loaded", this.onEntryLoaded),
                    app.on("ready", this.onReady).on("bootError", this.onBootError);
            }, o.prototype.show = function(t) {
                var e;
                this.hideLoading(), t !== this.view && (null != (e = this.view) && e.deactivate(),
                    this.html(this.view = t), this.view.activate());
            }, o.prototype.showLoading = function() {
                this.addClass(this.constructor.loadingClass);
            }, o.prototype.hideLoading = function() {
                this.removeClass(this.constructor.loadingClass);
            }, o.prototype.scrollTo = function(t) {
                this.scrollEl.scrollTop = t || 0;
            }, o.prototype.scrollBy = function(t) {
                this.scrollEl.scrollTop += t;
            }, o.prototype.scrollToTop = function() {
                this.scrollTo(0);
            }, o.prototype.scrollToBottom = function() {
                this.scrollTo(this.scrollEl.scrollHeight);
            }, o.prototype.scrollStepUp = function() {
                this.scrollBy(-50);
            }, o.prototype.scrollStepDown = function() {
                this.scrollBy(50);
            }, o.prototype.scrollPageUp = function() {
                this.scrollBy(80 - this.scrollEl.clientHeight);
            }, o.prototype.scrollPageDown = function() {
                this.scrollBy(this.scrollEl.clientHeight - 80);
            }, o.prototype.scrollToTarget = function() {
                var t;
                this.routeCtx.hash && (t = this.findTargetByHash(this.routeCtx.hash)) ? ($.scrollToWithImageLock(t, this.scrollEl, "top", {
                    margin: 20 + (this.scrollEl === this.el ? 0 : $.offset(this.el).top)
                }), $.highlight(t, {
                    className: "_highlight"
                })) : this.scrollTo(this.scrollMap[this.routeCtx.state.id]);
            }, o.prototype.onReady = function() {
                this.hideLoading();
            }, o.prototype.onBootError = function() {
                this.hideLoading(), this.html(this.tmpl("bootError"));
            }, o.prototype.onEntryLoading = function() {
                this.showLoading();
            }, o.prototype.onEntryLoaded = function() {
                this.hideLoading(), this.scrollToTarget();
            }, o.prototype.beforeRoute = function(t) {
                this.cacheScrollPosition(), this.routeCtx = t, this.delay(this.scrollToTarget);
            }, o.prototype.cacheScrollPosition = function() {
                if (this.routeCtx && !this.routeCtx.hash) {
                    if (null == this.scrollMap[this.routeCtx.state.id])
                        for (this.scrollStack.push(this.routeCtx.state.id); this.scrollStack.length > app.config.history_cache_size;) delete this.scrollMap[this.scrollStack.shift()];
                    this.scrollMap[this.routeCtx.state.id] = this.scrollEl.scrollTop;
                }
            }, o.prototype.afterRoute = function(t, e) {
                var n;
                switch (t) {
                    case "root":
                        this.show(this.rootPage);
                        break;

                    case "entry":
                        this.show(this.entryPage);
                        break;

                    case "type":
                        this.show(this.typePage);
                        break;

                    case "offline":
                        this.show(this.offlinePage);
                        break;

                    default:
                        this.show(this.staticPage);
                }
                this.view.onRoute(e), app.document.setTitle("function" == typeof(n = this.view).getTitle ? n.getTitle() : void 0);
            }, o.prototype.onClick = function(t) {
                var e;
                e = $.closestLink(t.target, this.el), e && this.isExternalUrl(e.getAttribute("href")) && ($.stopEvent(t),
                    $.popup(e));
            }, o.prototype.onAltF = function(t) {
                var e;
                return document.activeElement && $.hasChild(this.el, document.activeElement) ? void 0 : (null != (e = this.findByTag("a")) && e.focus(),
                    $.stopEvent(t));
            }, o.prototype.findTargetByHash = function(t) {
                var e;
                return e = function() {
                    try {
                        return $.id(decodeURIComponent(t));
                    } catch (e) {}
                }(), e || (e = function() {
                    try {
                        return $.id(t);
                    } catch (e) {}
                }()), e;
            }, o.prototype.isExternalUrl = function(t) {
                var e;
                return "http:/" === (e = null != t ? t.slice(0, 6) : void 0) || "https:" === e;
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.EntryPage = function(e) {
            function o() {
                return this.onClick = t(this.onClick, this), this.onError = t(this.onError, this),
                    this.onSuccess = t(this.onSuccess, this), this.beforeRoute = t(this.beforeRoute, this),
                    o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.className = "_page", o.events = {
                click: "onClick"
            }, o.routes = {
                before: "beforeRoute"
            }, o.prototype.init = function() {
                this.cacheMap = {}, this.cacheStack = [];
            }, o.prototype.deactivate = function() {
                o.__super__.deactivate.apply(this, arguments) && (this.empty(), this.entry = null);
            }, o.prototype.loading = function() {
                this.empty(), this.trigger("loading");
            }, o.prototype.render = function(t) {
                null == t && (t = ""), this.activated && (this.empty(), this.subview = new(this.subViewClass())(this.el, this.entry),
                    this.subview.render(t), app.disabledDocs.findBy("slug", this.entry.doc.slug) && (this.hiddenView = new app.views.HiddenPage(this.el, this.entry)),
                    this.trigger("loaded"));
            }, o.prototype.empty = function() {
                var t, e;
                null != (t = this.subview) && t.deactivate(), this.subview = null, null != (e = this.hiddenView) && e.deactivate(),
                    this.hiddenView = null, this.resetClass(), o.__super__.empty.apply(this, arguments);
            }, o.prototype.subViewClass = function() {
                var t;
                return t = this.entry.doc.type, app.views["" + t[0].toUpperCase() + t.slice(1) + "Page"] || app.views.BasePage;
            }, o.prototype.getTitle = function() {
                return this.entry.doc.name + (this.entry.isIndex() ? "" : "/" + this.entry.name);
            }, o.prototype.beforeRoute = function() {
                this.abort(), this.cache();
            }, o.prototype.onRoute = function(t) {
                var e, n;
                e = t.entry.filePath() === (null != (n = this.entry) ? n.filePath() : void 0), this.entry = t.entry,
                    e || this.restore() || this.load();
            }, o.prototype.load = function() {
                this.loading(), this.xhr = this.entry.loadFile(this.onSuccess, this.onError);
            }, o.prototype.abort = function() {
                this.xhr && (this.xhr.abort(), this.xhr = null);
            }, o.prototype.onSuccess = function(t) {
                this.xhr = null, this.render(t);
            }, o.prototype.onError = function() {
                var t;
                this.xhr = null, this.render(this.tmpl("pageLoadError")), null != (t = app.appCache) && t.update();
            }, o.prototype.cache = function() {
                var t;
                if (this.entry && !this.cacheMap[t = this.entry.filePath()])
                    for (this.cacheMap[t] = this.el.innerHTML,
                        this.cacheStack.push(t); this.cacheStack.length > app.config.history_cache_size;) delete this.cacheMap[this.cacheStack.shift()];
            }, o.prototype.restore = function() {
                var t;
                return this.cacheMap[t = this.entry.filePath()] ? (this.render(this.cacheMap[t]), !0) : void 0;
            }, o.prototype.onClick = function(t) {
                t.target.hasAttribute("data-retry") && ($.stopEvent(t), this.load());
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.OfflinePage = function(e) {
            function o() {
                return this.onClick = t(this.onClick, this), o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.className = "_static", o.events = {
                click: "onClick"
            }, o.prototype.deactivate = function() {
                o.__super__.deactivate.apply(this, arguments) && this.empty();
            }, o.prototype.render = function() {
                app.docs.getInstallStatuses(function(t) {
                    return function(e) {
                        var n, o, i, s, r;
                        if (t.activated)
                            if (e === !1) t.html(t.tmpl("offlineError"));
                            else {
                                for (o = "", r = app.docs.all(), i = 0, s = r.length; s > i; i++) n = r[i], o += t.renderDoc(n, e[n.slug]);
                                t.html(t.tmpl("offlinePage", o));
                            }
                    };
                }(this));
            }, o.prototype.renderDoc = function(t, e) {
                return app.templates.render("offlineDoc", t, e);
            }, o.prototype.getTitle = function() {
                return "Offline";
            }, o.prototype.docByEl = function(t) {
                for (var e; !(e = t.getAttribute("data-slug"));) t = t.parentNode;
                return app.docs.findBy("slug", e);
            }, o.prototype.docEl = function(t) {
                return this.find("[data-slug='" + t.slug + "']");
            }, o.prototype.onRoute = function() {
                this.render();
            }, o.prototype.onClick = function(t) {
                var e, n, o;
                o = t.target, (e = o.getAttribute("data-action")) && ($.stopEvent(t), n = this.docByEl(o),
                    n[e](this.onInstallSuccess.bind(this, n), this.onInstallError.bind(this, n)), o.parentNode.innerHTML = "" + o.textContent.replace(/e$/, "") + "ing\u2026");
            }, o.prototype.onInstallSuccess = function(t) {
                t.getInstallStatus(function(e) {
                    return function(n) {
                        return e.docEl(t).outerHTML = e.renderDoc(t, n), $.highlight(e.docEl(t), {
                            className: "_highlight"
                        });
                    };
                }(this));
            }, o.prototype.onInstallError = function(t) {
                var e;
                e = this.docEl(t), e.lastElementChild.textContent = "Error";
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.RootPage = function(e) {
            function o() {
                return this.onClick = t(this.onClick, this), o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.events = {
                click: "onClick"
            }, o.prototype.init = function() {
                this.isHidden() || this.setHidden(!1), this.render();
            }, o.prototype.render = function() {
                this.empty(), app.isMobile() && this.append(this.tmpl("mobileNav")), this.append(this.tmpl(this.isHidden() ? "splash" : app.isMobile() ? "mobileIntro" : "intro"));
            }, o.prototype.hideIntro = function() {
                this.setHidden(!0), this.render();
            }, o.prototype.setHidden = function(t) {
                app.store.set("hideIntro", t);
            }, o.prototype.isHidden = function() {
                return app.isSingleDoc() || app.store.get("hideIntro");
            }, o.prototype.onRoute = function() {}, o.prototype.onClick = function(t) {
                t.target.hasAttribute("data-hide-intro") && ($.stopEvent(t), this.hideIntro());
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.StaticPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.className = "_static", n.titles = {
                about: "About",
                news: "News",
                help: "Help",
                notFound: "404"
            }, n.prototype.deactivate = function() {
                n.__super__.deactivate.apply(this, arguments) && (this.empty(), this.page = null);
            }, n.prototype.render = function(t) {
                this.page = t, this.html(this.tmpl("" + this.page + "Page"));
            }, n.prototype.getTitle = function() {
                return this.constructor.titles[this.page];
            }, n.prototype.onRoute = function(t) {
                this.render(t.page || "notFound");
            }, n;
        }(app.View);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.TypePage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.className = "_page", n.prototype.deactivate = function() {
                n.__super__.deactivate.apply(this, arguments) && (this.empty(), this.type = null);
            }, n.prototype.render = function(t) {
                this.type = t, this.type = t, this.html(this.tmpl("typePage", this.type));
            }, n.prototype.getTitle = function() {
                return "" + this.type.doc.name + "/" + this.type.name;
            }, n.prototype.onRoute = function(t) {
                this.render(t.type);
            }, n;
        }(app.View);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.Document = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.el = document, n.shortcuts = {
                help: "onHelp",
                escape: "onEscape",
                superLeft: "onBack",
                superRight: "onForward"
            }, n.prototype.init = function() {
                this.addSubview(this.nav = new app.views.Nav(), this.addSubview(this.sidebar = new app.views.Sidebar())),
                    this.addSubview(this.content = new app.views.Content()), app.isSingleDoc() || app.isMobile() || this.addSubview(this.path = new app.views.Path()),
                    this.setTitle(), this.activate();
            }, n.prototype.setTitle = function(t) {
                return this.el.title = t ? "DevDocs/" + t : "DevDocs";
            }, n.prototype.onHelp = function() {
                return app.router.show("/help#shortcuts");
            }, n.prototype.onEscape = function() {
                var t;
                return t = app.isSingleDoc() && location.pathname !== app.doc.fullPath() ? app.doc.fullPath() : "/",
                    app.router.show(t);
            }, n.prototype.onBack = function() {
                return history.back();
            }, n.prototype.onForward = function() {
                return history.forward();
            }, n;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.Mobile = function(e) {
            function o() {
                this.afterRoute = t(this.afterRoute, this), this.onTapSearch = t(this.onTapSearch, this),
                    this.onClickMenu = t(this.onClickMenu, this), this.onClickHome = t(this.onClickHome, this),
                    this.onClick = t(this.onClick, this), this.hideSidebar = t(this.hideSidebar, this),
                    this.showSidebar = t(this.showSidebar, this), this.el = document.documentElement,
                    o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.className = "_mobile", o.elements = {
                body: "body",
                content: "._container",
                sidebar: "._sidebar"
            }, o.routes = {
                after: "afterRoute"
            }, o.prototype.init = function() {
                FastClick.attach(this.body), app.shortcuts.stop(), $.on(this.body, "click", this.onClick),
                    $.on($("._home-link"), "click", this.onClickHome), $.on($("._menu-link"), "click", this.onClickMenu),
                    $.on($("._search"), "touchend", this.onTapSearch), app.document.sidebar.search.on("searching", this.showSidebar).on("clear", this.hideSidebar),
                    this.activate();
            }, o.prototype.showSidebar = function() {
                var t;
                this.isSidebarShown() || (this.contentTop = this.body.scrollTop, this.content.style.display = "none",
                    this.sidebar.style.display = "block", (t = this.findByClass(app.views.ListSelect.activeClass)) ? $.scrollTo(t, this.body, "center") : this.body.scrollTop = this.findByClass(app.views.ListFold.activeClass) && this.sidebarTop || 0);
            }, o.prototype.hideSidebar = function() {
                this.isSidebarShown() && (this.sidebarTop = this.body.scrollTop, this.sidebar.style.display = "none",
                    this.content.style.display = "block", this.body.scrollTop = this.contentTop || 0);
            }, o.prototype.isSidebarShown = function() {
                return "none" !== this.sidebar.style.display;
            }, o.prototype.onClick = function(t) {
                t.target.hasAttribute("data-pick-docs") && this.showSidebar();
            }, o.prototype.onClickHome = function() {
                app.shortcuts.trigger("escape"), this.hideSidebar();
            }, o.prototype.onClickMenu = function() {
                this.isSidebarShown() ? this.hideSidebar() : this.showSidebar();
            }, o.prototype.onTapSearch = function() {
                return this.body.scrollTop = 0;
            }, o.prototype.afterRoute = function() {
                this.hideSidebar();
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.Nav = function(e) {
            function o() {
                return this.afterRoute = t(this.afterRoute, this), o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.el = "._nav", o.activeClass = "_nav-current", o.routes = {
                after: "afterRoute"
            }, o.prototype.select = function(t) {
                this.deselect(), (this.current = this.find("a[href='" + t + "']")) && this.current.classList.add(this.constructor.activeClass);
            }, o.prototype.deselect = function() {
                this.current && (this.current.classList.remove(this.constructor.activeClass), this.current = null);
            }, o.prototype.afterRoute = function(t, e) {
                return "page" === t ? this.select(e.pathname) : this.deselect();
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            },
            o = [].slice;
        app.views.Path = function(e) {
            function i() {
                return this.afterRoute = t(this.afterRoute, this), this.onClick = t(this.onClick, this),
                    i.__super__.constructor.apply(this, arguments);
            }
            return n(i, e), i.className = "_path", i.events = {
                click: "onClick"
            }, i.routes = {
                after: "afterRoute"
            }, i.prototype.render = function() {
                var t;
                return t = 1 <= arguments.length ? o.call(arguments, 0) : [], this.show(), this.html(this.tmpl.apply(this, ["path"].concat(o.call(t))));
            }, i.prototype.show = function() {
                return this.el.parentNode ? void 0 : $.prepend($("._app"), this.el);
            }, i.prototype.hide = function() {
                return this.el.parentNode ? $.remove(this.el) : void 0;
            }, i.prototype.onClick = function(t) {
                var e;
                return (e = $.closestLink(t.target, this.el)) ? this.clicked = !0 : void 0;
            }, i.prototype.afterRoute = function(t, e) {
                return e.type ? this.render(e.doc, e.type) : e.entry ? e.entry.isIndex() ? this.render(e.doc) : this.render(e.doc, e.entry.getType(), e.entry) : this.hide(),
                    this.clicked ? (this.clicked = null, app.document.sidebar.reset()) : void 0;
            }, i;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.ListFocus = function(e) {
            function o(e) {
                this.el = e, this.onClick = t(this.onClick, this), this.onSuperEnter = t(this.onSuperEnter, this),
                    this.onEnter = t(this.onEnter, this), this.onLeft = t(this.onLeft, this), this.onUp = t(this.onUp, this),
                    this.onDown = t(this.onDown, this), this.blur = t(this.blur, this), o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.activeClass = "focus", o.events = {
                click: "onClick"
            }, o.shortcuts = {
                up: "onUp",
                down: "onDown",
                left: "onLeft",
                enter: "onEnter",
                superEnter: "onSuperEnter",
                escape: "blur"
            }, o.prototype.focus = function(t) {
                t && !t.classList.contains(this.constructor.activeClass) && (this.blur(), t.classList.add(this.constructor.activeClass),
                    $.trigger(t, "focus"));
            }, o.prototype.blur = function() {
                var t;
                (t = this.getCursor()) && (t.classList.remove(this.constructor.activeClass), $.trigger(t, "blur"));
            }, o.prototype.getCursor = function() {
                return this.findByClass(this.constructor.activeClass) || this.findByClass(app.views.ListSelect.activeClass);
            }, o.prototype.findNext = function(t) {
                var e;
                if (e = t.nextSibling) {
                    if ("A" === e.tagName) return e;
                    if ("SPAN" === e.tagName) return $.click(e), this.findNext(t);
                    if ("DIV" === e.tagName) return this.findFirst(e) || this.findNext(e);
                    if ("H6" === e.tagName) return this.findNext(e);
                } else if (t.parentElement !== this.el) return this.findNext(t.parentElement);
            }, o.prototype.findFirst = function(t) {
                var e;
                if (e = t.firstChild) return "A" === e.tagName ? e : "SPAN" === e.tagName ? ($.click(e),
                    this.findFirst(t)) : void 0;
            }, o.prototype.findPrev = function(t) {
                var e;
                if (e = t.previousSibling) {
                    if ("A" === e.tagName) return e;
                    if ("SPAN" === e.tagName) return $.click(e), this.findPrev(t);
                    if ("DIV" === e.tagName) return this.findLast(e) || this.findPrev(e);
                    if ("H6" === e.tagName) return this.findPrev(e);
                } else if (t.parentElement !== this.el) return this.findPrev(t.parentElement);
            }, o.prototype.findLast = function(t) {
                var e;
                if (e = t.lastChild) return "A" === e.tagName ? e : "SPAN" === e.tagName || "H6" === e.tagName ? this.findPrev(e) : "DIV" === e.tagName ? this.findLast(e) : void 0;
            }, o.prototype.onDown = function() {
                var t;
                this.focus((t = this.getCursor()) ? this.findNext(t) : this.findByTag("a"));
            }, o.prototype.onUp = function() {
                var t;
                this.focus((t = this.getCursor()) ? this.findPrev(t) : this.findLastByTag("a"));
            }, o.prototype.onLeft = function() {
                var t;
                t = this.getCursor(), t && !t.classList.contains(app.views.ListFold.activeClass) && t.parentElement !== this.el && this.focus(t.parentElement.previousSibling);
            }, o.prototype.onEnter = function() {
                var t;
                (t = this.getCursor()) && $.click(t);
            }, o.prototype.onSuperEnter = function() {
                var t;
                (t = this.getCursor()) && $.popup(t);
            }, o.prototype.onClick = function(t) {
                "A" === t.target.tagName && this.focus(t.target);
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.ListFold = function(e) {
            function o(e) {
                this.el = e, this.onClick = t(this.onClick, this), this.onRight = t(this.onRight, this),
                    this.onLeft = t(this.onLeft, this), o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.targetClass = "_list-dir", o.handleClass = "_list-arrow", o.activeClass = "open",
                o.events = {
                    click: "onClick"
                }, o.shortcuts = {
                    left: "onLeft",
                    right: "onRight"
                }, o.prototype.open = function(t) {
                    t && !t.classList.contains(this.constructor.activeClass) && (t.classList.add(this.constructor.activeClass),
                        $.trigger(t, "open"));
                }, o.prototype.close = function(t) {
                    t && t.classList.contains(this.constructor.activeClass) && (t.classList.remove(this.constructor.activeClass),
                        $.trigger(t, "close"));
                }, o.prototype.toggle = function(t) {
                    t.classList.contains(this.constructor.activeClass) ? this.close(t) : this.open(t);
                }, o.prototype.reset = function() {
                    for (var t; t = this.findByClass(this.constructor.activeClass);) this.close(t);
                }, o.prototype.getCursor = function() {
                    return this.findByClass(app.views.ListFocus.activeClass) || this.findByClass(app.views.ListSelect.activeClass);
                }, o.prototype.onLeft = function() {
                    var t;
                    t = this.getCursor(), (null != t ? t.classList.contains(this.constructor.activeClass) : void 0) && this.close(t);
                }, o.prototype.onRight = function() {
                    var t;
                    t = this.getCursor(), (null != t ? t.classList.contains(this.constructor.targetClass) : void 0) && this.open(t);
                }, o.prototype.onClick = function(t) {
                    var e;
                    t.pageY && (e = t.target, e.classList.contains(this.constructor.handleClass) ? ($.stopEvent(t),
                        this.toggle(e.parentElement)) : e.classList.contains(this.constructor.targetClass) && this.open(e));
                }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.ListSelect = function(e) {
            function o(e) {
                this.el = e, this.onClick = t(this.onClick, this), o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.activeClass = "active", o.events = {
                click: "onClick"
            }, o.prototype.deactivate = function() {
                o.__super__.deactivate.apply(this, arguments) && this.deselect();
            }, o.prototype.select = function(t) {
                this.deselect(), t && (t.classList.add(this.constructor.activeClass), $.trigger(t, "select"));
            }, o.prototype.deselect = function() {
                var t;
                (t = this.getSelection()) && (t.classList.remove(this.constructor.activeClass),
                    $.trigger(t, "deselect"));
            }, o.prototype.selectByHref = function(t) {
                var e;
                (null != (e = this.getSelection()) ? e.getAttribute("href") : void 0) !== t && this.select(this.find("a[href='" + t + "']"));
            }, o.prototype.selectCurrent = function() {
                this.selectByHref(location.pathname + location.hash);
            }, o.prototype.getSelection = function() {
                return this.findByClass(this.constructor.activeClass);
            }, o.prototype.onClick = function(t) {
                "A" === t.target.tagName && this.select(t.target);
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.PaginatedList = function(e) {
            function o(e) {
                var n, i;
                this.data = e, this.onClick = t(this.onClick, this), null == (n = (i = this.constructor).events || (i.events = {})).click && (n.click = "onClick"),
                    o.__super__.constructor.apply(this, arguments);
            }
            var i;
            return n(o, e), i = app.config.max_results, o.prototype.renderPaginated = function() {
                this.page = 0, this.totalPages() > 1 ? this.paginateNext() : this.html(this.renderAll());
            }, o.prototype.renderAll = function() {
                return this.render(this.data);
            }, o.prototype.renderPage = function(t) {
                return this.render(this.data.slice((t - 1) * i, t * i));
            }, o.prototype.renderPageLink = function(t) {
                return this.tmpl("sidebarPageLink", t);
            }, o.prototype.renderPrevLink = function(t) {
                return this.renderPageLink((t - 1) * i);
            }, o.prototype.renderNextLink = function(t) {
                return this.renderPageLink(this.data.length - t * i);
            }, o.prototype.totalPages = function() {
                return Math.ceil(this.data.length / i);
            }, o.prototype.paginate = function(t) {
                $.lockScroll(t.nextSibling || t.previousSibling, function(e) {
                    return function() {
                        $.batchUpdate(e.el, function() {
                            t.nextSibling ? e.paginatePrev(t) : e.paginateNext(t);
                        });
                    };
                }(this));
            }, o.prototype.paginateNext = function() {
                this.el.lastChild && this.remove(this.el.lastChild), this.page >= 2 && this.hideTopPage(),
                    this.page++, this.append(this.renderPage(this.page)), this.page < this.totalPages() && this.append(this.renderNextLink(this.page));
            }, o.prototype.paginatePrev = function() {
                this.remove(this.el.firstChild), this.hideBottomPage(), this.page--, this.prepend(this.renderPage(this.page - 1)),
                    this.page >= 3 && this.prepend(this.renderPrevLink(this.page - 1));
            }, o.prototype.paginateTo = function(t) {
                var e, n, o;
                if (e = this.data.indexOf(t), e >= i)
                    for (n = 0, o = Math.floor(e / i); o >= 0 ? o > n : n > o; o >= 0 ? n++ : n--) this.paginateNext();
            }, o.prototype.hideTopPage = function() {
                var t, e;
                for (t = this.page <= 2 ? i : i + 1, e = 0; t >= 0 ? t > e : e > t; t >= 0 ? e++ : e--) this.remove(this.el.firstChild);
                this.prepend(this.renderPrevLink(this.page));
            }, o.prototype.hideBottomPage = function() {
                var t, e;
                for (t = this.page === this.totalPages() ? this.data.length % i || i : i + 1, e = 0; t >= 0 ? t > e : e > t; t >= 0 ? e++ : e--) this.remove(this.el.lastChild);
                this.append(this.renderNextLink(this.page - 1));
            }, o.prototype.onClick = function(t) {
                "SPAN" === t.target.tagName && ($.stopEvent(t), this.paginate(t.target));
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.Notif = function(e) {
            function o(e, n) {
                this.type = e, this.options = null != n ? n : {}, this.onClick = t(this.onClick, this),
                    this.options = $.extend({}, this.constructor.defautOptions, this.options), o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.className = "_notif", o.activeClass = "_in", o.defautOptions = {
                autoHide: 15e3
            }, o.events = {
                click: "onClick"
            }, o.prototype.init = function() {
                this.show();
            }, o.prototype.show = function() {
                this.timeout ? (clearTimeout(this.timeout), this.timeout = this.delay(this.hide, this.options.autoHide)) : (this.render(),
                    this.position(), this.activate(), this.appendTo(document.body), this.el.offsetWidth,
                    this.addClass(this.constructor.activeClass), this.options.autoHide && (this.timeout = this.delay(this.hide, this.options.autoHide)));
            }, o.prototype.hide = function() {
                clearTimeout(this.timeout), this.timeout = null, this.detach();
            }, o.prototype.render = function() {
                this.html(this.tmpl("notif" + this.type));
            }, o.prototype.position = function() {
                var t, e;
                e = $$("." + app.views.Notif.className), e.length && (t = e[e.length - 1], this.el.style.top = t.offsetTop + t.offsetHeight + 16 + "px");
            }, o.prototype.onClick = function(t) {
                "A" !== t.target.tagName && ($.stopEvent(t), this.hide());
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.News = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.className += " _notif-news", n.defautOptions = {
                autoHide: null
            }, n.prototype.init = function() {
                this.unreadNews = this.getUnreadNews(), this.unreadNews.length && this.show(), this.markAllAsRead();
            }, n.prototype.render = function() {
                this.html(app.templates.notifNews(this.unreadNews));
            }, n.prototype.getUnreadNews = function() {
                var t, e, n, o, i, s;
                if (!(e = this.getLastReadTime())) return [];
                for (i = app.news, s = [], n = 0, o = i.length; o > n && (t = i[n], !(new Date(t[0]).getTime() <= e)); n++) s.push(t);
                return s;
            }, n.prototype.getLastNewsTime = function() {
                return new Date(app.news[0][0]).getTime();
            }, n.prototype.getLastReadTime = function() {
                return app.store.get("news");
            }, n.prototype.markAllAsRead = function() {
                app.store.set("news", this.getLastNewsTime() + 1);
            }, n;
        }(app.views.Notif);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            },
            n = [].slice;
        app.views.Notice = function(t) {
            function o() {
                var t, e;
                e = arguments[0], t = 2 <= arguments.length ? n.call(arguments, 1) : [], this.type = e,
                    this.args = t, o.__super__.constructor.apply(this, arguments);
            }
            return e(o, t), o.className = "_notice", o.prototype.init = function() {
                this.activate();
            }, o.prototype.activate = function() {
                o.__super__.activate.apply(this, arguments) && this.show();
            }, o.prototype.deactivate = function() {
                o.__super__.deactivate.apply(this, arguments) && this.hide();
            }, o.prototype.show = function() {
                this.html(this.tmpl.apply(this, ["" + this.type + "Notice"].concat(n.call(this.args)))),
                    this.prependTo($("._app"));
            }, o.prototype.hide = function() {
                $.remove(this.el);
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.BasePage = function(t) {
            function n(t, e) {
                this.el = t, this.entry = e, n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.render = function(t) {
                this.constructor.className || this.addClass("_" + this.entry.doc.type), this.html(t),
                    this.activate(), this.afterRender && this.delay(this.afterRender);
            }, n.prototype.highlightCode = function(t, e) {
                var n, o, i;
                if ($.isCollection(t))
                    for (o = 0, i = t.length; i > o; o++) n = t[o], this.highlightCode(n, e);
                else t && (t.classList.add("language-" + e),
                    Prism.highlightElement(t));
            }, n;
        }(app.View);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.AngularPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                var t, e, n, o, i;
                for (i = this.findAllByTag("pre"), n = 0, o = i.length; o > n; n++) t = i[n], e = t.classList.contains("lang-html") || "<" === t.textContent[0] ? "markup" : t.classList.contains("lang-css") ? "css" : "javascript",
                    t.setAttribute("class", ""), this.highlightCode(t, e);
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.BowerPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                this.highlightCode(this.findAll('pre[data-lang="js"], pre[data-lang="json"]'), "javascript");
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.CPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                this.highlightCode(this.findAll("pre.source-c, .source-c > pre"), "c"), this.highlightCode(this.findAll("pre.source-cpp, .source-cpp > pre"), "cpp");
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.CoffeescriptPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                this.highlightCode(this.findAll(".code > pre:first-child"), "coffeescript"), this.highlightCode(this.findAll(".code > pre:last-child"), "javascript");
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.D3Page = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                this.highlightCode(this.findAll(".highlight > pre"), "javascript");
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.EmberPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                var t, e, n, o, i;
                for (i = this.findAllByTag("pre"), n = 0, o = i.length; o > n; n++) t = i[n], e = t.classList.contains("javascript") ? "javascript" : t.classList.contains("html") ? "markup" : void 0,
                    e && this.highlightCode(t, e);
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.GoPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                this.highlightCode(this.findAll("pre"), "go");
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.HiddenPage = function(e) {
            function o(e, n) {
                this.el = e, this.entry = n, this.onClick = t(this.onClick, this), o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.events = {
                click: "onClick"
            }, o.prototype.init = function() {
                this.addSubview(this.notice = new app.views.Notice("disabledDoc")), this.activate();
            }, o.prototype.onClick = function(t) {
                var e;
                (e = $.closestLink(t.target, this.el)) && ($.stopEvent(t), $.popup(e));
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.JavascriptPage = function(t) {
                function n() {
                    return n.__super__.constructor.apply(this, arguments);
                }
                return e(n, t), n.prototype.afterRender = function() {
                    this.highlightCode(this.findAllByTag("pre"), "javascript");
                }, n;
            }(app.views.BasePage), app.views.JavascriptWithMarkupCheckPage = function(t) {
                function n() {
                    return n.__super__.constructor.apply(this, arguments);
                }
                return e(n, t), n.prototype.afterRender = function() {
                    var t, e, n, o, i;
                    for (i = this.findAllByTag("pre"), n = 0, o = i.length; o > n; n++) t = i[n], e = t.textContent.match(/^\s*</) ? "markup" : "javascript",
                        this.highlightCode(t, e);
                }, n;
            }(app.views.BasePage), app.views.ChaiPage = app.views.ExpressPage = app.views.GruntPage = app.views.LodashPage = app.views.MarionettePage = app.views.ModernizrPage = app.views.MomentPage = app.views.MongoosePage = app.views.NodePage = app.views.RethinkdbPage = app.views.SinonPage = app.views.UnderscorePage = app.views.JavascriptPage,
            app.views.RequirejsPage = app.views.SocketioPage = app.views.JavascriptWithMarkupCheckPage;
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.JqueryPage = function(e) {
            function o() {
                return this.onIframeLoaded = t(this.onIframeLoaded, this), o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.demoClassName = "_jquery-demo", o.prototype.afterRender = function() {
                var t, e, n, o, i, s, r, a, c;
                for (a = this.findAllByTag("iframe"), o = 0, s = a.length; s > o; o++) e = a[o],
                    e.style.display = "none", $.on(e, "load", this.onIframeLoaded);
                for (this.runExamples(), c = this.findAllByClass("syntaxhighlighter"), i = 0, r = c.length; r > i; i++) t = c[i],
                    n = t.classList.contains("javascript") ? "javascript" : "markup", this.highlightCode(t, n);
            }, o.prototype.onIframeLoaded = function(t) {
                t.target.style.display = "", $.off(t.target, "load", this.onIframeLoaded);
            }, o.prototype.runExamples = function() {
                var t, e, n, o;
                for (o = this.findAllByClass("entry-example"), e = 0, n = o.length; n > e; e++) {
                    t = o[e];
                    try {
                        this.runExample(t);
                    } catch (i) {}
                }
            }, o.prototype.runExample = function(t) {
                var e, n, o;
                o = t.getElementsByClassName("syntaxhighlighter")[0], o && -1 !== o.innerHTML.indexOf("!doctype") && ((n = t.getElementsByClassName(this.constructor.demoClassName)[0]) || (n = document.createElement("iframe"),
                        n.className = this.constructor.demoClassName, n.width = "100%", n.height = 200,
                        t.appendChild(n)), e = n.contentDocument, e.write(this.fixIframeSource(o.textContent)),
                    e.close());
            }, o.prototype.fixIframeSource = function(t) {
                return t = t.replace('"/resources/', '"http://api.jquery.com/resources/'), t.replace("</head>", "<style>\n  html, body { border: 0; margin: 0; padding: 0; }\n  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }\n</style>\n<script>\n  $.ajaxPrefilter(function(opt, opt2, xhr) {\n    if (opt.url.indexOf('http') !== 0) {\n      xhr.abort();\n      document.body.innerHTML = \"<p><strong>This demo cannot run inside DevDocs.</strong></p>\";\n    }\n  });\n</script>\n</head>");
            }, o;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.KnockoutPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                var t, e, n, o, i;
                for (i = this.findAll("pre"), n = 0, o = i.length; o > n; n++) t = i[n], e = t.innerHTML.indexOf('data-bind="') > 0 ? "markup" : "javascript",
                    this.highlightCode(t, e);
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.MaxcdnPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.events = {
                click: "onClick"
            }, n.prototype.afterRender = function() {
                this.highlightCode(this.findAll('.tab-pane[id^="ruby"] > pre'), "ruby"), this.highlightCode(this.findAll('.tab-pane[id^="python"] > pre'), "python"),
                    this.highlightCode(this.findAll('.tab-pane[id^="node"] > pre, .tab-pane[id^="resp"] > pre'), "javascript");
            }, n.prototype.onClick = function(t) {
                var e, n, o, i, s;
                if ("tab" === (n = t.target).getAttribute("data-toggle")) {
                    for ($.stopEvent(t), o = n.parentNode.parentNode, s = o.nextElementSibling, e = n.parentNode,
                        i = 1; e = e.previousElementSibling;) i++;
                    return $(".active", o).classList.remove("active"), $(".active", s).classList.remove("active"),
                        n.parentNode.classList.add("active"), $(".tab-pane:nth-child(" + i + ")", s).classList.add("active");
                }
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.MdnPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            var o;
            return e(n, t), n.className = "_mdn", o = /brush: ?(\w+)/, n.prototype.afterRender = function() {
                var t, e, n, i, s;
                for (s = this.findAll('pre[class^="brush"]'), n = 0, i = s.length; i > n; n++) t = s[n],
                    e = t.className.match(o)[1].replace("html", "markup").replace("js", "javascript"),
                    t.className = "", this.highlightCode(t, e);
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.PhpunitPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                this.highlightCode(this.findAll("pre.programlisting"), "php");
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.RdocPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.events = {
                click: "onClick"
            }, n.prototype.afterRender = function() {
                this.highlightCode(this.findAll("pre.ruby"), "ruby"), this.highlightCode(this.findAll("pre.c"), "clike");
            }, n.prototype.onClick = function(t) {
                var e, n;
                if (t.target.classList.contains("method-click-advice")) return $.stopEvent(t), n = $(".method-source-code", t.target.parentNode.parentNode),
                    e = "block" === n.style.display, n.style.display = e ? "none" : "block", t.target.textContent = e ? "Show source" : "Hide source";
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.ReactPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                var t, e, n, o;
                for (o = this.findAllByTag("pre"), e = 0, n = o.length; n > e; e++) switch (t = o[e],
                    t.getAttribute("data-lang")) {
                    case "html":
                        this.highlightCode(t, "markup");
                        break;

                    case "javascript":
                        this.highlightCode(t, "javascript");
                }
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.SphinxPage = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.prototype.afterRender = function() {
                this.highlightCode(this.findAll("pre.python"), "python"), this.highlightCode(this.findAll("pre.markup"), "markup");
            }, n;
        }(app.views.BasePage);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.Search = function(e) {
            function o() {
                return this.onRoot = t(this.onRoot, this), this.onClick = t(this.onClick, this),
                    this.onEnd = t(this.onEnd, this), this.onResults = t(this.onResults, this), this.google = t(this.google, this),
                    this.searchUrl = t(this.searchUrl, this), this.onInput = t(this.onInput, this),
                    this.onReady = t(this.onReady, this), this.autoFocus = t(this.autoFocus, this),
                    o.__super__.constructor.apply(this, arguments);
            }
            var i;
            return n(o, e), i = app.config.search_param, o.el = "._search", o.activeClass = "_search-active",
                o.elements = {
                    input: "._search-input",
                    resetLink: "._search-clear"
                }, o.events = {
                    input: "onInput",
                    click: "onClick",
                    submit: "onSubmit"
                }, o.shortcuts = {
                    typing: "autoFocus",
                    altG: "google"
                }, o.routes = {
                    root: "onRoot",
                    after: "autoFocus"
                }, o.prototype.init = function() {
                    this.addSubview(this.scope = new app.views.SearchScope(this.el)), this.searcher = new app.Searcher(),
                        this.searcher.on("results", this.onResults).on("end", this.onEnd), app.on("ready", this.onReady),
                        $.on(window, "hashchange", this.searchUrl), $.on(window, "focus", this.autoFocus);
                }, o.prototype.focus = function() {
                    document.activeElement !== this.input && this.input.focus();
                }, o.prototype.autoFocus = function() {
                    $.isTouchScreen() || this.focus();
                }, o.prototype.reset = function() {
                    this.el.reset(), this.onInput(), this.autoFocus();
                }, o.prototype.onReady = function() {
                    this.value = "", this.delay(this.onInput);
                }, o.prototype.onInput = function() {
                    null != this.value && this.value !== this.input.value && (this.value = this.input.value,
                        this.value.length ? this.search() : this.clear());
                }, o.prototype.search = function(t) {
                    null == t && (t = !1), this.addClass(this.constructor.activeClass), this.trigger("searching"),
                        this.hasResults = null, this.flags = {
                            urlSearch: t,
                            initialResults: !0
                        }, this.searcher.find(this.scope.getScope().entries.all(), "text", this.value);
                }, o.prototype.searchUrl = function() {
                    var t;
                    if (app.router.isRoot() && (this.scope.searchUrl(), t = this.extractHashValue())) return this.input.value = this.value = t,
                        this.search(!0), !0;
                }, o.prototype.clear = function() {
                    return this.removeClass(this.constructor.activeClass), this.trigger("clear");
                }, o.prototype.google = function() {
                    this.value && ($.popup("https://www.google.com/search?q=" + encodeURIComponent(this.value)),
                        this.reset());
                }, o.prototype.onResults = function(t) {
                    t.length && (this.hasResults = !0), this.trigger("results", t, this.flags), this.flags.initialResults = !1;
                }, o.prototype.onEnd = function() {
                    this.hasResults || this.trigger("noresults");
                }, o.prototype.onClick = function(t) {
                    t.target === this.resetLink && ($.stopEvent(t), this.reset(), this.focus());
                }, o.prototype.onSubmit = function(t) {
                    $.stopEvent(t);
                }, o.prototype.onRoot = function(t) {
                    t.init || this.reset(), t.hash && this.delay(this.searchUrl);
                }, o.prototype.extractHashValue = function() {
                    var t;
                    return null != (t = this.getHashValue()) ? (app.router.replaceHash(), t) : void 0;
                }, o.prototype.getHashValue = function() {
                    var t;
                    try {
                        return null != (t = new RegExp("#" + i + "=(.*)").exec($.urlDecode(location.hash))) ? t[1] : void 0;
                    } catch (e) {}
                }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.SearchScope = function(e) {
            function o(e) {
                this.el = e, this.onKeydown = t(this.onKeydown, this), this.reset = t(this.reset, this),
                    this.onResults = t(this.onResults, this), o.__super__.constructor.apply(this, arguments);
            }
            var i;
            return n(o, e), i = app.config.search_param, o.elements = {
                input: "._search-input",
                tag: "._search-tag"
            }, o.events = {
                keydown: "onKeydown"
            }, o.shortcuts = {
                escape: "reset"
            }, o.prototype.init = function() {
                this.placeholder = this.input.getAttribute("placeholder"), this.searcher = new app.SynchronousSearcher({
                    fuzzy_min_length: 2,
                    max_results: 1
                }), this.searcher.on("results", this.onResults);
            }, o.prototype.getScope = function() {
                return this.doc || app;
            }, o.prototype.search = function(t) {
                this.doc || this.searcher.find(app.docs.all(), "slug", t);
            }, o.prototype.searchUrl = function() {
                var t;
                (t = this.extractHashValue()) && this.search(t);
            }, o.prototype.onResults = function(t) {
                t.length && this.selectDoc(t[0]);
            }, o.prototype.selectDoc = function(t) {
                return this.doc = t, this.tag.textContent = t.name, this.tag.style.display = "block",
                    this.input.removeAttribute("placeholder"), this.input.value = this.input.value.slice(this.input.selectionStart),
                    this.input.style.paddingLeft = this.tag.offsetWidth + 10 + "px", $.trigger(this.input, "input");
            }, o.prototype.reset = function() {
                return this.doc = null, this.tag.textContent = "", this.tag.style.display = "none",
                    this.input.setAttribute("placeholder", this.placeholder), this.input.style.paddingLeft = "";
            }, o.prototype.onKeydown = function(t) {
                t.ctrlKey || t.metaKey || t.altKey || t.shiftKey || (8 === t.which ? this.doc && !this.input.value && ($.stopEvent(t),
                    this.reset()) : (9 === t.which || 32 === t.which && (app.isMobile() || $.isTouchScreen())) && ($.stopEvent(t),
                    this.search(this.input.value.slice(0, this.input.selectionStart))));
            }, o.prototype.extractHashValue = function() {
                var t, e;
                return (e = this.getHashValue()) ? (t = $.urlDecode(location.hash).replace("#" + i + "=" + e + " ", "#" + i + "="),
                    app.router.replaceHash(t), e) : void 0;
            }, o.prototype.getHashValue = function() {
                var t;
                try {
                    return null != (t = new RegExp("^#" + i + "=(.+?) .").exec($.urlDecode(location.hash))) ? t[1] : void 0;
                } catch (e) {}
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.DocList = function(e) {
            function o() {
                return this.afterRoute = t(this.afterRoute, this), this.onClick = t(this.onClick, this),
                    this.onClose = t(this.onClose, this), this.onOpen = t(this.onOpen, this), this.render = t(this.render, this),
                    o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.className = "_list", o.events = {
                open: "onOpen",
                close: "onClose",
                click: "onClick"
            }, o.routes = {
                after: "afterRoute"
            }, o.elements = {
                disabledTitle: "._list-title",
                disabledList: "._disabled-list"
            }, o.prototype.init = function() {
                this.lists = {}, this.addSubview(this.listSelect = new app.views.ListSelect(this.el)),
                    app.isMobile() || this.addSubview(this.listFocus = new app.views.ListFocus(this.el)),
                    this.addSubview(this.listFold = new app.views.ListFold(this.el)), app.on("ready", this.render);
            }, o.prototype.activate = function() {
                var t, e, n;
                if (o.__super__.activate.apply(this, arguments)) {
                    n = this.lists;
                    for (e in n) t = n[e], t.activate();
                    this.listSelect.selectCurrent();
                }
            }, o.prototype.deactivate = function() {
                var t, e, n;
                if (o.__super__.deactivate.apply(this, arguments)) {
                    n = this.lists;
                    for (e in n) t = n[e], t.deactivate();
                }
            }, o.prototype.render = function() {
                this.html(this.tmpl("sidebarDoc", app.docs.all())), app.isSingleDoc() || 0 === app.disabledDocs.size() || this.renderDisabled();
            }, o.prototype.renderDisabled = function() {
                this.append(this.tmpl("sidebarDisabled", {
                    count: app.disabledDocs.size()
                })), this.refreshElements(), this.renderDisabledList();
            }, o.prototype.renderDisabledList = function() {
                var t;
                (t = app.store.get("hideDisabled")) === !0 ? this.removeDisabledList() : (t !== !1 && app.store.set("hideDisabled", !1),
                    this.appendDisabledList());
            }, o.prototype.appendDisabledList = function() {
                this.append(this.tmpl("sidebarDisabledList", {
                    docs: app.disabledDocs.all()
                })), this.disabledTitle.classList.add("open-title"), this.refreshElements();
            }, o.prototype.removeDisabledList = function() {
                this.disabledList && $.remove(this.disabledList), this.disabledTitle.classList.remove("open-title"),
                    this.refreshElements();
            }, o.prototype.reset = function() {
                var t, e;
                this.listSelect.deselect(), null != (e = this.listFocus) && e.blur(), this.listFold.reset(), (t = app.router.context.type || app.router.context.entry) && (this.reveal(t), this.select(t));
            }, o.prototype.onOpen = function(t) {
                var e;
                $.stopEvent(t), e = app.docs.findBy("slug", t.target.getAttribute("data-slug")),
                    e && !this.lists[e.slug] && (this.lists[e.slug] = e.types.isEmpty() ? new app.views.EntryList(e.entries.all()) : new app.views.TypeList(e),
                        $.after(t.target, this.lists[e.slug].el));
            }, o.prototype.onClose = function(t) {
                var e;
                $.stopEvent(t), e = app.docs.findBy("slug", t.target.getAttribute("data-slug")),
                    e && this.lists[e.slug] && (this.lists[e.slug].detach(), delete this.lists[e.slug]);
            }, o.prototype.select = function(t) {
                this.listSelect.selectByHref(null != t ? t.fullPath() : void 0);
            }, o.prototype.reveal = function(t) {
                this.openDoc(t.doc), t.type && this.openType(t.getType()), this.paginateTo(t), this.scrollTo(t);
            }, o.prototype.openDoc = function(t) {
                this.listFold.open(this.find("[data-slug='" + t.slug + "']"));
            }, o.prototype.openType = function(t) {
                this.listFold.open(this.lists[t.doc.slug].find("[data-slug='" + t.slug + "']"));
            }, o.prototype.paginateTo = function(t) {
                var e;
                null != (e = this.lists[t.doc.slug]) && e.paginateTo(t);
            }, o.prototype.scrollTo = function(t) {
                $.scrollTo(this.find("a[href='" + t.fullPath() + "']"), null, "top", {
                    margin: 0
                });
            }, o.prototype.onClick = function(t) {
                return this.disabledTitle && $.hasChild(this.disabledTitle, t.target) ? ($.stopEvent(t),
                    this.disabledTitle.classList.contains("open-title") ? (this.removeDisabledList(),
                        app.store.set("hideDisabled", !0)) : (this.appendDisabledList(), app.store.set("hideDisabled", !1))) : void 0;
            }, o.prototype.afterRoute = function(t, e) {
                e.init ? this.reset() : this.select(e.type || e.entry);
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.DocPicker = function(e) {
            function o() {
                return this.onAppCacheProgress = t(this.onAppCacheProgress, this), this.onEnter = t(this.onEnter, this),
                    this.onClick = t(this.onClick, this), o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.className = "_list", o.elements = {
                saveLink: "._sidebar-footer-save"
            }, o.events = {
                click: "onClick"
            }, o.shortcuts = {
                enter: "onEnter"
            }, o.prototype.activate = function() {
                var t;
                o.__super__.activate.apply(this, arguments) && (this.render(), this.findByTag("input").focus(),
                    null != (t = app.appCache) && t.on("progress", this.onAppCacheProgress), $.on(this.el, "focus", this.onFocus, !0));
            }, o.prototype.deactivate = function() {
                var t;
                o.__super__.deactivate.apply(this, arguments) && (this.empty(), null != (t = app.appCache) && t.off("progress", this.onAppCacheProgress),
                    $.off(this.el, "focus", this.onFocus, !0));
            }, o.prototype.render = function() {
                this.html(this.tmpl("sidebarLabel", app.docs.all(), {
                        checked: !0
                    }) + this.tmpl("sidebarLabel", app.disabledDocs.all()) + this.tmpl("sidebarVote") + this.tmpl("sidebarSave")),
                    this.refreshElements(), this.delay(function() {
                        return this.el.offsetWidth, this.addClass("_in");
                    });
            }, o.prototype.empty = function() {
                this.resetClass(), o.__super__.empty.apply(this, arguments);
            }, o.prototype.save = function() {
                var t, e, n;
                this.saving || (this.saving = !0, n = this.getSelectedDocs(), app.settings.setDocs(n),
                    this.saveLink.textContent = app.appCache ? "Downloading\u2026" : "Saving\u2026",
                    t = new app.collections.Docs(function() {
                        var t, o, i, s;
                        for (i = app.docs.all(), s = [], t = 0, o = i.length; o > t; t++) e = i[t], -1 === n.indexOf(e.slug) && s.push(e);
                        return s;
                    }()), t.uninstall(function() {
                        return app.reload();
                    }));
            }, o.prototype.getSelectedDocs = function() {
                var t, e, n, o, i;
                for (o = this.findAllByTag("input"), i = [], e = 0, n = o.length; n > e; e++) t = o[e], (null != t ? t.checked : void 0) && i.push(t.name);
                return i;
            }, o.prototype.onClick = function(t) {
                t.target === this.saveLink && ($.stopEvent(t), this.save());
            }, o.prototype.onFocus = function(t) {
                return $.scrollTo(t.target.parentNode, null, "continuous", {
                    bottomGap: 2
                });
            }, o.prototype.onEnter = function() {
                this.save();
            }, o.prototype.onAppCacheProgress = function(t) {
                var e;
                t.lengthComputable && (e = Math.round(100 * t.loaded / t.total), this.saveLink.textContent = "Downloading\u2026 (" + e + "%)");
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = {}.hasOwnProperty,
            e = function(e, n) {
                function o() {
                    this.constructor = e;
                }
                for (var i in n) t.call(n, i) && (e[i] = n[i]);
                return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype,
                    e;
            };
        app.views.EntryList = function(t) {
            function n(t) {
                this.entries = t, n.__super__.constructor.apply(this, arguments);
            }
            return e(n, t), n.tagName = "div", n.className = "_list _list-sub", n.prototype.init = function() {
                this.renderPaginated(), this.activate();
            }, n.prototype.render = function(t) {
                return this.tmpl("sidebarEntry", t);
            }, n;
        }(app.views.PaginatedList);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.Results = function(e) {
            function o(e) {
                this.search = e, this.afterRoute = t(this.afterRoute, this), this.onClear = t(this.onClear, this),
                    this.onNoResults = t(this.onNoResults, this), this.onResults = t(this.onResults, this),
                    o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.className = "_list", o.routes = {
                after: "afterRoute"
            }, o.prototype.deactivate = function() {
                o.__super__.deactivate.apply(this, arguments) && this.empty();
            }, o.prototype.init = function() {
                this.addSubview(this.listSelect = new app.views.ListSelect(this.el)), app.isMobile() || this.addSubview(this.listFocus = new app.views.ListFocus(this.el)),
                    this.search.on("results", this.onResults).on("noresults", this.onNoResults).on("clear", this.onClear);
            }, o.prototype.onResults = function(t, e) {
                var n;
                e.initialResults && null != (n = this.listFocus) && n.blur(), e.initialResults && this.empty(),
                    this.append(this.tmpl("sidebarResult", t)), e.initialResults && (e.urlSearch ? this.openFirst() : this.focusFirst());
            }, o.prototype.onNoResults = function() {
                this.html(this.tmpl("sidebarNoResults"));
            }, o.prototype.onClear = function() {
                this.empty();
            }, o.prototype.focusFirst = function() {
                var t;
                null != (t = this.listFocus) && t.focus(this.el.firstElementChild);
            }, o.prototype.openFirst = function() {
                var t;
                null != (t = this.el.firstElementChild) && t.click();
            }, o.prototype.afterRoute = function(t, e) {
                "entry" === t ? this.listSelect.selectByHref(e.entry.fullPath()) : this.listSelect.deselect();
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.Sidebar = function(e) {
            function o() {
                return this.onEscape = t(this.onEscape, this), this.onAltR = t(this.onAltR, this),
                    this.onGlobalClick = t(this.onGlobalClick, this), this.onClick = t(this.onClick, this),
                    this.onFocus = t(this.onFocus, this), this.showResults = t(this.showResults, this),
                    this.showDocPicker = t(this.showDocPicker, this), this.showDocList = t(this.showDocList, this),
                    o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.el = "._sidebar", o.events = {
                focus: "onFocus",
                click: "onClick"
            }, o.shortcuts = {
                altR: "onAltR",
                escape: "onEscape"
            }, o.prototype.init = function() {
                app.isMobile() || $.isTouchScreen() || this.addSubview(this.hover = new app.views.SidebarHover(this.el)),
                    this.addSubview(this.search = new app.views.Search()), this.search.on("searching", this.showResults).on("clear", this.showDocList),
                    this.results = new app.views.Results(this.search), this.docList = new app.views.DocList(),
                    app.isSingleDoc() || (this.docPicker = new app.views.DocPicker()), app.on("ready", this.showDocList),
                    this.docPicker && $.on(document, "click", this.onGlobalClick);
            }, o.prototype.show = function(t) {
                var e, n;
                this.view !== t && (null != (e = this.hover) && e.hide(), this.saveScrollPosition(),
                    null != (n = this.view) && n.deactivate(), this.html(this.view = t), this.view === this.docList && this.docPicker && this.append(this.tmpl("sidebarSettings")),
                    this.view.activate(), this.restoreScrollPosition());
            }, o.prototype.showDocList = function(t) {
                this.show(this.docList), t === !0 && (this.docList.reset(), this.search.reset());
            }, o.prototype.showDocPicker = function() {
                this.show(this.docPicker);
            }, o.prototype.showResults = function() {
                this.show(this.results);
            }, o.prototype.reset = function() {
                return this.showDocList(!0);
            }, o.prototype.saveScrollPosition = function() {
                this.view === this.docList && (this.scrollTop = this.el.scrollTop);
            }, o.prototype.restoreScrollPosition = function() {
                this.view === this.docList && this.scrollTop ? (this.el.scrollTop = this.scrollTop,
                    this.scrollTop = null) : this.scrollToTop();
            }, o.prototype.scrollToTop = function() {
                this.el.scrollTop = 0;
            }, o.prototype.onFocus = function(t) {
                $.scrollTo(t.target, this.el, "continuous", {
                    bottomGap: 2
                });
            }, o.prototype.onClick = function(t) {
                var e;
                ("function" == typeof(e = t.target).hasAttribute ? e.hasAttribute("data-reset-list") : void 0) && ($.stopEvent(t),
                    this.reset());
            }, o.prototype.onGlobalClick = function(t) {
                var e;
                ("function" == typeof(e = t.target).hasAttribute ? e.hasAttribute("data-pick-docs") : void 0) ? ($.stopEvent(t),
                    this.showDocPicker()) : this.view === this.docPicker && ($.hasChild(this.el, t.target) || this.showDocList());
            }, o.prototype.onAltR = function() {
                this.reset();
            }, o.prototype.onEscape = function() {
                this.reset(), this.scrollToTop();
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t, e = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            n = {}.hasOwnProperty,
            o = function(t, e) {
                function o() {
                    this.constructor = t;
                }
                for (var i in e) n.call(e, i) && (t[i] = e[i]);
                return o.prototype = e.prototype, t.prototype = new o(), t.__super__ = e.prototype,
                    t;
            };
        app.views.SidebarHover = function(n) {
            function i(n) {
                this.el = n, this.onRoute = e(this.onRoute, this), this.onClick = e(this.onClick, this),
                    this.onScroll = e(this.onScroll, this), this.onMouseout = e(this.onMouseout, this),
                    this.onMouseover = e(this.onMouseover, this), this.onBlur = e(this.onBlur, this),
                    this.onFocus = e(this.onFocus, this), this.position = e(this.position, this), t() || delete this.constructor.events.mouseover,
                    i.__super__.constructor.apply(this, arguments);
            }
            return o(i, n), i.itemClass = "_list-hover", i.events = {
                focus: "onFocus",
                blur: "onBlur",
                mouseover: "onMouseover",
                mouseout: "onMouseout",
                scroll: "onScroll",
                click: "onClick"
            }, i.routes = {
                after: "onRoute"
            }, i.prototype.init = function() {
                this.offsetTop = this.el.offsetTop;
            }, i.prototype.show = function(t) {
                t !== this.cursor && (this.hide(), this.isTarget(t) && this.isTruncated(t) && (this.cursor = t,
                    this.clone = this.makeClone(this.cursor), $.append(document.body, this.clone), this.position()));
            }, i.prototype.hide = function() {
                this.cursor && ($.remove(this.clone), this.cursor = this.clone = null);
            }, i.prototype.position = function() {
                var t;
                this.cursor && (t = $.rect(this.cursor).top, t >= this.offsetTop ? this.clone.style.top = t + "px" : this.hide());
            }, i.prototype.makeClone = function(t) {
                var e;
                return e = t.cloneNode(), e.textContent = t.textContent, e.classList.add("clone"),
                    e;
            }, i.prototype.isTarget = function(t) {
                return t.classList.contains(this.constructor.itemClass);
            }, i.prototype.isSelected = function(t) {
                return t.classList.contains("active");
            }, i.prototype.isTruncated = function(t) {
                return t.scrollWidth > t.offsetWidth;
            }, i.prototype.onFocus = function(t) {
                this.focusTime = Date.now(), this.show(t.target);
            }, i.prototype.onBlur = function() {
                this.hide();
            }, i.prototype.onMouseover = function(t) {
                this.isTarget(t.target) && !this.isSelected(t.target) && this.mouseActivated() && this.show(t.target);
            }, i.prototype.onMouseout = function(t) {
                this.isTarget(t.target) && this.mouseActivated() && this.hide();
            }, i.prototype.mouseActivated = function() {
                return !this.focusTime || Date.now() - this.focusTime > 500;
            }, i.prototype.onScroll = function() {
                this.position();
            }, i.prototype.onClick = function(t) {
                t.target === this.clone && $.click(this.cursor);
            }, i.prototype.onRoute = function() {
                this.hide();
            }, i;
        }(app.View), t = function() {
            var t;
            return t = document.createElement("div"), t.style.cssText = "pointer-events: auto",
                "auto" === t.style.pointerEvents;
        };
    }.call(this),
    function() {
        var t = function(t, e) {
                return function() {
                    return t.apply(e, arguments);
                };
            },
            e = {}.hasOwnProperty,
            n = function(t, n) {
                function o() {
                    this.constructor = t;
                }
                for (var i in n) e.call(n, i) && (t[i] = n[i]);
                return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype,
                    t;
            };
        app.views.TypeList = function(e) {
            function o(e) {
                this.doc = e, this.onClose = t(this.onClose, this), this.onOpen = t(this.onOpen, this),
                    o.__super__.constructor.apply(this, arguments);
            }
            return n(o, e), o.tagName = "div", o.className = "_list _list-sub", o.events = {
                open: "onOpen",
                close: "onClose"
            }, o.prototype.init = function() {
                this.lists = {}, this.render(), this.activate();
            }, o.prototype.activate = function() {
                var t, e, n;
                if (o.__super__.activate.apply(this, arguments)) {
                    n = this.lists;
                    for (e in n) t = n[e], t.activate();
                }
            }, o.prototype.deactivate = function() {
                var t, e, n;
                if (o.__super__.deactivate.apply(this, arguments)) {
                    n = this.lists;
                    for (e in n) t = n[e], t.deactivate();
                }
            }, o.prototype.render = function() {
                return this.html(this.tmpl("sidebarType", this.doc.types.all()));
            }, o.prototype.onOpen = function(t) {
                var e;
                $.stopEvent(t), e = this.doc.types.findBy("slug", t.target.getAttribute("data-slug")),
                    e && !this.lists[e.slug] && (this.lists[e.slug] = new app.views.EntryList(e.entries()),
                        $.after(t.target, this.lists[e.slug].el));
            }, o.prototype.onClose = function(t) {
                var e;
                $.stopEvent(t), e = this.doc.types.findBy("slug", t.target.getAttribute("data-slug")),
                    e && this.lists[e.slug] && (this.lists[e.slug].detach(), delete this.lists[e.slug]);
            }, o.prototype.paginateTo = function(t) {
                var e;
                t.type && null != (e = this.lists[t.getType().slug]) && e.paginateTo(t);
            }, o;
        }(app.View);
    }.call(this),
    function() {
        var t = [].slice;
        app.templates.render = function() {
            var e, n, o, i, s, r, a, c;
            if (n = arguments[0], r = arguments[1], e = 3 <= arguments.length ? t.call(arguments, 2) : [],
                i = app.templates[n], Array.isArray(r)) {
                for (o = "", a = 0, c = r.length; c > a; a++) s = r[a], o += i.apply(null, [s].concat(t.call(e)));
                return o;
            }
            return "function" == typeof i ? i.apply(null, [r].concat(t.call(e))) : i;
        };
    }.call(this),
    function() {
        var t, e;
        e = function(t, e, n) {
            return null == e && (e = ""), null == n && (n = ""), e && (e = '<p class="_error-text">' + e + "</p>"),
                n && (n = '<p class="_error-links">' + n + "</p>"), '<div class="_error"><h1 class="_error-title">' + t + "</h1>" + e + n + "</div>";
        }, t = '<a href="javascript:history.back()" class="_error-link">Go back</a>', app.templates.notFoundPage = function() {
            return e(" Oops, that page doesn't exist. ", " It may be missing from the source documentation or this could be a bug. ", t);
        }, app.templates.pageLoadError = function() {
            return e(" Oops, that page failed to load. ", " It may be missing from the server (try reloading the app) or you could be offline.<br>\nIf you keep seeing this, you're likely behind a proxy or firewall which blocks cross-domain requests. ", " " + t + ' &middot; <a href="/#' + location.pathname + '" target="_top" class="_error-link">Reload</a>\n&middot; <a href="#" class="_error-link" data-retry>Retry</a> ');
        }, app.templates.bootError = function() {
            return e(" Oops, the app failed to load. ", ' Check your Internet connection and try <a href="javascript:location.reload()">reloading</a>.<br>\nIf you keep seeing this, you\'re likely behind a proxy or firewall that blocks cross-domain requests. ');
        }, app.templates.offlineError = function() {
            return e(" Oops, the database failed to load. ", " DevDocs requires IndexedDB to cache documentations for offline access.<br>\nUnfortunately IndexedDB is either not supported in your browser, disabled, or buggy. ");
        }, app.templates.unsupportedBrowser = '<div class="_fail">\n  <h1 class="_fail-title">Your browser is unsupported, sorry.</h1>\n  <p class="_fail-text">DevDocs is an API documentation browser which supports the following browsers:\n  <ul class="_fail-list">\n    <li>Recent versions of Chrome and Firefox\n    <li>Safari 5.1+\n    <li>Opera 12.1+\n    <li>Internet Explorer 10+\n    <li>iOS 6+\n    <li>Android 4.1+\n    <li>Windows Phone 8+\n  </ul>\n  <p class="_fail-text">\n    If you\'re unable to upgrade, I apologize.\n    I decided to prioritize speed and new features over support for older browsers.\n  <p class="_fail-text">\n    Note: if you\'re already using one of the browsers above, check your settings and add-ons.\n    The app uses feature detection, not user agent sniffing.\n  <p class="_fail-text">\n    &mdash; Thibaut <a href="https://twitter.com/DevDocs" class="_fail-link">@DevDocs</a>\n</div>';
    }.call(this),
    function() {
        var t;
        t = function(t) {
            return '<p class="_notice-text">' + t + "</p>";
        }, app.templates.singleDocNotice = function(e) {
            return t(" You're currently browsing the " + e.name + ' documentation. To browse all docs, go to\n<a href="http://' + app.config.production_host + '" target="_top">' + app.config.production_host + "</a>. ");
        }, app.templates.disabledDocNotice = function() {
            return t(' <strong>This documentation is currently disabled.</strong>\nTo enable it, click <a class="_notice-link" data-pick-docs>Select documentation</a>. ');
        };
    }.call(this),
    function() {
        var t, e;
        t = function(t, e) {
            return e = e.replace(/<a/g, '<a class="_notif-link"'), '<h5 class="_notif-title">' + t + "</h5>" + e + '<div class="_notif-close"></div>';
        }, e = function(e, n) {
            return t(e, '<p class="_notif-text">' + n);
        }, app.templates.notifUpdateReady = function() {
            return e(" DevDocs has been updated. ", " <a href=\"javascript:location='/'\">Reload the page</a> to use the new version. ");
        }, app.templates.notifError = function() {
            return e(" Oops, an error occured. ", ' Try <a href="javascript:app.reload()">reloading</a>, and if the problem persists,\n<a href="javascript:app.reset()">resetting the app</a>.<br>\nYou can also report this issue on <a href="https://github.com/Thibaut/devdocs/issues/new" target="_blank">GitHub</a>. ');
        }, app.templates.notifInvalidLocation = function() {
            return e(" DevDocs must be loaded from " + app.config.production_host + " ", " Otherwise things are likely to break. ");
        }, app.templates.notifNews = function(e) {
            return t("Changelog", app.templates.newsList(e));
        }, app.templates.notifShare = function() {
            return e(" Hi there! ", ' Like DevDocs? Help us reach more developers by sharing the link with your friends, on\n<a href="/s/tw" target="_blank">Twitter</a>, <a href="/s/fb" target="_blank">Facebook</a>,\n<a href="/s/re" target="_blank">Reddit</a>, etc.<br>Thanks :) ');
        }, app.templates.notifThanks = function() {
            return e(" Hi there! ", ' <p class="_notif-text">Quick shout-out to our awesome sponsors:\n<ul class="_notif-list">\n  <li><a href="http://devdocs.io/s/maxcdn" target="_blank">MaxCDN</a> has been supporting DevDocs since day one. They provide CDN solutions that make DevDocs and countless other sites faster.</li>\n  <li><a href="http://devdocs.io/s/shopify" target="_blank">Shopify</a> is where I spend my weekdays. Interested in working on one of the biggest commerce platforms in the world, in a delightful work environment? We\'re hiring!\n</ul>\n<p class="_notif-text">Have a great day :) ');
        };
    }.call(this),
    function() {
        var t;
        app.templates.aboutPage = function() {
            var e;
            return '<div class="_toc">\n  <h3 class="_toc-title">Table of Contents</h3>\n  <ul class="_toc-list">\n    <li><a href="#credits">Credits</a>\n    <li><a href="#faq">FAQ</a>\n    <li><a href="#copyright">Copyright</a>\n    <li><a href="#plugins">Plugins</a>\n  </ul>\n</div>\n\n<h1 class="_lined-heading">API Documentation Browser</h1>\n<p>DevDocs combines multiple API documentations in a fast, organized, and searchable interface.\n<ul>\n  <li>Created and maintained by <a href="http://thibaut.me">Thibaut Courouble</a>\n  <li>Made at <a href="http://devdocs.io/s/shopify">Shopify</a> &mdash; one of the best software companies in the world\n  <li>Powered by <a href="http://devdocs.io/s/maxcdn" title="Content Delivery Network Services">MaxCDN</a> &mdash; content delivery that developers love\n  <li>Free and <a href="https://github.com/Thibaut/devdocs">open source</a>\n      <iframe class="_github-btn" src="http://ghbtns.com/github-btn.html?user=Thibaut&repo=devdocs&type=watch&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="100" height="20"></iframe>\n</ul>\n<p>To keep up-to-date with the latest development and community news:\n<ul>\n  <li>Subscribe to the <a href="http://eepurl.com/HnLUz">newsletter</a>\n  <li>Follow <a href="https://twitter.com/DevDocs">@DevDocs</a> on Twitter\n  <li>Join the <a href="https://groups.google.com/d/forum/devdocs">mailing list</a>\n</ul>\n<p class="_note _note-green">If you like DevDocs, please consider funding the project on\n  <a href="https://gratipay.com/Thibaut/">Gratipay</a>. Thanks!<br>\n\n<h2 class="_lined-heading" id="credits">Credits</h2>\n\n<p><strong>Special thanks to:</strong>\n<ul>\n  <li><a href="http://get.gaug.es/?utm_source=devdocs&utm_medium=referral&utm_campaign=sponsorships" title="Real Time Web Analytics">Gauges</a> for offering a free account to DevDocs\n  <li><a href="https://www.heroku.com">Heroku</a> and <a href="http://newrelic.com">New Relic</a> for providing awesome free service\n  <li>Daniel Bruce for the <a href="http://www.entypo.com">Entypo</a> pictograms\n  <li><a href="http://www.jeremykratz.com/">Jeremy Kratz</a> for the C/C++ logo\n</ul>\n\n<table class="_credits">\n  <tr>\n    <th>Documentation\n    <th>Copyright\n    <th>License\n  ' + function() {
                var n, o, i;
                for (i = [], n = 0, o = t.length; o > n; n++) e = t[n], i.push("<tr><td>" + e[0] + "<td>&copy; " + e[1] + '<td><a href="' + e[3] + '">' + e[2] + "</a>");
                return i;
            }().join("") + '\n</table>\n\n<h2 class="_lined-heading" id="faq">Questions & Answers</h2>\n<dl>\n  <dt>Does it work offline?\n  <dd>Yes! DevDocs is open source. You can run <a href="https://github.com/Thibaut/devdocs">the code</a> locally on your computer.<br>\n      An offline version that requires no setup is planned for the future.\n  <dt>Where can I suggest new docs and features?\n  <dd>You can suggest and vote for new docs on the <a href="https://trello.com/b/6BmTulfx/devdocs-documentation">Trello board</a>.<br>\n      If you have a specific feature request, add it to the <a href="https://github.com/Thibaut/devdocs/issues">issue tracker</a>.<br>\n      Otherwise use the <a href="https://groups.google.com/d/forum/devdocs">mailing list</a>.\n  <dt>Where can I report bugs?\n  <dd>In the <a href="https://github.com/Thibaut/devdocs/issues">issue tracker</a>. Thanks!\n</dl>\n<p>For anything else, feel free to email me at <a href="mailto:thibaut@devdocs.io">thibaut@devdocs.io</a>.\n\n<h2 class="_lined-heading" id="copyright">Copyright and License</h2>\n<p class="_note">\n  <strong>Copyright 2013&ndash;2015 Thibaut Courouble and <a href="https://github.com/Thibaut/devdocs/graphs/contributors">other contributors</a></strong><br>\n  This software is licensed under the terms of the Mozilla Public License v2.0.<br>\n  You may obtain a copy of the source code at <a href="https://github.com/Thibaut/devdocs">github.com/Thibaut/devdocs</a>.<br>\n  For more information, see the <a href="https://github.com/Thibaut/devdocs/blob/master/COPYRIGHT">COPYRIGHT</a>\n  and <a href="https://github.com/Thibaut/devdocs/blob/master/LICENSE">LICENSE</a> files.\n\n<h2 class="_lined-heading" id="plugins">Plugins and Extensions</h2>\n<ul>\n  <li><a href="https://chrome.google.com/webstore/detail/devdocs/mnfehgbmkapmjnhcnbodoamcioleeooe">Chrome web app</a>\n  <li><a href="https://marketplace.firefox.com/app/devdocs/">Firefox web app</a>\n  <li><a href="https://sublime.wbond.net/packages/DevDocs">Sublime Text plugin</a>\n  <li><a href="https://atom.io/packages/devdocs">Atom plugin</a>\n  <li><a href="https://github.com/gruehle/dev-docs-viewer">Brackets extension</a>\n</ul>\n<p>You can also use <a href="http://fluidapp.com">Fluid</a> to turn DevDocs into a real OS X app, or <a href="https://apps.ubuntu.com/cat/applications/fogger/">Fogger</a> on Ubuntu.';
        }, t = [
            ["Angular.js", "2010-2014 Google, Inc.", "CC BY", "http://creativecommons.org/licenses/by/3.0/"],
            ["Backbone.js", "2010-2014 Jeremy Ashkenas, DocumentCloud", "MIT", "https://raw.github.com/jashkenas/backbone/master/LICENSE"],
            ["Bower", "2014 Bower contributors", "CC BY", "https://github.com/bower/bower.github.io/blob/b7b94ad38b72e8fb5dafb20c8ce42835a49cc98f/package.json#L20"],
            ["C<br>C++", "cppreference.com", "CC BY-SA", "http://en.cppreference.com/w/Cppreference:Copyright/CC-BY-SA"],
            ["Chai", "2011-2014 Jake Luer", "MIT", "https://github.com/chaijs/chai/blob/master/README.md#license"],
            ["CoffeeScript", "2009-2014 Jeremy Ashkenas", "MIT", "https://raw.github.com/jashkenas/coffee-script/master/LICENSE"],
            ["Cordova", "2012-2014 The Apache Software Foundation", "Apache", "https://raw.githubusercontent.com/apache/cordova-docs/master/LICENSE"],
            ["CSS<br>DOM<br>HTML<br>JavaScript<br>SVG<br>XPath", "2005-2014 Mozilla Developer Network and individual contributors", "CC BY-SA", "http://creativecommons.org/licenses/by-sa/2.5/"],
            ["D3.js", "2014 Michael Bostock", "BSD", "https://raw.github.com/mbostock/d3/master/LICENSE"],
            ["Django", "Django Software Foundation and individual contributors", "BSD", "https://raw.githubusercontent.com/django/django/master/LICENSE"],
            ["Ember.js", "2014 Yehuda Katz, Tom Dale and Ember.js contributors", "MIT", "https://raw.github.com/emberjs/ember.js/master/LICENSE"],
            ["Express", "2009-2014 TJ Holowaychuk", "MIT", "https://raw.githubusercontent.com/visionmedia/express/master/LICENSE"],
            ["Git", "2005-2014 Linus Torvalds and others", "GPLv2", "https://raw.github.com/git/git/master/COPYING"],
            ["Go", "Google, Inc.", "CC BY", "http://creativecommons.org/licenses/by/3.0/"],
            ["Grunt", "2014 Grunt Team", "MIT", "https://raw.githubusercontent.com/gruntjs/gruntjs.com/master/LICENSE"],
            ["Haskell", "The University of Glasgow", "BSD", "http://www.haskell.org/ghc/license"],
            ["HTTP", "1999 The Internet Society", "Custom", "http://www.w3.org/Protocols/rfc2616/rfc2616-sec21.html#sec21"],
            ["jQuery", "2009 Packt Publishing<br>&copy; 2014 jQuery Foundation", "MIT", "https://raw.github.com/jquery/api.jquery.com/master/LICENSE-MIT.txt"],
            ["jQuery Mobile", "2014 jQuery Foundation", "MIT", "https://raw.github.com/jquery/api.jquerymobile.com/master/LICENSE-MIT.txt"],
            ["jQuery UI", "2014 jQuery Foundation", "MIT", "https://raw.github.com/jquery/api.jqueryui.com/master/LICENSE-MIT.txt"],
            ["Knockout.js", "Steven Sanderson, the Knockout.js team, and other contributors", "MIT", "https://raw.github.com/knockout/knockout/master/LICENSE"],
            ["Laravel", "Taylor Otwell", "MIT", "https://raw.githubusercontent.com/laravel/framework/master/LICENSE.txt"],
            ["Less", "2009-2014 The Core Less Team", "CC BY", "http://creativecommons.org/licenses/by/3.0/"],
            ["Lo-Dash", "2009-2014 The Dojo Foundation", "MIT", "https://raw.github.com/lodash/lodash/master/LICENSE.txt"],
            ["Marionette.js", "2014 Muted Solutions, LLC", "MIT", "http://mutedsolutions.mit-license.org/"],
            ["Markdown", "2004 John Gruber", "BSD", "http://daringfireball.net/projects/markdown/license"],
            ["MaxCDN", "2014 MaxCDN", "MIT", "https://raw.githubusercontent.com/MaxCDN/api-docs/master/LICENSE"],
            ["Modernizr", "2009-2014 Modernizr", "MIT", "http://modernizr.com/license/"],
            ["Moment.js", "2011-2014 Tim Wood, Iskren Chernev, Moment.js contributors", "MIT", "https://raw.github.com/moment/moment/master/LICENSE"],
            ["Mongoose", "2010 LearnBoost", "MIT", "https://github.com/LearnBoost/mongoose/blob/master/README.md#license"],
            ["nginx", "2002-2014 Igor Sysoev<br>&copy; 2011-2014 Nginx, Inc.", "BSD", "http://nginx.org/LICENSE"],
            ["Node.js", "Joyent, Inc. and other Node contributors<br>Node.js is a trademark of Joyent, Inc.", "MIT", "https://raw.github.com/joyent/node/master/LICENSE"],
            ["Nokogiri", "2008-2014 2014 Aaron Patterson, Mike Dalessio, Charles Nutter, Sergio Arbeo, Patrick Mahoney, Yoko Harada, Akinori Musha", "MIT", "https://github.com/sparklemotion/nokogiri/blob/master/README.rdoc#license"],
            ["PHP", "1997-2014 The PHP Documentation Group", "CC BY", "http://creativecommons.org/licenses/by/3.0/"],
            ["PHPUnit", "2005-2014 Sebastian Bergmann", "CC BY", "http://creativecommons.org/licenses/by/3.0/"],
            ["PostgreSQL", "1996-2013 The PostgreSQL Global Development Group<br>&copy; 1994 The Regents of the University of California", "PostgreSQL", "http://www.postgresql.org/about/licence/"],
            ["Python", "1990-2014 Python Software Foundation<br>Python is a trademark of the Python Software Foundation.", "PSFL", "http://docs.python.org/3/license.html"],
            ["React", "2013-2014 Facebook Inc.", "CC BY", "https://raw.githubusercontent.com/facebook/react/master/LICENSE-docs"],
            ["Redis", "2009-2014 Salvatore Sanfilippo", "CC BY-SA", "http://creativecommons.org/licenses/by-sa/4.0/"],
            ["RequireJS", "2010-2014 The Dojo Foundation", "MIT", "https://raw.githubusercontent.com/jrburke/requirejs/master/LICENSE"],
            ["RethinkDB", "RethinkDB contributors", "CC BY-SA", "https://raw.githubusercontent.com/rethinkdb/docs/master/LICENSE"],
            ["Ruby", "1993-2014 Yukihiro Matsumoto", "Ruby", "https://www.ruby-lang.org/en/about/license.txt"],
            ["Ruby on Rails", "2004-2014 David Heinemeier Hansson<br>Rails, Ruby on Rails, and the Rails logo are trademarks of David Heinemeier Hansson.", "MIT", "https://raw.github.com/rails/rails/master/activerecord/MIT-LICENSE"],
            ["Sass", "2006-2014 Hampton Catlin, Nathan Weizenbaum, and Chris Eppstein", "MIT", "https://raw.github.com/nex3/sass/master/MIT-LICENSE"],
            ["Sinon", "2010-2014 Christian Johansen", "BSD", "https://raw.githubusercontent.com/cjohansen/Sinon.JS/master/LICENSE"],
            ["Socket.io", "2014 Automattic", "MIT", "https://raw.githubusercontent.com/Automattic/socket.io/master/LICENSE"],
            ["Underscore.js", "2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors", "MIT", "https://raw.github.com/jashkenas/underscore/master/LICENSE"],
            ["Yii", "2008-2014 by Yii Software LLC", "BSD", "https://raw.github.com/yiisoft/yii/master/LICENSE"]
        ];
    }.call(this),
    function() {
        var t, e;
        t = $.isMac() ? "cmd" : "ctrl", e = $.isWindows() ? "alt" : t, app.templates.helpPage = '<div class="_toc">\n  <h3 class="_toc-title">Table of Contents</h3>\n  <ul class="_toc-list">\n    <li><a href="#search">Search</a>\n    <li><a href="#shortcuts">Keyboard Shortcuts</a>\n  </ul>\n</div>\n\n<h2 class="_lined-heading" id="search">Search</h2>\n<p>\n  The search is case-insensitive, ignores spaces, and supports fuzzy matching (for queries longer than two characters).\n  For example, searching <code class="_label">bgcp</code> brings up <code class="_label">background-clip</code>.\n<dl>\n  <dt id="doc_search">Searching a single documentation\n  <dd>\n    You can scope the search to a single documentation by typing its name (or an abbreviation),\n    and pressing <code class="_label">Tab</code> (<code class="_label">Space</code> on mobile devices).\n    For example, to search the JavaScript documentation, enter <code class="_label">javascript</code>\n    or <code class="_label">js</code>, then <code class="_label">Tab</code>.<br>\n    To clear the current scope, empty the search field and hit <code class="_label">Backspace</code>.\n  <dt id="url_search">Prefilling the search field\n  <dd>\n    The search field can be prefilled from the URL by visiting <a href="/#q=keyword" target="_top">devdocs.io/#q=keyword</a>.\n    Characters after <code class="_label">#q=</code> will be used as search string.<br>\n    To search a single documentation, add its name and a space before the keyword:\n    <a href="/#q=js%20date" target="_top">devdocs.io/#q=js date</a>.\n  <dt id="browser_search">Searching using the address bar\n  <dd>\n    DevDocs supports OpenSearch, meaning that it can easily be installed as a search engine on most web browsers.\n    <ul>\n      <li>On Chrome, the setup is done automatically. Simply press <code class="_label">Tab</code> when devdocs.io is autocompleted\n          in the omnibox (to set a custom keyword, click <em>Manage search engines\u2026</em> in Chrome\'s settings).\n      <li>On Firefox, open the search engine list (icon in the search bar) and select <em>Add "DevDocs Search"</em>.\n          DevDocs is now available in the search bar. You can also search from the location bar by following\n          <a href="https://support.mozilla.org/en-US/kb/how-search-from-address-bar">these instructions</a>.\n</dl>\n\n<h2 class="_lined-heading" id="shortcuts">Keyboard Shortcuts</h2>\n<h3 class="_shortcuts-title">Selection</h3>\n<dl class="_shortcuts-dl">\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">&darr;</code>\n    <code class="_shortcut-code">&uarr;</code>\n  <dd class="_shortcuts-dd">Move selection\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">&rarr;</code>\n    <code class="_shortcut-code">&larr;</code>\n  <dd class="_shortcuts-dd">Show/hide sub-list\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">enter</code>\n  <dd class="_shortcuts-dd">Open selection\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">' + t + ' + enter</code>\n  <dd class="_shortcuts-dd">Open selection in a new tab\n</dl>\n<h3 class="_shortcuts-title">Navigation</h3>\n<dl class="_shortcuts-dl">\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">' + e + ' + &larr;</code>\n    <code class="_shortcut-code">' + e + ' + &rarr;</code>\n  <dd class="_shortcuts-dd">Go back/forward\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">alt + &darr;</code>\n    <code class="_shortcut-code">alt + &uarr;</code>\n  <dd class="_shortcuts-dd">Scroll step by step\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">space</code>\n    <code class="_shortcut-code">shift + space</code>\n  <dd class="_shortcuts-dd">Scroll screen by screen\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">' + t + ' + &uarr;</code>\n    <code class="_shortcut-code">' + t + ' + &darr;</code>\n  <dd class="_shortcuts-dd">Scroll to the top/bottom\n</dl>\n<h3 class="_shortcuts-title">Misc</h3>\n<dl class="_shortcuts-dl">\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">alt + f</code>\n  <dd class="_shortcuts-dd">Focus first link in the content area<br>(press tab to focus the other links)\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">alt + r</code>\n  <dd class="_shortcuts-dd">Reveal current page in sidebar\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">alt + g</code>\n  <dd class="_shortcuts-dd">Search on Google\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">escape</code>\n  <dd class="_shortcuts-dd">Reset<br>(press twice in single doc mode)\n  <dt class="_shortcuts-dt">\n    <code class="_shortcut-code">?</code>\n  <dd class="_shortcuts-dd">Show this page\n</dl>\n<p class="_note">\n  <strong>Tip:</strong> If the cursor is no longer in the search field, press backspace or\n  continue to type and it will refocus the search field and start showing new results. ';
    }.call(this),
    function() {
        var t, e;
        app.templates.newsPage = function() {
                return ' <h1 class="_lined-heading">Changelog</h1>\n<p class="_note">For the latest news,\n  subscribe to the <a href="http://eepurl.com/HnLUz">newsletter</a>\n  or follow <a href="https://twitter.com/DevDocs">@DevDocs</a>.<br>\n  For development updates, follow the project on <a href="https://github.com/Thibaut/devdocs">GitHub</a>.\n<div class="_news">' + app.templates.newsList(app.news) + "</div> ";
            }, app.templates.newsList = function(t) {
                var n, o, i, s, r, a;
                for (s = new Date().getUTCFullYear(), o = "", r = 0, a = t.length; a > r; r++) i = t[r],
                    n = new Date(i[0]), s !== n.getUTCFullYear() && (s = n.getUTCFullYear(), o += "<h4>" + s + "</h4>"),
                    o += e(n, i.slice(1));
                return o;
            }, t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            e = function(e, n) {
                var o, i, s, r, a, c;
                for (e = '<span class="_news-date">' + t[e.getUTCMonth()] + " " + e.getUTCDate() + "</span>",
                    i = "", o = a = 0, c = n.length; c > a; o = ++a) s = n[o], s = s.split("\n"), r = '<span class="_news-title">' + s.shift() + "</span>",
                    i += '<div class="_news-row">' + (0 === o ? e : "") + " " + r + " " + s.join("<br>") + "</div>";
                return i;
            }, app.news = [
                ["2014-12-21", 'New <a href="/react/">React</a>, <a href="/rethinkdb/">RethinkDB</a>, <a href="/socketio/">Socket.IO</a>, <a href="/modernizr/">Modernizr</a> and <a href="/bower/">Bower</a> documentations'],
                ["2014-11-30", 'New <a href="/phpunit/">PHPUnit</a> and <a href="/nokogiri/">Nokogiri</a> documentations'],
                ["2014-11-16", 'New <a href="/python2/">Python 2</a> documentation'],
                ["2014-11-09", 'New design\nFeedback welcome on <a href="https://twitter.com/DevDocs" target="_blank">Twitter</a> and <a href="https://github.com/Thibaut/devdocs" target="_blank">GitHub</a>.'],
                ["2014-10-19", 'New <a href="/svg/">SVG</a>, <a href="/marionette/">Marionette.js</a>, and <a href="/mongoose/">Mongoose</a> documentations'],
                ["2014-10-18", 'New <a href="/nginx/">nginx</a> documentation'],
                ["2014-10-13", 'New <a href="/xpath/">XPath</a> documentation'],
                ["2014-09-07", "Updated the HTML, CSS, JavaScript, and DOM documentations with additional content."],
                ["2014-08-04", 'New <a href="/django/">Django</a> documentation'],
                ["2014-07-27", 'New <a href="/markdown/">Markdown</a> documentation'],
                ["2014-07-05", 'New <a href="/cordova/">Cordova</a> documentation'],
                ["2014-07-01", 'New <a href="/chai/">Chai</a> and <a href="/sinon/">Sinon</a> documentations'],
                ["2014-06-15", 'New <a href="/requirejs/">RequireJS</a> documentation'],
                ["2014-06-14", 'New <a href="/haskell/">Haskell</a> documentation'],
                ["2014-05-25", 'New <a href="/laravel/">Laravel</a> documentation'],
                ["2014-05-04", 'New <a href="/express/">Express</a>, <a href="/grunt/">Grunt</a>, and <a href="/maxcdn/">MaxCDN</a> documentations'],
                ["2014-04-06", 'New <a href="/go/">Go</a> documentation'],
                ["2014-03-30", 'New <a href="/cpp/">C++</a> documentation'],
                ["2014-03-16", 'New <a href="/yii/">Yii</a> documentation'],
                ["2014-03-08", "Added path bar."],
                ["2014-02-22", 'New <a href="/c/">C</a> documentation'],
                ["2014-02-16", 'New <a href="/moment/">Moment.js</a> documentation'],
                ["2014-02-12", 'The root/category pages are now included in the search index (e.g. <a href="/#q=CSS">CSS</a>)'],
                ["2014-01-26", 'Updated <a href="/angular/">Angular.js</a> documentation'],
                ["2014-01-19", 'New <a href="/d3/">D3.js</a> and <a href="/knockout/">Knockout.js</a> documentations'],
                ["2014-01-18", 'DevDocs is now available as a <a href="https://marketplace.firefox.com/app/devdocs/">Firefox web app</a> (currently requires Aurora).'],
                ["2014-01-12", 'Added <code class="_label">alt + g</code> shortcut for searching on Google.', 'Added <code class="_label">alt + r</code> shortcut for revealing the current page in the sidebar.'],
                ["2013-12-14", 'New <a href="/postgresql/">PostgreSQL</a> documentation'],
                ["2013-12-13", 'New <a href="/git/">Git</a> and <a href="/redis/">Redis</a> documentations'],
                ["2013-11-26", 'New <a href="/python/">Python</a> documentation'],
                ["2013-11-19", 'New <a href="/rails/">Ruby on Rails</a> documentation'],
                ["2013-11-16", 'New <a href="/ruby/">Ruby</a> documentation'],
                ["2013-10-24", 'DevDocs is now <a href="https://github.com/Thibaut/devdocs">open source</a>.'],
                ["2013-10-09", 'DevDocs is now available as a <a href="https://chrome.google.com/webstore/detail/devdocs/mnfehgbmkapmjnhcnbodoamcioleeooe">Chrome web app</a>.'],
                ["2013-09-22", 'New <a href="/php/">PHP</a> documentation'],
                ["2013-09-06", 'New <a href="/lodash/">Lo-Dash</a> documentation ', 'On mobile devices you can now search a specific documentation by typing its name and <code class="_label">Space</code>.'],
                ["2013-09-01", 'New <a href="/jqueryui/">jQuery UI</a> and <a href="/jquerymobile/">jQuery Mobile</a> documentations'],
                ["2013-08-28", "New smartphone interface\nTested on iOS 6+ and Android 4.1+"],
                ["2013-08-25", 'New <a href="/ember/">Ember.js</a> documentation'],
                ["2013-08-18", 'New <a href="/coffeescript/">CoffeeScript</a> documentation', "URL search now automatically opens the first result."],
                ["2013-08-13", 'New <a href="/angular/">Angular.js</a> documentation'],
                ["2013-08-11", 'New <a href="/sass/">Sass</a> and <a href="/less/">Less</a> documentations'],
                ["2013-08-05", 'New <a href="/node/">Node.js</a> documentation'],
                ["2013-08-03", "Added support for OpenSearch"],
                ["2013-07-30", 'New <a href="/backbone/">Backbone.js</a> documentation'],
                ["2013-07-27", "You can now customize the list of documentations.\nNew docs will be hidden by default, but you'll see a notification when there are new releases.", 'New <a href="/http/">HTTP</a> documentation'],
                ["2013-07-15", 'URL search now works with single documentations: <a href="/#q=js%20sort">devdocs.io/#q=js sort</a>'],
                ["2013-07-13", "Added syntax highlighting", "Added documentation versions"],
                ["2013-07-11", 'New <a href="/underscore/">Underscore.js</a> documentation ', "Improved compatibility with tablets\nA mobile version is planned as soon as other high priority features have been implemented."],
                ["2013-07-10", 'You can now search specific documentations.\nSimply type the documentation\'s name and press <code class="_label">Tab</code>.\nThe name is fuzzy matched so you can use abbreviations like <code>js</code> for <code>JavaScript</code>.'],
                ["2013-07-08", "Improved search with fuzzy matching and better results\nFor example, searching <code>jqmka</code> now returns <code>jQuery.makeArray()</code>.", "DevDocs finally has an icon.", '<code class="_label">space</code> has replaced <code class="_label">alt + space</code> for scrolling down.'],
                ["2013-07-06", 'New <a href="/dom/">DOM</a> and <a href="/dom_events/">DOM Events</a> documentations\nDevDocs now includes almost all reference documents available on the Mozilla Developer Network.\nBig thank you to Mozilla and all the people that contributed to MDN.', 'Implemented URL search: <a href="/#q=sort">devdocs.io/#q=sort</a>'],
                ["2013-07-02", 'New <a href="/javascript/">JavaScript</a> documentation'],
                ["2013-06-28", "DevDocs made the front page of Hacker News!\nHi everyone &mdash; thanks for trying DevDocs.\nPlease bear with me while I fix bugs and scramble to add more docs.\nThis is only v1. There's a lot more to come."],
                ["2013-06-18", "Initial release"]
            ];
    }.call(this),
    function() {
        var t;
        app.templates.offlinePage = function(e) {
            return '<h1 class="_lined-heading">Offline Documentation</h1>\n<table class="_docs">\n  <tr>\n    <th>Documentation</th>\n    <th class="_docs-size">Size</th>\n    <th>Status</th>\n    <th>Action</th>\n  </tr>\n  ' + e + '\n</table>\n<h1 class="_lined-heading">Questions & Answers</h1>\n<dl>\n  <dt>How does this work?\n  <dd>Each page is cached as a key-value pair in <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a> (downloaded from a single JSON file).<br>\n      The app also uses <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache">AppCache</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">localStorage</a> to cache the assets and index files.\n  <dt>Can I close the tab/browser?\n  <dd>' + t() + '\n  <dt>What if I don\'t update a documentation?\n  <dd>You\'ll see outdated content and some pages will be missing or broken, since the rest of the app (including data for the search and sidebar) uses a different caching mechanism and is updated automatically.<br>\n      Documentation versioning is planned for the future but not yet supported, sorry.\n  <dt>I found a bug, where do I report it?\n  <dd>In the <a href="https://github.com/Thibaut/devdocs/issues">issue tracker</a>. Thanks!\n  <dt>How do I uninstall/reset the app?\n  <dd>Click <a href="javascript:app.reset()">here</a>.\n  <dt>Why aren\'t all documentations listed above?\n  <dd>You have to <a href="#" data-pick-docs>enable</a> them first.\n</dl>';
        }, t = function() {
            return app.AppCache.isEnabled() ? ' Yes! Even offline, you can open a new tab, go to <a href="http://devdocs.io">devdocs.io</a>, and everything will work as if you were online (provided you installed all the documentations you want to use beforehand).<br>\nNote that loading any page other than <a href="http://devdocs.io">devdocs.io</a> directly won\'t work (due to limitations in AppCache). ' : ' No. Because AppCache is unavailable in your browser (or has been disabled), loading <a href="http://devdocs.io">devdocs.io</a> offline won\'t work.<br>\nThe current tab will continue to work, though (provided you installed all the documentations you want to use beforehand). ';
        }, app.templates.offlineDoc = function(t, e) {
            var n, o;
            return o = e.installed && e.mtime !== t.mtime, n = '<tr data-slug="' + t.slug + '"' + (o ? ' class="_highlight"' : "") + '>\n  <td class="_docs-name _icon-' + t.slug + '">' + t.name + '</td>\n  <td class="_docs-size">' + Math.ceil(t.db_size / 1e5) / 10 + " MB</td>",
                n += e.installed ? o ? '<td>Outdated</td>\n<td><a data-action="install">Update</a> - <a data-action="uninstall">Uninstall</a></td>' : '<td>Up-to-date</td>\n<td><a data-action="uninstall">Uninstall</a></td>' : '<td>-</td>\n<td><a data-action="install">Install</a></td>',
                n + "</tr>";
        };
    }.call(this),
    function() {
        var t, e;
        t = function(t) {
                return '<a href="http://devdocs.io/s/maxcdn" class="' + t + '">\n  <span class="_logo-thx _maxcdn-logo">MaxCDN</span>\n  <span class="_logo-info">MaxCDN has been supporting DevDocs since day one. They provide CDN solutions that make DevDocs and countless other sites faster.</span>\n</a>';
            }, e = function(t) {
                return '<a href="http://devdocs.io/s/shopify" class="' + t + '">\n  <span class="_logo-thx _shopify-logo">Shopify</span>\n  <span class="_logo-info">Interested in working on one of the biggest commerce platforms in the world, in a delightful work environment? We\'re hiring developers, ops engineers, designers&hellip;</span>\n</a>';
            }, app.templates.splash = '<div class="_splash-title">DevDocs</div>\n' + t("_splash-sponsor") + "\n" + e("_splash-sponsor"),
            app.templates.intro = '<div class="_intro"><div class="_intro-message">\n  <a class="_intro-hide" data-hide-intro>Stop showing this message</a>\n  <h2 class="_intro-title">Welcome!</h2>\n  <p>DevDocs combines multiple API documentations in a fast, organized, and searchable interface.\n     Here\'s what you should know before you start:\n  <ol class="_intro-list">\n    <li>To enable more docs, click <a class="_intro-link" data-pick-docs>Select documentation</a> in the bottom left corner\n    <li>You don\'t have to use your mouse &mdash; see the list of <a href="/help#shortcuts">keyboard shortcuts</a>\n    <li>The search supports fuzzy matching (e.g. "bgcp" brings up "background-clip")\n    <li>To search a specific documentation, type its name (or an abbreviation), then Tab\n    <li>You can search using your browser\'s address bar &mdash; <a href="/help#browser_search">learn how</a>\n    <li>DevDocs works on mobile and can be installed on <a href="https://chrome.google.com/webstore/detail/devdocs/mnfehgbmkapmjnhcnbodoamcioleeooe">Chrome</a> and <a href="https://marketplace.firefox.com/app/devdocs/">Firefox</a>.\n    <li>For the latest news, subscribe to the <a href="http://eepurl.com/HnLUz">newsletter</a> or follow <a href="https://twitter.com/DevDocs">@DevDocs</a>\n    <li>DevDocs is free and <a href="https://github.com/Thibaut/devdocs">open source</a>\n        <iframe class="_github-btn" src="http://ghbtns.com/github-btn.html?user=Thibaut&repo=devdocs&type=watch&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="100" height="20"></iframe>\n    <li>If you like the app, please consider supporting the project on <a href="https://gratipay.com/Thibaut/">Gratipay</a>. Thanks!\n  </ol>\n  <p class="_intro-sponsors">\n    Thanks to' + e("_intro-sponsor") + " " + t("_intro-sponsor") + "\n  <p>That's all. Happy coding!\n</div></div>",
            app.templates.mobileNav = '<nav class="_mobile-nav">\n  <a href="/about" class="_mobile-nav-link">About</a>\n  <a href="/news" class="_mobile-nav-link">News</a>\n  <a href="/help" class="_mobile-nav-link">Help</a>\n</nav>',
            app.templates.mobileIntro = '<div class="_mobile-intro">\n  <h2 class="_intro-title">Welcome!</h2>\n  <p>DevDocs combines multiple API documentations in a fast, organized, and searchable interface.\n     Here\'s what you should know before you start:\n  <ol class="_intro-list">\n    <li>To pick your docs, click <a data-pick-docs>Select documentation</a> at the bottom of the menu\n    <li>The search supports fuzzy matching (e.g. "bgcp" matches "background-clip")\n    <li>To search a specific documentation, type its name (or an abbreviation), then Space\n    <li>For the latest news, subscribe to the <a href="http://eepurl.com/HnLUz">newsletter</a> or follow <a href="https://twitter.com/DevDocs">@DevDocs</a>\n    <li>DevDocs is <a href="https://github.com/Thibaut/devdocs">open source</a>\n  </ol>\n  <p>That\'s all. Happy coding!\n  <p class="_intro-sponsors">' + e("_intro-sponsor") + " " + t("_intro-sponsor") + '</p>\n  <a class="_intro-hide" data-hide-intro>Stop showing this message</a>\n</div>';
    }.call(this),
    function() {
        app.templates.typePage = function(t) {
            return " <h1>" + t.doc.name + " / " + t.name + '</h1>\n<ul class="_entry-list">' + app.templates.render("typePageEntry", t.entries()) + "</ul> ";
        }, app.templates.typePageEntry = function(t) {
            return '<li><a href="' + t.fullPath() + '">' + $.escape(t.name) + "</a></li>";
        };
    }.call(this),
    function() {
        app.templates.path = function(t, e, n) {
            var o;
            return o = '<a href="' + t.fullPath() + '" class="_path-item _icon-' + t.slug + '">' + t.name + "</a>",
                e && (o += '<a href="' + e.fullPath() + '" class="_path-item">' + e.name + "</a>"),
                n && (o += '<span class="_path-item">' + $.escape(n.name) + "</span>"), o;
        };
    }.call(this),
    function() {
        var t, e;
        e = app.templates, e.sidebarDoc = function(t, e) {
                var n;
                return null == e && (e = {}), n = '<a href="' + t.fullPath() + '" class="_list-item _icon-' + t.slug + " ",
                    n += e.disabled ? "_list-disabled" : "_list-dir", n += '" data-slug="' + t.slug + '">',
                    e.disabled || (n += '<span class="_list-arrow"></span>'), t.version && (n += '<span class="_list-count">' + t.version + "</span>"),
                    n + ("" + t.name + "</a>");
            }, e.sidebarType = function(t) {
                return '<a href="' + t.fullPath() + '" class="_list-item _list-dir" data-slug="' + t.slug + '"><span class="_list-arrow"></span><span class="_list-count">' + t.count + "</span>" + t.name + "</a>";
            }, e.sidebarEntry = function(t) {
                return '<a href="' + t.fullPath() + '" class="_list-item _list-hover">' + $.escape(t.name) + "</a>";
            }, e.sidebarResult = function(t) {
                return '<a href="' + t.fullPath() + '" class="_list-item _list-hover _list-result _icon-' + t.doc.slug + '"><span class="_list-reveal" data-reset-list title="Reveal in list"></span>' + $.escape(t.name) + "</a>";
            }, e.sidebarNoResults = function() {
                var t;
                return t = app.isSingleDoc() || !app.disabledDocs.isEmpty() ? "" : '<span class="_list-noresults-note">Note: documentations must be <a class="_list-noresults-link" data-pick-docs>enabled</a> to appear in the search.</span>',
                    ' <div class="_list-noresults">No results. ' + t + "</div> ";
            }, e.sidebarPageLink = function(t) {
                return '<span class="_list-item _list-pagelink">Show more\u2026 (' + t + ")</span>";
            }, e.sidebarLabel = function(t, e) {
                var n;
                return null == e && (e = {}), n = '<label class="_list-item _list-label _icon-' + t.slug,
                    e.checked || (n += " _list-label-off"), n += '"><input type="checkbox" name="' + t.slug + '" class="_list-checkbox" ',
                    e.checked && (n += "checked"), n + (">" + t.name + "</label>");
            }, e.sidebarDisabledList = function(t) {
                return '<div class="_disabled-list">' + e.render("sidebarDoc", t.docs, {
                    disabled: !0
                }) + "</div>";
            }, e.sidebarDisabled = function(t) {
                return '<h6 class="_list-title"><span class="_list-arrow"></span>Disabled (' + t.count + ")</h6>";
            }, e.sidebarVote = '<a href="https://trello.com/b/6BmTulfx/devdocs-documentation" class="_list-link" target="_blank">Vote for new documentation</a>',
            t = function(t) {
                return '<div class="_sidebar-footer">' + t + "</div>";
            }, e.sidebarSettings = function() {
                return t('<a class="_sidebar-footer-link _sidebar-footer-edit" data-pick-docs>Select documentation</a>');
            }, e.sidebarSave = function() {
                return t('<a class="_sidebar-footer-link _sidebar-footer-save">Save</a>');
            };
    }.call(this),
    function() {
        var t;
        t = function() {
            return document.removeEventListener("DOMContentLoaded", t, !1), document.body ? app.init() : setTimeout(t, 42);
        }, document.addEventListener("DOMContentLoaded", t, !1);
    }.call(this);