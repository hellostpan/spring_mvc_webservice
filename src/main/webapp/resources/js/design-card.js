$(function () {
    var fontFamily1 = ["方正粗倩简体", "方正彩云简体", "方正琥珀简体", "方正美黑简体", "方正启体简体", "方正少儿简体",
        "方正小标宋简体", "方正细等线简体", "方正祥隶简体", "方正报宋繁体", "方正新秀丽繁体", "方正细圆简体", "方正硬笔楷书简体",
        "方正姚体简体", "方正幼线简体", "方正稚艺简体", "方正综艺简体"];
    var fontFamily2 = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13", "a14", "a15",
        "a16", "a17"];
    var tarNode;
    var tarNodeSec;
    var canvasFrontStr;
    var canvasBackStr;
    var card = new CardEle(2);

    var BCards = new Array();

    var dWidth = document.documentElement.clientWidth;
    var dHeight = document.documentElement.clientHeight;
    $(".bottom").css({"height": dHeight - 64 + "px"});
    var leftDiv = $(".left");
    leftDiv.css({"width": dWidth - 400 + "px", "height": dHeight - 64 + "px"});
    $(".div-update-params").css("width", dWidth - 400 + "px");
    var frontDiv = $(".bg-front");
    var lsWidth = leftDiv.width();
    var lsHeight = leftDiv.height();
    console.log(lsWidth + " : " + lsHeight);
    var width;
    var height;
    if (lsHeight / lsWidth > 0.6) {
        width = lsWidth * 0.8;
        height = width * 0.6;
    } else {
        height = lsHeight * 0.8;
        width = height / 0.6;
    }

    width = 960;
    height = 576;
    var pWidth = (lsWidth - width) / 2;
    var pHeight = (lsHeight - height) / 2;
    leftDiv.css({"padding": pHeight + "px " + pWidth + "px"});
    frontDiv.css({"width": width + "px", "height": height + "px"});
    $(".el-wall").css({"width": width + "px", "height": height + "px"});
    var proportion = width / 960 * 625;
    $("html").css("font-size", proportion + "%");


    $.ajax({
        type: "GET",
        url: "hello/findData",
        success: function (data) {
            var obj = eval('(' + data + ')');
            var length = obj.length;
            for (var i = 0; i < length; i++) {
                var card = obj[i];
                BCards[i] = card;
                if (card.front) {
                    $(".page-front").append(card.content)
                } else {
                    $(".page-back").append(card.content)
                }
            }
            initEvent();
        },
        error: function (e) {
            console.log("findDesignData: " + e);
        }
    });



    var opFont;
    for (var i = 0; i < fontFamily1.length; i++) {
        opFont += '<option value="' + fontFamily2[i] + '">' + fontFamily1[i] + '</option>';
    }
    $(".slc-font-family-names").append(opFont);

    var opSize;
    for (var i = 5; i < 60; i++) {
        opSize += '<option value="' + i + '">' + i + '</option>';
    }
    $(".slc-font-size").append(opSize);
    $(".slc-font-size").val(25);

    function initEvent() {
        $(".div-move").dblclick(function (event) {
            if ("p-text" == $(this).attr("data-type")) {
                var ui = event.target;
                var width = ui.offsetWidth;
                var height = ui.offsetHeight;
                var left = ui.offsetLeft;
                var top = ui.offsetTop;
                var editDiv = $(".div-edit");
                editDiv.css({
                    "width": width + "px",
                    "height": "auto",
                    "left": left + "px",
                    "top": top + "px",
                    "display": "block"
                });
                $(".div-move").css("display", "none");
                console.log("data-type2: " + $(this).attr("data-type"));
                var tarId = $(this).attr("data-target");
                var lDiv = $("#" + tarId);
                editDiv.children().remove();
                editDiv.append(lDiv.html());
                lDiv.children().remove();
                tarNodeSec = tarNode;
                editDiv.children().focus();
            }

        });

        $(".div-edit").focusout(function (event) {
            console.log("id: "+tarNodeSec.attr("id"));
            getLineBreak(function (ele) {
                tarNodeSec.empty();
                tarNodeSec.append(ele);
            });
            var tId = tarNodeSec.attr("id").substring(0,tarNodeSec.attr("id").lastIndexOf("-"));
            $("#"+tId).append(tarNodeSec);
            $(this).empty();
            $(this).hide();
            tarNodeSec="";
            updateImg();
        });

        //阻止事件被document接收到
        $(".div-edit").click(function (e) {
            e.stopPropagation();
        });
        $(".div-update-params").click(function (e) {
            e.stopPropagation();
        });
        $(".div-params-change").click(function (e) {
            event.stopPropagation();
        });
        $(".div-move").click(function (e) {
            e.stopPropagation();
        });

        $(document).click(function (e) {
            console.log("document click ");
            //$(".div-update-params").hide();
            hideSlider();
            $(".div-move").hide();
            $(".div-update-params").hide();
        });

        resizeMouseDown();

        $(".div-menu li").each(function (e) {
            $(this).click(function () {
                $(".div-menu li").removeClass("li-select");
                $(this).addClass("li-select");
                var str = $(this).text();
                if ("文字"==str){
                    $(".div-menu-text").show();
                    $(".div-menu-img").hide();
                    $(".div-menu-page").hide();
                }else if ("图片"==str){
                    $(".div-menu-text").hide();
                    $(".div-menu-img").show();
                    $(".div-menu-page").hide();
                }else if ("页面"==str){
                    $(".div-menu-text").hide();
                    $(".div-menu-img").hide();
                    $(".div-menu-page").show();
                }
            });
        });

        //添加文字
        $(".sp-add-text").click(function (e) {
            var addDiv = addTextElement();
            var flag = $(".page-front").is(":hidden");
            if (flag){
                $(".page-back").append(addDiv)
            }else {
                $(".page-front").append(addDiv)
            }
            resizeMouseDown();
            updateImg();
        });

        //选择正面反面
        $(".img-front").click(function (e) {
            $(".page-front").show();
            $(".page-back").hide();
            $(".div-move").hide();
            $(this).css("border-color","#00a2eb");
            $(".img-back").css("border-color","#414750");
        });
        $(".img-back").click(function (e) {
            $(".page-front").hide();
            $(".page-back").show();
            $(".div-move").hide();
            $(this).css("border-color","#00a2eb");
            $(".img-front").css("border-color","#414750");
        });

        $(".sp-add-img").click(function (e) {
            $("#image").click();
        });

        $("#image").change(function (event) {
            var files = event.target.files;
            var file;
            if (files && files.length > 0) {
                file = files[0];
                var readFile = new FileReader();
                readFile.onload = function (e) {
                    var imgSrc = e.target.result;
                    var img = new Image();
                    img.src = imgSrc;
                    var div = addImgElement(img);
                    div.css({"width":img.width,"height":img.height});
                    div.append(img);
                    var flag = $(".page-front").is(":hidden");
                    if (flag){
                        $(".page-back").append(div);
                    }else {
                        $(".page-front").append(div);
                    }
                    resizeMouseDown();
                    updateImg();
                };
                readFile.readAsDataURL(file);
            }

        });

        $(".div-save").click(function (e) {
            uploadImg(canvasFrontStr);
            uploadImg(canvasBackStr);
        });
        var number = 1;
        $(".div-content").each(function (e) {
           console.log(number+":  "+this.outerHTML);
            number++;
        });
    }

    function getLineBreak(f) {
        var addEle;
        var elem = "";
        var left = "<span class='sp'>";
        var right = "</span>";
        var lsls = $(".div-edit .inner").text();
        var ls = $(".div-edit .inner").html();
        var str1 = ls.substring(0,ls.indexOf("<"));
        var str2 = ls.substring(ls.lastIndexOf(">")+1);
        if (str1!=""){
            var text = str1.split("");
            for (var j = 0; j < text.length; j++) {
                if (/[\r\n]/.test(text[j])) {
                    addEle = "<br>"
                } else {
                    addEle = left + text[j] + right;
                }
                elem += addEle;
            }
        }
        $(".div-edit").find("span.sp,br").each(function (e) {
            var t = $(this);
            var a = t[0].tagName.toLowerCase();
            var i = t.position().top;
            var content = t.html();
            var text = content.split("");
            var br = "<br>";
            if ("span" == a) {
                for (var j = 0; j < text.length; j++) {
                    if (/[\r\n]/.test(text[j])) {
                        addEle = "<br>"
                    } else {
                        addEle = left + text[j] + right;
                    }
                    elem += addEle;
                }
            } else {
                elem += "<br>";
            }
        });
        if (str2!=""){
            var text = str2.split("");
            for (var j = 0; j < text.length; j++) {
                if (/[\r\n]/.test(text[j])) {
                    addEle = "<br>"
                } else {
                    addEle = left + text[j] + right;
                }
                elem += addEle;
            }
        }
        f(elem);
    }

    function resizeMouseDown() {
        $(".div-content").each(function () {
            $(this).click(function (event) {
                tarNode = $(this).children();
                var ui = event.target;
                var width = ui.clientWidth + 2;
                var height = ui.clientHeight + 2;
                var left = ui.offsetLeft - 1;
                var top = ui.offsetTop - 1;
                var md = this;
                var divMove = $(".div-move");
                divMove.css({
                    "width": width + "px",
                    "height": height + "px",
                    "left": left + "px",
                    "top": top + "px",
                    "display": "block"
                });
                divMove.attr({"data-type": ui.getAttribute("data-type"), "data-target": md.id});
                divMove.draggable({
                    containment: ".el-wall",
                    snap: "div.snap",
                    snapMode: "outer",
                    snapTolerance: 5,
                    delay: 0,
                    scroll: false,
                    distance: 0,
                    start: function (event, ui) {
                        $(md).css({"left": ui.position.left + "px", "top": ui.position.top + "px"});
                    },
                    drag: function (event, ui) {
                        $(md).css({"left": ui.position.left + "px", "top": ui.position.top + "px"});
                    },
                    stop: function (event, ui) {
                        updateImg();
                    }
                });

                card.width = width;
                card.height = height;
                initUpdateParams(ui);
                event.stopPropagation();
            });
        });
    }

    function resizeSelDiv() {
        console.log(tarNode.css("width") + "  :  " + tarNode.css("height"));
        $(".div-move").css({"width": tarNode.css("width"), "height": tarNode.css("height")});
    }

    function initUpdateParams(ui) {
        var uiValue;
        if ("p-text" == ui.getAttribute("data-type")) {
            $(".div-update-params:first").show();
            $(".div-update-params:last").hide();
            $(".ipt-p-color").minicolors({
                control: 'hue',
                defaultValue: $(this).attr('data-defaultValue') || '',
                format: 'hex',
                inline: $(this).attr('data-inline') === 'true',
                letterCase: 'lowercase',
                position: 'bottom right',
                swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
                change: function (result, opacity) {
                    tarNode.css("color", result);
                    updateImg();
                },
                theme: 'default'
            });
            $(".sp-width").click(function (e) {
                $(".div-params-change").css({"display": "block", "left": e.target.offsetLeft - 190 + "px"});
                $(".div-slider-text").html(360 + "px");
                $(".div-slider").slider({
                    min: 0,
                    max: 960,
                    value: 360,
                    step: 1,
                    slide: function (event, ui) {
                        $(".div-slider-text").html(ui.value + "px");
                        tarNode.css("width", ui.value + "px");
                        $(".div-move").css({"width": ui.value + "px", "height": tarNode.css("height")});
                        tarNode.parent().css("width", ui.value + "px");
                        setTimeout(function () {
                            if (uiValue==ui.value){
                                updateImg();
                            }
                        },1000);
                        uiValue = ui.value;
                    }
                });

            });
            $(".sp-line-height").click(function (e) {
                $(".div-params-change").css({"display": "block", "left": e.target.offsetLeft - 190 + "px"});
                $(".div-slider-text").html(1.5);
                $(".div-slider").slider({
                    min: 0.5,
                    max: 5,
                    value: 1.5,
                    step: 0.1,
                    slide: function (event, ui) {
                        $(".div-slider-text").html(ui.value);
                        tarNode.css("line-height", ui.value);
                        $(".div-move").css({"height": tarNode.css("height")});
                        setTimeout(function () {
                            if (uiValue==ui.value){
                                updateImg();
                            }
                        },1000);
                        uiValue = ui.value;
                    }
                });
            });
            $(".slc-font-family-names").change(function (event) {
                var fontName = $(this).val();
                tarNode.css("font-family", fontName);
                resizeSelDiv();
                updateImg();
            });
            $(".slc-font-size").change(function (event) {
                var fontSize = $(this).val();
                tarNode.css("font-size", fontSize + "px");
                resizeSelDiv();
                updateImg();
            });
            $(".ipt-bold").click(function (event) {
                if ($(this).is(":checked")) {
                    tarNode.css("font-weight", "bold");
                } else {
                    tarNode.css("font-weight", "normal");
                }
                resizeSelDiv();
                updateImg();
            });
            $(".ipt-italic").click(function (event) {
                if ($(this).is(":checked")) {
                    tarNode.css("font-style", "italic");
                } else {
                    tarNode.css("font-style", "normal");
                }
                resizeSelDiv();
                updateImg();
            });
        } else {
            $(".div-update-params:last").show();
            $(".div-update-params:first").hide();
            $(".sp-img-width").click(function (e) {
                $(".div-params-change").css({"display": "block", "left": e.target.offsetLeft - 190 + "px"});
                $(".div-slider-text").html(card.width + "px");
                $(".div-slider").slider({
                    min: 0,
                    max: width,
                    value: card.width,
                    step: 1,
                    slide: function (event, ui) {
                        card.width = ui.value;
                        $(".div-slider-text").html(card.width + "px");
                        tarNode.css("width", card.width + "px");
                        $(".div-move").css({"width": card.width + "px"});
                        tarNode.parent().css("width", card.width + "px");
                        setTimeout(function () {
                            if (uiValue==ui.value){
                                updateImg();
                            }
                        },1000);
                        uiValue = ui.value;
                    }
                });
            });
            $(".sp-img-height").click(function (e) {
                $(".div-params-change").css({"display": "block", "left": e.target.offsetLeft - 190 + "px"});
                $(".div-slider-text").html(card.height + "px");
                $(".div-slider").slider({
                    min: 0,
                    max: height,
                    value: card.height,
                    step: 1,
                    slide: function (event, ui) {
                        card.height = ui.value;
                        $(".div-slider-text").html(card.height + "px");
                        tarNode.css("height", card.height + "px");
                        $(".div-move").css({"height": card.height + "px"});
                        tarNode.parent().css("height", card.height + "px");
                        setTimeout(function () {
                            if (uiValue==ui.value){
                                updateImg();
                            }
                        },1000);
                        uiValue = ui.value;
                    }
                });
            });
            $(".sp-img-scale").click(function (e) {
                $(".div-params-change").css({"display": "block", "left": e.target.offsetLeft - 190 + "px"});
                $(".div-slider-text").html(1);
                $(".div-slider").slider({
                    min: 0.1,
                    max: 3,
                    value: 1,
                    step: 0.1,
                    slide: function (event, ui) {
                        $(".div-slider-text").html(ui.value);
                        tarNode.css({
                            "width": (ui.value * card.width) + "px",
                            "height": (ui.value * card.height) + "px"
                        });
                        $(".div-move").css({"width": tarNode.css("width"), "height": tarNode.css("height")});
                        tarNode.parent().css({"width": tarNode.css("width"), "height": tarNode.css("height")});
                        setTimeout(function () {
                            if (uiValue==ui.value){
                                updateImg();
                            }
                        },1000);
                        uiValue = ui.value;
                    }
                });
            });
        }

        $(".sp-img-copy,.sp-text-copy").click(function (e) {
            //$(".div-move").hide();

        });
        $(".sp-img-delete,.sp-text-delete").click(function (e) {
            tarNode.parent().remove();
            $(".div-move").hide();
            updateImg();
        });

    }

    function CardEle(tid) {
        this.bold = false;
        this.italic = false;
        this.word = "";
        this.fontFamily = "宋体";
        this.fontColor = "000000";
        this.img = false;
        this.fontSize = 14;
        this.top = 0;
        this.left = 0;
        this.lineHeight = 1.5;
        this.width = "200px";
        this.height = "60px";
        this.scale = 1;
        this.tid = tid;
    }

    function addTextElement() {
        var now = new Date().getTime();
        var lDiv = '<div class="div-content text-content" id="elt-'+now+'" data-type="p-text" unselectable="on" onselectstart="return false;" style="width: 1.6rem;">'+
            '<div class="inner" id="elt-'+now+'-inner" contenteditable="true" spellcheck="false" style="font-size: 0.4rem">'+
            '<span class="sp">双</span><span class="sp">击</span><span class="sp">修</span><span class="sp">改</span>'+
            '</div></div>';
        return lDiv;
    }

    function addImgElement(img) {
        var now = new Date().getTime();
        var lsDiv = $('<div></div>');
        lsDiv.addClass("div-content img-content");
        lsDiv.id = "elt-"+now;
        return lsDiv;
    }

    function hideSlider() {
        $(".div-params-change").hide();
    }

    function updateImg() {
        var flag = $(".page-front").is(":hidden");
        if (flag){
            updateRightImgBack();
        }else {
            updateRightImgFront();
        }
    }


    function updateRightImgFront() {
        html2canvas($(".page-front")[0], {
            onrendered: function (canvas) {
                canvasFrontStr = canvas.toDataURL("image/png", 1);
                $(".right-front .img-front").attr("src",canvasFrontStr);
            }
        });
    }

    function updateRightImgBack() {
        html2canvas($(".page-back")[0], {
            onrendered: function (canvas) {
                canvasBackStr = canvas.toDataURL("image/png", 1);
                $(".right-back .img-back").attr("src",canvasBackStr);
            }
        });
    }

    function uploadImg(baseStr) {
        /*var baseStr = canvas.toDataURL("image/png", 1);
        var lsDoc = new jsPDF();
        lsDoc.addImage(baseStr, 'png', 10, 10,80,48);
        lsDoc.save("tessdet.pdf");*/

        var blob = dataURLtoBlob(baseStr, "facecard.png");
        var xhr = new XMLHttpRequest();
        var formData = needsFormDataShim ? new FormDataShim() : new FormData();
        formData.append("file", blob, blob.name);
        formData.append("enctype", "multipart/form-data");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log("success");
            } else {

            }
        };
        xhr.upload.addEventListener("progress", function (e) {
            console.log("addEventListener: " + e.loaded + " " + e.total);
        });

        xhr.open("POST", "hello/upload/img", true);
        xhr.setRequestHeader("X_FILENAME", blob.name);
        xhr.send(formData);

    }


    function selectText(id) {
        var text = document.getElementById(id);
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
            /*if(selection.setBaseAndExtent){
             selection.setBaseAndExtent(text, 0, text, 1);
             }*/
        } else {
            alert("none");
        }
    }




    function dataURLtoBlob(data, fileName) {
        var tmp = data.split(',');
        tmp[1] = tmp[1].replace(/\s/g, '');
        var mime = tmp[0].match(/:(.*?);/)[1];
        var binary = atob(tmp[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        var b = new newBlob(new Uint8Array(array), mime);
        b.lastModifiedDate = new Date();
        b.lastModified = new Date().getTime();
        b.name = fileName;
        return b;
    }

    function newBlob(data, datatype) {
        var out;
        try {
            out = new Blob([data], {
                type: datatype
            });
        } catch (e) {
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder
                || window.MozBlobBuilder || window.MSBlobBuilder;
            if (e.name == 'TypeError' && window.BlobBuilder) {
                var bb = new BlobBuilder();
                bb.append(data.buffer);
                out = bb.getBlob(datatype);
            } else if (e.name == "InvalidStateError") {
                out = new Blob([data], {
                    type: datatype
                });
            } else {
            }
        }
        return out;
    }

    var needsFormDataShim = (function () {
        var bCheck = ~navigator.userAgent.indexOf('Android')
            && ~navigator.vendor.indexOf('Google')
            && !~navigator.userAgent.indexOf('Chrome');
        return bCheck
            && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
    })(), blobConstruct = !!(function () {
        try {
            return new Blob();
        } catch (e) {
        }
    })(), XBlob = blobConstruct ? window.Blob
        : function (parts, opts) {
        var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
        parts.forEach(function (p) {
            bb.append(p);
        });
        return bb.getBlob(opts ? opts.type : undefined);
    };

    function FormDataShim() {
        // Store a reference to this
        var o = this, parts = [], // Data to be sent
            boundary = Array(5).join('-')
                + (+new Date() * (1e16 * Math.random())).toString(32), oldSend = XMLHttpRequest.prototype.send;
        this.append = function (name, value, filename) {
            parts
                .push('--' + boundary
                    + '\r\nContent-Disposition: form-data; name="'
                    + name + '"');
            if (value instanceof Blob) {
                parts.push('; filename="' + (filename || 'blob')
                    + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                parts.push(value);
            } else {
                parts.push('\r\n\r\n' + value);
            }
            parts.push('\r\n');
        };
        // Override XHR send()
        XMLHttpRequest.prototype.send = function (val) {
            var fr, data, oXHR = this;
            if (val === o) {
                // 注意不能漏最后的\r\n ,否则有可能服务器解析不到参数.
                parts.push('--' + boundary + '--\r\n');
                data = new XBlob(parts);
                fr = new FileReader();
                fr.onload = function () {
                    oldSend.call(oXHR, fr.result);
                };
                fr.onerror = function (err) {
                    throw err;
                };
                fr.readAsArrayBuffer(data);
                this.setRequestHeader('Content-Type',
                    'multipart/form-data; boundary=' + boundary);
                XMLHttpRequest.prototype.send = oldSend;
            } else {
                oldSend.call(this, val);
            }
        };
    }
});