! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Lightense = e() : t.Lightense = e()
}(window, function() {
    return o = {}, i.m = n = [function(t, e) {
        function n(e, t) {
            var n, o = Object.keys(e);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), o.push.apply(o, n)), o
        }

        function h(o) {
            for (var t = 1; t < arguments.length; t++) {
                var i = null != arguments[t] ? arguments[t] : {};
                t % 2 ? n(Object(i), !0).forEach(function(t) {
                    var e, n = o,
                        t = i[e = t];
                    e in n ? Object.defineProperty(n, e, {
                        value: t,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : n[e] = t
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : n(Object(i)).forEach(function(t) {
                    Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(i, t))
                })
            }
            return o
        }

        function i(t) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        var o = function() {
            "use strict";
            var n, u = window,
                d = document,
                f = {
                    time: 300,
                    padding: 40,
                    offset: 40,
                    keyboard: !0,
                    cubicBezier: "cubic-bezier(.2, 0, .1, 1)",
                    background: "var(--bg-color-80, rgba(255, 255, 255, .98))",
                    zIndex: 1e6,
                    beforeShow: void 0,
                    afterShow: void 0,
                    beforeHide: void 0,
                    afterHide: void 0
                },
                p = {};

            function r(t) {
                var e = p[t];
                if (e) {
                    if ("function" != typeof e) throw "config.".concat(t, " must be a function!");
                    Reflect.apply(e, p, [p])
                }
            }

            function o(e) {
                e.src && !e.classList.contains("lightense-target") && (e.classList.add("lightense-target"), e.addEventListener("click", function(t) {
                    return p.keyboard && (t.metaKey || t.ctrlKey) ? u.open(e.src, "_blank") : void
                    function(t) {
                        if (p.target = t, p.target.classList.contains("lightense-open")) return l();
                        var n, o, i;
                        r("beforeShow"), p.scrollY = u.scrollY, n = p.target, o = "transitionend", i = function() {
                            r("afterShow")
                        }, n.addEventListener(o, function t(e) {
                            Reflect.apply(i, this, e), n.removeEventListener(o, t)
                        });
                        t = new Image;
                        t.onload = function() {
                            ! function(t) {
                                var e = t.width,
                                    n = t.height,
                                    o = u.pageYOffset || d.documentElement.scrollTop || 0,
                                    i = u.pageXOffset || d.documentElement.scrollLeft || 0,
                                    r = p.target.getBoundingClientRect(),
                                    a = e / r.width,
                                    l = u.innerWidth || d.documentElement.clientWidth || 0,
                                    s = u.innerHeight || d.documentElement.clientHeight || 0,
                                    c = p.target.getAttribute("data-lightense-padding") || p.target.getAttribute("data-padding") || p.padding,
                                    t = c < l ? l - c : l - f.padding,
                                    c = c < s ? s - c : s - f.padding;
                                p.scaleFactor = e < t && n < c ? a : e / n < t / c ? c / n * a : t / e * a;
                                s = o + s / 2, i = r.left + i + r.width / 2, r = r.top + o + r.height / 2;
                                p.translateX = Math.round(l / 2 - i), p.translateY = Math.round(s - r)
                            }(this),
                            function() {
                                p.target.classList.add("lightense-open"), p.wrap = d.createElement("div"), p.wrap.className = "lightense-wrap", setTimeout(function() {
                                    p.target.style.transform = "scale(" + p.scaleFactor + ")"
                                }, 20), p.target.parentNode.insertBefore(p.wrap, p.target), p.wrap.appendChild(p.target), setTimeout(function() {
                                    p.wrap.style.transform = "translate3d(" + p.translateX + "px, " + p.translateY + "px, 0)"
                                }, 20);
                                var t = {
                                        cubicBezier: p.target.getAttribute("data-lightense-cubic-bezier") || p.cubicBezier,
                                        background: p.target.getAttribute("data-lightense-background") || p.target.getAttribute("data-background") || p.background,
                                        zIndex: p.target.getAttribute("data-lightense-z-index") || p.zIndex
                                    },
                                    t = h(h({}, p), t);
                                a("lightense-images-css-computed", "\n    :root {\n      --lightense-z-index: ".concat(t.zIndex - 1, ";\n      --lightense-backdrop: ").concat(t.background, ";\n      --lightense-duration: ").concat(t.time, "ms;\n      --lightense-timing-func: ").concat(t.cubicBezier, ";\n    }")), p.container.style.visibility = "visible", setTimeout(function() {
                                    p.container.style.opacity = "1"
                                }, 20)
                            }(), u.addEventListener("keyup", c, !1), u.addEventListener("scroll", s, !1), p.container.addEventListener("click", l, !1)
                        }, t.src = p.target.src
                    }(this)
                }, !1))
            }

            function a(t, e) {
                var n = d.head || d.getElementsByTagName("head")[0];
                d.getElementById(t) && d.getElementById(t).remove();
                var o = d.createElement("style");
                o.id = t, o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(d.createTextNode(e)), n.appendChild(o)
            }

            function l() {
                r("beforeHide"), u.removeEventListener("keyup", c, !1), u.removeEventListener("scroll", s, !1), p.container.removeEventListener("click", l, !1), p.target.classList.remove("lightense-open"), p.wrap.style.transform = "", p.target.style.transform = "", p.target.classList.add("lightense-transitioning"), p.container.style.opacity = "", setTimeout(function() {
                    r("afterHide"), p.container.style.visibility = "", p.container.style.backgroundColor = "", p.wrap.parentNode.replaceChild(p.target, p.wrap), p.target.classList.remove("lightense-transitioning")
                }, p.time)
            }

            function s() {
                Math.abs(p.scrollY - u.scrollY) >= p.offset && l()
            }

            function c(t) {
                t.preventDefault(), 27 === t.keyCode && l()
            }
            return function(t) {
                var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                n = function(t) {
                        switch (i(t)) {
                            case "undefined":
                                throw "You need to pass an element!";
                            case "string":
                                return d.querySelectorAll(t);
                            case "object":
                                return t
                        }
                    }(t), p = h(h({}, f), e), a("lightense-images-css", "\n:root {\n  --lightense-z-index: ".concat(p.zIndex - 1, ";\n  --lightense-backdrop: ").concat(p.background, ";\n  --lightense-duration: ").concat(p.time, "ms;\n  --lightense-timing-func: ").concat(p.cubicBezier, ";\n}\n\n.lightense-backdrop {\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  z-index: calc(var(--lightense-z-index) - 1);\n  padding: 0;\n  margin: 0;\n  transition: opacity var(--lightense-duration) ease;\n  cursor: zoom-out;\n  opacity: 0;\n  background-color: var(--lightense-backdrop);\n  visibility: hidden;\n}\n\n@supports (-webkit-backdrop-filter: blur(30px)) {\n  .lightense-backdrop {\n    background-color: var(--lightense-backdrop);\n    -webkit-backdrop-filter: blur(30px);\n  }\n}\n\n@supports (backdrop-filter: blur(30px)) {\n  .lightense-backdrop {\n    background-color: var(--lightense-backdrop);\n    backdrop-filter: blur(30px);\n  }\n}\n\n.lightense-wrap {\n  position: relative;\n  transition: transform var(--lightense-duration) var(--lightense-timing-func);\n  z-index: var(--lightense-z-index);\n  pointer-events: none;\n}\n\n.lightense-target {\n  cursor: zoom-in;\n  transition: transform var(--lightense-duration) var(--lightense-timing-func);\n  pointer-events: auto;\n}\n\n.lightense-open {\n  cursor: zoom-out;\n}\n\n.lightense-transitioning {\n  pointer-events: none;\n}")), d.querySelector(".lightense-backdrop") || (p.container = d.createElement("div"), p.container.className = "lightense-backdrop", d.body.appendChild(p.container)),
                    function(t) {
                        var e = t.length;
                        if (e)
                            for (var n = 0; n < e; n++) o(t[n]);
                        else o(t)
                    }(n)
            }
        }();
        t.exports = o
    }], i.c = o, i.d = function(t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function(e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) i.d(n, o, function(t) {
                return e[t]
            }.bind(null, o));
        return n
    }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 0);

    function i(t) {
        if (o[t]) return o[t].exports;
        var e = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return n[t].call(e.exports, e, e.exports, i), e.l = !0, e.exports
    }
    var n, o
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).reframe = e()
}(this, function() {
    "use strict";

    function e() {
        for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
        for (var o = Array(t), i = 0, e = 0; e < n; e++)
            for (var r = arguments[e], a = 0, l = r.length; a < l; a++, i++) o[i] = r[a];
        return o
    }
    return function(t, i) {
        return void 0 === i && (i = "js-reframe"), ("string" == typeof t ? e(document.querySelectorAll(t)) : "length" in t ? e(t) : [t]).forEach(function(t) {
            var e, n, o; - 1 !== t.className.split(" ").indexOf(i) || -1 < t.style.width.indexOf("%") || (e = t.getAttribute("height") || t.offsetHeight, n = t.getAttribute("width") || t.offsetWidth, o = ("string" == typeof e ? parseInt(e) : e) / ("string" == typeof n ? parseInt(n) : n) * 100, (e = document.createElement("div")).className = i, (n = e.style).position = "relative", n.width = "100%", n.paddingTop = o + "%", (o = t.style).position = "absolute", o.width = "100%", o.height = "100%", o.left = "0", o.top = "0", null !== (o = t.parentNode) && void 0 !== o && o.insertBefore(e, t), null !== (o = t.parentNode) && void 0 !== o && o.removeChild(t), e.appendChild(t))
        })
    }
});
var tns = function() {
    var t = window,
        wo = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.msRequestAnimationFrame || function(t) {
            return setTimeout(t, 16)
        },
        e = window,
        Co = e.cancelAnimationFrame || e.mozCancelAnimationFrame || function(t) {
            clearTimeout(t)
        };

    function To(t) {
        for (var e, n, o, i = t || {}, r = 1, a = arguments.length; r < a; r++)
            if (null !== (e = arguments[r]))
                for (n in e) i !== (o = e[n]) && void 0 !== o && (i[n] = o);
        return i
    }

    function Mo(t) {
        return 0 <= ["true", "false"].indexOf(t) ? JSON.parse(t) : t
    }

    function Eo(t, e, n, o) {
        if (o) try {
            t.setItem(e, n)
        } catch (t) {}
        return n
    }

    function So() {
        var t = document,
            e = t.body;
        return e || ((e = t.createElement("body")).fake = !0), e
    }
    var n = document.documentElement;

    function ko(t) {
        var e = "";
        return t.fake && (e = n.style.overflow, t.style.background = "", t.style.overflow = n.style.overflow = "hidden", n.appendChild(t)), e
    }

    function Oo(t, e) {
        t.fake && (t.remove(), n.style.overflow = e, n.offsetHeight)
    }

    function Lo(t, e, n, o) {
        "insertRule" in t ? t.insertRule(e + "{" + n + "}", o) : t.addRule(e, n, o)
    }

    function Bo(t) {
        return ("insertRule" in t ? t.cssRules : t.rules).length
    }

    function Ao(t, e, n) {
        for (var o = 0, i = t.length; o < i; o++) e.call(n, t[o], o)
    }
    var e = "classList" in document.createElement("_"),
        No = e ? function(t, e) {
            return t.classList.contains(e)
        } : function(t, e) {
            return 0 <= t.className.indexOf(e)
        },
        Io = e ? function(t, e) {
            No(t, e) || t.classList.add(e)
        } : function(t, e) {
            No(t, e) || (t.className += " " + e)
        },
        Do = e ? function(t, e) {
            No(t, e) && t.classList.remove(e)
        } : function(t, e) {
            No(t, e) && (t.className = t.className.replace(e, ""))
        };

    function Po(t, e) {
        return t.hasAttribute(e)
    }

    function Ho(t, e) {
        return t.getAttribute(e)
    }

    function r(t) {
        return void 0 !== t.item
    }

    function jo(t, e) {
        if (t = r(t) || t instanceof Array ? t : [t], "[object Object]" === Object.prototype.toString.call(e))
            for (var n = t.length; n--;)
                for (var o in e) t[n].setAttribute(o, e[o])
    }

    function zo(t, e) {
        t = r(t) || t instanceof Array ? t : [t];
        for (var n = (e = e instanceof Array ? e : [e]).length, o = t.length; o--;)
            for (var i = n; i--;) t[o].removeAttribute(e[i])
    }

    function Ro(t) {
        for (var e = [], n = 0, o = t.length; n < o; n++) e.push(t[n]);
        return e
    }

    function Wo(t, e) {
        "none" !== t.style.display && (t.style.display = "none")
    }

    function Yo(t, e) {
        "none" === t.style.display && (t.style.display = "")
    }

    function Xo(t) {
        return "none" !== window.getComputedStyle(t).display
    }

    function Fo(e) {
        var n, o;
        "string" == typeof e && (n = [e], o = e.charAt(0).toUpperCase() + e.substr(1), ["Webkit", "Moz", "ms", "O"].forEach(function(t) {
            "ms" === t && "transform" !== e || n.push(t + o)
        }), e = n);
        for (var t = document.createElement("fakeelement"), i = (e.length, 0); i < e.length; i++) {
            var r = e[i];
            if (void 0 !== t.style[r]) return r
        }
        return !1
    }

    function qo(t, e) {
        var n = !1;
        return /^Webkit/.test(t) ? n = "webkit" + e + "End" : /^O/.test(t) ? n = "o" + e + "End" : t && (n = e.toLowerCase() + "end"), n
    }
    var o = !1;
    try {
        var i = Object.defineProperty({}, "passive", {
            get: function() {
                o = !0
            }
        });
        window.addEventListener("test", null, i)
    } catch (t) {}
    var a = !!o && {
        passive: !0
    };

    function _o(t, e, n) {
        for (var o in e) {
            var i = 0 <= ["touchstart", "touchmove"].indexOf(o) && !n && a;
            t.addEventListener(o, e[o], i)
        }
    }

    function Vo(t, e) {
        for (var n in e) {
            var o = 0 <= ["touchstart", "touchmove"].indexOf(n) && a;
            t.removeEventListener(n, e[n], o)
        }
    }

    function Ko() {
        return {
            topics: {},
            on: function(t, e) {
                this.topics[t] = this.topics[t] || [], this.topics[t].push(e)
            },
            off: function(t, e) {
                if (this.topics[t])
                    for (var n = 0; n < this.topics[t].length; n++)
                        if (this.topics[t][n] === e) {
                            this.topics[t].splice(n, 1);
                            break
                        }
            },
            emit: function(e, n) {
                n.type = e, this.topics[e] && this.topics[e].forEach(function(t) {
                    t(n, e)
                })
            }
        }
    }
    Object.keys || (Object.keys = function(t) {
        var e, n = [];
        for (e in t) Object.prototype.hasOwnProperty.call(t, e) && n.push(e);
        return n
    }), "remove" in Element.prototype || (Element.prototype.remove = function() {
        this.parentNode && this.parentNode.removeChild(this)
    });

    function Go(T) {
        T = To({
            container: ".slider",
            mode: "carousel",
            axis: "horizontal",
            items: 1,
            gutter: 0,
            edgePadding: 0,
            fixedWidth: !1,
            autoWidth: !1,
            viewportMax: !1,
            slideBy: 1,
            center: !1,
            controls: !0,
            controlsPosition: "top",
            controlsText: ["prev", "next"],
            controlsContainer: !1,
            prevButton: !1,
            nextButton: !1,
            nav: !0,
            navPosition: "top",
            navContainer: !1,
            navAsThumbnails: !1,
            arrowKeys: !1,
            speed: 300,
            autoplay: !1,
            autoplayPosition: "top",
            autoplayTimeout: 5e3,
            autoplayDirection: "forward",
            autoplayText: ["start", "stop"],
            autoplayHoverPause: !1,
            autoplayButton: !1,
            autoplayButtonOutput: !0,
            autoplayResetOnVisibility: !0,
            animateIn: "tns-fadeIn",
            animateOut: "tns-fadeOut",
            animateNormal: "tns-normal",
            animateDelay: !1,
            loop: !0,
            rewind: !1,
            autoHeight: !1,
            responsive: !1,
            lazyload: !1,
            lazyloadSelector: ".tns-lazy-img",
            touch: !0,
            mouseDrag: !1,
            swipeAngle: 15,
            nested: !1,
            preventActionWhenRunning: !1,
            preventScrollOnTouch: !1,
            freezable: !0,
            onInit: !1,
            useLocalStorage: !0,
            nonce: !1
        }, T || {});
        var M = document,
            m = window,
            o = {
                ENTER: 13,
                SPACE: 32,
                LEFT: 37,
                RIGHT: 39
            },
            e = {},
            t = T.useLocalStorage;
        if (t) {
            var n = navigator.userAgent,
                i = new Date;
            try {
                (e = m.localStorage) ? (e.setItem(i, i), t = e.getItem(i) == i, e.removeItem(i)) : t = !1, t || (e = {})
            } catch (n) {
                t = !1
            }
            t && (e.tnsApp && e.tnsApp !== n && ["tC", "tPL", "tMQ", "tTf", "t3D", "tTDu", "tTDe", "tADu", "tADe", "tTE", "tAE"].forEach(function(t) {
                e.removeItem(t)
            }), localStorage.tnsApp = n)
        }
        var g = e.tC ? Mo(e.tC) : Eo(e, "tC", function() {
                var t = document,
                    e = So(),
                    n = ko(e),
                    o = t.createElement("div"),
                    i = !1;
                e.appendChild(o);
                try {
                    for (var r, a = "(10px * 10)", l = ["calc" + a, "-moz-calc" + a, "-webkit-calc" + a], s = 0; s < 3; s++)
                        if (r = l[s], o.style.width = r, 100 === o.offsetWidth) {
                            i = r.replace(a, "");
                            break
                        }
                } catch (t) {}
                return e.fake ? Oo(e, n) : o.remove(), i
            }(), t),
            y = e.tPL ? Mo(e.tPL) : Eo(e, "tPL", function() {
                var t = document,
                    e = So(),
                    n = ko(e),
                    o = t.createElement("div"),
                    t = t.createElement("div"),
                    i = "";
                o.className = "tns-t-subp2", t.className = "tns-t-ct";
                for (var r = 0; r < 70; r++) i += "<div></div>";
                return t.innerHTML = i, o.appendChild(t), e.appendChild(o), t = Math.abs(o.getBoundingClientRect().left - t.children[67].getBoundingClientRect().left) < 2, e.fake ? Oo(e, n) : o.remove(), t
            }(), t),
            E = e.tMQ ? Mo(e.tMQ) : Eo(e, "tMQ", function() {
                if (window.matchMedia || window.msMatchMedia) return !0;
                var t = document,
                    e = So(),
                    n = ko(e),
                    o = t.createElement("div"),
                    i = t.createElement("style"),
                    r = "@media all and (min-width:1px){.tns-mq-test{position:absolute}}";
                return i.type = "text/css", o.className = "tns-mq-test", e.appendChild(i), e.appendChild(o), i.styleSheet ? i.styleSheet.cssText = r : i.appendChild(t.createTextNode(r)), r = (window.getComputedStyle ? window.getComputedStyle(o) : o.currentStyle).position, e.fake ? Oo(e, n) : o.remove(), "absolute" === r
            }(), t),
            r = e.tTf ? Mo(e.tTf) : Eo(e, "tTf", Fo("transform"), t),
            a = e.t3D ? Mo(e.t3D) : Eo(e, "t3D", function(t) {
                if (!t) return !1;
                if (!window.getComputedStyle) return !1;
                var e = document,
                    n = So(),
                    o = ko(n),
                    i = e.createElement("p"),
                    e = 9 < t.length ? "-" + t.slice(0, -9).toLowerCase() + "-" : "";
                return e += "transform", n.insertBefore(i, null), i.style[t] = "translate3d(1px,1px,1px)", e = window.getComputedStyle(i).getPropertyValue(e), n.fake ? Oo(n, o) : i.remove(), void 0 !== e && 0 < e.length && "none" !== e
            }(r), t),
            b = e.tTDu ? Mo(e.tTDu) : Eo(e, "tTDu", Fo("transitionDuration"), t),
            l = e.tTDe ? Mo(e.tTDe) : Eo(e, "tTDe", Fo("transitionDelay"), t),
            x = e.tADu ? Mo(e.tADu) : Eo(e, "tADu", Fo("animationDuration"), t),
            s = e.tADe ? Mo(e.tADe) : Eo(e, "tADe", Fo("animationDelay"), t),
            c = e.tTE ? Mo(e.tTE) : Eo(e, "tTE", qo(b, "Transition"), t),
            u = e.tAE ? Mo(e.tAE) : Eo(e, "tAE", qo(x, "Animation"), t),
            d = m.console && "function" == typeof m.console.warn,
            f = ["container", "controlsContainer", "prevButton", "nextButton", "navContainer", "autoplayButton"],
            p = {};
        if (f.forEach(function(t) {
                var e, n;
                "string" == typeof T[t] && (e = T[t], n = M.querySelector(e), p[t] = e, n && n.nodeName ? T[t] = n : d && console.warn("Can't find", T[t]))
            }), !(T.container.children.length < 1)) {
            var S, k, h, O, L = T.responsive,
                B = T.nested,
                A = "carousel" === T.mode;
            if (L) {
                0 in L && (T = To(T, L[0]), delete L[0]);
                var v, w = {};
                for (v in L) {
                    var C = "number" == typeof(C = L[v]) ? {
                        items: C
                    } : C;
                    w[v] = C
                }
                L = w, w = null
            }
            A || function t(e) {
                for (var n in e) A || ("slideBy" === n && (e[n] = "page"), "edgePadding" === n && (e[n] = !1), "autoHeight" === n && (e[n] = !1)), "responsive" === n && t(e[n])
            }(T), A || (T.axis = "horizontal", T.slideBy = "page", T.edgePadding = !1, S = T.animateIn, k = T.animateOut, h = T.animateDelay, O = T.animateNormal);
            var N, I, D = "horizontal" === T.axis,
                P = M.createElement("div"),
                H = M.createElement("div"),
                j = T.container,
                z = j.parentNode,
                R = j.outerHTML,
                W = j.children,
                Y = W.length,
                X = Ze(),
                F = !1;
            L && bn(), A && (j.className += " tns-vpfix");
            var q, _, V, K, G, Q, J, U, Z, $, tt, et, nt, ot, it, rt, at, lt, st, ct, ut, dt, ft, pt, ht, vt, mt, gt, yt, bt, xt, wt, Ct, Tt, Mt, Et, St, kt, Ot = T.autoWidth,
                Lt = nn("fixedWidth"),
                Bt = nn("edgePadding"),
                At = nn("gutter"),
                Nt = tn(),
                It = nn("center"),
                Dt = Ot ? 1 : Math.floor(nn("items")),
                Pt = nn("slideBy"),
                Ht = T.viewportMax || T.fixedWidthViewportWidth,
                jt = nn("arrowKeys"),
                zt = nn("speed"),
                Rt = T.rewind,
                Wt = !Rt && T.loop,
                Yt = nn("autoHeight"),
                Xt = nn("controls"),
                Ft = nn("controlsText"),
                qt = nn("nav"),
                _t = nn("touch"),
                Vt = nn("mouseDrag"),
                Kt = nn("autoplay"),
                Gt = nn("autoplayTimeout"),
                Qt = nn("autoplayText"),
                Jt = nn("autoplayHoverPause"),
                Ut = nn("autoplayResetOnVisibility"),
                Zt = (i = nn("nonce"), t = document.createElement("style"), i && t.setAttribute("nonce", i), document.querySelector("head").appendChild(t), t.sheet || t.styleSheet),
                $t = T.lazyload,
                te = T.lazyloadSelector,
                ee = [],
                ne = Wt ? (t = function() {
                    if (Ot || Lt && !Ht) return Y - 1;
                    var t = Lt ? "fixedWidth" : "items",
                        e = [];
                    if ((Lt || T[t] < Y) && e.push(T[t]), L)
                        for (var n in L) {
                            n = L[n][t];
                            n && (Lt || n < Y) && e.push(n)
                        }
                    return e.length || e.push(0), Math.ceil(Lt ? Ht / Math.min.apply(null, e) : Math.max.apply(null, e))
                }(), K = A ? Math.ceil((5 * t - Y) / 2) : 4 * t - Y, K = Math.max(t, K), en("edgePadding") ? K + 1 : K) : 0,
                oe = A ? Y + 2 * ne : Y + ne,
                ie = !(!Lt && !Ot || Wt),
                re = Lt ? _n() : null,
                ae = !A || !Wt,
                le = D ? "left" : "top",
                se = "",
                ce = "",
                ue = Lt ? function() {
                    return It && !Wt ? Y - 1 : Math.ceil(-re / (Lt + At))
                } : Ot ? function() {
                    for (var t = 0; t < oe; t++)
                        if (q[t] >= -re) return t
                } : function() {
                    return It && A && !Wt ? Y - 1 : Wt || A ? Math.max(0, oe - Math.ceil(Dt)) : oe - 1
                },
                de = Qe(nn("startIndex")),
                fe = de,
                pe = (Ge(), 0),
                he = Ot ? null : ue(),
                ve = T.preventActionWhenRunning,
                me = T.swipeAngle,
                ge = !me || "?",
                ye = !1,
                be = T.onInit,
                xe = new Ko,
                we = " tns-slider tns-" + T.mode,
                Ce = j.id || (K = window.tnsId, window.tnsId = K ? K + 1 : 1, "tns" + window.tnsId),
                Te = nn("disable"),
                Me = !1,
                Ee = T.freezable,
                Se = !(!Ee || Ot) && yn(),
                ke = !1,
                Oe = {
                    click: to,
                    keydown: function(t) {
                        t = so(t);
                        var e = [o.LEFT, o.RIGHT].indexOf(t.keyCode);
                        0 <= e && (0 === e ? Z.disabled || to(t, -1) : $.disabled || to(t, 1))
                    }
                },
                Le = {
                    click: function(t) {
                        if (ye) {
                            if (ve) return;
                            Zn()
                        }
                        for (var e, n, o = co(t = so(t)); o !== ot && !Po(o, "data-nav");) o = o.parentNode;
                        Po(o, "data-nav") && (e = lt = Number(Ho(o, "data-nav")), n = Lt || Ot ? e * Y / rt : e * Dt, $n(je ? e : Math.min(Math.ceil(n), Y - 1), t), st === e && (ht && ro(), lt = -1))
                    },
                    keydown: function(t) {
                        t = so(t);
                        var e, n = M.activeElement;
                        Po(n, "data-nav") && (e = [o.LEFT, o.RIGHT, o.ENTER, o.SPACE].indexOf(t.keyCode), n = Number(Ho(n, "data-nav")), 0 <= e && (0 === e ? 0 < n && lo(nt[n - 1]) : 1 === e ? n < rt - 1 && lo(nt[n + 1]) : $n(lt = n, t)))
                    }
                },
                Be = {
                    mouseover: function() {
                        ht && (no(), vt = !0)
                    },
                    mouseout: function() {
                        vt && (eo(), vt = !1)
                    }
                },
                Ae = {
                    visibilitychange: function() {
                        M.hidden ? ht && (no(), gt = !0) : gt && (eo(), gt = !1)
                    }
                },
                Ne = {
                    keydown: function(t) {
                        t = so(t);
                        var e = [o.LEFT, o.RIGHT].indexOf(t.keyCode);
                        0 <= e && to(t, 0 === e ? -1 : 1)
                    }
                },
                Ie = {
                    touchstart: ho,
                    touchmove: vo,
                    touchend: mo,
                    touchcancel: mo
                },
                De = {
                    mousedown: ho,
                    mousemove: vo,
                    mouseup: mo,
                    mouseleave: mo
                },
                Pe = en("controls"),
                He = en("nav"),
                je = !!Ot || T.navAsThumbnails,
                ze = en("autoplay"),
                t = en("touch"),
                Re = en("mouseDrag"),
                We = "tns-slide-active",
                Ye = "tns-slide-cloned",
                Xe = "tns-complete",
                Fe = {
                    load: function(t) {
                        On(co(t))
                    },
                    error: function(t) {
                        t = co(t);
                        Io(t, "failed"), Ln(t)
                    }
                },
                qe = "force" === T.preventScrollOnTouch;
            Pe && (J = T.controlsContainer, U = T.controlsContainer ? T.controlsContainer.outerHTML : "", Z = T.prevButton, $ = T.nextButton, tt = T.prevButton ? T.prevButton.outerHTML : "", et = T.nextButton ? T.nextButton.outerHTML : ""), He && (ot = T.navContainer, it = T.navContainer ? T.navContainer.outerHTML : "", rt = Ot ? Y : yo(), at = 0, lt = -1, st = Ue(), ct = st, ut = "tns-nav-active", dt = "Carousel Page ", ft = " (Current Slide)"), ze && (yt = "forward" === T.autoplayDirection ? 1 : -1, bt = T.autoplayButton, xt = T.autoplayButton ? T.autoplayButton.outerHTML : "", wt = ["<span class='tns-visually-hidden'>", " animation</span>"]), (t || Re) && (Mt = {}, St = !(Et = {}), kt = D ? function(t, e) {
                    return t.x - e.x
                } : function(t, e) {
                    return t.y - e.y
                }), Ot || Ke(Te || Se), r && (le = r, se = "translate", ce = a ? (se += D ? "3d(" : "3d(0px, ", D ? ", 0px, 0px)" : ", 0px)") : (se += D ? "X(" : "Y(", ")")), A && (j.className = j.className.replace("tns-vpfix", "")),
                function() {
                    if (en("gutter"), P.className = "tns-outer", H.className = "tns-inner", P.id = Ce + "-ow", H.id = Ce + "-iw", "" === j.id && (j.id = Ce), we += y || Ot ? " tns-subpixel" : " tns-no-subpixel", we += g ? " tns-calc" : " tns-no-calc", Ot && (we += " tns-autowidth"), we += " tns-" + T.axis, j.className += we, A ? ((N = M.createElement("div")).id = Ce + "-mw", N.className = "tns-ovh", P.appendChild(N), N.appendChild(H)) : P.appendChild(H), Yt && ((N || H).className += " tns-ah"), z.insertBefore(P, j), H.appendChild(j), Ao(W, function(t, e) {
                            Io(t, "tns-item"), t.id || (t.id = Ce + "-item" + e), !A && O && Io(t, O), jo(t, {
                                "aria-hidden": "true",
                                tabindex: "-1"
                            })
                        }), ne) {
                        for (var t = M.createDocumentFragment(), e = M.createDocumentFragment(), n = ne; n--;) {
                            var o = n % Y,
                                i = W[o].cloneNode(!0);
                            Io(i, Ye), zo(i, "id"), e.insertBefore(i, e.firstChild), A && (o = W[Y - 1 - o].cloneNode(!0), Io(o, Ye), zo(o, "id"), t.appendChild(o))
                        }
                        j.insertBefore(t, j.firstChild), j.appendChild(e), W = j.children
                    }
                }(),
                function() {
                    if (!A)
                        for (var t = de, e = de + Math.min(Y, Dt); t < e; t++) {
                            var n = W[t];
                            n.style.left = 100 * (t - de) / Dt + "%", Io(n, S), Do(n, O)
                        }
                    if (D && (y || Ot ? (Lo(Zt, "#" + Ce + " > .tns-item", "font-size:" + m.getComputedStyle(W[0]).fontSize + ";", Bo(Zt)), Lo(Zt, "#" + Ce, "font-size:0;", Bo(Zt))) : A && Ao(W, function(t, e) {
                            t.style.marginLeft = g ? g + "(" + 100 * e + "% / " + oe + ")" : 100 * e / oe + "%"
                        })), E ? (b && (r = N && T.autoHeight ? cn(T.speed) : "", Lo(Zt, "#" + Ce + "-mw", r, Bo(Zt))), r = on(T.edgePadding, T.gutter, T.fixedWidth, T.speed, T.autoHeight), Lo(Zt, "#" + Ce + "-iw", r, Bo(Zt)), A && (r = D && !Ot ? "width:" + rn(T.fixedWidth, T.gutter, T.items) + ";" : "", b && (r += cn(zt)), Lo(Zt, "#" + Ce, r, Bo(Zt))), r = D && !Ot ? an(T.fixedWidth, T.gutter, T.items) : "", T.gutter && (r += ln(T.gutter)), A || (b && (r += cn(zt)), x && (r += un(zt)))) : (A && Yt && (N.style[b] = zt / 1e3 + "s"), H.style.cssText = on(Bt, At, Lt, Yt), A && D && !Ot && (j.style.width = rn(Lt, At, Dt)), r = D && !Ot ? an(Lt, At, Dt) : "", At && (r += ln(At))), r && Lo(Zt, "#" + Ce + " > .tns-item", r, Bo(Zt)), L && E)
                        for (var o in L) {
                            var o = parseInt(o),
                                i = L[o],
                                r = "",
                                a = "",
                                l = "",
                                s = "",
                                c = "",
                                u = Ot ? null : nn("items", o),
                                d = nn("fixedWidth", o),
                                f = nn("speed", o),
                                p = nn("edgePadding", o),
                                h = nn("autoHeight", o),
                                v = nn("gutter", o);
                            b && N && nn("autoHeight", o) && "speed" in i && (a = "#" + Ce + "-mw{" + cn(f) + "}"), ("edgePadding" in i || "gutter" in i) && (l = "#" + Ce + "-iw{" + on(p, v, d, f, h) + "}"), A && D && !Ot && ("fixedWidth" in i || "items" in i || Lt && "gutter" in i) && (s = "width:" + rn(d, v, u) + ";"), b && "speed" in i && (s += cn(f)), s = s && "#" + Ce + "{" + s + "}", ("fixedWidth" in i || Lt && "gutter" in i || !A && "items" in i) && (c += an(d, v, u)), "gutter" in i && (c += ln(v)), !A && "speed" in i && (b && (c += cn(f)), x && (c += un(f))), (r = a + l + s + (c = c && "#" + Ce + " > .tns-item{" + c + "}")) && Zt.insertRule("@media (min-width: " + o / 16 + "em) {" + r + "}", Zt.cssRules.length)
                        }
                }(), dn();
            var _e = Wt ? A ? function() {
                    var t = pe,
                        e = he;
                    t += Pt, e -= Pt, Bt ? (t += 1, --e) : Lt && (Nt + At) % (Lt + At) && --e, ne && (e < de ? de -= Y : de < t && (de += Y))
                } : function() {
                    if (he < de)
                        for (; pe + Y <= de;) de -= Y;
                    else if (de < pe)
                        for (; de <= he - Y;) de += Y
                } : function() {
                    de = Math.max(pe, Math.min(he, de))
                },
                Ve = A ? function() {
                    var e, n, o, i, t, r, a, l, s, c, u;
                    Fn(j, ""), b || !zt ? (Gn(), zt && Xo(j) || Zn()) : (e = j, n = le, o = se, i = ce, t = Vn(), r = zt, a = Zn, l = Math.min(r, 10), s = 0 <= t.indexOf("%") ? "%" : "px", t = t.replace(s, ""), c = Number(e.style[n].replace(o, "").replace(i, "").replace(s, "")), u = (t - c) / r * l, setTimeout(function t() {
                        r -= l, c += u, e.style[n] = o + c + s + i, 0 < r ? setTimeout(t, l) : a()
                    }, l)), D || go()
                } : function() {
                    ee = [];
                    var t = {};
                    t[c] = t[u] = Zn, Vo(W[fe], t), _o(W[de], t), Qn(fe, S, k, !0), Qn(de, O, S), c && u && zt && Xo(j) || Zn()
                };
            return {
                version: "2.9.3",
                getInfo: xo,
                events: xe,
                goTo: $n,
                play: function() {
                    Kt && !ht && (io(), mt = !1)
                },
                pause: function() {
                    ht && (ro(), mt = !0)
                },
                isOn: F,
                updateSliderHeight: Pn,
                refresh: dn,
                destroy: function() {
                    var t;
                    Zt.disabled = !0, Zt.ownerNode && Zt.ownerNode.remove(), Vo(m, {
                        resize: mn
                    }), jt && Vo(M, Ne), J && Vo(J, Oe), ot && Vo(ot, Le), Vo(j, Be), Vo(j, Ae), bt && Vo(bt, {
                        click: ao
                    }), Kt && clearInterval(pt), A && c && ((t = {})[c] = Zn, Vo(j, t)), _t && Vo(j, Ie), Vt && Vo(j, De);
                    var e, r = [R, U, tt, et, it, xt];
                    for (e in f.forEach(function(t, e) {
                            var n, o, i = "container" === t ? P : T[t];
                            "object" == typeof i && i && (n = !!i.previousElementSibling && i.previousElementSibling, o = i.parentNode, i.outerHTML = r[e], T[t] = n ? n.nextElementSibling : o.firstElementChild)
                        }), f = S = k = h = O = D = P = H = j = z = R = W = Y = I = X = Ot = Lt = Bt = At = Nt = Dt = Pt = Ht = jt = zt = Rt = Wt = Yt = Zt = $t = q = ee = ne = oe = ie = re = ae = le = se = ce = ue = de = fe = pe = he = me = ge = ye = be = xe = we = Ce = Te = Me = Ee = Se = ke = Oe = Le = Be = Ae = Ne = Ie = De = Pe = He = je = ze = Re = We = Xe = Fe = _ = Xt = Ft = J = U = Z = $ = G = Q = qt = ot = it = nt = rt = at = lt = st = ct = ut = dt = ft = Kt = Gt = yt = Qt = Jt = bt = xt = Ut = wt = pt = ht = vt = mt = gt = Mt = Et = Ct = St = Tt = kt = _t = Vt = null, this) "rebuild" !== e && (this[e] = null);
                    F = !1
                },
                rebuild: function() {
                    return Go(To(T, p))
                }
            }
        }

        function Ke(t) {
            t && (Xt = qt = _t = Vt = jt = Kt = Jt = Ut = !1)
        }

        function Ge() {
            for (var t = A ? de - ne : de; t < 0;) t += Y;
            return t % Y + 1
        }

        function Qe(t) {
            return t = t ? Math.max(0, Math.min(Wt ? Y - 1 : Y - Dt, t)) : 0, A ? t + ne : t
        }

        function Je(t) {
            for (null == t && (t = de), A && (t -= ne); t < 0;) t += Y;
            return Math.floor(t % Y)
        }

        function Ue() {
            var t = Je(),
                t = je ? t : Lt || Ot ? Math.ceil((t + 1) * rt / Y - 1) : Math.floor(t / Dt);
            return t = !Wt && A && de === he ? rt - 1 : t
        }

        function Ze() {
            return m.innerWidth || M.documentElement.clientWidth || M.body.clientWidth
        }

        function $e(t) {
            return "top" === t ? "afterbegin" : "beforeend"
        }

        function tn() {
            var t = Bt ? 2 * Bt - At : 0;
            return function t(e) {
                if (null != e) {
                    var n, o = M.createElement("div");
                    return e.appendChild(o), n = (n = o.getBoundingClientRect()).right - n.left, o.remove(), n || t(e.parentNode)
                }
            }(z) - t
        }

        function en(t) {
            if (T[t]) return !0;
            if (L)
                for (var e in L)
                    if (L[e][t]) return !0;
            return !1
        }

        function nn(t, e) {
            if (null == e && (e = X), "items" === t && Lt) return Math.floor((Nt + At) / (Lt + At)) || 1;
            var n = T[t];
            if (L)
                for (var o in L) e >= parseInt(o) && t in L[o] && (n = L[o][t]);
            return "slideBy" === t && "page" === n && (n = nn("items")), n = !(A || "slideBy" !== t && "items" !== t) ? Math.floor(n) : n
        }

        function on(t, e, n, o, i) {
            var r, a = "";
            return void 0 !== t ? (r = t, e && (r -= e), a = D ? "margin: 0 " + r + "px 0 " + t + "px;" : "margin: " + t + "px 0 " + r + "px 0;") : e && !n && (e = "-" + e + "px", a = "margin: 0 " + (D ? e + " 0 0" : "0 " + e + " 0") + ";"), !A && i && b && o && (a += cn(o)), a
        }

        function rn(t, e, n) {
            return t ? (t + e) * oe + "px" : g ? g + "(" + 100 * oe + "% / " + n + ")" : 100 * oe / n + "%"
        }

        function an(t, e, n) {
            var o;
            return o = "width:" + (o = t ? t + e + "px" : (A || (n = Math.floor(n)), o = A ? oe : n, g ? g + "(100% / " + o + ")" : 100 / o + "%")), "inner" !== B ? o + ";" : o + " !important;"
        }

        function ln(t) {
            return !1 !== t ? (D ? "padding-" : "margin-") + (D ? "right" : "bottom") + ": " + t + "px;" : ""
        }

        function sn(t, e) {
            e = t.substring(0, t.length - e).toLowerCase();
            return e = e && "-" + e + "-"
        }

        function cn(t) {
            return sn(b, 18) + "transition-duration:" + t / 1e3 + "s;"
        }

        function un(t) {
            return sn(x, 17) + "animation-duration:" + t / 1e3 + "s;"
        }

        function dn() {
            var t;
            en("autoHeight") || Ot || !D ? (Ao(t = j.querySelectorAll("img"), function(t) {
                var e = t.src;
                $t || (e && e.indexOf("data:image") < 0 ? (t.src = "", _o(t, Fe), Io(t, "loading"), t.src = e) : On(t))
            }), wo(function() {
                Nn(Ro(t), function() {
                    _ = !0
                })
            }), en("autoHeight") && (t = Bn(de, Math.min(de + Dt - 1, oe - 1))), $t ? fn() : wo(function() {
                Nn(Ro(t), fn)
            })) : (A && Kn(), hn(), vn())
        }

        function fn() {
            var o;
            Ot && 1 < Y ? (o = Wt ? de : Y - 1, function t() {
                var e = W[o].getBoundingClientRect().left,
                    n = W[o - 1].getBoundingClientRect().right;
                Math.abs(e - n) <= 1 ? pn() : setTimeout(function() {
                    t()
                }, 16)
            }()) : pn()
        }

        function pn() {
            D && !Ot || (Hn(), Ot ? (re = _n(), Ee && (Se = yn()), he = ue(), Ke(Te || Se)) : go()), A && Kn(), hn(), vn()
        }

        function hn() {
            var t, e;
            if (jn(), P.insertAdjacentHTML("afterbegin", '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + En() + "</span>  of " + Y + "</div>"), V = P.querySelector(".tns-liveregion .current"), ze && (e = Kt ? "stop" : "start", bt ? jo(bt, {
                    "data-action": e
                }) : T.autoplayButtonOutput && (P.insertAdjacentHTML($e(T.autoplayPosition), '<button type="button" data-action="' + e + '">' + wt[0] + e + wt[1] + Qt[0] + "</button>"), bt = P.querySelector("[data-action]")), bt && _o(bt, {
                    click: ao
                }), Kt && (io(), Jt && _o(j, Be), Ut && _o(j, Ae))), He) {
                if (ot) jo(ot, {
                    "aria-label": "Carousel Pagination"
                }), Ao(nt = ot.children, function(t, e) {
                    jo(t, {
                        "data-nav": e,
                        tabindex: "-1",
                        "aria-label": dt + (e + 1),
                        "aria-controls": Ce
                    })
                });
                else {
                    for (var n = "", o = je ? "" : 'style="display:none"', i = 0; i < Y; i++) n += '<button type="button" data-nav="' + i + '" tabindex="-1" aria-controls="' + Ce + '" ' + o + ' aria-label="' + dt + (i + 1) + '"></button>';
                    P.insertAdjacentHTML($e(T.navPosition), n = '<div class="tns-nav" aria-label="Carousel Pagination">' + n + "</div>"), ot = P.querySelector(".tns-nav"), nt = ot.children
                }
                bo(), b && (t = b.substring(0, b.length - 18).toLowerCase(), e = "transition: all " + zt / 1e3 + "s", Lo(Zt, "[aria-controls^=" + Ce + "-item]", e = t ? "-" + t + "-" + e : e, Bo(Zt))), jo(nt[st], {
                    "aria-label": dt + (st + 1) + ft
                }), zo(nt[st], "tabindex"), Io(nt[st], ut), _o(ot, Le)
            }
            Pe && (J || Z && $ || (P.insertAdjacentHTML($e(T.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="' + Ce + '">' + Ft[0] + '</button><button type="button" data-controls="next" tabindex="-1" aria-controls="' + Ce + '">' + Ft[1] + "</button></div>"), J = P.querySelector(".tns-controls")), Z && $ || (Z = J.children[0], $ = J.children[1]), T.controlsContainer && jo(J, {
                "aria-label": "Carousel Navigation",
                tabindex: "0"
            }), (T.controlsContainer || T.prevButton && T.nextButton) && jo([Z, $], {
                "aria-controls": Ce,
                tabindex: "-1"
            }), (T.controlsContainer || T.prevButton && T.nextButton) && (jo(Z, {
                "data-controls": "prev"
            }), jo($, {
                "data-controls": "next"
            })), G = Rn(Z), Q = Rn($), Xn(), J ? _o(J, Oe) : (_o(Z, Oe), _o($, Oe))), xn()
        }

        function vn() {
            var t;
            A && c && ((t = {})[c] = Zn, _o(j, t)), _t && _o(j, Ie, T.preventScrollOnTouch), Vt && _o(j, De), jt && _o(M, Ne), "inner" === B ? xe.on("outerResized", function() {
                gn(), xe.emit("innerLoaded", xo())
            }) : (L || Lt || Ot || Yt || !D) && _o(m, {
                resize: mn
            }), Yt && ("outer" === B ? xe.on("innerLoaded", An) : Te || An()), kn(), Te ? Tn() : Se && Cn(), xe.on("indexChanged", In), "inner" === B && xe.emit("innerLoaded", xo()), "function" == typeof be && be(xo()), F = !0
        }

        function mn(t) {
            wo(function() {
                gn(so(t))
            })
        }

        function gn(t) {
            var e, n, o, i, r, a, l, s, c, u, d, f, p, h, v, m, g, y, b, x, w, C;
            F && ("outer" === B && xe.emit("outerResized", xo(t)), X = Ze(), h = I, n = !1, L && (bn(), (e = h !== I) && xe.emit("newBreakpointStart", xo(t))), o = Dt, i = Te, r = Se, a = jt, l = Xt, s = qt, c = _t, u = Vt, d = Kt, f = Jt, p = Ut, h = de, e && (v = Lt, b = Yt, x = Ft, y = It, m = Qt, E || (C = At, g = Bt)), jt = nn("arrowKeys"), Xt = nn("controls"), qt = nn("nav"), _t = nn("touch"), It = nn("center"), Vt = nn("mouseDrag"), Kt = nn("autoplay"), Jt = nn("autoplayHoverPause"), Ut = nn("autoplayResetOnVisibility"), e && (Te = nn("disable"), Lt = nn("fixedWidth"), zt = nn("speed"), Yt = nn("autoHeight"), Ft = nn("controlsText"), Qt = nn("autoplayText"), Gt = nn("autoplayTimeout"), E || (Bt = nn("edgePadding"), At = nn("gutter"))), Ke(Te), Nt = tn(), D && !Ot || Te || (Hn(), D || (go(), n = !0)), (Lt || Ot) && (re = _n(), he = ue()), (e || Lt) && (Dt = nn("items"), Pt = nn("slideBy"), (w = Dt !== o) && (Lt || Ot || (he = ue()), _e())), e && Te !== i && (Te ? Tn : function() {
                if (Me) {
                    if (Zt.disabled = !1, j.className += we, Kn(), Wt)
                        for (var t = ne; t--;) A && Yo(W[t]), Yo(W[oe - t - 1]);
                    if (!A)
                        for (var e = de, n = de + Y; e < n; e++) {
                            var o = W[e],
                                i = e < de + Dt ? S : O;
                            o.style.left = 100 * (e - de) / Dt + "%", Io(o, i)
                        }
                    wn(), Me = !1
                }
            })(), Ee && (e || Lt || Ot) && (Se = yn()) !== r && (Se ? (Gn(Vn(Qe(0))), Cn()) : (function() {
                if (ke) {
                    if (Bt && E && (H.style.margin = ""), ne)
                        for (var t = "tns-transparent", e = ne; e--;) A && Do(W[e], t), Do(W[oe - e - 1], t);
                    wn(), ke = !1
                }
            }(), n = !0)), Ke(Te || Se), Kt || (Jt = Ut = !1), jt !== a && (jt ? _o : Vo)(M, Ne), Xt !== l && (Xt ? J ? Yo(J) : (Z && Yo(Z), $ && Yo($)) : J ? Wo(J) : (Z && Wo(Z), $ && Wo($))), qt !== s && (qt ? (Yo(ot), bo()) : Wo(ot)), _t !== c && (_t ? _o(j, Ie, T.preventScrollOnTouch) : Vo(j, Ie)), Vt !== u && (Vt ? _o : Vo)(j, De), Kt !== d && (Kt ? (bt && Yo(bt), ht || mt || io()) : (bt && Wo(bt), ht && ro())), Jt !== f && (Jt ? _o : Vo)(j, Be), Ut !== p && (Ut ? _o : Vo)(M, Ae), e ? (Lt === v && It === y || (n = !0), Yt !== b && (Yt || (H.style.height = "")), Xt && Ft !== x && (Z.innerHTML = Ft[0], $.innerHTML = Ft[1]), bt && Qt !== m && (y = Kt ? 1 : 0, x = (b = bt.innerHTML).length - m[y].length, b.substring(x) === m[y] && (bt.innerHTML = b.substring(0, x) + Qt[y]))) : It && (Lt || Ot) && (n = !0), (w || Lt && !Ot) && (rt = yo(), bo()), (h = de !== h) ? (xe.emit("indexChanged", xo()), n = !0) : w ? h || In() : (Lt || Ot) && (kn(), jn(), Mn()), w && !A && function() {
                for (var t = de + Math.min(Y, Dt), e = oe; e--;) {
                    var n = W[e];
                    de <= e && e < t ? (Io(n, "tns-moving"), n.style.left = 100 * (e - de) / Dt + "%", Io(n, S), Do(n, O)) : n.style.left && (n.style.left = "", Io(n, O), Do(n, S)), Do(n, k)
                }
                setTimeout(function() {
                    Ao(W, function(t) {
                        Do(t, "tns-moving")
                    })
                }, 300)
            }(), Te || Se || (e && !E && (Bt === g && At === C || (H.style.cssText = on(Bt, At, Lt, zt, Yt)), D) && (A && (j.style.width = rn(Lt, At, Dt)), w = an(Lt, At, Dt) + ln(At), C = Bo(g = Zt) - 1, "deleteRule" in g ? g.deleteRule(C) : g.removeRule(C), Lo(Zt, "#" + Ce + " > .tns-item", w, Bo(Zt))), Yt && An(), n && (Kn(), fe = de)), e && xe.emit("newBreakpointEnd", xo(t)))
        }

        function yn() {
            if (!Lt && !Ot) return Y <= (It ? Dt - (Dt - 1) / 2 : Dt);
            var t = Lt ? (Lt + At) * Y : q[Y],
                e = Bt ? Nt + 2 * Bt : Nt + At;
            return It && (e -= Lt ? (Nt - Lt) / 2 : (Nt - (q[de + 1] - q[de] - At)) / 2), t <= e
        }

        function bn() {
            for (var t in I = 0, L)(t = parseInt(t)) <= X && (I = t)
        }

        function xn() {
            !Kt && bt && Wo(bt), !qt && ot && Wo(ot), Xt || (J ? Wo(J) : (Z && Wo(Z), $ && Wo($)))
        }

        function wn() {
            Kt && bt && Yo(bt), qt && ot && Yo(ot), Xt && (J ? Yo(J) : (Z && Yo(Z), $ && Yo($)))
        }

        function Cn() {
            if (!ke) {
                if (Bt && (H.style.margin = "0px"), ne)
                    for (var t = "tns-transparent", e = ne; e--;) A && Io(W[e], t), Io(W[oe - e - 1], t);
                xn(), ke = !0
            }
        }

        function Tn() {
            if (!Me) {
                if (Zt.disabled = !0, j.className = j.className.replace(we.substring(1), ""), zo(j, ["style"]), Wt)
                    for (var t = ne; t--;) A && Wo(W[t]), Wo(W[oe - t - 1]);
                if (D && A || zo(H, ["style"]), !A)
                    for (var e = de, n = de + Y; e < n; e++) {
                        var o = W[e];
                        zo(o, ["style"]), Do(o, S), Do(o, O)
                    }
                xn(), Me = !0
            }
        }

        function Mn() {
            var t = En();
            V.innerHTML !== t && (V.innerHTML = t)
        }

        function En() {
            var t = Sn(),
                e = t[0] + 1,
                t = t[1] + 1;
            return e === t ? e + "" : e + " to " + t
        }

        function Sn(t) {
            null == t && (t = Vn());
            var n, o, i, e, r = de;
            return It || Bt ? (Ot || Lt) && (n = -(parseFloat(t) + Bt), o = n + Nt + 2 * Bt) : Ot && (n = q[de], o = n + Nt), Ot ? q.forEach(function(t, e) {
                e < oe && ((It || Bt) && t <= n + .5 && (r = e), .5 <= o - t && (i = e))
            }) : (i = Lt ? (e = Lt + At, It || Bt ? (r = Math.floor(n / e), Math.ceil(o / e - 1)) : r + Math.ceil(Nt / e) - 1) : It || Bt ? (e = Dt - 1, i = It ? (r -= e / 2, de + e / 2) : de + e, Bt && (r -= e = Bt * Dt / Nt, i += e), r = Math.floor(r), Math.ceil(i)) : r + Dt - 1, r = Math.max(r, 0), i = Math.min(i, oe - 1)), [r, i]
        }

        function kn() {
            var t;
            $t && !Te && ((t = Sn()).push(te), Bn.apply(null, t).forEach(function(t) {
                var e;
                No(t, Xe) || ((e = {})[c] = function(t) {
                    t.stopPropagation()
                }, _o(t, e), _o(t, Fe), t.src = Ho(t, "data-src"), (e = Ho(t, "data-srcset")) && (t.srcset = e), Io(t, "loading"))
            }))
        }

        function On(t) {
            Io(t, "loaded"), Ln(t)
        }

        function Ln(t) {
            Io(t, Xe), Do(t, "loading"), Vo(t, Fe)
        }

        function Bn(t, e, n) {
            var o = [];
            for (n = n || "img"; t <= e;) Ao(W[t].querySelectorAll(n), function(t) {
                o.push(t)
            }), t++;
            return o
        }

        function An() {
            var t = Bn.apply(null, Sn());
            wo(function() {
                Nn(t, Pn)
            })
        }

        function Nn(n, t) {
            return _ ? t() : (n.forEach(function(t, e) {
                !$t && t.complete && Ln(t), No(t, Xe) && n.splice(e, 1)
            }), n.length ? void wo(function() {
                Nn(n, t)
            }) : t())
        }

        function In() {
            var t, e;
            kn(), jn(), Mn(), Xn(), qt && (st = 0 <= lt ? lt : Ue(), lt = -1, st !== ct) && (t = nt[ct], e = nt[st], jo(t, {
                tabindex: "-1",
                "aria-label": dt + (ct + 1)
            }), Do(t, ut), jo(e, {
                "aria-label": dt + (st + 1) + ft
            }), zo(e, "tabindex"), Io(e, ut), ct = st)
        }

        function Dn(t, e) {
            for (var n = [], o = t, i = Math.min(t + e, oe); o < i; o++) n.push(W[o].offsetHeight);
            return Math.max.apply(null, n)
        }

        function Pn() {
            var t = Yt ? Dn(de, Dt) : Dn(ne, Y),
                e = N || H;
            e.style.height !== t && (e.style.height = t + "px")
        }

        function Hn() {
            q = [0];
            var n = D ? "left" : "top",
                o = D ? "right" : "bottom",
                i = W[0].getBoundingClientRect()[n];
            Ao(W, function(t, e) {
                e && q.push(t.getBoundingClientRect()[n] - i), e === oe - 1 && q.push(t.getBoundingClientRect()[o] - i)
            })
        }

        function jn() {
            var t = Sn(),
                n = t[0],
                o = t[1];
            Ao(W, function(t, e) {
                n <= e && e <= o ? Po(t, "aria-hidden") && (zo(t, ["aria-hidden", "tabindex"]), Io(t, We)) : Po(t, "aria-hidden") || (jo(t, {
                    "aria-hidden": "true",
                    tabindex: "-1"
                }), Do(t, We))
            })
        }

        function zn(t) {
            return t.nodeName.toLowerCase()
        }

        function Rn(t) {
            return "button" === zn(t)
        }

        function Wn(t) {
            return "true" === t.getAttribute("aria-disabled")
        }

        function Yn(t, e, n) {
            t ? e.disabled = n : e.setAttribute("aria-disabled", n.toString())
        }

        function Xn() {
            var t, e, n, o;
            !Xt || Rt || Wt || (t = G ? Z.disabled : Wn(Z), e = Q ? $.disabled : Wn($), o = !Rt && he <= de, (n = de <= pe) && !t && Yn(G, Z, !0), !n && t && Yn(G, Z, !1), o && !e && Yn(Q, $, !0), !o && e && Yn(Q, $, !1))
        }

        function Fn(t, e) {
            b && (t.style[b] = e)
        }

        function qn(t) {
            return null == t && (t = de), Ot ? (Nt - (Bt ? At : 0) - (q[t + 1] - q[t] - At)) / 2 : Lt ? (Nt - Lt) / 2 : (Dt - 1) / 2
        }

        function _n() {
            var t = Nt + (Bt ? At : 0) - (Lt ? (Lt + At) * oe : q[oe]);
            return t = 0 < (t = It && !Wt ? Lt ? -(Lt + At) * (oe - 1) - qn() : qn(oe - 1) - q[oe - 1] : t) ? 0 : t
        }

        function Vn(t) {
            var e, n;
            return null == t && (t = de), D && !Ot ? Lt ? (e = -(Lt + At) * t, It && (e += qn())) : (n = r ? oe : Dt, It && (t -= qn()), e = 100 * -t / n) : (e = -q[t], It && Ot && (e += qn())), (e = ie ? Math.max(e, re) : e) + (!D || Ot || Lt ? "px" : "%")
        }

        function Kn(t) {
            Fn(j, "0s"), Gn(t)
        }

        function Gn(t) {
            null == t && (t = Vn()), j.style[le] = se + t + ce
        }

        function Qn(t, e, n, o) {
            var i = t + Dt;
            Wt || (i = Math.min(i, oe));
            for (var r = t; r < i; r++) {
                var a = W[r];
                o || (a.style.left = 100 * (r - de) / Dt + "%"), h && l && (a.style[l] = a.style[s] = h * (r - t) / 1e3 + "s"), Do(a, e), Io(a, n), o && ee.push(a)
            }
        }

        function Jn(t, e) {
            ae && _e(), de === fe && !e || (xe.emit("indexChanged", xo()), xe.emit("transitionStart", xo()), Yt && An(), ht && t && 0 <= ["click", "keydown"].indexOf(t.type) && ro(), ye = !0, Ve())
        }

        function Un(t) {
            return t.toLowerCase().replace(/-/g, "")
        }

        function Zn(t) {
            if (A || ye) {
                if (xe.emit("transitionEnd", xo(t)), !A && 0 < ee.length)
                    for (var e = 0; e < ee.length; e++) {
                        var n = ee[e];
                        n.style.left = "", s && l && (n.style[s] = "", n.style[l] = ""), Do(n, k), Io(n, O)
                    }(!t || !A && t.target.parentNode === j || t.target === j && Un(t.propertyName) === Un(le)) && (ae || (t = de, _e(), de !== t && (xe.emit("indexChanged", xo()), Kn())), "inner" === B && xe.emit("innerLoaded", xo()), ye = !1, fe = de)
            }
        }

        function $n(t, e) {
            if (!Se)
                if ("prev" === t) to(e, -1);
                else if ("next" === t) to(e, 1);
            else {
                if (ye) {
                    if (ve) return;
                    Zn()
                }
                var n = Je(),
                    o = 0;
                "first" === t ? o = -n : "last" === t ? o = A ? Y - Dt - n : Y - 1 - n : ("number" != typeof t && (t = parseInt(t)), isNaN(t) || (o = (t = !e ? Math.max(0, Math.min(Y - 1, t)) : t) - n)), !A && o && Math.abs(o) < Dt && (n = 0 < o ? 1 : -1, o += pe <= de + o - Y ? Y * n : 2 * Y * n * -1), de += o, A && Wt && (de < pe && (de += Y), he < de && (de -= Y)), Je(de) !== Je(fe) && Jn(e)
            }
        }

        function to(t, e) {
            if (ye) {
                if (ve) return;
                Zn()
            }
            var n;
            if (!e) {
                for (var o = co(t = so(t)); o !== J && [Z, $].indexOf(o) < 0;) o = o.parentNode;
                var i = [Z, $].indexOf(o);
                0 <= i && (n = !0, e = 0 === i ? -1 : 1)
            }
            if (Rt) {
                if (de === pe && -1 === e) return void $n("last", t);
                if (de === he && 1 === e) return void $n("first", t)
            }
            e && (de += Pt * e, Ot && (de = Math.floor(de)), Jn(n || t && "keydown" === t.type ? t : null))
        }

        function eo() {
            pt = setInterval(function() {
                to(null, yt)
            }, Gt), ht = !0
        }

        function no() {
            clearInterval(pt), ht = !1
        }

        function oo(t, e) {
            jo(bt, {
                "data-action": t
            }), bt.innerHTML = wt[0] + t + wt[1] + e
        }

        function io() {
            eo(), bt && oo("stop", Qt[1])
        }

        function ro() {
            no(), bt && oo("start", Qt[0])
        }

        function ao() {
            mt = ht ? (ro(), !0) : (io(), !1)
        }

        function lo(t) {
            t.focus()
        }

        function so(t) {
            return uo(t = t || m.event) ? t.changedTouches[0] : t
        }

        function co(t) {
            return t.target || m.event.srcElement
        }

        function uo(t) {
            return 0 <= t.type.indexOf("touch")
        }

        function fo(t) {
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        }

        function po() {
            return e = Et.y - Mt.y, n = Et.x - Mt.x, t = Math.atan2(e, n) * (180 / Math.PI), e = !1, 90 - (n = me) <= (t = Math.abs(90 - Math.abs(t))) ? e = "horizontal" : t <= n && (e = "vertical"), e === T.axis;
            var t, e, n
        }

        function ho(t) {
            if (ye) {
                if (ve) return;
                Zn()
            }
            Kt && ht && no(), St = !0, Tt && (Co(Tt), Tt = null);
            var e = so(t);
            xe.emit(uo(t) ? "touchStart" : "dragStart", xo(t)), !uo(t) && 0 <= ["img", "a"].indexOf(zn(co(t))) && fo(t), Et.x = Mt.x = e.clientX, Et.y = Mt.y = e.clientY, A && (Ct = parseFloat(j.style[le].replace(se, "")), Fn(j, "0s"))
        }

        function vo(t) {
            var e;
            St && (e = so(t), Et.x = e.clientX, Et.y = e.clientY, A ? Tt = Tt || wo(function() {
                ! function t(e) {
                    if (!ge) return St = !1;
                    if (Co(Tt), St && (Tt = wo(function() {
                            t(e)
                        })), ge = "?" === ge ? po() : ge) {
                        !qe && uo(e) && (qe = !0);
                        try {
                            e.type && xe.emit(uo(e) ? "touchMove" : "dragMove", xo(e))
                        } catch (t) {}
                        var n = Ct,
                            o = kt(Et, Mt);
                        !D || Lt || Ot ? (n += o, n += "px") : (n += r ? o * Dt * 100 / ((Nt + At) * oe) : 100 * o / (Nt + At), n += "%"), j.style[le] = se + n + ce
                    }
                }(t)
            }) : (ge = "?" === ge ? po() : ge) && (qe = !0), ("boolean" != typeof t.cancelable || t.cancelable) && qe && t.preventDefault())
        }

        function mo(o) {
            var t, i, n;
            St && (Tt && (Co(Tt), Tt = null), A && Fn(j, ""), St = !1, t = so(o), Et.x = t.clientX, Et.y = t.clientY, i = kt(Et, Mt), Math.abs(i) && (uo(o) || _o(n = co(o), {
                click: function t(e) {
                    fo(e), Vo(n, {
                        click: t
                    })
                }
            }), A ? Tt = wo(function() {
                if (D && !Ot) {
                    var t = -i * Dt / (Nt + At),
                        t = 0 < i ? Math.floor(t) : Math.ceil(t);
                    de += t
                } else {
                    var e = -(Ct + i);
                    if (e <= 0) de = pe;
                    else if (e >= q[oe - 1]) de = he;
                    else
                        for (var n = 0; n < oe && e >= q[n];) e > q[de = n] && i < 0 && (de += 1), n++
                }
                Jn(o, i), xe.emit(uo(o) ? "touchEnd" : "dragEnd", xo(o))
            }) : ge && to(o, 0 < i ? -1 : 1))), "auto" === T.preventScrollOnTouch && (qe = !1), me && (ge = "?"), Kt && !ht && eo()
        }

        function go() {
            (N || H).style.height = q[de + Dt] - q[de] + "px"
        }

        function yo() {
            var t = Lt ? (Lt + At) * Y / Nt : Y / Dt;
            return Math.min(Math.ceil(t), Y)
        }

        function bo() {
            if (qt && !je && rt !== at) {
                var t = at,
                    e = rt,
                    n = Yo;
                for (rt < at && (t = rt, e = at, n = Wo); t < e;) n(nt[t]), t++;
                at = rt
            }
        }

        function xo(t) {
            return {
                container: j,
                slideItems: W,
                navContainer: ot,
                navItems: nt,
                controlsContainer: J,
                hasControls: Pe,
                prevButton: Z,
                nextButton: $,
                items: Dt,
                slideBy: Pt,
                cloneCount: ne,
                slideCount: Y,
                slideCountNew: oe,
                index: de,
                indexCached: fe,
                displayIndex: Ge(),
                navCurrentIndex: st,
                navCurrentIndexCached: ct,
                pages: rt,
                pagesCached: at,
                sheet: Zt,
                isOn: F,
                event: t || {}
            }
        }
        d && console.warn("No slides found in", T.container)
    }
    return Go
}();
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.ityped = {})
}(this, function(t) {
    "use strict";
    t.init = function(l, t) {
        function n(r, a) {
            v === e && a.loop && (v = 0), setTimeout(function() {
                var t, e, n, o, i;
                t = r[v], e = a, n = 0, o = t.length, i = setInterval(function() {
                    if (e.placeholder ? l.placeholder += t[n] : l.textContent += t[n], ++n === o) return m(i, e)
                }, e.typeSpeed)
            }, a.startDelay)
        }
        var e, o, i, r, a, s, c, u, d, f, p, h, v = 0,
            m = function(t, i) {
                return clearInterval(t), (!i.disableBackTyping || v !== e - 1) && (i.loop || v !== e - 1) ? void setTimeout(function() {
                    var t, e, n, o;
                    e = (t = i).placeholder ? l.placeholder : l.textContent, n = e.length, o = setInterval(function() {
                        if (t.placeholder ? l.placeholder = l.placeholder.substr(0, --n) : l.textContent = e.substr(0, --n), 0 === n) return g(o, t)
                    }, t.backSpeed)
                }, i.backDelay) : i.onFinished()
            },
            g = function(t, e) {
                clearInterval(t), ++v, n(o, e)
            };
        return i = (p = t || {}).strings, r = p.typeSpeed, a = p.backSpeed, s = p.backDelay, c = p.startDelay, u = p.cursorChar, d = p.placeholder, f = p.showCursor, h = p.disableBackTyping, t = p.onFinished, p = p.loop, e = (o = f = (c = {
            strings: void 0 === i ? ["Put your strings here...", "and Enjoy!"] : i,
            typeSpeed: void 0 === r ? 100 : r,
            backSpeed: void 0 === a ? 50 : a,
            cursorChar: void 0 === u ? "|" : u,
            backDelay: void 0 === s ? 500 : s,
            placeholder: void 0 !== d && d,
            startDelay: void 0 === c ? 500 : c,
            showCursor: void 0 === f || f,
            loop: void 0 === p || p,
            disableBackTyping: void 0 !== h && h,
            onFinished: void 0 === t ? function() {} : t
        }).strings).length, "string" == typeof l && (l = document.querySelector(l)), c.showCursor && (p = l, h = c, (t = document.createElement("span")).classList.add("ityped-cursor"), t.textContent = "|", t.textContent = h.cursorChar, p.insertAdjacentElement("afterend", t)), void n(f, c)
    }, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}),
