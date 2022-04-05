window.theme=window.theme||{},theme.roarAdminJs=function(){var e=window!==window.parent&&0<=window.top.location.pathname.indexOf("/admin")&&0<=window.top.location.pathname.indexOf("/editor");function t(){$(top.document).find('.theme-setting a[href*="#roarJs-"]').each(function(){var e=$(this),t=e.attr("href"),n="https://#roarJs-";if(-1<t.indexOf(n)){var s=t.replace(n,"").split(":");switch(s[0]){case"check":!function(e,t){var n=t.split("|"),s=n[0],i="[settings]["+s+"]",a=JSON.parse(n[1]),o=e.closest(".theme-setting"),r=e.closest(".ui-accordion__panel").find('input[type="checkbox"][name$="'+i+'"]');if(r.length||(r=e.closest(".theme-editor__card").find('input[type="checkbox"][name$="'+i+'"]')),r.length||(i="settings["+s+"]",r=e.closest(".theme-editor__card").find('input[type="checkbox"][name$="'+i+'"]')),!r.length)return;var h=r.closest(".theme-setting"),d=h.parent();d.hasClass("theme-setting--wrapper")||(h.wrap('<div class="theme-setting--wrapper theme-setting--check"></div>'),(d=h.parent()).append('<div class="theme-setting--true"></div><div class="theme-setting--false"></div>'),r.is(":checked")?d.removeClass("theme-setting--off").addClass("theme-setting--on"):d.removeClass("theme-setting--on").addClass("theme-setting--off"));var m=d.find(".theme-setting--true"),p=d.find(".theme-setting--false");1==a?m.append(o):p.append(o),e.remove(),r.off("change"),r.on("change",function(){r.is(":checked")?d.removeClass("theme-setting--off").addClass("theme-setting--on"):d.removeClass("theme-setting--on").addClass("theme-setting--off")}),r.on("change",function(){r.is(":checked")==a?o.show():o.hide()})}(e,s[1]);break;case"group":!function(e,t){var n=JSON.parse(t),s=".theme-setting",i=e.closest(s);if(i.hasClass("theme-setting--header")){var a=i.next(s);if(a.length||(s=".next-card__section",a=i.next(s)),!a.length)return;var o=i.parent();o.hasClass("theme-setting--wrapper")||(i.wrap('<div class="theme-setting--wrapper theme-setting--group"></div>'),o=i.parent(),1==n?o.removeClass("theme-setting--on").addClass("theme-setting--off"):o.removeClass("theme-setting--off").addClass("theme-setting--on"));var r=$('<div class="theme-setting--inner"></div>');o.append(r);for(var h=0;h<100&&(a&&!a.hasClass("theme-setting--header"));h++){var d=a.next(s);a.appendTo(r),a=d}e.remove(),i.off("click"),i.on("click",function(){o.hasClass("theme-setting--off")?o.removeClass("theme-setting--off").addClass("theme-setting--on"):o.removeClass("theme-setting--on").addClass("theme-setting--off")})}}(e,s[1]);break;case"image":!function(e,t){var n=t.split("|"),s=n[0],i="[settings]["+s+"]",a=JSON.parse(n[1]),o=e.closest(".theme-setting"),r=e.closest(".ui-accordion__panel").find('input[type="hidden"][name$="'+i+'"]');if(r.length||(r=e.closest(".theme-editor__card").find('input[type="hidden"][name$="'+i+'"]')),r.length||(i="settings["+s+"]",r=e.closest(".theme-editor__card").find('input[type="hidden"][name$="'+i+'"]')),!r.length)return;var h=r.closest(".theme-setting"),d=h.parent();d.hasClass("theme-setting--wrapper")||(h.wrap('<div class="theme-setting--wrapper theme-setting--image"></div>'),(d=h.parent()).append('<div class="theme-setting--true"></div><div class="theme-setting--false"></div>'),""==r.val()?d.removeClass("theme-setting--on").addClass("theme-setting--off"):d.removeClass("theme-setting--off").addClass("theme-setting--on"));var m=d.find(".theme-setting--true"),p=d.find(".theme-setting--false");1==a?m.append(o):p.append(o),e.remove();var l=r.closest(".theme-setting").find(".js-image-picker-remove-button");l.off("click"),l.on("click",function(e){d.removeClass("theme-setting--on").addClass("theme-setting--off")}),$(top.document).find("#image_picker_overlay .js-btn-primary").on("click",function(e){""==r.val()?d.removeClass("theme-setting--on").addClass("theme-setting--off"):d.removeClass("theme-setting--off").addClass("theme-setting--on")})}(e,s[1])}}})}return{init:function(){e&&($("html").addClass("theme-editor"),function(){var e=$(top.document);e.find("#roar-admin-stylesheet").length||e.find("head").first().append('<style id="roar-admin-stylesheet" type="text/css">.theme-setting--wrapper{position:relative}.theme-setting--wrapper:before{content:"";position:absolute;top:0;left:0;bottom:0;border-left:3px solid #5c6ac4;border-radius:50px 0 0 50px}.theme-setting--wrapper .theme-setting--wrapper:before{display:none}.next-card__section .theme-setting--wrapper:before,.theme-editor-action-list .theme-setting--wrapper:before{left:-20px}.theme-setting--inner{margin-top:15px}.theme-setting--group .next-card__header{padding-bottom:20px}.theme-setting--group .next-card__header+.theme-setting--inner{margin-top:0}.theme-setting--group .next-card__header+.theme-setting--inner .next-card__section{padding-top:0}.theme-setting--group .theme-setting--header .ui-subheading{position:relative;cursor:pointer}.theme-setting--group.theme-setting--off .next-card__header{padding-bottom:1.6rem}.theme-setting--group>.theme-setting--inner{display:none}.theme-setting--on>.theme-setting--inner{display:block}.theme-setting--group .theme-setting--header .ui-subheading:after{content:"";position:absolute;right:0;top:50%;margin-top:-3px;border-left:3px solid transparent;border-right:3px solid transparent;border-top:6px solid}.theme-setting--group.theme-setting--on .theme-setting--header .ui-subheading:after{transform:rotate(180deg)}.theme-editor-action-list .theme-setting--group{margin:40px 0 20px}.theme-editor-action-list .theme-setting--group:after{content:"";position:absolute;top:-20px;left:-20px;right:-20px;border-top:1px solid #ebeef0}.theme-setting--off>.theme-setting--true{display:none}.theme-setting--off>.theme-setting--false{display:block}.theme-setting--on>.theme-setting--true{display:block}.theme-setting--on>.theme-setting--false{display:none}</style>')}(),function(){var e=$(top.document).find(".te-panel__footer .ui-action-list").first();0==e.find("li .roaradmin-theme_help").length&&(e.prepend('<li class="theme-editor-action-list__item--separator"></li>'),e.prepend('<li class="ui-action-list__item"><a href="https://roartheme.ticksy.com/" class="ui-action-list-action roaradmin-theme_help" rel="noopener noreferrer" target="_blank"><span class="ui-action-list-action__text">Expert theme help</span></a></li>'))}(),t())},refresh:function(){e&&t()}}}(),theme.roarAdminJs.init();