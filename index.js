/**
 * Created by Administrator on 2015/6/17.
 */
$(function(){
    var bodyScrollHeight=document.body.scrollHeight;
    $(".mainVideoPaneParent").css("height",bodyScrollHeight+"px");
    $(window).resize(function(){
        var bodyScrollHeight=document.body.scrollHeight;
        $(".mainVideoPaneParent").css("height",bodyScrollHeight+"px");
    });
});