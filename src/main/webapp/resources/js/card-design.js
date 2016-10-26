var wordImg;
var params = {
    front: {
        leftTopX: 0,
        leftTopY: 0,
        rightTopX: 0,
        rightTopY: 0,
        leftBottomX: 0,
        leftBottomY: 0,
        rightBottomX: 0,
        rightBottomY: 0
    },
    back: {
        leftTopX: 0,
        leftTopY: 0,
        rightTopX: 0,
        rightTopY: 0,
        leftBottomX: 0,
        leftBottomY: 0,
        rightBottomX: 0,
        rightBottomY: 0
    },
    currentX: 0,
    currentY: 0
};
var word = "";
var isBold = false;
var isItalic = false;
var fontSize = 20;
var fontColorR = 0;
var fontColorG = 0;
var fontColorB = 0;
var fontFamilyName = "";
var settingWord = '<div class="div-word-setting"><select class="slc-font-family-names" onchange="fontFamilyChange(this)"></select><select class="slc-font-size" onchange="fontSizeChange(this)"><option value="6">6磅</option><option value="7">7磅</option><option value="8">8磅</option> <option value="9">9磅</option> <option value="10">10磅</option> <option value="11">11磅</option> <option value="12">12磅</option> <option value="13">13磅</option> <option value="14">14磅</option> <option value="16">16磅</option> <option value="18">18磅</option> <option value="20">20磅</option> <option value="22">22磅</option> <option value="24">24磅</option> <option value="26">26磅</option> <option value="28">28磅</option> <option value="30">30磅</option> <option value="32">32磅</option> <option value="34">34磅</option> <option value="36">36磅</option> <option value="38">38磅</option> <option value="40">40磅</option> <option value="42">42磅</option> <option value="44">44磅</option> <option value="46">46磅</option> <option value="48">48磅</option> <option value="50">50磅</option> <option value="52">52磅</option> </select><label><input type="checkbox" class="ipt-bold" id="cb-bold" onclick="boldClick(this)">加粗</label><label><input type="checkbox" class="ipt-italic" onclick="italicClick(this)">斜体</label> <input type="hidden" id="hidden-input" class="ipt-color" value="#000000"></div>';
var op = "";
$(function () {
    $.ajax({
        type: "POST",
        url: "hello/findFontFamilyNames",
        data: {},
        success: function (data) {
            // console.log(data);
            var obj = eval(data);
            var optionValue;
            for (optionValue in obj) {
                op += '<option value="' + obj[optionValue] + '">' + obj[optionValue] + '</option>';
            }
        },
        error: function (e) {
            console.log("error: " + e);
        }
    });
    $(".ipt-save").click(function () {
        $(".div-model-wall").find("img").each(function () {
            $(this).removeClass("img-border-show");
        });
        div2png();
    });

    $(".ipt-add-logo").click(function () {

    });
    $(".ipt-add-word").click(function () {
        var wordSize = $(".div-setting-word").length;
        var imgSize = $(".img-word-front").length;
        var obj = '<div class="div-setting-word" id="div-setting-word-' + wordSize + '">' +
            '<div class="div-setting-word-top"><input type="text" class="ipt-word" id="ipt-word-front-' + wordSize + '" value="请输入文字">' +
            '<a href="javascript:;" title="删除" class="a-word-clear"><img class="img-word-clear" src="resources/images/ic_clear_grey600.png"></a></div></div>';
        var lsImg = '<img src="resources/images/please_input_word.png" class="img-word-front" id="img-word-front-' + imgSize + '" draggable="true"/>';
        $("#div-model-wall-front").append(lsImg);
        $(".div-word-list").append(obj);
        initEvent();
    });
    initEvent();
    initDrag();
    initPosition();

});

