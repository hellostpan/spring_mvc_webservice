var wordImg;
var settingWord = '<div class="div-word-setting"><select class="slc-font-family-names" onchange="fontFamilyChange(this)"></select><select class="slc-font-size" onchange="fontSizeChange(this)"><option value="6">6磅</option><option value="7">7磅</option><option value="8">8磅</option> <option value="9">9磅</option> <option value="10">10磅</option> <option value="11">11磅</option> <option value="12">12磅</option> <option value="13">13磅</option> <option value="14">14磅</option> <option value="16">16磅</option> <option value="18">18磅</option> <option value="20">20磅</option> <option value="22">22磅</option> <option value="24">24磅</option> <option value="26">26磅</option> <option value="28">28磅</option> <option value="30">30磅</option> <option value="32">32磅</option> <option value="34">34磅</option> <option value="36">36磅</option> <option value="38">38磅</option> <option value="40">40磅</option> <option value="42">42磅</option> <option value="44">44磅</option> <option value="46">46磅</option> <option value="48">48磅</option> <option value="50">50磅</option> <option value="52">52磅</option> </select><label><input type="checkbox" class="ipt-bold" id="cb-bold" onclick="boldClick(this)">加粗</label><label><input type="checkbox" class="ipt-italic" onclick="italicClick(this)">斜体</label> <input type="hidden" id="hidden-input" class="ipt-color" value="#000000"></div>';
var op = "";
var img = {
    width: 100,
    height: 100
};
var BCards = new Array();
var businessCard;
var base = {};
$(function () {
    //location.href = "test.jsp";

    $.ajax({
        type: "POST",
        url: "hello/findFontFamilyNames",
        data: {},
        success: function (data) {
            // console.log(data);
            var obj = eval(data);
            var length = obj.length;
            var optionValue;
            for (var i = 0; i < length; i++) {
                op += '<option value="' + obj[i] + '">' + obj[i] + '</option>';
            }
        },
        error: function (e) {
            console.log("error: " + e);
        }
    });

    $.ajax({
        type: "GET",
        url: "hello/findDesignData",
        success: function (data) {
            var obj = eval('(' + data + ')');
            var wordSize = 0;
            var imgSize = 0;
            var img = "";
            var div = "";
            var goal;
            var length = obj.length;
            for (var i = 0; i < length; i++) {
                var card = obj[i];
                BCards[i] = card;
                if (card.front) {
                    if (card.img) {
                        wordSize = $(".div-setting-front .div-setting-img").length;
                        imgSize = $(".div-model-img-front .img-logo-front").length;
                        img = '<img src="' + card.path + '" class="img-logo-front img-move" id="img-logo-front-' + imgSize + '"onmousedown="mouseDown(this)">';
                        div = '<div class="div-setting-img" id="div-setting-img-front-' + wordSize + '">' +
                            '<img src="' + card.path + '" class="img-logo-front-show">' +
                            '<span class="span-adjust-size">调整大小</span>' +
                            '<div class="span-slider" id="slider-logo-front-' + wordSize + '"></div>' +
                            '<a href="javascript:;" title="删除" class="a-img-clear">' +
                            '<img class="img-img-clear" src="resources/images/ic_clear_grey600.png" onclick="clearImgClick(this)">' +
                            '</a></div>';
                        $(".div-model-img-front .div-model-wall").append(img);
                        $(".div-setting-front .div-setting-list-img").append(div);
                        initSlider("slider-logo-front-" + wordSize, card.width);
                        goal = $("#img-logo-front-" + imgSize);
                        goal.css({
                            "left": card.left,
                            "top": card.top,
                            "width": card.width,
                            "height": card.height
                        });
                        BCards[i].tid = "img-logo-front-" + imgSize;
                    } else {
                        wordSize = $(".div-setting-front .div-setting-word").length;
                        imgSize = $(".div-model-img-front .img-word-front").length;
                        img = '<img src="' + card.path + '" class="img-word-front img-move" id="img-word-front-' + imgSize + '"onmousedown="mouseDown(this)" draggable="true"/>';
                        div = '<div class="div-setting-word" id="div-setting-word-front-' + wordSize + '">' +
                            '<div class="div-setting-word-top">' +
                            '<input type="text" class="ipt-word" onfocus="inputFocus(this)" onkeyup="inputKeyUp(this)" id="ipt-word-front-' + wordSize + '" value="' + card.word + '">' +
                            '<input type="hidden" value=#' + card.fontColor + ' class="ipt-color-value">' +
                            '<a href="javascript:;" title="删除" class="a-word-clear">' +
                            '<img class="img-word-clear" src="resources/images/ic_clear_grey600.png" ' +
                            'onclick="clearWordClick(this)"></a></div></div>';
                        $(".div-model-img-front .div-model-wall").append(img);
                        $(".div-setting-front .div-setting-list-word").append(div);
                        goal = $("#img-word-front-" + imgSize);
                        goal.css({
                            "left": card.left,
                            "top": card.top
                        });
                        BCards[i].tid = "img-word-front-" + imgSize;
                    }
                } else {
                    if (card.img) {
                        wordSize = $(".div-setting-back .div-setting-img").length;
                        imgSize = $(".div-model-img-back .img-logo-back").length;
                        img = '<img src="' + card.path + '" class="img-logo-back img-move" id="img-logo-back-' + imgSize + '"onmousedown="mouseDown(this)" draggable="true">';
                        div = '<div class="div-setting-img" id="div-setting-img-back-' + wordSize + '">' +
                            '<img src="' + card.path + '" class="img-logo-back-show">' +
                            '<span class="span-adjust-size">调整大小</span>' +
                            '<div class="span-slider" id="slider-logo-back-' + wordSize + '"></div>' +
                            '<a href="javascript:;" title="删除" class="a-img-clear">' +
                            '<img class="img-img-clear" src="resources/images/ic_clear_grey600.png" onclick="clearImgClick(this)">' +
                            '</a></div>';
                        $(".div-model-img-back .div-model-wall").append(img);
                        $(".div-setting-back .div-setting-list-img").append(div);
                        initSlider("slider-logo-back-" + wordSize, card.width);
                        goal = $("#img-logo-back-" + imgSize);
                        goal.css({
                            "left": card.left,
                            "top": card.top,
                            "width": card.width,
                            "height": card.height
                        });
                        BCards[i].tid = "img-logo-back-" + imgSize;
                    } else {
                        wordSize = $(".div-setting-back .div-setting-word").length;
                        imgSize = $(".div-model-img-back .img-word-back").length;
                        img = '<img src="' + card.path + '" class="img-word-back img-move" id="img-word-back-' + imgSize + '"onmousedown="mouseDown(this)" draggable="true"/>';
                        div = '<div class="div-setting-word" id="div-setting-word-back-' + wordSize + '">' +
                            '<div class="div-setting-word-top">' +
                            '<input type="text" class="ipt-word" onfocus="inputFocus(this)" onkeyup="inputKeyUp(this)" id="ipt-word-back-' + wordSize + '" value="' + card.word + '">' +
                            '<input type="hidden" value=#' + card.fontColor + ' class="ipt-color-value">' +
                            '<a href="javascript:;" title="删除" class="a-word-clear">' +
                            '<img class="img-word-clear" src="resources/images/ic_clear_grey600.png" ' +
                            'onclick="clearWordClick(this)"></a></div></div>';
                        $(".div-model-img-back .div-model-wall").append(img);
                        $(".div-setting-back .div-setting-list-word").append(div);
                        goal = $("#img-word-back-" + imgSize);
                        goal.css({
                            "left": card.left,
                            "top": card.top
                        });
                        BCards[i].tid = "img-word-back-" + imgSize;
                    }
                }
            }
            ReEventBind();
        },
        error: function (e) {
            console.log("findDesignData: " + e);
        }
    });

    //检测浏览器屏幕的放大缩小事件
    $(window).resize(function () {

    });

    $(".ipt-save").click(function () {
        $(".div-model-wall").find("img").each(function () {
            $(this).removeClass("img-border-show");
        });
        div2canvas();
    });

    $(".ipt-add-logo").each(function () {
        $(this).click(function (event) {
            $("#image").click();
        });
    });

    $("#image").change(function (event) {
        var files = event.target.files;
        var file;
        if (files && files.length > 0) {
            file = files[0];
            var readFile = new FileReader();
            readFile.onload = function (e) {
                var wordSize;
                var imgSize;
                var img;
                var div;
                var lsObj = new WordCard();
                if ($(".div-setting-back").is(":hidden")) {
                    wordSize = $(".div-setting-front .div-setting-img").length;
                    imgSize = $(".div-model-img-front .img-logo-front").length;
                    img = '<img src="' + e.target.result + '" class="img-logo-front img-move" id="img-logo-front-' + imgSize + '"onmousedown="mouseDown(this)">';
                    div = '<div class="div-setting-img" id="div-setting-img-front-' + wordSize + '">' +
                        '<img src="' + e.target.result + '" class="img-logo-front-show">' +
                        '<span class="span-adjust-size">调整大小</span>' +
                        '<div class="span-slider" id="slider-logo-front-' + wordSize + '"></div>' +
                        '<a href="javascript:;" title="删除" class="a-img-clear">' +
                        '<img class="img-img-clear" src="resources/images/ic_clear_grey600.png" onclick="clearImgClick(this)">' +
                        '</a></div>';
                    $(".div-model-img-front .div-model-wall").append(img);
                    $(".div-setting-front .div-setting-list-img").append(div);
                    initSlider("slider-logo-front-" + wordSize, 100);
                    lsObj.tid = "img-logo-front-" + imgSize;
                    lsObj.width = 100;
                    lsObj.height = 100;
                } else {
                    wordSize = $(".div-setting-back .div-setting-img").length;
                    imgSize = $(".div-model-img-back .img-logo-back").length;
                    img = '<img src="' + e.target.result + '" class="img-logo-back img-move" id="img-logo-back-' + imgSize + '"onmousedown="mouseDown(this)" draggable="true">';
                    div = '<div class="div-setting-img" id="div-setting-img-back-' + wordSize + '">' +
                        '<img src="' + e.target.result + '" class="img-logo-back-show">' +
                        '<span class="span-adjust-size">调整大小</span>' +
                        '<div class="span-slider" id="slider-logo-back-' + wordSize + '"></div>' +
                        '<a href="javascript:;" title="删除" class="a-img-clear">' +
                        '<img class="img-img-clear" src="resources/images/ic_clear_grey600.png" onclick="clearImgClick(this)">' +
                        '</a></div>';
                    $(".div-model-img-back .div-model-wall").append(img);
                    $(".div-setting-back .div-setting-list-img").append(div);
                    initSlider("slider-logo-back-" + wordSize, 100);
                    lsObj.tid = "img-logo-back-" + imgSize;
                    lsObj.width = 100;
                    lsObj.height = 100;
                }
                BCards.push(lsObj);
                var ls = BCards;
                //ReEventBind();
            };
            readFile.readAsDataURL(file);

        }

    });

    $(".ipt-add-word").click(function () {
        var wordSize;
        var imgSize;
        var img;
        var div;
        var lsObj = new WordCard();
        if ($(".div-setting-back").is(":hidden")) {
            wordSize = $(".div-setting-front .div-setting-word").length;
            imgSize = $(".div-model-img-front .img-word-front").length;
            img = '<img src="resources/images/please_input_word.png" class="img-word-front img-move" id="img-word-front-' + imgSize + '"onmousedown="mouseDown(this)" draggable="true"/>';
            div = '<div class="div-setting-word" id="div-setting-word-front-' + wordSize + '">' +
                '<div class="div-setting-word-top">' +
                '<input type="text" class="ipt-word" onfocus="inputFocus(this)" onkeyup="inputKeyUp(this)" id="ipt-word-front-' + wordSize + '" value="请输入文字">' +
                '<input type="hidden" value="#000000" class="ipt-color-value">' +
                '<a href="javascript:;" title="删除" class="a-word-clear">' +
                '<img class="img-word-clear" src="resources/images/ic_clear_grey600.png" ' +
                'onclick="clearWordClick(this)"></a></div></div>';
            $(".div-model-img-front .div-model-wall").append(img);
            $(".div-setting-front .div-setting-list-word").append(div);
            lsObj.tid = "img-word-front-" + imgSize;
        } else {
            wordSize = $(".div-setting-back .div-setting-word").length;
            imgSize = $(".div-model-img-back .img-word-back").length;
            img = '<img src="resources/images/please_input_word.png" class="img-word-back img-move" id="img-word-back-' + imgSize + '"onmousedown="mouseDown(this)" draggable="true"/>';
            div = '<div class="div-setting-word" id="div-setting-word-back-' + wordSize + '">' +
                '<div class="div-setting-word-top">' +
                '<input type="text" class="ipt-word" onfocus="inputFocus(this)" onkeyup="inputKeyUp(this)" id="ipt-word-back-' + wordSize + '" value="请输入文字">' +
                '<input type="hidden" value="#000000" class="ipt-color-value">' +
                '<a href="javascript:;" title="删除" class="a-word-clear">' +
                '<img class="img-word-clear" src="resources/images/ic_clear_grey600.png" ' +
                'onclick="clearWordClick(this)"></a></div></div>';
            $(".div-model-img-back .div-model-wall").append(img);
            $(".div-setting-back .div-setting-list-word").append(div);
            lsObj.tid = "img-word-back-" + imgSize;
        }
        BCards.push(lsObj);
        for (var i = 0; i < BCards.length; i++) {
            console.log("word: " + BCards[i].word);
        }
        //ReEventBind();


    });

    $(".div-setting-back").hide();

});

