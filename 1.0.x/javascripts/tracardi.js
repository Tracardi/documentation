!function(e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).tracardi=e()}(function(){return function n(o,i,a){function c(t,e){if(!i[t]){if(!o[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(d)return d(t,!0);throw(r=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",r}r=i[t]={exports:{}},o[t][0].call(r.exports,function(e){return c(o[t][1][e]||e)},r,r.exports,n,o,i,a)}return i[t].exports}for(var d="function"==typeof require&&require,e=0;e<a.length;e++)c(a[e]);return c}({1:[function(e,t,r){"use strict";!function(e){e=e||window;var r=[],n=!1,o=!1;function i(){if(!n){n=!0;for(var e=0;e<r.length;e++)r[e].fn.call(window,r[e].ctx);r=[]}}function a(){"complete"===document.readyState&&i()}e.documentReady=function(e,t){if("function"!=typeof e)throw new TypeError("callback for documentReady(fn) must be a function");n?setTimeout(function(){e(t)},1):(r.push({fn:e,ctx:t}),"complete"===document.readyState||!document.attachEvent&&"interactive"===document.readyState?setTimeout(i,1):o||(document.addEventListener?(document.addEventListener("DOMContentLoaded",i,!1),window.addEventListener("load",i,!1)):(document.attachEvent("onreadystatechange",a),window.attachEvent("onload",i)),o=!0))}}(window);var n=[];window.tracker||(window.tracker={}),window.response||(window.response={context:{}}),window.onTracardiReady={bind:function(e){"function"==typeof e&&n.push(e)},call:function(t){n.forEach(function(e){e(t)})}},function(){for(var r=[],n="liliput.min.js",e=["track"],t=0;t<e.length;t++){var o=e[t];window.tracker[o]=function(t){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(t),r.push(e),window.tracker}}(o)}function i(){if(console.debug("[Loader] Rerun callbacks."),void 0!==window.tracardi.default)if(window.tracardi.default.getState().plugins.tracardi.initialized)for(window.tracker=window.tracardi.default;0<r.length;){var e=r.shift(),t=e.shift();tracker[t]&&tracker[t].apply(tracker,e)}else console.error("[Loader] Callbacks stopped. Tracker not initialized.");else console.error("[Loader] Callbacks stopped. Tracker not initialized. Is script url correct?")}documentReady(function(){var e,t,r;"1"!==navigator.doNotTrack||!0!==(null===(e=options)||void 0===e||null===(t=e.tracker)||void 0===t||null===(r=t.settings)||void 0===r?void 0:r.respectDoNotTrack)?((t=document.createElement("script")).type="text/javascript",t.async=!0,options.context={gpu:function(){var e,t,r=document.createElement("canvas"),n=null;try{if(e=r.getContext("webgl",{powerPreference:"high-performance"})||r.getContext("experimental-webgl",{powerPreference:"high-performance"})){var o=e.getExtension("WEBGL_debug_renderer_info");if(o)return t=e.getParameter(o.UNMASKED_VENDOR_WEBGL),n=navigator.userAgent.includes("Firefox")?e.getParameter(e.RENDERER):e.getParameter(o.UNMASKED_RENDERER_WEBGL),{vendor:{id:o.UNMASKED_VENDOR_WEBGL,name:t},renderer:{id:o.UNMASKED_RENDERER_WEBGL,renderer:n}}}}catch(e){}return null}()},void 0!==options.tracker||void 0!==options.tracker.url||void 0!==options.tracker.url.script?(null!==options.tracker.url.script?options.tracker.url.script.startsWith("http")||options.tracker.url.script.startsWith("//")?t.src=options.tracker.url.script+"/"+n:t.src=options.tracker.url.script:t.src=n,console.debug("[Loader] Loading: "+t.src),t.addEventListener?t.addEventListener("load",function(e){i()},!1):t.onreadystatechange=function(){"complete"!==this.readyState&&"loaded"!==this.readyState||i(window.event)},(r=document.getElementsByTagName("script")[0]).parentNode.insertBefore(t,r)):console.error("[Loader] Undefined options.tracker.url.script. This url defines location of tracker code.")):console.log("We are respecting do not track setting. Tracardi disabled.")})}()},{}]},{},[1])(1)});

var options = {
        tracker: {
            url: {
                script: '//8504a.tracardi.com/tracker',
                api: '//8504a.tracardi.com'
            },
            source: {
                id: "1ffc4c63-0dc4-4d15-b2f1-1679c15f630d"
            },
            context: {
				browser: true,
				page: true,
				session: true,
				storage:true,
				screen: true,
				performance: false,
				location: true,
                utm: true,
                tracardiPass: true
			},
        }
    }

 window.tracker.track("page-view", {});