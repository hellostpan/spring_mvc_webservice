var CONFIG = {}, EDITDATA = {}, kx = {};
kx.cache = {
    wwidth: 0,
    wheight: 0,
    lwidth: 375,
    lmenuwidth: 66,
    lcontentwidth: 263,
    theight: 57,
    pwidth: 0,
    pheight: 0,
    editorWidth: 0,
    editorHeight: 0,
    editorBleed: 0,
    lineheight: 140,
    fontsize: 12,
    wall: {},
    zindex: {},
    zindexary: {},
    snap: 10,
    snapTolerance: 5,
    sel: [],
    group: [],
    multiselected: [],
    selected: {},
    through: [0, 0],
    pos: {},
    pagemax: {},
    actual: 0,
    scale: [1, 1, 1, 1, 1, 1],
    fullscale: [.6, .95],
    fixScale: [1, 1],
    fixSizeScale: [1, 1],
    fixed: 0,
    rotate: 0,
    aspectRatio: !1,
    fullScreen: !1,
    fullScreenNum: 0,
    color: "",
    zoom: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 200, 300, 400, 500],
    edittext: ["", ""],
    editdataSaveJson: "",
    svgcolors: {icolor: [], color: []},
    svgtexts: [],
    selInfo: {d: {sel: {}, obj: {}}, r: {sel: {}, obj: {}}}
}, kx.default = {
    color: ["000000", "191919", "333333", "4D4D4D", "666666", "808080", "999999", "B3B3B3", "CCCCCC", "E5E5E5", "FFFFFF", "910000", "E60012", "F08200", "FFF100", "009944", "006986", "0081B9", "00A0E9", "1D2088", "7D4698", "941C61", "F8C5AB", "F8C6C6", "FCE3CD", "EBEAC1", "E1EFD8", "C9E7E0", "D4ECF3", "D3EDFB", "D3DDF1", "DDD0E7", "E7D4E0", "DF7C57", "F29B96", "F8C399", "EBDF92", "B3D9AD", "85C0D2", "91CCE8", "AED0EE", "A2BCE2", "B1A7D1", "D0A6B9", "CB4829", "EA5350", "F6AE69", "EACD6A", "8BC180", "2EA7C2", "64B0D4", "95B7E1", "7484B5", "837FBB", "BA7A99", "9C1D22", "C7000A", "F39800", "DFB743", "5DAB59", "2286A1", "318FB4", "356BB3", "455896", "644498", "9D4C75", "4F0102", "A40001", "6E3B1D", "896D2B", "004F2C", "00585E", "006993", "014099", "0F0964", "552277", "6C2559"],
    family: {
        a1: "微软雅黑",
        a9: "方正兰亭超细黑简体",
        a25: "兰亭黑简体",
        a26: "兰亭粗黑简体",
        a2: "隶书",
        a3: "方正大黑简体",
        a4: "方正报宋简体",
        a5: "方正北魏楷书简体",
        a6: "方正行楷简体",
        a7: "方正卡通简体",
        a8: "方正楷体简体",
        a10: "方正隶变简体",
        a11: "方正隶书简体",
        a12: "方正启体简体",
        a13: "方正书宋简体",
        a14: "方正舒体简体",
        a15: "方正魏碑简体",
        a16: "方正细珊瑚简体",
        a17: "方正粗圆简体",
        a18: "方正准圆简体",
        a19: "方正细圆简体",
        a20: "方正小宋标简体",
        a21: "方正正中黑简体",
        a22: "方正正黑简体",
        a23: "方正粗倩简体",
        a24: "方正综艺简体",
        c1: "Arial",
        c2: "Bookman Old Style",
        c3: "Carolingia",
        c4: "Century",
        c5: "Century725 BT",
        c6: "CenturyExpd BT",
        c7: "Compacta Bd BT",
        c8: "CopprplGoth BT",
        c9: "Creampuff",
        c10: "DiskusDMed",
        c11: "Embassy BT",
        c12: "EngraversGothic BT"
    }
}, kx.backopt = {
    init: function () {
        var e = "template", t = $("#j-mgId").val(), a = $("#j-mode").val();
        t > 0 && (e = "user");
        var i = $("#j-tplIid").val();
        $.ajax({
            type: "GET",
            async: !1,
            dataType: "JSON",
            url: "/editor/getEditData/pages/all/type/" + e + "/mode/" + a + "/id/" + i + ".html",
            success: function (e) {
                CONFIG = e.editConfig, EDITDATA = e.editData, CONFIG.PAGES && (kx.editPage = CONFIG.PAGES[0])
            },
            error: function () {
            }
        })
    }, cropimg: function (e, t) {
        var a = e.attr("src"), i = t.x, c = t.y, o = t.width, n = t.height, d = e.attr("data-target"), s = $("#" + d), l = s.width();
        $.post("/editor/crop.html?path=" + a + "&x=" + i + "&y=" + c + "&width=" + o + "&height=" + n + "&twidth=" + l, function (e) {
            var t = kx.edata.get(kx.editPage, "epic", d), a = kx.edata.edit(kx.editPage, "epic", d, {url: e.filePath});
            kx.epic.setCrop(kx.editPage, t[1], a[1], d)
        }, "JSON")
    }, getAjaxdata: function (e, t) {
        var a = {};
        if ("epic" == t)$.ajax({
            type: "GET",
            async: !1,
            dataType: "JSON",
            url: "/editor/getMaterialData/id/" + e + ".html",
            success: function (e) {
                a = e ? {
                    url: e.url,
                    width: e.width,
                    height: e.height,
                    top: kx.comm.radom(100),
                    left: kx.comm.radom(200),
                    rotate: 0,
                    opacity: 100
                } : {}
            },
            error: function () {
                a = {}
            }
        }); else if ("ebg" == t)$.ajax({
            type: "GET",
            async: !1,
            dataType: "JSON",
            url: "/editor/getMaterialData/id/" + e + ".html",
            success: function (e) {
                a = e ? {url: e.url} : {}
            },
            error: function () {
                a = {}
            }
        }); else if ("eel" == t) {
            var i, c, o, n = function (e) {
                var t = document.createElement("div");
                return t.appendChild(e), t.innerHTML
            };
            $.ajax({
                type: "GET", async: !1, url: "/editor/getMaterialData/id/" + e + ".html", success: function (e) {
                    if (e) {
                        var t = $(e).find("svg");
                        t.attr("preserveAspectRatio", "none"), i = n(t[0]).replace('id="图层_1"', "").replace(/\n/gim, " "), c = parseInt(t.attr("width")) || "100", o = parseInt(t.attr("height")) || "100", _viewBox = t.attr("viewbox"), _viewBox = _viewBox ? _viewBox.split(" ") : [0, 0, c, o], a = {
                            svg: "001",
                            svgdata: i,
                            icolors: [],
                            colors: [],
                            svgwh: [_viewBox[2], _viewBox[3]],
                            multi: 0,
                            width: c,
                            height: o,
                            top: kx.comm.radom(100),
                            left: kx.comm.radom(200),
                            rotate: 0,
                            opacity: 100
                        }
                    } else a = {}
                }, error: function () {
                    a = {}
                }
            })
        }
        return a
    }, getMaterial: function (e) {
        e = e || "请输入关键词";
        var t = $("#j-esearchWall"), a = function (a, c) {
            a = a || 1;
            var o = "", n = 84;
            $("#j-esearchBoxContent").find(".key").html(e);
            for (var d = 0; d < c.length; d++)o += '<li class="item j-iteminsert" data-itype="' + c[d].mimetype + '" data-id="' + c[d].id + '" data-iid="' + c[d].iid + '" style="width:' + n + "px;height:" + Math.round(n * c[d].oheight / c[d].owidth) + 'px;"><img src="' + c[d].src + '" data-owidth="' + c[d].owidth + '" data-oheight="' + c[d].oheight + '" style="width:' + n + "px;height:" + Math.round(n * c[d].oheight / c[d].owidth) + 'px;"><span class="eu-copy" data-row="' + a + '"></span></li>';
            c.length > 0 ? kx.cache.wall.esearch ? kx.cache.wall.esearch.appendBlock(o) : (t.append(o), kx.fun.comm.wall("esearch", a, $(o))) : (i = -2, t.next(".loading").html("没有数据了").addClass("loadAnimate"))
        }, i = parseInt(t.attr("data-pageid")), c = t.attr("data-ajax"), o = t.attr("data-keyword");
        (e != o || 0 == i) && (i = 1, kx.cache.wall.esearch && (t.html(""), kx.cache.wall.esearch.refresh(), t.next(".loading").html('<div class="load1"></div><div class="load2"></div><div class="load3"></div><div class="load4"></div><div class="load5"></div>'))), "false" == c && i > 0 && (t.attr("data-ajax", "true"), t.next(".loading").addClass("loadAnimate"), $.post("/editor/getMaterial/query/k-" + e + "-p-" + i + ".html", {}, function (c) {
            t.next(".loading").removeClass("loadAnimate"), a(3, c), t.attr("data-pageid", i + 1).attr("data-ajax", "false").attr("data-keyword", e)
        }, "JSON"))
    }, getArtFontAjax: function () {
        var e = $("#j-etextWall"), t = function (t, i) {
            t = t || 1;
            for (var c = "", o = 84, n = 0; n < i.length; n++)c += '<li class="item j-iteminsert" data-itype="' + i[n].mimetype + '" data-id="' + i[n].id + '" data-iid="' + i[n].iid + '" data-w="' + o + '" style="width:' + o + "px;height:" + Math.round(o * i[n].oheight / i[n].owidth) + 'px;"><img src="' + i[n].src + '" data-owidth="' + i[n].owidth + '" data-oheight="' + i[n].oheight + '" style="width:' + o + "px;height:" + Math.round(o * i[n].oheight / i[n].owidth) + 'px;"><span class="eu-copy" data-row="3"></span></li>';
            i.length > 0 ? kx.cache.wall.etext ? kx.cache.wall.etext.appendBlock(c) : (e.append(c), kx.fun.comm.wall("etext", t, $(c))) : (a = -2, e.next(".loading").html("没有数据了").addClass("loadAnimate"))
        }, a = parseInt(e.attr("data-pageid")), i = e.attr("data-ajax");
        "false" == i && a > 0 && (e.attr("data-ajax", "true"), e.next(".loading").addClass("loadAnimate"), $.post("/editor/getMaterial/query/t-99-p-" + a + ".html", {}, function (i) {
            e.next(".loading").removeClass("loadAnimate"), t(3, i), e.attr("data-pageid", a + 1).attr("data-ajax", "false")
        }, "JSON"))
    }, getBgAjax: function () {
        var e = $("#j-ebgWall"), t = function (t, i) {
            t = t || 1;
            for (var c = "", o = 84, n = 0; n < i.length; n++)c += '<li class="item j-iteminsert" data-itype="ebg" data-id="' + i[n].id + '" data-iid="' + i[n].iid + '" data-w="' + o + '" style="width:' + o + "px;height:" + Math.round(o * i[n].oheight / i[n].owidth) + 'px;"><img src="' + i[n].src + '" data-owidth="' + i[n].owidth + '" data-oheight="' + i[n].oheight + '" style="width:' + o + "px;height:" + Math.round(o * i[n].oheight / i[n].owidth) + 'px;"></li>';
            i.length > 0 ? kx.cache.wall.ebg ? kx.cache.wall.ebg.appendBlock(c) : (e.append(c), kx.fun.comm.wall("ebg", t, $(c))) : (a = -2, e.next(".loading").html("没有数据了").addClass("loadAnimate"))
        }, a = parseInt(e.attr("data-pageid")), i = e.attr("data-ajax");
        "false" == i && a > 0 && (e.attr("data-ajax", "true"), e.next(".loading").addClass("loadAnimate"), $.get("/editor/getMaterial/query/t-98-p-" + a + ".html", {}, function (i) {
            e.next(".loading").removeClass("loadAnimate"), t(3, i), e.attr("data-pageid", a + 1).attr("data-ajax", "false")
        }, "JSON"))
    }, getTplAjax: function () {
        var e = $("#j-etplWall"), t = function (t, i) {
            t = t || 1;
            var c = "", o = 0;
            o = 2 == t ? 129 : 263;
            for (var n = 0; n < i.length; n++)c += i[n].multi.length > 1 ? '<li class="item j-multiitem" data-itype="' + i[n].mimetype + '" data-id="' + i[n].id + '" data-iid="' + i[n].iid + '" style="width:' + o + "px;height:" + Math.round(o * i[n].oheight / i[n].owidth) + 'px;" data-multi="' + i[n].multi.join(",") + '"><span class="multi"></span><img src="' + i[n].src + '" data-owidth="' + i[n].owidth + '" data-oheight="' + i[n].oheight + '" style="width:' + o + "px;height:" + Math.round(o * i[n].oheight / i[n].owidth) + 'px;"><span class="eu-copy" data-row="' + t + '"></span></li>' : '<li class="item j-tplinsert" data-itype="' + i[n].mimetype + '" data-id="' + i[n].id + '" data-iid="' + i[n].iid + '" style="width:' + o + "px;height:" + Math.round(o * i[n].oheight / i[n].owidth) + 'px;"><img src="' + i[n].src + '" data-owidth="' + i[n].owidth + '" data-oheight="' + i[n].oheight + '" style="width:' + o + "px;height:" + Math.round(o * i[n].oheight / i[n].owidth) + 'px;"><span class="eu-copy" data-row="' + t + '"></span></li>';
            i.length > 0 ? kx.cache.wall.etpl ? kx.cache.wall.etpl.appendBlock(c) : (e.append(c), kx.fun.comm.wall("etpl", t, $(c))) : (a = -2, e.next(".loading").html("没有数据了").addClass("loadAnimate"))
        }, a = parseInt(e.attr("data-pageid")), i = e.attr("data-ajax");
        if ("false" == i && a > 0) {
            e.attr("data-ajax", "true"), e.next(".loading").addClass("loadAnimate");
            var c = $("#j-product").val(), o = $("#j-type").val();
            $.post("/editor/getTemplate/query/pr-" + c + "-t-" + o + "-p-" + a + ".html", {}, function (i) {
                e.next(".loading").removeClass("loadAnimate"), 2 == o ? t(2, i) : t(1, i), e.attr("data-pageid", a + 1).attr("data-ajax", "false")
            }, "JSON")
        }
    }, getTplData: function (e) {
        var t = {};
        return $.ajax({
            type: "GET",
            async: !1,
            dataType: "JSON",
            url: "/editor/getEditData/id/" + e + ".html",
            success: function (e) {
                t = e
            },
            error: function () {
                alert("加载模板失败，请重新加载")
            }
        }), t
    }, getElAjax: function (e) {
        var t = $("#j-eelWall"), a = function (e, a) {
            e = e || 1;
            for (var c = "", o = 84, n = 0; n < a.length; n++)c += '<li class="item j-iteminsert" data-itype="' + a[n].mimetype + '" data-id="' + a[n].id + '" data-iid="' + a[n].iid + '" style="width:' + o + "px;height:" + Math.round(o * a[n].oheight / a[n].owidth) + 'px;"><img src="' + a[n].src + '" data-owidth="' + a[n].owidth + '" data-oheight="' + a[n].oheight + '" style="width:' + o + "px;height:" + Math.round(o * a[n].oheight / a[n].owidth) + 'px;"><span class="eu-copy" data-row="' + e + '"></span></li>';
            a.length > 0 ? kx.cache.wall.eel ? kx.cache.wall.eel.appendBlock(c) : (t.append(c), kx.fun.comm.wall("eel", e, $(c))) : (i = -2, t.next(".loading").html("没有数据了").addClass("loadAnimate"))
        }, i = parseInt(t.attr("data-pageid")), c = t.attr("data-ajax"), o = t.attr("data-eltype");
        if ((o != e || 0 == i) && (i = 1, kx.cache.wall.eel && (t.html(""), kx.cache.wall.eel.refresh(), t.next(".loading").html('<div class="load1"></div><div class="load2"></div><div class="load3"></div><div class="load4"></div><div class="load5"></div>'))), "false" == c && i > 0) {
            t.attr("data-ajax", "true"), t.next(".loading").addClass("loadAnimate"), $("#j-elSortList").css({height: "auto"});
            var n = parseInt(e) + 1;
            $.post("/editor/getMaterial/query/t-" + n + "-p-" + i + ".html", {}, function (c) {
                t.next(".loading").removeClass("loadAnimate"), a(3, c), t.attr("data-pageid", i + 1).attr("data-ajax", "false").attr("data-eltype", e)
            }, "JSON")
        }
    }, getPicAjax: function (e) {
        var t = $("#j-epicWall"), a = function (e, a) {
            for (var c = "", o = 84, n = 0; n < a.length; n++)c += '<li class="item j-iteminsert" data-itype="' + a[n].mimetype + '" data-id="' + a[n].id + '" data-iid="' + a[n].iid + '" style="width:' + o + "px;height:" + Math.round(o * a[n].oheight / a[n].owidth) + 'px;"><img src="' + a[n].src + '" data-owidth="' + a[n].owidth + '" data-oheight="' + a[n].oheight + '" style="width:' + o + "px;height:" + Math.round(o * a[n].oheight / a[n].owidth) + 'px;">' + d + "</li>";
            a.length > 0 ? kx.cache.wall.epic ? kx.cache.wall.epic.appendBlock(c) : (t.append(c), kx.fun.comm.wall("epic", e, $(c))) : (i = -2, t.next(".loading").html("没有数据了").addClass("loadAnimate"))
        }, i = parseInt(t.attr("data-pageid")), c = t.attr("data-ajax"), o = t.attr("data-pictype");
        if ((o != e || 0 == i) && (i = 1, kx.cache.wall.epic && (t.html(""), kx.cache.wall.epic.refresh(), t.next(".loading").html('<div class="load1"></div><div class="load2"></div><div class="load3"></div><div class="load4"></div><div class="load5"></div>'))), "false" == c && i > 0) {
            if (t.attr("data-ajax", "true"), t.next(".loading").addClass("loadAnimate"), "sort2" == e)var n = 13, d = ""; else var n = 8, d = '<span class="del"><i></i></span>';
            $.post("/editor/getUserMaterial/query/s-" + n + "-p-" + i + ".html", {}, function (c) {
                t.next(".loading").removeClass("loadAnimate"), a(3, c), t.attr("data-pageid", i + 1).attr("data-ajax", "false").attr("data-pictype", e)
            }, "JSON")
        }
    }, setEditName: function () {
        var e = $("#j-ename").find("span").text();
        CONFIG.NAME = e, $("#j-ename").find("span").html(e);
        var t = $("#j-tplId").val(), a = $("#j-mgId").val(), i = $("#j-mode").val(), c = {
            tplId: t,
            mgId: a,
            mode: i,
            title: e
        };
        (t || a) && $.post("/editor/saveTitle.html", c, function () {
        }, "JSON")
    }, sendmail: function (e) {
        var t = $("#j-mgId").val(), a = "waiting" + (new Date).getTime(), i = layer.open({
            type: 1,
            title: "",
            maxWidth: 340,
            closeBtn: 0,
            skin: "m-waitLayer",
            content: '<div class="waitDialog" id="' + a + '"><a href="javascript:;" class="close"></a><div class="waitBox"><div class="load1"></div><div class="load2"></div><div class="load3"></div><div class="load4"></div><div class="load5"></div></div><div class="text">邮件发送中，请稍后 ...</div></div>',
            success: function (e) {
                setTimeout(function () {
                    e.find(".close").show().on("click", function () {
                        layer.close(i)
                    })
                }, 2e4)
            }
        });
        $.ajax({
            type: "POST",
            dataType: "json",
            async: !0,
            url: "/editor/sendShareEmail.html",
            data: {email: e, mgId: t},
            success: function (e) {
                "y" == e.status ? (layer.close(i), $.alert(e.info)) : "noLogin" == e.status ? (bindFx($("#modal-layer"), "fade-in", !0), bindFx($("#login-box"), "fade-in-up", !0), layer.close(i)) : (layer.close(i), $.alert(e.info))
            }
        })
    }, preview: function (e) {
        var t = ($("#j-product").val(), $("#j-tplId").val()), a = $("#j-mgId").val(), i = $("#j-mode").val(), c = JSON.stringify(CONFIG), o = JSON.stringify(EDITDATA);
        if ("createThumbnail" != e && "preview" != e)var n = "waiting" + (new Date).getTime(), d = layer.open({
            type: 1,
            title: "",
            maxWidth: 340,
            closeBtn: 0,
            skin: "m-waitLayer",
            content: '<div class="waitDialog" id="' + n + '"><a href="javascript:;" class="close"></a><div class="waitBox"><div class="load1"></div><div class="load2"></div><div class="load3"></div><div class="load4"></div><div class="load5"></div></div><div class="text">数据处理中，请稍后 ...</div></div>',
            success: function (e) {
                setTimeout(function () {
                    e.find(".close").show().on("click", function () {
                        layer.close(d)
                    })
                }, 2e4)
            }
        });
        var s = null, l = !1;

        return "preview" == e && (l = !1), $.ajax({
            type: "POST",
            dataType: "json",
            async: l,
            url: "/editor/previewTbz.html",
            data: {action: e, tplId: t, mgId: a, mode: i, configJson: c, editDataJson: o},
            success: function (t) {
                if ("y" == t.status)if ("preview" == e) {
                    var a = [];
                    $.each(t, function (e, t) {
                        "info" != e && "status" != e && "zipUrl" != e && a.push("/uploads" + t.filePath)
                    }), s = a
                } else("downloadPng" == e || "downloadJpg" == e || "downloadPdf" == e) && (layer.close(d), s = t.zipUrl, $("#j-downloadFrame").attr("src", s)); else"noLogin" == t.status ? (bindFx($("#modal-layer"), "fade-in", !0), bindFx($("#login-box"), "fade-in-up", !0), layer.close(d)) : (layer.close(d), $.alert(t.info))
            }
        }), s
    }, save: function (e, t) {
        var a = ($("#j-product").val(), $("#j-tplId").val()), i = $("#j-mgId").val(), c = $("#j-mode").val(), o = $("#j-mgUid").val(), n = JSON.stringify(CONFIG), d = JSON.stringify(EDITDATA), s = "waiting" + (new Date).getTime(), l = layer.open({
            type: 1,
            title: "",
            maxWidth: 340,
            closeBtn: 0,
            skin: "m-waitLayer",
            content: '<div class="waitDialog" id="' + s + '"><a href="javascript:;" class="close"></a><div class="waitBox"><div class="load1"></div><div class="load2"></div><div class="load3"></div><div class="load4"></div><div class="load5"></div></div><div class="text">数据处理中，请稍后 ...</div></div>',
            success: function (e) {
                setTimeout(function () {
                    e.find(".close").show().on("click", function () {
                        layer.close(l)
                    })
                }, 2e4)
            }
        }), r = {};
        if ("saveAs" == e) {
            var h = $("#j-saveAsFolder").val(), p = $("#j-saveAsName").val();
            $("#j-ename").find("span").html(p), r = {
                action: e,
                tplId: a,
                memberGoodsId: i,
                mode: c,
                mgUid: o,
                configJson: n,
                editDataJson: d,
                saveAsFolder: h,
                saveAsName: p
            }
        } else r = "buy" == e ? {
            action: e,
            tplId: a,
            memberGoodsId: i,
            mode: c,
            mgUid: o,
            configJson: n,
            editDataJson: d,
            selProduct: t
        } : {action: e, tplId: a, memberGoodsId: i, mode: c, mgUid: o, configJson: n, editDataJson: d};
        $.post("/diy.html", r, function (t) {
            if ("y" == t.status)if (kx.cache.editdataSaveJson = JSON.stringify(EDITDATA), "save" == e || "saveAs" == e) {
                if ("saveAs" == e ? 0 == c ? ($("#j-mgId").val(t.resId), window.location.href = "/diy/" + a + "/" + t.resId + ".html") : 1 == c && ($("#j-tplId").val(t.resId), window.location.href = "/diy/" + t.resId + "/0/mode/1.html") : i || 0 != c ? a != t.resId && 1 == c && ($("#j-tplId").val(t.resId), window.history.replaceState({}, "", "/diy/" + t.resId + "/0/mode/1.html")) : ($("#j-mgId").val(t.resId), window.history.replaceState({}, "", "/diy/" + a + "/" + t.resId + ".html")), "undefined" != typeof t.shareUrl) {
                    var o = t.shareUrl, n = "这里有海量免费的素材和模板，只需用鼠标拖拉拽，5分钟轻松搞定名片、宣传单、海报、PPT、朋友圈等图片设计，从此设计不再求人，图帮主——最便捷的在线设计软件！";
                    $("#j-eshareBox").find(".j-commonShare").attr("data", n).attr("url", o).attr("desc", n), $("#j-eshareBox").find(".j-shareUrl").text(o), $("#j-eshareBox").find(".j-copyShareUrl").attr("data", o)
                }
                kx.backopt.preview("createThumbnail")
            } else $("#j-mgId").val(t.resId), window.history.replaceState({}, "", "/diy/" + a + "/" + t.resId + ".html"), kx.backopt.preview("createThumbnail"), window.location.href = t.jumpUrl; else"noLogin" == t.status ? (bindFx($("#modal-layer"), "fade-in", !0), bindFx($("#login-box"), "fade-in-up", !0)) : $.alert(t.info);
            layer.close(l)
        }, "JSON")
    }
}, kx.comm = {
    isIE: function () {
        var e = navigator.userAgent.toLowerCase();
        return /msie/.test(e) && !/opera/.test(e)
    }, loadimg: function (e, t) {
        var a = new Image;
        a.src = e, kx.comm.isIE() ? a.onreadystatechange = function () {
            ("complete" == a.readyState || "loaded" == a.readyState) && "function" == typeof t && t(a)
        } : a.onload = function () {
            1 == a.complete && "function" == typeof t && t(a)
        }
    }, radom: function (e) {
        return Math.round(Math.random() * e + 1)
    }, radomid: function () {
        return (new Date).getTime() + Math.random().toString().substring(15)
    }, chkemail: function (e) {
        return "undefined" == typeof e ? !1 : -1 != e.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) ? !0 : !1
    }, findary: function (e, t) {
        for (var a = 0; a < e.length; a++)if (e[a] == t)return a;
        return -1
    }, insertposary: function (e, t, a) {
        return e.splice(t + 1, 0, a), e.concat()
    }, maxary: function (e, t, a) {
        return e.length > t ? (e.shift(), e.push(a)) : e.push(a), e.concat()
    }, removeary: function (e, t) {
        var a = kx.comm.findary(e, t);
        return a > -1 && e.splice(a, 1), e.slice()
    }, changeary: function (e, t, a) {
        for (var i = [], c = 0; c < e.length; c++)i[c] = e[c] == t ? a : e[c] == a ? t : e[c];
        return i
    }, setary: function (e, t, a) {
        for (var i = [], c = 0; c < e.length; c++)i[c] = e[c] == t ? a : e[c];
        return i
    }, unique: function (e) {
        for (var t = [], a = {}, i = 0; i < e.length; i++)a[e[i]] || (t.push(e[i]), a[e[i]] = 1);
        return t
    }, processStr: function (e, t) {
        t = t.replace(/\n+$|<br\s*\/?>+$/g, "");
        var a = "<br>";
        if ("e" == e) {
            var i = /<div[^>]*?>/gi;
            return t = -1 != t.search(i) ? t.replace(i, "").replace(/<\/div>/gi, "\n").replace(/\t/g, "    ").replace(/<br\s*\/?>/gi, "\n") : t.replace(/\t/g, "    ").replace(/<br\s*\/?>/gi, "\n"), t = t.replace(/<[^>]+>/g, ""), t = t.replace(/\n/g, a)
        }
        return "d" == e ? t.replace(/@@##@&&@@/gi, "<br>") : t
    }, getObjPos: function (e, t) {
        var a = {o: {}, n: {}};
        return "undefined" != typeof t && e.css({transform: "rotateZ(0deg)"}), a.o.ctop = parseInt(e.css("top")) || 0, a.o.cleft = parseInt(e.css("left")) || 0, a.o.top = e.offset().top, a.o.left = e.offset().left, a.o.width = e.width(), a.o.height = e.height(), a.o.right = a.o.left + a.o.width, a.o.bottom = a.o.top + a.o.height, a.o.rotate = 0, "undefined" != typeof t && "null" != typeof t && (e.css({transform: "rotateZ(" + t + "deg)"}), a.n.ctop = parseInt(e.css("top")) || 0, a.n.cleft = parseInt(e.css("left")) || 0, a.n.top = e.offset().top, a.n.left = e.offset().left, a.n.width = a.o.width + 2 * (a.o.left - a.n.left), a.n.height = a.o.height + 2 * (a.o.top - a.n.top), a.n.right = a.n.left + a.n.width, a.n.bottom = a.n.top + a.n.height, a.n.rotate = t), a
    }, getResizeHandle: function () {
        return $("body").css("cursor").replace("-resize", "")
    }, getDPI: function () {
        var e = new Array;
        return e[0] = CONFIG.RESOLUTION, e[1] = CONFIG.RESOLUTION, e
    }, getUserDPI: function () {
        var e = new Array;
        if (void 0 != window.screen.deviceXDPI)e[0] = window.screen.deviceXDPI, e[1] = window.screen.deviceYDPI; else {
            var t = document.createElement("div");
            t.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden", document.body.appendChild(t), e[0] = parseInt(t.offsetWidth), e[1] = parseInt(t.offsetHeight), t.parentNode.removeChild(t)
        }
        return e[0] = CONFIG.RESOLUTION, e[1] = CONFIG.RESOLUTION, e
    }, px2mm: function (e) {
        var t = kx.comm.getDPI();
        return {x: 25.4 * e / t[0], y: 25.4 * e / t[1]}
    }, mm2px: function (e) {
        var t = kx.comm.getDPI();
        return {x: e * t[0] / 25.4, y: e * t[1] / 25.4}
    }, chkcut: function (e, t, a) {
        a = a || 0;
        var i = kx.comm.getObjPos(e, a).n, c = kx.comm.getObjPos(t, a).n, o = [Math.max(i.left, c.left), Math.max(i.top, c.top)], n = [Math.min(i.right, c.right), Math.min(i.bottom, c.bottom)];
        return o[0] < n[0] && o[1] < n[1] ? !0 : !1
    }, getSelection: function () {
        var e = window.getSelection().toString();
        return e.length
    }, selection: function (e) {
        var t = document.createRange();
        t.selectNodeContents(e);
        var a = window.getSelection();
        a.removeAllRanges(), a.addRange(t)
    }, rgb2hex: function (e) {
        function t(e) {
            return ("0" + parseInt(e).toString(16)).slice(-2)
        }

        if (e = e.replace(/\s/, "").toLowerCase(), e.indexOf("rgb") < 0)return e.toLowerCase();
        var a = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return e = t(a[1]) + t(a[2]) + t(a[3]), e.toLowerCase()
    }, getSvgTransform: function (e, t) {
        e = e || "", e = e.replace(/NaN/g, "0");
        var a = t + "\\([\\d\\,\\e\\-\\.\\s]+", i = e.match(a);
        if (null == i)return [0, 0];
        if (i = i.toString().replace(/\,+|\s+/g, "|"), i = i.toString().replace(/\|+/g, "|"), null != i) {
            i = i.replace(t + "(", "").split("|");
            for (var c = i.length, o = 0; c > o; o++)(isNaN(i[o]) || "NaN" == i[o]) && (i[o] = 0);
            return i
        }
        return [0, 0]
    }, setSvgTransform: function (str, key, value) {
        for (var reg = eval("/" + key + "\\([\\d\\,\\e\\-\\.\\s]+\\)/"), new_value = key + "(" + value[0], length = value.length, i = 1; length > i; i++)new_value = new_value + "," + value[i];
        return str = str || "", str = str.replace(/NaN/g, "0"), str = str.replace(reg, ""), str = str + new_value + ")"
    }, numinput: function (e, t) {
        return e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || 46 == e.keyCode || 8 == e.keyCode || 37 == e.keyCode || 39 == e.keyCode || 9 == e.keyCode ? (t && t(), e.stopPropagation(), !0) : (e.stopPropagation(), !1)
    }
}, kx.edata = {
    add: function (e, t, a, i) {
        kx.cache.fullScreen ? (e = e.replace("preview_", ""), a = a.replace("preview_", "")) : (e = e.replace("left_", ""), a = a.replace("left_", ""));
        var c = $.extend(!0, {}, i);
        EDITDATA[e][t].push([a, c]), c.zindex && (kx.cache.zindex[e][0] = Math.max(kx.cache.zindex[e][0], parseInt(c.zindex)), kx.cache.zindexary[e].push([a, c.zindex]))
    }, del: function (e, t, a) {
        kx.cache.fullScreen ? (e = e.replace("preview_", ""), a = a.replace("preview_", "")) : (e = e.replace("left_", ""), a = a.replace("left_", ""));
        for (var i = 0; i < EDITDATA[e][t].length; i++)EDITDATA[e][t][i][0] == a && EDITDATA[e][t].splice(i, 1)
    }, edit: function (e, t, a, i) {
        if (kx.cache.fullScreen ? (e = e.replace("preview_", ""), a = a.replace("preview_", "")) : (e = e.replace("left_", ""), a = a.replace("left_", "")), i.zindex)for (var c = 0; c < kx.cache.zindexary[e].length; c++)kx.cache.zindex[e][0] = Math.max(kx.cache.zindex[e][0], parseInt(i.zindex)), kx.cache.zindexary[e][c][0] == a && (kx.cache.zindexary[e][c][1] = parseInt(i.zindex));
        for (var o = 0; o < EDITDATA[e][t].length; o++)if (EDITDATA[e][t][o][0] == a) {
            for (var n in i)EDITDATA[e][t][o][1][n] = i[n];
            return $.extend(!0, {}, EDITDATA[e][t][o])
        }
    }, copy: function (e, t, a) {
        kx.cache.fullScreen ? (e = e.replace("preview_", ""), a = a.replace("preview_", "")) : (e = e.replace("left_", ""), a = a.replace("left_", ""));
        var i = this.get(e, t, a), c = $.extend(!0, {}, i[1]), o = t + "_" + kx.comm.radomid();
        return c.zindex && (c.zindex = parseInt(c.zindex)), this.add(e, t, o, c), [o, c]
    }, get: function (e, t, a) {
        kx.cache.fullScreen ? (e = e.replace("preview_", ""), a = a.replace("preview_", "")) : (e = e.replace("left_", ""), a = a.replace("left_", ""));
        for (var i = 0; i < EDITDATA[e][t].length; i++)if (EDITDATA[e][t][i][0] == a)return $.extend(!0, {}, EDITDATA[e][t][i]);
        return !1
    }
}, kx.fun = {
    comm: {
        loadFont: function (e) {
            var t = '<div class="loadfont" style="position:absolute;top:-10000px;left:-10000px;visible:hidden;">';
            if (1 == e)for (var a in kx.default.family)t += '<div style="font-size:12px;font-family:' + a + '">' + a + "</div>"; else {
                t += '<div style="font-size:12px;font-family:a25">a25</div>';
                for (var i = 0; i < CONFIG.PAGES.length; i++)for (var c = EDITDATA[CONFIG.PAGES[i]].etext, o = 0; o < c.length; o++)t += '<div style="font-size:12px;font-family:' + c[o][1].ffamily + '">' + c[o][1].ffamily + "</div>";
                t += "</div>"
            }
            $("body").append(t)
        }, showLeft: function (e, t) {
            $("#j-copyMsg").hide();
            var a = kx.cache.wheight - kx.cache.theight, i = 0;
            "esearch" == e ? i = 0 : "etext" == e ? i = 1 : "etpl" == e ? i = 5 : "eel" == e ? i = 2 : "ebg" == e ? i = 3 : "epic" == e && (i = 4), $("#j-menu").find(".active").removeClass("active"), $("#j-" + e).addClass("active"), $("#j-esubBox,#j-searchFix").css({"margin-left": 0}), $("#j-esubRightBox").css({left: "309px"}), $("#j-menuActivebg").animate({top: 67 * i}, 300, function () {
            }), $("#j-esubBox").animate({"margin-top": a * -i}, 500, function () {
                t && "function" == typeof t && t()
            }), $("#j-searchType").fadeOut(), $("#j-searchClose").fadeOut()
        }, insert: function (e, t, a, i, c, o, n) {
            "left" == e ? (t = "left_" + t.replace("left_", ""), c = "left_" + c.replace("left_", "")) : "preview" == e && (t = "preview_" + t.replace("preview_", ""), c = "preview_" + c.replace("preview_", ""));
            var d, s, l = $("#j-" + t + "_wrap"), r = $("#j-" + t + "_content"), h = $("#" + c);
            if ("etext" == i) {
                var p = "", x = function (e, i) {
                    var n = o.fsize / kx.cache.fontsize, d = Math.ceil(e * a) + 1, s = Math.ceil(i * a) + 1, l = Math.ceil(e / n) + 1, r = Math.ceil(i / n) + 1;
                    return p += '<div class="element j-element" id="' + c + '" data-pageid="' + t + '" data-type="etext" data-target="' + c + '" data-width="' + e + '" data-height="' + i + '" style="left:' + Math.round(o.left * a) + "px; top:" + Math.round(o.top * a) + "px; width:" + d + "px; height:" + s + "px;z-index:" + o.zindex + ";opacity:" + .01 * o.opacity + ";transform: rotateZ(" + o.rotate + 'deg);">', p += '<div class="inner rtext" id="' + c + '_inner" style="width:' + l + "px; height:" + r + "px;font-family:" + o.ffamily + ";font-size:12px;text-align:" + o.falign + ";color:#" + o.fcolor + ";line-height:" + .01 * o.frow + ";font-weight:" + (1 == o.fbold ? "bold" : "normal") + ";text-transform:" + (1 == o.fcapital ? "Uppercase" : "none") + ";font-style:" + (1 == o.fitalic ? "italic" : "normal") + ";word-wrap:break-word;white-space:pre-wrap;writing-mode:" + ("h" == o.fdir ? "horizontal-tb" : "vertical-rl") + ";-webkit-writing-mode:" + ("h" == o.fdir ? "horizontal-tb" : "vertical-rl") + ';" contenteditable="true">', p += kx.comm.processStr("d", o.ftext), p += "</div>", p += "</div>"
                };
                if (d = o.width, s = o.height, h[0] ? h.css({
                        width: d * a,
                        height: s * a
                    }) : r.append(x(d, s)), 1 == o.multi || o.group && o.group.length > 0) {
                    var f = o.fsize / kx.cache.fontsize;
                    kx.etext.fixSizeScale(t, c, d * a, s * a, f * a, $("#" + c).find(".inner"))
                } else kx.cache.fixSizeScale = [1, 1], kx.etext.ttransform(c, o);
                -1 != c.indexOf("left_") && setTimeout(function () {
                    _target = c.replace("left_", ""), $("#" + _target + "_inner").length > 0 && kx.etext.getLineBreak(_target, function (e, a) {
                        kx.edata.edit(t, "etext", a, {linebreak: e})
                    })
                }, 10), n && "function" == typeof n && n()
            } else if ("epic" == i) {
                var g = o.url;
                kx.comm.loadimg(g, function () {
                    h[0] ? (h.css({width: o.width * a, height: o.height * a}).find("img").css({
                        width: o.width,
                        height: o.height
                    }).attr("src", g), h.find(".inner").css({
                        width: o.width,
                        height: o.height
                    })) : r.append('<div class="element j-element" id="' + c + '" data-pageid="' + t + '" data-type="epic" data-target="' + c + '" style="left:' + o.left * a + "px; top:" + o.top * a + "px;width:" + o.width * a + "px;height:" + o.height * a + "px;z-index:" + o.zindex + ";opacity:" + .01 * o.opacity + ";transform: rotateZ(" + o.rotate + 'deg);"><div class="inner rpic" style="width:' + o.width + "px;height:" + o.height + "px;transform:scale(" + a + ');"><img src="' + g + '" style="width:' + o.width + "px;height:" + o.height + 'px;"></div></div>'), n && "function" == typeof n && n()
                })
            } else if ("ebg" == i)o.color && "" != o.color || (o.color = "ffffff"), l.css("" != o.url ? 1 == o.show ? {
                background: "url(" + o.url + ") no-repeat 50% 50% #" + o.color,
                "background-size": "cover"
            } : {background: "#" + o.color} : {background: "#" + o.color}), n && "function" == typeof n && n(); else if ("eel" == i) {
                h[0] ? (h.find(".inner").html(o.svgdata), h.css({
                    width: o.width * a,
                    height: o.height * a
                })) : r.append('<div class="element j-element" id="' + c + '" data-pageid="' + t + '"  data-type="eel" data-target="' + c + '" style="left:' + o.left * a + "px;top:" + o.top * a + "px;width:" + o.width * a + "px;height:" + o.height * a + "px;z-index:" + o.zindex + ";opacity:" + .01 * o.opacity + ";transform: rotateZ(" + o.rotate + 'deg);"><div class="inner rel" style="transform:scale(' + a + ');">' + o.svgdata + "</div></div>"), $("#" + c).find(".inner").css({
                    width: o.width,
                    height: o.height
                });
                var k = $("#" + c).find("svg");
                k.css({width: o.width, height: o.height}), kx.eel.itext(e, t, c), n && "function" == typeof n && n()
            }
            kx.fun.comm.getMaxzindex(t)
        }, infinitescroll: function (e) {
            "esearch" == e ? $("#j-esearchBox").scroll(function () {
                $("#j-copyMsg").remove();
                var e = $("#j-esearchBoxContent").height(), t = $("#j-esearchBox").height(), a = $("#j-esearchBox").scrollTop();
                20 > e - t - a && kx.backopt.getMaterial($("#j-searchInput").val())
            }) : "etext" == e ? $("#j-etextBox").scroll(function () {
                $("#j-copyMsg").remove();
                var e = $("#j-etextBoxContent").height(), t = $("#j-etextBox").height(), a = $("#j-etextBox").scrollTop();
                20 > e - t - a && kx.backopt.getArtFontAjax()
            }) : "etpl" == e ? $("#j-etplBox").scroll(function () {
                $("#j-copyMsg").remove();
                var e = $("#j-etplBoxContent").height(), t = $("#j-etplBox").height(), a = $("#j-etplBox").scrollTop();
                20 > e - t - a && kx.backopt.getTplAjax()
            }) : "eel" == e && $("#j-eelBox").scroll(function () {
                $("#j-copyMsg").remove();
                var e = $("#j-eelBoxSort").attr("data-index");
                $(this).scrollTop() > 20 ? ($("#j-searchType").fadeIn(), $("#j-searchClose").fadeIn()) : ($("#j-searchType").fadeOut(), $("#j-searchClose").fadeOut());
                var t = $("#j-eelBoxContent").height(), a = $("#j-eelBox").height(), i = $("#j-eelBox").scrollTop();
                20 > t - a - i && kx.backopt.getElAjax(e)
            })
        }, wall: function (e, t, a) {
            t = t || 1;
            var i = function (e) {
                "hidden" == $("#j-" + e).css("visibility") && $("#j-" + e).css({visibility: "visible"})
            };
            "esearch" == e ? (kx.cache.wall.esearch = new Freewall("#j-esearchWall"), kx.cache.wall.esearch.reset({
                selector: ".item",
                animate: !1,
                delay: 0,
                cellW: function () {
                    return Math.ceil(kx.cache.lcontentwidth / t)
                },
                cellH: "auto",
                gutterX: 5,
                gutterY: 5,
                onComplete: function () {
                    i("esearchWall")
                }
            }), a.find("img").load(function () {
                kx.cache.wall.esearch.fitWidth()
            })) : "etext" == e ? (kx.cache.wall.etext = new Freewall("#j-etextWall"), kx.cache.wall.etext.reset({
                selector: ".item",
                animate: !1,
                delay: 0,
                cellW: function () {
                    return Math.ceil(kx.cache.lcontentwidth / t)
                },
                cellH: "auto",
                gutterX: 5,
                gutterY: 5,
                onComplete: function () {
                    i("etextWall")
                }
            }), a.find("img").load(function () {
                kx.cache.wall.etext.fitWidth()
            })) : "ebg" == e ? (kx.cache.wall.ebg = new Freewall("#j-ebgWall"), kx.cache.wall.ebg.reset({
                selector: ".item",
                animate: !1,
                delay: 0,
                cellW: function () {
                    return Math.ceil(kx.cache.lcontentwidth / t)
                },
                cellH: "auto",
                gutterX: 5,
                gutterY: 5,
                onComplete: function () {
                    i("ebgWall")
                }
            }), a.find("img").load(function () {
                kx.cache.wall.ebg.fitWidth()
            })) : "etpl" == e ? (kx.cache.wall.etpl = new Freewall("#j-etplWall"), kx.cache.wall.etpl.reset({
                selector: ".item",
                animate: !1,
                delay: 0,
                cellW: function () {
                    return Math.ceil(kx.cache.lcontentwidth / t)
                },
                cellH: "auto",
                gutterX: 5,
                gutterY: 13,
                onComplete: function () {
                    i("etplWall")
                }
            }), a.find("img").load(function () {
                kx.cache.wall.etpl.fitWidth()
            })) : "eel" == e ? (kx.cache.wall.eel = new Freewall("#j-eelWall"), kx.cache.wall.eel.reset({
                selector: ".item",
                animate: !1,
                delay: 0,
                cellW: function () {
                    return Math.ceil(kx.cache.lcontentwidth / t)
                },
                cellH: "auto",
                gutterX: 5,
                gutterY: 5,
                onComplete: function () {
                    i("eelWall")
                }
            }), a.find("img").load(function () {
                kx.cache.wall.eel.fitWidth()
            })) : "epic" == e && (kx.cache.wall.epic = new Freewall("#j-epicWall"), kx.cache.wall.epic.reset({
                selector: ".item",
                animate: !1,
                delay: 0,
                cellW: function () {
                    return Math.ceil(kx.cache.lcontentwidth / t)
                },
                cellH: "auto",
                gutterX: 5,
                gutterY: 5,
                onComplete: function () {
                    i("epicWall")
                }
            }), a.find("img").load(function () {
                kx.cache.wall.epic.fitWidth()
            }))
        }, getMaxzindex: function (e) {
            e = e.replace("left_", "") || kx.editPage, kx.cache.zindex[e] = [1, 1], kx.cache.zindexary[e] = [];
            for (var t in EDITDATA[e])for (var a = 0; a < EDITDATA[e][t].length; a++) {
                var i = EDITDATA[e][t][a][0], c = parseInt(EDITDATA[e][t][a][1].zindex);
                kx.cache.zindex[e][0] = Math.max(c, kx.cache.zindex[e][0]), kx.cache.zindexary[e].push([i, c])
            }
        }, changeUpZindex: function (e, t, a) {
            {
                var i = $("#j-" + e + "_wrap"), c = i.find("div.j-element");
                c.length
            }
            c.each(function () {
                var i = $(this), c = i.attr("data-type"), o = i.attr("data-target"), n = parseInt(i.css("z-index")), d = function () {
                    {
                        var t = (kx.edata.get(e, c, o), n + a);
                        kx.edata.edit(e, c, o, {zindex: t})
                    }
                    i.css({"z-index": t})
                };
                -1 == a ? n > t && d() : 1 == a && n >= t && d()
            })
        }, getNodeClick: function () {
            kx.cache.through = [0, 0];
            {
                var e = $("#j-editorPrint").find("div.j-element");
                e.length
            }
            e.each(function () {
                var e = e || window.event, t = $(this), a = document.documentElement.scrollLeft || document.body.scrollLeft, i = (document.documentElement.scrollTop || document.body.scrollTop, e.pageX || e.clientX + a), c = e.pageY || e.clientY + a, o = t.attr("data-pageid"), n = t.attr("data-type"), d = t.attr("data-target"), s = kx.comm.getObjPos($("#j-" + o + "_content"), 0).o;
                if (i > s.left && i < s.right && c > s.top && c < s.bottom) {
                    var l = kx.edata.get(o, n, d)[1], r = kx.comm.getObjPos(t, l.rotate || 0).n, h = parseInt(l.zindex);
                    i > r.left && i < r.right && c > r.top && c < r.bottom && h >= kx.cache.through[1] && (kx.cache.through[0] = d, kx.cache.through[1] = h)
                }
            })
        }, hidediy: function () {
            "none" != $("#j-diyColor").css("display") && ($("#j-diyColor").hide(), kx.fun.comm.colorpickerFun(kx.editPage, 0, 0))
        }, textBlur: function () {
            var e = $("#j-ename").find("span");
            "true" == e.attr("contenteditable") && e.attr("contenteditable", "false").blur();
            var t = $("#j-editText").find(".inner");
            "true" == t.attr("contenteditable") && (t.attr("contenteditable", "false"), $("#j-editText").blur())
        }, restoreColor: function () {
        }, hidden: function (e) {
            if (1 == e)kx.fun.menu.main(), kx.fun.menu.drop(), kx.fun.comm.textBlur(); else {
                kx.fun.menu.main(), kx.fun.menu.drop(), kx.fun.comm.hidediy(), kx.fun.comm.textBlur(), kx.fun.comm.restoreColor();
                var t = $("#j-md_usedadd").attr("data-usedcolor");
                t && -1 == kx.comm.findary(CONFIG.USEDCOLOR, t) && kx.comm.maxary(CONFIG.USEDCOLOR, 7, t);
                var a = $("#j-bgcdiy").attr("data-usedcolor");
                a && -1 == kx.comm.findary(CONFIG.BGUSEDCOLOR, a) && kx.comm.maxary(CONFIG.BGUSEDCOLOR, 7, a), kx.ebg.initusedbg(), $("#j-editorSelect").css({
                    width: "0",
                    display: "none"
                }), $("#j-editorSnap").css({
                    width: "0",
                    display: "none"
                }), $("#j-searchInput").blur(), $("#j-editorPrint").find(".ui-selected").removeClass("ui-selected")
            }
        }, chkResizeHandle: function (e) {
            e = e || 0, kx.cache.multiselected.length > 1 ? kx.fun.comm.resizeHandle(0 != e ? 0 : 1) : 1 == kx.cache.multiselected.length && (0 != kx.cache.selected.data.rotate ? "etext" == kx.cache.selected.type ? "h" == kx.cache.selected.data.fdir ? kx.fun.comm.resizeHandle("w,e") : "v" == kx.cache.selected.data.fdir && kx.fun.comm.resizeHandle("n,s") : kx.fun.comm.resizeHandle(3) : "etext" == kx.cache.selected.type ? "h" == kx.cache.selected.data.fdir ? kx.fun.comm.resizeHandle("w,e") : "v" == kx.cache.selected.data.fdir && kx.fun.comm.resizeHandle("n,s") : "epic" == kx.cache.selected.type ? kx.fun.comm.resizeHandle(8) : "eel" == kx.cache.selected.type && kx.fun.comm.resizeHandle("8个角" == kx.cache.selected.type ? 8 : 8))
        }, resizeHandle: function (e) {
            if ($("#j-editorSelect").find("div.ui-resizable-handle").hide(), "string" == typeof e)for (var t = e.replace(/\s/, "").split(","), a = 0; a < t.length; a++)$("#j-editorSelect").find("div.ui-resizable-" + t[a]).show(); else 1 == e ? $("#j-editorSelect").find("div.ui-resizable-se").show() : 2 == e ? $("#j-editorSelect").find("div.ui-resizable-w,div.ui-resizable-e").show() : 3 == e ? $("#j-editorSelect").find("div.ui-resizable-e,div.ui-resizable-se,div.ui-resizable-s").show() : 4 == e ? $("#j-editorSelect").find("div.ui-resizable-nw,div.ui-resizable-ne,div.ui-resizable-sw,div.ui-resizable-se").show() : 8 == e && $("#j-editorSelect").find("div.ui-resizable-w,div.ui-resizable-e,div.ui-resizable-s,div.ui-resizable-n,div.ui-resizable-nw,div.ui-resizable-ne,div.ui-resizable-sw,div.ui-resizable-se").show()
        }, chkZindex: function (e, t, a) {
            var i = {etext: "j-mot", epic: "j-mop", eline: "j-mol", eel: "j-moe"};
            a >= kx.cache.zindex[e][0] ? $("#" + i[t] + "_up").addClass("disabled").off("click") : $("#" + i[t] + "_up").removeClass("disabled").off("click").on("click", function () {
                kx.editor.order(e, 1)
            }), a <= kx.cache.zindex[e][1] ? $("#" + i[t] + "_down").addClass("disabled").off("click") : $("#" + i[t] + "_down").removeClass("disabled").off("click").on("click", function () {
                kx.editor.order(e, -1)
            })
        }, colorpickerFun: function (e, t, a) {
            var i = $("#j-cprtop_old").attr("data-color"), c = $("#j-cprtop_new").attr("data-color"), o = $("#j-md_usedadd").attr("data-diytype") || "editor";
            if ("editor" == o) {
                {
                    var n = kx.cache.selected.type;
                    kx.cache.selected.target
                }
                if ("etext" == n)kx.etext.setDiyColor(e, c, t, a); else if ("eel" == n) {
                    var d = $("#j-moe_color").attr("data-icolor"), i = $("#j-moe_color").attr("data-ocolor");
                    kx.eel.setDiyColor(e, i, c, d, t, a)
                }
            } else if (o = "bgdiy") {
                var s = kx.edata.get(e, "ebg", "ebg"), l = $.extend(!0, {}, s);
                l[1].color = c, kx.ebg.setbg(e, s[1], l[1], t, a), $("#j-bgcdiy").attr("data-usedcolor", c)
            }
            $("#j-md_usedadd").attr("data-usedcolor", c)
        }, colorpicker: function (e, t, a) {
            a = a ? a.replace("#", "") : "ffffff";
            var i = "", c = {};
            i += '<div class="cpcolor f-clearfix">', i += '  <div class="cpLeft"><input type="hidden" class="colorPicker" id="j-colorPicker" value="#"' + a + "></div>", i += '  <div class="cpRight">', i += '    <div class="cprtop" id="j-cprtop"><div class="new" id="j-cprtop_new" data-color="' + a + '" style="background:#' + a + '"></div><div class="old" id="j-cprtop_old" data-color="' + a + '" style="background:#' + a + '"></div></div>', i += '    <div class="cprmid"><input type="text" class="cv" id="j-cprtop_val" value="#' + a + '"/></div>', i += "  </div>", i += "</div>", "editor" == t ? (c = $("#j-md_usedadd").offset(), c.top = c.top + 30, c.left = c.left + 30) : "diybg" == t && (c = $("#j-bgcdiy").offset(), c.top = c.top + 30, c.left = c.left + 30), $("#j-diyColor").css({
                display: "block",
                top: c.top,
                left: c.left
            }).html(i), $("#j-md_usedadd").attr("data-diytype", t);
            var o = function (t, a) {
                1 == a && ($("#j-diyColor").find(".cpLeft").html('<input type="hidden" class="colorPicker" id="j-colorPicker" value="#"' + t + ">"), $("#j-cprtop_new").css({background: "#" + t}), $("#j-cprtop_val").val("#" + t), $("#j-cprtop_new").attr("data-color", t), kx.fun.comm.colorpickerFun(e, 1, 1)), $("#j-colorPicker").minicolors({
                    inline: !0,
                    defaultValue: "#" + t,
                    change: function (t) {
                        var a = t.replace("#", "");
                        $("#j-cprtop_new").css({background: "#" + a}), $("#j-cprtop_val").val("#" + a), $("#j-cprtop_new").attr("data-color", a), kx.fun.comm.colorpickerFun(e, 1, 1)
                    }
                })
            };
            o(a, 0), $("#j-cprtop_val").off("keydown").on("keydown", function () {
                kx.cache.sinput && clearTimeout(kx.cache.sinput), $(document).off("keydown")
            }).off("input").on("input", function () {
                var e = $("#j-cprtop_val").val().replace("#", "");
                6 == e.length && o(e, 1), kx.cache.sinput = setTimeout(function () {
                    kx.fun.ep.ekey()
                }, 50)
            })
        }
    }, menu: {
        imain: {
            init: function (e, t) {
                "etext" == t ? this.etext(e) : "epic" == t ? this.epic(e) : "eel" == t && this.eel(e)
            }, etext: function (e) {
                var t = kx.cache.selected.data, a = t.ffamily, i = t.fsize, c = t.falign, o = t.fitalic, n = t.fcapital, d = t.zindex, s = (t.frow, t.fdir), l = (t.opacity, t.fcolor);
                $("#j-mot_family").html('<span><i class="' + a + '">' + kx.default.family[a] + "</i></span>"), $("#j-mot_size").attr("data-fsize", i).html('<input type="text" value="' + i + '" />'), 1 == o ? $("#j-mot_italic").addClass("active") : $("#j-mot_italic").removeClass("active"), 1 == n ? $("#j-mot_capital").addClass("active") : $("#j-mot_capital").removeClass("active"), $("#j-mot_align").find("span").attr("class", c), $("#j-md_align").find(".active").removeClass("active"), $("#j-md_align").find("." + c).addClass("active"), $("#j-md_dir").find(".active").removeClass("active"), $("#j-md_dir").find("." + s).addClass("active"), kx.fun.comm.chkZindex(e, "etext", d), $("#j-mot_color").find("span").css({"background-color": "#" + l}), $("#j-mo_etextb").css({"margin-left": 0})
            }, epic: function (e) {
                var t = kx.cache.selected.data, a = t.zindex;
                kx.fun.comm.chkZindex(e, "epic", a)
            }, eel: function (e) {
                var t = kx.cache.selected.data, a = t.zindex, i = t.colors, c = t.icolors;
                kx.fun.comm.chkZindex(e, "eel", a), kx.cache.svgcolors.icolor = c.concat(), kx.cache.svgcolors.color = i.concat(), kx.eel.icolor(e, kx.cache.svgcolors.color)
            }
        }, idrop: {
            init: function (e, t, a) {
                e = e || kx.editPage, kx.sel.updata(e, kx.cache.selected.type, kx.cache.selected.target);
                var i = (kx.cache.selected.type, kx.cache.selected.data);
                "etext" == t ? "family" == a ? this.etext.tfamily(e, i) : "size" == a ? this.etext.tsize(e, i) : "color" == a ? this.comm.color(e, i, t) : "row" == a ? this.etext.trow(e, i) : "opacity" == a ? this.comm.opacity(e, i) : "rotate" == a && this.comm.rotate(e, i) : "epic" == t ? "opacity" == a ? this.comm.opacity(e, i) : "rotate" == a ? this.comm.rotate(e, i) : "chicun" == a && this.comm.chicun(e, i) : "eel" == t && ("chicun" == a ? this.comm.chicun(e, i) : "color" == a ? this.comm.color(e, i, t) : "opacity" == a ? this.comm.opacity(e, i) : "rotate" == a && this.comm.rotate(e, i))
            }, comm: {
                opacity: function (e, t) {
                    $("#j-md_opacity_solider").data("uiSlider") || ($("#j-md_opacity_solider").slider({
                        range: "min",
                        min: 0,
                        max: 100,
                        slide: function (e, t) {
                            $(this).hasClass("active") || $(this).addClass("active"), $("#j-md_opacity").find("input.r").val(t.value)
                        },
                        stop: function (t, a) {
                            $(this).removeClass("active"), kx.editor.opacity(e, a.value)
                        }
                    }), $("#j-md_opacity").find("input.r").on("keydown", function (e) {
                        kx.comm.numinput(e)
                    }).on("keyup", function (t) {
                        var a = $(this);
                        kx.comm.numinput(t, function () {
                            var t = a.val();
                            $("#j-md_opacity_solider").slider({value: t}), kx.editor.opacity(e, t)
                        })
                    }));
                    var a = t.opacity;
                    $("#j-md_opacity").find("input.r").val(a), $("#j-md_opacity_solider").slider({value: a})
                }, rotate: function (e, t) {
                    $("#j-md_rotate_solider").data("uiSlider") || ($("#j-md_rotate_solider").slider({
                        range: "min",
                        step: 5,
                        min: -360,
                        max: 360,
                        slide: function (e, t) {
                            $("#j-md_rotate").find("input.r").val(t.value), $("#" + kx.cache.selected.target).css({transform: "rotateZ(" + t.value + "deg)"}), $("#j-editorSelect").css({transform: "rotateZ(" + t.value + "deg)"})
                        },
                        stop: function (t, a) {
                            kx.editor.rotate(e, a.value)
                        }
                    }), $("#j-md_rotate").find("input.r").on("keydown", function (e) {
                        kx.comm.numinput(e)
                    }).on("keyup", function (t) {
                        var a = $(this);
                        kx.comm.numinput(t, function () {
                            var t = a.val();
                            $("#j-md_rotate_solider").slider({value: t}), kx.editor.rotate(e, t)
                        })
                    }));
                    var a = t.rotate;
                    $("#j-md_rotate").find("input.r").val(a), $("#j-md_rotate_solider").slider({value: a})
                }, color: function (e, t, a) {
                    var i = "";
                    "etext" == a ? i = t.fcolor : "eel" == a && (i = $("#j-moe_color").attr("data-color"));
                    for (var c = "", o = CONFIG.USEDCOLOR.length - 1; o >= 0; o--)o > -1 && (c += '<li class="item li' + o + '" data-color="' + CONFIG.USEDCOLOR[o] + '"><i style="background-color:#' + CONFIG.USEDCOLOR[o] + '"></i></li>');
                    if ($("#j-md_usedColor").find(".colorList").html(c), $("#j-md_referColor").find("li.item")[0])$("#j-md_referColor").find("li.item").removeClass("active"), $("#j-md_referColor").find("li[data-color=" + i + "]").addClass("active"); else {
                        for (var n = "", o = 0; o < kx.default.color.length; o++)n += kx.default.color[o].toLowerCase() == i.toLowerCase() ? '<li class="li' + o + ' active" data-color="' + kx.default.color[o] + '"><i style="background-color:#' + kx.default.color[o] + '"></i></li>' : '<li class="li' + o + '" data-color="' + kx.default.color[o] + '"><i style="background-color:#' + kx.default.color[o] + '"></i></li>';
                        $("#j-md_referColor").find(".colorList").html(n)
                    }
                    $("#j-md_usedadd").attr("data-color", i)
                }, chicun: function (e, t) {
                    var a = Math.round(t.width), i = Math.round(t.height);
                    $("#j-md_chicunkuan").val(a + "px").attr("data-old", a), $("#j-md_chicungao").val(i + "px").attr("data-old", i)
                }
            }, etext: {
                tfamily: function (e, t) {
                    var a = $("#j-md_family").find("ul"), i = a.find("li"), c = i.length;
                    if (0 == c) {
                        var o = "";
                        for (var n in kx.default.family)o += '<li data-ff="' + n + '" class="' + n + '">' + kx.default.family[n] + "</li>";
                        a.html(o), i = a.find("li")
                    }
                    var d = t.ffamily;
                    a.scrollTop(0), i.each(function () {
                        $(this).attr("data-ff") == d ? ($(this).addClass("active"), a.animate({scrollTop: $(this).position().top - 8}, 200)) : $(this).removeClass("active")
                    })
                }, tsize: function (e, t) {
                    var a = $("#j-md_size"), i = a.find("li"), c = i.length;
                    if (0 == c) {
                        for (var o = "", n = 5; 801 > n; n++)o += "<li>" + n + "</li>";
                        a.html(o), i = a.find("li")
                    }
                    var d = t.fsize;
                    a.scrollTop(0), i.each(function () {
                        var e = $(this);
                        e.text() == d ? (e.addClass("active"), a.animate({scrollTop: e.position().top - 8}, 200)) : e.removeClass("active")
                    })
                }, talign: function (e, t) {
                    e = e || kx.editPage;
                    for (var a = t.falign, i = ["left", "center", "right", "justify"], c = ["md_alignl", "md_alignc", "md_alignr", "md_alignj"], o = 0; o < c.length; o++)a == i[o] ? $("#" + c[o]).addClass("active") : $("#" + c[o]).removeClass("active")
                }, trow: function (e, t) {
                    e = e || kx.editPage, $("#j-md_row_solider").data("uiSlider") || ($("#j-md_row_solider").slider({
                        range: "min",
                        min: 100,
                        max: 500,
                        slide: function (e, t) {
                            $(this).hasClass("active") || $(this).addClass("active"), $("#j-md_row").find("input.r").val(t.value)
                        },
                        stop: function (a, i) {
                            $(this).removeClass("active"), t.frow = i.value, kx.etext.ttransform(kx.cache.selected.target, t), kx.etext._doEditText(e, "frow", i.value)
                        }
                    }), $("#j-md_row").find("input.r").on("keydown", function (e) {
                        kx.comm.numinput(e)
                    }).on("keyup", function (a) {
                        var i = $(this);
                        kx.comm.numinput(a, function () {
                            var a = i.val();
                            i.val(a), $("#j-md_row_solider").slider({value: a}), kx.etext.ttransform(kx.cache.selected.target, t), kx.etext._doEditText(e, "frow", a)
                        })
                    }));
                    var a = t.frow;
                    $("#j-md_row").find("input.r").val(a), $("#j-md_row_solider").slider({value: a})
                }
            }
        }, mainopt: function (e, t, a) {
            "main" == e ? "etext" == a ? ($("#j-mot_family").removeClass("disabled"), $("#j-mot_size").removeClass("disabled"), $("#j-mot_copy").removeClass("disabled"), $("#j-mot_del").removeClass("disabled"), $("#j-mot_row").removeClass("disabled"), $("#j-mot_dir").removeClass("disabled"), $("#j-mot_up").removeClass("disabled"), $("#j-mot_down").removeClass("disabled"), $("#j-mot_rotate").removeClass("disabled")) : "epic" == a ? ($("#j-mop_size").removeClass("disabled"), $("#j-mop_copy").removeClass("disabled"), $("#j-mop_del").removeClass("disabled"), $("#j-mop_up").removeClass("disabled"), $("#j-mop_down").removeClass("disabled"), $("#j-mop_rotate").removeClass("disabled")) : "eel" == a && ($("#j-moe_size").removeClass("disabled"), $("#j-moe_copy").removeClass("disabled"), $("#j-moe_del").removeClass("disabled"), $("#j-moe_up").removeClass("disabled"), $("#j-moe_down").removeClass("disabled"), $("#j-moe_rotate").removeClass("disabled")) : "group" == e && ("etext" == a ? ($("#j-mot_family").addClass("disabled"), $("#j-mot_size").addClass("disabled"), $("#j-mot_copy").addClass("disabled"), $("#j-mot_del").addClass("disabled"), $("#j-mot_row").addClass("disabled"), $("#j-mot_dir").addClass("disabled"), $("#j-mot_up").addClass("disabled"), $("#j-mot_down").addClass("disabled"), $("#j-mot_rotate").addClass("disabled")) : "epic" == a ? ($("#j-mop_size").addClass("disabled"), $("#j-mop_copy").addClass("disabled"), $("#j-mop_del").addClass("disabled"), $("#j-mop_up").addClass("disabled"), $("#j-mop_down").addClass("disabled"), $("#j-mop_rotate").addClass("disabled")) : "eel" == a && ($("#j-moe_size").addClass("disabled"), $("#j-moe_copy").addClass("disabled"), $("#j-moe_del").addClass("disabled"), $("#j-moe_up").addClass("disabled"), $("#j-moe_down").addClass("disabled"), $("#j-moe_rotate").addClass("disabled")))
        }, main: function (e, t, a) {
            e = e || kx.editPage, kx.fun.comm.hidediy(), $("#j-cardmsg").off("click").on("click", function () {
                kx.fun.comm.textBlur()
            }), kx.cache.selected.data && kx.cache.selected.data.group && kx.cache.selected.data.group.length > 0 ? kx.fun.menu.mainopt("group", e, t) : kx.fun.menu.mainopt("main", e, t), t ? ($("#j-cardmsg").slideDown(200), kx.fun.menu.imain.init(e, t)) : "none" != $("#j-cardmsg").css("display") && $("#j-cardmsg").slideUp(200);
            for (var i = ["etext", "epic", "eel"], c = 0; c < i.length; c++)i[c] == t ? $("#j-mo_" + i[c]).show() : $("#j-mo_" + i[c]).hide();
            $("#j-cardDrop").hide(), a && "function" == typeof a && a()
        }, drop: function (e, t, a, i, c) {
            var o = ["text", "color", "family", "size", "align", "row", "rotate", "dir", "opacity", "lsize", "ltype", "chicun"];
            if (c = c || {top: 0, left: 0}, t || a) {
                if (i[0]) {
                    $("#j-mo_" + t).find(".click").removeClass("click"), i.addClass("click");
                    for (var n = 0; n < o.length; n++)a == o[n] ? "none" == $("#j-md_" + o[n]).css("display") ? $("#j-md_" + o[n]).show() : "eel" == t && "color" == a && $("#j-md_usedadd").attr("data-color").toLowerCase() != $("#j-moe_color").attr("data-color").toLowerCase() ? $("#j-md_" + o[n]).show() : $("#j-md_" + o[n]).hide() : $("#j-md_" + o[n]).hide();
                    var d = i.offset();
                    $("#j-cardDrop").removeClass().addClass("m-cardDrop " + t + "_" + a).css({
                        display: "block",
                        top: d.top + 38 + c.top + 7,
                        left: d.left + c.left
                    }), 0 == $("#j-cardDrop").height() ? $("#j-cardDrop").addClass("hideShadow") : $("#j-cardDrop").remove("hideShadow"), kx.fun.menu.idrop.init(e, t, a)
                }
            } else {
                for (var n = 0; n < o.length; n++)$("#j-md_" + o[n]).hide();
                $("#j-cardDrop").hide()
            }
        }
    }, snap: {
        creat: function () {
            var e = $("#j-rightPannel"), t = $("#j-" + kx.editPage + "_wrap"), a = kx.cache.scale[1] / kx.cache.scale[0];
            $("#j-editorSnap").css({
                display: "block",
                visibility: "visible",
                width: kx.cache.editorWidth * a,
                height: "0px",
                top: t.offset().top - kx.cache.theight + e.scrollTop(),
                left: t.offset().left - kx.cache.lwidth + e.scrollLeft()
            })
        }, getPos: function () {
            kx.fun.snap.creat(), kx.cache.pos = {}, kx.cache.pos.pwrap = kx.comm.getObjPos($("#j-" + kx.editPage + "_wrap")).o, $("#j-" + kx.editPage + "_wrap").find("div.j-element").each(function () {
                var e = $(this), t = e.attr("data-pageid"), a = e.attr("data-type"), i = e.attr("data-target"), c = kx.edata.get(t, a, i), o = c.rotate;
                kx.cache.pos[i] = o ? kx.comm.getObjPos(e, o).n : kx.comm.getObjPos(e).o
            })
        }, hide: function () {
            $("#j-editorSnap").find("div.snap").css({background: "none"})
        }, dragshow: function (e) {
            var t = $("#j-" + kx.editPage + "_wrap"), a = function (a, i, c) {
                c = c || 0, $.each(e.snapElements, function (o, n) {
                    "vl" == i || "vm" == i || "vr" == i ? $(n.item).hasClass(i) && (e.snapElements[o].width = 1, e.snapElements[o].height = t.height(), e.snapElements[o].top = t.offset().top, "vl" == i ? e.snapElements[o].left = kx.cache.pos[a].left + c : "vm" == i ? e.snapElements[o].left = kx.cache.pos[a].left + Math.ceil(kx.cache.pos[a].width / 2) : "vr" == i && (e.snapElements[o].left = kx.cache.pos[a].left + kx.cache.pos[a].width), $(n.item).css({
                        top: 0,
                        left: e.snapElements[o].left - t.offset().left,
                        width: e.snapElements[o].width,
                        height: e.snapElements[o].height,
                        background: "url(" + EDITOR_THEMES_URL + "images/vline.png) 0 0 repeat-y"
                    })) : ("ht" == i || "hm" == i || "hb" == i) && $(n.item).hasClass(i) && (e.snapElements[o].width = t.width(), e.snapElements[o].height = 1, e.snapElements[o].left = t.offset().left, "ht" == i ? e.snapElements[o].top = kx.cache.pos[a].top + c : "hm" == i ? e.snapElements[o].top = kx.cache.pos[a].top + Math.ceil(kx.cache.pos[a].height / 2) : "hb" == i && (e.snapElements[o].top = kx.cache.pos[a].top + kx.cache.pos[a].height), $(n.item).css({
                        top: e.snapElements[o].top - t.offset().top,
                        left: 0,
                        width: e.snapElements[o].width,
                        height: e.snapElements[o].height,
                        background: "url(" + EDITOR_THEMES_URL + "images/hline.png) 0 0 repeat-x"
                    }))
                })
            };
            kx.fun.snap.hide();
            var i = kx.comm.getObjPos($("#j-editorSelect"), kx.cache.rotate).n;
            i.center = Math.ceil(i.left + i.width / 2), i.middle = Math.ceil(i.top + i.height / 2);
            var c = function (e) {
                return {
                    left: kx.cache.pos[e].left,
                    center: Math.ceil(kx.cache.pos[e].left + kx.cache.pos[e].width / 2),
                    right: kx.cache.pos[e].right,
                    top: kx.cache.pos[e].top,
                    middle: Math.ceil(kx.cache.pos[e].top + kx.cache.pos[e].height / 2),
                    bottom: kx.cache.pos[e].bottom
                }
            };
            for (var o in kx.cache.pos) {
                var n = c(o);
                Math.abs(i.left - n.left) < kx.cache.snap && a(o, "vl"), 0 == Math.abs(i.center - n.left) && a(o, "vl"), Math.abs(i.right - n.left) < kx.cache.snap && a(o, "vl"), (Math.abs(i.left - n.center) < kx.cache.snap || 0 == Math.abs(i.center - n.center) || Math.abs(i.right - n.center) < kx.cache.snap) && a(o, "vm"), Math.abs(i.left - n.right) < kx.cache.snap && a(o, "vr"), 0 == Math.abs(i.center - n.right) && a(o, "vr"), Math.abs(i.right - n.right) < kx.cache.snap && a(o, "vr"), Math.abs(i.top - n.top) < kx.cache.snap && a(o, "ht"), 0 == Math.abs(i.middle - n.top) && a(o, "ht"), Math.abs(i.bottom - n.top) < kx.cache.snap && a(o, "ht"), (Math.abs(i.top - n.middle) < kx.cache.snap || 0 == Math.abs(i.middle - n.middle) || Math.abs(i.bottom - n.middle) < kx.cache.snap) && a(o, "hm"), Math.abs(i.top - n.bottom) < kx.cache.snap && a(o, "hb"), 0 == Math.abs(i.middle - n.bottom) && a(o, "hb"), Math.abs(i.bottom - n.bottom) < kx.cache.snap && a(o, "hb")
            }
        }, resizeshow: function () {
            var e = $("#j-" + kx.editPage + "_wrap"), t = function (t, a) {
                if ("vl" == a || "vm" == a || "vr" == a) {
                    var i = {left: 0, height: e.height()};
                    "vl" == a ? i.left = kx.cache.pos[t].left : "vm" == a ? i.left = kx.cache.pos[t].left + Math.ceil(kx.cache.pos[t].width / 2) : "vr" == a && (i.left = kx.cache.pos[t].left + kx.cache.pos[t].width), $("#j-editorSnap").find("." + a).css({
                        top: 0,
                        left: i.left - e.offset().left,
                        width: 1,
                        height: i.height,
                        background: "url(" + EDITOR_THEMES_URL + "images/vline.png) 0 0 repeat-y"
                    })
                } else if ("ht" == a || "hm" == a || "hb" == a) {
                    var i = {top: 0, width: e.width()};
                    "ht" == a ? i.top = kx.cache.pos[t].top : "hm" == a ? i.top = kx.cache.pos[t].top + Math.ceil(kx.cache.pos[t].height / 2) : "hb" == a && (i.top = kx.cache.pos[t].top + kx.cache.pos[t].height), $("#j-editorSnap").find("." + a).css({
                        top: i.top - e.offset().top,
                        left: 0,
                        width: i.width,
                        height: 1,
                        background: "url(" + EDITOR_THEMES_URL + "images/hline.png) 0 0 repeat-x"
                    })
                }
            };
            kx.fun.snap.hide();
            var a = kx.comm.getObjPos($("#j-editorSelect"), kx.cache.rotate).n;
            a.center = Math.ceil(a.left + a.width / 2), a.middle = Math.ceil(a.top + a.height / 2);
            var i = function (e) {
                return {
                    left: kx.cache.pos[e].left,
                    center: Math.ceil(kx.cache.pos[e].left + kx.cache.pos[e].width / 2),
                    right: kx.cache.pos[e].right,
                    top: kx.cache.pos[e].top,
                    middle: Math.ceil(kx.cache.pos[e].top + kx.cache.pos[e].height / 2),
                    bottom: kx.cache.pos[e].bottom
                }
            };
            for (var c in kx.cache.pos) {
                var o = i(c);
                (Math.abs(a.left - o.left) <= 1 || Math.abs(a.center - o.left) <= 1 || Math.abs(a.right - o.left) <= 1) && t(c, "vl"), (Math.abs(a.left - o.center) <= 1 || Math.abs(a.center - o.center) <= 1 || Math.abs(a.right - o.center) <= 1) && t(c, "vm"), (Math.abs(a.left - o.right) <= 1 || Math.abs(a.center - o.right) <= 1 || Math.abs(a.right - o.right) <= 1) && t(c, "vr"), (Math.abs(a.top - o.top) <= 1 || Math.abs(a.middle - o.top) <= 1 || Math.abs(a.bottom - o.top) <= 1) && t(c, "ht"), (Math.abs(a.top - o.middle) <= 1 || Math.abs(a.middle - o.middle) <= 1 || Math.abs(a.bottom - o.middle) <= 1) && t(c, "hm"), (Math.abs(a.top - o.bottom) <= 1 || Math.abs(a.middle - o.bottom) <= 1 || Math.abs(a.bottom - o.bottom) <= 1) && t(c, "hb")
            }
        }
    }, pp: {
        init: function () {
            kx.fun.pp.setFileName(), kx.fun.pp.setPagesize(), kx.fun.pp.setBaseInfo(), kx.fun.pp.getLeftScale(), kx.fun.pp.creatLeftPrint(), kx.fun.pp.getRightScale();
            var e = kx.cache.scale[1] / kx.cache.scale[0];
            kx.fun.pp.creatRightPrint(kx.cache.editorWidth, kx.cache.editorHeight, kx.cache.editorBleed, e, 1), kx.fun.pp.winsize()
        }, setFileName: function () {
            var e = CONFIG.NAME || "点击设置文件名";
            $("#j-ename").find("span").html(e)
        }, setBaseInfo: function () {
            CONFIG.WIDTH = parseInt(CONFIG.WIDTH), CONFIG.HEIGHT = parseInt(CONFIG.HEIGHT), kx.cache.wwidth = $(window).width(), kx.cache.wheight = $(window).height(), kx.cache.pwidth = kx.cache.wwidth - kx.cache.lwidth, kx.cache.pheight = kx.cache.wheight - kx.cache.theight, "px" == CONFIG.UNIT.toLowerCase() ? (kx.cache.editorWidth = CONFIG.WIDTH, kx.cache.editorHeight = CONFIG.HEIGHT, kx.cache.editorBleed = CONFIG.BLEED) : (kx.cache.editorWidth = Math.round(kx.comm.mm2px(CONFIG.WIDTH).x), kx.cache.editorHeight = Math.round(kx.comm.mm2px(CONFIG.HEIGHT).x), kx.cache.editorBleed = Math.round(kx.comm.mm2px(CONFIG.BLEED).x))
        }, winsize: function () {
            $(window).resize(function (e) {
                !$(e.target).hasClass("ui-resizable")
            })
        }, getFullScale: function () {
            var e = kx.cache.pwidth * kx.cache.fullscale[0], t = kx.cache.pheight * kx.cache.fullscale[1], a = e / kx.cache.editorWidth, i = t / kx.cache.editorHeight;
            kx.cache.scale[1] = Math.min(a, i)
        }, getLeftScale: function () {
            kx.cache.scale[3] = kx.cache.lcontentwidth / kx.cache.editorWidth
        }, getPreviewScale: function () {
            var e = $(window).width(), t = $(window).height();
            kx.cache.scale[5] = .9 * Math.min(e / kx.cache.editorWidth, t / kx.cache.editorHeight), kx.cache.scale[4] = kx.cache.scale[1], kx.cache.scale[1] = kx.cache.scale[5]
        }, getRightScale: function () {
            1 == kx.cache.actual ? (kx.cache.scale[1] = 1, CONFIG.RADIO = 1) : (kx.fun.pp.getFullScale(), "wxgzhfmxt" == $("#j-product").val() && (kx.cache.scale[1] = 2), CONFIG.RADIO = kx.cache.scale[1]), $("#j-ezoomin").find(".text").html(Math.round(100 * kx.cache.scale[1]) + "%")
        }, loadPage: function (e, t, a, i, c) {
            kx.fun.pr.text(e, t, a, i.etext, 0, c), kx.fun.pr.pic(e, t, a, i.epic), kx.fun.pr.bg(e, t, a, i.ebg), kx.fun.pr.el(e, t, a, i.eel)
        }, chkpage: function () {
            CONFIG.PAGES.length >= CONFIG.MAXPAGES ? ($("#j-addpage").addClass("disabled").off("click"), $("#j-eleftPrint").off("click", ".j-copypage").find(".j-copypage").addClass("disabled")) : ($("#j-eleftPrint").find(".j-uppage,.j-downpage,.j-delpage,.j-copypage").removeClass("disabled"), $("#j-left_" + CONFIG.PAGES[0] + "_page").find(".j-uppage").addClass("disabled"), $("#j-left_" + CONFIG.PAGES[CONFIG.PAGES.length - 1] + "_page").find(".j-downpage").addClass("disabled"), $("#j-addpage").off("click").on("click", function () {
                kx.epage.add()
            }).removeClass("disabled"), $("#j-eleftPrint").off("click", ".j-uppage").on("click", ".j-uppage", function () {
                var e = $(this).attr("data-pageid");
                kx.epage.order(e, -1)
            }), $("#j-eleftPrint").off("click", ".j-copypage").on("click", ".j-copypage", function () {
                var e = $(this).attr("data-pageid");
                kx.epage.copy(e)
            }), $("#j-eleftPrint").off("click", ".j-downpage").on("click", ".j-downpage", function () {
                var e = $(this).attr("data-pageid");
                kx.epage.order(e, 1)
            }), 1 == CONFIG.PAGES.length ? $("#j-eleftPrint").off("click", ".j-delpage").find(".j-delpage").addClass("disabled") : $("#j-eleftPrint").off("click", ".j-delpage").on("click", ".j-delpage", function () {
                var e = $(this).attr("data-pageid");
                kx.epage.del(e)
            }))
        }, creatPrintFun: function (e, t, a, i, c, o, n, d) {
            var s = "", l = c * o, r = a * o, h = i * o, p = (a - 2 * c) * o, x = (i - 2 * c) * o, f = (i - c) * o;
            "left" == e ? t = "left_" + t : "preview" == e && (t = "preview_" + t);
            var g = function () {
                var e = "";
                return e += '<div class="em-pbleed ' + t + '_pbleed" id="j-' + t + '_bleed" data-pageid="' + t + '" style="width:' + r + 'px;height:0px;">', e += '   <div class="xt" style="width:' + p + "px;height:1px;top:" + l + "px;left:" + l + 'px;"></div>', e += '   <div class="xr" style="width:1px;height:' + x + "px;top:" + l + "px;right:" + l + 'px;"></div>', e += '   <div class="xb" style="width:' + p + "px;height:1px;top:" + f + "px;left:" + l + 'px;"></div>', e += '   <div class="xl" style="width:1px;height:' + x + "px;top:" + l + "px;left:" + l + 'px;"></div>', e += "</div>"
            }, k = "";
            return k = "1" == n ? "rightAnimate" : "", d || (s += '<div class="em-pwrap ' + t + "_wrap " + k + '" id="j-' + t + '_wrap" data-pageid="' + t + '" style="width:' + r + "px;height:" + h + 'px;">'), CONFIG.BLEED > 0 && "right" == e && (s += g()), s += '<div class="em-pcontent ' + t + '_content" id="j-' + t + '_content" data-pageid="' + t + '" style="width:' + r + "px;height:" + h + "px;top:0px;left:0px;padding:" + l + 'px;"></div>', "left" == e && (s += '<div class="em-pmask ' + t + '_mask" id="j-' + t + '_mask" data-pageid="' + t + '"></div>', s += '<div class="em-ppage ' + t + '_page" id="j-' + t + '_page" data-pageid="' + t + '">', s += '  <div class="up j-uppage" data-pageid="' + t + '"><i></i><span>画布上移</span></div>', s += '  <div class="copy j-copypage" data-pageid="' + t + '"><i></i><span>复制页面</span></div><div class="del j-delpage" data-pageid="' + t + '"><i></i><span>删除页面</span></div>', s += '  <div class="down j-downpage" data-pageid="' + t + '"><i></i><span>画布下移</span></div>', s += "</div>"), d || (s += "</div>"), s
        }, creatLeftPrint: function (e) {
            var t = kx.cache.lcontentwidth, a = kx.cache.scale[3] / kx.cache.scale[2], i = kx.cache.editorHeight * a, c = kx.cache.editorBleed * a;
            if ($("#j-eleftPrint").attr("data-pclick", "0"), e)$("#j-left_" + kx.editPage + "_wrap").html(""), $("#j-left_" + kx.editPage + "_wrap").html(kx.fun.pp.creatPrintFun("left", kx.editPage, t / a, i / a, c, a, "", 1)), kx.fun.pp.loadPage("left", kx.editPage, a, EDITDATA[kx.editPage]); else {
                $("#j-eleftPrint").html("");
                for (var o = 0; o < CONFIG.PAGES.length; o++)$("#j-eleftPrint").append(kx.fun.pp.creatPrintFun("left", CONFIG.PAGES[o], t / a, i / a, c, a, "")), kx.fun.pp.loadPage("left", CONFIG.PAGES[o], a, EDITDATA[CONFIG.PAGES[o]], !0);
                if ($("#j-left_" + kx.editPage + "_wrap").addClass("active"), CONFIG.ADDPAGE) {
                    var n = '<div class="em-padd" id="j-addpage" style="width:' + kx.cache.lcontentwidth + 'px;"><span>添加一个新画布</span></div>';
                    $("#j-eleftPrint").append(n)
                }
            }
            kx.fun.pp.chkpage()
        }, creatRightPrint: function (e, t, a, i, c) {
            $("#j-rightPannel").css(t * i > kx.cache.pheight || e * i > kx.cache.pwidth ? {overflow: "auto"} : {overflow: "hidden"}), $("#j-editorPrint").html(""), $("#j-editorPrint").css({
                "padding-top": Math.floor(.5 * (kx.cache.pheight - Math.ceil(t * i))) - 1,
                "padding-right": Math.floor(.5 * (kx.cache.pwidth - Math.ceil(e * i))) - 1,
                "padding-bottom": Math.floor(.5 * (kx.cache.pheight - Math.ceil(t * i))) - 1,
                "padding-left": Math.floor(.5 * (kx.cache.pwidth - Math.ceil(e * i))) - 1
            }), $("#j-editorPrint").append(kx.fun.pp.creatPrintFun("right", kx.editPage, e, t, a, i, c)), kx.fun.pp.loadPage("right", kx.editPage, i, EDITDATA[kx.editPage]);
            var o = 0;
            o = .5 * (kx.cache.editorWidth * i - kx.cache.pwidth + parseInt($("#j-editorPrint").css("padding-left"))), $("#j-rightPannel").scrollLeft(o)
        }, creatPreviewPrint: function (e) {
            e -= 1;
            var t = $("#j-fullScreen").find(".previewContent");
            t.html(""), t.html(kx.fun.pp.creatPrintFun("preview", CONFIG.PAGES[e], kx.cache.editorWidth, kx.cache.editorHeight, kx.cache.editorBleed, kx.cache.scale[5])), kx.fun.pp.loadPage("preview", CONFIG.PAGES[e], kx.cache.scale[5], EDITDATA[CONFIG.PAGES[e]])
        }, creatNewPrint: function (e, t, a, i, c, o, n) {
            e = e.replace("left_", "");
            var d = kx.fun.pp.creatPrintFun("left", e, a, i, c, o, 0);
            "firstPage" == t ? $("#j-eleftPrint").prepend(d) : "lastPage" == t ? $("#j-addpage")[0] ? $("#j-addpage").before(d) : $("#j-eleftPrint").append(d) : (t = "left_" + t.replace("left_", ""), $("#j-" + t + "_wrap").after(d)), kx.fun.pp.loadPage("left", e, o, n), kx.fun.pp.setCurrentPage(e), kx.fun.pp.chkpage()
        }, setCurrentPage: function (e) {
            kx.fun.comm.hidden();
            var t = e.replace("left_", "");
            kx.editPage = t;
            for (var a = 0; a < CONFIG.PAGES.length; a++)CONFIG.PAGES[a] == kx.editPage ? $("#j-left_" + CONFIG.PAGES[a] + "_wrap").addClass("active") : $("#j-left_" + CONFIG.PAGES[a] + "_wrap").removeClass("active");
            var i = kx.cache.scale[1] / kx.cache.scale[0];
            kx.fun.pp.creatRightPrint(kx.cache.editorWidth, kx.cache.editorHeight, kx.cache.editorBleed, i), kx.fun.comm.getMaxzindex(t), kx.fun.pl.bg(t);
            var c = $("#j-left_" + kx.editPage + "_wrap").removeClass("rightAnimate").offset().top + $("#j-etplBox").scrollTop();
            $("#j-etplBox").animate({scrollTop: c - 145}, 300)
        }, setPagesize: function (e, t, a) {
            e = e || CONFIG.WIDTH, t = t || CONFIG.HEIGHT, a = a || CONFIG.UNIT;
            var i = "px" == a ? "像素" : "毫米", c = $("#j-esizeBox");
            $("#j-esize").find("span.unit").html(i), c.find("span.width").html(e), c.find("span.height").html(t), $("#j-esizeWidth").val(e), $("#j-esizeHeight").val(t), c.find("span.unit").html(i)
        }, saveas: function () {
            kx.fun.comm.hidden();
            var e = $("#j-mode").val();
            $.post("/editor/getMemberGoodsFolder.html", function (t) {
                var a = "";
                a += '<div class="saveasDialog" id="j-saveasmsg">', a += '  <div class="saveasBox">', 1 != e && (a += '    <div class="item">', a += "    <span>保存在</span>", a += '    <select name="saveAsFolder" id="j-saveAsFolder">', a += '      <option value="0">图帮主 > 我的设计</option>', $.each(t, function (e, t) {
                    a += '      <option value="' + t.id + '">图帮主 > ' + t.name + "</option>"
                }), a += "    </select>", a += "    </div>"), a += '    <div class="item item_1">', a += "    <span>文件名</span>", a += '    <input type="text" name="saveAsName" id="j-saveAsName" placeholder="给文件命名" />', a += "    </div>", a += "  </div>", a += '  <div class="saveasBot"><a href="javascript:void(0)" class="ok" data-method="getData">确定</a><a href="javascript:void(0)" class="cancel">取消</a></div>', a += "</div>";
                var i = layer.open({
                    type: 1,
                    title: "另存为",
                    maxWidth: 500,
                    skin: "m-cardLayer",
                    content: a,
                    success: function (e) {
                        e.find(".ok").on("click", function () {
                            kx.backopt.save("saveAs"), layer.close(i)
                        }), e.find(".cancel").on("click", function () {
                            layer.close(i)
                        })
                    }
                })
            }, "JSON")
        }
    }, pr: {
        text: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)if (ntarget = 1 == c ? "etext_" + kx.comm.radomid() : i[n][0], "left" == e && ("left" != e || 1 != o) || $("#j-editorSelect").hasClass("multisel") || 1 == i[n][1].multi)kx.fun.comm.insert(e, t, a, "etext", ntarget, i[n][1], function () {
            }); else {
                var d = $.extend(!0, {}, i[n][1]), s = kx.etext.additag(d.ftext, d.linebreak, !0);
                d.ftextold = d.ftext, d.ftext = s, kx.etext.getWh(ntarget, d, function (i, c, o, n) {
                    var d = n.width - i, s = n.left;
                    "center" == n.falign ? s += d / 2 : "right" == n.falign && (s += d);
                    kx.edata.edit(t, "etext", o, {version: "-1", left: s, width: i, height: c, subject: "subject"});
                    "justify" == n.falign && (n.ftext = n.ftextold), n.left = s, n.width = i, n.height = c, kx.fun.comm.insert(e, t, a, "etext", o, n, function () {
                    })
                })
            }
        }, pic: function (e, t, a, i, c) {
            for (var o = ($("#j-" + t + "_wrap")[0], ""), n = 0; n < i.length; n++)o = 1 == c ? "epic_" + kx.comm.radomid() : i[n][0], kx.fun.comm.insert(e, t, a, "epic", o, i[n][1], function () {
            })
        }, bg: function (e, t, a, i) {
            for (var c = 0; c < i.length; c++)kx.fun.comm.insert(e, t, a, "ebg", i[c][0], i[c][1], function () {
            })
        }, el: function (e, t, a, i, c) {
            for (var o = "", n = 0; n < i.length; n++)o = 1 == c ? "el_" + kx.comm.radomid() : i[n][0], kx.fun.comm.insert(e, t, a, "eel", o, i[n][1], function () {
            })
        }
    }, pl: {
        init: function () {
            kx.fun.pl.leftBoxHeight(), kx.fun.pl.text(), kx.fun.pl.pic(), kx.fun.pl.bg(), kx.fun.pl.tpl(), kx.fun.pl.el()
        }, leftBoxHeight: function () {
            var e = kx.cache.wheight - kx.cache.theight;
            $("#j-egleft,#j-rightPannel,#j-menu,#j-menuBox").css({height: e}), $("#j-esubBox").css({
                height: 6 * e,
                "margin-top": 5 * -e
            }), $("#j-menuActivebg").css({top: 335}), $("#j-esearchBox,#j-etextBox,#j-epicBox,#j-ebgBox,#j-etplBox,#j-eelBox,#j-esubRightBox").css({
                display: "block",
                height: e
            })
        }, text: function () {
            kx.backopt.getArtFontAjax(), kx.fun.comm.infinitescroll("etext")
        }, pic: function () {
            kx.backopt.getPicAjax("sort1")
        }, bg: function (e) {
            e = e || kx.editPage;
            var t = "", a = kx.edata.get(e, "ebg", "ebg")[1];
            a.color && "" != a.color || (a.color = "ffffff");
            for (var i = 0; i < kx.default.color.length; i++)t += kx.default.color[i].toLowerCase() == a.color.toLowerCase() ? '<li class="li' + i + ' active" data-color="' + kx.default.color[i].toLowerCase() + '"><i style="background-color:#' + kx.default.color[i] + '"></i></li>' : '<li class="li' + i + '" data-color="' + kx.default.color[i].toLowerCase() + '"><i style="background-color:#' + kx.default.color[i] + '"></i></li>';
            $("#j-bgcList").html(t), kx.ebg.initbg(e, a), kx.backopt.getBgAjax(), kx.fun.comm.infinitescroll("ebg")
        }, tpl: function () {
            kx.backopt.getTplAjax(), kx.fun.comm.infinitescroll("etpl")
        }, el: function () {
        }
    }, po: {
        init: function () {
            this.fullpage()
        }, fullpage: function () {
            0 == kx.cache.actual ? $("#j-efull").removeClass("real").addClass("full").attr("data-full", "1") : $("#j-efull").addClass("real").removeClass("full").attr("data-full", "0")
        }
    }, ep: {
        init: function () {
            $("#j-rightPannel").on("mouseup dblclick", function (e) {
                kx.fun.ep.rinitFun(e)
            }), $(document).on("click", function (e) {
                kx.fun.ep.initFun(e)
            }), $("#j-egleft,#j-editor .eg-top").on("click", function () {
                var e = $("#j-bgcdiy").attr("data-usedcolor");
                e && -1 == kx.comm.findary(CONFIG.BGUSEDCOLOR, e) && kx.comm.maxary(CONFIG.BGUSEDCOLOR, 7, e), kx.ebg.initusedbg(), $("#j-diyColor").hide()
            }), this.ekey()
        }, rinitFun: function (e) {
            kx.fun.comm.getNodeClick(), $("#j-eleftPrint").attr("data-pclick", "0"), 0 != kx.cache.through[0] ? $("#" + kx.cache.through[0]).trigger("dblclick" == e.type ? "kxdbclick" : "kxclick") : kx.fun.comm.hidden()
        }, initFun: function () {
            kx.fun.et._topdrop()
        }, rp: {
            eoff: function () {
                $("#j-rightPannel").off("mouseup")
            }, eon: function () {
                setTimeout(function () {
                    $("#j-rightPannel").on("mouseup", function (e) {
                        kx.fun.ep.rinitFun(e)
                    })
                }, 200)
            }
        }, ekeyFun: function (e) {
            var t = e.keyCode;
            if (27 == t || 33 == t || 34 == t || 122 == t || 37 == t || 38 == t || 39 == t || 40 == t || 46 == t || 90 == t || 83 == t || 67 == t || 86 == t || 86 == t || 70 == t || 221 == t || 219 == t || 48 == t || 96 == t || 49 == t || 97 == t || 50 == t || 98 == t || 51 == t || 99 == t || 52 == t || 100 == t || 53 == t || 101 == t || 54 == t || 102 == t || 55 == t || 103 == t || 56 == t || 104 == t || 57 == t || 105 == t || 99 == t || 187 == t || 189 == t || e.ctrlKey || e.shiftKey) {
                if (!kx.cache.fullScreen && kx.cache.multiselected.length > 0) {
                    if (37 == t || 38 == t || 39 == t || 40 == t) {
                        kx.fun.comm.hidden(1), kx.his.temp.init();
                        for (var a = 0; a < kx.cache.multiselected.length; a++) {
                            var i = $("#" + kx.cache.multiselected[a]), c = i.attr("data-pageid"), o = i.attr("data-type"), n = i.attr("data-target"), d = kx.edata.get(c, o, n);
                            kx.his.temp.addold({
                                histype: "move",
                                pageid: c,
                                scale: kx.cache.scale[1] / kx.cache.scale[0],
                                type: o,
                                target: n,
                                attr: "move_" + o,
                                odata: d[1]
                            });
                            var s = 1;
                            switch (e.shiftKey && (s = 10), t) {
                                case 37:
                                    var l = parseInt(i.css("left"));
                                    i.css("left", l - s + "px"), 0 == a && $("#j-editorSelect").css("left", parseInt($("#j-editorSelect").css("left")) - s + "px");
                                    break;
                                case 39:
                                    var l = parseInt(i.css("left"));
                                    i.css("left", l + s + "px"), 0 == a && $("#j-editorSelect").css("left", parseInt($("#j-editorSelect").css("left")) + s + "px");
                                    break;
                                case 38:
                                    var r = parseInt(i.css("top"));
                                    i.css("top", r - s + "px"), 0 == a && $("#j-editorSelect").css("top", parseInt($("#j-editorSelect").css("top")) - s + "px");
                                    break;
                                case 40:
                                    var r = parseInt(i.css("top"));
                                    i.css("top", r + s + "px"), 0 == a && $("#j-editorSelect").css("top", parseInt($("#j-editorSelect").css("top")) + s + "px")
                            }
                        }
                    }
                    if (46 == t && 0 == $("#j-eleftPrint").attr("data-pclick") && kx.editor.del(kx.editPage), 90 == t && e.ctrlKey && (e.shiftKey ? (kx.fun.comm.hidden(1), kx.his.act("redo")) : (kx.fun.comm.hidden(1), kx.his.act("back"))), 83 == t && e.ctrlKey && (e.shiftKey ? $("#j-esaveas").trigger("click") : $("#j-esave").trigger("click")), 67 == t && e.ctrlKey && "none" == $("#j-editText").css("display") && kx.editor.copyobj(), 86 == t && e.ctrlKey && 0 == $("#j-eleftPrint").attr("data-pclick") && "none" == $("#j-editText").css("display") && kx.editor.objcopy(), 70 == t && e.ctrlKey && kx.editor.objcopy(1), 221 == t && e.ctrlKey) {
                        var h = parseInt($("#" + kx.cache.selected.target).css("z-index"));
                        if (e.shiftKey)for (var p = 0; p < h - kx.cache.zindex[kx.cache.selected.pageid][1]; p++)kx.editor.order(kx.cache.selected.pageid, 1); else h > 1 && kx.editor.order(kx.cache.selected.pageid, 1)
                    }
                    if (219 == t && e.ctrlKey) {
                        var h = parseInt($("#" + kx.cache.selected.target).css("z-index"));
                        if (e.shiftKey)for (var p = 0; p < h - kx.cache.zindex[kx.cache.selected.pageid][1]; p++)kx.editor.order(kx.cache.selected.pageid, -1); else h > 1 && kx.editor.order(kx.cache.selected.pageid, -1)
                    }
                    48 == t || 96 == t ? kx.editor.opacity(kx.editPage, 100) : 49 == t || 97 == t ? kx.editor.opacity(kx.editPage, 10) : 50 == t || 98 == t ? kx.editor.opacity(kx.editPage, 20) : 51 == t || 99 == t ? kx.editor.opacity(kx.editPage, 30) : 52 == t || 100 == t ? kx.editor.opacity(kx.editPage, 40) : 53 == t || 101 == t ? kx.editor.opacity(kx.editPage, 50) : 54 == t || 102 == t ? kx.editor.opacity(kx.editPage, 60) : 55 == t || 103 == t ? kx.editor.opacity(kx.editPage, 70) : 56 == t || 104 == t ? kx.editor.opacity(kx.editPage, 80) : (57 == t || 105 == t) && kx.editor.opacity(kx.editPage, 90)
                }
                46 == t && 1 == $("#j-eleftPrint").attr("data-pclick") && $("#j-eleftPrint").find("div.active").find("div.j-delpage").trigger("click"), 86 == t && e.ctrlKey && 1 == $("#j-eleftPrint").attr("data-pclick") && $("#j-eleftPrint").find("div.active").find("div.j-copypage").trigger("click"), 221 == t && e.ctrlKey && 1 == $("#j-eleftPrint").attr("data-pclick") && $("#j-eleftPrint").find("div.active").find("div.j-uppage").trigger("click"), 219 == t && e.ctrlKey && 1 == $("#j-eleftPrint").attr("data-pclick") && $("#j-eleftPrint").find("div.active").find("div.j-downpage").trigger("click"), "none" != $("#j-fullScreen").css("display") && ((33 == t || 37 == t || 38 == t) && $("#j-fullScreen").find(".prev").trigger("click"), (34 == t || 39 == t || 40 == t) && $("#j-fullScreen").find(".next").trigger("click")), 187 == t && e.ctrlKey && $("#j-ezoomin").find(".zoom").trigger("click"), 189 == t && e.ctrlKey && $("#j-ezoomin").find(".scale").trigger("click"), (48 == t || 96 == t) && e.ctrlKey && $("#j-efull").attr("data-full", 1).trigger("click")
            }
        }, ekey: function () {
            $(document).off("keydown").on("keydown", function (e) {
                kx.fun.ep.ekeyFun(e);
                var t = e.keyCode;
                if (!kx.cache.fullScreen) {
                    if (37 == t || 38 == t || 39 == t || 40 == t)return !1;
                    if ((187 == t || 189 == t || 48 == t || 96 == t) && e.ctrlKey)return !1
                }
            }).off("keyup").on("keyup", function (e) {
                var t = e.keyCode;
                if (!kx.cache.fullScreen && (37 == t || 38 == t || 39 == t || 40 == t)) {
                    for (var a = 0; a < kx.cache.multiselected.length; a++) {
                        var i = $("#" + kx.cache.multiselected[a]), c = i.attr("data-pageid"), o = i.attr("data-type"), n = i.attr("data-target"), d = kx.cache.scale[1] / kx.cache.scale[0], s = parseInt(i.css("top")) / d, l = parseInt(i.css("left")) / d, r = kx.edata.edit(c, o, n, {
                            top: s,
                            left: l
                        });
                        kx.his.temp.addnew({
                            histype: "move",
                            pageid: c,
                            scale: kx.cache.scale[1] / kx.cache.scale[0],
                            type: o,
                            target: n,
                            attr: "move_" + o,
                            ndata: r[1],
                            cnum: a,
                            tnum: kx.cache.multiselected.length
                        })
                    }
                    return !1
                }
            })
        }
    }, et: {
        init: function () {
            this.back(), this.redo(), this.preview(), this.save(), this.saveas(), this.share(), this.download(), this.print(), this.editsize(), this.editname(), this.loginbox()
        }, back: function () {
            $("#j-eback").on("click", function () {
                kx.his.act("back")
            })
        }, redo: function () {
            $("#j-eredo").on("click", function () {
                kx.his.act("redo")
            })
        }, preview: function () {
            $("#j-epreview").on("click", function () {
                var e = $("#j-fullScreen"), t = e.find(".page"), a = e.find(".prev"), i = e.find(".next"), c = function (e, a) {
                    a = parseInt(a), a >= e ? t.attr("data-page", 1) : t.attr("data-page", a), 0 >= a ? t.attr("data-page", e) : t.attr("data-page", a), t.html(t.attr("data-page") + " / " + e);
                    var i = parseInt(t.attr("data-page"));
                    CONFIG.PAGES.length > 1 && kx.fun.pp.creatPreviewPrint(i)
                };
                kx.cache.fullScreenNum = 0, e.fullScreen({
                    background: "#000", callback: function () {
                        e.fadeIn(), e.find(".main").hide(), e.find(".foot").hide(), e.find(".waitDialog").show(), kx.fun.comm.hidden(), kx.cache.fullScreenNum % 2 == 0 ? (kx.cache.fullScreen = !0, kx.fun.pp.getPreviewScale(), kx.cache.fullScreenNum++, setTimeout(function () {
                            kx.fun.pp.creatPreviewPrint(1), t.attr({
                                "data-page": "1",
                                "data-tpage": CONFIG.PAGES.length
                            }).html("1 / " + CONFIG.PAGES.length), e.find(".waitDialog").hide(), e.find(".main").show(), e.find(".foot").show()
                        }, 500)) : (kx.cache.scale[1] = kx.cache.scale[4], kx.cache.fullScreen = !1)
                    }
                }), e.off("click").on("click", function (e) {
                    i.trigger("click"), e.stopPropagation()
                }), a.off("click").on("click", function (e) {
                    var a = parseInt(t.attr("data-page")), i = parseInt(t.attr("data-tpage"));
                    0 >= a && (a = i, t.attr("data-page", i)), c(i, a - 1), e.stopPropagation()
                }), i.off("click").on("click", function (e) {
                    var a = parseInt(t.attr("data-page")), i = parseInt(t.attr("data-tpage"));
                    a >= i && (a = 0, t.attr("data-page", 0)), c(i, a + 1), e.stopPropagation()
                }), $("#j-escFullScreen").off("click").on("click", function (t) {
                    return kx.cache.fullScreen = !1, e.hide(), e.cancelFullScreen(), t.stopPropagation(), !1
                })
            })
        }, saveas: function () {
            $("#j-esaveas").on("click", function () {
                kx.fun.pp.saveas()
            })
        }, save: function () {
            $("#j-esave").on("click", function () {
                kx.backopt.save("save")
            })
        }, _topdrop: function (e) {
            for (var t = ["esize", "eprint", "eprintDisabled", "edown", "eshare"], a = 0; a < t.length; a++)t[a] == e ? "none" == $("#j-" + e + "Box").css("display") ? $("#j-" + e + "Box").show() : $("#j-" + e + "Box").hide() : $("#j-" + t[a] + "Box").hide();
            $("#j-" + e + "Box").off("click").on("click", function (e) {
                e.stopPropagation()
            })
        }, share: function () {
            $("#j-eshare").on("click", function (e) {
                if (!$(this).hasClass("disabled")) {
                    var t = $("#j-mgId").val();
                    t > 0 ? (kx.fun.et._topdrop("eshare"), $("#j-eshareBox").find(".j-shareUrl").click(function () {
                        $(this).attr("contenteditable", !0)
                    }).blur(function () {
                        $(this).attr("contenteditable", !1)
                    }), $(".j-copyShareUrl").zclip({
                        path: THEMES_URL + "plugin/jquery.zclip/ZeroClipboard.swf",
                        copy: function () {
                            return $(this).attr("data")
                        },
                        beforeCopy: function () {
                        },
                        afterCopy: function () {
                            $.alert("分享地址已成功复制到剪切板")
                        }
                    }), $("#j-eshareBox").find(".sendBtn").on("click", function () {
                        var e = $("#j-eshareBox").find("input").val(), t = kx.comm.chkemail(e);
                        t ? kx.backopt.sendmail(e) : $("#j-eshareBox").find(".sendmailErr").html("邮件格式不正确").show(), $("#j-eshareBox").find("input").focus(function () {
                            $("#j-eshareBox").find(".sendmailErr").html("").hide()
                        })
                    })) : $.alert("您的模板尚未保存，请先保存再分享"), e.stopPropagation()
                }
            })
        }, download: function () {
            $("#j-edown").on("click", function (e) {
                kx.fun.et._topdrop("edown"), e.stopPropagation()
            }), $("#j-edownBtn").on("click", function () {
                var e = $("#j-edownSelect").val();
                kx.backopt.preview("pdf" == e ? "downloadPdf" : "png" == e ? "downloadPng" : "downloadJpg")
            })
        }, print: function () {
            "zhanjia" == $("#j-product").val() ? ($("#j-eprint").on("click", function (e) {
                kx.fun.et._topdrop("eprint"), e.stopPropagation()
            }), $("#j-eprintBtn").on("click", function () {
                var e = $("#j-eprintSelect").val();
                kx.backopt.save("buy", e)
            })) : $("#j-eprint").on("click", function (e) {
                $(this).hasClass("disabled") ? (kx.fun.et._topdrop("eprintDisabled"), e.stopPropagation()) : kx.backopt.save("buy")
            })
        }, editsize: function () {
            $("#j-esize").on("click", function (e) {
                kx.fun.pp.setPagesize(), kx.fun.et._topdrop("esize"), e.stopPropagation(), CONFIG.SIZEABLE ? ($("#j-sizeChangeBox").show(), $("#j-sizeNoChangeBox").hide(), "px" == CONFIG.UNIT ? ($("#j-sizeInfoPx").show(), $("#j-sizeInfoMm").hide()) : ($("#j-sizeInfoPx").hide(), $("#j-sizeInfoMm").show())) : ($("#j-sizeChangeBox").hide(), $("#j-sizeNoChangeBox").show())
            }), $("#j-esizeWidth").on("keydown", function (e) {
                return e.keyCode >= 48 && e.keyCode <= 57 || event.keyCode >= 96 && event.keyCode <= 105 || 46 == event.keyCode || 8 == event.keyCode || 37 == e.keyCode || 39 == e.keyCode || 9 == e.keyCode ? (e.stopPropagation(), !0) : (e.stopPropagation(), !1)
            }), $("#j-esizeHeight").on("keydown", function (e) {
                return e.keyCode >= 48 && e.keyCode <= 57 || event.keyCode >= 96 && event.keyCode <= 105 || 46 == event.keyCode || 8 == event.keyCode || 37 == e.keyCode || 39 == e.keyCode || 9 == e.keyCode ? (e.stopPropagation(), !0) : (e.stopPropagation(), !1)
            }), $("#j-esizeBtn").on("click", function (e) {
                kx.fun.comm.hidden();
                var t = parseInt($("#j-esizeWidth").val()) || 40, a = parseInt($("#j-esizeHeight").val()) || 40;
                "px" == CONFIG.UNIT ? 40 > t || t > 5e3 ? alert("宽度值为100-5000像素") : 40 > a || a > 5e3 ? alert("高度值为40-5000像素") : kx.epage.setSize(t, a) : 15 > t || t > 1e3 ? alert("宽度值为15-1000毫米") : 15 > a || a > 1e3 ? alert("高度值为15-1000毫米") : (t = Math.ceil(kx.comm.mm2px(t).x), a = Math.ceil(kx.comm.mm2px(a).y), kx.epage.setSize(t, a)), $("#j-esizeBox").hide(), e.stopPropagation()
            })
        }, editname: function () {
            $("#j-ename").on("click", function (e) {
                var t = $(this), a = t.find("span");
                "true" != a.attr("contenteditable") && (t.addClass("active"), a.attr("contenteditable", "true").focus(), kx.comm.selection(a[0])), e.stopPropagation()
            }).on("blur", "span", function () {
                $(this).parent().removeClass("active"), $(this).attr("contenteditable", "false"), kx.backopt.setEditName()
            })
        }, loginbox: function () {
            $(".j-diyRegister").on("click", function () {
                bindFx($("#modal-layer"), "fade-in", !0), bindFx($("#register-box"), "fade-in-up", !0)
            }), $(".j-diyLogin").on("click", function () {
                bindFx($("#modal-layer"), "fade-in", !0), bindFx($("#login-box"), "fade-in-up", !0)
            })
        }
    }, el: {
        init: function () {
            this.comm.goback(), this.comm.item(), this.comm.copyclick(), this.menu.search(), this.menu.text(), this.menu.pic(), this.menu.bg(), this.menu.tpl(), this.menu.el(), this.menu.feed(), this.search.sinput(), this.text.addp(), this.text.addps(), this.pic.upload(), this.pic.sortList(), this.pic.delpic(), this.bg.upload(), this.bg.bgpic(), this.bg.addcolor(), this.bg.diycolor(), this.tpl.tab(), this.tpl.multi(), this.el.sortList()
        }, comm: {
            goback: function () {
                $("#j-goback").off("click").on("click", function () {
                    $("#j-esubBox").animate({"margin-left": 0}, 200), $("#j-esubRightBox").animate({left: "309px"}, 200), $("#j-searchFix").animate({"margin-left": 0}, 200)
                })
            }, item: function () {
                $("#j-menuBox").off("click", "li.j-iteminsert").on("click", "li.j-iteminsert", function () {
                    var e = $(this), t = e.attr("data-itype"), a = e.attr("data-iid"), i = "", c = kx.cache.scale[1] / kx.cache.scale[0], o = kx.backopt.getAjaxdata(a, t);
                    o.zindex = kx.cache.zindex[kx.editPage][0] + 1;
                    var n = .75 * $("#j-" + kx.editPage + "_wrap").width(), d = .75 * $("#j-" + kx.editPage + "_wrap").height();
                    if (n / o.width * o.height > d ? (o.width = d / o.height * o.width, o.height = d) : (o.height = n / o.width * o.height, o.width = n), o.width = o.width / c, o.height = o.height / c, o.top = .5 * (d / .75 / c - o.height), o.left = .5 * (n / .75 / c - o.width), "epic" == t ? i = "epic_" + kx.comm.radomid() : "eel" == t && (i = "eel_" + kx.comm.radomid()), "ebg" == t) {
                        var s = {url: o.url, show: 1};
                        kx.fun.el.comm.add(kx.editPage, c, t, "ebg", s)
                    } else kx.fun.el.comm.add(kx.editPage, c, t, i, o)
                }).off("click", "li.j-tplinsert").on("click", "li.j-tplinsert", function () {
                    for (var e = $(this), t = e.attr("data-iid"), a = $.extend(!0, {}, EDITDATA[kx.editPage]), i = kx.cache.scale[1] / kx.cache.scale[0], c = kx.backopt.getTplData(t), o = 0; o < c.etext.length; o++)c.etext[o][0] = "etext_" + kx.comm.radomid();
                    for (var o = 0; o < c.epic.length; o++)c.epic[o][0] = "epic_" + kx.comm.radomid();
                    for (var o = 0; o < c.eel.length; o++)c.eel[o][0] = "eel_" + kx.comm.radomid();
                    EDITDATA[kx.editPage] = c, $("#j-" + kx.editPage + "_content").html(""), kx.fun.comm.hidden(), kx.fun.pp.loadPage("right", kx.editPage, i, c), kx.his.temp.init(), kx.his.temp.addold({
                        histype: "addtpl",
                        pageid: kx.editPage,
                        scale: i,
                        type: "addtpl",
                        target: "addtpl",
                        attr: "addtpl",
                        odata: a
                    }), kx.his.temp.addnew({
                        histype: "addtpl",
                        pageid: kx.editPage,
                        scale: i,
                        type: "addtpl",
                        target: "addtpl",
                        attr: "addtpl",
                        ndata: c,
                        cnum: 0,
                        tnum: 1
                    }), kx.fun.pp.creatLeftPrint(kx.editPage)
                })
            }, copyclick: function () {
                var e = function (e, t) {
                    t = t || "1_1";
                    var a = "";
                    a += '<div class="em-copyMsg" id="j-copyMsg">', a += '	<div class="line line_' + t + '"></div>', a += '	<div class="msgtop f-clearfix">', a += '		<div class="tl"><img src="' + e.uphoto + '"></div>', a += '		<div class="tr">', a += "etpl" == e.type ? '			<div class="txt1"><span>上传者：</span><span class="ar"><a target="_blank" href="' + mainUrl + "workTemplateList/" + e.uid + '.html">' + e.username + "</a></span></div>" : '			<div class="txt1"><span>上传者：</span><span class="ar"><a target="_blank" href="' + mainUrl + "workShareList/" + e.uid + '.html">' + e.username + "</a></span></div>", a += '			<div class="txt2">' + e.job + "</div>", a += "		</div>", a += "	</div>", e.tags && (a += '	<div class="msgbot">', a += '		<div class="title">关键词</div>', a += '		<div class="info">' + e.tags + "</div>", a += "	</div>"), a += '	<a href="javascript:;" class="close"></a>', a += "</div>", $("#j-copyMsg")[0] && $("#j-copyMsg").remove(), $("body").append(a), $("#j-copyMsg").find("a.close").on("click", function () {
                        $("#j-copyMsg").remove()
                    })
                };
                $("#j-menuBox").off("click", "span.eu-copy").on("click", "span.eu-copy", function (t) {
                    var a = $(this), i = a.offset(), c = a.attr("data-row"), o = a.parent().attr("data-iid"), n = a.parent().attr("data-itype"), d = "1_1";
                    return d = 3 == c ? i.left < 130 ? "3_1" : i.left >= 130 && i.left < 225 ? "3_2" : "3_3" : 2 == c ? i.left < 165 ? "2_1" : "2_2" : "1_1", $.get("/editor/getCopyrightInfo/type/" + n + "/id/" + o + ".html", function (t) {
                        e(t, d);
                        var a = $("#j-copyMsg");
                        a.css({top: i.top + 22, left: kx.cache.lmenuwidth + 23})
                    }, "JSON"), t.stopPropagation(), !1
                })
            }, add: function (e, t, a, i, c, o) {
                t = t || kx.cache.scale[1] / kx.cache.scale[0], kx.his.temp.init(), "ebg" == a ? ($("#j-bgPicBox").html('<div class="imgw" style="background:url(' + c.url + ') 50% 50% no-repeat;background-size:cover;"></div>'), $("#j-bgPicBox").parent().addClass("hasimg"), $("#j-bgpopt").find(".show").html("隐藏"), $("#j-uploadBgBtnBox").hide(), kx.edata.edit(e, a, i, c)) : kx.edata.add(e, a, i, c), kx.fun.comm.insert("right", e, t, a, i, c, function () {
                    o || (kx.his.temp.addold({
                        histype: "additem",
                        pageid: e,
                        scale: t,
                        type: a,
                        target: i,
                        attr: "additem_" + a,
                        odata: {}
                    }), kx.his.temp.addnew({
                        histype: "additem",
                        pageid: e,
                        scale: t,
                        type: a,
                        target: i,
                        attr: "additem_" + a,
                        ndata: c,
                        cnum: 0,
                        tnum: 1
                    })), $("#" + i).addClass("dropping"), setTimeout(function () {
                        $("#" + i).removeClass("dropping"), "etext" == a && 1 != c.multi && $("#" + i).trigger("mousedown")
                    }, 600), kx.fun.pp.creatLeftPrint(kx.editPage)
                })
            }, addHis: {
                back: function (e, t, a, i) {
                    for (var c = 0; c < i.length; c++)$("#" + i[c]).trigger("mousedown"), kx.editor.del(e[c], 1)
                }, redo: function (e, t, a, i, c, o) {
                    for (var n = 0; n < i.length; n++)kx.edata.add(e[n], a[n], i[n], o[n]), kx.fun.comm.insert("right", e[n], t[n], a[n], i[n], o[n], function () {
                        $("#" + i[n]).trigger("mousedown")
                    })
                }
            }, tplHis: {
                back: function (e, t, a, i, c, o) {
                    for (var n = 0; n < i.length; n++)$("#j-" + e[n] + "_content").html(""), EDITDATA[e[n]] = o[n], kx.fun.pp.loadPage("right", e[n], t[n], o[n])
                }, redo: function (e, t, a, i, c, o) {
                    for (var n = 0; n < i.length; n++)$("#j-" + e[n] + "_content").html(""), EDITDATA[e[n]] = o[n], kx.fun.pp.loadPage("right", e[n], t[n], o[n])
                }
            }
        }, menu: {
            search: function () {
                $("#j-esearch").off("click").on("click", function () {
                    kx.fun.comm.showLeft("esearch")
                })
            }, text: function () {
                $("#j-etext").off("click").on("click", function () {
                    kx.fun.comm.showLeft("etext")
                })
            }, pic: function () {
                $("#j-epic").off("click").on("click", function () {
                    kx.fun.comm.showLeft("epic")
                })
            }, bg: function () {
                $("#j-ebg").off("click").on("click", function () {
                    kx.fun.comm.showLeft("ebg")
                })
            }, tpl: function () {
                $("#j-etpl").off("click").on("click", function () {
                    kx.fun.comm.showLeft("etpl")
                })
            }, el: function () {
                $("#j-eel").off("click").on("click", function () {
                    kx.fun.comm.showLeft("eel")
                })
            }, feed: function () {
            }
        }, search: {
            sinput: function () {
                $("#j-searchInput").on("focus", function () {
                    kx.cache.sinput && clearTimeout(kx.cache.sinput), kx.fun.comm.showLeft("esearch"), $(document).off("keydown")
                }).on("blur", function () {
                    kx.cache.sinput = setTimeout(function () {
                        kx.fun.ep.ekey()
                    }, 50)
                }).on("keyup", function (e) {
                    if (13 == e.keyCode) {
                        var t = $("#j-searchInput").val();
                        t ? (kx.backopt.getMaterial(t), kx.fun.comm.infinitescroll("esearch")) : alert("请输入关键词")
                    }
                }), $("#j-searchBtn").on("click", function () {
                    var e = $("#j-searchInput").val();
                    e ? (kx.backopt.getMaterial(e), kx.fun.comm.infinitescroll("esearch")) : alert("请输入关键词")
                })
            }
        }, text: {
            _add: function (e) {
                var t, a, i, c, o, n, d = .5, s = .4, l = "etext_" + kx.comm.radomid(), r = kx.cache.scale[1] / kx.cache.scale[0], h = kx.cache.editorWidth * r, p = kx.cache.editorHeight * r, x = {};
                x.scale = h / 380, x.scale2 = h / 250, x.pscale2 = r * d / s, x.width1 = Math.ceil(h * d / r), x.height1 = Math.ceil(h * d * 40 / 180 / r), x.size1 = Math.ceil(30 / r * x.scale), x.width2 = Math.ceil(h * s / x.pscale2), x.height2 = Math.ceil(h * s * 44 / 100 / x.pscale2), x.size2 = Math.ceil(16 / x.pscale2 * x.scale2), "subject" == e ? (t = "双击修改文字", a = x.width1, i = x.height1, c = x.size1) : (t = "双击修改正文@@##@&&@@文字", a = x.width2, i = x.height2, c = x.size2), o = .5 * (p / r - i), n = .5 * (h / r - a);
                var f = {
                    ftext: t,
                    ffamily: "a25",
                    fsize: c,
                    fcolor: "191919",
                    fbold: "0",
                    frow: "140",
                    fdir: "h",
                    fitalic: "0",
                    falign: "left",
                    opacity: "100",
                    rotate: "0",
                    multi: "0",
                    width: a,
                    height: i,
                    left: n,
                    top: o,
                    subject: e,
                    zindex: kx.cache.zindex[kx.editPage][0] + 1
                }, r = kx.cache.scale[1] / kx.cache.scale[0];
                kx.fun.el.comm.add(kx.editPage, r, "etext", l, f)
            }, addp: function () {
                $("#j-etextYihang").on("click", function () {
                    kx.fun.el.text._add("subject")
                })
            }, addps: function () {
                $("#j-etextYiduan").on("click", function () {
                    kx.fun.el.text._add("paragraph")
                })
            }
        }, pic: {
            upload: function () {
                plUpPic = new plupload.Uploader(uploadPicConfig), plupload.addFileFilter("excluded_extensions", function (e, t, a) {
                    e.length && !e[0].regexp.test(t.name) ? (this.trigger("Error", {
                        code: plupload.FILE_EXTENSION_ERROR,
                        message: plupload.translate("File extension error."),
                        file: t
                    }), a(!1)) : a(!0)
                }), plUpPic.init()
            }, sortList: function () {
                $("#j-epicBoxSort").on("click", ".item", function () {
                    var e = $(this).attr("data-sort"), t = $("#j-epicBoxSort").find(".item");
                    "sort1" == e ? (t.eq(0).removeClass("unactive"), t.eq(1).addClass("unactive"), $("#j-uploadPicBtnBox").show()) : (t.eq(0).addClass("unactive"), t.eq(1).removeClass("unactive"), $("#j-uploadPicBtnBox").hide()), kx.backopt.getPicAjax(e)
                })
            }, delpic: function () {
                $("#j-epicList").on("click", "span.del", function (e) {
                    var t = $(this), a = t.parent().attr("data-id");
                    $.post("/member/delFile/id/" + a + ".html", function () {
                        t.parent().remove(), kx.cache.wall.epic && kx.cache.wall.epic.refresh()
                    }), e.stopPropagation()
                })
            }
        }, bg: {
            upload: function () {
                plUpBg = new plupload.Uploader(uploadBgConfig), plUpBg.init()
            }, bgpic: function () {
                $("#j-bgpopt").find(".show").on("click", function () {
                    var e = $(this);
                    if ("隐藏" == e.text()) {
                        var t = 0;
                        e.html("显示")
                    } else if ("显示" == e.text()) {
                        var t = 1;
                        e.html("隐藏")
                    }
                    var a = kx.edata.get(kx.editPage, "ebg", "ebg"), i = kx.edata.edit(kx.editPage, "ebg", "ebg", {show: t});
                    kx.ebg.setbg(kx.editPage, a[1], i[1])
                }), $("#j-bgpopt").find(".edit").on("click", function () {
                    $("#j-uploadBgBtn").parent().find("div input").last().click()
                })
            }, addcolor: function () {
                $("#j-bgcList").on("mouseover", "li", function () {
                    {
                        var e = $(this);
                        e.parent()
                    }
                    e.addClass("hover")
                }).on("mouseout", "li", function () {
                    {
                        var e = $(this);
                        e.parent()
                    }
                    e.removeClass("hover")
                }).on("click", "li", function () {
                    var e = $(this), t = e.parent();
                    t.find("li").removeClass("active"), e.addClass("active");
                    var a = e.attr("data-color"), i = kx.edata.get(kx.editPage, "ebg", "ebg"), c = kx.edata.edit(kx.editPage, "ebg", "ebg", {color: a});
                    kx.ebg.setbg(kx.editPage, i[1], c[1])
                })
            }, diycolor: function () {
                $("#j-bgcdiy").on("click", function (e) {
                    kx.fun.comm.colorpicker(kx.editPage, "diybg", $("#j-bgcdiy").attr("data-color")), e.stopPropagation()
                }), $("#j-bgusedColor").on("click", ".colorList .item", function (e) {
                    if ("none" == $("#j-diyColor").css("display")) {
                        var t = $(this), a = t.attr("data-color"), i = kx.edata.get(kx.editPage, "ebg", "ebg"), c = kx.edata.edit(kx.editPage, "ebg", "ebg", {color: a});
                        kx.ebg.setbg(kx.editPage, i[1], c[1]), e.stopPropagation()
                    } else kx.fun.comm.hidediy()
                })
            }
        }, tpl: {
            tab: function () {
                $("#j-tpleditor").on("click", function () {
                    $("#j-tpleditor").addClass("active"), $("#j-tplrecomm").removeClass("active"), $("#j-tpleditorBox").show(), $("#j-tplrecommBox").hide()
                }), $("#j-tplrecomm").on("click", function () {
                    $("#j-tpleditor").removeClass("active"), $("#j-tplrecomm").addClass("active"), $("#j-tpleditorBox").hide(), $("#j-tplrecommBox").show(1, function () {
                        $("#j-etplWall").css({visibility: "hidden"}), kx.cache.wall.etpl.fitWidth()
                    })
                })
            }, multi: function () {
                $("#j-menuBox").on("click", ".j-multiitem", function () {
                    for (var e = "", t = $(this), a = t.attr("data-multi").split(","), i = 0; i < a.length; i++)e += '<li class="item j-tplinsert" data-itype="etpl" data-iid="' + a[i].split("|||")[0] + '"><img src="' + a[i].split("|||")[1] + '"></li>';
                    $("#j-esubRightBox").find(".rboxContent").html(e), $("#j-searchFix").animate({"margin-left": "-309px"}, 200), $("#j-esubBox").animate({"margin-left": "-309px"}, 200), $("#j-esubRightBox").animate({left: "0px"}, 200)
                })
            }
        }, el: {
            sortListPos: function (e, t) {
                var a = 117;
                3 > t ? ($("#j-eelBoxSort").css({height: a}), $("#j-eelBoxSort").find("li.item_4,li.item_5,li.item_6").css({top: e + a + 15}), $("#j-eelBoxSort").find("li.item_7,li.item_8,li.item_9").css({top: e + 2 * a + 15})) : t >= 3 && 6 > t ? ($("#j-eelBoxSort").css({height: 2 * a}), $("#j-eelBoxSort").find("li.item_4,li.item_5,li.item_6").css({top: a + 15}), $("#j-eelBoxSort").find("li.item_7,li.item_8,li.item_9").css({top: e + 2 * a + 15})) : ($("#j-eelBoxSort").css({height: 3 * a}), $("#j-eelBoxSort").find("li.item_4,li.item_5,li.item_6").css({top: a + 15}), $("#j-eelBoxSort").find("li.item_7,li.item_8,li.item_9").css({top: 2 * a + 15}))
            }, sortList: function () {
                $("#j-eelBoxSort").on("click", ".item", function () {
                    var e = $(this).index();
                    if ($("#j-elSortList").height() > 0)$("#j-elSortList").css({height: 0}), kx.fun.el.el.sortListPos(0, 0), $("#j-eelBoxSort").attr("data-index", "").find("li").removeClass("unactive").removeClass("active"), $("#j-eelBox").unbind("scroll"), $("#j-searchType").find("span").html(""); else {
                        $("#j-eelWall").attr("data-pageid", 0), kx.backopt.getElAjax(e), kx.fun.el.el.sortListPos(kx.cache.wheight - kx.cache.theight, e), kx.fun.comm.infinitescroll("eel"), $("#j-eelBoxSort").attr("data-index", e).find("li").removeClass("active").addClass("unactive"), $(this).removeClass("unactive").addClass("active"), $("#j-elSortList").find(".line").removeClass().addClass("line line_" + e);
                        var t = $(this).find("p").text();
                        $("#j-searchType").find("span").html(t)
                    }
                }), $("#j-searchClose").on("click", function () {
                    $("#j-elSortList").css({height: 0}), kx.fun.el.el.sortListPos(0, 0), $("#j-eelBoxSort").attr("data-index", "").find("li").removeClass("unactive").removeClass("active"), $("#j-eelBox").unbind("scroll"), $("#j-searchType").find("span").html(""), $("#j-searchType").fadeOut(100), $("#j-searchClose").fadeOut(100)
                })
            }
        }
    }, er: {
        init: function () {
            this.changepage(), this.fullpage(), this.zoomin()
        }, changepage: function () {
            kx.cache.mask = "", $("#j-eleftPrint").off("click", ".em-pmask").on("click", ".em-pmask", function () {
                var e = $(this);
                $("#j-eleftPrint").attr("data-pclick", "1");
                var t = e.attr("data-pageid");
                kx.fun.pp.setCurrentPage(t)
            })
        }, fullpage: function () {
            $("#j-efull").off("click").on("click", function () {
                kx.fun.comm.hidden();
                var e = $(this), t = e.attr("data-full");
                1 == t ? (kx.cache.actual = 1, kx.fun.pp.getRightScale(), e.removeClass("full").addClass("real").attr("data-full", "0")) : (kx.cache.actual = 0, kx.fun.pp.getRightScale(), e.removeClass("real").addClass("full").attr("data-full", "1"));
                var a = kx.cache.scale[1] / kx.cache.scale[0];
                kx.fun.pp.creatRightPrint(kx.cache.editorWidth, kx.cache.editorHeight, kx.cache.editorBleed, a)
            })
        }, zoomin: function () {
            var e = function () {
                var e = Math.round(100 * kx.cache.scale[1]), t = 0;
                return t = 10 >= e ? 0 : e > 10 && 20 >= e ? 1 : e > 20 && 30 >= e ? 2 : e > 30 && 40 >= e ? 3 : e > 40 && 50 >= e ? 4 : e > 50 && 60 >= e ? 5 : e > 60 && 70 >= e ? 6 : e > 70 && 80 >= e ? 7 : e > 80 && 90 >= e ? 8 : e > 90 && 100 >= e ? 9 : e > 100 && 125 >= e ? 10 : e > 125 && 150 >= e ? 11 : e > 150 && 200 >= e ? 12 : e > 200 && 300 >= e ? 13 : e > 300 && 400 >= e ? 14 : e > 400 && 500 >= e ? 15 : 15
            }, t = function () {
                var t = e(1);
                0 >= t ? $("#j-ezoomin").find(".scale").addClass("disabled") : $("#j-ezoomin").find(".scale").removeClass("disabled"), t >= kx.cache.zoom.length - 1 ? $("#j-ezoomin").find(".zoom").addClass("disabled") : $("#j-ezoomin").find(".zoom").removeClass("disabled")
            };
            $("#j-ezoomin").on("click", ".zoom", function () {
                if (!$(this).hasClass("disabled")) {
                    var a = e(1);
                    if (kx.fun.comm.hidden(), a < kx.cache.zoom.length) {
                        kx.cache.scale[1] = kx.cache.zoom[a + 1] / 100;
                        var i = kx.cache.scale[1] / kx.cache.scale[0];
                        kx.fun.pp.creatRightPrint(kx.cache.editorWidth, kx.cache.editorHeight, kx.cache.editorBleed, i), $("#j-ezoomin").find(".text").html(Math.round(100 * kx.cache.scale[1]) + "%")
                    }
                    t()
                }
            }), $("#j-ezoomin").on("click", ".scale", function () {
                if (!$(this).hasClass("disabled")) {
                    var a = e(0);
                    if (kx.fun.comm.hidden(), a > 0 && a <= kx.cache.zoom.length - 1) {
                        kx.cache.scale[1] = kx.cache.zoom[a - 1] / 100;
                        var i = kx.cache.scale[1] / kx.cache.scale[0];
                        kx.fun.pp.creatRightPrint(kx.cache.editorWidth, kx.cache.editorHeight, kx.cache.editorBleed, i), $("#j-ezoomin").find(".text").html(Math.round(100 * kx.cache.scale[1]) + "%")
                    }
                    t()
                }
            }), $("#j-copyServiceQq").zclip({
                path: THEMES_URL + "plugin/jquery.zclip/ZeroClipboard.swf", copy: function () {
                    return $(this).attr("data")
                }, beforeCopy: function () {
                }, afterCopy: function () {
                    $.alert("群号码已成功复制到剪切板")
                }
            })
        }
    }, ee: {
        init: function () {
            this.eselectable(), this.edrag(), this.eresize(), this.ehandle(), this.eedittext(), this.menu.comm(), this.menu.etext(), this.menu.epic(), this.menu.ebg(), this.menu.etpl(), this.menu.eel()
        }, eselectable: function () {
            kx.cache.selable = $("#j-editorPrint").selectable({
                filter: "div.j-element",
                delay: 0,
                distance: 1,
                tolerance: "touch",
                start: function () {
                    kx.fun.comm.hidden(), $("#j-eleftPrint").attr("data-pclick", 0)
                },
                stop: function () {
                },
                selected: function () {
                    kx.sel.set()
                }
            })
        }, edrag: function () {
            var e, t, a = $("#j-editorSelect");
            kx.cache.drag = a.draggable({
                addClasses: !1,
                snap: "div.snap",
                snapMode: "outer",
                snapTolerance: kx.cache.snapTolerance,
                delay: 0,
                distance: 5,
                start: function (i, c) {
                    kx.fun.ep.rp.eoff(), kx.his.temp.init(), kx.fun.comm.hidden(1), kx.fun.snap.getPos();
                    {
                        var o = $("#j-editorPrint"), n = o.find("div.ui-selected");
                        n.length
                    }
                    kx.cache.selInfo.d.sel = kx.comm.getObjPos($("#j-editorSelect"), kx.cache.rotate).o, kx.cache.dragResizeTempobj = n, kx.cache.dragResizeTempobj.each(function () {
                        var e = $(this), t = e.attr("data-pageid"), a = e.attr("data-target"), i = e.attr("data-type"), c = kx.edata.get(t, i, a), o = c.rotate;
                        kx.cache.selInfo.d.obj[a] = kx.comm.getObjPos(e, o).o, kx.cache.selInfo.d.obj[a].opacity = c[1].opacity, e.css({opacity: .5}), kx.cache.pos[a] && delete kx.cache.pos[a], kx.his.temp.addold({
                            histype: "drag",
                            pageid: t,
                            scale: kx.cache.scale[1] / kx.cache.scale[0],
                            type: i,
                            target: a,
                            attr: "drag_" + i,
                            odata: c[1]
                        })
                    });
                    var d = parseInt(a.css("left"), 10);
                    d = isNaN(d) ? 0 : d;
                    var s = parseInt($(this).css("top"), 10);
                    s = isNaN(s) ? 0 : s, e = d - c.position.left, t = s - c.position.top
                },
                drag: function (a, i) {
                    i.position.left += e, i.position.top += t;
                    var c = $(this), o = i.offset.left - kx.cache.selInfo.d.sel.left, n = i.offset.top - kx.cache.selInfo.d.sel.top, d = c.data("ui-draggable");
                    kx.cache.dragResizeTempobj.each(function () {
                        var a = $(this), c = a.attr("data-target"), d = a.attr("data-type");
                        $(this).css({
                            top: kx.cache.selInfo.d.obj[c].ctop + n + t,
                            left: kx.cache.selInfo.d.obj[c].cleft + o + e
                        }), "etext" == d && $("#j-editText").css({top: i.position.top, left: i.position.left})
                    }), kx.fun.snap.dragshow(d)
                },
                stop: function (e, t) {
                    kx.fun.ep.rp.eon(), kx.fun.comm.hidden(1), kx.fun.snap.hide();
                    var a = kx.cache.dragResizeTempobj.length, i = t.offset.left - kx.cache.selInfo.d.sel.left, c = t.offset.top - kx.cache.selInfo.d.sel.top;
                    kx.cache.dragResizeTempobj.each(function (e) {
                        var t = $(this), o = t.attr("data-pageid"), n = t.attr("data-target"), d = t.attr("data-type"), s = kx.cache.scale[1] / kx.cache.scale[0];
                        t.css({opacity: .01 * kx.cache.selInfo.d.obj[n].opacity});
                        var l = kx.edata.edit(o, d, n, {
                            top: (kx.cache.selInfo.d.obj[n].ctop + c) / s,
                            left: (kx.cache.selInfo.d.obj[n].cleft + i) / s
                        });
                        kx.his.temp.addnew({
                            histype: "drag",
                            pageid: o,
                            scale: kx.cache.scale[1] / kx.cache.scale[0],
                            type: d,
                            target: n,
                            attr: "drag_" + d,
                            ndata: l[1],
                            cnum: e,
                            tnum: a
                        }), e == a - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
                    }), kx.sel.set()
                }
            })
        }, edragHis: {
            back: function (e, t, a, i, c, o) {
                for (var n = kx.cache.scale[1] / kx.cache.scale[0], d = 0; d < i.length; d++)$("#" + i[d]).css({
                    top: o[d].top * n + "px",
                    left: o[d].left * n + "px"
                }), kx.edata.edit(e[d], a[d], i[d], {top: o[d].top, left: o[d].left}), kx.sel.set()
            }, redo: function (e, t, a, i, c, o) {
                for (var n = kx.cache.scale[1] / kx.cache.scale[0], d = 0; d < i.length; d++)$("#" + i[d]).css({
                    top: o[d].top * n + "px",
                    left: o[d].left * n + "px"
                }), kx.edata.edit(e[d], a[d], i[d], {top: o[d].top, left: o[d].left}), kx.sel.set()
            }
        }, _alsoResize: function (e, t, a, i, c, o) {
            var n = c.width - a.width || 0, d = c.height - a.height || 0, s = (o.left - i.left || 0, o.top - i.top || 0, c.width / a.width || 1), l = kx.cache.scale[1] / kx.cache.scale[0];
            e.each(function () {
                var e = $(this), a = e.attr("data-pageid"), c = e.attr("data-type"), r = e.attr("data-target"), h = t[r];
                if (kx.cache.aspectRatio)var p = Math.ceil(h.width * s), x = Math.ceil(h.height * s), f = o.top + (h.top - i.top) * s - h.top, g = o.left + (h.left - i.left) * s - h.left, k = h.ctop + f, u = h.cleft + g; else var p = Math.ceil(h.width + n), x = Math.ceil(h.height + d), f = o.top + (h.top - i.top) * s - h.top, g = o.left + (h.left - i.left) * s - h.left, k = h.ctop + f, u = h.cleft + g;
                if ("etext" == c) {
                    var m = h.fdir, v = h.fsize / kx.cache.fontsize, j = v * l;
                    if ($("#j-editText").find(".inner")[0])var w = $("#j-editText"); else var w = $("#" + r);
                    var y = w.find(".inner");
                    if (h.group && h.group.length > 0 || $("#j-editorSelect").hasClass("multisel") || 1 == h.fixed)w.attr({
                        "data-width": p / l,
                        "data-height": x / l
                    }).css({width: p, height: x, top: k, left: u}), y.css({
                        width: p / l,
                        height: x / l,
                        top: k,
                        left: u
                    }), 1 == h.multi ? kx.etext.fixSizeScale(a, r, p, x, v * l, y) : kx.etext.fixScale(a, r, p, x, v * l, y); else {
                        var b = kx.cache.fixSizeScale[0] / kx.cache.fixSizeScale[1];
                        y.css({
                            width: "v" == m ? "auto" : Math.ceil(p / j * b),
                            height: "v" == m ? Math.ceil(x / j * b) : "auto"
                        });
                        var _ = Math.ceil(y.width() * v / b), C = Math.ceil(y.height() * v / b);
                        w.attr({"data-width": _, "data-height": C}).css({
                            width: _ * l,
                            height: C * l
                        }), e.attr({"data-width": _, "data-height": C}).css({
                            top: k,
                            left: u,
                            width: _ * l,
                            height: C * l
                        }), $("#j-editorSelect").css({width: _ * l, height: C * l})
                    }
                } else"epic" == c ? (e.css({width: p, height: x, top: k, left: u}), e.find(".inner").css({
                    width: p / l,
                    height: x / l,
                    top: k,
                    left: u
                }), e.find("img").css({width: p / l, height: x / l})) : "eel" == c && (e.css({
                    width: p,
                    height: x,
                    top: k,
                    left: u
                }), e.find(".inner").css({
                    width: p / l,
                    height: x / l,
                    top: k,
                    left: u
                }), e.find("svg").css({width: p / l, height: x / l}))
            })
        }, eresize: function () {
            var e = $("#j-editorSelect");
            kx.cache.resize = e.resizable({
                handles: "all", minHeight: 1, create: function () {
                }, start: function () {
                    kx.his.temp.init(), kx.fun.comm.hidden(1), kx.fun.snap.getPos(), kx.cache.resizeHandle = kx.comm.getResizeHandle(), "ne" == kx.cache.resizeHandle || "se" == kx.cache.resizeHandle || "sw" == kx.cache.resizeHandle || "nw" == kx.cache.resizeHandle ? (kx.cache.resize.resizable("option", "aspectRatio", !0), kx.cache.aspectRatio = !0) : (kx.cache.resize.resizable("option", "aspectRatio", !1), kx.cache.aspectRatio = !1), kx.cache.fixed = e.hasClass("multisel") ? 1 : 0;
                    {
                        var t = $("#j-editorPrint"), a = t.find("div.ui-selected");
                        a.length
                    }
                    kx.cache.selInfo.r.sel = kx.comm.getObjPos(e, kx.cache.rotate).o, kx.cache.dragResizeTempobj = a, kx.cache.dragResizeTempobj.each(function () {
                        var e = $(this), t = e.attr("data-pageid"), a = e.attr("data-target"), i = e.attr("data-type"), c = kx.edata.get(t, i, a), o = c[1].rotate;
                        c[1].fixed = kx.cache.fixed, kx.cache.selInfo.r.obj[a] = kx.comm.getObjPos(e, o).o, "etext" == i && (kx.cache.selInfo.r.obj[a].rotage = o, kx.cache.selInfo.r.obj[a].fdir = c[1].fdir, kx.cache.selInfo.r.obj[a].fsize = c[1].fsize, kx.cache.selInfo.r.obj[a].group = c[1].group, kx.cache.selInfo.r.obj[a].fixed = c[1].fixed, kx.cache.selInfo.r.obj[a].multi = c[1].multi), kx.cache.pos[a] && delete kx.cache.pos[a], kx.his.temp.addold({
                            histype: "resize",
                            pageid: t,
                            scale: kx.cache.scale[1] / kx.cache.scale[0],
                            type: i,
                            target: a,
                            attr: "resize_" + i,
                            odata: c[1]
                        })
                    }), $("#j-rightPannel").off("mouseup"), $("#j-rightPannel").find(".pmask").hide()
                }, resize: function (e, t) {
                    var a = {
                        top: t.originalPosition.top + kx.cache.theight - $("#j-rightPannel").scrollTop(),
                        left: t.originalPosition.left + kx.cache.lwidth - $("#j-rightPannel").scrollLeft()
                    }, i = {
                        top: t.position.top + kx.cache.theight - $("#j-rightPannel").scrollTop(),
                        left: t.position.left + kx.cache.lwidth - $("#j-rightPannel").scrollLeft()
                    };
                    kx.fun.ee._alsoResize(kx.cache.dragResizeTempobj, kx.cache.selInfo.r.obj, t.originalSize, a, t.size, i), kx.fun.snap.resizeshow()
                }, stop: function (e, t) {
                    kx.fun.comm.hidden(1), kx.fun.snap.hide();
                    var a = kx.cache.dragResizeTempobj.length, i = t.size.width - kx.cache.selInfo.r.sel.width, c = t.size.height - kx.cache.selInfo.r.sel.height, o = (t.position.left - kx.cache.selInfo.r.sel.cleft, t.position.top - t.originalPosition.top, kx.cache.scale[1] / kx.cache.scale[0]);
                    kx.cache.dragResizeTempobj.each(function (e) {
                        {
                            var t = $(this), n = t.attr("data-pageid"), d = t.attr("data-target"), s = t.attr("data-type");
                            kx.cache.selInfo.r.obj[d].rotate, kx.cache.selInfo.r.obj[d].width + i, kx.cache.selInfo.r.obj[d].height + c
                        }
                        if ("etext" == s) {
                            if ($("#j-editText").find(".inner")[0])var l = $("#j-editText"); else var l = $("#" + d);
                            var r = kx.edata.edit(n, s, d, {
                                top: parseInt(l.css("top")) / o,
                                left: parseInt(l.css("left")) / o,
                                width: l.width() / o,
                                height: l.height() / o,
                                fixed: kx.cache.fixed
                            })
                        } else var r = kx.edata.edit(n, s, d, {
                            top: parseInt($("#" + d).css("top")) / o,
                            left: parseInt($("#" + d).css("left")) / o,
                            width: $("#" + d).width() / o,
                            height: $("#" + d).height() / o
                        });
                        kx.his.temp.addnew({
                            histype: "resize",
                            pageid: n,
                            scale: kx.cache.scale[1] / kx.cache.scale[0],
                            type: s,
                            target: d,
                            attr: "resize_" + s,
                            ndata: r[1],
                            cnum: e,
                            tnum: a
                        }), e == a - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
                    }), kx.sel.set(), $("#j-rightPannel").find(".pmask").show(), $("#j-" + kx.editPage + "_mask").hide(), $("#j-rightPannel").delay("200").on("mouseup", function (e) {
                        kx.fun.ep.rinitFun(e)
                    })
                }
            });
            var t = $.ui.resizable.prototype._setOption;
            $.ui.resizable.prototype._setOption = function (e, a) {
                t.apply(this, arguments), "aspectRatio" === e && (this._aspectRatio = !!a)
            }
        }, eresizeHis: {
            back: function (e, t, a, i, c, o) {
                for (var n = kx.cache.scale[1] / kx.cache.scale[0], d = 0; d < i.length; d++) {
                    if ($("#" + i[d]).css({
                            width: o[d].width * n + "px",
                            height: o[d].height * n + "px",
                            top: o[d].top * n + "px",
                            left: o[d].left * n + "px"
                        }), kx.edata.edit(e[d], a[d], i[d], {
                            width: o[d].width,
                            height: o[d].height,
                            top: o[d].top,
                            left: o[d].left
                        }), "etext" == a[d]) {
                        var s = (o[d].fdir, parseInt(o[d].fsize) / kx.cache.fontsize);
                        if ($("#j-editText").find(".inner")[0])var l = $("#j-editText"); else var l = $("#" + i[d]);
                        var r = l.find(".inner");
                        if (o[d].group && o[d].group.length > 0 ? (l.attr({
                                "data-width": o[d].width,
                                "data-height": o[d].height
                            }).css({
                                width: o[d].width * n + "px",
                                height: o[d].height * n + "px"
                            }), $("#" + i[d]).attr({
                                "data-width": o[d].width,
                                "data-height": o[d].height
                            })) : (r.css({
                                width: o[d].width / s,
                                height: o[d].height / s
                            }), l.attr({
                                "data-width": o[d].width,
                                "data-height": o[d].height
                            }).css({
                                width: o[d].width * n + "px",
                                height: o[d].height * n + "px"
                            }), $("#j-editorSelect").css({
                                width: o[d].width * n + "px",
                                height: o[d].height * n + "px"
                            }), $("#" + i[d]).attr({
                                "data-width": o[d].width,
                                "data-height": o[d].height
                            }).css({
                                width: o[d].width * n + "px",
                                height: o[d].height * n + "px",
                                top: o[d].top * n + "px",
                                left: o[d].left * n + "px"
                            })), o[d].group && o[d].group.length > 0) {
                            var h = o[d].fsize / kx.cache.fontsize;
                            kx.etext.fixSizeScale(e[d], i[d], o[d].width * n, o[d].height * n, h * n, r)
                        } else if (1 == o[d].fixed) {
                            var h = o[d].fsize / kx.cache.fontsize;
                            kx.etext.fixScale(e[d], i[d], o[d].width * n, o[d].height * n, h * n, r)
                        }
                    } else"epic" == a[d] ? $("#" + i[d]).find("img").css({
                        width: o[d].width + "px",
                        height: o[d].height + "px"
                    }) : "eel" == a[d] && $("#" + i[d]).find("svg").css({
                        width: o[d].width + "px",
                        height: o[d].height + "px"
                    });
                    kx.sel.set(), d == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
                }
            }, redo: function (e, t, a, i, c, o) {
                this.back(e, t, a, i, c, o)
            }
        }, showTextEdit: function (e, t) {
            if ("none" == $("#j-editText").css("display")) {
                var a = kx.cache.selected.pageid, i = kx.cache.selected.target, c = (kx.cache.selected.type, kx.cache.selected.data.dir, kx.cache.selected.data.rotate), o = kx.comm.getObjPos($("#" + i), c).o, n = e.find(".inner");
                n.attr("contenteditable", "true");
                var d = n.html();
                d = kx.comm.processStr("e", d), kx.cache.selected.data.group && kx.cache.selected.data.group.length > 0 ? (kx.cache.selected.data.fixed = 1, kx.edata.edit(kx.cache.selected.pageid, kx.cache.selected.type, kx.cache.selected.target, {fixed: 1})) : (kx.cache.selected.data.fixed = 0, kx.edata.edit(kx.cache.selected.pageid, kx.cache.selected.type, kx.cache.selected.target, {fixed: 0})), $("#j-editText").attr("data-pageid", a).attr("data-target", i).css({
                    display: "block",
                    width: o.width,
                    height: o.height,
                    top: o.top - kx.cache.theight + $("#j-rightPannel").scrollTop(),
                    left: o.left - kx.cache.lwidth + $("#j-rightPannel").scrollLeft(),
                    transform: "rotate(" + c + "deg)"
                }).html(n), $("#j-editorSelect").attr("data-pageid", a).attr("data-target", i).css({transform: "rotate(" + c + "deg)"}), kx.cache.edittext[0] = d;
                var s = $("#j-editText").find(".inner")[0];
                1 == t && kx.comm.selection(s)
            }
            $(document).off("keydown")
        }, ehandle: function () {
            var e = $("#j-editorPrint");
            e.on("mousedown", "div.j-element", function (e) {
                $("#j-editorSelect").trigger(e);
                var t = $(this);
                e.shiftKey ? t.attr("data-shift", "1") : (t.attr("data-shift", "0"), $("#j-editorPrint").find(".ui-selected").removeClass("ui-selected")), t.addClass("ui-selected"), kx.sel.set()
            }).on("kxclick", "div.j-element", function () {
                {
                    var t = $(this);
                    t.attr("data-shift") || "0"
                }
                "0" == t.attr("data-shift") ? (e.find(".ui-selected").removeClass("ui-selected"), t.addClass("ui-selected"), kx.sel.set(), kx.fun.menu.main(kx.cache.selected.pageid, kx.cache.selected.type, kx.cache.selected.target)) : (kx.fun.menu.main(), t.addClass("ui-selected"), kx.sel.set())
            }).on("kxdbclick", "div.j-element", function () {
                if ("0" != kx.cache.through[0] && kx.sel.setGroup(kx.cache.through[0]), "etext" == kx.cache.selected.type) {
                    var e = $(this);
                    kx.fun.ee.showTextEdit(e, 1), $("#j-editText").off("mousedown").on("mousedown", function () {
                        $("#j-rightPannel").off("mouseup")
                    }), $("body").off("mouseup").on("mouseup", function () {
                        $("#j-rightPannel").off("mouseup").on("mouseup", function (e) {
                            kx.fun.ep.rinitFun(e)
                        })
                    })
                }
                kx.fun.menu.main(kx.cache.selected.pageid, kx.cache.selected.type, kx.cache.selected.target)
            })
        }, eedittext: function () {
            $("#j-editText").on("blur", function () {
                var e = $(this), t = e.attr("data-pageid"), a = e.attr("data-target"), i = e.html(), c = e.find(".inner").html();
                if (c = kx.comm.processStr("e", c), kx.cache.edittext[1] = c, kx.cache.selected.data.fixed && 1 == kx.cache.selected.data.fixed) {
                    kx.his.temp.init();
                    var o = kx.edata.get(t, kx.cache.selected.type, kx.cache.selected.target);
                    if (kx.cache.edittext[0] != kx.cache.edittext[1]) {
                        kx.etext._doEditText(t, "ftext", kx.cache.edittext[1], 1);
                        var n = Math.floor(kx.cache.fixSizeScale[1] / (kx.cache.scale[1] / kx.cache.scale[0]) * kx.cache.fontsize);
                        kx.etext._doEditText(t, "fsize", n, 1);
                        var d = {};
                        d.ftext = kx.comm.processStr("e", kx.cache.edittext[1]), d.fsize = n;
                        var s = kx.edata.edit(t, "etext", kx.cache.selected.target, d);
                        kx.his.temp.addold({
                            histype: "edittext",
                            pageid: t,
                            scale: kx.cache.scale[1] / kx.cache.scale[0],
                            type: kx.cache.selected.type,
                            target: kx.cache.selected.target,
                            attr: "text_textsize",
                            odata: o[1]
                        }), kx.his.temp.addnew({
                            histype: "editText",
                            pageid: t,
                            scale: kx.cache.scale[1] / kx.cache.scale[0],
                            type: kx.cache.selected.type,
                            target: kx.cache.selected.target,
                            attr: "text_textsize",
                            ndata: s[1],
                            cnum: 0,
                            tnum: 1
                        }), kx.fun.pp.creatLeftPrint(kx.editPage)
                    }
                } else kx.cache.edittext[0] != kx.cache.edittext[1] && kx.etext._doEditText(t, "ftext", kx.cache.edittext[1]);
                $("#j-editText").attr("data-target", "").css({display: "none"}).html(""), $("#" + a).html(i), _ftextsp = kx.etext.additag(c, [], !0), $("#" + a).find(".inner").html(_ftextsp), kx.fun.ep.ekey()
            }).on("keyup", function () {
                var e = $(this), t = e.attr("data-pageid"), a = e.attr("data-target"), i = e.find(".inner").text();
                i = kx.comm.processStr("e", i), kx.cache.edittext[1] = i, kx.etext.editWh(a, "ftext", kx.cache.edittext[1]);
                var c = kx.cache.selected.data, o = c.fsize / kx.cache.fontsize, n = kx.cache.scale[1] / kx.cache.scale[0];
                c.group && c.group.length > 0 && kx.etext.fixSizeScale(t, kx.cache.selected.target, c.width * n, c.height * n, o * n, $("#j-editText").find(".inner"))
            }).on("keydown", function () {
                var e = kx.cache.selected.data, t = kx.cache.selected.pageid, a = e.fsize / kx.cache.fontsize, i = kx.cache.scale[1] / kx.cache.scale[0];
                e.group && e.group.length > 0 && kx.etext.fixSizeScale(t, kx.cache.selected.target, e.width * i, e.height * i, a * i, $("#j-editText").find(".inner"))
            })
        }, menu: {
            comm: function () {
                $("#j-md_chicunkuanup").on("click", function () {
                    kx.editor.chicun(kx.editPage, kx.cache.selected.type, 1, 1)
                }), $("#j-md_chicunkuandown").on("click", function () {
                    kx.editor.chicun(kx.editPage, kx.cache.selected.type, 1, -1)
                }), $("#j-md_chicunkuan,#j-md_chicungao").on("focus", function () {
                    $(document).off("keydown")
                }).on("blur", function () {
                    kx.fun.ep.ekey()
                }), $("#j-md_chicungaoup").on("click", function () {
                    kx.editor.chicun(kx.editPage, kx.cache.selected.type, 2, 1)
                }), $("#j-md_chicungaodown").on("click", function () {
                    kx.editor.chicun(kx.editPage, kx.cache.selected.type, 2, -1)
                }), $("#j-md_chicunBtn").on("click", function () {
                    kx.editor.chicun(kx.editPage, kx.cache.selected.type)
                }), $("#j-md_usedadd").on("click", function () {
                    "none" == $("#j-diyColor").css("display") ? kx.fun.comm.colorpicker(kx.editPage, "editor", $("#j-md_usedadd").attr("data-color")) : kx.fun.comm.hidediy()
                }), $("#j-md_referColor").on("mouseover", "li", function () {
                    {
                        var e = $(this);
                        kx.cache.selected.type, kx.cache.selected.target, e.attr("data-color")
                    }
                    e.addClass("hover")
                }).on("mouseout", "li", function () {
                    {
                        var e = $(this);
                        kx.cache.selected.pageid, kx.cache.selected.type, kx.cache.selected.target, e.attr("data-color")
                    }
                    e.removeClass("hover")
                }).on("click", "li", function () {
                    var e = $(this), t = kx.cache.selected.type;
                    "etext" == t ? kx.etext.setColor(kx.editPage, e) : "eel" == t && kx.eel.setColor(kx.editPage, e), $("#j-md_color").hide()
                }), $("#j-md_usedColor").on("click", "li.item", function () {
                    var e = $(this), t = kx.cache.selected.type;
                    "etext" == t ? kx.etext.setColor(kx.editPage, e) : "eel" == t && kx.eel.setColor(kx.editPage, e)
                })
            }, etext: function () {
                $("#j-mot_color").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "etext", "color", $(this), {
                        top: 0,
                        left: -130
                    })
                }), $("#j-mot_family").on("click", function () {
                    $(this).hasClass("disabled") || ("none" == $("#j-md_family").css("display") ? kx.fun.menu.drop(kx.editPage, "etext", "family", $(this)) : kx.fun.menu.drop())
                }), $("#j-md_family").on("click", "li", function () {
                    kx.etext.setFamily(kx.editPage, $(this))
                }), $("#j-mot_size").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "etext", "size", $(this))
                }), $("#j-mot_size").off("keydown", "input").on("keydown", "input", function (e) {
                    return e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || 46 == e.keyCode || 8 == e.keyCode || 37 == e.keyCode || 39 == e.keyCode || 9 == e.keyCode ? (e.stopPropagation(), !0) : ((13 == e.keyCode || 108 == e.keyCode) && $(this).trigger("blur"), e.stopPropagation(), !1)
                }).off("blur", "input").on("blur", "input", function () {
                    var e = $(this), t = {};
                    $("#j-mot_size").attr("data-fsize") != e.val() && (t.fsize = e.val(), kx.etext._doEditText(kx.editPage, "fsize", t.fsize), kx.fun.menu.idrop.etext.tsize(kx.editPage, t))
                }), $("#j-md_size").on("click", "li", function () {
                    kx.etext.setSize(kx.editPage, $(this))
                }), $("#j-mot_align").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "etext", "align", $(this), {
                        left: -78,
                        top: 0
                    })
                }), $("#j-md_alignl").on("click", function () {
                    kx.etext.setAlign(kx.editPage, "left")
                }), $("#j-md_alignc").on("click", function () {
                    kx.etext.setAlign(kx.editPage, "center")
                }), $("#j-md_alignr").on("click", function () {
                    kx.etext.setAlign(kx.editPage, "right")
                }), $("#j-md_alignj").on("click", function () {
                    kx.etext.setAlign(kx.editPage, "justify")
                }), $("#j-mot_italic").on("click", function () {
                    $(this).hasClass("disabled") || kx.etext.setItalic(kx.editPage, $(this))
                }), $("#j-mot_capital").on("click", function () {
                    $(this).hasClass("disabled") || kx.etext.setCapital(kx.editPage, $(this))
                }), $("#j-mot_row").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "etext", "row", $(this), {
                        top: 0,
                        left: -76
                    })
                }), $("#j-mot_dir").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "etext", "dir", $(this), {
                        top: 0,
                        left: -22
                    })
                }), $("#j-md_dirh").on("click", function () {
                    kx.etext.setDir(kx.editPage, "h")
                }), $("#j-md_dirv").on("click", function () {
                    kx.etext.setDir(kx.editPage, "v")
                }), $("#j-mot_opacity").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "etext", "opacity", $(this), {
                        top: 0,
                        left: -166
                    })
                }), $("#j-mot_rotate").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "etext", "rotate", $(this), {
                        top: 0,
                        left: -166
                    })
                }), $("#j-mot_copy").on("click", function () {
                    if (!$(this).hasClass("disabled")) {
                        var e = kx.cache.scale[1] / kx.cache.scale[0];
                        kx.editor.copy(kx.editPage, e)
                    }
                }), $("#j-mot_del").on("click", function () {
                    $(this).hasClass("disabled") || kx.editor.del(kx.editPage)
                })
            }, epic: function () {
                $("#j-mop_change").on("click", function () {
                    $(this).hasClass("disabled") || ($("#j-uploadPicBtn").attr({
                        "data-change": 1,
                        "data-oldTarget": $(".ui-selected").attr("data-target")
                    }), $("#j-uploadPicBtn").parent().find("div input").last().click())
                }), $("#j-mop_fileter").on("click", function () {
                }), $("#j-mop_size").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "epic", "chicun", $(this), {
                        top: 0,
                        left: -80
                    })
                }), $("#j-mop_crop").on("click", function () {
                    $(this).hasClass("disabled") || kx.epic.croppic()
                }), $("#j-mop_copy").on("click", function () {
                    if (!$(this).hasClass("disabled")) {
                        var e = kx.cache.scale[1] / kx.cache.scale[0];
                        kx.editor.copy(kx.editPage, e)
                    }
                }), $("#j-mop_del").on("click", function () {
                    $(this).hasClass("disabled") || kx.editor.del(kx.editPage)
                }), $("#j-mop_opacity").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "epic", "opacity", $(this), {
                        top: 0,
                        left: -166
                    })
                }), $("#j-mop_rotate").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "epic", "rotate", $(this), {
                        top: 0,
                        left: -166
                    })
                })
            }, ebg: function () {
            }, etpl: function () {
            }, eel: function () {
                $("#j-moe_size").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "eel", "chicun", $(this), {
                        top: 0,
                        left: -80
                    })
                }), $("#j-moe_color").on("click", "i", function () {
                    var e = $(this), t = e.attr("data-icolor"), a = e.attr("data-ocolor"), i = e.attr("data-color");
                    $("#j-moe_color").attr({
                        "data-icolor": t,
                        "data-ocolor": a,
                        "data-color": i
                    }), kx.fun.menu.drop(kx.editPage, "eel", "color", e, {top: 0, left: -130})
                }), $("#j-moe_copy").on("click", function () {
                    if (!$(this).hasClass("disabled")) {
                        var e = kx.cache.scale[1] / kx.cache.scale[0];
                        kx.editor.copy(kx.editPage, e)
                    }
                }), $("#j-moe_del").on("click", function () {
                    $(this).hasClass("disabled") || kx.editor.del(kx.editPage)
                }), $("#j-moe_opacity").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "eel", "opacity", $(this), {
                        top: 0,
                        left: -166
                    })
                }), $("#j-moe_rotate").on("click", function () {
                    $(this).hasClass("disabled") || kx.fun.menu.drop(kx.editPage, "eel", "rotate", $(this), {
                        top: 0,
                        left: -166
                    })
                })
            }
        }
    }, eo: {
        init: function () {
        }
    }
}, kx.sel = {
    set: function () {
        kx.fun.comm.textBlur(), kx.cache.multiselected = [], kx.cache.selected = {};
        var e = 1e5, t = 1e5, a = 0, i = 0, c = $("div.ui-selected", "#j-" + kx.editPage + "_wrap");
        c.each(function () {
            var e = $(this), t = e.attr("data-pageid"), a = e.attr("data-type"), i = e.attr("data-target"), c = kx.edata.get(t, a, i), o = c[1].group;
            if (o)for (var n = 0; n < o.length; n++)$("#" + o[n]).addClass("ui-selected")
        });
        var o = $("div.ui-selected", "#j-" + kx.editPage + "_wrap"), n = o.length, d = 0;
        if (o.each(function () {
                var c = $(this), o = c.attr("data-pageid"), s = c.attr("data-type"), l = c.attr("data-target"), r = kx.edata.get(o, s, l), h = r[1].rotate;
                if (d = h, h)if (n > 1)var p = kx.comm.getObjPos(c, h).n; else var p = kx.comm.getObjPos(c, h).o; else var p = kx.comm.getObjPos(c, h).o;
                if (kx.cache.multiselected.push(l), e = Math.min(e, p.top), i = Math.max(i, p.right), a = Math.max(a, p.bottom), t = Math.min(t, p.left), "etext" == s) {
                    var x = c.find(".inner").html(), f = kx.etext.delitag(x);
                    f = kx.etext.additag(f, [], !0), c.find(".inner").html(f)
                }
            }), n > 1) {
            $("#j-editorSelect").addClass("multisel").css({
                display: "block",
                transform: "rotateZ(0deg)",
                width: i - t,
                height: a - e,
                top: e - kx.cache.theight + $("#j-rightPannel").scrollTop(),
                left: t - kx.cache.lwidth + $("#j-rightPannel").scrollLeft()
            });
            var s = $("#" + kx.cache.multiselected[0]), l = s.attr("data-pageid"), r = s.attr("data-type"), h = s.attr("data-target");
            kx.sel.updata(l, r, h)
        } else if (1 == n) {
            var s = $("#" + kx.cache.multiselected[0]), l = s.attr("data-pageid"), r = s.attr("data-type"), h = s.attr("data-target");
            kx.sel.updata(l, r, h), kx.cache.rotate = kx.cache.selected.data.rotate, $("#j-editorSelect").removeClass("multisel").attr({
                "data-pageid": l,
                "data-type": r,
                "data-target": h
            }).css({
                display: "block",
                visibility: "visible",
                transform: "rotateZ(" + kx.cache.rotate + "deg)",
                width: i - t,
                height: a - e,
                top: e - kx.cache.theight + $("#j-rightPannel").scrollTop(),
                left: t - kx.cache.lwidth + $("#j-rightPannel").scrollLeft()
            })
        }
        kx.fun.comm.chkResizeHandle(d)
    }, setGroup: function (e) {
        kx.cache.multiselected = [], kx.cache.selected = {};
        var t = 1e5, a = 1e5, i = 0, c = 0, o = $("#" + e), n = o.attr("data-pageid"), d = o.attr("data-type"), s = e, l = kx.edata.get(n, d, s), r = l[1].group;
        if (kx.sel.updata(n, d, s), $("div.ui-selected", "#j-" + n + "_wrap").removeClass("ui-selected"), o.addClass("ui-selected"), r)for (var h = 0; h < r.length; h++)$("#" + r[h]).addClass("ui-selected");
        var p = $("div.ui-selected", "#j-" + n + "_wrap"), x = p.length;
        if (p.each(function () {
                var e = $(this), o = e.attr("data-pageid"), n = e.attr("data-type"), d = e.attr("data-target"), s = kx.edata.get(o, n, d), l = s[1].rotate;
                if (l)if (x > 1)var r = kx.comm.getObjPos(e, l).n; else var r = kx.comm.getObjPos(e, l).o; else var r = kx.comm.getObjPos(e, l).o;
                kx.cache.multiselected.push(d), t = Math.min(t, r.top), c = Math.max(c, r.right), i = Math.max(i, r.bottom), a = Math.min(a, r.left)
            }), x > 0 && (x > 1 ? $("#j-editorSelect").addClass("multisel") : $("#j-editorSelect").removeClass("multisel"), $("#j-editorSelect").attr({"data-pageid": n}).css({
                display: "block",
                transform: "rotateZ(0deg)",
                width: c - a,
                height: i - t,
                top: t - kx.cache.theight + $("#j-rightPannel").scrollTop(),
                left: a - kx.cache.lwidth + $("#j-rightPannel").scrollLeft()
            }), kx.cache.rotate = kx.cache.selected.data.rotate), r)for (var h = 0; h < r.length; h++)$("#" + r[h]).removeClass("ui-selected");
        kx.fun.comm.textBlur()
    }, updata: function (e, t, a) {
        kx.cache.selected = {};
        var i = kx.edata.get(e, t, a)[1], c = kx.comm.getObjPos($("#" + a), i.rotate);
        return kx.cache.selected = {pageid: e, type: t, target: a, data: i, pos: c}, !1
    }
}, kx.editor = {
    copyobj: function () {
        kx.cache.copyseldata = [];
        {
            var e = $("#j-editorPrint"), t = e.find("div.ui-selected");
            t.length
        }
        t.each(function () {
            var e = $(this).attr("data-pageid"), t = $(this).attr("data-type"), a = $(this).attr("data-target");
            kx.cache.copyseldata.push([e, t, a])
        })
    }, objcopy: function (e, t) {
        kx.his.temp.init(), kx.cache.svgtexts = [];
        for (var a = 0; a < kx.cache.copyseldata.length; a++) {
            var i = kx.cache.copyseldata[a][0], c = kx.cache.copyseldata[a][1], o = kx.cache.copyseldata[a][2], n = kx.cache.scale[1] / kx.cache.scale[0];
            if (i == kx.editPage)$("#j-editorSelect").hasClass("multisel") ? 0 == a && kx.editor.copy(i, n, 0, e) : kx.editor.copy(i, n, 0, e); else {
                var d = kx.edata.get(i, c, o), s = $.extend(!0, {}, d[1]), l = c + "_" + kx.comm.radomid();
                s.zindex && (s.zindex = parseInt(s.zindex)), s.top = parseInt(s.top), s.left = parseInt(s.left), s.group = [], s.zindex = kx.cache.zindex[kx.editPage][0] + 1, kx.cache.svgtexts.push(l), kx.edata.add(kx.editPage, c, l, s);
                var r = function (e) {
                    return function () {
                        t || (kx.his.temp.addold({
                            histype: "copy",
                            pageid: i,
                            scale: n,
                            type: c,
                            target: l,
                            attr: "copy_" + c,
                            odata: {}
                        }), kx.his.temp.addnew({
                            histype: "copy",
                            pageid: i,
                            scale: n,
                            type: c,
                            target: l,
                            attr: "copy_" + c,
                            ndata: s,
                            cnum: e,
                            tnum: kx.cache.copyseldata.length
                        }))
                    }
                };
                if (kx.fun.comm.insert("right", kx.editPage, n, c, l, s, r(a)), $("#j-editorSelect").hasClass("multisel") && a == kx.cache.copyseldata.length - 1) {
                    kx.cache.svgtexts = kx.comm.unique(kx.cache.svgtexts);
                    for (var h = 0; h < kx.cache.svgtexts.length; h++) {
                        if (-1 != kx.cache.svgtexts[h].indexOf("etext") && kx.edata.edit(kx.editPage, "etext", kx.cache.svgtexts[h], {group: kx.cache.svgtexts.concat()}), -1 != kx.cache.svgtexts[h].indexOf("eel")) {
                            kx.edata.edit(kx.editPage, "eel", kx.cache.svgtexts[h], {
                                svgdata: $("#" + o).find(".inner").find("svg").prop("outerHTML"),
                                group: kx.cache.svgtexts.concat()
                            })
                        }
                        h == kx.cache.svgtexts.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
                    }
                    kx.cache.svgtexts = [], $("#" + l).trigger("mousedown")
                }
                a == kx.cache.copyseldata.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
            }
        }
    }, copy: function (e, t, a, i) {
        t = t || kx.cache.scale[1] / kx.cache.scale[0], kx.cache.svgtexts = [];
        var c = $("#j-editorPrint"), o = c.find("div.ui-selected"), n = o.length;
        kx.his.temp.init(), o.each(function (e) {
            var c = $(this).attr("data-pageid"), o = $(this).attr("data-type"), d = $(this).attr("data-target"), s = kx.edata.copy(c, o, d);
            if ($("#j-editorSelect").hasClass("multisel"))var l = {
                top: parseInt(s[1].top) + 5,
                left: parseInt(s[1].left) + 5,
                group: [],
                zindex: kx.cache.zindex[c][0] + 1
            }; else var l = {
                top: parseInt(s[1].top) + (1 == i ? 0 : kx.comm.radom(30)),
                left: parseInt(s[1].left) + (1 == i ? 0 : kx.comm.radom(30)),
                group: [],
                zindex: kx.cache.zindex[c][0] + 1
            };
            var r = kx.edata.edit(c, o, s[0], l);
            if (kx.cache.svgtexts.push(r[0]), kx.fun.comm.insert("right", c, t, o, r[0], r[1], function () {
                    a || (kx.his.temp.addold({
                        histype: "copy",
                        pageid: c,
                        scale: kx.cache.scale[1] / kx.cache.scale[0],
                        type: o,
                        target: r[0],
                        attr: "copy_" + o,
                        odata: s[1]
                    }), kx.his.temp.addnew({
                        histype: "copy",
                        pageid: c,
                        scale: kx.cache.scale[1] / kx.cache.scale[0],
                        type: o,
                        target: r[0],
                        attr: "copy_" + o,
                        ndata: r[1],
                        cnum: e,
                        tnum: n
                    }))
                }), $("#j-editorSelect").hasClass("multisel")) {
                if (e == n - 1) {
                    kx.cache.svgtexts = kx.comm.unique(kx.cache.svgtexts);
                    for (var h = 0; h < kx.cache.svgtexts.length; h++)-1 != kx.cache.svgtexts[h].indexOf("etext") && kx.edata.edit(c, "etext", kx.cache.svgtexts[h], {group: kx.cache.svgtexts.concat()}), -1 != kx.cache.svgtexts[h].indexOf("eel") && kx.edata.edit(c, "eel", kx.cache.svgtexts[h], {
                        svgdata: $("#" + d).find(".inner").find("svg").prop("outerHTML"),
                        group: kx.cache.svgtexts.concat()
                    });
                    kx.cache.svgtexts = [], $("#" + r[0]).trigger("mousedown")
                }
            } else $("#" + r[0]).trigger("mousedown");
            e == n - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        })
    }, copyHis: {
        back: function (e, t, a, i) {
            for (var c = 0; c < i.length; c++)$("#" + i[c]).trigger("mousedown"), kx.editor.del(e[c], 1), c == i.length && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, redo: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)kx.edata.add(e[n], a[n], i[n], o[n]), kx.fun.comm.changeUpZindex(e[n], o[n].zindex, 1), kx.fun.comm.insert("right", e[n], t[n], a[n], i[n], o[n], function () {
            }), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }
    }, del: function (e, t) {
        var a = $("#j-editorPrint"), i = a.find("div.ui-selected"), c = i.length;
        kx.his.temp.init(), i.each(function (e) {
            var a = $(this).attr("data-pageid"), i = $(this).attr("data-type"), o = $(this).attr("data-target");
            $(this).remove();
            var n = kx.edata.get(a, i, o);
            kx.edata.del(a, i, o), kx.fun.comm.hidden(), kx.fun.comm.changeUpZindex(a, n[1].zindex, -1), t || (kx.his.temp.addold({
                histype: "del",
                pageid: a,
                scale: kx.cache.scale[1] / kx.cache.scale[0],
                type: i,
                target: o,
                attr: "del_" + i,
                odata: n[1]
            }), kx.his.temp.addnew({
                histype: "del",
                page: a,
                scale: kx.cache.scale[1] / kx.cache.scale[0],
                type: i,
                target: o,
                attr: "del_" + i,
                ndata: {},
                cnum: e,
                tnum: c
            })), e == c - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }), kx.fun.comm.getMaxzindex(e)
    }, delHis: {
        back: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)kx.edata.add(e[n], a[n], i[n], o[n]), kx.fun.comm.changeUpZindex(e[n], o[n].zindex, 1), kx.fun.comm.insert("right", e[n], t[n], a[n], i[n], o[n], function () {
            }), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, redo: function (e, t, a, i) {
            for (var c = 0; c < i.length; c++)$("#" + i[c]).trigger("mousedown"), kx.editor.del(e[c], 1), c == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }
    }, opacity: function (e, t, a) {
        var i = $("#j-" + e + "_wrap"), c = i.find("div.ui-selected"), o = c.length;
        kx.his.temp.init(), c.each(function (i) {
            var c = $(this).attr("data-type"), n = $(this).attr("data-target"), d = kx.edata.get(e, c, n), s = kx.edata.edit(e, c, n, {opacity: t});
            $(this).css({opacity: .01 * t}), a || (kx.his.temp.addold({
                histype: "opacity",
                pageid: e,
                scale: kx.cache.scale[1] / kx.cache.scale[0],
                type: c,
                target: n,
                attr: "opacity_" + c,
                odata: d[1]
            }), kx.his.temp.addnew({
                histype: "opacity",
                pageid: e,
                scale: kx.cache.scale[1] / kx.cache.scale[0],
                type: c,
                target: n,
                attr: "opacity_" + c,
                ndata: s[1],
                cnum: i,
                tnum: o
            })), i == o - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        })
    }, opacityHis: {
        back: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)this._doopacity(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, redo: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)this._doopacity(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, _doopacity: function (e, t, a, i, c, o) {
            var n = o.opacity;
            kx.edata.edit(e, a, i, {opacity: n}), $("#" + i).css({opacity: .01 * n}), $("#j-md_opacity").find("input.r").val(n), $("#j-md_opacity_solider").slider({value: n})
        }
    }, rotate: function (e, t, a) {
        var i = $("#j-" + e + "_wrap"), c = i.find("div.ui-selected"), o = c.length;
        kx.his.temp.init(), c.each(function (i) {
            var c = $(this).attr("data-type"), n = $(this).attr("data-target"), d = kx.edata.get(e, c, n), s = kx.edata.edit(e, c, n, {rotate: t});
            $(this).css({transform: "rotateZ(" + t + "deg)"}), kx.sel.set(), a || (kx.his.temp.addold({
                histype: "rotate",
                pageid: e,
                scale: kx.cache.scale[1] / kx.cache.scale[0],
                type: c,
                target: n,
                attr: "rotate_" + c,
                odata: d[1]
            }), kx.his.temp.addnew({
                histype: "rotate",
                page: e,
                scale: kx.cache.scale[1] / kx.cache.scale[0],
                type: c,
                target: n,
                attr: "rotate_" + c,
                ndata: s[1],
                cnum: i,
                tnum: o
            })), i == o - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        })
    }, rotateHis: {
        back: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)this._dorotate(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, redo: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)this._dorotate(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, _dorotate: function (e, t, a, i, c, o) {
            var n = o.rotate;
            kx.edata.edit(e, a, i, {rotate: n}), $("#" + i).css({transform: "rotateZ(" + n + "deg)"}), $("#j-md_rotate").find("input.r").val(n), $("#j-md_rotate_solider").slider({value: n}), kx.sel.set()
        }
    }, order: function (e, t, a) {
        var i = $("#j-" + e + "_wrap"), c = i.find("div.ui-selected"), o = c.length;
        kx.his.temp.init(), c.each(function (e) {
            var c = $(this), n = $(this).attr("data-pageid"), d = $(this).attr("data-type"), s = c.attr("data-target"), l = kx.edata.get(n, d, s), r = parseInt(l[1].zindex) + t, h = kx.edata.edit(n, d, s, {zindex: r});
            i.find("div.j-element").each(function () {
                var a = $(this);
                if (parseInt(a.css("z-index")) == r) {
                    var i = a.attr("data-type"), c = a.attr("data-target"), s = kx.edata.get(n, i, c), l = parseInt(s[1].zindex) - t, h = kx.edata.edit(n, i, c, {zindex: l});
                    a.css({"z-index": l}), kx.his.temp.addold({
                        histype: "order",
                        pageid: n,
                        scale: kx.cache.scale[1] / kx.cache.scale[0],
                        type: i,
                        target: c,
                        attr: "order_" + d,
                        odata: s[1]
                    }), kx.his.temp.addnew({
                        unhis: 1,
                        histype: "order",
                        pageid: n,
                        scale: kx.cache.scale[1] / kx.cache.scale[0],
                        type: i,
                        target: c,
                        attr: "order_" + d,
                        ndata: h[1],
                        cnum: e,
                        tnum: o
                    })
                }
            }), $(this).css({"z-index": r}), kx.fun.comm.chkZindex(n, d, r), a || (kx.his.temp.addold({
                histype: "order",
                pageid: n,
                scale: kx.cache.scale[1] / kx.cache.scale[0],
                type: d,
                target: s,
                attr: "order_" + d,
                odata: l[1]
            }), kx.his.temp.addnew({
                histype: "order",
                pageid: n,
                scale: kx.cache.scale[1] / kx.cache.scale[0],
                type: d,
                target: s,
                attr: "order_" + d,
                ndata: h[1],
                cnum: e,
                tnum: o
            })), e == o - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        })
    }, orderHis: {
        back: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)this._doorder(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, redo: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)this._doorder(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, _doorder: function (e, t, a, i, c, o) {
            var n = o.zindex;
            kx.edata.edit(e, a, i, {zindex: n}), $("#" + i).css({"z-index": n}), kx.fun.comm.chkZindex(e, a, n)
        }
    }, __chicun: function (e, t, a, i, c) {
        var o = kx.edata.get(e, t, a), n = kx.cache.scale[1] / kx.cache.scale[0], d = kx.edata.edit(e, t, a, {
            width: i.width,
            height: i.height
        }), s = $("#j-" + e + "_wrap"), l = s.find("div.ui-selected"), r = l.length;
        kx.his.temp.init(), l.each(function (e) {
            {
                var t = $(this), a = t.attr("data-pageid"), s = t.attr("data-target"), l = t.attr("data-type");
                t.attr("data-svg")
            }
            "epic" == l ? (t.css({width: i.width * n, height: i.height * n}), t.find("img").css({
                width: i.width,
                height: i.height
            })) : "eel" == l && (t.css({width: i.width * n, height: i.height * n}), t.find("svg").css({
                width: i.width,
                height: i.height
            })), kx.sel.set(), c || (kx.his.temp.addold({
                histype: "chicun",
                pageid: a,
                scale: kx.cache.scale[1] / kx.cache.scale[0],
                type: l,
                target: s,
                attr: "chicun_" + l,
                odata: o[1]
            }), kx.his.temp.addnew({
                histype: "chicun",
                pageid: a,
                scale: kx.cache.scale[1] / kx.cache.scale[0],
                type: l,
                target: s,
                attr: "chicun_" + l,
                ndata: d[1],
                cnum: e,
                tnum: r
            })), e == r - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        })
    }, chicun: function (e, t, a, i) {
        var c = parseInt($("#j-md_chicunkuan").attr("data-old")), o = parseInt($("#j-md_chicungao").attr("data-old")), n = parseInt($("#j-md_chicunkuan").val()), d = parseInt($("#j-md_chicungao").val());
        1 == a ? ($("#j-md_chicunkuan").val(c + i + "px").attr("data-old", c + i), this.__chicun(e, t, kx.cache.selected.target, {
            width: c + i,
            height: o
        })) : 2 == a ? ($("#j-md_chicungao").val(o + i + "px").attr("data-old", o + i), this.__chicun(e, t, kx.cache.selected.target, {
            width: c,
            height: o + i
        })) : ($("#j-md_chicunkuan").attr("data-old", n), $("#j-md_chicungao").attr("data-old", d), this.__chicun(e, t, kx.cache.selected.target, {
            width: n,
            height: d
        }), kx.fun.menu.drop(e))
    }, chicunHis: {
        back: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)this._dochicun(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, redo: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)this._dochicun(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, _dochicun: function (e, t, a, i, c, o) {
            kx.editor.__chicun(e, a, i, {width: o.width, height: o.height}, 1), kx.fun.menu.drop(e)
        }
    }
}, kx.etext = {
    fixSizeScale: function (e, t, a, i, c, o) {
        var n = kx.edata.get(e, "etext", t)[1];
        $("#contenteditableCopy")[0] || $("body").append('<div id="contenteditableCopy"></div>');
        var d = $("#contenteditableCopy");
        d.css({
            "padding-top": o.css("padding-top"),
            "padding-right": o.css("padding-right"),
            "padding-bottom": o.css("padding-bottom"),
            "padding-left": o.css("padding-left"),
            "border-top-width": o.css("border-top-width"),
            "border-right-width": o.css("border-right-width"),
            "border-bottom-width": o.css("border-bottom-width"),
            "border-left-width": o.css("border-left-width"),
            "line-height": o.css("line-height"),
            "letter-spacing": o.css("letter-spacing"),
            "font-family": o.css("font-family"),
            "font-weight": o.css("font-weight"),
            "font-style": o.css("font-style"),
            "font-size": o.css("font-size"),
            "text-align": o.css("text-align"),
            "font-variant": o.css("font-variant"),
            "text-transform": o.css("text-transform"),
            "writing-mode": o.css("writing-mode"),
            "-webkit-writing-mode": o.css("-webkit-writing-mode"),
            "-webkit-user-modify": "read-write-plaintext-only",
            transform: "scale(" + c + ")",
            display: "inline-block",
            position: "absolute",
            top: "-10000px",
            left: "-10000px",
            "z-index": "100000",
            "word-wrap": "break-word",
            "white-space": "pre-wrap"
        }), d.html(o.html() + "");
        var s, l, r, h = d.width() * c, p = d.height() * c;
        h > a ? (s = a / h * c, l = i / p * c, r = Math.min(s, l)) : (s = a / h * c, l = i / p * c, r = Math.min(s, l)), d.css({transform: "scale(" + r + ")"});
        var x = .5 * (i - d.height() * r);
        if ("h" == n.fdir ? o.css({
                width: Math.ceil(a / r) + 1,
                height: i / r,
                transform: "translateY(" + x + "px) scale(" + r + ")"
            }) : "v" == n.fdir && o.css({
                width: Math.ceil(a / r) + 1,
                height: i / r,
                transform: "translateX(" + x + "px) scale(" + r + ")"
            }), -1 == t.indexOf("left_") && -1 == t.indexOf("preview_")) {
            kx.cache.fixSizeScale = [c, r];
            var f = Math.floor(r * kx.cache.fontsize / (kx.cache.scale[1] / kx.cache.scale[0])), g = {};
            g.fsize = f, kx.edata.edit(e, "etext", t, g)
        }
    }, fixScale: function (e, t, a, i, c, o) {
        var n, d, s, l = kx.edata.get(e, "etext", t)[1], r = kx.cache.scale[1] / kx.cache.scale[0], h = l.width * r, p = l.height * r;
        h > a ? (n = a / h * c, d = i / p * c, s = Math.min(n, d)) : (n = a / h * c, d = i / p * c, s = Math.min(n, d));
        var x = 0;
        if ("h" == l.fdir ? o.css({
                width: Math.ceil(a / s) + 1,
                height: i / s,
                transform: "translateY(" + x + "px) scale(" + s + ")"
            }) : "v" == l.fdir && o.css({
                width: Math.ceil(a / s) + 1,
                height: i / s,
                transform: "translateX(" + x + "px) scale(" + s + ")"
            }), -1 == t.indexOf("left_") && -1 == t.indexOf("preview_")) {
            kx.cache.fixSizeScale = [c, s];
            var f = Math.floor(s * kx.cache.fontsize / (kx.cache.scale[1] / kx.cache.scale[0])), g = {};
            g.fsize = f, kx.edata.edit(e, "etext", t, g)
        }
    }, ttransform: function (e, t) {
        e = e.replace("left_", "");
        var a = t.fsize / kx.cache.fontsize, i = kx.cache.scale[3] / kx.cache.scale[2], c = $("#left_" + e).find(".inner");
        if (kx.cache.lineheight - t.frow < 0)var o = t.fsize * (kx.cache.lineheight - t.frow) / 100 * i / 2; else var o = 0;
        c.css({transform: "translateY(" + o + "px) scale(" + a * i + ")"});
        var n = kx.cache.scale[1] / kx.cache.scale[0];
        if (kx.cache.lineheight - t.frow < 0)var d = t.fsize * (kx.cache.lineheight - t.frow) / 100 * n / 2; else var d = 0;
        if ($("#j-editText").find(".inner")[0])var s = $("#j-editText").find(".inner"); else var s = $("#" + e).find(".inner");
        s.css({transform: "translateY(" + d + "px) scale(" + a * n + ")"})
    }, editWh: function (e, t, a) {
        var i = kx.cache.selected.data;
        if (i || (kx.sel.updata(kx.editPage, "etext", e), i = kx.cache.selected.data), "fsize" == t)var c = a / kx.cache.fontsize; else var c = i.fsize / kx.cache.fontsize;
        if (scale = kx.cache.scale[1] / kx.cache.scale[0], $("#j-editText").find(".inner")[0])var o = $("#j-editText"); else var o = $("#" + e);
        var n = o.find(".inner");
        if (kx.cache.selected.target == e) {
            var d = kx.cache.selected.data.fdir;
            n.css({width: "v" == d ? "auto" : n.width(), height: "v" == d ? n.height() : "auto"})
        }
        if (i.fixed && 1 == i.fixed)"ftext" == t && (c = i.fsize / kx.cache.fontsize, kx.etext.fixScale(kx.editPage, e, i.width * scale, i.height * scale, c * scale, n)); else {
            var s = {width: n.width() * scale * c, height: n.height() * scale * c};
            o.attr({"data-width": s.width / scale, "data-height": s.height / scale}).css({
                width: s.width,
                height: s.height
            }), $("#j-editorSelect").css({
                width: s.width,
                height: s.height
            }), $("#" + e).attr({"data-width": s.width / scale, "data-height": s.height / scale}).css({
                width: s.width,
                height: s.height
            })
        }
    }, getWh: function (e, t, a) {
        var i = '<div id="' + e + '_hidden" style="display:inline-block;"><div class="inner rtext" style="font-family:' + t.ffamily + ";font-size:" + t.fsize + "px;text-align:" + t.falign + ";color:#" + t.fcolor + ";line-height:" + .01 * t.frow + ";font-weight:" + (1 == t.fbold ? "bold" : "normal") + ";text-transform:" + (1 == t.fcapital ? "Uppercase" : "none") + ";font-style:" + (1 == t.fitalic ? "italic" : "normal") + ";writing-mode:" + ("h" == t.fdir ? "horizontal-tb" : "vertical-rl") + ";-webkit-writing-mode:" + ("h" == t.fdir ? "horizontal-tb" : "vertical-rl") + ';border:0;padding:0;margin:0;word-wrap:break-word;white-space:pre-wrap;" contenteditable="false">' + kx.comm.processStr("d", t.ftext) + "</div></div>";
        $("#j-etexthidden").find("#" + e + "_hidden").length > 0 ? $("#j-etexthidden").find("#" + e + "_hidden").replaceWith(i) : $("#j-etexthidden").append(i);
        var c = 0, o = 0;
        setTimeout(function () {
            c = Math.ceil($("#" + e + "_hidden").width()) + 1, o = Math.ceil($("#" + e + "_hidden").height()) + 1, a(c, o, e, t)
        }, 20)
    }, getLineBreak: function (e, t) {
        var a = $("#" + e + "_inner").clone(), i = a.prop("id");
        a.prop("id", i + "_hiddensp");
        var c = a.html(), o = kx.etext.delitag(c);
        o = kx.etext.additag(o, [], !0), $("#j-etexthidden").find("#" + e + "_inner_hiddensp").length > 0 ? ($("#j-etexthidden").find("#" + e + "_inner_hiddensp").replaceWith(a), $("#j-etexthidden").find("#" + e + "_inner_hiddensp").html(o)) : ($("#j-etexthidden").append(a), $("#j-etexthidden").find("#" + e + "_inner_hiddensp").html(o));
        var n = [], d = 0, s = "";
        $("#j-etexthidden").find("#" + e + "_inner_hiddensp").find("span.sp,br").each(function (e) {
            var t = $(this), a = t[0].tagName.toLowerCase(), i = t.position().top;
            if (e > 0 && d != i) {
                if ("span" == a) {
                    t.html()
                }
                "span" == a && "span" == s && n.push(e)
            }
            d = i, s = a
        }), t(n, e)
    }, additag: function (e, t, a) {
        if (!e)return e;
        (-1 != e.indexOf('<span class="sp">') || -1 != e.indexOf("<br class")) && (e = kx.etext.delitag(e));
        var c = kx.comm.processStr("e", e), c = kx.comm.processStr("d", c), o = c.split("<br>"), n = [];
        for (var d in o) {
            var s = o[d], l = s.split("&nbsp;");
            if (0 == s.length && o.length - 1 != d)n.push("<br>"); else {
                for (var r in l) {
                    var h = l[r];
                    if (0 == h.length && l.length - 1 != r)n.push("&nbsp;"); else {
                        for (i = 0; i < h.length; i++) {
                            var p = h.substr(i, 1);
                            n.push(p)
                        }
                        l.length - 1 != r && n.push("&nbsp;")
                    }
                }
                o.length - 1 != d && n.push("<br>")
            }
        }
        var x = "";
        for (var d in n) {
            var p = n[d];
            "<br>" == p ? x += "<br>" : t && -1 != t.indexOf(parseInt(d)) ? (x += '<br class="spbr">', x += 1 == a ? '<span class="sp">' + p + "</span>" : p) : x += 1 == a ? '<span class="sp">' + p + "</span>" : p
        }
        return x
    }, delitag: function (e) {
        return _ftextsp = e.replace(/<br class="spbr">/gi, ""), _ftextsp = _ftextsp.replace(/<span class="sp">([\s\S]*?)<\/span>/gi, "$1")
    }, setDiyColor: function (e, t, a, i) {
        $("#j-mot_color").find("span").css({"background-color": "#" + t}), kx.etext._doEditText(e, "fcolor", t, a, i)
    }, setColor: function (e, t) {
        t.parent().find("li").removeClass("active"), t.addClass("active");
        var a = t.attr("data-color");
        $("#j-mot_color").find("span").css({"background-color": "#" + a}), kx.etext._doEditText(e, "fcolor", a)
    }, setFamily: function (e, t) {
        t.parent().find("li").removeClass("active"), t.addClass("active");
        var a = t.attr("data-ff");
        $("#j-mot_family").html('<span><i class="' + a + '">' + kx.default.family[a] + "</i></span>"), kx.etext._doEditText(e, "ffamily", a), kx.fun.menu.drop(e)
    }, setSize: function (e, t) {
        t.parent().find("li").removeClass("active"), t.addClass("active");
        var a = t.text();
        $("#j-mot_size").attr("data-fsize", a).html('<input type="text" value="' + a + '" />'), kx.etext._doEditText(e, "fsize", a), kx.fun.menu.drop(e)
    }, setItalic: function (e, t) {
        var a = 0;
        t.hasClass("active") ? (t.removeClass("active"), a = 0) : (t.addClass("active"), a = 1), kx.etext._doEditText(e, "fitalic", a)
    }, setCapital: function (e, t) {
        var a = 0;
        t.hasClass("active") ? (t.removeClass("active"), a = 0) : (t.addClass("active"), a = 1), kx.etext._doEditText(e, "fcapital", a)
    }, setAlign: function (e, t) {
        var a = function () {
            var e = [["left", "#j-md_alignl"], ["center", "#j-md_alignc"], ["right", "#j-md_alignr"], ["justify", "#j-md_alignj"]];
            $("#j-mot_align").find("span").attr("class", t);
            for (var a = 0; a < e.length; a++)e[a][0] == t ? $(e[a][1]).addClass("active") : $(e[a][1]).removeClass("active")
        };
        a(), kx.etext._doEditText(e, "falign", t)
    }, setDir: function (e, t) {
        "h" == t ? ($("#j-md_dirh").addClass("active"), $("#j-md_dirv").removeClass("active")) : "v" == t && ($("#j-md_dirh").removeClass("active"), $("#j-md_dirv").addClass("active")), kx.etext._doEditText(e, "fdir", t)
    }, _doEditText: function (e, t, a, i, c) {
        var o = {
            ftext: "text_text",
            ffamily: "text_family",
            fsize: "text_size",
            fcolor: "text_color",
            fdiycolor: "text_diycolor",
            fbold: "text_bold",
            fitalic: "text_italic",
            fcapital: "text_capital",
            falign: "text_align",
            frow: "text_row",
            fdir: "text_dir"
        }, n = function (i) {
            var c = $("#j-editText").find(".inner");
            c[0] || (c = $("#" + i).find(".inner"));
            var o = c.parent();
            if ("ffamily" == t)c.css({"font-family": a}), kx.etext.editWh(i, t, a); else if ("fcolor" == t)c.css({color: "#" + a}); else if ("ftext" == t)kx.etext.editWh(i, t, kx.comm.processStr("d", a)); else if ("fsize" == t) {
                var n = kx.cache.selected.data, d = kx.cache.scale[1] / kx.cache.scale[0];
                if (n.fixed && 1 == n.fixed) {
                    var s = n.fsize / kx.cache.fontsize;
                    kx.etext.fixScale(e, i, n.width * d, n.height * d, s * d, c)
                } else n.fsize = a, kx.etext.ttransform(i, n), kx.etext.editWh(i, t, a)
            } else if ("fitalic" == t)c.css({"font-style": 1 == a ? "italic" : "normal"}), kx.etext.editWh(i, t, a); else if ("fdir" == t) {
                var n = kx.cache.selected.data;
                "h" == a ? n.fdir = "h" : "v" == a && (n.fdir = "v"), kx.etext.ttransform(i, n);
                var l = function (e, t, a) {
                    c.css({
                        width: e / (s * d),
                        height: t / (s * d),
                        "writing-mode": a,
                        "-webkit-writing-mode": a
                    }), o.css({width: e, height: t}), $("#j-editorSelect").css({
                        width: e,
                        height: t
                    }), $("#" + i).css({width: e, height: t})
                };
                if ("h" == a) {
                    if ("vertical-rl" == c.css("writing-mode") || "vertical-rl" == c.css("-webkit-writing-mode")) {
                        var r = o.attr("data-width"), h = o.attr("data-height");
                        o.attr("data-width", h), o.attr("data-height", r), l(o.attr("data-width") * d, o.attr("data-height") * d, "horizontal-tb"), kx.fun.comm.resizeHandle("e,w")
                    }
                } else if ("v" == a && ("horizontal-tb" == c.css("writing-mode") || "horizontal-tb" == c.css("-webkit-writing-mode"))) {
                    var r = o.attr("data-width"), h = o.attr("data-height");
                    o.attr("data-width", h), o.attr("data-height", r), l(o.attr("data-width") * d, o.attr("data-height") * d, "vertical-rl"), kx.fun.comm.resizeHandle("n,s")
                }
                kx.sel.set()
            } else if ("fcapital" == t)c.css({"text-transform": 1 == a ? "Uppercase" : "none"}), kx.etext.editWh(i, t, a); else if ("falign" == t)c.css({"text-align": a}); else if ("frow" == t) {
                var n = kx.cache.selected.data;
                n.frow = a, kx.etext.ttransform(i, n), c.css({"line-height": .01 * a}), kx.etext.editWh(i, t, a)
            }
        };
        kx.his.temp.init();
        var d = ($("#" + kx.cache.selected.target), kx.cache.selected.type), s = kx.cache.selected.target, l = kx.cache.scale[1] / kx.cache.scale[0], r = 1, h = kx.edata.get(e, "etext", s);
        n(s);
        var p = {};
        if (p[t] = "ftext" == t ? kx.comm.processStr("e", a) : a, r = "fsize" == t ? a / kx.cache.fontsize : kx.cache.selected.data.fsize / kx.cache.fontsize, kx.cache.selected.data.fixed && 1 == kx.cache.selected.data.fixed || (p.width = $("#" + s + "_inner").width() * r || 100, p.height = $("#" + s + "_inner").height() * r || 10, p.top = parseInt($("#" + s).css("top")) / l, p.left = parseInt($("#" + s).css("left")) / l), !c) {
            var x = kx.edata.edit(e, "etext", s, p);
            kx.fun.pp.creatLeftPrint(kx.editPage)
        }
        i || (kx.his.temp.addold({
            histype: "edittext",
            pageid: e,
            scale: kx.cache.scale[1] / kx.cache.scale[0],
            type: d,
            target: s,
            attr: o[t],
            odata: h[1]
        }), kx.his.temp.addnew({
            histype: "editText",
            pageid: e,
            scale: kx.cache.scale[1] / kx.cache.scale[0],
            type: d,
            target: s,
            attr: o[t],
            ndata: x[1],
            cnum: 0,
            tnum: 1
        }))
    }, editHis: {
        back: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)"text_textsize" == c[n] ? (this._doedit(e[n], t[n], a[n], i[n], "text_text", o[n]), this._doedit(e[n], t[n], a[n], i[n], "text_size", o[n])) : this._doedit(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, redo: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)"text_textsize" == c[n] ? (this._doedit(e[n], t[n], a[n], i[n], "text_text", o[n]), this._doedit(e[n], t[n], a[n], i[n], "text_size", o[n])) : this._doedit(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, _doedit: function (e, t, a, i, c, o) {
            if (kx.fun.menu.main(e), kx.fun.menu.drop(e), $("#" + i).trigger("mousedown"), kx.sel.updata(e, a, i), "text_family" == c)kx.etext._doEditText(e, "ffamily", o.ffamily, 1); else if ("text_text" == c) {
                var n = kx.comm.processStr("d", o.ftext);
                $("#" + i).find(".inner").html(n), $("#editText").find(".inner").html(n), kx.etext.editWh(i, "ftext", n), kx.etext._doEditText(e, "ftext", n, 1)
            } else"text_color" == c ? kx.etext._doEditText(e, "fcolor", o.fcolor, 1) : "text_size" == c ? kx.etext._doEditText(e, "fsize", o.fsize, 1) : "text_italic" == c ? kx.etext._doEditText(e, "fitalic", o.fitalic, 1) : "text_capital" == c ? kx.etext._doEditText(e, "fcapital", o.fcapital, 1) : "text_align" == c ? kx.etext._doEditText(e, "falign", o.falign, 1) : "text_row" == c ? kx.etext._doEditText(e, "frow", o.frow, 1) : "text_dir" == c && kx.etext._doEditText(e, "fdir", o.fdir, 1)
        }
    }
}, kx.eel = {
    isvgclass: function () {
        kx.cache.svgcolors.icolor = [];
        var e = $("#" + kx.cache.selected.target), t = function (e, t) {
            t = t.toLowerCase();
            var a = $(this).attr("class") || "";
            a.indexOf(t) < 0 && e.attr("class", a + ("" == a ? "" : " ") + t), kx.cache.svgcolors.icolor.push(t.split("_")[1])
        };
        e.each(function () {
            $(this).find("svg").attr("data-init", "1");
            var e = $(this).find("svg").find("g#no,g#NO,g#No,g#nO");
            e.length > 0 && e.find("rect,circle,ellipse,line,polyline,polygon,path").attr("data-nocolor", "1"), $(this).find("rect,circle,ellipse,line,polyline,polygon,path").each(function () {
                var e = $(this), a = e.attr("data-nocolor") || "0", i = e.attr("style"), c = e.attr("fill"), o = e.attr("stroke");
                if ("1" != a)if (i)for (var n = i.split(";"), d = n.length, s = 0; d > s; s++)if (n[s].indexOf("fill:") >= 0) {
                    var l = n[s].split(":")[1];
                    l = kx.comm.rgb2hex(l).replace("#", ""), t(e, "kxf_" + l)
                } else if (n[s].indexOf("stroke:") >= 0) {
                    var r = n[s].split(":")[1];
                    r = kx.comm.rgb2hex(r).replace("#", ""), t(e, "kxs_" + r)
                } else t(e, "kxf_000000"); else c && "none" != c && (c = kx.comm.rgb2hex(c).replace("#", ""), t(e, "kxf_" + c)), o && "none" != o && (o = kx.comm.rgb2hex(o).replace("#", ""), t(e, "kxs_" + o)), c || o || t(e, "kxf_000000")
            })
        });
        for (var a = 0; a < kx.cache.svgcolors.icolor.length; a++)kx.cache.svgcolors.icolor[a] = kx.comm.rgb2hex(kx.cache.svgcolors.icolor[a]);
        kx.cache.svgcolors.icolor = kx.comm.unique(kx.cache.svgcolors.icolor)
    }, isvgtext: function (e, t, a) {
        kx.cache.svgtexts = [];
        var i = $("#" + a);
        i.each(function () {
            var i = $(this), c = i.attr("data-type"), o = i.attr("data-target"), n = kx.edata.get(t, c, o)[1], d = n.width / n.svgwh[0];
            n.group || (n.group = []);
            var s = n.top, l = n.left, r = $(this).find("svg").find("text"), h = r.length;
            $(this).find("svg").attr("data-inittext", "1"), r.each(function (i) {
                var c = $(this), n = c.text(), r = c.attr("font-family"), p = Math.floor(parseInt(c.attr("font-size")) * d), x = c.attr("fill") || "000000", f = c.attr("writing-mode"), g = c.attr("transform");
                if (g) {
                    var k = g.replace("matrix(", "").replace(")", "").replace(/\s/g, ",").split(",")[4];
                    k *= d
                } else var k = 0;
                var u = $(this).parent(), m = u.find("rect"), v = u.attr("id");
                m[0] || (m = u.parent().find("rect"), v = u.parent().attr("id")), v = v ? v.substr(0, 1).toLowerCase() : "l";
                var j = m.attr("x") || 0, w = m.attr("y") || 0, y = parseInt(w * d), b = parseInt(j * d), _ = parseInt(m.attr("width")) * d, C = parseInt(m.attr("height")) * d;
                r = r || "a25", r = r.replace(/'/g, "").replace(/"/g, "");
                for (var P = ["microsoftyahei", "fzltcxhjw--gb1-0", "fzlthjw--gb1-0", "fzltchjw--gb1-0", "lisu", "fzdhtjw--gb1-0", "fzbsjw--gb1-0", "fzbwksjw--gb1-0", "fzxkjw--gb1-0", "fzkatjw--gb1-0", "fzktjw--gb1-0", "fzlbjw--gb1-0", "fzlsjw--gb1-0", "fzqtjw--gb1-0", "fzssjw--gb1-0", "fzstjw--gb1-0", "fzwbjw--gb1-0", "fzxshjw--gb1-0", "fzy4jw--gb1-0", "fzy3jw--gb1-0", "fzy1jw--gb1-0", "fzxbsjw--gb1-0", "fzzzhongjw--gb1-0", "fzzhjw--gb1-0", "fzcqjw--gb1-0", "fzzyjw--gb1-0", "arialmt", "bookmanoldstyle", "dorovarflf-carolus", "century", "compactabt-bold", "copperplategothicbt-roman", "creampuff", "diskusd-medi", "embassybt-regular", "engraversgothicbt-regular"], z = ["a1", "a9", "a25", "a26", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a10", "a11", "a12", "a13", "a14", "a15", "a16", "a17", "a18", "a19", "a20", "a21", "a22", "a23", "a24", "c1", "c2", "c3", "c4", "c7", "c8", "c9", "c10", "c11", "c12"], I = 0; I < P.length; I++)r.toLowerCase() == P[I] && (r = z[I]);
                var T = {
                    ftext: n,
                    ffamily: r,
                    fsize: p,
                    fcolor: x.replace("#", ""),
                    fbold: "0",
                    fcapital: "0",
                    frow: "100",
                    fdir: "tb" == f ? "v" : "h",
                    fitalic: "0",
                    opacity: "100",
                    rotate: "0",
                    width: 0,
                    height: 0,
                    multi: 1,
                    left: l + b,
                    top: s + y,
                    version: 0
                }, S = "etext_" + a.replace("left_", "") + "_" + i;
                if ("left" == e)var E = kx.cache.scale[3] / kx.cache.scale[2]; else if ("preview" == e)var E = kx.cache.scale[5]; else var E = kx.cache.scale[1] / kx.cache.scale[0];
                kx.etext.getWh(S, T, function () {
                    var a = "left_";
                    a = "preview" == e ? "left_" : "preview_", T.width = _, T.height = C, T.falign = "l" == v ? "left" : "c" == v ? "center" : "r" == v ? "right" : "right", T.fixed = 1;
                    var c = t.replace("left_", "");
                    T.zindex = kx.cache.zindex[c][0] + 1, m.parent().remove(), kx.cache.svgtexts.push(o.replace("left_", "")), kx.cache.svgtexts.push(S);
                    var n = kx.edata.get(t, "etext", S);
                    if (n || kx.edata.add(t, "etext", S, T), kx.fun.comm.insert(e, t, E, "etext", S, T, function () {
                        }), i == h - 1) {
                        kx.cache.svgtexts = kx.comm.unique(kx.cache.svgtexts);
                        for (var d = 0; d < kx.cache.svgtexts.length; d++)-1 != kx.cache.svgtexts[d].indexOf("etext") && kx.edata.edit(t, "etext", kx.cache.svgtexts[d], {group: kx.cache.svgtexts.concat()}), -1 != kx.cache.svgtexts[d].indexOf("eel") && kx.edata.edit(t, "eel", o, {
                            svgdata: $("#" + o).find(".inner").find("svg").prop("outerHTML"),
                            group: kx.cache.svgtexts.concat()
                        });
                        kx.cache.svgtexts = []
                    }
                })
            })
        })
    }, csvgtext: function (e, t, a) {
        var i = $("#" + a);
        i.each(function () {
            var e = $(this), a = e.attr("data-target"), i = $(this).find("svg").find("text"), c = i.length;
            $(this).find("svg").attr("data-inittext", "1"), c > 0 && (i.remove(), kx.edata.edit(t, "eel", a, {svgdata: $("#" + a).find(".inner").find("svg").prop("outerHTML")}), $.alert("检测到您添加的SVG素材中包含未转曲文字，系统已自动清理，<br />若要保留这些文字信息，请添加文字转曲后的SVG素材。"))
        })
    }, icolor: function (e, t) {
        $("#" + kx.cache.selected.target).find("svg").attr("data-init") || kx.eel.isvgclass(), kx.cache.svgcolors.color = 0 == t.length ? kx.cache.svgcolors.icolor.concat() : t.concat(), kx.edata.edit(e, "eel", kx.cache.selected.target, {
            svgdata: $("#" + kx.cache.selected.target).find(".inner").find("svg").prop("outerHTML"),
            icolors: kx.cache.svgcolors.icolor,
            colors: kx.cache.svgcolors.color
        }), kx.cache.svgcolors.color = kx.cache.svgcolors.color.concat(), $("#j-moe_color").find("span").html("");
        var a = kx.cache.svgcolors.icolor, i = kx.cache.svgcolors.color;
        if (i.length > 0) {
            $("#j-mo_eel").find(".splitcolor").show();
            for (var c = 0; c < i.length; c++)$("#j-moe_color").find("span").append('<i style="background-color:#' + i[c] + '" data-icolor="' + a[c] + '"  data-ocolor="' + i[c] + '" data-color="' + i[c] + '"></i>')
        } else $("#j-mo_eel").find(".splitcolor").hide()
    }, itext: function (e, t, a) {
        var i = $("#" + a).find("svg");
        i.attr("data-inittext") || "tbz" != i.attr("data-source") ? kx.eel.csvgtext(e, t, a) : kx.eel.isvgtext(e, t, a)
    }, setnewcolor: function (e, t) {
        for (var a = 0; a < kx.cache.svgcolors.icolor.length; a++)kx.cache.svgcolors.icolor[a] == e && (kx.cache.svgcolors.color[a] = t)
    }, setDiyColor: function (e, t, a, i, c, o) {
        o || ($("#j-moe_color").attr({"data-color": a}), kx.eel.setnewcolor(i, a)), kx.eel._dosetColor(e, t, a, i, c, o)
    }, setColor: function (e, t) {
        t.parent().find("li").removeClass("active"), t.addClass("active");
        var a = $("#j-moe_color").attr("data-icolor"), i = $("#j-moe_color").attr("data-ocolor"), c = t.attr("data-color");
        $("#j-moe_color").attr({"data-color": c}), kx.eel.setnewcolor(a, c), kx.eel._dosetColor(e, i, c, a)
    }, _dosetColor: function (e, t, a, i, c, o) {
        t = t.toLowerCase(), a = a.toLowerCase(), i = i.toLowerCase(), $("#j-moe_color").find("[data-icolor=" + i + "]").attr("data-ocolor", a).attr("data-color", a).css({"background-color": "#" + a}), $("#j-moe_color").attr("data-ocolor", a).attr("data-color", a), kx.his.temp.init();
        for (var n = 0; n < kx.cache.multiselected.length; n++) {
            var d = $("#" + kx.cache.multiselected[n]), s = d.attr("data-pageid"), l = d.attr("data-type"), r = d.attr("data-target");
            if ("eel" == l) {
                d.find("svg").find(".kxf_" + i).attr("fill", "#" + a), d.find("svg").find(".kxs_" + i).attr("stroke", "#" + a);
                for (var h = kx.edata.get(s, "eel", r), p = d.find(".inner").find("svg").prop("outerHTML"), x = 0; x < kx.cache.svgcolors.color.length; x++)kx.cache.svgcolors.icolor[x] + "_" + kx.cache.svgcolors.color[x] == i + "_" + t && (kx.cache.svgcolors.color[x] = a);
                if (!o) {
                    var f = kx.edata.edit(s, "eel", r, {svgdata: p, colors: kx.cache.svgcolors.color});
                    n == kx.cache.multiselected.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
                }
                c || (kx.his.temp.addold({
                    histype: "elcolor",
                    pageid: s,
                    scale: kx.cache.scale[1] / kx.cache.scale[0],
                    type: l,
                    target: r,
                    attr: "elcolor" + l,
                    odata: h[1]
                }), kx.his.temp.addnew({
                    histype: "elcolor",
                    pageid: s,
                    scale: kx.cache.scale[1] / kx.cache.scale[0],
                    type: l,
                    target: r,
                    attr: "elcolor_" + l,
                    ndata: f[1],
                    cnum: 0,
                    tnum: 1
                }))
            }
        }
    }, elcolorHis: {
        back: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)this._doedit(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, redo: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)this._doedit(e[n], t[n], a[n], i[n], c[n], o[n]), n == i.length - 1 && kx.fun.pp.creatLeftPrint(kx.editPage)
        }, _doedit: function (e, t, a, i, c, o) {
            kx.fun.menu.main(e), kx.fun.menu.drop(e), kx.fun.comm.insert("right", e, t, a, i, o, function () {
            }), kx.edata.edit(e, a, i, o)
        }
    }
}, kx.ebg = {
    initusedbg: function () {
        for (var e = "", t = CONFIG.BGUSEDCOLOR.length - 1; t >= 0; t--)t > -1 && (e += '<li class="item li' + t + '" data-color="' + CONFIG.BGUSEDCOLOR[t] + '"><i style="background-color:#' + CONFIG.BGUSEDCOLOR[t] + '"></i></li>');
        $("#j-bgusedColor").find(".colorList").html(e)
    }, initbg: function (e, t) {
        e = e || kx.editPage, t.color = t.color.toLowerCase() || "ffffff", $("#j-" + e + "_wrap").css("" != t.url && 1 == t.show ? {
            background: "url(" + t.url + ") no-repeat 50% 50% #" + t.color,
            "background-size": "cover"
        } : {background: "#" + t.color}), $("#j-bgcList").find("li").removeClass("active"), $("#j-bgcList").find("li[data-color=" + t.color + "]").addClass("active"), "" != t.url ? ($("#j-bgPicBox").html('<div class="imgw" style="background:url(' + t.url + ') 50% 50% no-repeat;background-size:cover;"></div>'), $("#j-bgPicBox").parent().addClass("hasimg")) : ($("#j-bgPicBox").html(""), $("#j-bgPicBox").parent().removeClass("hasimg")), 1 == t.show ? $("#j-bgpopt").find(".show").html("隐藏") : 0 == t.show && $("#j-bgpopt").find(".show").html("显示"), $("#j-bgcdiy").attr("data-color", t.color), kx.ebg.initusedbg()
    }, setbg: function (e, t, a, i, c) {
        if (kx.his.temp.init(), kx.ebg.initbg(e, a), !c) {
            {
                kx.edata.edit(e, "ebg", "ebg", a)
            }
            kx.fun.pp.creatLeftPrint(e)
        }
        i || (kx.his.temp.addold({
            histype: "setbg",
            pageid: e,
            scale: kx.cache.scale[1] / kx.cache.scale[0],
            type: "ebg",
            target: "ebg",
            attr: "setbg",
            odata: t
        }), kx.his.temp.addnew({
            histype: "setbg",
            pageid: e,
            scale: kx.cache.scale[1] / kx.cache.scale[0],
            type: "ebg",
            target: "ebg",
            attr: "setbg",
            ndata: a,
            cnum: 0,
            tnum: 1
        })), kx.fun.pp.creatLeftPrint(kx.editPage)
    }, bgHis: {
        back: function (e, t, a, i, c, o, n) {
            for (var d = 0; d < i.length; d++)kx.edata.edit(e[d], "ebg", i[d], o[d]), kx.ebg.setbg(e[d], n[d], o[d], i[d], 1)
        }, redo: function (e, t, a, i, c, o, n) {
            for (var d = 0; d < i.length; d++)kx.edata.edit(e[d], "ebg", i[d], n[d]), kx.ebg.setbg(e[d], o[d], n[d], i[d], 1)
        }
    }
}, kx.epic = {
    croppic: function () {
        var e = $("#" + kx.cache.selected.target), t = "up" + (new Date).getTime(), a = e.find("img").attr("src"), i = e.find("img").parent().parent().attr("data-target"), c = layer.open({
            type: 1,
            title: "裁剪",
            maxWidth: 500,
            skin: "m-cardLayer",
            content: '<div class="cropDialog" id="' + t + '"><div class="cropBox"><img src="' + a + '" class="upimg" data-target="' + i + '"></div><div class="cropBot"><a href="javascript:void(0)" class="ok" data-method="getData">确定</a><a href="javascript:void(0)" class="cancel">取消</a></div></div>',
            success: function (e) {
                var a = $("#" + t).find("img.upimg");
                a.cropper({background: !0, modal: !1}), e.find(".ok").on("click", function () {
                    kx.backopt.cropimg(a, a.cropper("getData")), layer.close(c)
                }), e.find(".cancel").on("click", function () {
                    layer.close(c)
                })
            }
        })
    }, setCrop: function (e, t, a, i, c) {
        kx.his.temp.init(), $("#" + i).find("img").attr("src", a.url), c || (kx.his.temp.addold({
            histype: "setCrop",
            pageid: e,
            scale: kx.cache.scale[1] / kx.cache.scale[0],
            type: "croppic",
            target: i,
            attr: "setCrop",
            odata: t
        }), kx.his.temp.addnew({
            histype: "setCrop",
            pageid: e,
            scale: kx.cache.scale[1] / kx.cache.scale[0],
            type: "croppic",
            target: i,
            attr: "setCrop",
            ndata: a,
            cnum: 0,
            tnum: 1
        })), kx.fun.pp.creatLeftPrint(kx.editPage)
    }, setCropHis: {
        back: function (e, t, a, i, c, o, n) {
            for (var d = 0; d < i.length; d++)kx.edata.edit(e[d], "epic", i[d], o[d]), kx.epic.setCrop(e[d], n[d], o[d], i[d], 1)
        }, redo: function (e, t, a, i, c, o, n) {
            for (var d = 0; d < i.length; d++)kx.edata.edit(e[d], "epic", i[d], n[d]), kx.epic.setCrop(e[d], o[d], n[d], i[d], 1)
        }
    }, changePic: function (e, t, a, i, c) {
        kx.his.temp.init(), $("#" + i).find("img").attr("src", a.url), c || (kx.his.temp.addold({
            histype: "changePic",
            pageid: e,
            scale: kx.cache.scale[1] / kx.cache.scale[0],
            type: "changePic",
            target: i,
            attr: "changePic",
            odata: t
        }), kx.his.temp.addnew({
            histype: "changePic",
            pageid: e,
            scale: kx.cache.scale[1] / kx.cache.scale[0],
            type: "changePic",
            target: i,
            attr: "changePic",
            ndata: a,
            cnum: 0,
            tnum: 1
        })), kx.fun.pp.creatLeftPrint(kx.editPage)
    }, changePicHis: {
        back: function (e, t, a, i, c, o, n) {
            for (var d = 0; d < i.length; d++)kx.edata.edit(e[d], "epic", i[d], o[d]), kx.epic.changePic(e[d], n[d], o[d], i[d], 1)
        }, redo: function (e, t, a, i, c, o, n) {
            for (var d = 0; d < i.length; d++)kx.edata.edit(e[d], "epic", i[d], n[d]), kx.epic.changePic(e[d], o[d], n[d], i[d], 1)
        }
    }
}, kx.epage = {
    order: function (e, t, a, i) {
        a = a || CONFIG.PAGES;
        var c = e.replace("left_", ""), o = $("#j-" + e + "_wrap"), n = a.length, d = kx.comm.findary(a, c);
        if ($("#j-eleftPrint").find(".rightAnimate").removeClass("rightAnimate"), -1 == t) {
            if (d > 0) {
                var s = a[d - 1], l = $("#j-left_" + s + "_wrap"), r = s.replace("left_", "");
                l.before(o), CONFIG.PAGES = kx.comm.changeary(CONFIG.PAGES, c, r);
                var h = CONFIG.PAGES.slice();
                kx.fun.pp.chkpage(), kx.his.temp.init(), i || (kx.his.temp.addold({
                    histype: "orderpage",
                    pageid: e,
                    scale: kx.cache.scale[3] / kx.cache.scale[2],
                    type: "orderpage",
                    target: "orderpage",
                    attr: "orderpage",
                    odata: {pary: h, step: t}
                }), kx.his.temp.addnew({
                    histype: "orderpage",
                    pageid: e,
                    scale: kx.cache.scale[3] / kx.cache.scale[2],
                    type: "orderpage",
                    target: "orderpage",
                    attr: "orderpage",
                    ndata: {pary: a, step: t},
                    cnum: 0,
                    tnum: 1
                }))
            }
        } else if (d > -1 && n - 1 > d) {
            var s = CONFIG.PAGES[d + 1], p = $("#j-left_" + s + "_wrap"), r = s.replace("left_", "");
            p.after(o), CONFIG.PAGES = kx.comm.changeary(CONFIG.PAGES, c, r);
            var h = CONFIG.PAGES.slice();
            kx.fun.pp.chkpage(), kx.his.temp.init(), i || (kx.his.temp.addold({
                histype: "orderpage",
                pageid: e,
                scale: kx.cache.scale[3] / kx.cache.scale[2],
                type: "orderpage",
                target: "orderpage",
                attr: "orderpage",
                odata: {pary: h, step: t}
            }), kx.his.temp.addnew({
                histype: "orderpage",
                pageid: e,
                scale: kx.cache.scale[3] / kx.cache.scale[2],
                type: "orderpage",
                target: "orderpage",
                attr: "orderpage",
                ndata: {pary: a, step: t},
                cnum: 0,
                tnum: 1
            }))
        }
    }, orderHis: {
        back: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)kx.epage.order(e[n], -o[n].step, o[n].pary, 1)
        }, redo: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)kx.epage.order(e[n], o[n].step, o[n].pary, 1)
        }
    }, add: function (e, t, a, i, c) {
        e = e || "left_page_" + kx.comm.radomid(), t = t || kx.cache.scale[3] / kx.cache.scale[2], a = a || {
                etext: [],
                eel: [],
                epic: [],
                ebg: [["ebg", {color: "ffffff", url: "", show: "0", zindex: "0"}]]
            }, i = i || "lastPage";
        var o = e.replace("left_", ""), n = i.replace("left_", "");
        kx.his.temp.init();
        for (var d = 0; d < a.etext.length; d++)a.etext[d][0] = "etext_" + kx.comm.radomid();
        for (var d = 0; d < a.epic.length; d++)a.epic[d][0] = "epic_" + kx.comm.radomid();
        for (var d = 0; d < a.eel.length; d++)a.eel[d][0] = "eel_" + kx.comm.radomid();
        EDITDATA[o] = a;
        var s = -1;
        s = "firstPage" == n ? -1 : "lastPage" == n ? CONFIG.PAGES.length - 1 : kx.comm.findary(CONFIG.PAGES, n), CONFIG.PAGES = kx.comm.insertposary(CONFIG.PAGES, s, o), kx.fun.pp.creatNewPrint(e, i, kx.cache.editorWidth, kx.cache.editorHeight, kx.cache.editorBleed, t, a), c || (kx.his.temp.addold({
            histype: "addpage",
            pageid: e,
            scale: t,
            type: "addpage",
            target: i,
            attr: "addpage",
            odata: {}
        }), kx.his.temp.addnew({
            histype: "addpage",
            pageid: e,
            scale: t,
            type: "addpage",
            target: i,
            attr: "addpage",
            ndata: {pdata: a},
            cnum: 0,
            tnum: 1
        }))
    }, addHis: {
        back: function (e, t, a, i) {
            for (var c = 0; c < i.length; c++)kx.epage.del(e[c], 1)
        }, redo: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)kx.epage.add(e[n], t[n], o[n].pdata, i[n], 1)
        }
    }, del: function (e, t) {
        var a = e.replace("left_", "");
        if (CONFIG.PAGES.length > 1) {
            kx.his.temp.init();
            var i = kx.comm.findary(CONFIG.PAGES, a), c = "firstPage";
            i == CONFIG.PAGES.length - 1 ? c = "lastPage" : i > 0 && i < CONFIG.PAGES.length - 1 && (c = CONFIG.PAGES[i - 1]);
            {
                $("#j-" + e + "_wrap").removeClass("rightAnimate").offset().top + $("#j-rightPannel").scrollTop()
            }
            CONFIG.PAGES = kx.comm.removeary(CONFIG.PAGES, a);
            var o = $.extend(!0, {}, EDITDATA[a]);
            delete EDITDATA[a], $("#j-" + e + "_wrap").remove(), kx.fun.pp.setCurrentPage(CONFIG.PAGES[0]), kx.fun.pp.chkpage(), t || (kx.his.temp.addold({
                histype: "delpage",
                pageid: e,
                scale: kx.cache.scale[3] / kx.cache.scale[2],
                type: "delpage",
                target: c,
                attr: "delpage",
                odata: o
            }), kx.his.temp.addnew({
                histype: "delpage",
                pageid: e,
                scale: kx.cache.scale[3] / kx.cache.scale[2],
                type: "delpage",
                target: c,
                attr: "delpage",
                ndata: {},
                cnum: 0,
                tnum: 1
            }))
        }
    }, delHis: {
        back: function (e, t, a, i, c, o) {
            for (var n = 0; n < i.length; n++)kx.epage.add(e[n], t[n], o[n], i[n], 1);
            kx.fun.pp.chkpage()
        }, redo: function (e, t, a, i) {
            for (var c = 0; c < i.length; c++)kx.epage.del(e[c], 1);
            kx.fun.pp.chkpage()
        }
    }, copy: function (e, t) {
        var a = "left_page_" + kx.comm.radomid(), i = e.replace("left_", ""), c = $.extend(!0, {}, EDITDATA[i]), o = kx.cache.scale[3] / kx.cache.scale[2];
        kx.epage.add(a, o, c, e, t)
    }, getPrintMax: function () {
        kx.cache.pagemax = {};
        var e = function (e) {
            if (e.length > 0)for (var t = 1e5, a = 0, i = 0, c = 1e5, o = 0; o < e.length; o++)t = Math.min(t, parseInt(e[o][1].top)), c = Math.min(c, parseInt(e[o][1].left)), a = Math.max(a, parseInt(e[o][1].left) + parseInt(e[o][1].width)), i = Math.max(i, parseInt(e[o][1].top) + parseInt(e[o][1].height)); else var t = 0, a = 0, i = 0, c = 0;
            return {top: t, right: a, bottom: i, left: c}
        }, t = function (t) {
            var a = {}, i = 1e5, c = 0, o = 0, n = 1e5;
            a.text = e(EDITDATA[t].etext), a.pic = e(EDITDATA[t].epic), a.el = e(EDITDATA[t].eel);
            for (var d in a)i = Math.min(i, a[d].top), n = Math.min(n, a[d].left), c = Math.max(c, a[d].right), o = Math.max(o, a[d].bottom);
            return {width: c - n, height: o - i}
        }, a = {}, i = 1, c = 1;
        for (var o in EDITDATA)a[o] = t(o);
        for (var n in a)i = Math.max(i, a[n].width), c = Math.max(c, a[n].height);
        kx.cache.pagemax.width = i, kx.cache.pagemax.height = c
    }, changeAllSize: function (e) {
        for (var t in EDITDATA)for (var a in EDITDATA[t])for (var i = 0; i < EDITDATA[t][a].length; i++)EDITDATA[t][a][i][1].width && ("etext" == a && kx.edata.edit(t, a, EDITDATA[t][a][i][0], {fsize: Math.ceil(EDITDATA[t][a][i][1].fsize * e)}), kx.edata.edit(t, a, EDITDATA[t][a][i][0], {
            top: EDITDATA[t][a][i][1].top * e,
            left: EDITDATA[t][a][i][1].left * e,
            width: EDITDATA[t][a][i][1].width * e,
            height: EDITDATA[t][a][i][1].height * e
        }))
    }, setSize: function (e, t, a) {
        e = e || kx.cache.editorWidth, t = t || kx.cache.editorHeight;
        kx.cache.scale[1] / kx.cache.scale[0];
        if (!a)var i = {
            pwidth: kx.cache.editorWidth,
            pheight: kx.cache.editorHeight,
            pbleed: kx.cache.editorBleed,
            pscale: kx.cache.scale[1] / kx.cache.scale[0]
        };
        if (e != kx.cache.editorWidth)if (t == kx.cache.editorHeight)e > kx.cache.editorWidth ? kx.cache.scale[1] = 1 : (kx.epage.getPrintMax(), kx.cache.scale[1] = e >= kx.cache.pagemax.width ? 1 : e / kx.cache.editorWidth); else {
            var c = e / kx.cache.editorWidth, o = t / kx.cache.editorHeight;
            kx.cache.scale[1] = Math.min(c, o)
        } else {
            if (t == kx.cache.editorHeight)return !1;
            t > kx.cache.editorHeight ? kx.cache.scale[1] = 1 : (kx.epage.getPrintMax(), kx.cache.scale[1] = t >= kx.cache.pagemax.height ? 1 : t / kx.cache.editorHeight)
        }
        _scale = kx.cache.scale[1] / kx.cache.scale[0], kx.epage.changeAllSize(_scale), "px" == CONFIG.UNIT ? (CONFIG.WIDTH = Math.ceil(e), CONFIG.HEIGHT = Math.ceil(t)) : (CONFIG.WIDTH = $("#j-esizeWidth").val(), CONFIG.HEIGHT = $("#j-esizeHeight").val()), 1 == kx.cache.actual ? (CONFIG.RADIO = 1, kx.fun.pp.creatRightPrint(e, t, kx.cache.editorBleed, 1, 0), kx.cache.scale = [1, 1], $("#j-ezoomin").find(".text").html("100%")) : (kx.fun.pp.setBaseInfo(), kx.fun.pp.getFullScale(), _scale = kx.cache.scale[1] / kx.cache.scale[0], kx.fun.pp.creatRightPrint(e, t, kx.cache.editorBleed, _scale, 0), CONFIG.RADIO = _scale, $("#j-ezoomin").find(".text").html(Math.round(100 * _scale) + "%"));
        var n = {
            pwidth: kx.cache.editorWidth,
            pheight: kx.cache.editorHeight,
            pbleed: kx.cache.editorBleed,
            pscale: _scale
        };
        a || (kx.his.temp.init(), kx.his.temp.addold({
            histype: "resizepage",
            pageid: kx.editPage,
            scale: kx.cache.scale[1] / kx.cache.scale[0],
            type: "resizepage",
            target: kx.editPage,
            attr: "resizepage",
            odata: i
        }), kx.his.temp.addnew({
            histype: "resizepage",
            pageid: kx.editPage,
            scale: kx.cache.scale[1] / kx.cache.scale[0],
            type: "resizepage",
            target: kx.editPage,
            attr: "resizepage",
            ndata: n,
            cnum: 0,
            tnum: 1
        })), kx.fun.pp.getLeftScale(), kx.fun.pp.creatLeftPrint()
    }, setSizeHis: {
        back: function (e, t, a, i, c, o, n) {
            for (var d = 0; d < i.length; d++)this._dosize(o[d].pwidth, o[d].pheight, o[d].pbleed, o[d].pscale, n[d].pscale)
        }, redo: function (e, t, a, i, c, o, n) {
            for (var d = 0; d < i.length; d++)this._dosize(n[d].pwidth, n[d].pheight, n[d].pbleed, n[d].pscale, o[d].pscale)
        }, _dosize: function () {
        }
    }
}, kx.his = {
    hisdata: {back: [], redo: []}, hisdatasave: "", temp: {
        init: function () {
            kx.cache.histemp = {pageid: [], scale: [], type: [], target: [], attr: [], data: [[], []]}
        }, addold: function (e) {
            kx.cache.histemp.pageid.push(e.pageid), kx.cache.histemp.scale.push(e.scale), kx.cache.histemp.type.push(e.type), kx.cache.histemp.target.push(e.target), kx.cache.histemp.attr.push(e.attr), kx.cache.histemp.data[0].push(e.odata)
        }, addnew: function (e) {
            kx.cache.histemp.data[1].push(e.ndata), e.unhis || e.cnum != e.tnum - 1 || kx.his.insert({
                histype: e.histype,
                pageid: kx.cache.histemp.pageid,
                scale: kx.cache.histemp.scale,
                type: kx.cache.histemp.type,
                target: kx.cache.histemp.target,
                attr: kx.cache.histemp.attr,
                data: kx.cache.histemp.data
            })
        }
    }, chkDisabled: function () {
        kx.his.hisdata.back.length > 0 ? $("#j-eback").removeClass("disabled") : $("#j-eback").addClass("disabled"), kx.his.hisdata.redo.length > 0 ? $("#j-eredo").removeClass("disabled") : $("#j-eredo").addClass("disabled")
    }, insert: function (e) {
        kx.his.hisdata.back.push([e.histype, e.pageid, e.scale, e.type, e.target, e.attr, e.data]), kx.his.hisdata.redo = [], this.chkDisabled()
    }, act: function (e) {
        e = e || "back";
        var t;
        "back" == e ? kx.his.hisdata.back.length > 0 && (t = kx.his.hisdata.back.pop(), kx.his.hisdata.redo.push(t)) : kx.his.hisdata.redo.length > 0 && (t = kx.his.hisdata.redo.pop(), kx.his.hisdata.back.push(t)), t && (kx.his.doact(e, t[0], t[1], t[2], t[3], t[4], t[5], t[6]), this.chkDisabled())
    }, doact: function (e, t, a, i, c, o, n, d) {
        switch (t) {
            case"copy":
                "back" == e ? kx.editor.copyHis.back(a, i, c, o, n, d[0]) : kx.editor.copyHis.redo(a, i, c, o, n, d[1]);
                break;
            case"del":
                "back" == e ? kx.editor.delHis.back(a, i, c, o, n, d[0]) : kx.editor.delHis.redo(a, i, c, o, n, d[1]);
                break;
            case"order":
                "back" == e ? kx.editor.orderHis.back(a, i, c, o, n, d[0]) : kx.editor.orderHis.redo(a, i, c, o, n, d[1]);
                break;
            case"rotate":
                "back" == e ? kx.editor.rotateHis.back(a, i, c, o, n, d[0]) : kx.editor.rotateHis.redo(a, i, c, o, n, d[1]);
                break;
            case"opacity":
                "back" == e ? kx.editor.opacityHis.back(a, i, c, o, n, d[0]) : kx.editor.opacityHis.redo(a, i, c, o, n, d[1]);
                break;
            case"chicun":
                "back" == e ? kx.editor.chicunHis.back(a, i, c, o, n, d[0]) : kx.editor.chicunHis.redo(a, i, c, o, n, d[1]);
                break;
            case"drag":
                "back" == e ? kx.fun.ee.edragHis.back(a, i, c, o, n, d[0]) : kx.fun.ee.edragHis.redo(a, i, c, o, n, d[1]);
                break;
            case"move":
                "back" == e ? kx.fun.ee.edragHis.back(a, i, c, o, n, d[0]) : kx.fun.ee.edragHis.redo(a, i, c, o, n, d[1]);
                break;
            case"resize":
                "back" == e ? kx.fun.ee.eresizeHis.back(a, i, c, o, n, d[0]) : kx.fun.ee.eresizeHis.redo(a, i, c, o, n, d[1]);
                break;
            case"additem":
                "back" == e ? kx.fun.el.comm.addHis.back(a, i, c, o, n, d[0]) : kx.fun.el.comm.addHis.redo(a, i, c, o, n, d[1]);
                break;
            case"addtpl":
                "back" == e ? kx.fun.el.comm.tplHis.back(a, i, c, o, n, d[0]) : kx.fun.el.comm.tplHis.redo(a, i, c, o, n, d[1]);
                break;
            case"editText":
                "back" == e ? kx.etext.editHis.back(a, i, c, o, n, d[0]) : kx.etext.editHis.redo(a, i, c, o, n, d[1]);
                break;
            case"elcolor":
                "back" == e ? kx.eel.elcolorHis.back(a, i, c, o, n, d[0]) : kx.eel.elcolorHis.redo(a, i, c, o, n, d[1]);
                break;
            case"setbg":
                "back" == e ? kx.ebg.bgHis.back(a, i, c, o, n, d[0], d[1]) : kx.ebg.bgHis.redo(a, i, c, o, n, d[0], d[1]);
                break;
            case"orderpage":
                "back" == e ? kx.epage.orderHis.back(a, i, c, o, n, d[0]) : kx.epage.orderHis.redo(a, i, c, o, n, d[1]);
                break;
            case"addpage":
                "back" == e ? kx.epage.addHis.back(a, i, c, o, n, d[0]) : kx.epage.addHis.redo(a, i, c, o, n, d[1]);
                break;
            case"delpage":
                "back" == e ? kx.epage.delHis.back(a, i, c, o, n, d[0]) : kx.epage.delHis.redo(a, i, c, o, n, d[1]);
                break;
            case"resizepage":
                "back" == e ? kx.epage.setSizeHis.back(a, i, c, o, n, d[0], d[1]) : kx.epage.setSizeHis.redo(a, i, c, o, n, d[0], d[1]);
                break;
            case"setCrop":
                "back" == e ? kx.epic.setCropHis.back(a, i, c, o, n, d[0], d[1]) : kx.epic.setCropHis.redo(a, i, c, o, n, d[0], d[1]);
                break;
            case"changePic":
                "back" == e ? kx.epic.changePicHis.back(a, i, c, o, n, d[0], d[1]) : kx.epic.changePicHis.redo(a, i, c, o, n, d[0], d[1])
        }
    }
}, kx.init = {
    init: function () {
        this.p(), this.e(), setTimeout(function () {
            kx.fun.comm.loadFont(1)
        }, 5e3)
    }, p: function () {
        kx.fun.pp.init(), kx.fun.pl.init(), kx.fun.po.init()
    }, e: function () {
        kx.fun.ep.init(), kx.fun.et.init(), kx.fun.el.init(), kx.fun.er.init(), kx.fun.ee.init(), kx.fun.eo.init()
    }
}, function () {
    function e(e) {
        return parseInt(e, 10) || 0
    }

    function t(e) {
        var t = window.getComputedStyle(e, null), a = t.getPropertyValue("-webkit-transform") || t.getPropertyValue("-moz-transform") || t.getPropertyValue("-ms-transform") || t.getPropertyValue("-o-transform") || t.getPropertyValue("transform") || null;
        if (a && "none" != a) {
            var i = a.split("(")[1];
            i = i.split(")")[0], i = i.split(",");
            for (var c = i[0], o = i[1], n = Math.round(Math.atan2(o, c) * (180 / Math.PI)); n >= 360;)n = 360 - n;
            for (; 0 > n;)n = 360 + n;
            return n
        }
        return 0
    }

    function a(e) {
        return isNaN(parseFloat(e)) ? 0 : parseFloat(e)
    }

    function i(e) {
        return Math.round(100 * (e + 1e-5)) / 100
    }

    $.getCorrection = function (e, t, a, i, c) {
        var c = c * Math.PI / 180, o = -e / 2, n = t / 2, d = n * Math.sin(c) + o * Math.cos(c), s = n * Math.cos(c) - o * Math.sin(c), l = {
            left: d - o,
            top: s - n
        }, r = e + a, h = t + i, o = -r / 2, n = h / 2, d = n * Math.sin(c) + o * Math.cos(c), s = n * Math.cos(c) - o * Math.sin(c), p = {
            left: d - o,
            top: s - n
        }, x = {left: p.left - l.left, top: p.top - l.top};
        return x
    }, $.ui.resizable.prototype._mouseStart = function (t) {
        var a, i, c, o = this.options, n = this.element;
        return this.resizing = !0, this._renderProxy(), a = e(this.helper.css("left")), i = e(this.helper.css("top")), o.containment && (a += $(o.containment).scrollLeft() || 0, i += $(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
            left: a,
            top: i
        }, this.size = this._helper ? {width: this.helper.width(), height: this.helper.height()} : {
            width: n.width(),
            height: n.height()
        }, this.originalSize = this._helper ? {width: n.outerWidth(), height: n.outerHeight()} : {
            width: n.width(),
            height: n.height()
        }, this.sizeDiff = {
            width: n.outerWidth() - n.width(),
            height: n.outerHeight() - n.height()
        }, this.originalPosition = {left: a, top: i}, this.originalMousePosition = {
            left: t.pageX,
            top: t.pageY
        }, this.lastData = this.originalPosition, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, c = $(".ui-resizable-" + this.axis).css("cursor"), $("body").css("cursor", "auto" === c ? this.axis + "-resize" : c), n.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
    }, $.ui.resizable.prototype._mouseDrag = function (e) {
        var c, o = t(this.element[0]), n = o * Math.PI / 180, d = this.helper, s = {}, l = this.originalMousePosition, r = this.axis, h = this.position.top, p = this.position.left, x = this.size.width, f = this.size.height, g = e.pageX - l.left || 0, k = e.pageY - l.top || 0, u = this._change[r], m = this.size.width, v = this.size.height;
        if (!u)return !1;
        var j = Math.cos(n), w = Math.sin(n);
        ndx = g * j + k * w, ndy = k * j - g * w, g = ndx, k = ndy, c = u.apply(this, [e, g, k]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (c = this._updateRatio(c, e)), c = this._respectSize(c, e);
        var y = {left: this.position.left, top: this.position.top};
        this._updateCache(c), this.position = {left: y.left, top: y.top};
        var b = {
            left: a(c.left || this.lastData.left) - a(this.lastData.left),
            top: a(c.top || this.lastData.top) - a(this.lastData.top)
        }, _ = {};
        _.left = b.left * j - b.top * w, _.top = b.top * j + b.left * w, _.left = i(_.left), _.top = i(_.top), this.position.left += _.left, this.position.top += _.top, this.lastData = {
            left: a(c.left || this.lastData.left),
            top: a(c.top || this.lastData.top)
        }, this._propagate("resize", e);
        var C = m - this.size.width, P = v - this.size.height, z = $.getCorrection(m, v, C, P, o);
        return this.position.left += z.left, this.position.top -= z.top, this.position.top !== h && (s.top = this.position.top + "px"), this.position.left !== p && (s.left = this.position.left + "px"), this.size.width !== x && (s.width = this.size.width + "px"), this.size.height !== f && (s.height = this.size.height + "px"), d.css(s), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), $.isEmptyObject(s) || this._trigger("resize", e, this.ui()), !1
    }
}(), kx.backopt.init(), kx.fun.comm.loadFont(), $(window).load(function () {
    $("#j-eloading").fadeOut(), $("#j-editor").fadeIn(), kx.init.init(), setTimeout(function () {
        kx.cache.editdataSaveJson = JSON.stringify(EDITDATA)
    }, 3e3)
}), $(window).bind("beforeunload", function () {
    var e = JSON.stringify(EDITDATA);
    return e != kx.cache.editdataSaveJson ? "您编辑的模板尚未保存，确定离开此页面吗？" : void 0
});
var plUpPic, plUpBg, dateObj = new Date, uploadPicConfig = {
    runtimes: "html5,flash,silverlight,html4",
    browse_button: "j-uploadPicBtn",
    chunk_size: "512kb",
    url: "/editor/upFile3.html",
    flash_swf_url: "/themes/manage/js/plupload/Moxie.swf?t=" + dateObj.getTime(),
    silverlight_xap_url: "/themes/manage/js/plupload/Moxie.xap",
    multi_selection: !1,
    filters: {excluded_extensions: [{regexp: /(\.jpg|\.jpeg|\.png|\.svg)$/i}], max_file_size: "5mb"},
    init: {
        FilesAdded: function (e, t) {
            var a = "", i = "4";
            $.each(t, function (e, t) {
                e % 3 == 2 && (i = "2"), a += '<li class="item" style="width:84px;height:84px;margin-right:' + i + 'px;float:left;opacity:100"><div class="upingBox" id="' + t.id + '"><div class="uping"><p class="text j-uploadPercent">1%</p><p class="process j-uploadProcess"><span style="width:1%;"></span></p></div></div></li>'
            }), $("#j-epicWall").prepend(a), kx.cache.wall.epic ? kx.cache.wall.epic.refresh() : $("#j-epicWall").css({visibility: "visible"}).next(".loading").removeClass("loadAnimate"), setTimeout(function () {
                e.start()
            }, 100), e.refresh()
        }, Error: function (e, t) {
            "文件大小错误。" == t.message ? t.message = "文件大小不能超过5M。" : "文件扩展名错误。" == t.message && (t.message = "文件扩展名错误，只支持上传JPG、PNG、SVG文件。"), $.alert(t.message)
        }, UploadProgress: function (e, t) {
            $("#" + t.id).find(".j-uploadPercent").text(t.percent + "%"), $("#" + t.id).find(".j-uploadProcess span").width(t.percent + "%")
        }, FileUploaded: function (e, t, a) {
            var i = JSON.parse(a.response), c = Math.ceil(kx.cache.lcontentwidth / 3), o = "";
            if (i.code > 0)if (1 == i.code) {
                var n = $("#" + t.id).parent().remove();
                bindFx($("#modal-layer"), "fade-in", !0), bindFx($("#login-box"), "fade-in-up", !0)
            } else $("#" + t.id).html("文件上传失败!<br/>" + i.message); else {
                var n = $("#" + t.id).parent();
                if (o = '<li class="item j-iteminsert" data-itype="' + i.mimetype + '" data-id="' + i.id + '" data-iid="' + i.iid + '" style="' + n.attr("style") + '"><img src="' + i.src + '" data-owidth="' + i.owidth + '" data-oheight="' + i.oheight + '" style="width:' + c + "px;height:" + Math.ceil(c * i.oheight / i.owidth) + 'px;"><span class="del"><i></i></span><span class="eu-copy" data-row="3"></span></li>', n.replaceWith(o), 1 == $("#j-uploadPicBtn").attr("data-change")) {
                    var d = $("#j-uploadPicBtn").attr("data-oldTarget"), s = kx.edata.get(kx.editPage, "epic", d), l = kx.edata.edit(kx.editPage, "epic", d, {url: i.src});
                    kx.epic.changePic(kx.editPage, s[1], l[1], d), $("#j-uploadPicBtn").attr("data-change", ""), $("#j-uploadPicBtn").attr("data-oldTarget", "")
                }
            }
        }, UploadComplete: function () {
            kx.cache.wall.epic ? kx.cache.wall.epic.refresh() : (_html = $("#j-epicWall").html(), kx.fun.comm.wall("epic", 3, $(_html)))
        }
    }
}, uploadBgConfig = {
    runtimes: "html5",
    browse_button: "j-uploadBgBtn",
    chunk_size: "512kb",
    url: "/editor/upFile3/type/bg.html",
    multi_selection: !1,
    filters: {mime_types: [{title: "Image Files", extensions: "jpg,jpeg,png"}], max_file_size: "5mb"},
    init: {
        FilesAdded: function (e, t) {
            $.each(t, function (e, t) {
                $("#j-bgPicBox").html('<div class="imgw"><div class="uping" id="' + t.id + '"><p class="text j-uploadPercent">1%</p><p class="process j-uploadProcess"><span style="width:1%;"></span></p></div></div>')
            }), setTimeout(function () {
                e.start()
            }, 100), e.refresh()
        }, Error: function (e, t) {
            "文件大小错误。" == t.message ? t.message = "文件大小不能超过5M。" : "文件扩展名错误。" == t.message && (t.message = "文件扩展名错误，只支持上传JPG、PNG文件。"), $.alert(t.message)
        }, UploadProgress: function (e, t) {
            $("#" + t.id).find(".j-uploadPercent").text(t.percent + "%"), $("#" + t.id).find(".j-uploadProcess span").width(t.percent + "%")
        }, FileUploaded: function (e, t, a) {
            var i = JSON.parse(a.response);
            if (i.code > 0)if (1 == i.code) {
                {
                    $("#" + t.id).parent().remove()
                }
                bindFx($("#modal-layer"), "fade-in", !0), bindFx($("#login-box"), "fade-in-up", !0)
            } else $("#j-bgPicBox").html('<div class="imgw"><div class="uping">文件上传失败!<br/>' + i.message + "</div></div>"); else {
                var c = kx.edata.get(kx.editPage, "ebg", "ebg"), o = kx.edata.edit(kx.editPage, "ebg", "ebg", {
                    url: i.src,
                    show: "1"
                });
                kx.ebg.setbg(kx.editPage, c[1], o[1])
            }
        }
    }
};