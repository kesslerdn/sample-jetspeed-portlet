
dojo.provide("dojo.widget.Toaster");
dojo.require("dojo.widget.*");
dojo.require("dojo.lfx.*");
dojo.require("dojo.html.iframe");
dojo.widget.defineWidget(
"dojo.widget.Toaster",
dojo.widget.HtmlWidget,
{templateString: '<div dojoAttachPoint="clipNode"><div dojoAttachPoint="containerNode" dojoAttachEvent="onClick:onSelect"><div dojoAttachPoint="contentNode"></div></div></div>',
templateCssPath: dojo.uri.dojoUri("src/widget/templates/Toaster.css"),
messageTopic: "",
messageTypes: {MESSAGE: "MESSAGE",
WARNING: "WARNING",
ERROR: "ERROR",
FATAL: "FATAL"
defaultType: "MESSAGE",
clipCssClass: "dojoToasterClip",
containerCssClass: "dojoToasterContainer",
contentCssClass: "dojoToasterContent",
messageCssClass: "dojoToasterMessage",
warningCssClass: "dojoToasterWarning",
errorCssClass: "dojoToasterError",
fatalCssClass: "dojoToasterFatal",
positionDirection: "br-up",
positionDirectionTypes: ["br-up", "br-left", "bl-up", "bl-right", "tr-down", "tr-left", "tl-down", "tl-right"],
showDelay: 2000,
postCreate: function(){this.hide();
dojo.html.setClass(this.clipNode, this.clipCssClass);
dojo.html.addClass(this.containerNode, this.containerCssClass);
dojo.html.setClass(this.contentNode, this.contentCssClass);
if(this.messageTopic){dojo.event.topic.subscribe(this.messageTopic, this, "_handleMessage");
if(!this.positionDirection || !dojo.lang.inArray(this.positionDirectionTypes, this.positionDirection)){this.positionDirection = this.positionDirectionTypes.BRU;
_handleMessage: function(msg){if(dojo.lang.isString(msg)){this.setContent(msg);
setContent: function(msg, messageType, delay){var delay = delay||this.showDelay;
if(this.slideAnim && this.slideAnim.status() == "playing"){dojo.lang.setTimeout(50, dojo.lang.hitch(this, function(){this.setContent(msg, messageType);
return;
if(this.fadeAnim) this.fadeAnim.stop();
if(!msg){dojo.debug(this.widgetId + ".setContent() incoming content was null, ignoring.");
return;
if(!this.positionDirection || !dojo.lang.inArray(this.positionDirectionTypes, this.positionDirection)){dojo.raise(this.widgetId + ".positionDirection is an invalid value: " + this.positionDirection);
dojo.html.removeClass(this.containerNode, this.messageCssClass);
dojo.html.removeClass(this.containerNode, this.warningCssClass);
dojo.html.removeClass(this.containerNode, this.errorCssClass);
dojo.html.removeClass(this.containerNode, this.fatalCssClass);
dojo.html.clearOpacity(this.containerNode);
if(msg instanceof String || typeof msg == "string"){this.contentNode.innerHTML = msg;
switch(messageType){case this.messageTypes.WARNING:
dojo.html.addClass(this.containerNode, this.warningCssClass);
break;
case this.messageTypes.ERROR:
dojo.html.addClass(this.containerNode, this.errorCssClass);
break
case this.messageTypes.FATAL:
dojo.html.addClass(this.containerNode, this.fatalCssClass);
break;
case this.messageTypes.MESSAGE:
default:
dojo.html.addClass(this.containerNode, this.messageCssClass);
break;
this.show();
var nodeSize = dojo.html.getMarginBox(this.containerNode);
if(this.positionDirection.indexOf("-up") >= 0){this.containerNode.style.left=0+"px";
this.containerNode.style.top=nodeSize.height + 10 + "px";
this.containerNode.style.top=0+"px";
this.containerNode.style.top = 0+"px";
this.containerNode.style.top = 0 - nodeSize.height - 10 + "px";
this.slideAnim = dojo.lfx.html.slideTo(
this.containerNode,
{ top: 0, left: 0 },
450,
null,
dojo.lang.hitch(this, function(nodes, anim){dojo.lang.setTimeout(dojo.lang.hitch(this, function(evt){if(this.bgIframe){this.bgIframe.hide();
this.fadeAnim = dojo.lfx.html.fadeOut(
this.containerNode,
1000,
null,
dojo.lang.hitch(this, function(evt){this.hide();
_placeClip: function(){var scroll = dojo.html.getScroll();
var view = dojo.html.getViewport();
var nodeSize = dojo.html.getMarginBox(this.containerNode);
this.clipNode.style.height = nodeSize.height+"px";
this.clipNode.style.width = nodeSize.width+"px";
if(this.positionDirection.match(/^t/)){this.clipNode.style.top = scroll.top+"px";
if(this.positionDirection.match(/^[tb]r-/)){this.clipNode.style.left = (view.width - nodeSize.width - 1 - scroll.left)+"px";
this.clipNode.style.clip = "rect(0px, " + nodeSize.width + "px, " + nodeSize.height + "px, 0px)";
if(dojo.render.html.ie){if(!this.bgIframe){this.bgIframe = new dojo.html.BackgroundIframe(this.containerNode);
this.bgIframe.setZIndex(this.containerNode);
this.bgIframe.onResized();
this.bgIframe.show();
onSelect: function(e) {},
show: function(){dojo.widget.Toaster.superclass.show.call(this);
this._placeClip();
if(!this._scrollConnected){this._scrollConnected = true;
dojo.event.connect(window, "onscroll", this, "_placeClip");
hide: function(){dojo.widget.Toaster.superclass.hide.call(this);
if(this._scrollConnected){this._scrollConnected = false;
dojo.event.disconnect(window, "onscroll", this, "_placeClip");
dojo.html.setOpacity(this.containerNode, 1.0);
);