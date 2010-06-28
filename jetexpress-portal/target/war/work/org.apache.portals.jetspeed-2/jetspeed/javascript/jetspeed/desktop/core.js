dojo.provide("jetspeed.desktop.core");
dojo.require("dojo.lang.*");
dojo.require("dojo.event.*");
dojo.require("dojo.io.*");
dojo.require("dojo.uri.Uri");
dojo.require("dojo.widget.*");
dojo.require("jetspeed.common");
if(!window.jetspeed){
jetspeed={};
}
if(!jetspeed.om){
jetspeed.om={};
}
if(!jetspeed.debug){
jetspeed.debug={};
}
jetspeed.id={PAGE:"jetspeedPage",DESKTOP_CELL:"jetspeedDesktopCell",DESKTOP:"jetspeedDesktop",COLUMNS:"jetspeedColumns",PAGE_CONTROLS:"jetspeedPageControls",P_CLASS:"portlet",PWIN_CLASS:"portletWindow",PWIN_CLIENT_CLASS:"portletWindowClient",PWIN_GHOST_CLASS:"ghostPane",PW_ID_PREFIX:"pw_",COL_CLASS:"desktopColumn",COL_LAYOUTHEADER_CLASS:"desktopLayoutHeader",PP_WIDGET_ID:"widgetId",PP_CONTENT_RETRIEVER:"contentRetriever",PP_DESKTOP_EXTENDED:"jsdesktop",PP_WINDOW_POSITION_STATIC:"windowPositionStatic",PP_WINDOW_HEIGHT_TO_FIT:"windowHeightToFit",PP_WINDOW_DECORATION:"windowDecoration",PP_WINDOW_TITLE:"title",PP_WINDOW_ICON:"windowIcon",PP_WIDTH:"width",PP_HEIGHT:"height",PP_LEFT:"left",PP_TOP:"top",PP_COLUMN:"column",PP_ROW:"row",PP_EXCLUDE_PCONTENT:"excludePContent",PP_WINDOW_STATE:"windowState",PP_STATICPOS:"staticpos",PP_FITHEIGHT:"fitheight",PP_PROP_SEPARATOR:"=",PP_PAIR_SEPARATOR:";",ACT_MENU:"menu",ACT_MINIMIZE:"minimized",ACT_MAXIMIZE:"maximized",ACT_RESTORE:"normal",ACT_PRINT:"print",ACT_EDIT:"edit",ACT_VIEW:"view",ACT_HELP:"help",ACT_ADDPORTLET:"addportlet",ACT_REMOVEPORTLET:"removeportlet",ACT_CHANGEPORTLETTHEME:"changeportlettheme",ACT_DESKTOP_TILE:"tile",ACT_DESKTOP_UNTILE:"untile",ACT_DESKTOP_HEIGHT_EXPAND:"heightexpand",ACT_DESKTOP_HEIGHT_NORMAL:"heightnormal",ACT_DESKTOP_MOVE_TILED:"movetiled",ACT_DESKTOP_MOVE_UNTILED:"moveuntiled",ACT_LOAD_RENDER:"loadportletrender",ACT_LOAD_ACTION:"loadportletaction",ACT_LOAD_UPDATE:"loadportletupdate",PORTLET_ACTION_TYPE_MODE:"mode",PORTLET_ACTION_TYPE_STATE:"state",MENU_WIDGET_ID_PREFIX:"jetspeed-menu-",PG_ED_WID:"jetspeed-page-editor",PG_ED_PARAM:"editPage",ADDP_RFRAG:"aR",PG_ED_STATE_PARAM:"epst",PG_ED_TITLES_PARAM:"wintitles",PORTAL_ORIGINATE_PARAMETER:"portal",PM_P_AD:256,PM_P_D:1024,PM_MZ_P:2048,DEBUG_WINDOW_TAG:"js-db"};
jetspeed.prefs={windowTiling:true,windowHeightExpand:false,ajaxPageNavigation:false,windowWidth:null,windowHeight:null,layoutName:null,layoutRootUrl:null,getLayoutName:function(){
if(jetspeed.prefs.layoutName==null&&djConfig.jetspeed!=null){
jetspeed.prefs.layoutName=djConfig.jetspeed.layoutName;
}
return jetspeed.prefs.layoutName;
},getLayoutRootUrl:function(){
if(jetspeed.prefs.layoutRootUrl==null&&djConfig.jetspeed!=null){
jetspeed.prefs.layoutRootUrl=jetspeed.url.basePortalDesktopUrl()+djConfig.jetspeed.layoutDecorationPath;
}
return jetspeed.prefs.layoutRootUrl;
},getPortletDecorationsRootUrl:function(){
if(jetspeed.prefs.portletDecorationsRootUrl==null&&djConfig.jetspeed!=null){
jetspeed.prefs.portletDecorationsRootUrl=jetspeed.url.basePortalDesktopUrl()+djConfig.jetspeed.portletDecorationsPath;
}
return jetspeed.prefs.portletDecorationsRootUrl;
},portletSelectorWindowTitle:"Portlet Selector",portletSelectorWindowIcon:"text-x-script.png",portletSelectorBounds:{x:20,y:20,width:400,height:600},windowActionButtonMax:5,windowActionButtonTooltip:true,windowIconEnabled:true,windowIconPath:"/images/portlets/small",windowTitlebar:true,windowResizebar:true,windowDecoration:"tigris",pageActionButtonTooltip:true,getPortletDecorationBaseUrl:function(_1){
return jetspeed.prefs.getPortletDecorationsRootUrl()+"/"+_1;
},getActionLabel:function(_2,_3,_4,_5){
if(_2==null){
return null;
}
var _6=null;
var _7=_4.desktopActionLabels;
if(_7!=null){
_6=_7[_2];
}
if(_6==null||_6.length==0){
_6=null;
if(!_3){
_6=_5.string.capitalize(_2);
}
}
return _6;
}};
jetspeed.page=null;
jetspeed.initializeDesktop=function(){
var _8=jetspeed;
var _9=_8.id;
var _a=_8.prefs;
var _b=_8.debug;
var _c=dojo;
_8.getHead();
_8.getBody();
_8.ui.initCssObj();
_a.windowActionButtonOrder=[_9.ACT_MENU,"edit","view","help",_9.ACT_MINIMIZE,_9.ACT_RESTORE,_9.ACT_MAXIMIZE];
_a.windowActionNotPortlet=[_9.ACT_MENU,_9.ACT_MINIMIZE,_9.ACT_RESTORE,_9.ACT_MAXIMIZE];
_a.windowActionMenuOrder=[_9.ACT_DESKTOP_HEIGHT_EXPAND,_9.ACT_DESKTOP_HEIGHT_NORMAL,_9.ACT_DESKTOP_TILE,_9.ACT_DESKTOP_UNTILE];
_8.url.pathInitialize();
var _d=djConfig.jetspeed;
if(_d!=null){
for(var _e in _d){
var _f=_d[_e];
if(_f!=null){
if(_b[_e]!=null){
_b[_e]=_f;
}else{
_a[_e]=_f;
}
}
}
if(_a.windowWidth==null||isNaN(_a.windowWidth)){
_a.windowWidth="280";
}
if(_a.windowHeight==null||isNaN(_a.windowHeight)){
_a.windowHeight="200";
}
var _10=[_9.ACT_DESKTOP_HEIGHT_EXPAND,_9.ACT_DESKTOP_HEIGHT_NORMAL,_9.ACT_DESKTOP_TILE,_9.ACT_DESKTOP_UNTILE];
var _11={};
for(var i=0;i<_10.length;i++){
_11[_10[i]]=true;
}
_10.push(_9.ACT_DESKTOP_MOVE_TILED);
_10.push(_9.ACT_DESKTOP_MOVE_UNTILED);
_a.windowActionDesktopAll=_10;
_a.windowActionDesktop=_11;
}
var _13=new _c.uri.Uri(jetspeed.url.basePortalDesktopUrl()+"/javascript/jetspeed/widget/PortletWindow.css");
_c.html.insertCssFile(_13,document,true);
if(_a.portletDecorationsAllowed==null||_a.portletDecorationsAllowed.length==0){
if(_a.windowDecoration!=null){
_a.portletDecorationsAllowed=[_a.windowDecoration];
}
}else{
if(_a.windowDecoration==null){
_a.windowDecoration=_a.portletDecorationsAllowed[0];
}
}
if(_a.windowDecoration==null||_a.portletDecorationsAllowed==null){
_c.raise("No portlet decorations");
return;
}
if(_a.windowActionNoImage!=null){
var _14={};
for(var i=0;i<_a.windowActionNoImage.length;i++){
_14[_a.windowActionNoImage[i]]=true;
}
_a.windowActionNoImage=_14;
}
var _15=_8.url.parse(window.location.href);
var _16=_8.url.getQueryParameter(_15,"jsprintmode")=="true";
if(_16){
_16={};
_16.action=_8.url.getQueryParameter(_15,"jsaction");
_16.entity=_8.url.getQueryParameter(_15,"jsentity");
_16.layout=_8.url.getQueryParameter(_15,"jslayoutid");
_a.printModeOnly=_16;
_a.windowTiling=true;
_a.windowHeightExpand=true;
_a.ajaxPageNavigation=false;
}
_a.portletDecorationsConfig={};
for(var i=0;i<_a.portletDecorationsAllowed.length;i++){
_8.loadPortletDecorationConfig(_a.portletDecorationsAllowed[i],_a,_9);
}
if(_8.UAie6){
_a.ajaxPageNavigation=false;
}
if(_16){
for(var _17 in _a.portletDecorationsConfig){
var _18=_a.portletDecorationsConfig[_17];
if(_18!=null){
_18.windowActionButtonOrder=null;
_18.windowActionMenuOrder=null;
_18.windowDisableResize=true;
_18.windowDisableMove=true;
}
}
}
_8.url.loadingIndicatorShow();
var _19={};
if(_a.windowActionButtonOrder){
var _1a,_1b,_1c;
var _1d=[_a.windowActionButtonOrder,_a.windowActionMenuOrder,_a.windowActionDesktopAll];
for(var _1e=0;_1e<_1d.length;_1e++){
var _1c=_1d[_1e];
if(!_1c){
continue;
}
for(var aI=0;aI<_1c.length;aI++){
_1a=_1c[aI];
if(_1a!=null&&!_19[_1a]){
_19[_1a]=_a.getActionLabel(_1a,false,_a,_c);
}
}
}
}
_8.widget.PortletWindow.prototype.actionLabels=_19;
_8.page=new _8.om.Page();
if(!_16&&djConfig.isDebug){
if(_8.debugWindowLoad){
_8.debugWindowLoad();
}
if(_8.debug.profile&&_c.profile){
_c.profile.start("initializeDesktop");
}else{
_8.debug.profile=false;
}
}else{
_8.debug.profile=false;
}
_8.page.retrievePsml();
_8.ui.windowResizeMgr.init(window,_8.docBody);
};
jetspeed.updatePage=function(_20,_21,_22,_23){
var _24=jetspeed;
var _25=false;
if(djConfig.isDebug&&_24.debug.profile){
_25=true;
dojo.profile.start("updatePage");
}
var _26=_24.page;
if(!_20||!_26||_24.pageNavigateSuppress){
return;
}
if(!_22&&_26.equalsPageUrl(_20)){
return;
}
_20=_26.makePageUrl(_20);
if(_20!=null){
_24.updatePageBegin();
if(_23!=null&&_23.editModeMove){
var _27={};
var _28=_26.getPWins();
for(var i=0;i<_28.length;i++){
_2a=_28[i];
if(_2a&&_2a.portlet){
_27[_2a.portlet.entityId]=_2a.getPortletTitle();
}
}
_23.windowTitles=_27;
}
var _2b=_26.layoutDecorator;
var _2c=_26.editMode;
if(_25){
dojo.profile.start("destroyPage");
}
_26.destroy();
if(_25){
dojo.profile.end("destroyPage");
}
var _2d=_26.portlet_windows;
var _2e=_26.portlet_window_count;
var _2f=new _24.om.Page(_2b,_20,(!djConfig.preventBackButtonFix&&!_21),_26.tooltipMgr,_26.iframeCoverByWinId);
_24.page=_2f;
var _2a;
if(_2e>0){
for(var _30 in _2d){
_2a=_2d[_30];
_2a.bringToTop(null,true,false,_24);
}
}
_2f.retrievePsml(new _24.om.PageCLCreateWidget(true,_23));
if(_2e>0){
for(var _30 in _2d){
_2a=_2d[_30];
_2f.putPWin(_2a);
}
}
window.focus();
}
};
jetspeed.updatePageBegin=function(){
var _31=jetspeed;
if(_31.UAie6){
_31.docBody.attachEvent("onclick",_31.ie6StopMouseEvts);
_31.docBody.setCapture();
}
};
jetspeed.ie6StopMouseEvts=function(e){
if(e){
e.cancelBubble=true;
e.returnValue=false;
}
};
jetspeed.updatePageEnd=function(){
var _33=jetspeed;
if(_33.UAie6){
_33.docBody.releaseCapture();
_33.docBody.detachEvent("onclick",_33.ie6StopMouseEvts);
_33.docBody.releaseCapture();
}
};
jetspeed.createHeadElement=function(_34){
var _35=jetspeed;
var _36=document.createElement(_34.tagName);
var _37=_34.attributes;
for(var i=0;i<_37.length;i++){
var _39=_37.item(i);
if(_39&&(_39.nodeValue)&&(typeof _39.nodeValue!="object")){
_36.setAttribute(_39.nodeName,_39.nodeValue);
}
}
return _36;
};
jetspeed.contributeHeadElements=function(_3a){
var _3b=jetspeed;
var _3c=[];
var _3d=[];
var _3e=_3b.getHead().childNodes;
if(_3e){
var _3f=/^header\.dojo\.requires/;
var _40=/^header\.dojo\./;
for(var i=0;i<_3e.length;i++){
if(_3e[i].nodeType==dojo.dom.ELEMENT_NODE){
_3c.push(_3e[i]);
if(_3e[i].tagName=="SCRIPT"){
var _42=_3e[i].getAttribute("org.apache.portals.portal.page.head.element.contribution.merge.hint");
if(_42=="header.dojo.parameters"){
_42="header.dojo.config";
}else{
if(_3f.test(_42)){
_42="header.dojo.requires";
}
}
if(_42&&_40.test(_42)){
if(!_3d[_42]){
_3d[_42]=[];
}
_3d[_42].push(_3e[i]);
}
}
}
}
}
var _43=_3a.childNodes;
var _44=0;
for(var i=0;i<_43.length;i++){
var _45=_43.item(i);
if(!_45||_45.nodeType!=dojo.dom.ELEMENT_NODE){
continue;
}
var id=_45.getAttribute("id");
if(!id){
id=_45.getAttribute("ID");
}
if(!id){
id=_45.getAttribute("Id");
}
if(!id){
id=_45.getAttribute("iD");
}
var _42=_45.getAttribute("org.apache.portals.portal.page.head.element.contribution.merge.hint");
var _47=_45.tagName;
var _48=false;
if(id){
for(var j=0;j<_3c.length;j++){
if(id==_3c[j].id){
_48=true;
_44=j+1;
break;
}
}
}
if(!_48){
if(_3d[_42]){
if(_3b.UAie){
var _4a=_3d[_42];
var _4b=_45.text.split(/\n/);
for(var j=0;j<_4b.length;j++){
var _4c=false;
for(var k=0;k<_4a.length;k++){
var _4e=_4a[k].text;
if(_4e&&_4e.indexOf(_4b[j])>=0){
_4c=true;
break;
}
}
if(!_4c){
var _4f=_4a[_4a.length-1].text;
_4a[_4a.length-1].text=(_4f?_4f+"\r\n":"")+_4b[j];
}
}
}else{
if(_45.textContent){
var _4a=_3d[_42];
var _4b=_45.textContent.split(/\n/);
for(var j=0;j<_4b.length;j++){
var _4c=false;
for(var k=0;k<_4a.length;k++){
var _4e=_4a[k].textContent;
if(_4e&&_4e.indexOf(_4b[j])>=0){
_4c=true;
break;
}
}
if(!_4c){
var _4f=_4a[_4a.length-1].textContent;
_4a[_4a.length-1].textContent=(_4f?_4f+"\r\n":"")+_4b[j];
}
}
}
}
}else{
var _50=jetspeed.createHeadElement(_45);
if(_3b.UAie){
if(_47=="SCRIPT"&&_45.text){
_50.text=_45.value;
}else{
if(_47=="STYLE"&&_45.text){
_50.styleSheet.cssText=_45.text;
}
}
}else{
if(_45.textContent){
_50.appendChild(document.createTextNode(_45.textContent));
}
}
if(_3c[_44]){
_3b.getHead().insertBefore(_50,_3c[_44]);
}else{
_3b.getHead().appendChild(scriptElem);
}
++_44;
}
}
}
};
jetspeed.doRender=function(_51,_52){
if(!_51){
_51={};
}else{
if((typeof _51=="string"||_51 instanceof String)){
_51={url:_51};
}
}
var _53=jetspeed.page.getPortlet(_52);
if(_53){
if(jetspeed.debug.doRenderDoAction){
dojo.debug("doRender ["+_52+"] url: "+_51.url);
}
_53.retrieveContent(null,_51);
}
};
jetspeed.doAction=function(_54,_55){
if(!_54){
_54={};
}else{
if((typeof _54=="string"||_54 instanceof String)){
_54={url:_54};
}
}
var _56=jetspeed.page.getPortlet(_55);
if(_56){
if(jetspeed.debug.doRenderDoAction){
if(!_54.formNode){
dojo.debug("doAction ["+_55+"] url: "+_54.url+" form: null");
}else{
dojo.debug("doAction ["+_55+"] url: "+_54.url+" form: "+jetspeed.debugDumpForm(_54.formNode));
}
}
_56.retrieveContent(new jetspeed.om.PortletActionCL(_56,_54),_54);
}
};
jetspeed.PortletRenderer=function(_57,_58,_59,_5a,_5b,_5c){
var _5d=jetspeed;
var _5e=_5d.page;
var _5f=dojo;
this._jsObj=_5d;
this.mkWins=_57;
this.initEdit=_5c;
this.minimizeTemp=(_5c!=null&&_5c.editModeMove);
this.noRender=(this.minimizeTemp&&_5c.windowTitles!=null);
this.isPgLd=_58;
this.isPgUp=_59;
this.renderUrl=_5a;
this.suppressGetActions=_5b;
this._colLen=_5e.columns.length;
this._colIndex=0;
this._portletIndex=0;
this._renderCount=0;
this.psByCol=_5e.portletsByPageColumn;
this.pageLoadUrl=null;
if(_58){
this.pageLoadUrl=_5d.url.parse(_5e.getPageUrl());
_5d.ui.evtConnect("before",_5f,"addOnLoad",_5e,"_beforeAddOnLoad",_5f.event);
}
this.dbgPgLd=_5d.debug.pageLoad&&_58;
this.dbgMsg=null;
if(_5d.debug.doRenderDoAction||this.dbgPgLd){
this.dbgMsg="";
}
};
dojo.lang.extend(jetspeed.PortletRenderer,{renderAll:function(){
do{
this._renderCurrent();
}while(this._evalNext());
this._finished();
},renderAllTimeDistribute:function(){
this._renderCurrent();
if(this._evalNext()){
dojo.lang.setTimeout(this,this.renderAllTimeDistribute,10);
}else{
this._finished();
}
},_finished:function(){
var _60=this._jsObj;
var _61=this.dbgMsg;
if(_61!=null){
if(this.dbgPgLd){
dojo.debug("portlet-renderer page-url: "+_60.page.getPsmlUrl()+" portlets: ["+renderMsg+"]"+(url?(" url: "+url):""));
}else{
dojo.debug("portlet-renderer ["+renderMsg+"] url: "+url);
}
}
if(this.isPgLd){
_60.page.loadPostRender(this.isPgUp,this.initEdit);
}
},_renderCurrent:function(){
var _62=this._jsObj;
var _63=this._colLen;
var _64=this._colIndex;
var _65=this._portletIndex;
if(_64<=_63){
var _66;
if(_64<_63){
_66=this.psByCol[_64.toString()];
}else{
_66=this.psByCol["z"];
_64=null;
}
var _67=(_66!=null?_66.length:0);
if(_67>0){
var _68=_66[_65];
if(_68){
var _69=_68.portlet;
var _6a=null;
if(this.mkWins){
_6a=_62.ui.createPortletWindow(_69,_64,_62);
if(this.minimizeTemp){
_6a.minimizeWindowTemporarily(this.noRender);
}
}
var _6b=this.dbgMsg;
if(_6b!=null){
if(_6b.length>0){
_6b=_6b+", ";
}
var _6c=null;
if(_69.getProperty!=null){
_6c=_69.getProperty(_62.id.PP_WIDGET_ID);
}
if(!_6c){
_6c=_69.widgetId;
}
if(!_6c){
_6c=_69.toString();
}
if(_69.entityId){
_6b=_6b+_69.entityId+"("+_6c+")";
if(this._dbPgLd&&_69.getProperty(_62.id.PP_WINDOW_TITLE)){
_6b=_6b+" "+_69.getProperty(_62.id.PP_WINDOW_TITLE);
}
}else{
_6b=_6b+_6c;
}
}
if(!this.noRender){
_69.retrieveContent(null,{url:this.renderUrl,jsPageUrl:this.pageLoadUrl},this.suppressGetActions);
}else{
if(_6a&&_6a.portlet){
var _6d=this.initEdit.windowTitles[_6a.portlet.entityId];
if(_6d!=null){
_6a.setPortletTitle(_6d);
}
}
}
if((this._renderCount%3)==0){
_62.url.loadingIndicatorStep(_62);
}
this._renderCount++;
}
}
}
},_evalNext:function(){
var _6e=false;
var _6f=this._colLen;
var _70=this._colIndex;
var _71=this._portletIndex;
var _72=_70;
var _73;
for(++_70;_70<=_6f;_70++){
_73=this.psByCol[_70==_6f?"z":_70.toString()];
if(_71<(_73!=null?_73.length:0)){
_6e=true;
this._colIndex=_70;
break;
}
}
if(!_6e){
++_71;
for(_70=0;_70<=_72;_70++){
_73=this.psByCol[_70==_6f?"z":_70.toString()];
if(_71<(_73!=null?_73.length:0)){
_6e=true;
this._colIndex=_70;
this._portletIndex=_71;
break;
}
}
}
return _6e;
}});
jetspeed.portleturl={DESKTOP_ACTION_PREFIX_URL:null,DESKTOP_RENDER_PREFIX_URL:null,JAVASCRIPT_ARG_QUOTE:"&"+"quot;",PORTLET_REQUEST_ACTION:"action",PORTLET_REQUEST_RENDER:"render",JETSPEED_DO_NOTHING_ACTION:"javascript:jetspeed.doNothingNav()",parseContentUrl:function(_74){
if(this.DESKTOP_ACTION_PREFIX_URL==null){
this.DESKTOP_ACTION_PREFIX_URL=jetspeed.url.basePortalUrl()+jetspeed.url.path.ACTION;
}
if(this.DESKTOP_RENDER_PREFIX_URL==null){
this.DESKTOP_RENDER_PREFIX_URL=jetspeed.url.basePortalUrl()+jetspeed.url.path.RENDER;
}
var op=null;
var _76=_74;
var _77=null;
if(_74&&_74.length>this.DESKTOP_ACTION_PREFIX_URL.length&&_74.indexOf(this.DESKTOP_ACTION_PREFIX_URL)==0){
op=jetspeed.portleturl.PORTLET_REQUEST_ACTION;
}else{
if(_74&&_74.length>this.DESKTOP_RENDER_PREFIX_URL.length&&_74.indexOf(this.DESKTOP_RENDER_PREFIX_URL)==0){
op=jetspeed.portleturl.PORTLET_REQUEST_RENDER;
}
}
if(op!=null){
_77=jetspeed.url.getQueryParameter(_74,"entity");
}
if(!jetspeed.url.urlStartsWithHttp(_76)){
_76=null;
}
return {url:_76,operation:op,portletEntityId:_77};
},genPseudoUrl:function(_78,_79){
if(!_78||!_78.url||!_78.portletEntityId){
return null;
}
var _7a=null;
if(_79){
_7a=jetspeed.portleturl.JETSPEED_DO_NOTHING_ACTION;
}else{
_7a="javascript:";
var _7b=false;
if(_78.operation==jetspeed.portleturl.PORTLET_REQUEST_ACTION){
_7a+="doAction(\"";
}else{
if(_78.operation==jetspeed.portleturl.PORTLET_REQUEST_RENDER){
_7a+="doRender(\"";
}else{
_7b=true;
}
}
if(_7b){
return null;
}
_7a+=_78.url+"\",\""+_78.portletEntityId+"\"";
_7a+=")";
}
return _7a;
}};
jetspeed.doNothingNav=function(){
false;
};
jetspeed.loadPortletDecorationStyles=function(_7c,_7d,_7e){
var _7f=null;
var _80=_7d.portletDecorationsConfig;
if(_7c&&_80){
_7f=_80[_7c];
}
if(_7f==null&&!_7e){
var _81=_7d.portletDecorationsAllowed;
for(var i=0;i<_81.length;i++){
_7c=_81[i];
_7f=_80[_7c];
if(_7f!=null){
break;
}
}
}
if(_7f!=null&&!_7f._initialized){
var _83=jetspeed.prefs.getPortletDecorationBaseUrl(_7c);
_7f._initialized=true;
_7f.cssPathCommon=new dojo.uri.Uri(_83+"/css/styles.css");
_7f.cssPathDesktop=new dojo.uri.Uri(_83+"/css/desktop.css");
dojo.html.insertCssFile(_7f.cssPathCommon,null,true);
dojo.html.insertCssFile(_7f.cssPathDesktop,null,true);
}
return _7f;
};
jetspeed.loadPortletDecorationConfig=function(_84,_85,_86){
var _87={};
_85.portletDecorationsConfig[_84]=_87;
_87.name=_84;
_87.windowActionButtonOrder=_85.windowActionButtonOrder;
_87.windowActionNotPortlet=_85.windowActionNotPortlet;
_87.windowActionButtonMax=_85.windowActionButtonMax;
_87.windowActionButtonTooltip=_85.windowActionButtonTooltip;
_87.windowActionMenuOrder=_85.windowActionMenuOrder;
_87.windowActionNoImage=_85.windowActionNoImage;
_87.windowIconEnabled=_85.windowIconEnabled;
_87.windowIconPath=_85.windowIconPath;
_87.windowTitlebar=_85.windowTitlebar;
_87.windowResizebar=_85.windowResizebar;
_87.dNodeClass=_86.P_CLASS+" "+_84+" "+_86.PWIN_CLASS+" "+_86.PWIN_CLASS+"-"+_84;
_87.cNodeClass=_86.P_CLASS+" "+_84+" "+_86.PWIN_CLIENT_CLASS;
if(_85.portletDecorationsProperties){
var _88=_85.portletDecorationsProperties[_84];
if(_88){
for(var _89 in _88){
_87[_89]=_88[_89];
}
if(_88.windowActionNoImage!=null){
var _8a={};
for(var i=0;i<_88.windowActionNoImage.length;i++){
_8a[_88.windowActionNoImage[i]]=true;
}
_87.windowActionNoImage=_8a;
}
if(_88.windowIconPath!=null){
_87.windowIconPath=dojo.string.trim(_88.windowIconPath);
if(_87.windowIconPath==null||_87.windowIconPath.length==0){
_87.windowIconPath=null;
}else{
var _8c=_87.windowIconPath;
var _8d=_8c.charAt(0);
if(_8d!="/"){
_8c="/"+_8c;
}
var _8e=_8c.charAt(_8c.length-1);
if(_8e!="/"){
_8c=_8c+"/";
}
_87.windowIconPath=_8c;
}
}
}
}
};
jetspeed.notifyRetrieveAllMenusFinished=function(_8f,_90){
var _91=jetspeed;
_91.pageNavigateSuppress=true;
if(dojo.lang.isFunction(window.doMenuBuildAll)){
window.doMenuBuildAll();
}
var _92=_91.page.getMenuNames();
for(var i=0;i<_92.length;i++){
var _94=_92[i];
var _95=dojo.widget.byId(_91.id.MENU_WIDGET_ID_PREFIX+_94);
if(_95){
_95.createJetspeedMenu(_91.page.getMenu(_94));
}
}
if(!_90){
_91.url.loadingIndicatorHide();
}
_91.pageNavigateSuppress=false;
};
jetspeed.notifyRetrieveMenuFinished=function(_96){
if(dojo.lang.isFunction(window.doMenuBuild)){
window.doMenuBuild(_96);
}
};
jetspeed.menuNavClickWidget=function(_97,_98){
if(!_97){
return;
}
if(dojo.lang.isString(_97)){
var _99=_97;
_97=dojo.widget.byId(_99);
if(!_97){
dojo.raise("Tab widget not found: "+_99);
}
}
if(_97){
var _9a=_97.jetspeedmenuname;
if(!_9a&&_97.extraArgs){
_9a=_97.extraArgs.jetspeedmenuname;
}
if(!_9a){
dojo.raise("Tab widget is invalid: "+_97.widgetId);
}
var _9b=jetspeed.page.getMenu(_9a);
if(!_9b){
dojo.raise("Tab widget "+_97.widgetId+" no menu: "+_9a);
}
var _9c=_9b.getOptionByIndex(_98);
jetspeed.menuNavClick(_9c);
}
};
jetspeed.pageNavigateSuppress=false;
jetspeed.pageNavigate=function(_9d,_9e,_9f){
var _a0=jetspeed;
if(!_9d||_a0.pageNavigateSuppress){
return;
}
if(typeof _9f=="undefined"){
_9f=false;
}
if(!_9f&&_a0.page&&_a0.page.equalsPageUrl(_9d)){
return;
}
_9d=_a0.page.makePageUrl(_9d);
if(_9e=="top"){
top.location.href=_9d;
}else{
if(_9e=="parent"){
parent.location.href=_9d;
}else{
window.location.href=_9d;
}
}
};
jetspeed.getActionsForPortlet=function(_a1){
if(_a1==null){
return;
}
jetspeed.getActionsForPortlets([_a1]);
};
jetspeed.getActionsForPortlets=function(_a2){
var _a3=jetspeed;
if(_a2==null){
_a2=_a3.page.getPortletIds();
}
var _a4=new _a3.om.PortletActionsCL(_a2);
var _a5="?action=getactions";
for(var i=0;i<_a2.length;i++){
_a5+="&id="+_a2[i];
}
var _a7=_a3.url.basePortalUrl()+_a3.url.path.AJAX_API+_a3.page.getPath()+_a5;
var _a8="text/xml";
var _a9=new _a3.om.Id("getactions",{});
_a3.url.retrieveContent({url:_a7,mimetype:_a8},_a4,_a9,_a3.debugContentDumpIds);
};
jetspeed.changeActionForPortlet=function(_aa,_ab,_ac,_ad,_ae){
var _af=jetspeed;
if(_aa==null){
return;
}
if(_ad==null){
_ad=new _af.om.PortletChangeActionCL(_aa);
}
var _b0="?action=window&id="+(_aa!=null?_aa:"");
if(_ab!=null){
_b0+="&state="+_ab;
}
if(_ac!=null){
_b0+="&mode="+_ac;
}
var _b1=_ae;
if(!_b1){
_b1=_af.page.getPath();
}
var _b2=_af.url.basePortalUrl()+_af.url.path.AJAX_API+_b1+_b0;
var _b3="text/xml";
var _b4=new _af.om.Id("changeaction",{});
_af.url.retrieveContent({url:_b2,mimetype:_b3},_ad,_b4,_af.debugContentDumpIds);
};
jetspeed.getUserInfo=function(_b5){
var _b6=jetspeed;
var _b7=new _b6.om.UserInfoCL();
var _b8="?action=getuserinfo";
var _b9=_b6.url.basePortalUrl()+_b6.url.path.AJAX_API+_b6.page.getPath()+_b8;
var _ba="text/xml";
var _bb=new _b6.om.Id("getuserinfo",{});
_b6.url.retrieveContent({url:_b9,mimetype:_ba,sync:_b5},_b7,_bb,_b6.debugContentDumpIds);
};
jetspeed.editPageInitiate=function(_bc,_bd){
var _be=_bc.page;
if(!_be.editMode){
var _bf=_bc.css;
var _c0=true;
var _c1=_bc.url.getQueryParameter(window.location.href,_bc.id.PORTAL_ORIGINATE_PARAMETER);
if(_c1!=null&&_c1=="true"){
_c0=false;
}
_be.editMode=true;
var _c2=dojo.widget.byId(_bc.id.PG_ED_WID);
if(_bc.UAie6){
_be.displayAllPWins(true);
}
var _c3=((_bd!=null&&_bd.editModeMove)?true:false);
var _c4=_be._perms(_bc.prefs,-1,String.fromCharCode);
if(_c4&&_c4[2]&&_c4[2].length>0){
if(!_bc.page._getU()){
_bc.getUserInfo(true);
}
}
if(_c2==null){
try{
_bc.url.loadingIndicatorShow("loadpageeditor",true);
_c2=dojo.widget.createWidget("jetspeed:PageEditor",{widgetId:_bc.id.PG_ED_WID,editorInitiatedFromDesktop:_c0,editModeMove:_c3});
var _c5=document.getElementById(_bc.id.COLUMNS);
_c5.insertBefore(_c2.domNode,_c5.firstChild);
}
catch(e){
_bc.url.loadingIndicatorHide();
if(_bc.UAie6){
_be.displayAllPWins();
}
}
}else{
_c2.editPageShow();
}
_be.syncPageControls(_bc);
}
};
jetspeed.editPageTerminate=function(_c6,_c7){
var _c8=_c6.page;
if(_c8.editMode){
var _c9=null;
var _ca=_c6.css;
var _cb=dojo.widget.byId(_c6.id.PG_ED_WID);
if(_cb!=null&&!_cb.editorInitiatedFromDesktop){
var _cc=_c8.getPageUrl(true);
_cc=_c6.url.removeQueryParameter(_cc,_c6.id.PG_ED_PARAM);
_cc=_c6.url.removeQueryParameter(_cc,_c6.id.PORTAL_ORIGINATE_PARAMETER);
_c9=_cc;
}else{
var _cd=_c6.url.getQueryParameter(window.location.href,_c6.id.PG_ED_PARAM);
if(_cd!=null&&_cd=="true"){
var _ce=window.location.href;
_ce=_c6.url.removeQueryParameter(_ce,_c6.id.PG_ED_PARAM);
_c9=_ce;
}
}
if(_c9!=null){
_c9=_c9.toString();
}
_c8.editMode=false;
_c6.changeActionForPortlet(_c8.rootFragmentId,null,_c6.id.ACT_VIEW,new _c6.om.PageChangeActionCL(_c9));
if(_c9==null){
if(_cb!=null){
_cb.editMoveModeExit(true);
_cb.editPageHide();
}
_c8.syncPageControls(_c6);
}
}
};
jetspeed.om.PortletContentRetriever=function(){
};
jetspeed.om.PortletContentRetriever.prototype={getContent:function(_cf,_d0,_d1,_d2){
if(!_cf){
_cf={};
}
jetspeed.url.retrieveContent(_cf,_d0,_d1,_d2);
}};
jetspeed.om.PageCLCreateWidget=function(_d3,_d4){
if(typeof _d3=="undefined"){
_d3=false;
}
this.isPageUpdate=_d3;
this.initEditModeConf=_d4;
};
jetspeed.om.PageCLCreateWidget.prototype={notifySuccess:function(_d5,_d6,_d7){
_d7.loadFromPSML(_d5,this.isPageUpdate,this.initEditModeConf);
},notifyFailure:function(_d8,_d9,_da,_db){
dojo.raise("PageCLCreateWidget error url: "+_da+" type: "+_d8+jetspeed.formatError(_d9));
}};
jetspeed.om.Page=function(_dc,_dd,_de,_df,_e0){
if(_dc!=null&&_dd!=null){
this.requiredLayoutDecorator=_dc;
this.setPsmlPathFromDocumentUrl(_dd);
this.pageUrlFallback=_dd;
}else{
this.setPsmlPathFromDocumentUrl();
}
if(typeof _de!="undefined"){
this.addToHistory=_de;
}
this.layouts={};
this.columns=[];
this.colFirstNormI=-1;
this.portlets={};
this.portlet_count=0;
this.portlet_windows={};
this.portlet_window_count=0;
if(_e0!=null){
this.iframeCoverByWinId=_e0;
}else{
this.iframeCoverByWinId={};
}
this.portlet_tiled_high_z=10;
this.portlet_untiled_high_z=-1;
this.menus=[];
if(_df!=null){
this.tooltipMgr=_df;
}else{
this.tooltipMgr=dojo.widget.createWidget("jetspeed:PortalTooltipManager",{isContainer:false,fastMixIn:true});
jetspeed.docBody.appendChild(this.tooltipMgr.domNode);
}
};
dojo.lang.extend(jetspeed.om.Page,{psmlPath:null,name:null,path:null,pageUrl:null,pagePathAndQuery:null,title:null,shortTitle:null,layoutDecorator:null,portletDecorator:null,uIA:true,requiredLayoutDecorator:null,pageUrlFallback:null,addToHistory:false,layouts:null,columns:null,portlets:null,portletsByPageColumn:null,editMode:false,themeDefinitions:null,menus:null,getId:function(){
var _e1=(this.name!=null&&this.name.length>0?this.name:null);
if(!_e1){
this.getPsmlUrl();
_e1=this.psmlPath;
}
return "page-"+_e1;
},setPsmlPathFromDocumentUrl:function(_e2){
var _e3=jetspeed;
var _e4=_e3.url.path.AJAX_API;
var _e5=null;
if(_e2==null){
_e5=window.location.pathname;
if(!djConfig.preventBackButtonFix&&_e3.prefs.ajaxPageNavigation){
var _e6=window.location.hash;
if(_e6!=null&&_e6.length>0){
if(_e6.indexOf("#")==0){
_e6=(_e6.length>1?_e6.substring(1):"");
}
if(_e6!=null&&_e6.length>1&&_e6.indexOf("/")==0){
this.psmlPath=_e3.url.path.AJAX_API+_e6;
return;
}
}
}
}else{
var _e7=_e3.url.parse(_e2);
_e5=_e7.path;
}
var _e8=_e3.url.path.DESKTOP;
var _e9=_e5.indexOf(_e8);
if(_e9!=-1&&_e5.length>(_e9+_e8.length)){
_e4=_e4+_e5.substring(_e9+_e8.length);
}
this.psmlPath=_e4;
},getPsmlUrl:function(){
var _ea=jetspeed;
if(this.psmlPath==null){
this.setPsmlPathFromDocumentUrl();
}
var _eb=_ea.url.basePortalUrl()+this.psmlPath;
if(_ea.prefs.printModeOnly!=null){
_eb=_ea.url.addQueryParameter(_eb,"layoutid",_ea.prefs.printModeOnly.layout);
_eb=_ea.url.addQueryParameter(_eb,"entity",_ea.prefs.printModeOnly.entity).toString();
}
return _eb;
},_setU:function(u){
this._u=u;
},_getU:function(){
return this._u;
},retrievePsml:function(_ed){
var _ee=jetspeed;
if(_ed==null){
_ed=new _ee.om.PageCLCreateWidget();
}
var _ef=this.getPsmlUrl();
var _f0="text/xml";
if(_ee.debug.retrievePsml){
dojo.debug("retrievePsml url: "+_ef);
}
_ee.url.retrieveContent({url:_ef,mimetype:_f0},_ed,this,_ee.debugContentDumpIds);
},loadFromPSML:function(_f1,_f2,_f3){
var _f4=jetspeed;
var _f5=_f4.prefs;
var _f6=dojo;
var _f7=_f5.printModeOnly;
if(djConfig.isDebug&&_f4.debug.profile&&_f7==null){
_f6.profile.start("loadFromPSML");
}
var _f8=this._parsePSML(_f1);
jetspeed.rootfrag=_f8;
if(_f8==null){
return;
}
this.portletsByPageColumn={};
var _f9={};
if(this.portletDecorator){
_f9[this.portletDecorator]=true;
}
this.columnsStructure=this._layoutCreateModel(_f8,0,null,this.portletsByPageColumn,true,_f9,_f6,_f4);
this.rootFragmentId=_f8.id;
this.editMode=false;
for(var _fa in _f9){
_f4.loadPortletDecorationStyles(_fa,_f5,true);
}
if(_f5.windowTiling){
this._createColsStart(document.getElementById(_f4.id.DESKTOP),_f4.id.COLUMNS);
}
this.createLayoutInfo(_f4);
var _fb=this.portletsByPageColumn["z"];
if(_fb){
_fb.sort(this._loadPortletZIndexCompare);
}
if(typeof _f3=="undefined"){
_f3=null;
}
if(_f3!=null||(this.actions!=null&&this.actions[_f4.id.ACT_VIEW]!=null)){
if(!this.isUA()&&this.actions!=null&&(this.actions[_f4.id.ACT_EDIT]!=null||this.actions[_f4.id.ACT_VIEW]!=null)){
if(_f3==null){
_f3={};
}
if((typeof _f3.editModeMove=="undefined")&&this._perms(_f5,_f4.id.PM_MZ_P,String.fromCharCode)){
_f3.editModeMove=true;
}
var _fc=_f4.url.parse(window.location.href);
if(!_f3.editModeMove){
var _fd=_f4.url.getQueryParameter(_fc,_f4.id.PG_ED_STATE_PARAM);
if(_fd!=null){
_fd="0x"+_fd;
if((_fd&_f4.id.PM_MZ_P)>0){
_f3.editModeMove=true;
}
}
}
if(_f3.editModeMove&&!_f3.windowTitles){
var _fe=_f4.url.getQueryParameter(_fc,_f4.id.PG_ED_TITLES_PARAM);
if(_fe!=null){
var _ff=_fe.length;
var _100=new Array(_ff/2);
var sfcc=String.fromCharCode;
var _102=0,chI=0;
while(chI<(_ff-1)){
_100[_102]=sfcc(Number("0x"+_fe.substring(chI,(chI+2))));
_102++;
chI+=2;
}
var _104=null;
try{
_104=eval("({"+_100.join("")+"})");
}
catch(e){
if(djConfig.isDebug){
dojo.debug("cannot parse json: "+_100.join(""));
}
}
if(_104!=null){
var _105=false;
for(var _106 in this.portlets){
var _107=this.portlets[_106];
if(_107!=null&&!_104[_107.entityId]){
_105=true;
break;
}
}
if(!_105){
_f3.windowTitles=_104;
}
}
}
}
}else{
_f3=null;
}
}
if(_f3!=null){
_f4.url.loadingIndicatorShow("loadpageeditor",true);
}
var _108=new _f4.PortletRenderer(true,true,_f2,null,true,_f3);
_108.renderAllTimeDistribute();
},loadPostRender:function(_109,_10a){
var _10b=jetspeed;
var _10c=_10b.prefs.printModeOnly;
if(_10c==null){
this._portletsInitWinState(this.portletsByPageColumn["z"]);
this.retrieveMenuDeclarations(true,_109,_10a);
}else{
for(var _10d in this.portlets){
var _10e=this.portlets[_10d];
if(_10e!=null){
_10e.renderAction(null,_10c.action);
}
break;
}
if(_109){
_10b.updatePageEnd();
}
}
_10b.ui.evtConnect("after",window,"onresize",_10b.ui.windowResizeMgr,"onResize",dojo.event);
_10b.ui.windowResizeMgr.onResizeDelayedCompare();
var _10f,_110=this.columns;
if(_110){
for(var i=0;i<_110.length;i++){
_10f=_110[i].domNode;
if(!_10f.childNodes||_10f.childNodes.length==0){
_10f.style.height="1px";
}
}
}
var _112=this.maximizedOnInit;
if(_112!=null){
var _113=this.getPWin(_112);
if(_113==null){
dojo.raise("no pWin to max");
}else{
dojo.lang.setTimeout(_113,_113._postCreateMaximizeWindow,500);
}
this.maximizedOnInit=null;
}
dojo.lang.setTimeout(_10b.url,_10b.url.loadingIndicatorStepPreload,1800);
},loadPostRetrieveMenus:function(_114,_115){
var _116=jetspeed;
this.renderPageControls(_116);
if(_115){
_116.editPageInitiate(_116,_115);
}
if(_114){
_116.updatePageEnd();
}
this.syncPageControls(_116);
},_parsePSML:function(psml){
var _118=jetspeed;
var _119=dojo;
var _11a=psml.getElementsByTagName("page");
if(!_11a||_11a.length>1||_11a[0]==null){
_119.raise("<page>");
}
var _11b=_11a[0];
var _11c=_11b.childNodes;
var _11d=new RegExp("(name|path|profiledPath|title|short-title|uIA|npe)");
var _11e=null;
var _11f={};
for(var i=0;i<_11c.length;i++){
var _121=_11c[i];
if(_121.nodeType!=1){
continue;
}
var _122=_121.nodeName;
if(_122=="fragment"){
_11e=_121;
}else{
if(_122=="defaults"){
this.layoutDecorator=_121.getAttribute("layout-decorator");
var _123=_121.getAttribute("portlet-decorator");
var _124=_118.prefs.portletDecorationsAllowed;
if(!_124||_119.lang.indexOf(_124,_123)==-1){
_123=_118.prefs.windowDecoration;
}
this.portletDecorator=_123;
}else{
if(_122&&_122.match(_11d)){
if(_122=="short-title"){
_122="shortTitle";
}
this[_122]=((_121&&_121.firstChild)?_121.firstChild.nodeValue:null);
}else{
if(_122=="action"){
this._parsePSMLAction(_121,_11f);
}
}
}
}
}
this.actions=_11f;
if(_11e==null){
_119.raise("root frag");
return null;
}
if(this.requiredLayoutDecorator!=null&&this.pageUrlFallback!=null){
if(this.layoutDecorator!=this.requiredLayoutDecorator){
if(_118.debug.ajaxPageNav){
_119.debug("ajaxPageNavigation _parsePSML different layout decorator ("+this.requiredLayoutDecorator+" != "+this.layoutDecorator+") - fallback to normal page navigation - "+this.pageUrlFallback);
}
_118.pageNavigate(this.pageUrlFallback,null,true);
return null;
}else{
if(this.addToHistory){
var _125=this.getPageUrl();
_119.undo.browser.addToHistory({back:function(){
if(_118.debug.ajaxPageNav){
dojo.debug("back-nav-button: "+_125);
}
_118.updatePage(_125,true);
},forward:function(){
if(_118.debug.ajaxPageNav){
dojo.debug("forward-nav-button: "+_125);
}
_118.updatePage(_125,true);
},changeUrl:escape(this.getPath())});
}
}
}else{
if(!djConfig.preventBackButtonFix&&_118.prefs.ajaxPageNavigation){
var _125=this.getPageUrl();
_119.undo.browser.setInitialState({back:function(){
if(_118.debug.ajaxPageNav){
dojo.debug("back-nav-button initial: "+_125);
}
_118.updatePage(_125,true);
},forward:function(){
if(_118.debug.ajaxPageNav){
dojo.debug("forward-nav-button initial: "+_125);
}
_118.updatePage(_125,true);
},changeUrl:escape(this.getPath())});
}
}
var _126=this._parsePSMLFrag(_11e,0,false);
return _126;
},_parsePSMLFrag:function(_127,_128,_129){
var _12a=jetspeed;
var _12b=new Array();
var _12c=((_127!=null)?_127.getAttribute("type"):null);
if(_12c!="layout"){
dojo.raise("!layout frag="+_127);
return null;
}
if(!_129){
var _12d=_127.getAttribute("name");
if(_12d!=null){
_12d=_12d.toLowerCase();
if(_12d.indexOf("noactions")!=-1){
_129=true;
}
}
}
var _12e=null,_12f=0;
var _130={};
var _131=_127.childNodes;
var _132,_133,_134,_135,_136;
for(var i=0;i<_131.length;i++){
_132=_131[i];
if(_132.nodeType!=1){
continue;
}
_133=_132.nodeName;
if(_133=="fragment"){
_136=_132.getAttribute("type");
if(_136=="layout"){
var _138=this._parsePSMLFrag(_132,i,_129);
if(_138!=null){
_12b.push(_138);
}
}else{
var _139=this._parsePSMLProps(_132,null);
var _13a=_139[_12a.id.PP_WINDOW_ICON];
if(_13a==null||_13a.length==0){
_13a=this._parsePSMLChildOrAttr(_132,"icon");
if(_13a!=null&&_13a.length>0){
_139[_12a.id.PP_WINDOW_ICON]=_13a;
}
}
_12b.push({id:_132.getAttribute("id"),type:_136,name:_132.getAttribute("name"),properties:_139,actions:this._parsePSMLActions(_132,null),currentActionState:this._parsePSMLChildOrAttr(_132,"state"),currentActionMode:this._parsePSMLChildOrAttr(_132,"mode"),decorator:_132.getAttribute("decorator"),layoutActionsDisabled:_129,documentOrderIndex:i});
}
}else{
if(_133=="property"){
if(this._parsePSMLProp(_132,_130)=="sizes"){
if(_12e!=null){
dojo.raise("<sizes>: "+_127);
return null;
}
if(_12a.prefs.printModeOnly!=null){
_12e=["100"];
_12f=100;
}else{
_135=_132.getAttribute("value");
if(_135!=null&&_135.length>0){
_12e=_135.split(",");
for(var j=0;j<_12e.length;j++){
var re=/^[^0-9]*([0-9]+)[^0-9]*$/;
_12e[j]=_12e[j].replace(re,"$1");
_12f+=new Number(_12e[j]);
}
}
}
}
}
}
}
if(_12e==null){
_12e=["100"];
_12f=100;
}
var _13d=_12e.length;
var _13e=_12b.length;
var pCi=_12a.id.PP_COLUMN;
var pRi=_12a.id.PP_ROW;
var _141=new Array(_13d);
var _142=new Array(_13d);
for(var cI=0;cI<_13d;cI++){
_141[cI]=[];
_142[cI]={head:-1,tail:-1,high:-1};
}
for(var _144=0;_144<_13e;_144++){
var frag=_12b[_144];
var _146=frag.properties;
var col=_146[pCi];
var row=_146[pRi];
var _149=null;
if(col==null||col>=_13d){
_149=_13d-1;
}else{
if(col<0){
_149=0;
}
}
if(_149!=null){
col=_146[pCi]=String(_149);
}
var ll=_141[col];
var _14b=ll.length;
var _14c=_142[col];
if(row<0){
row=_146[pRi]=0;
}else{
if(row==null){
row=_14c.high+1;
}
}
var _14d={i:_144,row:row,next:-1};
ll.push(_14d);
if(_14b==0){
_14c.head=_14c.tail=0;
_14c.high=row;
}else{
if(row>_14c.high){
ll[_14c.tail].next=_14b;
_14c.high=row;
_14c.tail=_14b;
}else{
var _14e=_14c.head;
var _14f=-1;
while(ll[_14e].row<row){
_14f=_14e;
_14e=ll[_14e].next;
}
if(ll[_14e].row==row){
var _150=new Number(row)+1;
ll[_14e].row=_150;
if(_14c.tail==_14e){
_14c.high=_150;
}
}
_14d.next=_14e;
if(_14f==-1){
_14c.head=_14b;
}else{
ll[_14f].next=_14b;
}
}
}
}
var _151=new Array(_13e);
var _152=0;
for(var cI=0;cI<_13d;cI++){
var ll=_141[cI];
var _14c=_142[cI];
var _153=0;
var _154=_14c.head;
while(_154!=-1){
var _14d=ll[_154];
var frag=_12b[_14d.i];
_151[_152]=frag;
frag.properties[pRi]=_153;
_152++;
_153++;
_154=_14d.next;
}
}
return {id:_127.getAttribute("id"),type:_12c,name:_127.getAttribute("name"),decorator:_127.getAttribute("decorator"),columnSizes:_12e,columnSizesSum:_12f,properties:_130,fragments:_151,layoutActionsDisabled:_129,documentOrderIndex:_128};
},_parsePSMLActions:function(_155,_156){
if(_156==null){
_156={};
}
var _157=_155.getElementsByTagName("action");
for(var _158=0;_158<_157.length;_158++){
var _159=_157[_158];
this._parsePSMLAction(_159,_156);
}
return _156;
},_parsePSMLAction:function(_15a,_15b){
var _15c=_15a.getAttribute("id");
if(_15c!=null){
var _15d=_15a.getAttribute("type");
var _15e=_15a.getAttribute("name");
var _15f=_15a.getAttribute("url");
var _160=_15a.getAttribute("alt");
_15b[_15c.toLowerCase()]={id:_15c,type:_15d,label:_15e,url:_15f,alt:_160};
}
},_parsePSMLChildOrAttr:function(_161,_162){
var _163=null;
var _164=_161.getElementsByTagName(_162);
if(_164!=null&&_164.length==1&&_164[0].firstChild!=null){
_163=_164[0].firstChild.nodeValue;
}
if(!_163){
_163=_161.getAttribute(_162);
}
if(_163==null||_163.length==0){
_163=null;
}
return _163;
},_parsePSMLProps:function(_165,_166){
if(_166==null){
_166={};
}
var _167=_165.getElementsByTagName("property");
for(var _168=0;_168<_167.length;_168++){
this._parsePSMLProp(_167[_168],_166);
}
return _166;
},_parsePSMLProp:function(_169,_16a){
var _16b=_169.getAttribute("name");
var _16c=_169.getAttribute("value");
_16a[_16b]=_16c;
return _16b;
},_layoutCreateModel:function(_16d,_16e,_16f,_170,_171,_172,_173,_174){
var jsId=_174.id;
var _176=this.columns.length;
var _177=this._layoutCreateColsModel(_16d,_16e,_16f,_171);
var _178=_177.columnsInLayout;
if(_177.addedLayoutHeaderColumn){
_176++;
}
var _179=(_178==null?0:_178.length);
var _17a=new Array(_179);
var _17b=new Array(_179);
for(var i=0;i<_16d.fragments.length;i++){
var _17d=_16d.fragments[i];
if(_17d.type=="layout"){
var _17e=i;
var _17e=(_17d.properties?_17d.properties[_174.id.PP_COLUMN]:i);
if(_17e==null||_17e<0||_17e>=_179){
_17e=(_179>0?(_179-1):0);
}
_17b[_17e]=true;
this._layoutCreateModel(_17d,(_16e+1),_178[_17e],_170,false,_172,_173,_174);
}else{
this._layoutCreatePortlet(_17d,_16d,_178,_176,_170,_17a,_172,_173,_174);
}
}
return _178;
},_layoutCreatePortlet:function(_17f,_180,_181,_182,_183,_184,_185,_186,_187){
if(_17f&&_187.debugPortletEntityIdFilter){
if(!_186.lang.inArray(_187.debugPortletEntityIdFilter,_17f.id)){
_17f=null;
}
}
if(_17f){
var _188="z";
var _189=_17f.properties[_187.id.PP_DESKTOP_EXTENDED];
var _18a=_187.prefs.windowTiling;
var _18b=_18a;
var _18c=_187.prefs.windowHeightExpand;
if(_189!=null&&_18a&&_187.prefs.printModeOnly==null){
var _18d=_189.split(_187.id.PP_PAIR_SEPARATOR);
var _18e=null,_18f=0,_190=null,_191=null,_192=false;
if(_18d!=null&&_18d.length>0){
var _193=_187.id.PP_PROP_SEPARATOR;
for(var _194=0;_194<_18d.length;_194++){
_18e=_18d[_194];
_18f=((_18e!=null)?_18e.length:0);
if(_18f>0){
var _195=_18e.indexOf(_193);
if(_195>0&&_195<(_18f-1)){
_190=_18e.substring(0,_195);
_191=_18e.substring(_195+1);
_192=((_191=="true")?true:false);
if(_190==_187.id.PP_STATICPOS){
_18b=_192;
}else{
if(_190==_187.id.PP_FITHEIGHT){
_18c=_192;
}
}
}
}
}
}
}else{
if(!_18a){
_18b=false;
}
}
_17f.properties[_187.id.PP_WINDOW_POSITION_STATIC]=_18b;
_17f.properties[_187.id.PP_WINDOW_HEIGHT_TO_FIT]=_18c;
if(_18b&&_18a){
var _196=_181.length;
var _197=_17f.properties[_187.id.PP_COLUMN];
if(_197==null||_197>=_196){
_197=_196-1;
}else{
if(_197<0){
_197=0;
}
}
if(_184[_197]==null){
_184[_197]=new Array();
}
_184[_197].push(_17f.id);
var _198=_182+new Number(_197);
_188=_198.toString();
}
if(_17f.currentActionState==_187.id.ACT_MAXIMIZE){
this.maximizedOnInit=_17f.id;
}
var _199=_17f.decorator;
if(_199!=null&&_199.length>0){
if(_186.lang.indexOf(_187.prefs.portletDecorationsAllowed,_199)==-1){
_199=null;
}
}
if(_199==null||_199.length==0){
if(djConfig.isDebug&&_187.debug.windowDecorationRandom){
_199=_187.prefs.portletDecorationsAllowed[Math.floor(Math.random()*_187.prefs.portletDecorationsAllowed.length)];
}else{
_199=this.portletDecorator;
}
}
var _19a=_17f.properties||{};
_19a[_187.id.PP_WINDOW_DECORATION]=_199;
_185[_199]=true;
var _19b=_17f.actions||{};
var _19c=new _187.om.Portlet(_17f.name,_17f.id,null,_19a,_19b,_17f.currentActionState,_17f.currentActionMode,_17f.layoutActionsDisabled);
_19c.initialize();
this.putPortlet(_19c);
if(_183[_188]==null){
_183[_188]=new Array();
}
_183[_188].push({portlet:_19c,layout:_180.id});
}
},_layoutCreateColsModel:function(_19d,_19e,_19f,_1a0){
var _1a1=jetspeed;
this.layouts[_19d.id]=_19d;
var _1a2=false;
var _1a3=new Array();
if(_1a1.prefs.windowTiling&&_19d.columnSizes.length>0){
var _1a4=false;
if(_1a1.UAie){
_1a4=true;
}
if(_19f!=null&&!_1a0){
var _1a5=new _1a1.om.Column(0,_19d.id,(_1a4?_19d.columnSizesSum-0.1:_19d.columnSizesSum),this.columns.length,_19d.layoutActionsDisabled,_19e);
_1a5.layoutHeader=true;
this.columns.push(_1a5);
if(_19f.buildColChildren==null){
_19f.buildColChildren=new Array();
}
_19f.buildColChildren.push(_1a5);
_19f=_1a5;
_1a2=true;
}
for(var i=0;i<_19d.columnSizes.length;i++){
var size=_19d.columnSizes[i];
if(_1a4&&i==(_19d.columnSizes.length-1)){
size=size-0.1;
}
var _1a8=new _1a1.om.Column(i,_19d.id,size,this.columns.length,_19d.layoutActionsDisabled);
this.columns.push(_1a8);
if(_19f!=null){
if(_19f.buildColChildren==null){
_19f.buildColChildren=new Array();
}
_19f.buildColChildren.push(_1a8);
}
_1a3.push(_1a8);
}
}
return {columnsInLayout:_1a3,addedLayoutHeaderColumn:_1a2};
},_portletsInitWinState:function(_1a9){
var _1aa={};
this.getPortletCurColRow(null,false,_1aa);
for(var _1ab in this.portlets){
var _1ac=this.portlets[_1ab];
var _1ad=_1aa[_1ac.getId()];
if(_1ad==null&&_1a9){
for(var i=0;i<_1a9.length;i++){
if(_1a9[i].portlet.getId()==_1ac.getId()){
_1ad={layout:_1a9[i].layout};
break;
}
}
}
if(_1ad!=null){
_1ac._initWinState(_1ad,false);
}else{
dojo.raise("Window state data not found for portlet: "+_1ac.getId());
}
}
},_loadPortletZIndexCompare:function(_1af,_1b0){
var _1b1=null;
var _1b2=null;
var _1b3=null;
_1b1=_1af.portlet._getInitialZIndex();
_1b2=_1b0.portlet._getInitialZIndex();
if(_1b1&&!_1b2){
return -1;
}else{
if(_1b2&&!_1b1){
return 1;
}else{
if(_1b1==_1b2){
return 0;
}
}
}
return (_1b1-_1b2);
},_createColsStart:function(_1b4,_1b5){
if(!this.columnsStructure||this.columnsStructure.length==0){
return;
}
var _1b6=document.createElement("div");
_1b6.id=_1b5;
_1b6.setAttribute("id",_1b5);
for(var _1b7=0;_1b7<this.columnsStructure.length;_1b7++){
var _1b8=this.columnsStructure[_1b7];
this._createCols(_1b8,_1b6);
}
_1b4.appendChild(_1b6);
},_createCols:function(_1b9,_1ba){
_1b9.createColumn();
if(this.colFirstNormI==-1&&!_1b9.columnContainer&&!_1b9.layoutHeader){
this.colFirstNormI=_1b9.getPageColumnIndex();
}
var _1bb=_1b9.buildColChildren;
if(_1bb!=null&&_1bb.length>0){
for(var _1bc=0;_1bc<_1bb.length;_1bc++){
this._createCols(_1bb[_1bc],_1b9.domNode);
}
}
delete _1b9.buildColChildren;
_1ba.appendChild(_1b9.domNode);
},_removeCols:function(_1bd){
if(!this.columns||this.columns.length==0){
return;
}
for(var i=0;i<this.columns.length;i++){
if(this.columns[i]){
if(_1bd){
var _1bf=jetspeed.ui.getPWinAndColChildren(this.columns[i].domNode,null);
dojo.lang.forEach(_1bf,function(_1c0){
_1bd.appendChild(_1c0);
});
}
dojo.dom.removeNode(this.columns[i]);
this.columns[i]=null;
}
}
var _1c1=dojo.byId(jetspeed.id.COLUMNS);
if(_1c1){
dojo.dom.removeNode(_1c1);
}
this.columns=[];
},getColumnDefault:function(){
if(this.colFirstNormI!=-1){
return this.columns[this.colFirstNormI];
}
return null;
},columnsEmptyCheck:function(_1c2){
var _1c3=null;
if(_1c2==null){
return _1c3;
}
var _1c4=_1c2.childNodes,_1c5;
if(_1c4){
for(var i=0;i<_1c4.length;i++){
_1c5=_1c4[i];
var _1c7=this.columnEmptyCheck(_1c5,true);
if(_1c7!=null){
_1c3=_1c7;
if(_1c3==false){
break;
}
}
}
}
return _1c3;
},columnEmptyCheck:function(_1c8,_1c9){
var _1ca=null;
if(!_1c8||!_1c8.getAttribute){
return _1ca;
}
var _1cb=_1c8.getAttribute("columnindex");
if(!_1cb||_1cb.length==0){
return _1ca;
}
var _1cc=_1c8.getAttribute("layoutid");
if(_1cc==null||_1cc.length==0){
var _1cd=_1c8.childNodes;
_1ca=(!_1cd||_1cd.length==0);
if(!_1c9){
_1c8.style.height=(_1ca?"1px":"");
}
}
return _1ca;
},getPortletCurColRow:function(_1ce,_1cf,_1d0){
if(!this.columns||this.columns.length==0){
return null;
}
var _1d1=null;
var _1d2=((_1ce!=null)?true:false);
var _1d3=0;
var _1d4=null;
var _1d5=null;
var _1d6=0;
var _1d7=false;
for(var _1d8=0;_1d8<this.columns.length;_1d8++){
var _1d9=this.columns[_1d8];
var _1da=_1d9.domNode.childNodes;
if(_1d5==null||_1d5!=_1d9.getLayoutId()){
_1d5=_1d9.getLayoutId();
_1d4=this.layouts[_1d5];
if(_1d4==null){
dojo.raise("Layout not found: "+_1d5);
return null;
}
_1d6=0;
_1d7=false;
if(_1d4.clonedFromRootId==null){
_1d7=true;
}else{
var _1db=this.getColFromColNode(_1d9.domNode.parentNode);
if(_1db==null){
dojo.raise("Parent column not found: "+_1d9);
return null;
}
_1d9=_1db;
}
}
var _1dc=null;
var _1dd=jetspeed;
var _1de=dojo;
var _1df=_1dd.id.PWIN_CLASS;
if(_1cf){
_1df+="|"+_1dd.id.PWIN_GHOST_CLASS;
}
if(_1d2){
_1df+="|"+_1dd.id.COL_CLASS;
}
var _1e0=new RegExp("(^|\\s+)("+_1df+")(\\s+|$)");
for(var _1e1=0;_1e1<_1da.length;_1e1++){
var _1e2=_1da[_1e1];
if(_1e0.test(_1de.html.getClass(_1e2))){
_1dc=(_1dc==null?0:_1dc+1);
if((_1dc+1)>_1d6){
_1d6=(_1dc+1);
}
if(_1ce==null||_1e2==_1ce){
var _1e3={layout:_1d5,column:_1d9.getLayoutColumnIndex(),row:_1dc,columnObj:_1d9};
if(!_1d7){
_1e3.layout=_1d4.clonedFromRootId;
}
if(_1ce!=null){
_1d1=_1e3;
break;
}else{
if(_1d0!=null){
var _1e4=this.getPWinFromNode(_1e2);
if(_1e4==null){
_1de.raise("PortletWindow not found for node");
}else{
var _1e5=_1e4.portlet;
if(_1e5==null){
_1de.raise("PortletWindow for node has null portlet: "+_1e4.widgetId);
}else{
_1d0[_1e5.getId()]=_1e3;
}
}
}
}
}
}
}
if(_1d1!=null){
break;
}
}
return _1d1;
},_getPortletArrayByZIndex:function(){
var _1e6=jetspeed;
var _1e7=this.getPortletArray();
if(!_1e7){
return _1e7;
}
var _1e8=[];
for(var i=0;i<_1e7.length;i++){
if(!_1e7[i].getProperty(_1e6.id.PP_WINDOW_POSITION_STATIC)){
_1e8.push(_1e7[i]);
}
}
_1e8.sort(this._portletZIndexCompare);
return _1e8;
},_portletZIndexCompare:function(_1ea,_1eb){
var _1ec=null;
var _1ed=null;
var _1ee=null;
_1ee=_1ea.getSavedWinState();
_1ec=_1ee.zIndex;
_1ee=_1eb.getSavedWinState();
_1ed=_1ee.zIndex;
if(_1ec&&!_1ed){
return -1;
}else{
if(_1ed&&!_1ec){
return 1;
}else{
if(_1ec==_1ed){
return 0;
}
}
}
return (_1ec-_1ed);
},_perms:function(p,w,f){
var rId=f(112);
var rL=1;
rId+=f(101);
var c=null,a=null;
rId+=f(99);
var r=p[rId];
d=10;
rL=((!r||!r.length)?0:((w<0)?r.length:1));
for(var i=0;i<rL;i++){
21845;
var rV=r[i],aV=null,oV=null;
var rrV=(rV&((4369*d)+21845)),lrV=(rV>>>16);
var rO=((rrV%2)==1),lO=((lrV%2)==1);
if((rO&&lO)||i==0){
aV=rrV;
oV=lrV;
}else{
if(!rO&&lO){
aV=lrV;
oV=rrV;
}
}
if(aV!=null&&oV!=null){
var oVT=Math.floor(oV/d),oVTE=(((oVT%2)==1)?Math.max(oVT-1,2):oVT);
aV=aV-oVTE;
if(i>0){
aV=(aV>>>4);
}
if(i==0){
c=aV;
}else{
a=(a==null?"":a)+f(aV);
}
}
}
return (w>0?((c&w)>0):[c,(c&15),a]);
},getPortletArray:function(){
if(!this.portlets){
return null;
}
var _201=[];
for(var _202 in this.portlets){
var _203=this.portlets[_202];
_201.push(_203);
}
return _201;
},getPortletIds:function(){
if(!this.portlets){
return null;
}
var _204=[];
for(var _205 in this.portlets){
var _206=this.portlets[_205];
_204.push(_206.getId());
}
return _204;
},getPortletByName:function(_207){
if(this.portlets&&_207){
for(var _208 in this.portlets){
var _209=this.portlets[_208];
if(_209.name==_207){
return _209;
}
}
}
return null;
},getPortlet:function(_20a){
if(this.portlets&&_20a){
return this.portlets[_20a];
}
return null;
},getPWinFromNode:function(_20b){
var _20c=null;
if(this.portlets&&_20b){
for(var _20d in this.portlets){
var _20e=this.portlets[_20d];
var _20f=_20e.getPWin();
if(_20f!=null){
if(_20f.domNode==_20b){
_20c=_20f;
break;
}
}
}
}
return _20c;
},putPortlet:function(_210){
if(!_210){
return;
}
if(!this.portlets){
this.portlets={};
}
this.portlets[_210.entityId]=_210;
this.portlet_count++;
},putPWin:function(_211){
if(!_211){
return;
}
var _212=_211.widgetId;
if(!_212){
dojo.raise("PortletWindow id is null");
}
this.portlet_windows[_212]=_211;
this.portlet_window_count++;
},getPWin:function(_213){
if(this.portlet_windows&&_213){
var pWin=this.portlet_windows[_213];
if(pWin==null){
var jsId=jetspeed.id;
pWin=this.portlet_windows[jsId.PW_ID_PREFIX+_213];
if(pWin==null){
var p=this.getPortlet(_213);
if(p!=null){
pWin=this.portlet_windows[p.properties[jsObj.id.PP_WIDGET_ID]];
}
}
}
return pWin;
}
return null;
},getPWins:function(_217){
var _218=this.portlet_windows;
var pWin;
var _21a=[];
for(var _21b in _218){
pWin=_218[_21b];
if(pWin&&(!_217||pWin.portlet)){
_21a.push(pWin);
}
}
return _21a;
},getPWinTopZIndex:function(_21c){
var _21d=0;
if(_21c){
_21d=this.portlet_tiled_high_z+1;
this.portlet_tiled_high_z=_21d;
}else{
if(this.portlet_untiled_high_z==-1){
this.portlet_untiled_high_z=200;
}
_21d=this.portlet_untiled_high_z+1;
this.portlet_untiled_high_z=_21d;
}
return _21d;
},getPWinHighZIndex:function(){
return Math.max(this.portlet_tiled_high_z,this.portlet_untiled_high_z);
},displayAllPWins:function(_21e,_21f){
return;
},onBrowserWindowResize:function(){
var _220=jetspeed;
var _221=this.portlet_windows;
var pWin;
for(var _223 in _221){
pWin=_221[_223];
pWin.onBrowserWindowResize();
}
if(_220.UAie6&&this.editMode){
var _224=dojo.widget.byId(_220.id.PG_ED_WID);
if(_224!=null){
_224.onBrowserWindowResize();
}
}
},regPWinIFrameCover:function(_225){
if(!_225){
return;
}
this.iframeCoverByWinId[_225.widgetId]=true;
},unregPWinIFrameCover:function(_226){
if(!_226){
return;
}
delete this.iframeCoverByWinId[_226.widgetId];
},displayAllPWinIFrameCovers:function(_227,_228){
var _229=this.portlet_windows;
var _22a=this.iframeCoverByWinId;
if(!_229||!_22a){
return;
}
for(var _22b in _22a){
if(_22b==_228){
continue;
}
var pWin=_229[_22b];
var _22d=(pWin&&pWin.iframesInfo?pWin.iframesInfo.iframeCover:null);
if(_22d){
_22d.style.display=(_227?"none":"block");
}
}
},createLayoutInfo:function(_22e){
var _22f=dojo;
var _230=null;
var _231=null;
var _232=null;
var _233=null;
var _234=document.getElementById(_22e.id.DESKTOP);
if(_234!=null){
_230=_22e.ui.getLayoutExtents(_234,null,_22f,_22e);
}
var _235=document.getElementById(_22e.id.COLUMNS);
if(_235!=null){
_231=_22e.ui.getLayoutExtents(_235,null,_22f,_22e);
}
if(this.columns){
for(var i=0;i<this.columns.length;i++){
var col=this.columns[i];
if(col.layoutHeader){
_233=_22e.ui.getLayoutExtents(col.domNode,null,_22f,_22e);
}else{
if(!col.columnContainer){
_232=_22e.ui.getLayoutExtents(col.domNode,null,_22f,_22e);
}
}
if(_232!=null&&_233!=null){
break;
}
}
}
this.layoutInfo={desktop:(_230!=null?_230:{}),columns:(_231!=null?_231:{}),column:(_232!=null?_232:{}),columnLayoutHeader:(_233!=null?_233:{})};
_22e.widget.PortletWindow.prototype.colWidth_pbE=((_232&&_232.pbE)?_232.pbE.w:0);
},_beforeAddOnLoad:function(){
this.win_onload=true;
},destroy:function(){
var _238=jetspeed;
var _239=dojo;
_238.ui.evtDisconnect("after",window,"onresize",_238.ui.windowResizeMgr,"onResize",_239.event);
_238.ui.evtDisconnect("before",_239,"addOnLoad",this,"_beforeAddOnLoad",_239.event);
var _23a=this.portlet_windows;
var _23b=this.getPWins(true);
var pWin,_23d;
for(var i=0;i<_23b.length;i++){
pWin=_23b[i];
_23d=pWin.widgetId;
pWin.closeWindow();
delete _23a[_23d];
this.portlet_window_count--;
}
this.portlets={};
this.portlet_count=0;
var _23f=_239.widget.byId(_238.id.PG_ED_WID);
if(_23f!=null){
_23f.editPageDestroy();
}
this._removeCols(document.getElementById(_238.id.DESKTOP));
this._destroyPageControls();
},getColFromColNode:function(_240){
if(_240==null){
return null;
}
var _241=_240.getAttribute("columnindex");
if(_241==null){
return null;
}
var _242=new Number(_241);
if(_242>=0&&_242<this.columns.length){
return this.columns[_242];
}
return null;
},getColIndexForNode:function(node){
var _244=null;
if(!this.columns){
return _244;
}
for(var i=0;i<this.columns.length;i++){
if(this.columns[i].containsNode(node)){
_244=i;
break;
}
}
return _244;
},getColWithNode:function(node){
var _247=this.getColIndexForNode(node);
return ((_247!=null&&_247>=0)?this.columns[_247]:null);
},getDescendantCols:function(_248){
var dMap={};
if(_248==null){
return dMap;
}
for(var i=0;i<this.columns.length;i++){
var col=this.columns[i];
if(col!=_248&&_248.containsDescendantNode(col.domNode)){
dMap[i]=col;
}
}
return dMap;
},putMenu:function(_24c){
if(!_24c){
return;
}
var _24d=(_24c.getName?_24c.getName():null);
if(_24d!=null){
this.menus[_24d]=_24c;
}
},getMenu:function(_24e){
if(_24e==null){
return null;
}
return this.menus[_24e];
},removeMenu:function(_24f){
if(_24f==null){
return;
}
var _250=null;
if(dojo.lang.isString(_24f)){
_250=_24f;
}else{
_250=(_24f.getName?_24f.getName():null);
}
if(_250!=null){
delete this.menus[_250];
}
},clearMenus:function(){
this.menus=[];
},getMenuNames:function(){
var _251=[];
for(var _252 in this.menus){
_251.push(_252);
}
return _251;
},retrieveMenuDeclarations:function(_253,_254,_255){
contentListener=new jetspeed.om.MenusApiCL(_253,_254,_255);
this.clearMenus();
var _256="?action=getmenus";
if(_253){
_256+="&includeMenuDefs=true";
}
var _257=this.getPsmlUrl()+_256;
var _258="text/xml";
var _259=new jetspeed.om.Id("getmenus",{page:this});
jetspeed.url.retrieveContent({url:_257,mimetype:_258},contentListener,_259,jetspeed.debugContentDumpIds);
},syncPageControls:function(_25a){
var jsId=_25a.id;
if(this.actionButtons==null){
return;
}
for(var _25c in this.actionButtons){
var _25d=false;
if(_25c==jsId.ACT_EDIT){
if(!this.editMode){
_25d=true;
}
}else{
if(_25c==jsId.ACT_VIEW){
if(this.editMode){
_25d=true;
}
}else{
if(_25c==jsId.ACT_ADDPORTLET){
if(!this.editMode){
_25d=true;
}
}else{
_25d=true;
}
}
}
if(_25d){
this.actionButtons[_25c].style.display="";
}else{
this.actionButtons[_25c].style.display="none";
}
}
},renderPageControls:function(_25e){
var _25e=jetspeed;
var _25f=_25e.page;
var jsId=_25e.id;
var _261=dojo;
var _262=[];
if(this.actions!=null){
var addP=false;
for(var _264 in this.actions){
if(_264!=jsId.ACT_HELP){
_262.push(_264);
}
}
if(this.actions[jsId.ACT_EDIT]!=null){
addP=true;
if(this.actions[jsId.ACT_VIEW]==null){
_262.push(jsId.ACT_VIEW);
}
}
if(this.actions[jsId.ACT_VIEW]!=null){
addP=true;
if(this.actions[jsId.ACT_EDIT]==null){
_262.push(jsId.ACT_EDIT);
}
}
var _265=(_25f.rootFragmentId?_25f.layouts[_25f.rootFragmentId]:null);
var _266=(!(_265==null||_265.layoutActionsDisabled));
if(_266){
_266=_25f._perms(_25e.prefs,_25e.id.PM_P_AD,String.fromCharCode);
if(_266&&!this.isUA()&&(addP||_25f.canNPE())){
_262.push(jsId.ACT_ADDPORTLET);
}
}
}
var _267=_261.byId(jsId.PAGE_CONTROLS);
if(_267!=null&&_262!=null&&_262.length>0){
var _268=_25e.prefs;
var jsUI=_25e.ui;
var _26a=_261.event;
var _26b=_25f.tooltipMgr;
if(this.actionButtons==null){
this.actionButtons={};
this.actionButtonTooltips=[];
}
var _26c=this.actionButtonTooltips;
for(var i=0;i<_262.length;i++){
var _264=_262[i];
var _26e=document.createElement("div");
_26e.className="portalPageActionButton";
_26e.style.backgroundImage="url("+_268.getLayoutRootUrl()+"/images/desktop/"+_264+".gif)";
_26e.actionName=_264;
this.actionButtons[_264]=_26e;
_267.appendChild(_26e);
jsUI.evtConnect("after",_26e,"onclick",this,"pageActionButtonClick",_26a);
if(_268.pageActionButtonTooltip){
var _26f=null;
if(_268.desktopActionLabels!=null){
_26f=_268.desktopActionLabels[_264];
}
if(_26f==null||_26f.length==0){
_26f=_261.string.capitalize(_264);
}
_26c.push(_26b.addNode(_26e,_26f,true,null,null,null,_25e,jsUI,_26a));
}
}
}
},_destroyPageControls:function(){
var _270=jetspeed;
if(this.actionButtons){
for(var _271 in this.actionButtons){
var _272=this.actionButtons[_271];
if(_272){
_270.ui.evtDisconnect("after",_272,"onclick",this,"pageActionButtonClick");
}
}
}
var _273=dojo.byId(_270.id.PAGE_CONTROLS);
if(_273!=null&&_273.childNodes&&_273.childNodes.length>0){
for(var i=(_273.childNodes.length-1);i>=0;i--){
dojo.dom.removeNode(_273.childNodes[i]);
}
}
_270.page.tooltipMgr.removeNodes(this.actionButtonTooltips);
this.actionButtonTooltips=null;
this.actionButtons==null;
},pageActionButtonClick:function(evt){
if(evt==null||evt.target==null){
return;
}
this.pageActionProcess(evt.target.actionName,evt);
},pageActionProcess:function(_276){
var _277=jetspeed;
if(_276==null){
return;
}
if(_276==_277.id.ACT_ADDPORTLET){
this.addPortletInitiate();
}else{
if(_276==_277.id.ACT_EDIT){
_277.changeActionForPortlet(this.rootFragmentId,null,_277.id.ACT_EDIT,new _277.om.PageChangeActionCL());
_277.editPageInitiate(_277);
}else{
if(_276==_277.id.ACT_VIEW){
_277.editPageTerminate(_277);
}else{
var _278=this.getPageAction(_276);
if(_278==null){
return;
}
if(_278.url==null){
return;
}
var _279=_277.url.basePortalUrl()+_277.url.path.DESKTOP+"/"+_278.url;
_277.pageNavigate(_279);
}
}
}
},getPageAction:function(name){
if(this.actions==null){
return null;
}
return this.actions[name];
},addPortletInitiate:function(_27b,_27c){
var _27d=jetspeed;
var jsId=_27d.id;
if(!_27c){
_27c=escape(this.getPagePathAndQuery());
}else{
_27c=escape(_27c);
}
var _27f=_27d.url.basePortalUrl()+_27d.url.path.DESKTOP+"/system/customizer/selector.psml?jspage="+_27c;
if(_27b!=null){
_27f+="&jslayoutid="+escape(_27b);
}
if(!this.editMode){
_27f+="&"+_27d.id.ADDP_RFRAG+"="+escape(this.rootFragmentId);
}
if(this.actions&&(this.actions[jsId.ACT_EDIT]||this.actions[jsId.ACT_VIEW])){
_27d.changeActionForPortlet(this.rootFragmentId,null,jsId.ACT_EDIT,new _27d.om.PageChangeActionCL(_27f));
}else{
if(!this.isUA()){
_27d.pageNavigate(_27f);
}
}
},addPortletTerminate:function(_280,_281){
var _282=jetspeed;
var _283=_282.url.getQueryParameter(document.location.href,_282.id.ADDP_RFRAG);
if(_283!=null&&_283.length>0){
var _284=_281;
var qPos=_281.indexOf("?");
if(qPos>0){
_284.substring(0,qPos);
}
_282.changeActionForPortlet(_283,null,_282.id.ACT_VIEW,new _282.om.PageChangeActionCL(_280),_284);
}else{
_282.pageNavigate(_280);
}
},setPageModePortletActions:function(_286){
if(_286==null||_286.actions==null){
return;
}
var jsId=jetspeed.id;
if(_286.actions[jsId.ACT_REMOVEPORTLET]==null){
_286.actions[jsId.ACT_REMOVEPORTLET]={id:jsId.ACT_REMOVEPORTLET};
}
},getPageUrl:function(_288){
if(this.pageUrl!=null&&!_288){
return this.pageUrl;
}
var jsU=jetspeed.url;
var _28a=jsU.path.SERVER+((_288)?jsU.path.PORTAL:jsU.path.DESKTOP)+this.getPath();
var _28b=jsU.parse(_28a);
var _28c=null;
if(this.pageUrlFallback!=null){
_28c=jsU.parse(this.pageUrlFallback);
}else{
_28c=jsU.parse(window.location.href);
}
if(_28b!=null&&_28c!=null){
var _28d=_28c.query;
if(_28d!=null&&_28d.length>0){
var _28e=_28b.query;
if(_28e!=null&&_28e.length>0){
_28a=_28a+"&"+_28d;
}else{
_28a=_28a+"?"+_28d;
}
}
}
if(!_288){
this.pageUrl=_28a;
}
return _28a;
},getPagePathAndQuery:function(){
if(this.pagePathAndQuery!=null){
return this.pagePathAndQuery;
}
var jsU=jetspeed.url;
var _290=this.getPath();
var _291=jsU.parse(_290);
var _292=null;
if(this.pageUrlFallback!=null){
_292=jsU.parse(this.pageUrlFallback);
}else{
_292=jsU.parse(window.location.href);
}
if(_291!=null&&_292!=null){
var _293=_292.query;
if(_293!=null&&_293.length>0){
var _294=_291.query;
if(_294!=null&&_294.length>0){
_290=_290+"&"+_293;
}else{
_290=_290+"?"+_293;
}
}
}
this.pagePathAndQuery=_290;
return _290;
},getPageDirectory:function(_295){
var _296="/";
var _297=(_295?this.getRealPath():this.getPath());
if(_297!=null){
var _298=_297.lastIndexOf("/");
if(_298!=-1){
if((_298+1)<_297.length){
_296=_297.substring(0,_298+1);
}else{
_296=_297;
}
}
}
return _296;
},equalsPageUrl:function(url){
if(url==this.getPath()){
return true;
}
if(url==this.getPageUrl()){
return true;
}
return false;
},makePageUrl:function(_29a){
if(!_29a){
_29a="";
}
var jsU=jetspeed.url;
if(!jsU.urlStartsWithHttp(_29a)){
return jsU.path.SERVER+jsU.path.DESKTOP+_29a;
}
return _29a;
},getName:function(){
return this.name;
},getPath:function(){
return this.profiledPath;
},getRealPath:function(){
return this.path;
},getTitle:function(){
return this.title;
},getShortTitle:function(){
return this.shortTitle;
},getLayoutDecorator:function(){
return this.layoutDecorator;
},getPortletDecorator:function(){
return this.portletDecorator;
},isUA:function(){
return ((typeof this.uIA=="undefined")?true:(this.uIA=="false"?false:true));
},canNPE:function(){
return ((typeof this.npe=="undefined")?false:(this.npe=="true"?true:false));
}});
jetspeed.om.Column=function(_29c,_29d,size,_29f,_2a0,_2a1){
this.layoutColumnIndex=_29c;
this.layoutId=_29d;
this.size=size;
this.pageColumnIndex=new Number(_29f);
if(typeof _2a0!="undefined"){
this.layoutActionsDisabled=_2a0;
}
if((typeof _2a1!="undefined")&&_2a1!=null){
this.layoutDepth=_2a1;
}
this.id="jscol_"+_29f;
this.domNode=null;
};
dojo.lang.extend(jetspeed.om.Column,{styleClass:jetspeed.id.COL_CLASS+(jetspeed.UAie6?" ie6desktopColumn":""),styleLayoutClass:jetspeed.id.COL_CLASS+(jetspeed.UAie6?" ie6desktopColumn ":" ")+jetspeed.id.COL_LAYOUTHEADER_CLASS,layoutColumnIndex:null,layoutId:null,layoutDepth:null,layoutMaxChildDepth:0,size:null,pageColumnIndex:null,layoutActionsDisabled:false,domNode:null,columnContainer:false,layoutHeader:false,createColumn:function(_2a2){
var _2a3=this.styleClass;
var _2a4=this.pageColumnIndex;
if(this.isStartOfColumnSet()&&_2a4>0){
_2a3+=" desktopColumnClear-PRIVATE";
}
var _2a5=document.createElement("div");
_2a5.setAttribute("columnindex",_2a4);
_2a5.style.width=this.size+"%";
if(this.layoutHeader){
_2a3=this.styleLayoutClass;
_2a5.setAttribute("layoutid",this.layoutId);
}
_2a5.className=_2a3;
_2a5.id=this.getId();
this.domNode=_2a5;
if(_2a2!=null){
_2a2.appendChild(_2a5);
}
},containsNode:function(node){
return ((this.domNode!=null&&node!=null&&this.domNode==node.parentNode)?true:false);
},containsDescendantNode:function(node){
return ((this.domNode!=null&&node!=null&&dojo.dom.isDescendantOf(node,this.domNode,true))?true:false);
},getDescendantCols:function(){
return jetspeed.page.getDescendantCols(this);
},isStartOfColumnSet:function(){
return this.layoutColumnIndex==0;
},toString:function(){
if(jetspeed.debugColumn){
return jetspeed.debugColumn(this);
}
return "column["+this.pageColumnIndex+"]";
},getId:function(){
return this.id;
},getLayoutId:function(){
return this.layoutId;
},getLayoutColumnIndex:function(){
return this.layoutColumnIndex;
},getSize:function(){
return this.size;
},getPageColumnIndex:function(){
return this.pageColumnIndex;
},getLayoutDepth:function(){
return this.layoutDepth;
},getLayoutMaxChildDepth:function(){
return this.layoutMaxChildDepth;
},layoutDepthChanged:function(){
},_updateLayoutDepth:function(_2a8){
var _2a9=this.layoutDepth;
if(_2a9!=null&&_2a8!=_2a9){
this.layoutDepth=_2a8;
this.layoutDepthChanged();
}
},_updateLayoutChildDepth:function(_2aa){
this.layoutMaxChildDepth=(_2aa==null?0:_2aa);
}});
jetspeed.om.Portlet=function(_2ab,_2ac,_2ad,_2ae,_2af,_2b0,_2b1,_2b2){
this.name=_2ab;
this.entityId=_2ac;
this.properties=_2ae;
this.actions=_2af;
jetspeed.page.setPageModePortletActions(this);
this.currentActionState=_2b0;
this.currentActionMode=_2b1;
if(_2ad){
this.contentRetriever=_2ad;
}
this.layoutActionsDisabled=false;
if(typeof _2b2!="undefined"){
this.layoutActionsDisabled=_2b2;
}
};
dojo.lang.extend(jetspeed.om.Portlet,{name:null,entityId:null,isPortlet:true,pageColumnIndex:null,contentRetriever:new jetspeed.om.PortletContentRetriever(),windowFactory:null,lastSavedWindowState:null,initialize:function(){
var _2b3=jetspeed;
var jsId=_2b3.id;
if(!this.properties[jsId.PP_WIDGET_ID]){
this.properties[jsId.PP_WIDGET_ID]=jsId.PW_ID_PREFIX+this.entityId;
}
if(!this.properties[jsId.PP_CONTENT_RETRIEVER]){
this.properties[jsId.PP_CONTENT_RETRIEVER]=this.contentRetriever;
}
var _2b5=this.properties[jsId.PP_WINDOW_POSITION_STATIC];
if(_2b3.prefs.windowTiling){
if(_2b5=="true"){
_2b5=true;
}else{
if(_2b5=="false"){
_2b5=false;
}else{
if(_2b5!=true&&_2b5!=false){
_2b5=true;
}
}
}
}else{
_2b5=false;
}
this.properties[jsId.PP_WINDOW_POSITION_STATIC]=_2b5;
var _2b6=this.properties[jsId.PP_WINDOW_HEIGHT_TO_FIT];
if(_2b6=="true"){
_2b6=true;
}else{
if(_2b5=="false"){
_2b6=false;
}else{
if(_2b6!=true&&_2b6!=false){
_2b6=true;
}
}
}
this.properties[jsId.PP_WINDOW_HEIGHT_TO_FIT]=_2b6;
var _2b7=this.properties[jsId.PP_WINDOW_TITLE];
if(!_2b7&&this.name){
var re=(/^[^:]*:*/);
_2b7=this.name.replace(re,"");
this.properties[jsId.PP_WINDOW_TITLE]=_2b7;
}
},postParseAnnotateHtml:function(_2b9){
var _2ba=jetspeed;
var _2bb=_2ba.portleturl;
if(_2b9){
var _2bc=_2b9;
var _2bd=_2bc.getElementsByTagName("form");
var _2be=_2ba.debug.postParseAnnotateHtml;
var _2bf=_2ba.debug.postParseAnnotateHtmlDisableAnchors;
if(_2bd){
for(var i=0;i<_2bd.length;i++){
var _2c1=_2bd[i];
var _2c2=_2c1.action;
var _2c3=_2bb.parseContentUrl(_2c2);
var op=_2c3.operation;
var _2c5=(op==_2bb.PORTLET_REQUEST_ACTION||op==_2bb.PORTLET_REQUEST_RENDER);
var _2c6=false;
if(dojo.io.formHasFile(_2c1)){
if(_2c5){
var _2c7=_2ba.url.parse(_2c2);
_2c7=_2ba.url.addQueryParameter(_2c7,"encoder","desktop",true);
_2c7=_2ba.url.addQueryParameter(_2c7,"jsdajax","false",true);
_2c1.action=_2c7.toString();
}else{
_2c6=true;
}
}else{
if(_2c5){
var _2c8=_2bb.genPseudoUrl(_2c3,true);
_2c1.action=_2c8;
var _2c9=new _2ba.om.ActionRenderFormBind(_2c1,_2c3.url,_2c3.portletEntityId,op);
if(_2be){
dojo.debug("postParseAnnotateHtml ["+this.entityId+"] adding FormBind ("+op+") for form with action: "+_2c2);
}
}else{
if(_2c2==null||_2c2.length==0){
var _2c9=new _2ba.om.ActionRenderFormBind(_2c1,null,this.entityId,null);
if(_2be){
dojo.debug("postParseAnnotateHtml ["+this.entityId+"] form action attribute is empty - adding FormBind with expectation that form action will be set via script");
}
}else{
_2c6=true;
}
}
}
if(_2c6&&_2be){
dojo.debug("postParseAnnotateHtml ["+this.entityId+"] form action attribute doesn't match annotation criteria, leaving as is: "+_2c2);
}
}
}
var _2ca=_2bc.getElementsByTagName("a");
if(_2ca){
for(var i=0;i<_2ca.length;i++){
var _2cb=_2ca[i];
var _2cc=_2cb.href;
var _2c3=_2bb.parseContentUrl(_2cc);
var _2cd=null;
if(!_2bf){
_2cd=_2bb.genPseudoUrl(_2c3);
}
if(!_2cd){
if(_2be){
dojo.debug("postParseAnnotateHtml ["+this.entityId+"] leaving href as is: "+_2cc);
}
}else{
if(_2cd==_2cc){
if(_2be){
dojo.debug("postParseAnnotateHtml ["+this.entityId+"] href parsed and regenerated identically: "+_2cc);
}
}else{
if(_2be){
dojo.debug("postParseAnnotateHtml ["+this.entityId+"] href parsed, replacing: "+_2cc+" with: "+_2cd);
}
_2cb.href=_2cd;
}
}
}
}
}
},getPWin:function(){
var _2ce=jetspeed;
var _2cf=this.properties[_2ce.id.PP_WIDGET_ID];
if(_2cf){
return _2ce.page.getPWin(_2cf);
}
return null;
},getCurWinState:function(_2d0){
var _2d1=null;
try{
var _2d2=this.getPWin();
if(!_2d2){
return null;
}
_2d1=_2d2.getCurWinStateForPersist(_2d0);
if(!_2d0){
if(_2d1.layout==null){
_2d1.layout=this.lastSavedWindowState.layout;
}
}
}
catch(e){
dojo.raise("portlet.getCurWinState "+jetspeed.formatError(e));
}
return _2d1;
},getSavedWinState:function(){
if(!this.lastSavedWindowState){
dojo.raise("Portlet not initialized: "+this.name);
}
return this.lastSavedWindowState;
},getInitialWinDims:function(_2d3,_2d4){
var _2d5=jetspeed;
var jsId=_2d5.id;
if(!_2d3){
_2d3={};
}
var _2d7=this.properties[jsId.PP_WINDOW_POSITION_STATIC];
var _2d8=this.properties[jsId.PP_WINDOW_HEIGHT_TO_FIT];
_2d3[jsId.PP_WINDOW_POSITION_STATIC]=_2d7;
_2d3[jsId.PP_WINDOW_HEIGHT_TO_FIT]=_2d8;
var _2d9=this.properties["width"];
if(!_2d4&&_2d9!=null&&_2d9>0){
_2d3.width=Math.floor(_2d9);
}else{
if(_2d4){
_2d3.width=-1;
}
}
var _2da=this.properties["height"];
if(!_2d4&&_2da!=null&&_2da>0){
_2d3.height=Math.floor(_2da);
}else{
if(_2d4){
_2d3.height=-1;
}
}
if(!_2d7||!_2d5.prefs.windowTiling){
var _2db=this.properties["x"];
if(!_2d4&&_2db!=null&&_2db>=0){
_2d3.left=Math.floor(((_2db>0)?_2db:0));
}else{
if(_2d4){
_2d3.left=-1;
}
}
var _2dc=this.properties["y"];
if(!_2d4&&_2dc!=null&&_2dc>=0){
_2d3.top=Math.floor(((_2dc>0)?_2dc:0));
}else{
_2d3.top=-1;
}
var _2dd=this._getInitialZIndex(_2d4);
if(_2dd!=null){
_2d3.zIndex=_2dd;
}
}
return _2d3;
},_initWinState:function(_2de,_2df){
var _2e0=jetspeed;
var _2e1=(_2de?_2de:{});
this.getInitialWinDims(_2e1,_2df);
if(_2e0.debug.initWinState){
var _2e2=this.properties[_2e0.id.PP_WINDOW_POSITION_STATIC];
if(!_2e2||!_2e0.prefs.windowTiling){
dojo.debug("initWinState ["+this.entityId+"] z="+_2e1.zIndex+" x="+_2e1.left+" y="+_2e1.top+" width="+_2e1.width+" height="+_2e1.height);
}else{
dojo.debug("initWinState ["+this.entityId+"] column="+_2e1.column+" row="+_2e1.row+" width="+_2e1.width+" height="+_2e1.height);
}
}
this.lastSavedWindowState=_2e1;
return _2e1;
},_getInitialZIndex:function(_2e3){
var _2e4=null;
var _2e5=this.properties["z"];
if(!_2e3&&_2e5!=null&&_2e5>=0){
_2e4=Math.floor(_2e5);
}else{
if(_2e3){
_2e4=-1;
}
}
return _2e4;
},_getChangedWindowState:function(_2e6){
var jsId=jetspeed.id;
var _2e8=this.getSavedWinState();
if(_2e8&&dojo.lang.isEmpty(_2e8)){
_2e8=null;
_2e6=false;
}
var _2e9=this.getCurWinState(_2e6);
var _2ea=_2e9[jsId.PP_WINDOW_POSITION_STATIC];
var _2eb=!_2ea;
if(!_2e8){
var _2ec={state:_2e9,positionChanged:true,extendedPropChanged:true};
if(_2eb){
_2ec.zIndexChanged=true;
}
return _2ec;
}
var _2ed=false;
var _2ee=false;
var _2ef=false;
var _2f0=false;
for(var _2f1 in _2e9){
if(_2e9[_2f1]!=_2e8[_2f1]){
if(_2f1==jsId.PP_WINDOW_POSITION_STATIC||_2f1==jsId.PP_WINDOW_HEIGHT_TO_FIT){
_2ed=true;
_2ef=true;
_2ee=true;
}else{
if(_2f1=="zIndex"){
if(_2eb){
_2ed=true;
_2f0=true;
}
}else{
_2ed=true;
_2ee=true;
}
}
}
}
if(_2ed){
var _2ec={state:_2e9,positionChanged:_2ee,extendedPropChanged:_2ef};
if(_2eb){
_2ec.zIndexChanged=_2f0;
}
return _2ec;
}
return null;
},getPortletUrl:function(_2f2){
var _2f3=jetspeed;
var _2f4=_2f3.url;
var _2f5=null;
if(_2f2&&_2f2.url){
_2f5=_2f2.url;
}else{
if(_2f2&&_2f2.formNode){
var _2f6=_2f2.formNode.getAttribute("action");
if(_2f6){
_2f5=_2f6;
}
}
}
if(_2f5==null){
_2f5=_2f4.basePortalUrl()+_2f4.path.PORTLET+_2f3.page.getPath();
}
if(!_2f2.dontAddQueryArgs){
_2f5=_2f4.parse(_2f5);
_2f5=_2f4.addQueryParameter(_2f5,"entity",this.entityId,true);
_2f5=_2f4.addQueryParameter(_2f5,"portlet",this.name,true);
_2f5=_2f4.addQueryParameter(_2f5,"encoder","desktop",true);
if(_2f2.jsPageUrl!=null){
var _2f7=_2f2.jsPageUrl.query;
if(_2f7!=null&&_2f7.length>0){
_2f5=_2f5.toString()+"&"+_2f7;
}
}
}
if(_2f2){
_2f2.url=_2f5.toString();
}
return _2f5;
},_submitAjaxApi:function(_2f8,_2f9,_2fa){
var _2fb=jetspeed;
var _2fc="?action="+_2f8+"&id="+this.entityId+_2f9;
var _2fd=_2fb.url.basePortalUrl()+_2fb.url.path.AJAX_API+_2fb.page.getPath()+_2fc;
var _2fe="text/xml";
var _2ff=new _2fb.om.Id(_2f8,this.entityId);
_2ff.portlet=this;
_2fb.url.retrieveContent({url:_2fd,mimetype:_2fe},_2fa,_2ff,_2fb.debugContentDumpIds);
},submitWinState:function(_300,_301){
var _302=jetspeed;
var jsId=_302.id;
if(_302.page.isUA()||(!(_302.page.getPageAction(jsId.ACT_EDIT)||_302.page.getPageAction(jsId.ACT_VIEW)||_302.page.canNPE()))){
return;
}
var _304=null;
if(_301){
_304={state:this._initWinState(null,true)};
}else{
_304=this._getChangedWindowState(_300);
}
if(_304){
var _305=_304.state;
var _306=_305[jsId.PP_WINDOW_POSITION_STATIC];
var _307=_305[jsId.PP_WINDOW_HEIGHT_TO_FIT];
var _308=null;
if(_304.extendedPropChanged){
var _309=jsId.PP_PROP_SEPARATOR;
var _30a=jsId.PP_PAIR_SEPARATOR;
_308=jsId.PP_STATICPOS+_309+_306.toString();
_308+=_30a+jsId.PP_FITHEIGHT+_309+_307.toString();
_308=escape(_308);
}
var _30b="";
var _30c=null;
if(_306){
_30c="moveabs";
if(_305.column!=null){
_30b+="&col="+_305.column;
}
if(_305.row!=null){
_30b+="&row="+_305.row;
}
if(_305.layout!=null){
_30b+="&layoutid="+_305.layout;
}
if(_305.height!=null){
_30b+="&height="+_305.height;
}
}else{
_30c="move";
if(_305.zIndex!=null){
_30b+="&z="+_305.zIndex;
}
if(_305.width!=null){
_30b+="&width="+_305.width;
}
if(_305.height!=null){
_30b+="&height="+_305.height;
}
if(_305.left!=null){
_30b+="&x="+_305.left;
}
if(_305.top!=null){
_30b+="&y="+_305.top;
}
}
if(_308!=null){
_30b+="&"+jsId.PP_DESKTOP_EXTENDED+"="+_308;
}
this._submitAjaxApi(_30c,_30b,new _302.om.MoveApiCL(this,_305));
if(!_300&&!_301){
if(!_306&&_304.zIndexChanged){
var _30d=_302.page.getPortletArray();
if(_30d&&(_30d.length-1)>0){
for(var i=0;i<_30d.length;i++){
var _30f=_30d[i];
if(_30f&&_30f.entityId!=this.entityId){
if(!_30f.properties[_302.id.PP_WINDOW_POSITION_STATIC]){
_30f.submitWinState(true);
}
}
}
}
}else{
if(_306){
}
}
}
}
},retrieveContent:function(_310,_311,_312){
if(_310==null){
_310=new jetspeed.om.PortletCL(this,_312,_311);
}
if(!_311){
_311={};
}
var _313=this;
_313.getPortletUrl(_311);
this.contentRetriever.getContent(_311,_310,_313,jetspeed.debugContentDumpIds);
},setPortletContent:function(_314,_315,_316){
var _317=this.getPWin();
if(_316!=null&&_316.length>0){
this.properties[jetspeed.id.PP_WINDOW_TITLE]=_316;
if(_317&&!this.loadingIndicatorIsShown()){
_317.setPortletTitle(_316);
}
}
if(_317){
_317.setPortletContent(_314,_315);
}
},loadingIndicatorIsShown:function(){
var jsId=jetspeed.id;
var _319=this._getLoadingActionLabel(jsId.ACT_LOAD_RENDER);
var _31a=this._getLoadingActionLabel(jsId.ACT_LOAD_ACTION);
var _31b=this._getLoadingActionLabel(jsId.ACT_LOAD_UPDATE);
var _31c=this.getPWin();
if(_31c&&(_319||_31a)){
var _31d=_31c.getPortletTitle();
if(_31d&&(_31d==_319||_31d==_31a)){
return true;
}
}
return false;
},_getLoadingActionLabel:function(_31e){
var _31f=null;
if(jetspeed.prefs!=null&&jetspeed.prefs.desktopActionLabels!=null){
_31f=jetspeed.prefs.desktopActionLabels[_31e];
if(_31f!=null&&_31f.length==0){
_31f=null;
}
}
return _31f;
},loadingIndicatorShow:function(_320){
if(_320&&!this.loadingIndicatorIsShown()){
var _321=this._getLoadingActionLabel(_320);
var _322=this.getPWin();
if(_322&&_321){
_322.setPortletTitle(_321);
}
}
},loadingIndicatorHide:function(){
var _323=this.getPWin();
if(_323){
_323.setPortletTitle(this.properties[jetspeed.id.PP_WINDOW_TITLE]);
}
},getId:function(){
return this.entityId;
},getProperty:function(name){
return this.properties[name];
},getProperties:function(){
return this.properties;
},renderAction:function(_325,_326){
var _327=jetspeed;
var _328=_327.url;
var _329=null;
if(_325!=null){
_329=this.getAction(_325);
}
var _32a=_326;
if(_32a==null&&_329!=null){
_32a=_329.url;
}
if(_32a==null){
return;
}
var _32b=_328.basePortalUrl()+_328.path.PORTLET+"/"+_32a+_327.page.getPath();
if(_325!=_327.id.ACT_PRINT){
this.retrieveContent(null,{url:_32b});
}else{
var _32c=_327.page.getPageUrl();
_32c=_328.addQueryParameter(_32c,"jsprintmode","true");
_32c=_328.addQueryParameter(_32c,"jsaction",escape(_329.url));
_32c=_328.addQueryParameter(_32c,"jsentity",this.entityId);
_32c=_328.addQueryParameter(_32c,"jslayoutid",this.lastSavedWindowState.layout);
window.open(_32c.toString(),"jsportlet_print","status,scrollbars,resizable,menubar");
}
},getAction:function(name){
if(this.actions==null){
return null;
}
return this.actions[name];
},getCurrentActionState:function(){
return this.currentActionState;
},getCurrentActionMode:function(){
return this.currentActionMode;
},updateActions:function(_32e,_32f,_330){
if(_32e){
this.actions=_32e;
}else{
this.actions={};
}
this.currentActionState=_32f;
this.currentActionMode=_330;
this.syncActions();
},syncActions:function(){
var _331=jetspeed;
_331.page.setPageModePortletActions(this);
var _332=this.getPWin();
if(_332){
_332.actionBtnSync(_331,_331.id);
}
}});
jetspeed.om.ActionRenderFormBind=function(form,url,_335,_336){
dojo.io.FormBind.call(this,{url:url,formNode:form});
this.entityId=_335;
this.submitOperation=_336;
this.formSubmitInProgress=false;
};
dojo.inherits(jetspeed.om.ActionRenderFormBind,dojo.io.FormBind);
dojo.lang.extend(jetspeed.om.ActionRenderFormBind,{init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.eventConfMgr(false);
form.oldSubmit=form.submit;
form.submit=function(){
form.onsubmit();
};
},eventConfMgr:function(_339){
var fn=(_339)?"disconnect":"connect";
var _33b=dojo.event;
var form=this.form;
_33b[fn]("after",form,"onsubmit",this,"submit",null);
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
_33b[fn]("after",node,"onclick",this,"click",null);
}
}
var _33f=form.getElementsByTagName("input");
for(var i=0;i<_33f.length;i++){
var _340=_33f[i];
if(_340.type.toLowerCase()=="image"&&_340.form==form){
_33b[fn]("after",_340,"onclick",this,"click",null);
}
}
var as=form.getElementsByTagName("a");
for(var i=0;i<as.length;i++){
_33b[fn]("before",as[i],"onclick",this,"click",null);
}
},onSubmit:function(_342){
var _343=true;
if(this.isFormSubmitInProgress()){
_343=false;
}else{
if(jetspeed.debug.confirmOnSubmit){
if(!confirm("Click OK to submit.")){
_343=false;
}
}
}
return _343;
},submit:function(e){
if(e){
e.preventDefault();
}
if(this.isFormSubmitInProgress()){
}else{
if(this.onSubmit(this.form)){
var _345=jetspeed.portleturl.parseContentUrl(this.form.action);
var _346={};
if(_345.operation==jetspeed.portleturl.PORTLET_REQUEST_ACTION||_345.operation==jetspeed.portleturl.PORTLET_REQUEST_RENDER){
var _347=jetspeed.portleturl.genPseudoUrl(_345,true);
this.form.action=_347;
this.submitOperation=_345.operation;
this.entityId=_345.portletEntityId;
_346.url=_345.url;
}
if(this.submitOperation==jetspeed.portleturl.PORTLET_REQUEST_RENDER||this.submitOperation==jetspeed.portleturl.PORTLET_REQUEST_ACTION){
this.isFormSubmitInProgress(true);
_346.formFilter=dojo.lang.hitch(this,"formFilter");
_346.submitFormBindObject=this;
if(this.submitOperation==jetspeed.portleturl.PORTLET_REQUEST_RENDER){
jetspeed.doRender(dojo.lang.mixin(this.bindArgs,_346),this.entityId);
}else{
jetspeed.doAction(dojo.lang.mixin(this.bindArgs,_346),this.entityId);
}
}else{
}
}
}
},isFormSubmitInProgress:function(_348){
if(_348!=undefined){
this.formSubmitInProgress=_348;
}
return this.formSubmitInProgress;
}});
jetspeed.om.PortletCL=function(_349,_34a,_34b){
this.portlet=_349;
this.suppressGetActions=_34a;
this.formbind=null;
if(_34b!=null&&_34b.submitFormBindObject!=null){
this.formbind=_34b.submitFormBindObject;
}
this._loading(true);
};
jetspeed.om.PortletCL.prototype={_loading:function(_34c){
if(this.portlet==null){
return;
}
if(_34c){
this.portlet.loadingIndicatorShow(jetspeed.id.ACT_LOAD_RENDER);
}else{
this.portlet.loadingIndicatorHide();
}
},notifySuccess:function(_34d,_34e,_34f,http){
var _351=null;
var _352=(_34d?_34d.indexOf("</JS_PORTLET_HEAD_ELEMENTS>"):-1);
if(_352!=-1){
_352+="</JS_PORTLET_HEAD_ELEMENTS>".length;
_351=_34d.substring(0,_352);
_34d=_34d.substring(_352);
var _353=/^<JS_PORTLET_HEAD_ELEMENTS>\s*<\/JS_PORTLET_HEAD_ELEMENTS>$/;
if(!_353.test(_351)){
jetspeed.contributeHeadElements(dojo.dom.createDocumentFromText(_351).documentElement);
}
}
var _354=null;
if(http!=null){
try{
_354=http.getResponseHeader("JS_PORTLET_TITLE");
}
catch(ignore){
}
if(_354!=null){
_354=unescape(_354);
}
}
_34f.setPortletContent(_34d,_34e,_354);
if(this.suppressGetActions==null||this.suppressGetActions==false){
jetspeed.getActionsForPortlet(_34f.getId());
}else{
this._loading(false);
}
if(this.formbind!=null){
this.formbind.isFormSubmitInProgress(false);
}
},notifyFailure:function(type,_356,_357,_358){
this._loading(false);
if(this.formbind!=null){
this.formbind.isFormSubmitInProgress(false);
}
dojo.raise("PortletCL notifyFailure url: "+_357+" type: "+type+jetspeed.formatError(_356));
}};
jetspeed.om.PortletActionCL=function(_359,_35a){
this.portlet=_359;
this.formbind=null;
if(_35a!=null&&_35a.submitFormBindObject!=null){
this.formbind=_35a.submitFormBindObject;
}
this._loading(true);
};
jetspeed.om.PortletActionCL.prototype={_loading:function(_35b){
if(this.portlet==null){
return;
}
if(_35b){
this.portlet.loadingIndicatorShow(jetspeed.id.ACT_LOAD_ACTION);
}else{
this.portlet.loadingIndicatorHide();
}
},notifySuccess:function(_35c,_35d,_35e,http){
var _360=jetspeed;
var _361=null;
var _362=false;
var _363=_360.portleturl.parseContentUrl(_35c);
if(_363.operation==_360.portleturl.PORTLET_REQUEST_ACTION||_363.operation==_360.portleturl.PORTLET_REQUEST_RENDER){
if(_360.debug.doRenderDoAction){
dojo.debug("PortletActionCL "+_363.operation+"-url in response body: "+_35c+"  url: "+_363.url+" entity-id: "+_363.portletEntityId);
}
_361=_363.url;
}else{
if(_360.debug.doRenderDoAction){
dojo.debug("PortletActionCL other-url in response body: "+_35c);
}
_361=_35c;
if(_361){
var _364=_361.indexOf(_360.url.basePortalUrl()+_360.url.path.PORTLET);
if(_364==-1){
_362=true;
window.location.href=_361;
_361=null;
}else{
if(_364>0){
this._loading(false);
dojo.raise("Cannot interpret portlet url in action response: "+_35c);
_361=null;
}
}
}
}
if(_361!=null&&!_360.noActionRender){
if(_360.debug.doRenderDoAction){
dojo.debug("PortletActionCL starting portlet-renderer with renderUrl="+_361);
}
var _365=new jetspeed.PortletRenderer(false,false,false,_361,true);
_365.renderAll();
}else{
this._loading(false);
}
if(!_362&&this.portlet){
_360.getActionsForPortlet(this.portlet.entityId);
}
if(this.formbind!=null){
this.formbind.isFormSubmitInProgress(false);
}
},notifyFailure:function(type,_367,_368,_369){
this._loading(false);
if(this.formbind!=null){
this.formbind.isFormSubmitInProgress(false);
}
dojo.raise("PortletActionCL notifyFailure type: "+type+jetspeed.formatError(_367));
}};
jetspeed.om.MenuOption=function(){
};
dojo.lang.extend(jetspeed.om.MenuOption,{navigateTo:function(){
if(this.isLeaf()){
var _36a=this.getUrl();
if(_36a){
var _36b=jetspeed;
if(!_36b.prefs.ajaxPageNavigation||_36b.url.urlStartsWithHttp(_36a)){
_36b.pageNavigate(_36a,this.getTarget());
}else{
_36b.updatePage(_36a);
}
}
}
},navigateUrl:function(){
return jetspeed.page.makePageUrl(this.getUrl());
},getType:function(){
return this.type;
},getTitle:function(){
return this.title;
},getShortTitle:function(){
return this["short-title"];
},getSkin:function(){
return this.skin;
},getUrl:function(){
return this.url;
},getTarget:function(){
return this.target;
},getHidden:function(){
return this.hidden;
},getSelected:function(){
return this.selected;
},getText:function(){
return this.text;
},isLeaf:function(){
return true;
},isMenu:function(){
return false;
},isSeparator:function(){
return false;
}});
jetspeed.om.MenuOptionSeparator=function(){
};
dojo.inherits(jetspeed.om.MenuOptionSeparator,jetspeed.om.MenuOption);
dojo.lang.extend(jetspeed.om.MenuOptionSeparator,{isSeparator:function(){
return true;
}});
jetspeed.om.Menu=function(_36c,_36d){
this._is_parsed=false;
this.name=_36c;
this.type=_36d;
};
dojo.inherits(jetspeed.om.Menu,jetspeed.om.MenuOption);
dojo.lang.extend(jetspeed.om.Menu,{setParsed:function(){
this._is_parsed=true;
},isParsed:function(){
return this._is_parsed;
},getName:function(){
return this.name;
},addOption:function(_36e){
if(!_36e){
return;
}
if(!this.options){
this.options=new Array();
}
this.options.push(_36e);
},getOptions:function(){
var tAry=new Array();
return (this.options?tAry.concat(this.options):tAry);
},getOptionByIndex:function(_370){
if(!this.hasOptions()){
return null;
}
if(_370==0||_370>0){
if(_370>=this.options.length){
dojo.raise("Menu.getOptionByIndex index out of bounds");
}else{
return this.options[_370];
}
}
},hasOptions:function(){
return ((this.options&&this.options.length>0)?true:false);
},isMenu:function(){
return true;
},isLeaf:function(){
return false;
},hasNestedMenus:function(){
if(!this.options){
return false;
}
for(var i=0;i<this.options.length;i++){
var _372=this.options[i];
if(_372 instanceof jetspeed.om.Menu){
return true;
}
}
return false;
}});
jetspeed.om.MenuApiCL=function(){
};
dojo.lang.extend(jetspeed.om.MenuApiCL,{notifySuccess:function(data,_374,_375){
var _376=this.parseMenu(data,_375.menuName,_375.menuType);
_375.page.putMenu(_376);
},notifyFailure:function(type,_378,_379,_37a){
this.notifyCount++;
dojo.raise("MenuApiCL error ["+_37a.toString()+"] url: "+_379+" type: "+type+jetspeed.formatError(_378));
},parseMenu:function(node,_37c,_37d){
var menu=null;
var _37f=node.getElementsByTagName("js");
if(!_37f||_37f.length>1){
dojo.raise("Expected one <js> in menu xml");
}
var _380=_37f[0].childNodes;
for(var i=0;i<_380.length;i++){
var _382=_380[i];
if(_382.nodeType!=1){
continue;
}
var _383=_382.nodeName;
if(_383=="menu"){
if(menu!=null){
dojo.raise("Expected one root <menu> in menu xml");
}
menu=this.parseMenuObject(_382,new jetspeed.om.Menu());
}
}
if(menu!=null){
if(menu.name==null){
menu.name==_37c;
}
if(menu.type==null){
menu.type=_37d;
}
}
return menu;
},parseMenuObject:function(node,mObj){
var _386=null;
var _387=node.childNodes;
for(var i=0;i<_387.length;i++){
var _389=_387[i];
if(_389.nodeType!=1){
continue;
}
var _38a=_389.nodeName;
if(_38a=="menu"){
if(mObj.isLeaf()){
dojo.raise("Unexpected nested <menu>");
}else{
mObj.addOption(this.parseMenuObject(_389,new jetspeed.om.Menu()));
}
}else{
if(_38a=="option"){
if(mObj.isLeaf()){
dojo.raise("Unexpected nested <option>");
}else{
mObj.addOption(this.parseMenuObject(_389,new jetspeed.om.MenuOption()));
}
}else{
if(_38a=="separator"){
if(mObj.isLeaf()){
dojo.raise("Unexpected nested <separator>");
}else{
mObj.addOption(this.parseMenuObject(_389,new jetspeed.om.MenuOptionSeparator()));
}
}else{
if(_38a){
mObj[_38a]=((_389&&_389.firstChild)?_389.firstChild.nodeValue:null);
}
}
}
}
}
if(mObj.setParsed){
mObj.setParsed();
}
return mObj;
}});
jetspeed.om.MenusApiCL=function(_38b,_38c,_38d){
this.includeMenuDefs=_38b;
this.isPageUpdate=_38c;
this.initEditModeConf=_38d;
};
dojo.inherits(jetspeed.om.MenusApiCL,jetspeed.om.MenuApiCL);
dojo.lang.extend(jetspeed.om.MenusApiCL,{notifySuccess:function(data,_38f,_390){
var _391=this.getMenuDefs(data,_38f,_390);
for(var i=0;i<_391.length;i++){
var mObj=_391[i];
_390.page.putMenu(mObj);
}
this.notifyFinished(_390);
},getMenuDefs:function(data,_395,_396){
var _397=[];
var _398=data.getElementsByTagName("menu");
for(var i=0;i<_398.length;i++){
var _39a=_398[i].getAttribute("type");
if(this.includeMenuDefs){
_397.push(this.parseMenuObject(_398[i],new jetspeed.om.Menu(null,_39a)));
}else{
var _39b=_398[i].firstChild.nodeValue;
_397.push(new jetspeed.om.Menu(_39b,_39a));
}
}
return _397;
},notifyFailure:function(type,_39d,_39e,_39f){
dojo.raise("MenusApiCL error ["+_39f.toString()+"] url: "+_39e+" type: "+type+jetspeed.formatError(_39d));
},notifyFinished:function(_3a0){
var _3a1=jetspeed;
if(this.includeMenuDefs){
_3a1.notifyRetrieveAllMenusFinished(this.isPageUpdate,this.initEditModeConf);
}
_3a1.page.loadPostRetrieveMenus(this.isPageUpdate,this.initEditModeConf);
if(djConfig.isDebug&&_3a1.debug.profile){
dojo.profile.end("loadFromPSML");
if(!this.isPageUpdate){
dojo.profile.end("initializeDesktop");
}else{
dojo.profile.end("updatePage");
}
dojo.profile.debugAllItems(true);
dojo.debug("-------------------------");
}
}});
jetspeed.om.PortletChangeActionCL=function(_3a2){
this.portletEntityId=_3a2;
this._loading(true);
};
dojo.lang.extend(jetspeed.om.PortletChangeActionCL,{notifySuccess:function(data,_3a4,_3a5){
if(jetspeed.url.checkAjaxApiResponse(_3a4,data,null,true,"portlet-change-action")){
jetspeed.getActionsForPortlet(this.portletEntityId);
}else{
this._loading(false);
}
},_loading:function(_3a6){
var _3a7=jetspeed.page.getPortlet(this.portletEntityId);
if(_3a7){
if(_3a6){
_3a7.loadingIndicatorShow(jetspeed.id.ACT_LOAD_UPDATE);
}else{
_3a7.loadingIndicatorHide();
}
}
},notifyFailure:function(type,_3a9,_3aa,_3ab){
this._loading(false);
dojo.raise("PortletChangeActionCL error ["+_3ab.toString()+"] url: "+_3aa+" type: "+type+jetspeed.formatError(_3a9));
}});
jetspeed.om.PageChangeActionCL=function(_3ac){
this.pageActionUrl=_3ac;
};
dojo.lang.extend(jetspeed.om.PageChangeActionCL,{notifySuccess:function(data,_3ae,_3af){
if(jetspeed.url.checkAjaxApiResponse(_3ae,data,null,true,"page-change-action")){
if(this.pageActionUrl!=null&&this.pageActionUrl.length>0){
jetspeed.pageNavigate(this.pageActionUrl);
}
}
},notifyFailure:function(type,_3b1,_3b2,_3b3){
dojo.raise("PageChangeActionCL error ["+_3b3.toString()+"] url: "+_3b2+" type: "+type+jetspeed.formatError(_3b1));
}});
jetspeed.om.UserInfoCL=function(){
};
dojo.lang.extend(jetspeed.om.UserInfoCL,{notifySuccess:function(data,_3b5,_3b6){
var _3b7=jetspeed;
if(_3b7.url.checkAjaxApiResponse(_3b5,data,null,false,"user-info")){
var _3b8=data.getElementsByTagName("js");
if(_3b8&&_3b8.length==1){
var root=_3b8[0];
var un=_3b7.page._parsePSMLChildOrAttr(root,"username");
var rMap={};
var _3bc=root.getElementsByTagName("role");
if(_3bc!=null){
for(var i=0;i<_3bc.length;i++){
var role=(_3bc[i].firstChild?_3bc[i].firstChild.nodeValue:null);
if(role){
rMap[role]=role;
}
}
}
_3b7.page._setU({un:un,r:rMap});
}
}
},notifyFailure:function(type,_3c0,_3c1,_3c2){
dojo.raise("UserInfoCL error ["+_3c2.toString()+"] url: "+_3c1+" type: "+type+jetspeed.formatError(_3c0));
}});
jetspeed.om.PortletActionsCL=function(_3c3){
this.portletEntityIds=_3c3;
this._loading(true);
};
dojo.lang.extend(jetspeed.om.PortletActionsCL,{_loading:function(_3c4){
if(this.portletEntityIds==null||this.portletEntityIds.length==0){
return;
}
for(var i=0;i<this.portletEntityIds.length;i++){
var _3c6=jetspeed.page.getPortlet(this.portletEntityIds[i]);
if(_3c6){
if(_3c4){
_3c6.loadingIndicatorShow(jetspeed.id.ACT_LOAD_UPDATE);
}else{
_3c6.loadingIndicatorHide();
}
}
}
},notifySuccess:function(data,_3c8,_3c9){
var _3ca=jetspeed;
this._loading(false);
if(_3ca.url.checkAjaxApiResponse(_3c8,data,null,true,"portlet-actions")){
this.processPortletActionsResponse(data,_3ca.page);
}
},processPortletActionsResponse:function(node,_3cc){
var _3cd=this.parsePortletActionsResponse(node,_3cc);
for(var i=0;i<_3cd.length;i++){
var _3cf=_3cd[i];
var _3d0=_3cf.id;
var _3d1=_3cc.getPortlet(_3d0);
if(_3d1!=null){
_3d1.updateActions(_3cf.actions,_3cf.currentActionState,_3cf.currentActionMode);
}
}
},parsePortletActionsResponse:function(node,_3d3){
var _3d4=new Array();
var _3d5=node.getElementsByTagName("js");
if(!_3d5||_3d5.length>1){
dojo.raise("Expected one <js> in portlet selector xml");
return _3d4;
}
var _3d6=_3d5[0].childNodes;
for(var i=0;i<_3d6.length;i++){
var _3d8=_3d6[i];
if(_3d8.nodeType!=1){
continue;
}
var _3d9=_3d8.nodeName;
if(_3d9=="portlets"){
var _3da=_3d8;
var _3db=_3da.childNodes;
for(var pI=0;pI<_3db.length;pI++){
var _3dd=_3db[pI];
if(_3dd.nodeType!=1){
continue;
}
var _3de=_3dd.nodeName;
if(_3de=="portlet"){
var _3df=this.parsePortletElement(_3dd,_3d3);
if(_3df!=null){
_3d4.push(_3df);
}
}
}
}
}
return _3d4;
},parsePortletElement:function(node,_3e1){
var _3e2=node.getAttribute("id");
if(_3e2!=null){
var _3e3=_3e1._parsePSMLActions(node,null);
var _3e4=_3e1._parsePSMLChildOrAttr(node,"state");
var _3e5=_3e1._parsePSMLChildOrAttr(node,"mode");
return {id:_3e2,actions:_3e3,currentActionState:_3e4,currentActionMode:_3e5};
}
return null;
},notifyFailure:function(type,_3e7,_3e8,_3e9){
this._loading(false);
dojo.raise("PortletActionsCL error ["+_3e9.toString()+"] url: "+_3e8+" type: "+type+jetspeed.formatError(_3e7));
}});
jetspeed.om.MoveApiCL=function(_3ea,_3eb){
this.portlet=_3ea;
this.changedState=_3eb;
this._loading(true);
};
jetspeed.om.MoveApiCL.prototype={_loading:function(_3ec){
if(this.portlet==null){
return;
}
if(_3ec){
this.portlet.loadingIndicatorShow(jetspeed.id.ACT_LOAD_UPDATE);
}else{
this.portlet.loadingIndicatorHide();
}
},notifySuccess:function(data,_3ee,_3ef){
var _3f0=jetspeed;
this._loading(false);
dojo.lang.mixin(_3ef.portlet.lastSavedWindowState,this.changedState);
var _3f1=true;
if(djConfig.isDebug&&_3f0.debug.submitWinState){
_3f1=true;
}
var _3f2=_3f0.url.checkAjaxApiResponse(_3ee,data,["refresh"],_3f1,("move-portlet ["+_3ef.portlet.entityId+"]"),_3f0.debug.submitWinState);
if(_3f2=="refresh"){
var _3f3=_3f0.page.getPageUrl();
if(!_3f0.prefs.ajaxPageNavigation){
_3f0.pageNavigate(_3f3,null,true);
}else{
_3f0.updatePage(_3f3,false,true);
}
}
},notifyFailure:function(type,_3f5,_3f6,_3f7){
this._loading(false);
dojo.debug("submitWinState error ["+_3f7.entityId+"] url: "+_3f6+" type: "+type+jetspeed.formatError(_3f5));
}};
jetspeed.postload_addEventListener=function(node,_3f9,fnc,_3fb){
if((_3f9=="load"||_3f9=="DOMContentLoaded"||_3f9=="domready")&&(node==window||node==document||node==document.body)){
fnc();
}else{
node.addEventListener(_3f9,fnc,_3fb);
}
};
jetspeed.postload_attachEvent=function(node,_3fd,fnc){
if(_3fd=="onload"&&(node==window||node==document||node==document.body)){
fnc();
}else{
node.attachEvent(_3fd,fnc);
}
};
jetspeed.postload_docwrite=function(_3ff){
if(!_3ff){
return;
}
_3ff=_3ff.replace(/^\s+|\s+$/g,"");
var _400=/^<script\b([^>]*)>.*?<\/script>/i;
var _401=_400.exec(_3ff);
if(_401){
_3ff=null;
var _402=_401[1];
if(_402){
var _403=/\bid\s*=\s*([^\s]+)/i;
var _404=_403.exec(_402);
if(_404){
var _405=_404[1];
_3ff="<img id="+_405+" src=\""+jetspeed.url.basePortalDesktopUrl()+"/javascript/jetspeed/desktop/pixel.gif"+"\"/>";
}
}
}
var tn=null;
if(_3ff){
var _407=dojo;
tn=_407.doc().createElement("div");
tn.style.visibility="hidden";
_407.body().appendChild(tn);
tn.innerHTML=_3ff;
tn.style.display="none";
}
return tn;
};
jetspeed.setdoclocation=function(_408,_409,_40a){
if(_408==document||_408==window){
if(_40a&&_40a.length>0){
var _40b=jetspeed.portleturl;
if(_40a.indexOf(_40b.DESKTOP_ACTION_PREFIX_URL)!=0&&_40a.indexOf(_40b.DESKTOP_RENDER_PREFIX_URL)!=0){
_408.location=_40a;
}
}
}else{
if(_408!=null){
var _40c=_409.indexOf(".");
if(_40c==-1){
_408[_409]=_40a;
}else{
var _40d=_409.substring(0,_40c);
var _40e=_408[_40d];
if(_40e){
var _40f=_409.substring(_40c+1);
if(_40f){
_40e[_40f]=_40a;
}
}
}
}
}
};
jetspeed.addDummyScriptToHead=function(src){
var _411=document.createElement("script");
_411.setAttribute("type","text/plain");
_411.setAttribute("language","ignore");
_411.setAttribute("src",src);
document.getElementsByTagName("head")[0].appendChild(_411);
return _411;
};
jetspeed.containsElement=function(_412,_413,_414,_415){
if(!_412||!_413||!_414){
return false;
}
if(!_415){
_415=document;
}
var _416=_415.getElementsByTagName(_412);
if(!_416){
return false;
}
for(var i=0;i<_416.length;++i){
var _418=_416[i].getAttribute(_413);
if(_418==_414){
return true;
}
}
return false;
};
jetspeed.ui={initCssObj:function(){
var _419=["display: ","block",";"," cursor: ","default",";"," width: ","","",";","","",""];
var _41a=_419.concat([" height: ","","",";"]);
var _41b=["","","","","","","width: ","","",";","","",""," height: ","","",";"];
var _41c=_41a.concat([" overflow-y: ","",";"," overflow-x: ","hidden",";"]);
var _41d=_41c.concat([" position: ","relative",";"," top: ","auto","",";"," left: ","auto","",";"," z-index: ","",";"]);
jetspeed.css={cssBase:_419,cssHeight:_41a,cssWidthHeight:_41b,cssOverflow:_41c,cssPosition:_41d,cssDis:1,cssCur:4,cssW:7,cssWU:8,cssNoSelNm:10,cssNoSel:11,cssNoSelEnd:12,cssH:14,cssHU:15,cssOy:18,cssOx:21,cssPos:24,cssT:27,cssTU:28,cssL:31,cssLU:32,cssZIndex:35};
},getPWinAndColChildren:function(_41e,_41f,_420,_421,_422,_423){
var djH=dojo.html;
var jsId=jetspeed.id;
var _426=null;
var _427=-1;
var _428=-1;
var _429=-1;
if(_41e){
var _42a=_41e.childNodes;
if(_42a){
_429=_42a.length;
}
_426=[];
if(_429>0){
var _42b="",_42c="";
if(!_423){
_42b=jsId.PWIN_CLASS;
}
if(_420){
_42b+=((_42b.length>0)?"|":"")+jsId.PWIN_GHOST_CLASS;
}
if(_421){
_42b+=((_42b.length>0)?"|":"")+jsId.COL_CLASS;
}
if(_422&&!_421){
_42b+=((_42b.length>0)?"|":"")+jsId.COL_LAYOUTHEADER_CLASS;
}
if(_421&&!_422){
_42c=((_42c.length>0)?"|":"")+jsId.COL_LAYOUTHEADER_CLASS;
}
if(_42b.length>0){
var _42d=new RegExp("(^|\\s+)("+_42b+")(\\s+|$)");
var _42e=null;
if(_42c.length>0){
_42e=new RegExp("(^|\\s+)("+_42c+")(\\s+|$)");
}
var _42f,_430,_431;
for(var i=0;i<_429;i++){
_42f=_42a[i];
_430=false;
_431=djH.getClass(_42f);
if(_42d.test(_431)&&(_42e==null||!_42e.test(_431))){
_426.push(_42f);
_430=true;
}
if(_41f&&_42f==_41f){
if(!_430){
_426.push(_42f);
}
_427=i;
_428=_426.length-1;
}
}
}
}
}
return {matchingNodes:_426,totalNodes:_429,matchNodeIndex:_427,matchNodeIndexInMatchingNodes:_428};
},getPWinsFromNodes:function(_433){
var _434=jetspeed.page;
var _435=null;
if(_433){
_435=new Array();
for(var i=0;i<_433.length;i++){
var _437=_434.getPWin(_433[i].id);
if(_437){
_435.push(_437);
}
}
}
return _435;
},createPortletWindow:function(_438,_439,_43a){
var _43b=false;
if(djConfig.isDebug&&_43a.debug.profile){
_43b=true;
dojo.profile.start("createPortletWindow");
}
var _43c=(_439!=null);
var _43d=false;
var _43e=null;
if(_43c&&_439<_43a.page.columns.length&&_439>=0){
_43e=_43a.page.columns[_439].domNode;
}
if(_43e==null){
_43d=true;
_43e=document.getElementById(_43a.id.DESKTOP);
}
if(_43e==null){
return;
}
var _43f={};
if(_438.isPortlet){
_43f.portlet=_438;
if(_43a.prefs.printModeOnly!=null){
_43f.printMode=true;
}
if(_43d){
_438.properties[_43a.id.PP_WINDOW_POSITION_STATIC]=false;
}
}else{
var pwP=_43a.widget.PortletWindow.prototype.altInitParamsDef(_43f,_438);
if(_43d){
pwP.altInitParams[_43a.id.PP_WINDOW_POSITION_STATIC]=false;
}
}
var _441=new _43a.widget.PortletWindow();
_441.build(_43f,_43e);
if(_43b){
dojo.profile.end("createPortletWindow");
}
return _441;
},getLayoutExtents:function(node,_443,_444,_445){
if(!_443){
_443=_444.gcs(node);
}
var pad=_444._getPadExtents(node,_443);
var _447=_444._getBorderExtents(node,_443);
var _448={l:(pad.l+_447.l),t:(pad.t+_447.t),w:(pad.w+_447.w),h:(pad.h+_447.h)};
var _449=_444._getMarginExtents(node,_443,_445);
return {bE:_447,pE:pad,pbE:_448,mE:_449,lessW:(_448.w+_449.w),lessH:(_448.h+_449.h)};
},getContentBoxSize:function(node,_44b){
var w=node.clientWidth,h,_44e;
if(!w){
w=node.offsetWidth,h=node.offsetHeight;
_44e=_44b.pbE;
}else{
h=node.clientHeight;
_44e=_44b.pE;
}
return {w:(w-_44e.w),h:(h-_44e.h)};
},getMarginBoxSize:function(node,_450){
return {w:(node.offsetWidth+_450.mE.w),h:(node.offsetHeight+_450.mE.h)};
},getMarginBox:function(node,_452,_453,_454){
var l=node.offsetLeft-_452.mE.l,t=node.offsetTop-_452.mE.t;
if(_453&&_454.UAope){
l-=_453.bE.l;
t-=_453.bE.t;
}
return {l:l,t:t,w:(node.offsetWidth+_452.mE.w),h:(node.offsetHeight+_452.mE.h)};
},setMarginBox:function(node,_458,_459,_45a,_45b,_45c,_45d,_45e){
var pb=_45c.pbE,mb=_45c.mE;
if(_45a!=null&&_45a>=0){
_45a=Math.max(_45a-pb.w-mb.w,0);
}
if(_45b!=null&&_45b>=0){
_45b=Math.max(_45b-pb.h-mb.h,0);
}
_45e._setBox(node,_458,_459,_45a,_45b);
},evtConnect:function(_461,_462,_463,_464,_465,_466,rate){
if(!rate){
rate=0;
}
var _468={adviceType:_461,srcObj:_462,srcFunc:_463,adviceObj:_464,adviceFunc:_465,rate:rate};
if(_466==null){
_466=dojo.event;
}
_466.connect(_468);
return _468;
},evtDisconnect:function(_469,_46a,_46b,_46c,_46d,_46e){
if(_46e==null){
_46e=dojo.event;
}
_46e.disconnect({adviceType:_469,srcObj:_46a,srcFunc:_46b,adviceObj:_46c,adviceFunc:_46d});
},evtDisconnectWObj:function(_46f,_470){
if(_470==null){
_470=dojo.event;
}
_470.disconnect(_46f);
},evtDisconnectWObjAry:function(_471,_472){
if(_471&&_471.length>0){
if(_472==null){
_472=dojo.event;
}
for(var i=0;i<_471.length;i++){
_472.disconnect(_471[i]);
}
}
},_popupMenuWidgets:[],isWindowActionMenuOpen:function(){
var _474=false;
var _475=this._popupMenuWidgets;
for(var i=0;i<_475.length;i++){
var _477=_475[i];
if(_477&&_477.isShowingNow){
_474=true;
break;
}
}
return _474;
},addPopupMenuWidget:function(_478){
if(_478){
this._popupMenuWidgets.push(_478);
}
},removePopupMenuWidget:function(_479){
if(!_479){
return;
}
var _47a=this._popupMenuWidgets;
for(var i=0;i<_47a.length;i++){
if(_47a[i]===_479){
_47a[i]=null;
}
}
},updateChildColInfo:function(_47c,_47d,_47e,_47f,_480,_481){
var _482=jetspeed;
var _483=dojo;
var _484=_483.byId(_482.id.COLUMNS);
if(!_484){
return;
}
var _485=false;
if(_47c!=null){
var _486=_47c.getAttribute("columnindex");
var _487=_47c.getAttribute("layoutid");
var _488=(_486==null?-1:new Number(_486));
if(_488>=0&&_487!=null&&_487.length>0){
_485=true;
}
}
var _489=_482.page.columns||[];
var _48a=new Array(_489.length);
var _48b=_482.page.layoutInfo;
var fnc=_482.ui._updateChildColInfo;
fnc(fnc,_484,1,_48a,_489,_47d,_47e,_47f,_48b,_48b.columns,_48b.desktop,_47c,_485,_480,_481,_483,_482);
return _48a;
},_updateChildColInfo:function(fnc,_48e,_48f,_490,_491,_492,_493,_494,_495,_496,_497,_498,_499,_49a,_49b,_49c,_49d){
var _49e=_48e.childNodes;
var _49f=(_49e?_49e.length:0);
if(_49f==0){
return;
}
var _4a0=_49c.html.getAbsolutePosition(_48e,true);
var _4a1=_49d.ui.getMarginBox(_48e,_496,_497,_49d);
var _4a2=_495.column;
var _4a3,col,_4a5,_4a6,_4a7,_4a8,_4a9,_4aa,_4ab,_4ac,_4ad,_4ae,_4af,_4b0;
var _4b1=null,_4b2=(_49a!=null?(_49a+1):null),_4b3,_4b4;
var _4b5=null;
for(var i=0;i<_49f;i++){
_4a3=_49e[i];
_4a6=_4a3.getAttribute("columnindex");
_4a7=(_4a6==null?-1:new Number(_4a6));
if(_4a7>=0){
col=_491[_4a7];
_4b0=true;
_4a5=(col?col.layoutActionsDisabled:false);
_4a8=_4a3.getAttribute("layoutid");
_4a9=(_4a8!=null&&_4a8.length>0);
_4b3=_4b2;
_4b4=null;
_4a5=((!_494)&&_4a5);
var _4b7=_48f;
var _4b8=(_4a3===_498);
if(_4a9){
if(_4b5==null){
_4b5=_48f;
}
if(col){
col._updateLayoutDepth(_48f);
}
_4b7++;
}else{
if(!_4b8){
if(col&&(!_4a5||_494)&&(_492==null||_492[_4a7]==null)&&(_493==null||_48f<=_493)){
_4aa=_49d.ui.getMarginBox(_4a3,_4a2,_496,_49d);
if(_4b1==null){
_4b1=_4aa.t-_4a1.t;
_4af=_4a1.h-_4b1;
}
_4ab=_4a0.left+(_4aa.l-_4a1.l);
_4ac=_4a0.top+_4b1;
_4ad=_4aa.h;
if(_4ad<_4af){
_4ad=_4af;
}
if(_4ad<40){
_4ad=40;
}
var _4b9=_4a3.childNodes;
_4ae={left:_4ab,top:_4ac,right:(_4ab+_4aa.w),bottom:(_4ac+_4ad),childCount:(_4b9?_4b9.length:0),pageColIndex:_4a7};
_4ae.height=_4ae.bottom-_4ae.top;
_4ae.width=_4ae.right-_4ae.left;
_4ae.yhalf=_4ae.top+(_4ae.height/2);
_490[_4a7]=_4ae;
_4b0=(_4ae.childCount>0);
if(_4b0){
_4a3.style.height="";
}else{
_4a3.style.height="1px";
}
if(_49a!=null){
_4b4=(_49d.debugDims(_4ae,true)+" yhalf="+_4ae.yhalf+(_4aa.h!=_4ad?(" hreal="+_4aa.h):"")+" childC="+_4ae.childCount+"}");
}
}
}
}
if(_49a!=null){
if(_4a9){
_4b3=_4b2+1;
}
if(_4b4==null){
_4b4="---";
}
_49c.hostenv.println(_49c.string.repeat(_49b,_49a)+"["+((_4a7<10?" ":"")+_4a6)+"] "+_4b4);
}
if(_4b0){
var _4ba=fnc(fnc,_4a3,_4b7,_490,_491,_492,_493,_494,_495,(_4a9?_495.columnLayoutHeader:_4a2),_496,_498,_499,_4b3,_49b,_49c,_49d);
if(_4ba!=null&&(_4b5==null||_4ba>_4b5)){
_4b5=_4ba;
}
}
}
}
_4a6=_48e.getAttribute("columnindex");
_4a8=_48e.getAttribute("layoutid");
_4a7=(_4a6==null?-1:new Number(_4a6));
if(_4a7>=0&&_4a8!=null&&_4a8.length>0){
col=_491[_4a7];
col._updateLayoutChildDepth(_4b5);
}
return _4b5;
},getScrollbar:function(_4bb){
var _4bc=_4bb.ui.scrollWidth;
if(_4bc==null){
var _4bd=document.createElement("div");
var _4be="width: 100px; height: 100px; top: -300px; left: 0px; overflow: scroll; position: absolute";
_4bd.style.cssText=_4be;
var test=document.createElement("div");
_4bd.style.cssText="width: 400px; height: 400px";
_4bd.appendChild(test);
var _4c0=_4bb.docBody;
_4c0.appendChild(_4bd);
_4bc=_4bd.offsetWidth-_4bd.clientWidth;
_4c0.removeChild(_4bd);
_4bd.removeChild(test);
_4bd=test=null;
_4bb.ui.scrollWidth=_4bc;
}
return _4bc;
}};
jetspeed.ui.windowResizeMgr={checkTime:500,timerId:0,resizing:false,init:function(win,_4c2){
this.oldXY=this.getWinDims(win,win.document,_4c2);
},getWinDims:function(win,doc,_4c5){
var b,x,y,sx,sy,v;
x=y=sx=sy=0;
if(win.innerWidth&&win.innerHeight){
x=win.innerWidth;
v=_4c5.offsetWidth;
if(v&&(1<v)&&!(x<v)){
x=v-1;
}
y=win.innerHeight;
sx=win.pageXOffset||0;
sy=win.pageYOffset||0;
}else{
b=doc.documentElement.clientWidth?doc.documentElement:_4c5;
if(b){
x=b.clientWidth||0;
y=b.clientHeight||0;
sx=b.scrollLeft||0;
sy=b.scrollTop||0;
}
}
return {x:x,y:y,sx:sx,sy:sy};
},onResize:function(){
if(this.timerId){
window.clearTimeout(this.timerId);
}
this.timerId=dojo.lang.setTimeout(this,this.onResizeDelayedCompare,this.checkTime);
},onResizeDelayedCompare:function(){
var _4cc=jetspeed;
var _4cd=this.getWinDims(window,window.document,_4cc.docBody);
this.timerId=0;
if((_4cd.x!=this.oldXY.x)||(_4cd.y!=this.oldXY.y)){
this.oldXY=_4cd;
if(_4cc.page){
if(!this.resizing){
try{
this.resizing=true;
_4cc.page.onBrowserWindowResize();
}
catch(e){
}
finally{
this.resizing=false;
}
}
}
}
}};
jetspeed.ui.swfobject=function(){
var _4ce=jetspeed;
var _4cf=null;
var _4d0=false;
var ua=function(){
var _4d2=[0,0,0];
var d=null;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
d=navigator.plugins["Shockwave Flash"].description;
if(d){
d=d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
_4d2[0]=parseInt(d.replace(/^(.*)\..*$/,"$1"),10);
_4d2[1]=parseInt(d.replace(/^.*\.(.*)\s.*$/,"$1"),10);
_4d2[2]=/r/.test(d)?parseInt(d.replace(/^.*r(.*)$/,"$1"),10):0;
}
}else{
if(typeof window.ActiveXObject!="undefined"){
var a=null;
var _4d5=false;
try{
a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
}
catch(e){
try{
a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
_4d2=[6,0,21];
a.AllowScriptAccess="always";
}
catch(e){
if(_4d2[0]==6){
_4d5=true;
}
}
if(!_4d5){
try{
a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
}
catch(e){
}
}
}
if(!_4d5&&typeof a=="object"){
try{
d=a.GetVariable("$version");
if(d){
d=d.split(" ")[1].split(",");
_4d2=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10)];
}
}
catch(e){
}
}
}
}
var djR=dojo.render;
var djRH=djR.html;
return {w3cdom:true,playerVersion:_4d2,ie:djRH.ie,win:djR.os.win,mac:djR.os.mac};
}();
function fixObjectLeaks(){
if(ua.ie&&ua.win&&hasPlayerVersion([8,0,0])){
window.attachEvent("onunload",function(){
var o=document.getElementsByTagName("object");
if(o){
var ol=o.length;
for(var i=0;i<ol;i++){
o[i].style.display="none";
for(var x in o[i]){
if(typeof o[i][x]=="function"){
o[i][x]=function(){
};
}
}
}
}
});
}
}
function showExpressInstall(_4dc){
_4d0=true;
var obj=document.getElementById(_4dc.id);
if(obj){
var ac=document.getElementById(_4dc.altContentId);
if(ac){
_4cf=ac;
}
var w=_4dc.width?_4dc.width:(obj.getAttribute("width")?obj.getAttribute("width"):0);
if(parseInt(w,10)<310){
w="310";
}
var h=_4dc.height?_4dc.height:(obj.getAttribute("height")?obj.getAttribute("height"):0);
if(parseInt(h,10)<137){
h="137";
}
var pt=ua.ie&&ua.win?"ActiveX":"PlugIn";
var dt=document.title;
var fv="MMredirectURL="+window.location+"&MMplayerType="+pt+"&MMdoctitle="+dt;
var el=obj;
createSWF({data:_4dc.expressInstall,id:"SWFObjectExprInst",width:w,height:h},{flashvars:fv},el);
}
}
function createSWF(_4e5,_4e6,el){
_4e6.wmode="transparent";
if(ua.ie&&ua.win){
var att="";
for(var i in _4e5){
if(typeof _4e5[i]=="string"){
if(i=="data"){
_4e6.movie=_4e5[i];
}else{
if(i.toLowerCase()=="styleclass"){
att+=" class=\""+_4e5[i]+"\"";
}else{
if(i!="classid"){
att+=" "+i+"=\""+_4e5[i]+"\"";
}
}
}
}
}
var par="";
for(var j in _4e6){
if(typeof _4e6[j]=="string"){
par+="<param name=\""+j+"\" value=\""+_4e6[j]+"\" />";
}
}
el.outerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+att+">"+par+"</object>";
fixObjectLeaks();
}else{
var o=document.createElement("object");
o.setAttribute("type","application/x-shockwave-flash");
for(var m in _4e5){
if(typeof _4e5[m]=="string"){
if(m.toLowerCase()=="styleclass"){
o.setAttribute("class",_4e5[m]);
}else{
if(m!="classid"){
o.setAttribute(m,_4e5[m]);
}
}
}
}
for(var n in _4e6){
if(typeof _4e6[n]=="string"&&n!="movie"){
createObjParam(o,n,_4e6[n]);
}
}
el.parentNode.replaceChild(o,el);
}
}
function createObjParam(el,_4f0,_4f1){
var p=document.createElement("param");
p.setAttribute("name",_4f0);
p.setAttribute("value",_4f1);
el.appendChild(p);
}
function hasPlayerVersion(rv){
return (ua.playerVersion[0]>rv[0]||(ua.playerVersion[0]==rv[0]&&ua.playerVersion[1]>rv[1])||(ua.playerVersion[0]==rv[0]&&ua.playerVersion[1]==rv[1]&&ua.playerVersion[2]>=rv[2]))?true:false;
}
function createCSS(sel,decl){
if(ua.ie&&ua.mac){
return;
}
var h=document.getElementsByTagName("head")[0];
var s=document.createElement("style");
s.setAttribute("type","text/css");
s.setAttribute("media","screen");
if(!(ua.ie&&ua.win)&&typeof document.createTextNode!="undefined"){
s.appendChild(document.createTextNode(sel+" {"+decl+"}"));
}
h.appendChild(s);
if(ua.ie&&ua.win&&typeof document.styleSheets!="undefined"&&document.styleSheets.length>0){
var ls=document.styleSheets[document.styleSheets.length-1];
if(typeof ls.addRule=="object"){
ls.addRule(sel,decl);
}
}
}
return {embedSWF:function(_4f9,_4fa,_4fb,_4fc,_4fd,_4fe,_4ff,_500,_501,_502){
if(!ua.w3cdom||!_4f9||!_4fa||!_4fb||!_4fc||!_4fd){
return;
}
if(hasPlayerVersion(_4fd.split("."))){
var _503=(_501?_501.id:null);
createCSS("#"+_4fa,"visibility:hidden");
var att=(typeof _501=="object")?_501:{};
att.data=_4f9;
att.width=_4fb;
att.height=_4fc;
var par=(typeof _500=="object")?_500:{};
if(typeof _4ff=="object"){
for(var i in _4ff){
if(typeof _4ff[i]=="string"){
if(typeof par.flashvars!="undefined"){
par.flashvars+="&"+i+"="+_4ff[i];
}else{
par.flashvars=i+"="+_4ff[i];
}
}
}
}
createSWF(att,par,document.getElementById(_4fa));
createCSS("#"+_4fa,"visibility:visible");
if(_503){
var _507=_4ce.page.swfInfo;
if(_507==null){
_507=_4ce.page.swfInfo={};
}
_507[_503]=_502;
}
}else{
if(_4fe&&!_4d0&&hasPlayerVersion([6,0,65])&&(ua.win||ua.mac)){
createCSS("#"+_4fa,"visibility:hidden");
var _508={};
_508.id=_508.altContentId=_4fa;
_508.width=_4fb;
_508.height=_4fc;
_508.expressInstall=_4fe;
showExpressInstall(_508);
createCSS("#"+_4fa,"visibility:visible");
}
}
}};
}();

