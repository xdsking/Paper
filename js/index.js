/**
 * Created by xuds on 2015/6/17.
 */

/**
 * @summary 初始化视频播放容器大小
 */
var initPaneSize = function () {
    var bodyScrollHeight = document.body.scrollHeight;
    $(".mainVideoPaneParent").css("height", bodyScrollHeight + "px");
    $(window).resize(function () {
        var bodyScrollHeight = document.body.scrollHeight;
        $(".mainVideoPaneParent").css("height", bodyScrollHeight + "px");
    });
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