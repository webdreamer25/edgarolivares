!function(e){"use strict";e.fn.multipleFilterMasonry=function(t){var i=[],n=[];"list"===t.selectorType&&e(t.filtersGroupSelector).children().each(function(){n.push(e(this).data("filter"))});var c=function(n){n.find(t.itemSelector).each(function(){i.push(e(this))}),n.masonry(t)},r=function(t){var n=[];return e(i).each(function(c){e(t).each(function(t,r){i[c].is(r)&&-1===e.inArray(i[c],n)&&n.push(i[c])})}),n},o=function(t,i){t.empty(),e(i).each(function(){e(t).append(e(this))}),t.masonry("reloadItems"),t.masonry()},s=function(t){var i=window.location.hash.replace("#","");-1!==e.inArray(i,n)&&o(t,e("."+i))},a=function(n){e(t.filtersGroupSelector).find('input[type="checkbox"]').each(function(){e(this).change(function(){var c=[];e(t.filtersGroupSelector).find('input[type="checkbox"]').each(function(){e(this).is(":checked")&&c.push("."+e(this).val())});var s=i;c.length>0&&(s=r(c)),o(n,s)})})},l=function(n){e(t.filtersGroupSelector).children().each(function(){e(this).click(function(){e(t.filtersGroupSelector).children().removeClass("selected"),window.location.hash=e(this).data("filter");var c=[];c.push("."+e(this).data("filter")),e(this).addClass("selected");var s=i;c.length>0&&(s=r(c)),o(n,s)})}),s(n),e(t.filtersGroupSelector).children().removeClass("selected"),e(".filters li[data-filter="+window.location.hash.replace("#","")+"]").addClass("selected")};return this.each(function(){var i=e(this);c(i),"list"===t.selectorType?l(i):a(i)})}}(window.jQuery);
//# sourceMappingURL=../maps/js/multipleFilterMasonry.js.map