function initPosition() {
    var lsDiv = $("#div-model-wall-front");
    var divWidth = lsDiv.width();
    var divHeight = lsDiv.height();

    params.front.leftTopX = lsDiv.offset().left;
    params.front.leftTopY = lsDiv.offset().top;
    params.front.leftBottomX = params.front.leftTopX;
    params.front.leftBottomY = params.front.leftTopY + divHeight;

    params.front.rightTopX = params.front.leftTopX + divWidth;
    params.front.rightTopY = params.front.leftTopY;
    params.front.rightBottomX = params.front.leftTopX + divWidth;
    params.front.rightBottomY = params.front.leftTopY + divHeight;

    lsDiv = $("#div-model-wall-back");
    divWidth = lsDiv.width();
    divHeight = lsDiv.height();

    params.back.leftTopX = lsDiv.offset().left;
    params.back.leftTopY = lsDiv.offset().top;
    params.back.leftBottomX = params.back.leftTopX;
    params.back.leftBottomY = params.back.leftTopY + divHeight;

    params.back.rightTopX = params.back.leftTopX + divWidth;
    params.back.rightTopY = params.back.leftTopY;
    params.back.rightBottomX = params.back.leftTopX + divWidth;
    params.back.rightBottomY = params.back.leftTopY + divHeight;

}

function initDrag() {
    var droptarget = document.getElementById("div-model-wall-front");
    EventUtil.addHandler(droptarget, "dragover", function (event) {
        EventUtil.preventDefault(event);
    });
    EventUtil.addHandler(droptarget, "dragenter", function (event) {
        EventUtil.preventDefault(event);
    });

    var droptarget2 = document.getElementById("div-model-wall-back");
    EventUtil.addHandler(droptarget2, "dragover", function (event) {
        EventUtil.preventDefault(event);
    });
    EventUtil.addHandler(droptarget2, "dragenter", function (event) {
        EventUtil.preventDefault(event);
    });
}

function initEvent() {
    $(".span-slider").slider({
        min: 0,
        max: 200,
        value: 100,
        slide: function (event, ui) {
            var lsImg = $(".img-logo-front");
            console.log((lsImg.offset().left) + " : " + lsImg.offset().top);
            lsImg.css({"width": ui.value, "height": ui.value});
        }
    });
    /*$(".ipt-bold").click(function () {
     isBold = $(this).is(":checked");
     getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName);
     });
     $(".ipt-italic").click(function () {
     isItalic = $(this).is(":checked");
     getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName);
     });
     $(".slc-font-size").change(function () {
     fontSize = $(this).val();
     getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName);
     });
     $(".slc-font-family-names").change(function () {
     fontFamilyName = $(this).val();
     getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName);
     });*/

    $(".ipt-word").each(function () {
        $(this).focus(function (event) {
            word = event.target.value;
            wordImg = $("#img" + event.target.id.substring(3));
            var lsDiv = $("#div-setting-word-0");
            $(".div-model-wall").find("img").each(function () {
                $(this).removeClass("img-border-show");
            });
            $(".div-setting-word").each(function (event) {
                $(this).removeClass("div-setting-select")
            });
            $(".div-word-setting").remove();
            $(this).parent().parent().append(settingWord);
            $(".slc-font-family-names").append(op);
            $(this).parent().parent().addClass("div-setting-select");
            wordImg.addClass("img-border-show");

            $(".ipt-color").minicolors({
                control: 'hue',
                defaultValue: $(this).attr('data-defaultValue') || '',
                format: 'rgb',
                inline: $(this).attr('data-inline') === 'true',
                letterCase: 'lowercase',
                position: 'bottom left',
                swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
                change: function (rgb, opacity) {
                    var str = rgb.substring(4, rgb.indexOf(")")).split(",");
                    fontColorR = parseInt(str[0]);
                    fontColorG = parseInt(str[1]);
                    fontColorB = parseInt(str[2]);
                    getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName);
                },
                theme: 'default'
            });
        });

        $(this).keyup(function (event) {
            if ($(this).val() != word) {
                word = $(this).val();
                if (word.length == 0) {
                    wordImg.attr("src", "resources/images/noword.png");
                } else {
                    getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName);
                }
            }
        });
    });

    $(".img-word-clear").each(function () {
        $(this).click(function (event) {
            $(this).parent().parent().parent().remove();
            var imgId = "img-word-front-" + $(this).parent().parent().parent().attr("id").split("-")[3];
            $("#" + imgId).remove();
        });
    });
    //添加模版中的logo和文字事件
    $(".div-model-wall").find("img").each(function () {
        $(this).addClass("img-move");
        $(this).on("dragstart", function (event) {
            dragStart(event);
        });
        $(this).on("dragend", function (event) {
            dragEnd(event);
        });
        $(this).on("mousedown", function (event) {
            var imgId = $(this).attr("id");
            if (imgId.indexOf("logo") >= 0) {
                $(".div-model-wall").find("img").each(function () {
                    $(this).removeClass("img-border-show");
                });
                $(this).addClass("img-border-show");
            } else {
                $("#ipt" + $(this).attr("id").substring(3)).focus();
            }

        })
    });
}

