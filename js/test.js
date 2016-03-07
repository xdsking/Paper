/**
 * Created by xuds on 2016/3/4.
 */
var sourceData = [
    {
        "id": 1,
        "name": "张三"
    },
    {
        "id": 2,
        "name": "李四"
    },
    {
        "id": 3,
        "name": "王五"
    },
    {
        "id": 4,
        "name": "钱六"
    },
    {
        "id": 5,
        "name": "钱六1"
    },
    {
        "id": 6,
        "name": "钱六2"
    },
    {
        "id": 7,
        "name": "钱六3"
    },
    {
        "id": 8,
        "name": "钱六4"
    },
    {
        "id": 9,
        "name": "钱六5"
    },
    {
        "id": 10,
        "name": "钱六6"
    },
    {
        "id": 11,
        "name": "钱六7"
    },
    {
        "id": 12,
        "name": "钱六8"
    },
    {
        "id": 13,
        "name": "钱六9"
    },
    {
        "id": 14,
        "name": "钱六10"
    },
    {
        "id": 15,
        "name": "钱六15"
    },
    {
        "id": 16,
        "name": "钱六16"
    }
];
var aimData = [
    /*{
     "id": 1,
     "name": "张三"
     }*/
];
var sourceTemplate = '<a class="list-group-item" value={id}>{name}<button type="button" class="btn btn-primary cstm-list-item" aria-label="Left Align"><span class="glyphicon glyphicon-plus cstm-glyphicon" aria-hidden="true"></span></button></a>';
var aimTemplate = '<a  class="list-group-item" value={id}>{name}<button type="button" class="btn btn-warning cstm-list-item" aria-label="Left Align"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></a>';
var addItem = function ($parent, data, template) {
    var str = template.replace("{id}", data.id);
    str = str.replace("{name}", data.name);
    $dom = $(str);
    $parent.prepend($dom);
    return $dom.children();
}
/**
 * @summary 初始化源、目标列表
 */
var initListData = function () {
    var sourceDataList = $("#sourceDataList"), aimDataList = $("#aimDataList");
    $.each(sourceData, function (index, sourceDataItem) {
        addItem(sourceDataList, sourceDataItem, sourceTemplate).click(function () {
            registerClickAction(this, true);
        });
    });
    $.each(aimData, function (index, aimDataItem) {
        addItem(aimDataList, aimDataItem, aimTemplate).click(function () {
            registerClickAction(this, false);
        });
    });
}
/**
 * @summary 注册删除、添加点击事件
 */
var registerClickAction = function (domNode, flag) {
    var domItem = domNode.parentNode, $item = $(domItem), removeIndex = -1, removeData = null, data1, data2, template;
    var tagetPane, sourceDataList = $("#sourceDataList"), aimDataList = $("#aimDataList");
    if (flag) {
        data1 = sourceData;
        data2 = aimData;
        template = aimTemplate;
        tagetPane = aimDataList;
    } else {
        data1 = aimData;
        data2 = sourceData;
        template = sourceTemplate;
        tagetPane = sourceDataList;
    }
    var identify = $item.attr("value");
    $.each(data1, function (index, dataItem) {
        if (dataItem.id == identify) {
            removeIndex = index;
            removeData = dataItem;
        }
    });
    data1.splice(removeIndex, 1);
    data2.unshift(removeData);
    addItem(tagetPane, removeData, template).click(function () {
        {
            registerClickAction(this, !flag);
        }
    });
    $item.remove();
}
/**
 * @summary 注册查询过滤事件
 */
var resisterSearchAction = function () {
    var sourceSearch = $("#sourceSearch"), aimSearch = $("#aimSearch"),
        sourceDataList = $("#sourceDataList"), aimDataList = $("#aimDataList");

    $("#sourceKeyWord").keyup(function (evt) {
        if (evt.keyCode == 8 && $("#sourceKeyWord").val() == "") {
            sourceDataList.empty();
            $.each(sourceData, function (index, sourceDataItem) {
                addItem(sourceDataList, sourceDataItem, sourceTemplate).click(function () {
                    registerClickAction(this, true);
                });
            });
        }
    });
    $("#aimKeyWord").keyup(function (evt) {
        if (evt.keyCode == 8 && $("#sourceKeyWord").val() == "") {
            aimDataList.empty();
            $.each(aimData, function (index, aimDataItem) {
                addItem(aimDataList, aimDataItem, aimTemplate).click(function () {
                    registerClickAction(this, false);
                });
            });
        }
    });
    sourceSearch.click(function () {
        sourceDataList.empty();
        var keyWord = $("#sourceKeyWord").val(), reKeyWord = "";
        for (var i = 0; i < keyWord.length; i++) {
            reKeyWord += keyWord.charAt(i) + ".*?";
        }
        $.each(sourceData, function (index, sourceDataItem) {
            var re = new RegExp(reKeyWord);
            if (re.test(sourceDataItem.name)) {
                addItem(sourceDataList, sourceDataItem, sourceTemplate).click(function () {
                    registerClickAction(this, true);
                });
            }

        });
    });
    aimSearch.click(function () {
        aimDataList.empty();
        var keyWord = $("#aimKeyWord").val(), reKeyWord = "";
        for (var i = 0; i < keyWord.length; i++) {
            reKeyWord += keyWord.charAt(i) + ".*?";
        }
        $.each(aimData, function (index, aimDataItem) {
            var re = new RegExp(reKeyWord);
            if (re.test(aimDataItem.name)) {
                addItem(aimDataList, aimDataItem, aimTemplate).click(function () {
                    registerClickAction(this, false);
                });
            }

        });
    });
}
$(function () {
    initListData();
    var modalPane = $("#modalPane");
    //打开模态窗口
    $(".modal-pane-controler").click(function () {
        var options = {
            keyboard: false
        };
        modalPane.modal(options);
    });
    //关闭模态窗口
    $("#closeModalPane").click(function () {
        var confirmFlag = confirm("确认关闭？");
        if (confirmFlag) {
            modalPane.modal("hide");
        }
    });
    resisterSearchAction();
    //提交数据
    $("#submitModalPane").click(function () {
        modalPane.modal("hide");
        console.log(sourceData.length);
        console.log(aimData.length);
        //TODO
    });
});