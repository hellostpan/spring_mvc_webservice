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
    <link rel="stylesheet" href="resources/css/jquery.minicolors.css">
    <link rel="stylesheet" href="resources/css/jquery-ui.css">
    <link rel="stylesheet" href="resources/css/card-design.css">

</head>
<body>
<h1>HELLO WORLD</h1>
<div class="div-main">
    <div class="div-model-img">
        <div class="div-model-wall" id="div-model-wall">
            <img src="resources/images/logo.jpg" class="img-logo" draggable="true">
            <img src="resources/images/stpan.png" class="img-word" draggable="true"/>
        </div>
    </div>
    <div class="div-setting">
        <input type="text" class="ip-word" value="阿桑菲尼">
        <div class="div-setting-word">
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
            <select class="slc-font-family-names"></select>
            <label><input type="checkbox" class="ipt-bold" id="cb-bold">加粗</label>
            <label><input type="checkbox" class="ipt-italic">斜体</label>
            <input type="hidden" id="hidden-input" class="ipt-color" value="#000000">
            <div class="span-slider"></div>
            <input type="button" class="ipt-save" value="保存">
        </div>


    </div>
</div>

</body>
</html>
