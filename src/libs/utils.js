import Cookies from 'js-cookie'
window.log = console.log.bind(console)

/**
 * 设置cookie
 * 默认0.5天过期
 */
export const setCookie = (name, value, option = {}) => {
    try {
        Cookies.set(name, value, option);
    } catch (e) {
        console.log("setCookie error!");
    }
};

/**
 * 获取cookie
 */
export const getCookie = name => {
    try {
        return Cookies.get(name);
    } catch (e) {
        console.log("getCookie error!");
        return null;
    }
};

/**
 * 删除cookie
 */
export const removeCookie = (name, option = {}) => {
    try {
        Cookies.remove(name, option);
    } catch (e) {
        console.log("removeCookie error!");
    }
};

/**
 * 清空all cookies
 */
export const clearCookie = function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie =
                keys[i] + "=0;expires=" + new Date(0).toUTCString();
        }
    }
};

/**
 * 动态设置单页 title
 */
export const setTitle = function (t) {
    document.title = t;
    var i = document.createElement('iframe');
    // i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
        setTimeout(function () {
            i.remove();
        }, 5)
    }
    document.body.appendChild(i);
}