function() {
    "use strict";

    function t() {
        function l(t, e) {
            this.scrollLeft = t, this.scrollTop = e
        }

        function o(t) {
            if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0;
            if ("object" == typeof t && "smooth" === t.behavior) return !1;
            throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.")
        }

        function i(t, e) {
            return "Y" === e ? t.clientHeight + n < t.scrollHeight : "X" === e ? t.clientWidth + n < t.scrollWidth : void 0
        }

        function r(t, e) {
            e = p.getComputedStyle(t, null)["overflow" + e];
            return "auto" === e || "scroll" === e
        }

        function a(t) {
            for (var e, n; !1 === ((t = t.parentNode) === h.body) && !1 === (n = void 0, n = i(e = t, "Y") && r(e, "Y"), e = i(e, "X") && r(e, "X"), n || e););
            return t
        }

        function s(t) {
            var e, n = (f() - t.startTime) / u;
            e = n = 1 < n ? 1 : n, n = .5 * (1 - Math.cos(Math.PI * e)), e = t.startX + (t.x - t.startX) * n, n = t.startY + (t.y - t.startY) * n, t.method.call(t.scrollable, e, n), e === t.x && n === t.y || p.requestAnimationFrame(s.bind(p, t))
        }

        function c(t, e, n) {
            var o, i, r, a = f(),
                t = t === h.body ? (i = (o = p).scrollX || p.pageXOffset, r = p.scrollY || p.pageYOffset, d.scroll) : (i = (o = t).scrollLeft, r = t.scrollTop, l);
            s({
                scrollable: o,
                method: t,
                startTime: a,
                startX: i,
                startY: r,
                x: e,
                y: n
            })
        }
        var t, u, n, d, f, e;
        "scrollBehavior" in h.documentElement.style && !0 !== p.__forceSmoothScrollPolyfill__ || (t = p.HTMLElement || p.Element, u = 468, e = p.navigator.userAgent, n = new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(e) ? 1 : 0, d = {
            scroll: p.scroll || p.scrollTo,
            scrollBy: p.scrollBy,
            elementScroll: t.prototype.scroll || l,
            scrollIntoView: t.prototype.scrollIntoView
        }, f = p.performance && p.performance.now ? p.performance.now.bind(p.performance) : Date.now, p.scroll = p.scrollTo = function() {
            void 0 !== arguments[0] && (!0 !== o(arguments[0]) ? c.call(p, h.body, void 0 !== arguments[0].left ? ~~arguments[0].left : p.scrollX || p.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : p.scrollY || p.pageYOffset) : d.scroll.call(p, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : p.scrollX || p.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : p.scrollY || p.pageYOffset))
        }, p.scrollBy = function() {
            void 0 !== arguments[0] && (o(arguments[0]) ? d.scrollBy.call(p, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : c.call(p, h.body, ~~arguments[0].left + (p.scrollX || p.pageXOffset), ~~arguments[0].top + (p.scrollY || p.pageYOffset)))
        }, t.prototype.scroll = t.prototype.scrollTo = function() {
            if (void 0 !== arguments[0])
                if (!0 !== o(arguments[0])) {
                    var t = arguments[0].left,
                        e = arguments[0].top;
                    c.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e)
                } else {
                    if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value couldn't be converted");
                    d.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                }
        }, t.prototype.scrollBy = function() {
            void 0 !== arguments[0] && (!0 !== o(arguments[0]) ? this.scroll({
                left: ~~arguments[0].left + this.scrollLeft,
                top: ~~arguments[0].top + this.scrollTop,
                behavior: arguments[0].behavior
            }) : d.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
        }, t.prototype.scrollIntoView = function() {
            var t, e, n;
            !0 !== o(arguments[0]) ? (e = (t = a(this)).getBoundingClientRect(), n = this.getBoundingClientRect(), t !== h.body ? (c.call(this, t, t.scrollLeft + n.left - e.left, t.scrollTop + n.top - e.top), "fixed" !== p.getComputedStyle(t).position && p.scrollBy({
                left: e.left,
                top: e.top,
                behavior: "smooth"
            })) : p.scrollBy({
                left: n.left,
                top: n.top,
                behavior: "smooth"
            })) : d.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
        })
    }
    var p = window,
        h = document;
    "object" == typeof exports ? module.exports = {
        polyfill: t
    } : t()
}();