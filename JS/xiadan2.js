/*! jQuery asScrollable - v0.3.1 - 2015-06-15
* https://github.com/amazingSurge/jquery-asScrollable
* Copyright (c) 2015 amazingSurge; Licensed GPL */
!function(a,b,c,d){"use strict";function e(){return"undefined"!=typeof a.performance&&a.performance.now?a.performance.now():Date.now()}function f(a){return"string"==typeof a&&-1!=a.indexOf("%")}function g(a){return parseFloat(a.slice(0,-1)/100,10)}function h(a){return a&&"matrix"==a.substr(0,6)?a.replace(/^.*\((.*)\)$/g,"$1").replace(/px/g,"").split(/, +/):!1}var i="asScrollbar";Date.now||(Date.now=function(){return(new Date).getTime()});for(var j=["webkit","moz"],k=0;k<j.length&&!a.requestAnimationFrame;++k){var l=j[k];a.requestAnimationFrame=a[l+"RequestAnimationFrame"],a.cancelAnimationFrame=a[l+"CancelAnimationFrame"]||a[l+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS (6|7|8)/.test(a.navigator.userAgent)||!a.requestAnimationFrame||!a.cancelAnimationFrame){var m=0;a.requestAnimationFrame=function(a){var b=e(),c=Math.max(m+16,b);return setTimeout(function(){a(m=c)},c-b)},a.cancelAnimationFrame=clearTimeout}var n=c[i]=function(a,b){this.$bar=c(b),a=this.options=c.extend({},n.defaults,a||{},this.$bar.data("options")||{}),b.direction=this.options.direction,this.classes={directionClass:a.namespace+"-"+a.direction,barClass:a.barClass?a.barClass:a.namespace,handleClass:a.handleClass?a.handleClass:a.namespace+"-handle"},"vertical"===this.options.direction?this.attributes={axis:"Y",position:"top",length:"height",clientLength:"clientHeight"}:"horizontal"===this.options.direction&&(this.attributes={axis:"X",position:"left",length:"width",clientLength:"clientWidth"}),this._states={},this._drag={time:null,pointer:null},this._frameId=null,this.handlePosition=0,this.easing=n.easing[this.options.easing]||n.easing.ease,this.init()};n.defaults={namespace:"asScrollbar",skin:null,handleSelector:null,handleTemplate:'<div class="{{handle}}"></div>',barClass:null,handleClass:null,disabledClass:"is-disabled",draggingClass:"is-dragging",hoveringClass:"is-hovering",direction:"vertical",barLength:null,handleLength:null,minHandleLength:30,maxHandleLength:null,mouseDrag:!0,touchDrag:!0,pointerDrag:!0,clickMove:!0,clickMoveStep:.3,mousewheel:!0,mousewheelSpeed:50,keyboard:!0,useCssTransforms3d:!0,useCssTransforms:!0,useCssTransitions:!0,duration:"500",easing:"ease"};var o={};n.support=o,function(e){function f(a,b){var e=!1,f=a.charAt(0).toUpperCase()+a.slice(1);return h[a]!==d&&(e=a),e||c.each(i,function(a,b){return h[b+f]!==d?(e="-"+b.toLowerCase()+"-"+f,!1):void 0}),b?e:e?!0:!1}function g(a){return f(a,!0)}var h=c("<support>").get(0).style,i=["webkit","Moz","O","ms"],j={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},k={csstransforms:function(){return!!f("transform")},csstransforms3d:function(){return!!f("perspective")},csstransitions:function(){return!!f("transition")},cssanimations:function(){return!!f("animation")}};k.csstransitions()&&(e.transition=new String(g("transition")),e.transition.end=j.transition.end[e.transition]),k.cssanimations()&&(e.animation=new String(g("animation")),e.animation.end=j.animation.end[e.animation]),k.csstransforms()&&(e.transform=new String(g("transform")),e.transform3d=k.csstransforms3d()),e.touch="ontouchstart"in a||a.DocumentTouch&&b instanceof a.DocumentTouch?!0:!1,e.pointer=a.PointerEvent||a.MSPointerEvent?!0:!1,e.prefixPointerEvent=function(b){return a.MSPointerEvent?"MSPointer"+b.charAt(9).toUpperCase()+b.substr(10):b}}(o);var p=function(a,b,c,d){function e(a,b){return 1-3*b+3*a}function f(a,b){return 3*b-6*a}function g(a){return 3*a}function h(a,b,c){return((e(b,c)*a+f(b,c))*a+g(b))*a}function i(a,b,c){return 3*e(b,c)*a*a+2*f(b,c)*a+g(b)}function j(b){for(var d=b,e=0;4>e;++e){var f=i(d,a,c);if(0===f)return d;var g=h(d,a,c)-b;d-=g/f}return d}return a===b&&c===d?{css:"linear",fn:function(a){return a}}:{css:"cubic-bezier("+a+","+b+","+c+","+d+")",fn:function(a){return h(j(a),b,d)}}};c.extend(n.easing={},{ease:p(.25,.1,.25,1),linear:p(0,0,1,1),"ease-in":p(.42,0,1,1),"ease-out":p(0,0,.58,1),"ease-in-out":p(.42,0,.58,1)}),n.prototype={constructor:n,init:function(){var a=this.options;this.$handle=this.$bar.find(this.options.handleSelector),0===this.$handle.length?this.$handle=c(a.handleTemplate.replace(/\{\{handle\}\}/g,this.classes.handleClass)).appendTo(this.$bar):this.$handle.addClass(this.classes.handleClass),this.$bar.addClass(this.classes.barClass).addClass(this.classes.directionClass).attr("draggable",!1),a.skin&&this.$bar.addClass(a.skin),null!==a.barLength&&this.setBarLength(a.barLength),null!==a.handleLength&&this.setHandleLength(a.handleLength),this.updateLength(),this.bindEvents()},trigger:function(a){var b=Array.prototype.slice.call(arguments,1),c=[this].concat(b);this.$bar.trigger(i+"::"+a,c),a=a.replace(/\b\w+\b/g,function(a){return a.substring(0,1).toUpperCase()+a.substring(1)});var d="on"+a;"function"==typeof this.options[d]&&this.options[d].apply(this,b)},is:function(a){return this._states[a]&&this._states[a]>0},enter:function(a){this._states[a]===d&&(this._states[a]=0),this._states[a]++},leave:function(a){this._states[a]--},eventName:function(a){if("string"!=typeof a||""===a)return"."+this.options.namespace;a=a.split(" ");for(var b=a.length,c=0;b>c;c++)a[c]=a[c]+"."+this.options.namespace;return a.join(" ")},bindEvents:function(){var a=this;this.options.mouseDrag&&(this.$handle.on(this.eventName("mousedown"),c.proxy(this.onDragStart,this)),this.$handle.on(this.eventName("dragstart selectstart"),function(){return!1})),this.options.touchDrag&&o.touch&&(this.$handle.on(this.eventName("touchstart"),c.proxy(this.onDragStart,this)),this.$handle.on(this.eventName("touchcancel"),c.proxy(this.onDragEnd,this))),this.options.pointerDrag&&o.pointer&&(this.$handle.on(this.eventName(o.prefixPointerEvent("pointerdown")),c.proxy(this.onDragStart,this)),this.$handle.on(this.eventName(o.prefixPointerEvent("pointercancel")),c.proxy(this.onDragEnd,this))),this.options.clickMove&&this.$bar.on(this.eventName("mousedown"),c.proxy(this.onClick,this)),this.options.mousewheel&&this.$bar.on(this.eventName("mousewheel"),function(b,c){var d=a.getHandlePosition();return 0>=d&&c>0?!0:d>=a.barLength&&0>c?!0:(d-=a.options.mousewheelSpeed*c,a.move(d,!0),!1)}),this.$bar.on(this.eventName("mouseenter"),function(){a.$bar.addClass(a.options.hoveringClass),a.enter("hovering"),a.trigger("hover")}),this.$bar.on(this.eventName("mouseleave"),function(){a.$bar.removeClass(a.options.hoveringClass),a.is("hovering")&&(a.leave("hovering"),a.trigger("hovered"))}),this.options.keyboard&&c(b).on(this.eventName("keydown"),function(d){if((!d.isDefaultPrevented||!d.isDefaultPrevented())&&a.is("hovering")){for(var e=b.activeElement;e.shadowRoot;)e=e.shadowRoot.activeElement;if(!c(e).is(":input,select,option,[contenteditable]")){var f=0,g=null;switch(d.which){case 37:case 63232:f=-30;break;case 38:case 63233:f=-30;break;case 39:case 63234:f=30;break;case 40:case 63235:f=30;break;case 33:case 63276:f=-90;break;case 32:case 34:case 63277:f=-90;break;case 35:case 63275:g="100%";break;case 36:case 63273:g=0;break;default:return}(f||null!==g)&&(f?a.moveBy(f,!0):null!==g&&a.moveTo(g,!0),d.preventDefault())}}})},onClick:function(a){if(3!==a.which&&a.target!==this.$handle[0]){this._drag.time=(new Date).getTime(),this._drag.pointer=this.pointer(a);var b=this.$handle.offset(),c=this.distance({x:b.left,y:b.top},this._drag.pointer),d=1;c>0?c-=this.handleLength:(c=Math.abs(c),d=-1),c>this.barLength*this.options.clickMoveStep&&(c=this.barLength*this.options.clickMoveStep),this.moveBy(d*c,!0)}},onDragStart:function(a){var d=this;if(3!==a.which){this.$bar.addClass(this.options.draggingClass),this._drag.time=(new Date).getTime(),this._drag.pointer=this.pointer(a);var e=function(){d.enter("dragging"),d.trigger("drag")};this.options.mouseDrag&&(c(b).on(d.eventName("mouseup"),c.proxy(this.onDragEnd,this)),c(b).one(d.eventName("mousemove"),c.proxy(function(){c(b).on(d.eventName("mousemove"),c.proxy(this.onDragMove,this)),e()},this))),this.options.touchDrag&&o.touch&&(c(b).on(d.eventName("touchend"),c.proxy(this.onDragEnd,this)),c(b).one(d.eventName("touchmove"),c.proxy(function(){c(b).on(d.eventName("touchmove"),c.proxy(this.onDragMove,this)),e()},this))),this.options.pointerDrag&&o.pointer&&(c(b).on(d.eventName(o.prefixPointerEvent("pointerup")),c.proxy(this.onDragEnd,this)),c(b).one(d.eventName(o.prefixPointerEvent("pointermove")),c.proxy(function(){c(b).on(d.eventName(o.prefixPointerEvent("pointermove")),c.proxy(this.onDragMove,this)),e()},this))),c(b).on(d.eventName("blur"),c.proxy(this.onDragEnd,this))}},onDragMove:function(a){var b=this.distance(this._drag.pointer,this.pointer(a));this.is("dragging")&&(a.preventDefault(),this.moveBy(b,!0))},onDragEnd:function(){c(b).off(this.eventName("mousemove mouseup touchmove touchend pointermove pointerup MSPointerMove MSPointerUp blur")),this.$bar.removeClass(this.options.draggingClass),this.handlePosition=this.getHandlePosition(),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},pointer:function(b){var c={x:null,y:null};return b=b.originalEvent||b||a.event,b=b.touches&&b.touches.length?b.touches[0]:b.changedTouches&&b.changedTouches.length?b.changedTouches[0]:b,b.pageX?(c.x=b.pageX,c.y=b.pageY):(c.x=b.clientX,c.y=b.clientY),c},distance:function(a,b){return"vertical"===this.options.direction?b.y-a.y:b.x-a.x},setBarLength:function(a,b){"undefined"!=typeof a&&this.$bar.css(this.attributes.length,a),b!==!1&&this.updateLength()},setHandleLength:function(a,b){"undefined"!=typeof a&&(a<this.options.minHandleLength?a=this.options.minHandleLength:this.options.maxHandleLength&&a>this.options.maxHandleLength&&(a=this.options.maxHandleLength),this.$handle.css(this.attributes.length,a),b!==!1&&this.updateLength(a))},updateLength:function(a,b){this.handleLength="undefined"!=typeof a?a:this.getHandleLenght(),this.barLength="undefined"!=typeof b?b:this.getBarLength()},getBarLength:function(){return this.$bar[0][this.attributes.clientLength]},getHandleLenght:function(){return this.$handle[0][this.attributes.clientLength]},getHandlePosition:function(){var a;if(this.options.useCssTransforms&&o.transform){if(a=h(this.$handle.css(o.transform)),!a)return 0;a="X"===this.attributes.axis?a[12]||a[4]:a[13]||a[5]}else a=this.$handle.css(this.attributes.position);return parseFloat(a.replace("px",""))},makeHandlePositionStyle:function(a){var b,c="0",d="0";this.options.useCssTransforms&&o.transform?("X"===this.attributes.axis?c=a+"px":d=a+"px",b=o.transform.toString(),a=this.options.useCssTransforms3d&&o.transform3d?"translate3d("+c+","+d+",0)":"translate("+c+","+d+")"):b=this.attributes.position;var e={};return e[b]=a,e},setHandlePosition:function(a){var b=this.makeHandlePositionStyle(a);this.$handle.css(b),this.is("dragging")||(this.handlePosition=parseFloat(a))},moveTo:function(a,b,c){var d=typeof a;"string"===d&&(f(a)&&(a=g(a)*(this.barLength-this.handleLength)),a=parseFloat(a),d="number"),"number"===d&&this.move(a,b,c)},moveBy:function(a,b,c){var d=typeof a;"string"===d&&(f(a)&&(a=g(a)*(this.barLength-this.handleLength)),a=parseFloat(a),d="number"),"number"===d&&this.move(this.handlePosition+a,b,c)},move:function(a,b,c){"number"!=typeof a||this.is("disabled")||(0>a?a=0:a+this.handleLength>this.barLength&&(a=this.barLength-this.handleLength),this.is("dragging")||c===!0?(this.setHandlePosition(a),b&&this.trigger("change",a/(this.barLength-this.handleLength))):this.doMove(a,this.options.duration,this.options.easing,b))},doMove:function(b,c,d,f){this.enter("moving"),c=c?c:this.options.duration,d=d?d:this.options.easing;var g=this,h=this.makeHandlePositionStyle(b);for(var i in h)break;if(this.options.useCssTransitions&&o.transition)g.enter("transition"),this.prepareTransition(i,c,d),this.$handle.one(o.transition.end,function(){g.$handle.css(o.transition,""),f&&g.trigger("change",b/(g.barLength-g.handleLength)),g.leave("transition"),g.leave("moving")}),g.setHandlePosition(b);else{g.enter("animating");var j=e(),k=g.getHandlePosition(),l=b,m=function(b){var c=(b-j)/g.options.duration;c>1&&(c=1),c=g.easing.fn(c);var d=parseFloat(k+c*(l-k),10);g.setHandlePosition(d),f&&g.trigger("change",d/(g.barLength-g.handleLength)),1===c?(a.cancelAnimationFrame(g._frameId),g._frameId=null,g.leave("animating"),g.leave("moving")):g._frameId=a.requestAnimationFrame(m)};g._frameId=a.requestAnimationFrame(m)}},prepareTransition:function(a,b,d,e){var f=[];a&&f.push(a),b&&(c.isNumeric(b)&&(b+="ms"),f.push(b)),f.push(d?d:this.easing.css),e&&f.push(e),this.$handle.css(o.transition,f.join(" "))},enable:function(){this._states.disabled=0,this.$bar.removeClass(this.options.disabledClass)},disable:function(){this._states.disabled=1,this.$bar.addClass(this.options.disabledClass)},destory:function(){this.$bar.on(this.eventName())}},c.fn[i]=function(a){if("string"!=typeof a)return this.each(function(){c(this).data(i)||c(this).data(i,new n(a,this))});var b=Array.prototype.slice.call(arguments,1);this.each(function(){var d=c(this).data(i);return d&&c.isFunction(d[a])&&"_"!==a.charAt(0)?void d[a].apply(d,b):!1})}}(window,document,jQuery,void 0),function(a,b,c,d,e){"use strict";function f(){return"undefined"!=typeof a.performance&&a.performance.now?a.performance.now():Date.now()}function g(a){return"string"==typeof a&&-1!=a.indexOf("%")}function h(a){return 0>a?a=0:a>1&&(a=1),100*parseFloat(a).toFixed(4)+"%"}function i(a){return parseFloat(a.slice(0,-1)/100,10)}var j="asScrollable",k=0,l=function(){var b,c,d;return c=a.navigator.userAgent,(b=/(?=.+Mac OS X)(?=.+Firefox)/.test(c))?(d=/Firefox\/\d{2}\./.exec(c),d&&(d=d[0].replace(/\D+/g,"")),b&&+d>23):!1}(),m=c[j]=function(a,b){this.$element=c(b),a=this.options=c.extend({},m.defaults,a||{},this.$element.data("options")||{}),this.classes={wrap:a.namespace,content:a.namespace+"-content",container:a.namespace+"-container",bar:a.namespace+"-bar",barHide:a.namespace+"-bar-hide",skin:a.skin},this.attributes={vertical:{axis:"Y",overflow:"overflow-y",scroll:"scrollTop",scrollLength:"scrollHeight",pageOffset:"pageYOffset",ffPadding:"padding-right",length:"height",clientLength:"clientHeight",offset:"offsetHeight",crossLength:"width",crossClientLength:"clientWidth",crossOffset:"offsetWidth"},horizontal:{axis:"X",overflow:"overflow-x",scroll:"scrollLeft",scrollLength:"scrollWidth",pageOffset:"pageXOffset",ffPadding:"padding-bottom",length:"width",clientLength:"clientWidth",offset:"offsetWidth",crossLength:"height",crossClientLength:"clientHeight",crossOffset:"offsetHeight"}},this._states={},this.horizontal=null,this.vertical=null,this.$bar=null,this._frameId=null,this._timeoutId=null,this.instanceId=++k,this.easing=d.easing[this.options.easing]||d.easing.ease;var e=this.$element.css("position");this.options.containerSelector?(this.$container=this.$element.find(this.options.containerSelector),this.$wrap=this.$element,"static"==e&&this.$wrap.css("position","relative")):(this.$container=this.$element.wrap("<div>"),this.$wrap=this.$container.parent(),this.$wrap.height(this.$element.height()),"static"!==e?this.$wrap.css("position",e):this.$wrap.css("position","relative")),this.options.contentSelector?this.$content=this.$container.find(this.options.contentSelector):(this.$content=this.$container.wrap("<div>"),this.$container=this.$content.parent()),this.init()};m.defaults={namespace:j,skin:null,contentSelector:null,containerSelector:null,enabledClass:"is-enabled",disabledClass:"is-disabled",draggingClass:"is-dragging",hoveringClass:"is-hovering",scrollingClass:"is-scrolling",direction:"vertical",showOnHover:!0,showOnBarHover:!1,duration:500,easing:"ease-in",responsive:!0,throttle:20,scrollbar:{}},m.prototype={constructor:m,init:function(){switch(this.options.direction){case"vertical":this.vertical=!0;break;case"horizontal":this.horizontal=!0;break;case"both":this.horizontal=!0,this.vertical=!0;break;case"auto":var a=this.$element.css("overflow-x"),b=this.$element.css("overflow-y");("scroll"===a||"auto"===a)&&(this.horizontal=!0),("scroll"===b||"auto"===b)&&(this.vertical=!0)}(this.vertical||this.horizontal)&&(this.$wrap.addClass(this.classes.wrap),this.$container.addClass(this.classes.container),this.$content.addClass(this.classes.content),this.options.skin&&this.$wrap.addClass(this.classes.skin),this.$wrap.addClass(this.options.enabledClass),this.vertical&&(this.$wrap.addClass(this.classes.wrap+"-vertical"),this.initLayout("vertical"),this.createBar("vertical")),this.horizontal&&(this.$wrap.addClass(this.classes.wrap+"-horizontal"),this.initLayout("horizontal"),this.createBar("horizontal")),this.bindEvents())},bindEvents:function(){var b=this,d=this.options;d.responsive&&(c(a).on(this.eventNameWithId("orientationchange"),function(){b.update.call(b)}),c(a).on(this.eventNameWithId("resize"),this.throttle(function(){b.update.call(b)},d.throttle))),(this.horizontal||this.vertical)&&(this.$wrap.on(this.eventName("mouseenter"),function(){b.$wrap.addClass(b.options.hoveringClass),b.enter("hovering"),b.trigger("hover")}),this.$wrap.on(this.eventName("mouseleave"),function(){b.$wrap.removeClass(b.options.hoveringClass),b.is("hovering")&&(b.leave("hovering"),b.trigger("hovered"))}),d.showOnHover&&(d.showOnBarHover?this.$bar.on("asScrollbar::hover",function(){b.showBar(this.direction)}).on("asScrollbar::hovered",function(){b.hideBar(this.direction)}):(this.$element.on(j+"::hover",c.proxy(this.showBar,this)),this.$element.on(j+"::hovered",c.proxy(this.hideBar,this)))),this.$container.on(this.eventName("scroll"),function(){if(b.horizontal){var a=b.offsetLeft;b.offsetLeft=b.getOffset("horizontal"),a!==b.offsetLeft&&(b.trigger("scroll",b.getPercentOffset("horizontal"),"horizontal"),0===b.offsetLeft&&b.trigger("scrolltop","horizontal"),b.offsetLeft===b.getScrollLength("horizontal")&&b.trigger("scrollend","horizontal"))}if(b.vertical){var c=b.offsetTop;b.offsetTop=b.getOffset("vertical"),c!==b.offsetTop&&(b.trigger("scroll",b.getPercentOffset("vertical"),"vertical"),0===b.offsetTop&&b.trigger("scrolltop","vertical"),b.offsetTop===b.getScrollLength("vertical")&&b.trigger("scrollend","vertical"))}}),this.$element.on(j+"::scroll",function(a,c,d,e){b.is("scrolling")||(b.enter("scrolling"),b.$wrap.addClass(b.options.scrollingClass));var f=c.getBarApi(e);f.moveTo(h(d),!1,!0),clearTimeout(b._timeoutId),b._timeoutId=setTimeout(function(){b.$wrap.removeClass(b.options.scrollingClass),b.leave("scrolling")},200)}),this.$bar.on("asScrollbar::change",function(a,c,d){b.scrollTo(this.direction,h(d),!1,!0)}),this.$bar.on("asScrollbar::drag",function(){b.$wrap.addClass(b.options.draggingClass)}).on("asScrollbar::dragged",function(){b.$wrap.removeClass(b.options.draggingClass)}))},unbindEvents:function(){this.$wrap.off(this.eventName()),this.$element.off(j+"::scroll").off(j+"::hover").off(j+"::hovered"),this.$container.off(this.eventName()),c(a).off(this.eventNameWithId())},initLayout:function(a){"vertical"===a&&this.$container.css("height",this.$wrap.height());var b=this.attributes[a],c=this.$container[0],d=this.getBrowserScrollbarWidth(a),e=c.parentNode[b.crossClientLength];this.$content.css(b.crossLength,e+"px"),this.$container.css(b.crossLength,d+e+"px"),0===d&&l&&this.$container.css(b.ffPadding,16)},createBar:function(a){var b=c.extend(this.options.scrollbar,{namespace:this.classes.bar,direction:a,useCssTransitions:!1,keyboard:!1}),d=c("<div>");d.asScrollbar(b),this.options.showOnHover&&d.addClass(this.classes.barHide),d.appendTo(this.$wrap),this["$"+a]=d,this.$bar=null===this.$bar?d:this.$bar.add(d),this.updateBarHandle(a)},trigger:function(a){var b=Array.prototype.slice.call(arguments,1),c=[this].concat(b);this.$element.trigger(j+"::"+a,c),a=a.replace(/\b\w+\b/g,function(a){return a.substring(0,1).toUpperCase()+a.substring(1)});var d="on"+a;"function"==typeof this.options[d]&&this.options[d].apply(this,b)},is:function(a){return this._states[a]&&this._states[a]>0},enter:function(a){this._states[a]===e&&(this._states[a]=0),this._states[a]++},leave:function(a){this._states[a]--},eventName:function(a){if("string"!=typeof a||""===a)return"."+this.options.namespace;a=a.split(" ");for(var b=a.length,c=0;b>c;c++)a[c]=a[c]+"."+this.options.namespace;return a.join(" ")},eventNameWithId:function(a){if("string"!=typeof a||""===a)return this.options.namespace+"-"+this.instanceId;a=a.split(" ");for(var b=a.length,c=0;b>c;c++)a[c]=a[c]+"."+this.options.namespace+"-"+this.instanceId;return a.join(" ")},throttle:function(a,b){var c,d,e,f=Date.now||function(){return(new Date).getTime()},g=null,h=0,i=function(){h=f(),g=null,e=a.apply(c,d),c=d=null};return function(){var j=f(),k=b-(j-h);return c=this,d=arguments,0>=k?(clearTimeout(g),g=null,h=j,e=a.apply(c,d),c=d=null):g||(g=setTimeout(i,k)),e}},getBrowserScrollbarWidth:function(a){var c,d,e=this.attributes[a];return e.scrollbarWidth?e.scrollbarWidth:(c=b.createElement("div"),d=c.style,d.position="absolute",d.width="100px",d.height="100px",d.overflow="scroll",d.top="-9999px",b.body.appendChild(c),e.scrollbarWidth=c[e.offset]-c[e.clientLength],b.body.removeChild(c),e.scrollbarWidth)},getOffset:function(a){var b=this.attributes[a],c=this.$container[0];return c[b.pageOffset]||c[b.scroll]},getPercentOffset:function(a){return this.getOffset(a)/this.getScrollLength(a)},getContainerLength:function(a){return this.$container[0][this.attributes[a].clientLength]},getScrollLength:function(a){var b=this.$content[0][this.attributes[a].scrollLength];return b-this.getContainerLength(a)},scrollTo:function(a,b,c,d){var e=typeof b;"string"===e&&(g(b)&&(b=i(b)*this.getScrollLength(a)),b=parseFloat(b),e="number"),"number"===e&&this.move(a,b,c,d)},scrollBy:function(a,b,c,d){var e=typeof b;"string"===e&&(g(b)&&(b=i(b)*this.getScrollLength(a)),b=parseFloat(b),e="number"),"number"===e&&this.move(a,this.getOffset(a)+b,c,d)},move:function(b,c,d,e){if(this[b]===!0&&"number"==typeof c){var g=this;this.enter("moving"),0>c?c=0:c>this.getScrollLength(b)&&(c=this.getScrollLength(b));var h=this.attributes[b],i=function(){g.leave("moving")};if(e)this.$container[0][h.scroll]=c,d!==!1&&this.trigger("change",c/this.getScrollLength(b)),i();else{g.enter("animating");var j=f(),k=g.getOffset(b),l=c,m=function(e){var f=(e-j)/g.options.duration;f>1&&(f=1),f=g.easing.fn(f);var n=parseFloat(k+f*(l-k),10);g.$container[0][h.scroll]=n,d!==!1&&g.trigger("change",c/g.getScrollLength(b)),1===f?(a.cancelAnimationFrame(g._frameId),g._frameId=null,g.leave("animating"),i()):g._frameId=a.requestAnimationFrame(m)};g._frameId=a.requestAnimationFrame(m)}}},scrollXto:function(a,b,c){return this.scrollTo("horizontal",a,b,c)},scrollYto:function(a,b,c){return this.scrollTo("vertical",a,b,c)},scrollXby:function(a,b,c){return this.scrollBy("horizontal",a,b,c)},scrollYby:function(a,b,c){return this.scrollBy("vertical",a,b,c)},getBar:function(a){return a&&this["$"+a]?this["$"+a]:this.$bar},getBarApi:function(a){return this.getBar(a).data("asScrollbar")},getBarX:function(){return this.getBar("horizontal")},getBarY:function(){return this.getBar("vertical")},showBar:function(a){this.getBar(a).removeClass(this.classes.barHide)},hideBar:function(a){this.getBar(a).addClass(this.classes.barHide)},updateBarHandle:function(a){var b=this.getBarApi(a),c=this.getScrollLength(a),d=this.getContainerLength(a);c>0?(b.is("disabled")&&b.enable(),b.setHandleLength(b.getBarLength()*d/(c+d),!0)):b.disable()},disable:function(){this.is("disabled")||(this.enter("disabled"),this.$wrap.addClass(this.options.disabledClass).removeClass(this.options.enabledClass),this.unbindEvents(),this.unStyle())},enable:function(){this.is("disabled")&&(this.leave("disabled"),this.$wrap.addClass(this.options.enabledClass).removeClass(this.options.disabledClass),this.bindEvents(),this.update())},update:function(){this.is("disabled")||(this.vertical&&(this.initLayout("vertical"),this.updateBarHandle("vertical")),this.horizontal&&(this.initLayout("horizontal"),this.updateBarHandle("horizontal")))},unStyle:function(){this.horizontal&&(this.$container.css({height:"","padding-bottom":""}),this.$content.css({height:""})),this.vertical&&(this.$container.css({width:"",height:"","padding-right":""}),this.$content.css({width:""})),this.options.containerSelector||this.$wrap.css({height:""})},destory:function(){this.$wrap.removeClass(this.classes.wrap+"-vertical").removeClass(this.classes.wrap+"-horizontal").removeClass(this.classes.wrap).removeClass(this.options.enabledClass).removeClass(this.classes.disabledClass),this.unStyle(),this.$bar&&this.$bar.remove(),this.unbindEvents(),this.options.containerSelector?this.$container.removeClass(this.classes.container):this.$container.unwrap(),this.options.contentSelector||this.$content.unwrap(),this.$content.removeClass(this.classes.content),this.$element.data(j,null)}},c.fn[j]=function(a){if("string"!=typeof a)return this.each(function(){c(this).data(j)?c(this).data(j).update():c(this).data(j,new m(a,this))});var b=a,d=Array.prototype.slice.call(arguments,1);if(/^\_/.test(b))return!1;if(!/^(get)/.test(b))return this.each(function(){var a=c.data(this,j);a&&"function"==typeof a[b]&&a[b].apply(a,d)});var e=this.first().data(j);return e&&"function"==typeof e[b]?e[b].apply(e,d):this}}(window,document,jQuery,function(a){"use strict";return void 0===a.asScrollbar?!1:a.asScrollbar}(jQuery));

(function(document, window, $) {
      'use strict';
      
    	  $("input").iCheck({checkboxClass:"icheckbox_flat-grey",radioClass:"iradio_flat-grey"});
	   $("#menu").on("click",function(){
		   $(this).toggleClass("navbar-menubar-opne");
		   $("html").toggleClass("html-hidden")
		   })
	   var skinnum = 0; 
	   $(".page-skin-btn").on("click", function(){
		   if(skinnum == 4){
			$(".page-header").removeClass("page-skin-"+skinnum);
			skinnum = 0; 
			   }else{
			var nextnum = skinnum + 1;
			$(".page-header").removeClass("page-skin-"+skinnum).addClass("page-skin-"+nextnum);
			skinnum ++ ;
			   }
			});
	   // 阻止navbar下拉菜单冒泡
	   $(document).on('click', '.navbar-mega .dropdown-menu', function (e) {
	        e.stopPropagation();
	      });
	      
	   var ismesdel = false;
	   $('#myDropdown').on('shown.bs.dropdown', function () {
		   if(ismesdel) return false;
		   $.ajax({
	        	 url: _ctxPath+"/user/showMessage.htm",
			     dataType:"json",
			     success:function(result){
			    	  if(result.success){
			    		  var mesdata = result.data, meshtm ="";
			    		  for(var i=0; i<mesdata.length; i++){

			    			  var mestime = new Date(mesdata[i].createTime).format('yyyy-MM-dd hh:mm:ss');
			    			  
			    			  meshtm+='<a class="list-group-item"  href="'+_ctxPath +'/user/msgdetails.htm?messageId='+mesdata[i].messageId+'">'
			    				  					+'<div class="media"><div class="media-body"><h6 class="media-heading">'+mesdata[i].title+'</h6>'
			    				  					+'<time class="media-meta">'+mestime+'</time></div>'
		                        					+'<div class="media-right"><i class="icon fa-bell-slash-o" aria-hidden="true" title="标记已读"  messageId="'+mesdata[i].messageId+'"></i>'
		                        					+'</div></div></a>';
			    		  }
			    		  $("#messagebox >div >div").html(meshtm);
			    		  var item = $("#messagebox .list-group-item");
			   		   if(item.length > 4){
			   		   $("#messagebox").asScrollable({
			   			   responsive: false,
			   			    contentSelector: '>',
			   			    containerSelector: '>'
			   			  }); 
			   		   }
			   		ismesdel = true;
			    	  }else{
			    		  alert(result.message);
			    	  }
			    	
			    	  
			      }
		   });
		   
		   
		   
		 });
	   if($('#badgeup').length > 0){
		   $('#badgeup').addClass('wobble animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			      $(this).removeClass('wobble animated');
			    }); 
	   }
	  
	   
	   $("[data-message]").one("click",function(e){
		   e.preventDefault();
		   var mlist = $(".list-group-dividered"); 
		   $.ajax({
	        	 url: _ctxPath+"/user/updateStatus.htm",
			      data:{messageId:0},
			      dataType:"json",
			      beforeSend : function() {
	                	$(this).attr("disabled", true);
	                },
			      success:function(result){
			    	  $(this).attr("disabled", false);
			    	  if(result.success){
			    		  $("#messagebox").html('<h6 class="text-center">暂无新消息</h6>').asScrollable('disable').prev().remove();
			    		  $("#badgeup").addClass("bounceOut animated");
			    		  setTimeout(function(){
			    			  $("#badgeup").hide();
		      	    	  },700); 		 
			    		  if(mlist.length > 0 ){
			    			  mlist.prev().remove();
			    			  mlist.children().addClass("list-look").find(".label-danger, .btn").remove();
			    		  }
			    	  }else{
			    		  alert(result.message);
			    	  }
			    	
			    	  
			      }
		   });
	   });
	   
	   $(document).on('click', "[messageId]",function (e) {
	        e.preventDefault();
	        var mageid = $(this).attr("messageId"), mage = $(this).closest("a");
	        var asScroll = $("#messagebox").children();
	        var ismes = $(this).is("input");
	        $.ajax({
	        	 url: _ctxPath+"/user/updateStatus.htm",
			      data:{messageId:mageid},
			      dataType:"json",
			      success:function(result){
			    	  if(result.success){		
			    		  
			    		  if(ismes){
			    			  mage.addClass("list-look").find(".label-danger, .btn").remove(); 
			    		  }else{
			    			  /*
								 * asScroll.height(function(n,c){ return c - 69;
								 * });
								 */
				    		  $("#messagebox").asScrollable('destory');
				    		 mage.remove();
				    		 ismesdel = false;
			    		  }
			    		  
			    		  $(".mes-num").text(function(n,c){
			    			  if(c =="99+"){
			    				  return c;
			    			  }else{
			    				  if(c == "1"){
			    					  var mlist = $(".list-group-dividered"); 
			    					  $("#messagebox").html('<h6 class="text-center">暂无新消息</h6>').asScrollable('disable').prev().remove();
						    		  $("#badgeup").addClass("bounceOut animated");
						    		  setTimeout(function(){
						    			  $("#badgeup").hide();
					      	    	  },700); 		 
						    		  if(mlist.length > 0 ){
						    			  mlist.prev().remove();
						    			  mlist.children().addClass("list-look").find(".label-danger, .btn").remove();
						    		  }
			    				  }else{
			    					  $('#badgeup').addClass('bounce animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			    					      $(this).removeClass('bounce animated');
			    					    });
			    					  return parseInt(c) - 1;
			    				  }
			    			  }
			    		  });
			    		  
			    		 // mage.addClass("bounceOut animated");
			    		 

			    		  
			    	  }else{
			    		  alert(result.message);
			    	  }
			    	
			    	  
			      }
				  
			  });
	       
	        
	      });
	   
	   
	   

		
	   
    })(document, window, jQuery);