function ReEventBind() {
    $(".img-move").each(function (event) {
        $(this).dragging({
            move: 'both',
            randomPosition: false
        })
    });
}

Array.prototype.indexOfTid = function (val) {
    var length = this.length;
    for (var i = 0; i < length; i++) {
        if (this[i].tid == val) {
            return i;
        }
    }
    return -1;
};

Array.prototype.removeOfTid = function (val) {
    var index = this.indexOfTid(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.getOfTid = function (val) {
    var index = this.indexOfTid(val);
    if (index > -1) {
        return this[index];
    }
};

function WordCard(tid) {
    this.bold = false;
    this.italic = false;
    this.word = "请输入文字";
    this.fontFamily = "宋体";
    this.fontColor = "000000";
    this.img = false;
    this.fontSize = 14;
    this.top = 0;
    this.left = 0;
    this.tid = tid;
    this.path = "resources/images/please_input_word.png";
}

function inputKeyUp(obj) {
    console.log("card" + businessCard.word);
    if ($(obj).val() != businessCard.word) {
        businessCard.word = $(obj).val();
        if (businessCard.word.length == 0) {
            wordImg.attr("src", "resources/images/noword.png");
        } else {
            generatePng(businessCard);
        }
    }
}

function inputFocus(obj) {
    var imgId = "img" + obj.id.substring(3);
    businessCard = BCards.getOfTid(imgId);
    wordImg = $("#" + imgId);
    $(".div-model-wall").find("img").each(function () {
        $(this).removeClass("img-border-show");
    });
    $(".div-setting-word").each(function (event) {
        $(this).removeClass("div-setting-select")
    });
    $(".div-word-setting").remove();
    $(obj).parent().parent().append(settingWord);
    $(".slc-font-family-names").append(op);
    $(".slc-font-family-names").val(businessCard.fontFamily);
    $(".slc-font-size").val(businessCard.fontSize);
    $(".ipt-bold").attr("checked", businessCard.bold);
    $(".ipt-italic").attr("checked", businessCard.italic);
    $(obj).parent().parent().addClass("div-setting-select");
    wordImg.addClass("img-border-show");
    $(".ipt-color").val("#" + businessCard.fontColor);
    $(".ipt-color").minicolors({
        control: 'hue',
        defaultValue: $(this).attr('data-defaultValue') || '',
        format: 'hex',
        inline: $(this).attr('data-inline') === 'true',
        letterCase: 'lowercase',
        position: 'bottom right',
        swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
        change: function (result, opacity) {
            businessCard.fontColor = result.substring(1);
            generatePng(businessCard);
        },
        theme: 'default'
    });
}

function mouseDown(obj) {
    var imgId = $(obj).attr("id");
    if (imgId.indexOf("logo") >= 0) {
        $(".div-model-wall").find("img").each(function () {
            $(this).removeClass("img-border-show");
        });
        $(obj).addClass("img-border-show");
    } else {
        $("#ipt" + $(obj).attr("id").substring(3)).focus();
    }
    $(obj).dragging({
        move: 'both',
        randomPosition: false
    })
}

//选择正面背面
function pageSelect(page) {
    if (page == 1) {
        $(".div-model-img-front").addClass("div-border");
        $(".div-model-img-back").removeClass("div-border");
        $(".div-page-change li:last").removeClass("li-select");
        $(".div-page-change li:first").addClass("li-select");
        $(".div-setting-front").show();
        $(".div-setting-back").hide();
        $("#div-model-wall-back .img-move").each(function () {
            $(this).removeClass("img-border-show");
        });
    } else {
        $(".div-model-img-front").removeClass("div-border");
        $(".div-model-img-back").addClass("div-border");
        $(".div-page-change li:first").removeClass("li-select");
        $(".div-page-change li:last").addClass("li-select");
        $(".div-setting-front").hide();
        $(".div-setting-back").show();
        $("#div-model-wall-front .img-move").each(function () {
            $(this).removeClass("img-border-show");
        });
    }
}

//初始化滑动条
function initSlider(id, defaultValue) {
    $("#" + id).slider({
        min: 0,
        max: 200,
        value: defaultValue,
        slide: function (event, ui) {
            var imgId = "img" + id.substring(6);
            var lsImg = $("#" + imgId);
            businessCard = BCards.getOfTid(imgId);
            var width = ui.value;
            var height = businessCard.height / businessCard.width * width;
            lsImg.css({"width": width, "height": height});
            lsImg.addClass("img-border-show");
            //ReEventBind();
        }
    });
}

//是否加粗
function boldClick(obj) {
    businessCard.bold = $(obj).is(":checked");
    generatePng(businessCard);
}

//是否斜体
function italicClick(obj) {
    businessCard.italic = $(obj).is(":checked");
    generatePng(businessCard);
}

//字体改变
function fontFamilyChange(obj) {
    businessCard.fontFamily = obj.value;
    generatePng(businessCard);
}

//文字大小改变
function fontSizeChange(obj) {
    businessCard.fontSize = $(obj).val();
    generatePng(businessCard);
}

//删除文字
function clearWordClick(obj) {
    $(obj).parent().parent().parent().remove();
    var ids = $(obj).parent().parent().parent().attr("id").split("-");
    var imgId = "img-word-" + ids[3] + "-" + ids[4];
    BCards.removeOfTid(imgId);
    $("#" + imgId).remove();
}

//删除图片
function clearImgClick(obj) {
    $(obj).parent().parent().remove();
    var ids = $(obj).parent().parent().attr("id").split("-");
    var imgId = "img-logo-" + ids[3] + "-" + ids[4];
    BCards.removeOfTid(imgId);
    $("#" + imgId).remove();
}

//根据文字获取服务端生成的图片地址
function generatePng(obj) {
    var jsonStr = JSON.stringify(obj);
    console.log(jsonStr);
    $.ajax({
        type: "POST",
        url: "hello/generatePng",
        data: {
            jsonStr: jsonStr
        },
        success: function (data) {
            console.log(data);
            $("#" + obj.tid).attr("src", data);
        },
        error: function (error) {
            console.log("error: " + error);
        }
    })
}

//将选定的div内容转成canvas
function div2canvas() {
    html2canvas($(".div-model-img-front")[0], {
        onrendered: function (canvas) {
            uploadImg(canvas, 1);
        }
    });
    html2canvas($(".div-model-img-back")[0], {
        onrendered: function (canvas) {
            uploadImg(canvas, 2);
        }
    })
}
//上传图片
function uploadImg(canvas, page) {
    var baseStr = canvas.toDataURL("image/png", 1);
    if (page == 1) {
        base.front = baseStr;
    } else {
        base.back = baseStr;
        var lsDoc = new jsPDF();
        lsDoc.addImage(base.front, 'png', 10, 20/*,80,48*/);
        lsDoc.addImage(base.back, 10, 100);
        lsDoc.save("tessdet.pdf");
    }


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