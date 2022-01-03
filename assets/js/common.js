document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    var e = document.querySelector("body"),
        t = document.querySelector(".nav__icon-menu"),
        o = document.querySelector(".nav__icon-close"),
        n = document.querySelector(".main-nav");
    t.addEventListener("click", () => {
        n.classList.add("is-open")
    }), o.addEventListener("click", () => {
        n.classList.remove("is-open")
    }), setTimeout(function() {
        e.classList.add("is-in")
    }, 150), setTimeout(function() {
        e.classList.add("stop-animations")
    }, 1500);
    let i;
    window.addEventListener("resize", () => {
        document.body.classList.add("resize-animation-stopper"), clearTimeout(i), i = setTimeout(() => {
            document.body.classList.remove("resize-animation-stopper")
        }, 300)
    }), reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off)");
    const s = document.querySelector(".page img, .post img"),
        r = document.querySelectorAll(".page a img, .post a img");
    if (r) {
        for (var c = 0; c < r.length; c++) r[c].parentNode.classList.add("image-link");
        for (c = 0; c < r.length; c++) r[c].classList.add("no-lightense")
    }
    s && Lightense(".page img:not(.no-lightense), .post img:not(.no-lightense)", {
        padding: 60,
        offset: 30
    }), document.querySelectorAll(".works-button").forEach(e => {
        e.addEventListener("click", function(e) {
            e.preventDefault(), document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            })
        })
    }), document.querySelector(".my-slider") && tns({
        container: ".my-slider",
        items: 3,
        slideBy: 1,
        gutter: 20,
        nav: !1,
        mouseDrag: !0,
        autoplay: !1,
        controlsContainer: "#customize-controls",
        responsive: {
            1024: {
                items: 3
            },
            768: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    }), document.querySelector(".c-subscribe") && (o = {
        strings: itype_text,
        typeSpeed: 100,
        backSpeed: 50,
        startDelay: 200,
        backDelay: 1500,
        loop: !0,
        showCursor: !0,
        cursorChar: "|",
        onFinished: function() {}
    }, ityped.init("#ityped", o));
    const a = document.querySelector(".top");
    window.addEventListener("scroll", function() {
        window.scrollY > window.innerHeight ? a.classList.add("is-active") : a.classList.remove("is-active")
    }), a.addEventListener("click", function() {
        0 != window.scrollY && window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    })
});