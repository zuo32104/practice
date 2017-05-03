/**
 * Created by zuo on 2017/3/8.
 */
window.onhashchange = function () {
    var type = getQueryStringEearch('search')['lx'] ? getQueryStringEearch('search')['lx'] : 'sh';
    var page = getQueryStringEearch('hash').page ? getQueryStringEearch('hash').page : 0;
    createList(type,page);
    createRightList(type,page);
    createBtns(type, page);
}
var type = getQueryStringEearch('search')['lx'] ? getQueryStringEearch('search')['lx'] : 'sh';
var page = getQueryStringEearch('hash').page ? getQueryStringEearch('hash').page : 1;
//------根据srearch与hash生成---------------------
//判断search值 hash
function getQueryStringEearch(type) {
    if (type == 'hash') {
        var parameters = window.location.hash.length > 0 ? window.location.hash.substr(1) : "";
    }
    if (type == 'search') {
        var parameters = window.location.search.length > 0 ? window.location.search.substr(1) : "";
    }
    var args = {},
        name = null,
        value = null;
    item = null;
    var items = parameters.length ? parameters.split('&') : [];
    for (var i = 0; i < items.length; i++) {
        item = items[i].length ? items[i].split('=') : [];
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}


//生成左侧的列表 加点击事件-------------------------------
createList()
function createList() {
    //定义list
    var leftList = document.querySelector('.content .left .list');

    var listChilds = leftList.children;

    var cls = getQueryStringEearch('search')['lx'] ? getQueryStringEearch('search')['lx'] : 'sh';
    var str = '';
    for (var i = 0; i < aData['list'].length; i++) {
        str += `<li>
                    <a href="?lx=${aData['list'][i]['lx']}" class="${aData['list'][i]['lx'] == cls ? 'active' : ''}" data-type = '${aData['list'][i]['lx']}'>
                        <span >${aData['list'][i]['text']}</span>
                        <span>${aData['list'][i]['eng']}</span>
                    </a>
                </li>`

    }
    leftList.innerHTML = str;
};


createRightList(type,page)
//生成右侧list--------------------------------------------------
function createRightList(type,page) {
    var rightList = document.querySelector('.content .right .list');
    //数据的值
    var obj = aData[type]['text']
    var str = '';
    //拼接字符串
    var index = getQueryStringEearch('hash').page ? getQueryStringEearch('hash').page : 1;
    for (var i = (index - 1) * 4; i < index * 4; i++) {
        if (!obj[i]) continue;
        str += `<li>
                <div class="item" >
                    <div class="num">
                        ${aData.add0(i + 1)}
                    </div>
                    <div class="need">
                        <div class="zhiwei-need">
                            <div class="info">
                                <span>${obj[i]['zw']}</span>
                                <span>需求人数：${obj[i]['rs']}名</span>
                            </div>
                            <time>${aData.date(obj[i]['sj'])}</time>
                        </div>
                        <div class="gangwei-need">
                            <span class="info">${obj[i]['info'][0]['t']}${obj[i]['info'][0]['l']}</span>
                            <a href="content.html?lx=${type}&prev=${index}#page=${i+1}" class="details">查看详情&gt</a>
                        </div>
                    </div>
                </div>
            </li>`
    }
    rightList.innerHTML = str;
}

//生成下面点击事件-----------------------------
createBtns(type, page)
function createBtns(type, page) {
    var cutBtns = document.querySelector('.content .right .cutBtns');
    var len = Math.ceil(aData[type]['text'].length / 4);
    var str = '<a href="javascript:;">&lt</a>';
    for (var i = 0; i < len; i++) {
        str += `<a href="#page=${i + 1}" class="${ i == page-1 ? 'active' : ''}">${i + 1}</a>`
    }
    str += '<a href="javascript:;">&gt</a>';
    cutBtns.innerHTML = str;
    //左翻页
    cutBtns.firstElementChild.onclick = function () {
        var num = getQueryStringEearch('hash').page ? getQueryStringEearch('hash').page * 1 : 1;
        console.log('page=' + num, i, page)
        window.location.hash = 'page=' + (num > 1 ? --num : num);
    }
    //右翻页
    cutBtns.lastElementChild.onclick = function () {
        var num = getQueryStringEearch('hash').page ? getQueryStringEearch('hash').page * 1 : 1;
        window.location.hash = 'page=' + (num < i ? ++num : num);
    }

}
