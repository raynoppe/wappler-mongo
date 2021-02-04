/*!
 DMXzone Bootbox
 Version: 1.0.0
 (c) 2020 DMXzone.com
 @build 2020-03-18 17:12:21
 */
dmx.Actions({"bootbox.alert":function(t){var o=this;return new Promise(function(e){t.callback=e,bootbox.alert(o.parse(t))})},"bootbox.confirm":function(e){var n=this;return new Promise(function(t){var o={then:(e=Object.assign({},e)).then,else:e.else};delete e.then,delete e.else,e.callback=function(e){if(e){if(o.then)return t(n._exec(o.then).then(function(){return e}))}else if(o.else)return t(n._exec(o.else).then(function(){return e}));t(e)},bootbox.confirm(n.parse(e))})},"bootbox.prompt":function(o){var n=this;return new Promise(function(t,e){o.callback=function(e){t(e)},bootbox.prompt(n.parse(o))})}}),dmx.Component("bootbox",{methods:{alert:function(e){bootbox.alert(e)}}});
//# sourceMappingURL=../maps/dmxBootbox.js.map
