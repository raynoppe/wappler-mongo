/*!
 DMXzone Bootstrap 4 Toasts
 Version: 1.0.1
 (c) 2020 DMXzone.com
 @build 2020-03-26 11:34:20
 */
dmx.bs4toast={defaults:{iconType:"image",position:"top",align:"right","offset-x":15,"offset-y":15,"z-index":1e4,"min-width":240,"max-width":350,animation:!0,autohide:!0,closable:!0,delay:5e3},container:null,setup:function(t){t=Object.assign(dmx.bs4toast.defaults,t),dmx.bs4toast.container||(dmx.bs4toast.container=document.createElement("div"),document.body.appendChild(dmx.bs4toast.container));var e=dmx.bs4toast.container;e.style.removeProperty("top"),e.style.removeProperty("left"),e.style.removeProperty("right"),e.style.removeProperty("bottom"),e.style.removeProperty("max-width"),e.style.setProperty("position","fixed"),e.style.setProperty("z-index",t["z-index"]),e.style.setProperty(t.align,t["offset-x"]+"px"),e.style.setProperty(t.position,t["offset-y"]+"px"),t["max-width"]&&e.style.setProperty("max-width",t["max-width"]+"px")},clear:function(){dmx.bs4toast.container&&(dmx.bs4toast.container.textContent="")},show:function(t){t=Object.assign({},dmx.bs4toast.defaults,t),dmx.bs4toast.container||dmx.bs4toast.setup();var e=dmx.bs4toast.create(t);dmx.bs4toast.container.appendChild(e),$(e).toast(t).toast("show").on("hidden.bs.toast",function(){dmx.bs4toast.container.removeChild(e)})},create:function(t){var e='<div class="toast"'+(t["min-width"]?' style="min-width: '+t["min-width"]+'px"':"")+' role="alert" aria-liva="assertive" aria-atomic="true" data-delay="'+(t.delay||this.props.delay)+'">';if(t.icon||t.title||t.subtitle||t.closable){if(e+='<div class="toast-header">',t.icon)switch(t.iconType){case"fontawesome":e+='<i class="'+t.icon+' mr-2"></i>';break;default:e+='<img src="'+t.icon+'" height="20" class="rounded mr-2" alt="'+(t.alt||"")+'">'}e+='<strong class="mr-auto">'+(t.title||"")+"</strong>",t.subtitle&&(e+='<small class="text-muted">'+t.subtitle+"</small>"),t.closable&&(e+='<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">',e+='<span aria-hidden="true">&times;</span>',e+="</button>"),e+="</div>"}e+='<div class="toast-body">'+(t.message||"")+"</div>",e+="</div>";var s=document.createElement("div");return s.innerHTML=e,s.firstChild}},dmx.Actions({"toast.setup":function(t){dmx.bs4toast.setup(this.parse(t))},"toast.show":function(t){dmx.bs4toast.show(this.parse(t))},"toast.clear":function(){dmx.bs4toast.clear()}}),dmx.Component("bs4-toasts",{attributes:{position:{type:String,default:"top"},align:{type:String,default:"right"},"offset-x":{type:Number,default:15},"offset-y":{type:Number,default:15},"min-width":{type:Number,default:240},"max-width":{type:Number,default:350},"z-index":{type:Number,default:1e4},delay:{type:Number,default:5e3}},methods:{clear:function(){this.clear()},show:function(t){this.show(t)}},render:function(t){this.update({})},update:function(t){dmx.equal(t,this.props)||dmx.bs4toast.setup(this.props)},clear:function(){dmx.bs4toast.clear()},show:function(t){dmx.bs4toast.show(t)}});
//# sourceMappingURL=../maps/dmxBootstrap4Toasts.js.map