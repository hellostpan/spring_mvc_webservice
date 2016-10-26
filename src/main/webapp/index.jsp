<%--
  Created by IntelliJ IDEA.
  User: STPAN
  Date: 2016/4/2
  Time: 18:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="resources/js/jquery-3.1.1.js"></script>
    <script type="text/javascript" src="resources/js/jquery.minicolors.js"></script>
    <script type="text/javascript" src="resources/js/card-design.js"></script>
    <script type="text/javascript" src="resources/js/jquery-ui.js"></script>
    <script type="text/javascript" src="resources/js/html2canvas.js"></script>
    <link rel="stylesheet" href="resources/css/jquery.minicolors.css">
    <link rel="stylesheet" href="resources/css/jquery-ui.css">
    <link rel="stylesheet" href="resources/css/card-design.css">

</head>
<body>
<h1>HELLO WORLD</h1>
<div class="div-main">
    <div class="div-img">
        <div class="div-model-img-front">
            <div class="div-model-wall" id="div-model-wall-front">
                <img src="resources/images/logo.jpg" class="img-logo-front" id="img-logo-front-0" draggable="true">
                <img src="resources/images/word0.png" class="img-word-front" id="img-word-front-0" draggable="true"/>
                <img src="resources/images/word1.png" class="img-word-front" id="img-word-front-1" draggable="true"/>
            </div>
        </div>
        <span class="div-placeholder"></span>

        <div class="div-model-img-back">
            <div class="div-model-wall" id="div-model-wall-back">
                <img src="resources/images/logo.jpg" class="img-logo-back" id="img-logo-back-0" draggable="true">
            </div>
        </div>
    </div>

    <div class="div-setting">
        <div class="div-setting-front">
            <div class="div-word-list">
                <div class="div-setting-img">
                    <img src="resources/images/logo.jpg" class="img-logo-front-show">
                    <span class="span-adjust-size">调整大小</span>
                    <div class="span-slider"></div>
                </div>

                <div class="div-setting-word" id="div-setting-word-0">
                    <div class="div-setting-word-top">
                        <input type="text" class="ipt-word" id="ipt-word-front-0" value="打翻了考试">
                        <a href="javascript:;" title="删除" class="a-word-clear"><img class="img-word-clear"
                                                                                    src="resources/images/ic_clear_grey600.png"></a>
                    </div>
                </div>
                <div class="div-setting-word" id="div-setting-word-1">
                    <div class="div-setting-word-top">
                        <input type="text" class="ipt-word" id="ipt-word-front-1" value="阿桑菲尼">
                        <a href="javascript:;" title="删除" class="a-word-clear"><img class="img-word-clear"
                                                                                    src="resources/images/ic_clear_grey600.png"></a>
                    </div>
                </div>
            </div>
            <div class="div-add">
                <input type="button" class="ipt-add-logo" value="添加logo">
                <input type="button" class="ipt-add-word" value="添加一行文字">
            </div>
        </div>
    </div>
    <input type="button" class="ipt-save" value="保存">
</div>
<%--<div class="div-word-setting">
    <select class="slc-font-family-names"></select>
    <select class="slc-font-size">
        <option value="6">6磅</option>
        <option value="7">7磅</option>
        <option value="8">8磅</option>
        <option value="9">9磅</option>
        <option value="10">10磅</option>
        <option value="11">11磅</option>
        <option value="12">12磅</option>
        <option value="13">13磅</option>
        <option value="14">14磅</option>
        <option value="16">16磅</option>
        <option value="18">18磅</option>
        <option value="20">20磅</option>
        <option value="22">22磅</option>
        <option value="24">24磅</option>
        <option value="26">26磅</option>
        <option value="28">28磅</option>
        <option value="30">30磅</option>
        <option value="32">32磅</option>
        <option value="34">34磅</option>
        <option value="36">36磅</option>
        <option value="38">38磅</option>
        <option value="40">40磅</option>
        <option value="42">42磅</option>
        <option value="44">44磅</option>
        <option value="46">46磅</option>
        <option value="48">48磅</option>
        <option value="50">50磅</option>
        <option value="52">52磅</option>
    </select>
    <label><input type="checkbox" class="ipt-bold" id="cb-bold">加粗</label>
    <label><input type="checkbox" class="ipt-italic">斜体</label>
    <input type="hidden" id="hidden-input" class="ipt-color" value="#000000">
</div>--%>

</body>
</html>
