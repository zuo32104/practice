/**
 * Created by zuo on 2017/3/9.
 */
var content = document.querySelector('.content')

//变量--------------------------------------------------------------------
var type = getQueryStringEearch('search')['lx'] ? getQueryStringEearch('search')['lx'] : 'sh';
var page = getQueryStringEearch('hash').page ? getQueryStringEearch('hash').page : 1;
var prev = getQueryStringEearch('search').prev ? getQueryStringEearch('search').prev : 1;
//------------------------------------------------------------------------------------------------------

//生成内容
createHTML(type, page)
function createHTML(type, page) {
    var obj = aData[type]['text'];
    var str = `<div class="describe">
                    <div class="info">
                        ${obj[page - 1]['zw']}
                    </div>
                    <div class="wrap">
                        <div class="aptitude">
                           ${obj[page - 1]['dy']} / ${obj[page - 1]['xl']} / ${obj[page - 1]['jy']} / ${obj[page - 1]['rs']}名
                        </div>
                        <time>${aData.date(obj[page - 1]['sj'])}</time>
                    </div>
                </div>
                <div class="particular">`
    for (var i = 0; i < obj[page - 1]['info'].length; i++) {
        str += `  <div class="info">
                    ${obj[page - 1]['info'][i]['t']}
                  </div>
                  <ul>`
        for (var j = 0; j < obj[page - 1]['info'][i]['l'].length; j++) {
            str += `<li>${obj[page - 1]['info'][i]['l'][j]}</li>`
        }
        str += `</ul>`;
    }
    str += '</div>'
    content.innerHTML = str;
}
//--返回
var homeBtn = document.querySelectorAll('.nav a');
homeBtn[0].onclick = function () {
    console.log(type, page, prev)
    window.location.replace(`list.html?lx=${type}#page=${prev}`)
};


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