
dojo.provide("dojo.widget.ShowSlide");
dojo.require("dojo.widget.*");
dojo.require("dojo.lang.common");
dojo.require("dojo.widget.HtmlWidget");
dojo.require("dojo.lfx.html");
dojo.require("dojo.html.display");
dojo.require("dojo.html.layout");
dojo.require("dojo.animation.Animation");
dojo.require("dojo.gfx.color");
dojo.widget.defineWidget(
"dojo.widget.ShowSlide",
dojo.widget.HtmlWidget,
{title: "",
_action: -1,
isContainer: true,
_components: {},
_actions: [],
gotoAction: function( action){this._action = action;
_nextAction: function( event){if((this._action + 1) != this._actions.length){++this._action;
return true;
return false;
_previousAction: function( event){if((this._action - 1) != -1){--this._action;
return true;
return false;
htmlTitle: null,
debug: false,
noClick: false,
templatePath: dojo.uri.dojoUri("src/widget/templates/ShowSlide.html"),
templateCssPath: dojo.uri.dojoUri("src/widget/templates/ShowSlide.css"),
postCreate: function(){this.htmlTitle.innerHTML = this.title;
var actions = this.getChildrenOfType("ShowAction", false);
var atypes = {};
dojo.lang.forEach(actions, function(act){ atypes[act.on] = true; });
this._components = {};
var cn = this.containerNode;
var nodes = dojo.render.html.ie ? cn.all : cn.getElementsByTagName('*');
dojo.lang.forEach(nodes, function(node){var as = node.getAttribute("as");
if(as){if(!this._components[as]){this._components[as] = [];
this._components[as].push(node);
if(!atypes[as]){var tmpAction = dojo.widget.createWidget("ShowAction", { on: as });
this.addChild(tmpAction);
atypes[as] = true;
this._actions = [];
actions = this.getChildrenOfType("ShowAction", false);
dojo.lang.forEach(actions, function(child){this._actions.push(child);
var components = this._components[child.on];
for(var j = 0, component; component = components[j]; j++){if(child["action"] && (
(child.action != "remove")&&
(child.action != "fadeout")&&
(child.action != "wipeout")
) ){this.hideComponent(component);
previousAction: function( event){if(!this.parent.stopEvent(event)){return false;
var action = this._actions[this._action];
if(!action){return false;
var on = action.on;
while(action.on == on){var components = this._components[on];
for(var i = 0, component; component = components[i]; i++){if(
(action.action == "remove")||
(action.action == "fadeout")||
(action.action == "wipeout")
){if(component.style.display == "none"){component.style.display = "";
component.style.visibility = "visible";
var exits = true;
dojo.html.setOpacity(component, 1);
--this._action;
if(exits){return true;
if(action.auto == "true"){on = this._actions[this._action].on;
action = this._actions[this._action];
if(!action){return false;
return true;
hideComponent: function( component){component.style.visibility = "hidden";
component.style.backgroundColor = "transparent";
var parent = component.parentNode;
if((parent)&&(parent.tagName.toLowerCase() == "li")){parent.oldType = parent.style.listStyleType;
parent.style.listStyleType = "none";
nextAction: function( event){if(!this.parent.stopEvent(event)){return false;
if(!this._nextAction(this)){return false;
var action = this._actions[this._action];
if(!action){return false;
var tmpAction = action["action"];
var components = this._components[action.on];
for(var i = 0, component; component = components[i]; i++){if(tmpAction){var duration = action.duration || 1000;
if((tmpAction == "fade")||(tmpAction == "fadeIn")){dojo.html.setOpacity(component, 0);
dojo.lfx.html.fadeShow(component, duration).play(true);
var position = dojo.html.getAbsolutePosition(component);
component.style.position = "relative";
component.style.left = -(width + position.x) + "px";
dojo.lfx.html.slideBy(component, { top: 0, left: (width + position.x)}, duration, -1, this.callWith).play(true);
var to = new dojo.gfx.color.Color(action.to).toRgb();
var anim = new dojo.animation.Animation(new dojo.math.curves.Line(from, to), duration, 0);
var node = component;
dojo.event.connect(anim, "onAnimate", function(e) {node.style.color = "rgb(" + e.coordsAsInts().join(",") + ")";
anim.play(true);
if(tmpAction == "hide"){component.style.visibility = "hidden";
action = this._actions[this._action + 1];
if(action && action.auto == "true"){this.nextAction();
return true;
callWith: function( node){if(!node){ return; }
if(dojo.lang.isArray(node)){dojo.lang.forEach(node, arguments.callee);
return;
var parent = node.parentNode;
if((parent)&&(parent.tagName.toLowerCase() == "li")){parent.style.listStyleType = parent.oldType;