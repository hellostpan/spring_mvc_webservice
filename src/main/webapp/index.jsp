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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>Title</title>
    <script type="text/javascript" src="resources/js/jquery-3.1.1.js"></script>
    <script type="text/javascript" src="resources/js/jquery.minicolors.js"></script>
    <script type="text/javascript" src="resources/js/jquery-ui.js"></script>
    <script type="text/javascript" src="resources/js/html2canvas.js"></script>
    <script type="text/javascript" src="resources/js/jspdf.debug.js"></script>
    <script type="text/javascript" src="resources/js/drag.js"></script>
    <script type="text/javascript" src="resources/js/card-design.js"></script>
    <link rel="stylesheet" href="resources/css/jquery.minicolors.css">
    <link rel="stylesheet" href="resources/css/jquery-ui.css">
    <link rel="stylesheet" href="resources/css/card-design.css">

</head>
<body>
<h1>名片制作</h1>
<div class="div-main">
    <div class="div-img">
        <div class="div-model-img-front" onclick="pageSelect(1)">
            <div class="div-model-wall" id="div-model-wall-front">
            </div>
        </div>
        <span class="div-placeholder"></span>

        <div class="div-model-img-back" onclick="pageSelect(2)">
            <div class="div-model-wall" id="div-model-wall-back">
            </div>
        </div>
    </div>

    <div class="div-setting">
        <div class="div-page-change">
            <ul>
                <li onclick="pageSelect(1)" class="li-select">
                    <a href="javascript:;">正面</a>
                </li>
                <li onclick="pageSelect(2)">
                    <a href="javascript:;">背面</a>
                </li>
            </ul>
        </div>
        <div class="div-page">
            <div class="div-setting-front">
                <div class="div-setting-list-img">

                </div>
                <div class="div-setting-list-word">

                </div>
                <div class="div-add">
                    <input type="button" class="ipt-add-logo" value="添加图片">
                    <input type="button" class="ipt-add-word" value="添加一行文字">
                </div>
            </div>
            <div class="div-setting-back">
                <div class="div-setting-list-img">

                </div>
                <div class="div-setting-list-word">

                </div>
                <div class="div-add">
                    <input type="button" class="ipt-add-logo" value="添加图片">
                    <input type="button" class="ipt-add-word" value="添加一行文字">
                </div>
            </div>
        </div>
        <input type="button" class="ipt-save" value="保存">
        <input id="image" type="file" accept="image/*" style="visibility: hidden"/>
    </div>


</div>
</body>
</html>
