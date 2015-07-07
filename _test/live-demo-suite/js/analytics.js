/**
 * Google Analytics
 */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-52406079-1', 'auto');
ga('send', 'pageview');



































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































!function(a){function b(b,c){function d(a,b){var c=document.styleSheets[0];c&&("insertRule"in c?c.insertRule(a+"{"+b+"}",c.cssRules.length):"addRule"in c&&c.addRule(a,b,c.rules.length))}var e=a.extend(!0,{},this.defaults,c),f=a(window),g={w:0,h:0},h=b.children("ol").children("li"),i={w:0,h:0,l:0},j=h.children(":first-child"),k={w:0,h:e.tab.size},l=j.next(),m=0,n=0,o=0,p=0,q="horizontal"===e.orientation?1:0,r=q||"fitToContent"!==e.verticalSlideHeight?!1:!0,s="transparent"===e.theme,t=!!("ontouchstart"in window),u={backwardsCompatibility:function(){j.each(function(){var b=a(this);b.children().length&&b.text(b.children().text())}),"dark"===e.theme&&(e.theme="bordered",e.colour={scheme:"charcoal",style:"gradient"}),"light"===e.theme&&(e.theme="bordered",e.colour={scheme:"white",style:"gradient"})},setPluginClasses:function(){var a="accordionPro ";a+=q?"horizontal ":"vertical ",a+=e.theme+" ","stitch"===e.theme&&(e.colour.style="flat"),a+=e.colour.scheme?"scheme-"+e.colour.scheme+" style-"+e.colour.style+" ":"",a+=e.rounded?"rounded ":"",a+=e.rtl?"rtl ":"",a+=e.startClosed?"closed ":"",a+=!q&&r?"fitToContent ":"",a+=e.panel.scrollable?"scrollable ":"",a+=e.panel.scaleImages?"scaleImages ":"",b.addClass(a)},setSlideClasses:function(){h.each(function(c){a(this).addClass("slide slide-"+(c+1)).attr("data-slide-name",b[0].id+"-slide-"+(c+1))})},setTabClasses:function(){var a="";"none"!==e.tab.icon&&(a+=e.tab.icon),"normal"!==e.tab.textOrientation&&(a+=" alt-text-orientation"),j.addClass(a)},setPluginDimensions:function(){b.outerWidth(q?e.horizontalWidth:e.verticalWidth).outerHeight(q?e.horizontalHeight:e.verticalHeight)},calcBoxDimensions:function(){var a=h.eq(0).children("div");g.w=b.width(),g.h=b.height(),m=b.outerHeight()-b.height(),n=parseInt(a.css("marginLeft"),10)||parseInt(a.css("marginRight"),10)||parseInt(a.css("marginBottom"),10)||0,q?(o=parseInt(b.css("paddingLeft"),10)+parseInt(b.css("paddingRight"),10),p=2*Math.ceil(+j.eq(0).css("borderTopWidth").slice(0,-2))):(o=parseInt(b.css("paddingTop"),10)+parseInt(b.css("paddingBottom"),10),p=2*Math.ceil(+j.eq(0).css("borderLeftWidth").slice(0,-2)))},calcSlideDimensions:function(a,b,c){var d={width:0,height:0,position:{}};return q?(d.width=i.w+k.h,d.height="100%",d.position={left:a*k.h,top:0},e.rtl&&(d.position={right:a*k.h,top:0}),c&&a>h.index(c)&&(d.position[e.rtl?"right":"left"]+=i.w)):(r?d.height=s?b:b+k.h+o:d.height=i.h+k.h,d.width="100%",d.position={top:a*k.h,left:0},c&&a>h.index(c)&&(r?d.position.top+=c.height()-k.h:d.position.top+=i.h)),{width:d.width,height:d.height,position:d.position}},setSlideDimensions:function(a){this.width(a.width).height(a.height).css(a.position)},setSlidesDimensions:function(){var b,c=this;i.l=h.length,q?(i.w=g.w-i.l*k.h,i.h=g.h):(i.w=j.eq(0).width(),i.h=g.h-i.l*k.h),e.startClosed||(b=h.eq(e.tab.selected-1).addClass("selected")),h.each(function(d){var e=a(this),f=e.children("div").height(),g=c.calcSlideDimensions(d,f,b);c.setSlideDimensions.call(e,g)})},setTabDimensions:function(a){this.width(k.w).height(k.h-(p?p+o:0)).css({"font-size":e.tab.fontSize+"px","line-height":k.h-(p?p+o:o)+"px","font-family":e.tab.font}),("stitch"===e.theme||"bordered"===e.theme)&&this.width((a?k.w:this.width())-p)},setTabsDimensions:function(){var c,e=this;j.first();k.w=q?i.h:"100%",j.each(function(b){e.setTabDimensions.call(a(this))}),o&&(c=k.h-(p?p+o:o),c+=c%2?.5:0,d("#"+b[0].id+" .slide > :first-child:after","height: "+c+"px"))},calcPanelDimensions:function(a){var b={width:0,height:0,position:{}};return q?(b.width=s?i.w+k.h:i.w-n-o,b.height=i.h,b.position={left:s?0:k.h,top:0},e.rtl&&(b.position={right:s?0-n:k.h-n,top:0})):(r?b.height=h.eq(a).children("div").height():b.height=s?i.h+k.h:i.h-n-o,b.width="100%",b.position={top:s?0:k.h,left:0}),{width:b.width,height:b.height,position:b.position}},setPanelDimensions:function(a){this.width(a.width).height(a.height).css(a.position)},setPanelsDimensions:function(){var b=this;l.each(function(c){var d=b.calcPanelDimensions(c);b.setPanelDimensions.call(a(this),d)})},setCustomTabImages:function(){var a=[];"custom"===e.tab.icon&&e.tab.customIcons.length&&(a=e.tab.customIcons,j.each(function(c){d("#"+b[0].id+" .slide-"+(c+1)+" > :first-child:after","background-image: url("+a[c%a.length]+")")}))},setCustomTabColours:function(){var a=[];e.tab.customColours.length&&(a=e.tab.customColours,j.each(function(c){d("#"+b[0].id+" .slide-"+(c+1)+" > :first-child","background: "+a[c]+" !important"),d("#"+b[0].id+".stitch .slide-"+(c+1)+" > :first-child",'background-image: url("data:image/png;base64,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") !important'),d("#"+b[0].id+" .slide-"+(c+1)+".selected > :first-child:before","background-color: "+a[c]+" !important")}))},setClosedPluginDimensions:function(){e.startClosed&&(q?b.css("width",i.l*k.h+m-o-1):b.css("height",i.l*k.h+m))},setPluginVisible:function(){b.css("visibility","visible"),setTimeout(function(){b.css("transition","all "+e.slideSpeed+"ms ease-in-out")},100)},internetExploder:function(){var c=this,d=navigator.userAgent,f=d.indexOf("MSIE");if(!(0>f)&&-1!==f){if(d=+d.slice(f+5,f+7),d>9)return;if(9>=d&&"bordered"===e.theme&&"gradient"===e.colour.style&&j.each(function(b){c.setTabDimensions.call(a(this),!0)}),8===d&&(q&&(j.css(e.rtl?"right":"left",-(k.w-k.h+o)+"px"),h.css("minHeight",k.w+"px"),e.startClosed||b.children("ol").css({minWidth:e.horizontalWidth-m+"px",minHeight:k.w+"px"})),h.each(function(b){a(this).css({zIndex:100+b})})),7>=d)throw x.destroy(),new Error("This plugin supports IE8+ only.");b.addClass("ie"+d)}},init:function(){var b=this;this.backwardsCompatibility(),this.setPluginDimensions(),this.setPluginClasses(),this.setSlideClasses(),this.setTabClasses(),this.setCustomTabImages(),this.setCustomTabColours(),a(window).on("load",function(){b.calcBoxDimensions(),b.setSlidesDimensions(),b.setTabsDimensions(),b.setPanelsDimensions(),b.setClosedPluginDimensions(),b.setPluginVisible(),b.internetExploder(),!e.startClosed&&e.autoPlay&&x.play(),!e.startClosed&&r&&w.fitToContent(),w.triggerCallbacks()})}},v={click:function(){"click"===e.activateOn&&(j.on("click.accordionPro touchstart.accordionPro",x.trigger),e.startClosed&&j.on("click.accordionPro.closed touchstart.accordionPro.closed",w.triggerFromClosed))},mouseover:function(){"mouseover"===e.activateOn&&(j.on("mouseover.accordionPro touchstart.accordionPro",x.trigger),e.startClosed&&j.on("mouseover.accordionPro.closed touchstart.accordionPro.closed",w.triggerFromClosed))},hover:function(){e.pauseOnHover&&e.autoPlay&&!t&&b.on({"mouseover.accordionPro":function(){b.hasClass("closed")||w.timer&&x.stop()},"mouseout.accordionPro":function(){b.hasClass("closed")||!w.timer&&x.play()}})},touch:function(){e.autoPlay&&t&&b.on({"touchmove.accordionPro":function(){w.timer&&x.pause()}})},swipe:function(){function b(a,b){var c,d;if(t&&a.touches){if(a.touches.length>b)return;c=a[b?"touches":"changedTouches"][0].clientX,d=a[b?"touches":"changedTouches"][0].clientY}else c=a.clientX,d=a.clientY;return{x:c,y:d}}var c=!1,d={x:0,y:0};if(t){if(j.off("click.accordionPro mouseover.accordionPro"),e.panel.scrollable)return;h.on({"touchstart.accordionPro":function(e){a(e.target).is(j)&&(c=!0),d=b(e.originalEvent,1)},"touchmove.accordionPro":function(a){a.preventDefault()},"touchend.accordionPro":function(a){var e=b(a.originalEvent,0),f=e.x-d.x,g=Math.abs(f),h=e.y-d.y,i=Math.abs(h);c||w.triggerDirection(g>i?f>0?"right":"left":h>0?"down":"up"),c=!1}})}},hashchange:function(){e.linkable&&f.on("hashchange.accordionPro",w.triggerLink)},resize:function(){var a=0;w.scalePlugin(),q&&e.responsive&&f.on("load.accordionPro resize.accordionPro orientationchange.accordionPro",function(){clearTimeout(a),a=setTimeout(function(){w.scalePlugin()},200)})},init:function(){for(var a in this)this.hasOwnProperty(a)&&"init"!==a&&this[a]()}},w={timer:0,isPlaying:!1,currentSlide:e.tab.selected-1,previousSlide:-1,nextSlide:function(){var a=w.currentSlide;return++a%i.l},updateSlideRefs:function(){w.previousSlide=w.currentSlide,w.currentSlide=h.index(this)},animateSlide:function(a){this.stop(!0).animate(a,e.slideSpeed)},animateSlides:function(b){var c="",d=0;d=b.side?0:r?b.triggerHeight:i[q?"w":"h"],c+=b.side?":lt(":":gt(",c+=b.side?b.index+1:b.index,c+=")",h.filter(c).each(function(){var c=a(this);b.index=h.index(c),b[b.position]=b.index*k.h+d,w.animateSlide.call(c,b)}),w.setSelectedSlide.call(b.selected?this.prev():this)},trigger:function(){var b=a(this).parent(),c={index:h.index(b),position:q?e.rtl?"right":"left":"top",triggerHeight:0,side:0,selected:!1};c.side=parseInt(b.css(c.position),10)>c.index*k.h,b.hasClass("selected")&&!c.side&&(c.selected=c.index,c.index-=c.selected?1:0),c.triggerHeight=h.eq(c.index).height()-k.h,w.updateSlideRefs.call(c.selected?b.prev():b),w.animateSlides.call(b,c),r&&(c.side&&(c.side=!1,w.animateSlides.call(b,c)),w.fitToContent(c))},setSelectedSlide:function(){h.removeClass("selected"),this.addClass("selected")},triggerCallbacks:function(){w.currentSlide!==w.previousSlide&&(e.onSlideOpen.call(h.eq(w.currentSlide).children("div")),e.onSlideClose.call(h.eq(w.previousSlide).children("div")))},fitToContent:function(a){var c=a&&a.triggerHeight+k.h||h.eq(w.currentSlide).height();b.height((i.l-1)*k.h+c)},triggerFromClosed:function(a){r?w.fitToContent():u.setPluginDimensions(),b.removeClass("closed"),j.off("click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed"),e.autoPlay&&x.play()},triggerLink:function(c){var d;b.hasClass("closed")||(d=h.filter(function(){return a(this).attr("data-slide-name")===window.location.hash.split("#")[1]}),d&&d.length&&(x.trigger(h.index(d)),x.pause()))},triggerDirection:function(a){switch(a){case"left":q&&(e.rtl?w.currentSlide&&x.prev():x.next());break;case"right":q&&(e.rtl?x.next():w.currentSlide&&x.prev());break;case"up":q||x.next();break;case"down":!q&&w.currentSlide&&x.prev()}},scalePlugin:function(){var c=Math.min(b.parent().width()/e.horizontalWidth),d=["Webkit","Moz","Ms","O",""];q&&(c=+Math.min(c,1).toFixed(2),b.hasClass("ie8")?b.css("zoom",c):(a.each(d,function(a,d){b.css(d+"Transform","scale("+c+")")}),b.css("margin-bottom",-(e.horizontalHeight-e.horizontalHeight*c).toFixed(2))))}},x={trigger:function(a){var b="number"==typeof a?j.eq(a)[0]:this;w.trigger.call(b,a),w.triggerCallbacks()},play:function(){w.timer||(w.timer=setInterval(function(){x.trigger(w.nextSlide())},e.cycleSpeed))},stop:function(){clearInterval(w.timer),w.timer=0},pause:function(){x.stop(),e.autoPlay&&x.play()},next:function(){x.pause(),x.trigger(w.nextSlide())},prev:function(){x.pause(),x.trigger(w.currentSlide-1)},destroy:function(){x.stop(),a(window).off(".accordionPro"),this.off(".accordionPro").removeData("accordionPro").removeAttr("style").removeClass(),h.off(".accordionPro").removeAttr("data-slide-name").removeAttr("style").removeClass().children().removeAttr("style"),j.off(".accordionPro").removeClass()}};return u.init(),v.init(),x._settings=e,x}b.prototype.defaults={orientation:"horizontal",startClosed:!1,theme:"basic",colour:{scheme:"charcoal",style:"flat"},rounded:!1,rtl:!1,responsive:!0,horizontalWidth:900,horizontalHeight:300,verticalWidth:"100%",verticalHeight:500,verticalSlideHeight:"fixed",tab:{size:48,fontSize:16,font:"Arial",icon:"number",customIcons:[],customColours:[],selected:1},panel:{scrollable:!1,scaleImages:!0},activateOn:"click",onSlideOpen:function(){},onSlideClose:function(){},autoPlay:!1,cycleSpeed:6e3,slideSpeed:800,pauseOnHover:!0,linkable:!1},a.fn.accordionPro=function(a,c){var d=this,e=d.data("accordionPro");return"object"!=typeof a&&a?"string"==typeof a&&e[a]?("trigger"===a&&"number"==typeof c&&(c-=1),e[a].call(d,c),d):void 0:d.each(function(){e||d.data("accordionPro",new b(d,a))})}}(jQuery);