/**
 * @author Jason Roy for CompareNetworks Inc.
 *
 * Verision 0.1, improvements to be made.
 * Copyright (c) 2008 CompareNetworks Inc.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($){var f={};var g={};var h={};var j=[];jQuery.fn.jBreadCrumb=function(a){f=$.extend({},$.fn.jBreadCrumb.defaults,a);return this.each(function(){g=$(this);setupBreadCrumb()})};function setupBreadCrumb(){h=jQuery(g).find('li');jQuery(g).find('ul').wrap('<div style="overflow:hidden; position:relative;  width: '+jQuery(g).css("width")+';"><div>');jQuery(g).find('ul').width(5000);if(h.length>0){jQuery(h[h.length-1]).addClass('last');jQuery(h[0]).addClass('first');if(h.length>f.minimumCompressionElements){compressBreadCrumb()}}};function compressBreadCrumb(){var c=jQuery(h[h.length-1]);if(jQuery(c).width()>f.maxFinalElementLength){if(f.beginingElementsToLeaveOpen>0){f.beginingElementsToLeaveOpen--}if(f.endElementsToLeaveOpen>0){f.endElementsToLeaveOpen--}}if(jQuery(c).width()<f.maxFinalElementLength&&jQuery(c).width()>f.minFinalElementLength){if(f.beginingElementsToLeaveOpen>0){f.beginingElementsToLeaveOpen--}}var d=h.length-1-f.endElementsToLeaveOpen;jQuery(h[h.length-1]).css({background:'none'});$(h).each(function(i,a){if(i>f.beginingElementsToLeaveOpen&&i<d){jQuery(a).find('a').wrap('<span></span>').width(jQuery(a).find('a').width()+10);jQuery(a).append(jQuery(f.overlayClass+'.main').clone().removeClass('main').css({display:'block'})).css({background:'none'});if(isIE6OrLess()){fixPNG(jQuery(a).find(f.overlayClass).css({width:'20px',right:"-1px"}))}var b={id:i,width:jQuery(a).width(),listElement:jQuery(a).find('span'),isAnimating:false,element:jQuery(a).find('span')};jQuery(a).bind('mouseover',b,expandBreadCrumb).bind('mouseout',b,shrinkBreadCrumb);jQuery(a).find('a').unbind('mouseover',expandBreadCrumb).unbind('mouseout',shrinkBreadCrumb);a.autoInterval=setInterval(function(){clearInterval(a.autoInterval);jQuery(a).find('span').animate({width:f.previewWidth},f.timeInitialCollapse,f.easing)},(150*(i-2)))}})};function expandBreadCrumb(e){var a=e.data.id;var b=e.data.width;jQuery(e.data.element).stop();jQuery(e.data.element).animate({width:b},{duration:f.timeExpansionAnimation,easing:f.easing,queue:false});return false};function shrinkBreadCrumb(e){var a=e.data.id;jQuery(e.data.element).stop();jQuery(e.data.element).animate({width:f.previewWidth},{duration:f.timeCompressionAnimation,easing:f.easing,queue:false});return false};function isIE6OrLess(){var a=$.browser.msie&&/MSIE\s(5\.5|6\.)/.test(navigator.userAgent);return a};function fixPNG(a){var b;if(jQuery(a).is('img')){b=jQuery(a).attr('src')}else{b=$(a).css('backgroundImage');b.match(/^url\(["']?(.*\.png)["']?\)$/i);b=RegExp.$1}$(a).css({'backgroundImage':'none','filter':"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='"+b+"')"})};jQuery.fn.jBreadCrumb.defaults={maxFinalElementLength:400,minFinalElementLength:200,minimumCompressionElements:4,endElementsToLeaveOpen:1,beginingElementsToLeaveOpen:1,minElementsToCollapse:4,timeExpansionAnimation:800,timeCompressionAnimation:500,timeInitialCollapse:600,easing:'easeOutQuad',overlayClass:'.chevronOverlay',previewWidth:5}})(jQuery);