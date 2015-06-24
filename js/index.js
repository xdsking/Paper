/**
 * Created by xuds on 2015/6/17.
 */
//PC端移动端判断
var IsPC = function () {
    var flag = true;
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
/**
 * @summary 初始化视频播放容器大小
 */
var initPaneSize = function () {
    var windowHeight = $(window).height();
    //$(".mainVideoPaneParent").css("height", windowHeight + "px");
    var top;
    if (IsPC()) {
        top = 80;
    } else {
        top = 0;
    }
    var videoListHeight = 110, mainVideoPaneHeight = windowHeight - top * 2 - videoListHeight;
    $(".mainVideoPane").css({
        "line-height": mainVideoPaneHeight + "px",
        "height": mainVideoPaneHeight + "px",
        "top": top + "px"
    });
    if(IsPC()){
        $(window).resize(function () {
         var windowHeight = $(window).height();
         //$(".mainVideoPaneParent").css("height", windowHeight + "px");
         var top = 80, videoListHeight = 110, mainVideoPaneHeight = windowHeight - top * 2 - videoListHeight;
         $(".mainVideoPane").css({
         "line-height": mainVideoPaneHeight + "px",
         "height": mainVideoPaneHeight + "px",
         "top": top + "px"
         });
         });
    }else{
        $(".videoListPane").css("padding","0 20px");

    }

};
var initVolumeEvt = function () {
    $("#volumeControl").click(function () {
        $(this).toggleClass("glyphicon-volume-off glyphicon-volume-up");
        //TODO
    });
};
var initVideoItemEvt = function () {
    var videoItem = $(".videoItem");
    videoItem.mouseenter(function () {
        var videoItemControlPane = this.getElementsByClassName("videoItemControlPane");
        $(videoItemControlPane).fadeIn();
    });
    videoItem.mouseleave(function () {
        var videoItemControlPane = this.getElementsByClassName("videoItemControlPane");
        $(videoItemControlPane).fadeOut();
    });
    $(".videoItemControlPane .videoItemToolBarVolumeItem").click(function () {
        $(this).toggleClass("glyphicon-volume-off glyphicon-volume-up");
    });
};
/**
 * @summary 初始化显示、隐藏按钮事件
 */
var initToolBarControlEvt = function () {
    var flag = false;
    $(".toolBarControl").click(function () {
        var toolBarPane = $(".toolBarPane .toolBarItem");
        toolBarPane.fadeToggle();
        $(this).toggleClass("glyphicon-menu-left glyphicon-menu-right toolBarControlBelone");
        if (!flag) {
            $(this).attr({title: "显示功能菜单"});
            flag = true;
        } else {
            $(this).attr({title: "隐藏功能菜单"});
            flag = false;
        }
    });
};
$(function () {
    initPaneSize();
    initToolBarControlEvt();
    initVolumeEvt();
    initVideoItemEvt();

});