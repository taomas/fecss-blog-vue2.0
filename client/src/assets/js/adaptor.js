/*eslint-disable */
// 设置html字体大小
(function(doc, win) {
    'use strict';
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
              return;
            }
            docEl.style.fontSize = 40 * (clientWidth / 414) + 'px';
        };

    if (!doc.addEventListener) {
      return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
/*eslint-enable */