// 限制运费只能数字
function IsSubmit(e) {
    if(e.length > 0){
    	var $emal_val = $("input[name='email']").val();
    	var $price_val = $("input[name='price']").val();
    	var $freight_val = $("input[name='freight']").val();
    	var emalReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    	var numReg= /^\+?[1-9][0-9]*$/;
    	var i = 0, messages ="";
    	 if(emalReg.test($emal_val)){
    		i+=1;
    	 }else{
    		 messages ="您邮箱格式不正确，请输入正确的邮箱"
    	 }
    	 if(numReg.test($price_val)){
    		 i+=1;
    	 }else{
    		 messages ="货物价值只能输入数字";
    	 }
    	 if(numReg.test($freight_val)){
    		 i+=1;
    	 }else{
    		 messages ="运费只能输入数字";
    	 }
    	 if(i ==3 ){
    		 return true;
    	 }else{
    		// shake($("#error"), messages);
    		 setTimeout(function(){
 	              $("#error").removeClass("hidden").text(messages);
 	    	  },200); 
    	 }
    // return (i == 3) || false
    }else{
    	
    	return true;
    }
	
} 

// 错误提示动画
 function shake(selector, message){
	 if(selector.hasClass("hidden")){
		 selector.removeClass("hidden").text(message);
	 }else{
		 
	var length = 6;
	selector.css('position', 'relative').text(message);
    for (var i = 1; i <= length; i++)
    {
    	if (i % 2 == 0)
    	{
        	if (i == length)
        	{
        		selector.animate({ 'left': 0 }, 50);
        	}
        	else
        	{
        		selector.animate({ 'left': 10 }, 50);
        	}
    	}
    	else
    	{
    		selector.animate({ 'left': -10 }, 50);
    		// alert("2");
    	}
    }
    
	 }
}
 
 // 时间格式转换
 Date.prototype.format = function(format) {
     var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
     };
     if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
     }
     for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                   format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
     }
     return format;
}
 
 