var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
};

function boldClick(obj) {
    isBold = $(obj).is(":checked");
    getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName);
}

function italicClick(obj) {
    isItalic = $(obj).is(":checked");
    getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName);
}

function fontFamilyChange(obj) {
    fontFamilyName = obj.value;
    getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName);
}

function fontSizeChange(obj) {
    fontSize = $(obj).val();
    getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName);
}

function getTextPng(word, fontColorR, fontColorG, fontColorB, fontSize, isBold, isItalic, fontFamilyName) {
    console.log(word + " " + fontColorR + " " + fontColorG + " " + fontColorB + " " + fontSize + " " + isBold + " " + isItalic + " " + fontFamilyName);
    $.ajax({
        type: "POST",
        url: "hello/getTextPng",
        data: {
            word: word,
            fontColorR: fontColorR,
            fontColorG: fontColorG,
            fontColorB: fontColorB,
            fontSize: fontSize,
            isBold: isBold,
            isItalic: isItalic,
            fontFamilyName: fontFamilyName
        },
        success: function (data) {
            console.log(data);
            wordImg.attr("src", data);
        },
        error: function (error) {
            console.log("error: " + error);
        }
    })
}

//拖动开始
function dragStart(event) {
    params.currentX = parseInt(event.screenX) - parseInt(event.target.offsetLeft);
    params.currentY = parseInt(event.screenY) - parseInt(event.target.offsetTop);
}
//拖动中
function dragging(event) {

}
//拖动结束
function dragEnd(event) {
    var lsLeft = event.screenX - params.currentX;
    var lsTop = event.screenY - params.currentY;
    if ("div-model-wall-back" == event.target.parentElement.id) {
        if (lsLeft < params.back.leftTopX) {
            lsLeft = params.back.leftTopX;
        }
        if ((lsLeft + event.target.width) > params.back.rightTopX) {
            lsLeft = params.back.rightTopX - event.target.width;
        }
        if (lsTop < params.back.leftTopY) {
            lsTop = params.back.leftTopY;
        }
        if ((lsTop + event.target.height) > params.back.leftBottomY) {
            lsTop = params.back.leftBottomY - event.target.height;
        }
    } else {
        if (lsLeft < params.front.leftTopX) {
            lsLeft = params.front.leftTopX;
        }
        if ((lsLeft + event.target.width) > params.front.rightTopX) {
            lsLeft = params.front.rightTopX - event.target.width;
        }
        if (lsTop < params.front.leftTopY) {
            lsTop = params.front.leftTopY;
        }
        if ((lsTop + event.target.height) > params.front.leftBottomY) {
            lsTop = params.front.leftBottomY - event.target.height;
        }
    }
    event.target.style.left = lsLeft + "px";
    event.target.style.top = lsTop + "px";
}

function div2png() {
    html2canvas($(".div-model-img-front")[0], {
        onrendered: function (canvas) {
            uploadImg(canvas);
        }
    });
    html2canvas($(".div-model-img-back")[0], {
        onrendered: function (canvas) {
            uploadImg(canvas);
        }
    })
}
function uploadImg(canvas) {
    var baseStr = canvas.toDataURL("image/png", 1);
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