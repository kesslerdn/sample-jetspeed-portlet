dojo.provide("jetspeed.widget.PortletWindow");
dojo.require("jetspeed.desktop.core");
jetspeed.widget.PortletWindow=function(){
this.windowInitialized=false;
this.actionButtons={};
this.actionMenuWidget=null;
this.tooltips=[];
this._onLoadStack=[];
this._onUnloadStack=[];
this._callOnUnload=false;
};
dojo.extend(jetspeed.widget.PortletWindow,{title:"",nextIndex:1,resizable:true,moveable:true,moveAllowTilingChg:true,posStatic:false,heightToFit:false,decName:null,decConfig:null,titlebarEnabled:true,resizebarEnabled:true,editPageEnabled:false,iframeCoverContainerClass:"portletWindowIFrameClient",colWidth_pbE:0,portlet:null,altInitParams:null,inContentChgd:false,exclPContent:false,minimizeTempRestore:null,executeScripts:false,scriptSeparation:false,adjustPaths:false,parseContent:true,childWidgets:null,dbProfile:(djConfig.isDebug&&jetspeed.debug.profile),dbOn:djConfig.isDebug,dbMenuDims:"Dump Dimensions",altInitParamsDef:function(_1,_2){
if(!_1){
_1={getProperty:function(_3){
if(!_3){
return null;
}
return this.altInitParams[_3];
},retrieveContent:function(_4,_5){
var _6=this.altInitParams[jetspeed.id.PP_CONTENT_RETRIEVER];
if(_6){
_6.getContent(_5,_4,this,jetspeed.debugPortletDumpRawContent);
}else{
jetspeed.url.retrieveContent(_5,_4,this,jetspeed.debugPortletDumpRawContent);
}
}};
}
if(!_2){
_2={};
}
if(_2.altInitParams){
_1.altInitParams=_2.altInitParams;
}else{
_1.altInitParams=_2;
}
return _1;
},build:function(_7,_8){
var _9=jetspeed;
var _a=_9.id;
var _b=_9.prefs;
var _c=_9.page;
var _d=_9.css;
var _e=_9.ui;
var _f=document;
var _10=_9.docBody;
var _11=dojo;
var _12=_9.widget.PortletWindow.prototype.nextIndex;
this.windowIndex=_12;
var ie6=_9.UAie6;
this.ie6=ie6;
var _14=false;
if(_7){
if(_7.portlet){
this.portlet=_7.portlet;
}
if(_7.altInitParams){
this.altInitParams=_7.altInitParams;
}
if(_7.printMode){
_14=true;
}
}
var _15=this.portlet;
var iP=(_15?_15.getProperties():(this.altInitParams?this.altInitParams:{}));
var _17=iP[_a.PP_WIDGET_ID];
if(!_17){
if(_15){
_11.raise("PortletWindow is null for portlet: "+_15.entityId);
}else{
_17=_a.PW_ID_PREFIX+_12;
}
}
this.widgetId=_17;
_9.widget.PortletWindow.prototype.nextIndex++;
var _18=iP[_a.PP_WINDOW_DECORATION];
this.decName=_18;
var wDC=_9.loadPortletDecorationStyles(_18,_b);
if(wDC==null){
_11.raise("No portlet decoration is available: "+this.widgetId);
}
this.decConfig=wDC;
var _1a=wDC.dNodeClass;
var _1b=wDC.cNodeClass;
var _1c=_f.createElement("div");
_1c.id=_17;
_1c.className=_1a;
_1c.style.display="none";
var _1d=_f.createElement("div");
_1d.className=_1b;
var _1e=null,_1f=null,_20=null,_21=null;
if(!_14){
_1e=_f.createElement("div");
_1e.className="portletWindowTitleBar";
_20=_f.createElement("img");
_20.className="portletWindowTitleBarIcon";
var _22=_f.createElement("div");
_22.className="portletWindowTitleText";
_1e.appendChild(_20);
_1e.appendChild(_22);
_1f=_f.createElement("div");
_1f.className="portletWindowResizebar";
this.tbNode=_1e;
_21=_d.cssBase.concat();
this.tbNodeCss=_21;
this.tbIconNode=_20;
this.tbTextNode=_22;
this.rbNode=_1f;
this.rbNodeCss=_d.cssBase.concat();
}
if(_1e!=null){
_1c.appendChild(_1e);
}
_1c.appendChild(_1d);
if(_1f!=null){
_1c.appendChild(_1f);
}
this.domNode=_1c;
var _23=_d.cssPosition.concat();
if(_c.maximizedOnInit!=null){
_23[_d.cssNoSelNm]=" visibility: ";
_23[_d.cssNoSel]="hidden";
_23[_d.cssNoSelEnd]=";";
}
this.dNodeCss=_23;
this.containerNode=_1d;
var _24=_d.cssOverflow.concat();
this.cNodeCss=_24;
this.setPortletTitle(iP[_a.PP_WINDOW_TITLE]);
var _25=iP[_a.PP_WINDOW_POSITION_STATIC];
this.posStatic=this.preMaxPosStatic=_25;
var _26=iP[_a.PP_WINDOW_HEIGHT_TO_FIT];
this.heightToFit=this.preMaxHeightToFit=_26;
var _27=null,_28=null,_29=null,_2a=null;
if(_15){
var _2b=_15.getInitialWinDims();
_27=_2b.width;
_28=_2b.height;
_29=_2b.left;
_2a=_2b.top;
}else{
_27=iP[_a.PP_WIDTH];
_28=iP[_a.PP_HEIGHT];
_29=iP[_a.PP_LEFT];
_2a=iP[_a.PP_TOP];
}
var _2c={};
var _2d={w:null};
if(_27!=null&&_27>0){
_2c.w=_27=Math.floor(_27);
}else{
_2c.w=_27=_b.windowWidth;
}
if(_28!=null&&_28>0){
_2c.h=_2d.h=_28=Math.floor(_28);
}else{
_2c.h=_2d.h=_28=_b.windowHeight;
}
if(_29!=null&&_29>=0){
_2c.l=Math.floor(_29);
}else{
if(!_25){
_2c.l=(((_12-2)*30)+200);
}
}
if(_2a!=null&&_2a>=0){
_2c.t=Math.floor(_2a);
}else{
if(!_25){
_2c.t=(((_12-2)*30)+170);
}
}
this.dimsUntiled=_2c;
this.dimsTiled=_2d;
this.exclPContent=iP[_a.PP_EXCLUDE_PCONTENT];
_c.putPWin(this);
_10.appendChild(_1c);
if(_20){
var _2e=null;
if(wDC.windowIconEnabled&&wDC.windowIconPath!=null){
var wI=iP[_a.PP_WINDOW_ICON];
if(!wI){
wI="document.gif";
}
_2e=new _11.uri.Uri(_9.url.basePortalDesktopUrl()+wDC.windowIconPath+"/"+wI);
_2e=_2e.toString();
if(_2e.length==0){
_2e=null;
}
this.iconSrc=_2e;
}
if(_2e){
_20.src=_2e;
}else{
_11.dom.removeNode(_20);
this.tbIconNode=_20=null;
}
}
if(_1e){
if(_9.UAmoz||_9.UAsaf){
if(_9.UAmoz){
_21[_d.cssNoSelNm]=" -moz-user-select: ";
}else{
_21[_d.cssNoSelNm]=" -khtml-user-select: ";
}
_21[_d.cssNoSel]="none";
_21[_d.cssNoSelEnd]=";";
}else{
if(_9.UAie){
_1e.unselectable="on";
}
}
this._setupTitlebar(wDC,null,_15,_10,_f,_9,_a,_b,_e,_c,_11);
}
var _30=this.resizable;
var _31=null;
if(_30&&_1f){
var _32=_17+"_resize";
var _31=_9.widget.CreatePortletWindowResizeHandler(this,_9);
this.resizeHandle=_31;
if(_31){
_1f.appendChild(_31.domNode);
}
}else{
this.resizable=false;
}
_10.removeChild(_1c);
if(!wDC.windowTitlebar||!wDC.windowResizebar){
var _33=_9.css.cssDis;
if(!wDC.windowTitlebar){
this.titlebarEnabled=false;
if(this.tbNodeCss){
this.tbNodeCss[_33]="none";
}
}
if(!wDC.windowResizebar){
this.resizebarEnabled=false;
if(this.rbNodeCss){
this.rbNodeCss[_33]="none";
}
}
}
var _34=false;
var _35=_8.childNodes;
if(_25&&_35){
var _36=iP[_a.PP_ROW];
if(_36!=null){
var _37=new Number(_36);
if(_37>=0){
var _38=_35.length-1;
if(_38>=_37){
var _39=_35[_37];
if(_39){
_8.insertBefore(_1c,_39);
_34=true;
}
}
}
}
}
if(!_34){
_8.appendChild(_1c);
}
if(!wDC.layout){
var _3a="display: block; visibility: hidden; width: "+_27+"px"+((_28!=null&&_28>0)?("; height: "+_28+"px"):"");
_1c.style.cssText=_3a;
this._createLayoutInfo(wDC,false,_1c,_1d,_1e,_1f,_11,_9,_e);
}
if(_1e){
this.drag=new _11.dnd.Moveable(this,{handle:_1e});
this._setTitleBarDragging(true,_d);
}
if(ie6&&_25){
_2d.w=Math.max(0,_8.offsetWidth-this.colWidth_pbE);
}
this._setAsTopZIndex(_c,_d,_23,_25);
this._alterCss(true,true);
if(!_25){
this._addUntiledEvents();
}
if(ie6){
this.bgIframe=new _9.widget.BackgroundIframe(_1c,null,_11);
}
this.windowInitialized=true;
if(_9.debug.createWindow){
_11.debug("createdWindow ["+(_15?_15.entityId:_17)+(_15?(" / "+_17):"")+"]"+" width="+_1c.style.width+" height="+_1c.style.height+" left="+_1c.style.left+" top="+_1c.style.top);
}
this.windowState=_a.ACT_RESTORE;
var iWS=null;
if(_15){
iWS=_15.getCurrentActionState();
}else{
iWS=iP[_a.PP_WINDOW_STATE];
}
if(iWS==_a.ACT_MINIMIZE){
this.minimizeOnNextRender=true;
}
if(_9.widget.pwGhost==null&&_c!=null){
var _3c=_f.createElement("div");
_3c.id="pwGhost";
_3c.className=_1a;
_3c.style.position="static";
_3c.style.width="";
_3c.style.left="auto";
_3c.style.top="auto";
_9.widget.pwGhost=_3c;
}
if(ie6&&_9.widget.ie6ZappedContentHelper==null){
var _3d=_f.createElement("span");
_3d.id="ie6ZappedContentHelper";
_9.widget.ie6ZappedContentHelper=_3d;
}
},_buildActionStructures:function(wDC,_3f,_40,_41,_42,_43,_44){
var _45=new Array();
var aNm,_47,_48=false;
var _49=new Array();
var _4a=new Object();
var _4b=wDC.windowActionButtonOrder;
var _4c=wDC.windowActionMenuOrder;
var _4d=new Object();
var _4e=wDC.windowActionNoImage;
var _4f=wDC.windowActionButtonMax;
_4f=(_4f==null?-1:_4f);
if(_4c){
for(var aI=0;aI<_4c.length;aI++){
aNm=_4c[aI];
if(aNm){
_4d[aNm]=true;
}
}
}
if(_4b!=null){
for(var aI=(_4b.length-1);aI>=0;aI--){
aNm=_4b[aI];
_47=false;
if(_3f){
_47=true;
}else{
if(aNm==_42.ACT_MINIMIZE||aNm==_42.ACT_MAXIMIZE||aNm==_42.ACT_RESTORE||aNm==_42.ACT_MENU||_43.windowActionDesktop[aNm]!=null){
_47=true;
}
}
if(_47&&_4e&&_4e[aNm]){
if(!_4d[aNm]){
_49.push(aNm);
}
_47=false;
}
if(_47){
_45.push(aNm);
_4a[aNm]=true;
}
}
if(!_4a[_42.ACT_MENU]){
_48=true;
}
var _51=_45.length;
if(_4f!=-1&&_51>_4f){
var _52=0;
var _53=_51-_4f;
for(var j=0;j<2&&_52<_53;j++){
for(var i=(_45.length-1);i>=0&&_52<_53;i--){
aNm=_45[i];
if(aNm==null||aNm==_42.ACT_MENU){
continue;
}
if(j==0){
var _56=new RegExp("\b"+aNm+"\b");
if(_56.test(_43.windowActionNotPortlet)||aNm==_42.ACT_VIEW){
continue;
}
}
_49.push(aNm);
_45[i]=null;
delete _4a[aNm];
_52++;
}
}
}
}
var _57=new Array();
var _58=new Object();
var _59=_42.ACT_CHANGEPORTLETTHEME;
var _5a=_43.portletDecorationsAllowed;
if(_43.pageEditorLabels&&_5a&&_5a.length>1){
aNm=_59;
var _5b=_43.pageEditorLabels[aNm];
if(_5b){
_57.push(aNm);
_58[aNm];
this.actionLabels[aNm]=_5b;
}
}
for(var i=0;i<_49.length;i++){
aNm=_49[i];
if(aNm!=null&&!_58[aNm]&&!_4a[aNm]){
_57.push(aNm);
_58[aNm]=true;
}
}
if(_4c){
for(var aI=0;aI<_4c.length;aI++){
aNm=_4c[aI];
if(aNm!=null&&!_58[aNm]&&!_4a[aNm]&&(_3f||_43.windowActionDesktop[aNm])){
_57.push(aNm);
_58[aNm]=true;
}
}
}
if(this.dbOn){
_57.push({aNm:this.dbMenuDims,dev:true});
}
var _5c=null;
if(_57.length>0){
var _5d={};
var aNm,_5e,_5f,_60,_61,_62;
var _63=wDC.name+"_menu"+(!_3f?"Np":"");
var _64=_63;
_5c=_44.widget.createWidget("PopupMenu2",{id:_64,contextMenuForWindow:false},null);
_5c.onItemClick=function(mi){
var _aN=mi.jsActNm;
var _67=this.pWin;
if(!mi.jsActDev){
_67.actionProcess(_aN);
}else{
_67.actionProcessDev(_aN);
}
};
for(var i=0;i<_57.length;i++){
aNm=_57[i];
_61=null;
_62=false;
if(!aNm.dev){
_5e=this.actionLabels[aNm];
if(aNm==_59){
_61=_63+"_sub_"+aNm;
_60=_44.widget.createWidget("PopupMenu2",{id:_61,contextMenuForWindow:false},null);
_60.onItemClick=function(mi){
var _69=mi.jsPDecNm;
var _6a=_5c.pWin;
_6a.changeDecorator(_69);
};
for(var j=0;j<_5a.length;j++){
var _6b=_5a[j];
var _6c=_44.widget.createWidget("MenuItem2",{caption:_6b,jsPDecNm:_6b});
_60.addChild(_6c);
}
_40.appendChild(_60.domNode);
_41.ui.addPopupMenuWidget(_60);
}
}else{
_62=true;
_5e=aNm=aNm.aNm;
}
_5f=_44.widget.createWidget("MenuItem2",{caption:_5e,submenuId:_61,jsActNm:aNm,jsActDev:_62});
_5d[aNm]=_5f;
_5c.addChild(_5f);
}
_5c.menuItemsByName=_5d;
_40.appendChild(_5c.domNode);
_41.ui.addPopupMenuWidget(_5c);
}
wDC.windowActionMenuHasNoImg=_48;
if(_3f){
wDC.windowActionButtonNames=_45;
wDC.windowActionMenuNames=_57;
wDC.windowActionMenuWidget=_5c;
}else{
wDC.windowActionButtonNamesNp=_45;
wDC.windowActionMenuNamesNp=_57;
wDC.windowActionMenuWidgetNp=_5c;
}
return _45;
},_setupTitlebar:function(wDC,_6e,_6f,_70,doc,_72,_73,_74,_75,_76,_77){
var _78=_77.event;
var aNm;
var _7a=_76.tooltipMgr;
var _7b=this.tbNode;
var _7c=(_6e&&wDC);
if(_6e){
if(this.actionMenuWidget&&_6e.windowActionMenuHasNoImg){
_75.evtDisconnect("after",_7b,"oncontextmenu",this,"actionMenuOpen",_78);
}
_76.tooltipMgr.removeNodes(this.tooltips);
this.tooltips=ttps=[];
var _7d=this.actionButtons;
if(_7d){
var _7e=(_6e&&_6e.windowActionButtonTooltip);
for(aNm in _7d){
var _7f=_7d[aNm];
if(_7f){
_75.evtDisconnect("after",_7f,"onclick",this,"actionBtnClick",_78);
if(!_7e){
_75.evtDisconnect("after",_7f,"onmousedown",_72,"_stopEvent",_78);
}
if(_7c){
_77.dom.removeNode(_7f);
}
}
}
this.actionButtons=_7d={};
}
}
if(wDC){
if(wDC.windowActionButtonTooltip){
if(this.actionLabels[_73.ACT_DESKTOP_MOVE_TILED]!=null&&this.actionLabels[_73.ACT_DESKTOP_MOVE_UNTILED]!=null){
this.tooltips.push(_7a.addNode(_7b,null,true,1200,this,"getTitleBarTooltip",_72,_75,_78));
}
}
var _80=(_6f)?wDC.windowActionButtonNames:wDC.windowActionButtonNamesNp;
if(_80==null){
_80=this._buildActionStructures(wDC,_6f,_70,_72,_73,_74,_77);
}
for(var i=0;i<_80.length;i++){
aNm=_80[i];
if(aNm!=null){
if(!_6f||(aNm==_73.ACT_RESTORE||aNm==_73.ACT_MENU||_6f.getAction(aNm)!=null||_74.windowActionDesktop[aNm]!=null)){
this._createActionButtonNode(aNm,doc,_70,_7a,wDC,_72,_74,_75,_77,_78);
}
}
}
this.actionMenuWidget=(_6f)?wDC.windowActionMenuWidget:wDC.windowActionMenuWidgetNp;
if(this.actionMenuWidget&&wDC.windowActionMenuHasNoImg){
_75.evtConnect("after",_7b,"oncontextmenu",this,"actionMenuOpen",_78);
}
if(this.ie6&&!wDC._ie6used){
wDC._ie6used=true;
this.actionBtnSyncDefer(false,_72,_77);
}else{
this.actionBtnSync(_72,_73);
}
if(wDC.windowDisableResize){
this.resizable=false;
}
if(wDC.windowDisableMove){
this.moveable=false;
}
}
},_createActionButtonNode:function(aNm,doc,_84,_85,wDC,_87,_88,_89,_8a,_8b){
if(aNm!=null){
var _8c=doc.createElement("div");
_8c.className="portletWindowActionButton";
_8c.style.backgroundImage="url("+_88.getPortletDecorationBaseUrl(this.decName)+"/images/desktop/"+aNm+".gif)";
_8c.actionName=aNm;
this.actionButtons[aNm]=_8c;
this.tbNode.appendChild(_8c);
_89.evtConnect("after",_8c,"onclick",this,"actionBtnClick",_8b);
if(wDC.windowActionButtonTooltip){
var _8d=this.actionLabels[aNm];
this.tooltips.push(_85.addNode(_8c,_8d,true,null,null,null,_87,_89,_8b));
}else{
_89.evtConnect("after",_8c,"onmousedown",_87,"_stopEvent",_8b);
}
}
},getTitleBarTooltip:function(){
if(!this.getLayoutActionsEnabled()){
return null;
}
if(this.posStatic){
return this.actionLabels[jetspeed.id.ACT_DESKTOP_MOVE_TILED];
}else{
return this.actionLabels[jetspeed.id.ACT_DESKTOP_MOVE_UNTILED];
}
},_createLayoutInfo:function(_8e,_8f,_90,_91,_92,_93,_94,_95,_96){
var _97=_94.gcs(_90);
var _98=_94.gcs(_91);
var _99=_96.getLayoutExtents(_90,_97,_94,_95);
var _9a=_96.getLayoutExtents(_91,_98,_94,_95);
var _9b={dNode:_99,cNode:_9a};
var _9c=Math.max(0,_9a.mE.t);
var _9d=Math.max(0,_9a.mE.h-_9a.mE.t);
var _9e=0;
var _9f=0;
var _a0=null;
if(_92){
var _a1=_94.gcs(_92);
_a0=_96.getLayoutExtents(_92,_a1,_94,_95);
if(!_8e.dragCursor){
var _a2=_a1.cursor;
if(_a2==null||_a2.length==0){
_a2="move";
}
_8e.dragCursor=_a2;
}
_a0.mBh=_94.getMarginBox(_92,_a1,_95).h;
var _a3=Math.max(0,_a0.mE.h-_a0.mE.t);
_9e=(_a0.mBh-_a3)+Math.max(0,(_a3-_9c));
_9b.tbNode=_a0;
}
var _a4=null;
if(_93){
var _a5=_94.gcs(_93);
_a4=_96.getLayoutExtents(_93,_a5,_94,_95);
_a4.mBh=_94.getMarginBox(_93,_a5,_95).h;
var _a6=Math.max(0,_a4.mE.t);
_9f=(_a4.mBh-_a6)+Math.max(0,(_a6-_9d));
_9b.rbNode=_a4;
}
_9b.cNode_mBh_LessBars=_9e+_9f;
if(!_8f){
_8e.layout=_9b;
}else{
_8e.layoutIFrame=_9b;
}
},actionBtnClick:function(evt){
if(evt==null||evt.target==null){
return;
}
this.actionProcess(evt.target.actionName,evt);
},actionMenuOpen:function(evt){
var _a9=jetspeed;
var _aa=_a9.id;
var _ab=this.actionMenuWidget;
if(!_ab){
return;
}
if(_ab.isShowingNow){
_ab.close();
}
var _ac=null;
var _ad=null;
if(this.portlet){
_ac=this.portlet.getCurrentActionState();
_ad=this.portlet.getCurrentActionMode();
}
var _ae=_ab.menuItemsByName;
for(var aNm in _ae){
var _b0=_ae[aNm];
var _b1=(this._isActionEnabled(aNm,_ac,_ad,_a9,_aa))?"":"none";
_b0.domNode.style.display=_b1;
}
_ab.pWin=this;
_ab.onOpen(evt);
},actionProcessDev:function(aNm,evt){
if(aNm==this.dbMenuDims&&jetspeed.debugPWinPos){
jetspeed.debugPWinPos(this);
}
},actionProcess:function(aNm,evt){
var _b6=jetspeed;
var _b7=_b6.id;
if(aNm==null){
return;
}
if(_b6.prefs.windowActionDesktop[aNm]!=null){
if(aNm==_b7.ACT_DESKTOP_TILE){
this.makeTiled();
}else{
if(aNm==_b7.ACT_DESKTOP_UNTILE){
this.makeUntiled();
}else{
if(aNm==_b7.ACT_DESKTOP_HEIGHT_EXPAND){
this.makeHeightToFit(false);
}else{
if(aNm==_b7.ACT_DESKTOP_HEIGHT_NORMAL){
this.makeHeightVariable(false,false);
}
}
}
}
}else{
if(aNm==_b7.ACT_MENU){
this.actionMenuOpen(evt);
}else{
if(aNm==_b7.ACT_MINIMIZE){
if(this.portlet&&this.windowState==_b7.ACT_MAXIMIZE){
this.needsRenderOnRestore=true;
}
this.minimizeWindow();
if(this.portlet){
_b6.changeActionForPortlet(this.portlet.getId(),_b7.ACT_MINIMIZE,null);
}
if(!this.portlet){
this.actionBtnSyncDefer(false,_b6,dojo);
}
}else{
if(aNm==_b7.ACT_RESTORE){
var _b8=false;
if(this.portlet){
if(this.windowState==_b7.ACT_MAXIMIZE||this.needsRenderOnRestore){
if(this.needsRenderOnRestore){
_b8=true;
this.restoreOnNextRender=true;
this.needsRenderOnRestore=false;
}
this.portlet.renderAction(aNm);
}else{
_b6.changeActionForPortlet(this.portlet.getId(),_b7.ACT_RESTORE,null);
}
}
if(!_b8){
this.restoreWindow();
}
if(!this.portlet){
this.actionBtnSyncDefer(false,_b6,dojo);
}
}else{
if(aNm==_b7.ACT_MAXIMIZE){
this.maximizeWindow();
if(this.portlet){
this.portlet.renderAction(aNm);
}else{
this.actionBtnSync(_b6,_b7);
}
}else{
if(aNm==_b7.ACT_REMOVEPORTLET){
if(this.portlet){
var _b9=dojo.widget.byId(_b7.PG_ED_WID);
if(_b9!=null){
_b9.deletePortlet(this.portlet.entityId,this.title);
}
}
}else{
if(this.portlet){
this.portlet.renderAction(aNm);
}
}
}
}
}
}
}
},_isActionEnabled:function(aNm,_bb,_bc,_bd,_be){
var _bd=jetspeed;
var _be=_bd.id;
var _bf=false;
var _c0=this.windowState;
if(aNm==_be.ACT_MENU){
if(!this._actionMenuIsEmpty(_bd,_be)){
_bf=true;
}
}else{
if(_bd.prefs.windowActionDesktop[aNm]!=null){
if(this.getLayoutActionsEnabled()){
var _c1=(this.ie6&&_c0==_be.ACT_MINIMIZE);
if(aNm==_be.ACT_DESKTOP_HEIGHT_EXPAND){
if(!this.heightToFit&&!_c1){
_bf=true;
}
}else{
if(aNm==_be.ACT_DESKTOP_HEIGHT_NORMAL){
if(this.heightToFit&&!_c1){
_bf=true;
}
}else{
if(aNm==_be.ACT_DESKTOP_TILE&&_bd.prefs.windowTiling){
if(!this.posStatic){
_bf=true;
}
}else{
if(aNm==_be.ACT_DESKTOP_UNTILE){
if(this.posStatic){
_bf=true;
}
}
}
}
}
}
}else{
if(aNm==_be.ACT_CHANGEPORTLETTHEME){
if(this.cP_D&&this.editPageEnabled&&this.getLayoutActionsEnabled()){
_bf=true;
}
}else{
if(aNm==this.dbMenuDims){
_bf=true;
}else{
if(this.minimizeTempRestore!=null){
if(this.portlet){
var _c2=this.portlet.getAction(aNm);
if(_c2!=null){
if(_c2.id==_be.ACT_REMOVEPORTLET){
if(_bd.page.editMode&&this.getLayoutActionsEnabled()){
_bf=true;
}
}
}
}
}else{
if(this.portlet){
var _c2=this.portlet.getAction(aNm);
if(_c2!=null){
if(_c2.id==_be.ACT_REMOVEPORTLET){
if(_bd.page.editMode&&this.getLayoutActionsEnabled()){
_bf=true;
}
}else{
if(_c2.type==_be.PORTLET_ACTION_TYPE_MODE){
if(aNm!=_bc){
_bf=true;
}
}else{
if(aNm!=_bb){
_bf=true;
}
}
}
}
}else{
if(aNm==_be.ACT_MAXIMIZE){
if(aNm!=_c0&&this.minimizeTempRestore==null){
_bf=true;
}
}else{
if(aNm==_be.ACT_MINIMIZE){
if(aNm!=_c0){
_bf=true;
}
}else{
if(aNm==_be.ACT_RESTORE){
if(_c0==_be.ACT_MAXIMIZE||_c0==_be.ACT_MINIMIZE){
_bf=true;
}
}else{
if(aNm==this.dbMenuDims){
_bf=true;
}
}
}
}
}
}
}
}
}
}
return _bf;
},_actionMenuIsEmpty:function(_c3,_c4){
var _c5=true;
var _c6=this.actionMenuWidget;
if(_c6){
var _c7=null;
var _c8=null;
if(this.portlet){
_c7=this.portlet.getCurrentActionState();
_c8=this.portlet.getCurrentActionMode();
}
for(var aNm in _c6.menuItemsByName){
if(aNm!=_c4.ACT_MENU&&this._isActionEnabled(aNm,_c7,_c8,_c3,_c4)){
_c5=false;
break;
}
}
}
return _c5;
},actionBtnSyncDefer:function(_ca,_cb,_cc){
if(_ca&&_cb.UAie){
_ca=false;
}
if(_ca){
var _cd=_cc.gcs(this.domNode).opacity;
if(typeof _cd=="undefined"||_cd==null){
_ca=false;
}else{
_cd=Number(_cd);
this._savedOpacity=_cd;
var _ce=_cd-0.005;
_ce=((_ce<=0.1)?(_cd+0.005):_ce);
this.domNode.style.opacity=_ce;
_cc.lang.setTimeout(this,this._actionBtnSyncRepaint,20);
}
}
if(!_ca){
_cc.lang.setTimeout(this,this.actionBtnSync,10);
}
},_actionBtnSyncRepaint:function(_cf,_d0){
this.actionBtnSync(_cf,_d0);
if(this._savedOpacity!=null){
this.domNode.style.opacity=this._savedOpacity;
delete this._savedOpacity;
}
},actionBtnSync:function(_d1,_d2){
if(!_d1){
_d1=jetspeed;
_d2=_d1.id;
}
var _d3=null;
var _d4=null;
if(this.portlet){
_d3=this.portlet.getCurrentActionState();
_d4=this.portlet.getCurrentActionMode();
}
for(var aNm in this.actionButtons){
var _d6=this._isActionEnabled(aNm,_d3,_d4,_d1,_d2);
var _d7=this.actionButtons[aNm];
_d7.style.display=(_d6)?"block":"none";
}
},_postCreateMaximizeWindow:function(){
var _d8=jetspeed;
var _d9=_d8.id;
this.maximizeWindow();
if(this.portlet){
this.portlet.renderAction(_d9.ACT_MAXIMIZE);
}else{
this.actionBtnSync(_d8,_d9);
}
},minimizeWindowTemporarily:function(_da){
var _db=jetspeed;
var _dc=_db.id;
if(_da){
this.needsRenderOnRestore=true;
}
if(!this.minimizeTempRestore){
this.minimizeTempRestore=this.windowState;
if(this.windowState!=_dc.ACT_MINIMIZE){
this.minimizeWindow(false);
}
this.actionBtnSync(_db,_dc);
}
},restoreAllFromMinimizeWindowTemporarily:function(){
var _dd=jetspeed;
var _de=_dd.id;
var _df=_de.ACT_MINIMIZE,_e0=_de.ACT_MAXIMIZE;
var _e1;
var _e2=[];
var _e3=null;
var _e4=_dd.page.getPWins();
for(var i=0;i<_e4.length;i++){
_e1=_e4[i];
var _e6=_e1.minimizeTempRestore;
delete _e1.minimizeTempRestore;
if(_e6){
if(_e6==_e0){
_e3=_e1;
}
if(_e6==_df){
}else{
if(_e1.needsRenderOnRestore&&_e1.portlet){
deferRestoreWindow=true;
if(_e6!=_e0){
_e1.restoreOnNextRender=true;
}
delete _e1.needsRenderOnRestore;
_e1.portlet.renderAction(_e6);
}else{
_e1.restoreWindow();
if(!_e1.portlet){
_e1.actionBtnSyncDefer(false,_dd,dojo);
}
}
}
_e1.actionBtnSync(_dd,_de);
}
if(_e1.ie6&&_e1.posStatic){
var _e7=_e1.domNode.parentNode;
var _e8=false;
for(var j=0;j<_e2.length;j++){
if(_e2[j]==_e7){
_e8=true;
break;
}
}
if(!_e8){
_e2.push(_e7);
}
}
}
_dd.widget.showAllPortletWindows();
if(_e3!=null){
_e3.maximizeWindow();
}
if(_dd.UAie6){
if(_e2.length>0){
var _ea=new jetspeed.widget.IE6ZappedContentRestorer(_e2);
dojo.lang.setTimeout(_ea,_ea.showNext,20);
}
}
},minimizeWindow:function(_eb){
if(!this.tbNode){
return;
}
var _ec=jetspeed;
if(this.windowState==jetspeed.id.ACT_MAXIMIZE){
_ec.widget.showAllPortletWindows();
this.restoreWindow();
}else{
if(!_eb){
this._updtDimsObj(false,false);
}
}
var _ed=_ec.css.cssDis;
this.cNodeCss[_ed]="none";
if(this.rbNodeCss){
this.rbNodeCss[_ed]="none";
}
this.windowState=_ec.id.ACT_MINIMIZE;
if(this.ie6){
this.containerNode.style.display="none";
}
this._alterCss(true,true);
},maximizeWindow:function(){
var _ee=jetspeed;
var _ef=_ee.id;
var _f0=this.domNode;
var _f1=[this.widgetId];
_ee.widget.hideAllPortletWindows(_f1);
if(this.windowState==_ef.ACT_MINIMIZE){
this.restoreWindow();
}
var _f2=this.posStatic;
this.preMaxPosStatic=_f2;
this.preMaxHeightToFit=this.heightToFit;
var _f3=_f2;
this._updtDimsObj(false,_f3);
this._setTitleBarDragging(true,_ee.css,false);
this.posStatic=false;
this.heightToFit=false;
this._setMaximizeSize(true,true,_ee);
this._alterCss(true,true);
if(_f2){
jetspeedDesktop.appendChild(_f0);
}
window.scrollTo(0,0);
this.windowState=_ef.ACT_MAXIMIZE;
},_setMaximizeSize:function(_f4,_f5,_f6){
if(_f6==null){
_f6=jetspeed;
}
var _f7=0,_f8=0;
if(_f4){
var _f9=_f6.ui.scrollWidth;
if(_f9==null){
_f9=_f6.ui.getScrollbar(_f6);
}
_f8=_f7=((_f9+5)*-1);
}
var _fa=document.getElementById(_f6.id.DESKTOP);
var _fb=dojo;
var djH=_fb.html;
var _fd=djH.getAbsolutePosition(_fa,true).y;
var _fe=djH.getViewport();
var _ff=djH.getPadding(_f6.docBody);
var _100={w:(_fe.width+_f8)-_ff.width-2,h:(_fe.height+_f7)-_ff.height-_fd,l:1,t:_fd};
this.dimsUntiledTemp=_100;
if(!_f5){
this._alterCss(false,false,true);
}
if(_f4){
_fb.lang.setTimeout(this,this._setMaximizeSize,40,false,false,_f6);
}
return _100;
},restoreWindow:function(){
var _101=jetspeed;
var jsId=_101.id;
var _103=_101.css;
var _104=this.domNode;
var _105=false;
if(_104.style.position=="absolute"){
_105=true;
}
var _106=null;
var _107=false;
if(this.windowState==jsId.ACT_MAXIMIZE){
_101.widget.showAllPortletWindows();
this.posStatic=this.preMaxPosStatic;
this.heightToFit=this.preMaxHeightToFit;
this.dimsUntiledTemp=null;
_107=true;
}
var _108=_103.cssDis;
this.cNodeCss[_108]="block";
if(this.rbNodeCss&&this.resizebarEnabled){
this.rbNodeCss[_108]="block";
}
this.windowState=jsId.ACT_RESTORE;
this._setTitleBarDragging(true,_101.css);
var _109=null;
var ie6=this.ie6;
if(!ie6){
this._alterCss(true,true);
}else{
if(this.heightToFit){
_109=this.iNodeCss;
this.iNodeCss=null;
}
this._alterCss(true,true);
}
if(this.posStatic&&_105){
this._tileWindow(_101);
}
if(ie6){
this._updtDimsObj(false,false,true,false,true);
if(_107){
this._resetIE6TiledSize(false,true);
}
if(_109!=null){
this.iNodeCss=_109;
}
this._alterCss(false,false,true);
}
},_tileWindow:function(_10b){
if(!this.posStatic){
return;
}
var _10c=this.domNode;
var _10d=this.getDimsObj(this.posStatic);
var _10e=true;
if(_10d!=null){
var _10f=_10d.colInfo;
if(_10f!=null&&_10f.colI!=null){
var _110=_10b.page.columns[_10f.colI];
var _111=((_110!=null)?_110.domNode:null);
if(_111!=null){
var _112=null;
var _113=_111.childNodes.length;
if(_113==0){
_111.appendChild(_10c);
_10e=false;
}else{
var _114,_115,_116=0;
if(_10f.pSibId!=null||_10f.nSibId!=null){
_114=_111.firstChild;
do{
_115=_114.id;
if(_115==null){
continue;
}
if(_115==_10f.pSibId){
dojo.dom.insertAfter(_10c,_114);
_10e=false;
}else{
if(_115==_10f.nSibId){
dojo.dom.insertBefore(_10c,_114);
_10e=false;
}else{
if(_116==_10f.elmtI){
_112=_114;
}
}
}
_114=_114.nextSibling;
_116++;
}while(_10e&&_114!=null);
}
}
if(_10e){
if(_112!=null){
dojo.dom.insertBefore(_10c,_112);
}else{
dojo.dom.prependChild(_10c,_111);
}
_10e=false;
}
}
}
}
if(_10e){
var _117=_10b.page.getColumnDefault();
if(_117!=null){
dojo.dom.prependChild(_10c,_117.domNode);
}
}
},getDimsObj:function(_118,_119){
return (_118?((this.dimsTiledTemp!=null&&!_119)?this.dimsTiledTemp:this.dimsTiled):((this.dimsUntiledTemp!=null&&!_119)?this.dimsUntiledTemp:this.dimsUntiled));
},_updtDimsObj:function(_11a,_11b,_11c,_11d,_11e,_11f){
var _120=jetspeed;
var _121=dojo;
var _122=this.domNode;
var _123=this.posStatic;
var _124=this.getDimsObj(_123,_11f);
var _125=(!_11c&&!_123&&(!_11a||_124.l==null||_124.t==null));
var _126=(!_11d&&(!_11a||_125||_11e||_124.w==null||_124.h==null));
if(_126||_125){
var _127=this._getLayoutInfo().dNode;
if(_126){
var _128=_120.ui.getMarginBoxSize(_122,_127);
_124.w=_128.w;
_124.h=_128.h;
if(!_123){
_125=true;
}
}
if(_125){
var _129=_121.html.getAbsolutePosition(_122,true);
_124.l=_129.x-_127.mE.l-_127.pbE.l;
_124.t=_129.y-_127.mE.t-_127.pbE.t;
}
}
if(_123){
if(_11b||_11f&&_124.colInfo==null){
var _12a=0,_12b=_122.previousSibling,_12c=_122.nextSibling;
var _12d=(_12b!=null?_12b.id:null),_12e=(_12c!=null?_12c.id:null);
if(_12b!=null){
_12d=_12b.id;
}
while(_12b!=null){
_12a++;
_12b=_12b.previousSibling;
}
_124.colInfo={elmtI:_12a,pSibId:_12d,nSibId:_12e,colI:this.getPageColumnIndex()};
}
if(_11f){
this.dimsTiledTemp={w:_124.w,h:_124.h,colInfo:_124.colInfo};
_124=this.dimsTiledTemp;
}
}else{
if(_11f){
this.dimsUntiledTemp={w:_124.w,h:_124.h,l:_124.l,t:_124.t};
_124=this.dimsUntiledTemp;
}
}
return _124;
},getLayoutActionsEnabled:function(){
return (this.windowState!=jetspeed.id.ACT_MAXIMIZE&&(this.portlet==null||(!this.portlet.layoutActionsDisabled||(this.cL_NA_ED==true))));
},_setTitleBarDragging:function(_12f,_130,_131){
var _132=this.tbNode;
if(!_132){
return;
}
if(typeof _131=="undefined"){
_131=this.getLayoutActionsEnabled();
}
var _133=this.resizeHandle;
var _134=null;
var wDC=this.decConfig;
var _136=_131;
if(_136&&!this.resizebarEnabled){
_136=false;
}
if(_131&&!this.titlebarEnabled){
_131=false;
}
if(_131){
_134=wDC.dragCursor;
if(this.drag){
this.drag.enable();
}
}else{
_134="default";
if(this.drag){
this.drag.disable();
}
}
if(_136){
if(_133){
_133.domNode.style.display="";
}
}else{
if(_133){
_133.domNode.style.display="none";
}
}
this.tbNodeCss[_130.cssCur]=_134;
if(!_12f){
_132.style.cursor=_134;
}
},onMouseDown:function(evt){
this.bringToTop(evt,false,false,jetspeed);
},bringToTop:function(evt,_139,_13a,_13b){
if(!this.posStatic){
var _13c=_13b.page;
var _13d=_13b.css;
var _13e=this.dNodeCss;
var _13f=_13c.getPWinHighZIndex();
var zCur=_13e[_13d.cssZIndex];
if(_13f!=zCur){
var zTop=this._setAsTopZIndex(_13c,_13d,_13e,false);
if(this.windowInitialized){
this.domNode.style.zIndex=zTop;
if(!_13a&&this.portlet&&this.windowState!=jetspeed.id.ACT_MAXIMIZE){
this.portlet.submitWinState();
}
}
}
}else{
if(_139){
var zTop=this._setAsTopZIndex(_13c,_13d,_13e,true);
if(this.windowInitialized){
this.domNode.style.zIndex=zTop;
}
}
}
},_setAsTopZIndex:function(_142,_143,_144,_145){
var zTop=String(_142.getPWinTopZIndex(_145));
_144[_143.cssZIndex]=zTop;
return zTop;
},makeUntiled:function(){
var _147=jetspeed;
this._updtDimsObj(false,true);
this.posStatic=false;
this._updtDimsObj(true,false);
this._setAsTopZIndex(_147.page,_147.css,this.dNodeCss,false);
this._alterCss(true,true);
var _148=this.domNode.parentNode;
var _149=document.getElementById(jetspeed.id.DESKTOP);
_149.appendChild(this.domNode);
_147.page.columnEmptyCheck(_148);
if(this.windowState==_147.id.ACT_MINIMIZE){
this.minimizeWindow();
}
if(this.portlet){
this.portlet.submitWinState();
}
this._addUntiledEvents();
},makeTiled:function(){
this.posStatic=true;
var _14a=jetspeed;
this._setAsTopZIndex(_14a.page,_14a.css,this.dNodeCss,true);
this._alterCss(true,true);
this._tileWindow(_14a);
_14a.page.columnEmptyCheck(this.domNode.parentNode);
if(this.portlet){
this.portlet.submitWinState();
}
this._removeUntiledEvents();
},_addUntiledEvents:function(){
if(this._untiledEvts==null){
this._untiledEvts=[jetspeed.ui.evtConnect("after",this.domNode,"onmousedown",this,"onMouseDown")];
}
},_removeUntiledEvents:function(){
if(this._untiledEvts!=null){
jetspeed.ui.evtDisconnectWObjAry(this._untiledEvts);
delete this._untiledEvts;
}
},makeHeightToFit:function(_14b){
var _14c=dojo.html.getMarginBox(this.domNode);
this.heightToFit=true;
if(this.ie6){
var _14d=this.iNodeCss;
this.iNodeCss=null;
this._alterCss(false,true);
this._updtDimsObj(false,false,true,false,true);
this.iNodeCss=_14d;
}
this._alterCss(false,true);
if(!_14b&&this.portlet){
this.portlet.submitWinState();
}
},makeHeightVariable:function(_14e,_14f){
var _150=this.getDimsObj(this.posStatic);
var _151=this._getLayoutInfo().dNode;
var _152=jetspeed.ui.getMarginBoxSize(this.domNode,_151);
_150.w=_152.w;
_150.h=_152.h;
this.heightToFit=false;
this._alterCss(false,true);
if(!_14f&&this.iframesInfo){
dojo.lang.setTimeout(this,this._forceRefreshZIndex,70);
}
if(!_14e&&this.portlet){
this.portlet.submitWinState();
}
},editPageInitiate:function(cP_D,_154,_155,_156,_157){
this.editPageEnabled=true;
this.cP_D=cP_D;
this.cL_NA_ED=_154;
var wDC=this.decConfig;
if(!wDC.windowTitlebar||!wDC.windowResizebar){
var _159=_156.cssDis;
if(!wDC.windowTitlebar){
this.titlebarEnabled=true;
if(this.tbNodeCss){
this.tbNodeCss[_159]="block";
}
}
if(!wDC.windowResizebar){
this.resizebarEnabled=true;
if(this.rbNodeCss&&this.windowState!=_155.id.ACT_MINIMIZE){
this.rbNodeCss[_159]="block";
}
}
this._setTitleBarDragging(false,_156);
if(!_157){
this._alterCss(true,true);
}
}else{
this._setTitleBarDragging(false,_156);
}
},editPageTerminate:function(_15a,_15b){
this.editPageEnabled=false;
delete this.cP_D;
delete this.cL_NA_ED;
var wDC=this.decConfig;
if(!wDC.windowTitlebar||!wDC.windowResizebar){
var _15d=_15a.cssDis;
if(!wDC.windowTitlebar){
this.titlebarEnabled=false;
if(this.tbNodeCss){
this.tbNodeCss[_15d]="none";
}
}
if(!wDC.windowResizebar){
this.resizebarEnabled=false;
if(this.rbNodeCss){
this.rbNodeCss[_15d]="none";
}
}
this._setTitleBarDragging(false,_15a);
if(!_15b){
this._alterCss(true,true);
}
}else{
this._setTitleBarDragging(false,_15a);
}
},changeDecorator:function(_15e){
var _15f=jetspeed;
var _160=_15f.css;
var jsId=_15f.id;
var jsUI=_15f.ui;
var _163=_15f.prefs;
var _164=dojo;
var _165=this.decConfig;
if(_165&&_165.name==_15e){
return;
}
var wDC=_15f.loadPortletDecorationStyles(_15e,_163);
if(!wDC){
return;
}
var _167=this.portlet;
if(_167){
_167._submitAjaxApi("updatepage","&method=update-portlet-decorator&portlet-decorator="+_15e);
}
this.decConfig=wDC;
this.decName=wDC.name;
var _168=this.domNode;
var _169=this.containerNode;
var _16a=this.iframesInfo;
var _16b=(_16a&&_16a.layout);
var _16c=(!_16b?wDC.layout:wDC.layoutIFrame);
if(!_16c){
if(!_16b){
this._createLayoutInfo(wDC,false,_168,_169,this.tbNode,this.rbNode,_164,_15f,jsUI);
}else{
this._createLayoutInfo(wDC,true,_168,_169,this.tbNode,this.rbNode,_164,_15f,jsUI);
}
}
this._setupTitlebar(wDC,_165,this.portlet,_15f.docBody,document,_15f,_15f.id,_163,jsUI,_15f.page,_164);
_168.className=wDC.dNodeClass;
if(_16b){
_169.className=wDC.cNodeClass+" "+this.iframeCoverContainerClass;
}else{
_169.className=wDC.cNodeClass;
}
var _16d=_160.cssDis;
this.titlebarEnabled=true;
if(this.tbNodeCss){
this.tbNodeCss[_16d]="block";
}
this.resizebarEnabled=true;
if(this.rbNodeCss&&this.windowState!=jsId.ACT_MINIMIZE){
this.rbNodeCss[_16d]="block";
}
if(this.editPageEnabled){
this.editPageInitiate(this.cP_D,this.cL_NA_ED,_15f,_160,true);
}else{
this.editPageTerminate(_160,true);
}
this._setTitleBarDragging(true,_160);
this._alterCss(true,true);
},resizeTo:function(w,h,_170){
var _171=this.getDimsObj(this.posStatic);
_171.w=w;
_171.h=h;
this._alterCss(false,false,true);
if(!this.windowIsSizing){
var _172=this.resizeHandle;
if(_172!=null&&_172._isSizing){
jetspeed.ui.evtConnect("after",_172,"_endSizing",this,"endSizing");
this.windowIsSizing=true;
}
}
this.resizeNotifyChildWidgets();
},resizeNotifyChildWidgets:function(){
if(this.childWidgets){
var _173=this.childWidgets;
var _174=_173.length,_175;
for(var i=0;i<_174;i++){
try{
_175=_173[i];
if(_175){
_175.checkSize();
}
}
catch(e){
}
}
}
},_getLayoutInfo:function(){
var _177=this.iframesInfo;
return ((!(_177&&_177.layout))?this.decConfig.layout:this.decConfig.layoutIFrame);
},_getLayoutInfoMoveable:function(){
return this._getLayoutInfo().dNode;
},onBrowserWindowResize:function(){
var _178=jetspeed;
if(this.ie6){
this._resetIE6TiledSize(false);
}
if(this.windowState==_178.id.ACT_MAXIMIZE){
this._setMaximizeSize(true,false,_178);
}
},_resetIE6TiledSize:function(_179,_17a){
var _17b=this.posStatic;
if(_17b){
var _17c=this.domNode;
var _17d=this.getDimsObj(_17b);
_17d.w=Math.max(0,this.domNode.parentNode.offsetWidth-this.colWidth_pbE);
if(!_17a){
this._alterCss(_179,false,false,false,true);
}
}
},_alterCss:function(_17e,_17f,_180,_181,_182,_183){
var _184=jetspeed;
var _185=_184.css;
var _186=this.iframesInfo;
var _187=(_186&&_186.layout);
var _188=(!_187?this.decConfig.layout:this.decConfig.layoutIFrame);
var _189=this.dNodeCss,_18a=null,_18b=null,_18c=null,_18d=false,_18e=this.iNodeCss,_18f=null;
if(_18e&&_187){
_18f=_186.iframeCoverIE6Css;
}
var _190=this.posStatic;
var _191=(_190&&_18e==null);
var _192=this.heightToFit;
var _193=(_17e||_182||(_180&&!_191));
var _194=(_17f||_180);
var _195=(_17e||_181);
var _196=(_17f||(_180&&_187));
var _197=this.getDimsObj(_190);
if(_17e){
_189[_185.cssPos]=(_190?"relative":"absolute");
}
var _198=null,_199=null;
if(_17f){
if(_187){
var _19a=this.getIFramesAndObjects(false,true);
if(_19a&&_19a.iframes&&_19a.iframes.length==1&&_186.iframesSize&&_186.iframesSize.length==1){
var _19b=_186.iframesSize[0].h;
if(_19b!=null){
_198=_19a.iframes[0];
_199=(_192?_19b:(!_184.UAie?"100%":"99%"));
_183=false;
}
}
}
}
if(_196){
_18a=this.cNodeCss;
var _19c=_185.cssOx,_19d=_185.cssOy;
if(_192&&!_187){
_189[_19d]="hidden";
_18a[_19d]="visible";
}else{
_189[_19d]="hidden";
_18a[_19d]=(!_187?"auto":"hidden");
}
}
if(_195){
var lIdx=_185.cssL,_19f=_185.cssLU;
var tIdx=_185.cssT,_1a1=_185.cssTU;
if(_190){
_189[lIdx]="auto";
_189[_19f]="";
_189[tIdx]="auto";
_189[_1a1]="";
}else{
_189[lIdx]=_197.l;
_189[_19f]="px";
_189[tIdx]=_197.t;
_189[_1a1]="px";
}
}
if(_194){
_18a=this.cNodeCss;
var hIdx=_185.cssH,_1a3=_185.cssHU;
if(_192&&_18e==null){
_189[hIdx]="";
_189[_1a3]="";
_18a[hIdx]="";
_18a[_1a3]="";
}else{
var h=_197.h;
var _1a5=_184.css.cssDis;
var _1a6;
var _1a7;
if(_18a[_1a5]=="none"){
_1a6=_188.tbNode.mBh;
_1a7="";
_18a[_1a3]="";
}else{
_1a6=(h-_188.dNode.lessH);
_1a7=_1a6-_188.cNode.lessH-_188.cNode_mBh_LessBars;
_18a[_1a3]="px";
}
_189[hIdx]=_1a6;
_189[_1a3]="px";
_18a[hIdx]=_1a7;
if(_18e){
_18e[hIdx]=_1a6;
_18e[_1a3]="px";
_18d=true;
if(_18f){
_18f[hIdx]=_1a7;
_18f[_1a3]=_18a[_1a3];
}
}
}
}
if(_193){
var w=_197.w;
_18a=this.cNodeCss;
_18b=this.tbNodeCss;
_18c=this.rbNodeCss;
var wIdx=_185.cssW,_1aa=_185.cssWU;
if(_191&&(!this.ie6||!w)){
_189[wIdx]="";
_189[_1aa]="";
_18a[wIdx]="";
_18a[_1aa]="";
if(_18b){
_18b[wIdx]="";
_18b[_1aa]="";
}
if(_18c){
_18c[wIdx]="";
_18c[_1aa]="";
}
}else{
var _1ab=(w-_188.dNode.lessW);
_189[wIdx]=_1ab;
_189[_1aa]="px";
_18a[wIdx]=_1ab-_188.cNode.lessW;
_18a[_1aa]="px";
if(_18b){
_18b[wIdx]=_1ab-_188.tbNode.lessW;
_18b[_1aa]="px";
}
if(_18c){
_18c[wIdx]=_1ab-_188.rbNode.lessW;
_18c[_1aa]="px";
}
if(_18e){
_18e[wIdx]=_1ab;
_18e[_1aa]="px";
_18d=true;
if(_18f){
_18f[wIdx]=_18a[wIdx];
_18f[_1aa]=_18a[_1aa];
}
}
}
}
if(!_183){
this.domNode.style.cssText=_189.join("");
if(_18a){
this.containerNode.style.cssText=_18a.join("");
}
if(_18b){
this.tbNode.style.cssText=_18b.join("");
}
if(_18c){
this.rbNode.style.cssText=_18c.join("");
}
if(_18d){
this.bgIframe.iframe.style.cssText=_18e.join("");
if(_18f){
_186.iframeCover.style.cssText=_18f.join("");
}
}
}
if(_198&&_199){
this._deferSetIFrameH(_198,_199,false,50);
}
},_deferSetIFrameH:function(_1ac,_1ad,_1ae,_1af,_1b0){
if(!_1af){
_1af=100;
}
var pWin=this;
window.setTimeout(function(){
_1ac.height=_1ad;
if(_1ae){
if(_1b0==null){
_1b0=50;
}
if(_1b0==0){
pWin._forceRefreshZIndexAndForget();
}else{
dojo.lang.setTimeout(pWin,pWin._forceRefreshZIndexAndForget,_1b0);
}
}
},_1af);
},_getWindowMarginBox:function(_1b2,_1b3){
var _1b4=this.domNode;
if(_1b2==null){
_1b2=this._getLayoutInfo().dNode;
}
var _1b5=null;
if(_1b3.UAope){
_1b5=(this.posStatic?_1b3.page.layoutInfo.column:_1b3.page.layoutInfo.desktop);
}
return _1b3.ui.getMarginBox(_1b4,_1b2,_1b5,_1b3);
},_forceRefreshZIndex:function(){
var _1b6=jetspeed;
var zTop=this._setAsTopZIndex(_1b6.page,_1b6.css,this.dNodeCss,this.posStatic);
this.domNode.style.zIndex=zTop;
},_forceRefreshZIndexAndForget:function(){
var zTop=jetspeed.page.getPWinTopZIndex(this.posStatic);
this.domNode.style.zIndex=String(zTop);
},getIFramesAndObjects:function(_1b9,_1ba){
var _1bb=this.containerNode;
var _1bc={};
var _1bd=false;
if(!_1ba){
var _1be=_1bb.getElementsByTagName("object");
if(_1be&&_1be.length>0){
_1bc.objects=_1be;
_1bd=true;
}
}
var _1bf=_1bb.getElementsByTagName("iframe");
if(_1bf&&_1bf.length>0){
_1bc.iframes=_1bf;
if(!_1b9){
return _1bc;
}
_1bd=true;
var _1c0=[];
for(var i=0;i<_1bf.length;i++){
var ifrm=_1bf[i];
var w=new Number(String(ifrm.width));
w=(isNaN(w)?null:String(ifrm.width));
var h=new Number(String(ifrm.height));
h=(isNaN(h)?null:String(ifrm.height));
_1c0.push({w:w,h:h});
}
_1bc.iframesSize=_1c0;
}
if(!_1bd){
return null;
}
return _1bc;
},contentChanged:function(evt){
if(this.inContentChgd==false){
this.inContentChgd=true;
if(this.heightToFit){
this.makeHeightToFit(true);
}
this.inContentChgd=false;
}
},closeWindow:function(){
var _1c6=jetspeed;
var jsUI=_1c6.ui;
var _1c8=_1c6.page;
var _1c9=dojo;
var _1ca=_1c9.event;
var wDC=this.decConfig;
if(this.iframesInfo){
_1c8.unregPWinIFrameCover(this);
}
this._setupTitlebar(null,wDC,this.portlet,_1c6.docBody,document,_1c6,_1c6.id,_1c6.prefs,jsUI,_1c8,_1c9);
if(this.drag){
this.drag.destroy(_1c9,_1ca,_1c6,jsUI);
this.drag=null;
}
if(this.resizeHandle){
this.resizeHandle.destroy(_1ca,_1c6,jsUI);
this.resizeHandle=null;
}
this._destroyChildWidgets(_1c9);
this._removeUntiledEvents();
var _1cc=this.domNode;
if(_1cc&&_1cc.parentNode){
_1cc.parentNode.removeChild(_1cc);
}
this.domNode=null;
this.containerNode=null;
this.tbNode=null;
this.rbNode=null;
},_destroyChildWidgets:function(_1cd){
if(this.childWidgets){
var _1ce=this.childWidgets;
var _1cf=_1ce.length,_1d0,swT,swI;
_1cd.debug("PortletWindow ["+this.widgetId+"] destroy child widgets ("+_1cf+")");
for(var i=(_1cf-1);i>=0;i--){
try{
_1d0=_1ce[i];
if(_1d0){
swT=_1d0.widgetType;
swI=_1d0.widgetId;
_1d0.destroy();
_1cd.debug("destroyed child widget["+i+"]: "+swT+" "+swI);
}
_1ce[i]=null;
}
catch(e){
}
}
this.childWidgets=null;
}
},getPageColumnIndex:function(){
return jetspeed.page.getColIndexForNode(this.domNode);
},endSizing:function(e){
jetspeed.ui.evtDisconnect("after",this.resizeHandle,"_endSizing",this,"endSizing");
this.windowIsSizing=false;
if(this.portlet&&this.windowState!=jetspeed.id.ACT_MAXIMIZE){
this.portlet.submitWinState();
}
},endDragging:function(_1d5,_1d6,_1d7){
var _1d8=jetspeed;
var ie6=this.ie6;
if(_1d6){
this.posStatic=false;
}else{
if(_1d7){
this.posStatic=true;
}
}
var _1da=this.posStatic;
if(!_1da){
var _1db=this.getDimsObj(_1da);
if(_1d5&&_1d5.left!=null&&_1d5.top!=null){
_1db.l=_1d5.left;
_1db.t=_1d5.top;
if(!_1d6){
this._alterCss(false,false,false,true,false,true);
}
}
if(_1d6){
this._updtDimsObj(false,false,true);
this._alterCss(true,true,false,true);
this._addUntiledEvents();
}
}else{
if(_1d7){
this._setAsTopZIndex(_1d8.page,_1d8.css,this.dNodeCss,_1da);
this._updtDimsObj(false,false);
}
if(!ie6){
this._alterCss(true);
this.resizeNotifyChildWidgets();
}else{
this._resetIE6TiledSize(_1d7);
}
}
if(this.portlet&&this.windowState!=_1d8.id.ACT_MAXIMIZE){
this.portlet.submitWinState();
}
if(ie6){
dojo.lang.setTimeout(this,this._IEPostDrag,_1d8.widget.ie6PostDragAddDelay);
}
},getCurWinState:function(_1dc){
var _1dd=this.domNode;
var _1de=this.posStatic;
if(!_1dd){
return null;
}
var _1df=_1dd.style;
var _1e0={};
if(!_1de){
_1e0.zIndex=_1df.zIndex;
}
if(_1dc){
return _1e0;
}
var _1e1=this.getDimsObj(_1de);
_1e0.width=(_1e1.w?String(_1e1.w):"");
_1e0.height=(_1e1.h?String(_1e1.h):"");
_1e0[jetspeed.id.PP_WINDOW_POSITION_STATIC]=_1de;
_1e0[jetspeed.id.PP_WINDOW_HEIGHT_TO_FIT]=this.heightToFit;
if(!_1de){
_1e0.left=(_1e1.l!=null?String(_1e1.l):"");
_1e0.top=(_1e1.t!=null?String(_1e1.t):"");
}else{
var _1e2=jetspeed.page.getPortletCurColRow(_1dd);
if(_1e2!=null){
_1e0.column=_1e2.column;
_1e0.row=_1e2.row;
_1e0.layout=_1e2.layout;
}else{
throw new Error("Can't find row/col/layout for window: "+this.widgetId);
}
}
return _1e0;
},getCurWinStateForPersist:function(_1e3){
var _1e4=this.getCurWinState(_1e3);
this._mkNumProp(null,_1e4,"left");
this._mkNumProp(null,_1e4,"top");
this._mkNumProp(null,_1e4,"width");
this._mkNumProp(null,_1e4,"height");
return _1e4;
},_mkNumProp:function(_1e5,_1e6,_1e7){
var _1e8=(_1e6!=null&&_1e7!=null);
if(_1e5==null&&_1e8){
_1e5=_1e6[_1e7];
}
if(_1e5==null||_1e5.length==0){
_1e5=0;
}else{
var _1e9="";
for(var i=0;i<_1e5.length;i++){
var _1eb=_1e5.charAt(i);
if((_1eb>="0"&&_1eb<="9")||_1eb=="."){
_1e9+=_1eb.toString();
}
}
if(_1e9==null||_1e9.length==0){
_1e9="0";
}
if(_1e8){
_1e6[_1e7]=_1e9;
}
_1e5=new Number(_1e9);
}
return _1e5;
},setPortletContent:function(html,url){
var _1ee=jetspeed;
var _1ef=dojo;
var ie6=this.ie6;
var _1f1=null;
var _1f2=this.containerNode;
if(ie6){
_1f1=this.iNodeCss;
if(this.heightToFit){
this.iNodeCss=null;
this._alterCss(false,true);
}
}
var _1f3=html.toString();
if(!this.exclPContent){
_1f3="<div class=\"PContent\" >"+_1f3+"</div>";
}
var _1f4=this._splitAndFixPaths_scriptsonly(_1f3,url,_1ee);
var doc=_1f2.ownerDocument;
var _1f6=this.setContent(_1f4,doc,_1ef);
this.childWidgets=((_1f6&&_1f6.length>0)?_1f6:null);
var _1f7=false;
if(_1f4.scripts!=null&&_1f4.scripts.length!=null&&_1f4.scripts.length>0){
_1ee.page.win_onload=false;
this._executeScripts(_1f4.scripts,_1ef);
this.onLoad();
if(_1ee.page.win_onload&&(typeof setTimeout=="object")){
_1f7=true;
}
}
if(_1f7){
_1ef.lang.setTimeout(this,this._setPortletContentScriptsDone,20,_1ee,_1ef,_1f1);
}else{
this._setPortletContentScriptsDone(_1ee,_1ef,_1f1);
}
},_setPortletContentScriptsDone:function(_1f8,_1f9,_1fa,_1fb){
_1f8=(_1f8!=null?_1f8:jetspeed);
_1f9=(_1f9!=null?_1f9:dojo);
var _1fc=this.containerNode;
var doc=_1fc.ownerDocument;
var ie6=this.ie6;
if(this.portlet){
this.portlet.postParseAnnotateHtml(_1fc);
}
var _1ff=this.iframesInfo;
var _200=this.getIFramesAndObjects(true,false);
var _201=null,_202=false;
if(_200!=null){
if(_1ff==null){
this.iframesInfo=_1ff={layout:false};
var _203=doc.createElement("div");
var _204="portletWindowIFrameCover";
_203.className=_204;
_1fc.appendChild(_203);
if(_1f8.UAie){
_203.className=(_204+"IE")+" "+_204;
if(ie6){
_1ff.iframeCoverIE6Css=_1f8.css.cssWidthHeight.concat();
}
}
_1ff.iframeCover=_203;
_1f8.page.regPWinIFrameCover(this);
}
var _205=_1ff.iframesSize=_200.iframesSize;
var _206=_200.iframes;
var _207=_1ff.layout;
var _208=_1ff.layout=(_206&&_206.length==1&&_205[0].h!=null);
if(_207!=_208){
_202=true;
}
if(_208){
if(!this.heightToFit){
_201=_206[0];
}
var wDC=this.decConfig;
var _1fc=this.containerNode;
_1fc.firstChild.className="PContent portletIFramePContent";
_1fc.className=wDC.cNodeClass+" "+this.iframeCoverContainerClass;
if(!wDC.layoutIFrame){
this._createLayoutInfo(wDC,true,this.domNode,_1fc,this.tbNode,this.rbNode,_1f9,_1f8,_1f8.ui);
}
}
var _20a=null;
var _20b=_200.objects;
if(_20b){
var _20c=_1f8.page.swfInfo;
if(_20c){
for(var i=0;i<_20b.length;i++){
var _20e=_20b[i];
var _20f=_20e.id;
if(_20f){
var swfI=_20c[_20f];
if(swfI){
if(_20a==null){
_20a={};
}
_20a[_20f]=swfI;
}
}
}
}
}
if(_20a){
_1ff.swfInfo=_20a;
}else{
delete _1ff.swfInfo;
}
}else{
if(_1ff!=null){
if(_1ff.layout){
this.containerNode.className=this.decConfig.cNodeClass;
_202=true;
}
this.iframesInfo=null;
_1f8.page.unregPWinIFrameCover(this);
}
}
if(_202){
this._alterCss(false,false,true);
}
if(this.restoreOnNextRender){
this.restoreOnNextRender=false;
this.restoreWindow();
}
if(ie6){
this._updtDimsObj(false,false,true,false,true);
if(_1fa==null){
var _211=_1f8.css;
_1fa=_211.cssHeight.concat();
_1fa[_211.cssDis]="inline";
}
this.iNodeCss=_1fa;
this._alterCss(false,false,true);
}
if(this.minimizeOnNextRender){
this.minimizeOnNextRender=false;
this.minimizeWindow(true);
this.actionBtnSync(_1f8,_1f8.id);
this.needsRenderOnRestore=true;
}
if(_201){
this._deferSetIFrameH(_201,(!_1f8.UAie?"100%":"99%"),true);
}
},_setContentObjects:function(){
delete this._objectsInfo;
},setContent:function(data,doc,_214){
var _215=null;
var step=1;
try{
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=true;
step=2;
this._setContent(data.xml,_214);
step=3;
if(this.parseContent){
var node=this.containerNode;
var _218=new _214.xml.Parse();
var frag=_218.parseElement(node,null,true);
_215=_214.widget.getParser().createSubComponents(frag,null);
}
}
catch(e){
dojo.hostenv.println("ERROR in PortletWindow ["+this.widgetId+"] setContent while "+(step==1?"running onUnload":(step==2?"setting innerHTML":"creating dojo widgets"))+" - "+jetspeed.formatError(e));
}
return _215;
},_setContent:function(cont,_21b){
this._destroyChildWidgets(_21b);
try{
var node=this.containerNode;
while(node.firstChild){
_21b.html.destroyNode(node.firstChild);
}
node.innerHTML=cont;
}
catch(e){
e.text="Couldn't load content:"+e.description;
this._handleDefaults(e,"onContentError");
}
},_splitAndFixPaths_scriptsonly:function(s,url,_21f){
var _220=true;
var _221,attr;
var _223=[];
var _224=/<script([^>]*)>([\s\S]*?)<\/script>/i;
var _225=/src=(['"]?)([^"']*)\1/i;
while(_221=_224.exec(s)){
if(_220&&_221[1]){
if(attr=_225.exec(_221[1])){
_223.push({path:attr[2]});
}
}
if(_221[2]){
var sc=_221[2];
if(!sc){
continue;
}
if(_220){
_223.push(sc);
}
}
s=s.substr(0,_221.index)+s.substr(_221.index+_221[0].length);
}
return {"xml":s,"styles":[],"titles":[],"requires":[],"scripts":_223,"url":url};
},onLoad:function(e){
this._runStack("_onLoadStack");
this.isLoaded=true;
},onUnload:function(e){
this._runStack("_onUnloadStack");
delete this.scriptScope;
},_runStack:function(_229){
var st=this[_229];
var err="";
var _22c=this.scriptScope||window;
for(var i=0;i<st.length;i++){
try{
st[i].call(_22c);
}
catch(e){
err+="\n"+st[i]+" failed: "+e.description;
}
}
this[_229]=[];
if(err.length){
var name=(_229=="_onLoadStack")?"addOnLoad":"addOnUnLoad";
this._handleDefaults(name+" failure\n "+err,"onExecError","debug");
}
},_isUrlFromSameDomain:function(url){
var _230=/^https?\:\/\/([\w\.-]+)[:\/]?/i;
if(_230.test(url)){
var _231=RegExp.$1;
var _232=window.location.hostname;
if(_232!=_231){
var _233=_232.replace(/^www\w*\./i,"");
if(_231.lastIndexOf(_233)!=_231.length-_233.length){
return false;
}
}
}
return true;
},_executeScripts:function(_234,_235){
var _236=jetspeed;
var _237=_235.hostenv;
var _238=_236.page;
var _239=document.getElementsByTagName("head")[0];
var tmp,uri,code="";
for(var i=0;i<_234.length;i++){
if(!_234[i].path){
tmp=this._fixScripts(_234[i],true);
if(tmp){
code+=((code.length>0)?";":"")+tmp;
}
continue;
}
var uri=_234[i].path;
var _23e=null;
try{
if(this._isUrlFromSameDomain(uri)){
_23e=_237.getText(uri,null,false);
}else{
_235.debug("Cannot retrieve script from the different domain for portlet ["+this.widgetId+"] url="+uri);
}
if(_23e){
_23e=this._fixScripts(_23e,false);
code+=((code.length>0)?";":"")+_23e;
}
}
catch(ex){
_235.debug("Error loading script for portlet ["+this.widgetId+"] url="+uri+" - "+_236.formatError(ex));
}
try{
if(_23e&&!_236.containsElement("script","src",uri,_239)){
_236.addDummyScriptToHead(uri);
}
}
catch(ex){
_235.debug("Error added fake script element to head for portlet ["+this.widgetId+"] url="+uri+" - "+_236.formatError(ex));
}
}
try{
var djg=_235.global();
if(djg.execScript){
djg.execScript(code);
}else{
var djd=_235.doc();
var sc=djd.createElement("script");
sc.appendChild(djd.createTextNode(code));
(this.containerNode||this.domNode).appendChild(sc);
}
}
catch(e){
var _242="Error running scripts for portlet ["+this.widgetId+"] - "+_236.formatError(e);
e.text=_242;
_235.hostenv.println(_242);
_235.hostenv.println(code);
}
},_fixScripts:function(_243,_244){
var _245=/\b([a-z_A-Z$]\w*)\s*\.\s*(addEventListener|attachEvent)\s*\(/;
var _246,_247,_248;
while(_246=_245.exec(_243)){
_247=_246[1];
_248=_246[2];
_243=_243.substr(0,_246.index)+"jetspeed.postload_"+_248+"("+_247+","+_243.substr(_246.index+_246[0].length);
}
var _249=/\b(document\s*.\s*write(ln)?)\s*\(/;
while(_246=_249.exec(_243)){
_243=_243.substr(0,_246.index)+"jetspeed.postload_docwrite("+_243.substr(_246.index+_246[0].length);
}
var _24a=/(;\s|\s+)([a-z_A-Z$][\w.]*)\s*\.\s*(URL\s*|(location\s*(\.\s*href\s*){0,1}))=\s*(("[^"]*"|'[^']*'|[^;])[^;]*)/;
while(_246=_24a.exec(_243)){
var _24b=_246[3];
_24b=_24b.replace(/^\s+|\s+$/g,"");
_243=_243.substr(0,_246.index)+_246[1]+"jetspeed.setdoclocation("+_246[2]+", \""+_24b+"\", ("+_246[6]+"))"+_243.substr(_246.index+_246[0].length);
}
if(_244){
_243=_243.replace(/<!--|-->/g,"");
}
return _243;
},_cacheSetting:function(_24c,_24d){
var _24e=dojo.lang;
for(var x in this.bindArgs){
if(_24e.isUndefined(_24c[x])){
_24c[x]=this.bindArgs[x];
}
}
if(_24e.isUndefined(_24c.useCache)){
_24c.useCache=_24d;
}
if(_24e.isUndefined(_24c.preventCache)){
_24c.preventCache=!_24d;
}
if(_24e.isUndefined(_24c.mimetype)){
_24c.mimetype="text/html";
}
return _24c;
},_handleDefaults:function(e,_251,_252){
var _253=dojo;
if(!_251){
_251="onContentError";
}
if(_253.lang.isString(e)){
e={text:e};
}
if(!e.text){
e.text=e.toString();
}
e.toString=function(){
return this.text;
};
if(typeof e.returnValue!="boolean"){
e.returnValue=true;
}
if(typeof e.preventDefault!="function"){
e.preventDefault=function(){
this.returnValue=false;
};
}
this[_251](e);
if(e.returnValue){
switch(_252){
case true:
case "alert":
alert(e.toString());
break;
case "debug":
_253.debug(e.toString());
break;
default:
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=false;
if(arguments.callee._loopStop){
_253.debug(e.toString());
}else{
arguments.callee._loopStop=true;
this._setContent(e.toString(),_253);
}
}
}
arguments.callee._loopStop=false;
},onExecError:function(e){
},onContentError:function(e){
},setPortletTitle:function(_256){
if(_256){
this.title=_256;
}else{
this.title="";
}
if(this.windowInitialized&&this.tbTextNode){
this.tbTextNode.innerHTML=this.title;
}
},getPortletTitle:function(){
return this.title;
},_IEPostDrag:function(){
if(!this.posStatic){
return;
}
var _257=this.domNode.parentNode;
dojo.dom.insertAtIndex(jetspeed.widget.ie6ZappedContentHelper,_257,0);
dojo.lang.setTimeout(this,this._IERemoveHelper,jetspeed.widget.ie6PostDragRmDelay);
},_IERemoveHelper:function(){
dojo.dom.removeNode(jetspeed.widget.ie6ZappedContentHelper);
}});
jetspeed.widget.showAllPortletWindows=function(){
var _258=jetspeed;
var _259=_258.css;
var _25a=_259.cssDis,_25b=_259.cssNoSelNm,_25c=_259.cssNoSel,_25d=_259.cssNoSelEnd;
var _25e=_258.page.getPWins(false);
var _25f,_260;
for(var i=0;i<_25e.length;i++){
_25f=_25e[i];
if(_25f){
_260=_25f.dNodeCss;
_260[_25b]="";
_260[_25c]="";
_260[_25d]="";
_260[_25a]="block";
_25f.domNode.style.display="block";
_25f.domNode.style.visibility="visible";
}
}
};
jetspeed.widget.hideAllPortletWindows=function(_262){
var _263=jetspeed;
var _264=_263.css;
var _265=_264.cssDis,_266=_264.cssNoSelNm,_267=_264.cssNoSel,_268=_264.cssNoSelEnd;
var _269=_263.page.getPWins(false);
var _26a,_26b,_26c;
for(var i=0;i<_269.length;i++){
_26b=_269[i];
_26a=true;
if(_26b&&_262&&_262.length>0){
for(var _26e=0;_26e<_262.length;_26e++){
if(_26b.widgetId==_262[_26e]){
_26a=false;
break;
}
}
}
if(_26b){
_26c=_26b.dNodeCss;
_26c[_266]="";
_26c[_267]="";
_26c[_268]="";
if(_26a){
_26c[_265]="none";
_26b.domNode.style.display="none";
}else{
_26c[_265]="block";
_26b.domNode.style.display="block";
}
_26b.domNode.style.visibility="visible";
}
}
};
jetspeed.widget.WinScroller=function(){
var _26f=this.jsObj;
this.UAmoz=_26f.UAmoz;
this.UAope=_26f.UAope;
};
dojo.extend(jetspeed.widget.WinScroller,{jsObj:jetspeed,djObj:dojo,typeNm:"WinScroller",V_AS_T:32,V_AS_V:16,autoScroll:function(e){
try{
var w=window;
var dy=0;
if(e.clientY<this.V_AS_T){
dy=-this.V_AS_V;
}else{
var _273=null;
if(this.UAmoz){
_273=w.innerHeight;
}else{
var doc=document,dd=doc.documentElement;
if(!this.UAope&&w.innerWidth){
_273=w.innerHeight;
}else{
if(!this.UAope&&dd&&dd.clientWidth){
_273=dd.clientHeight;
}else{
var b=jetspeed.docBody;
if(b.clientWidth){
_273=b.clientHeight;
}
}
}
}
if(_273!=null&&e.clientY>_273-this.V_AS_T){
dy=this.V_AS_V;
}
}
w.scrollBy(0,dy);
}
catch(ex){
}
},_getErrMsg:function(ex,msg,_279,_27a){
return ((_27a!=null?(_27a+"; "):"")+this.typeNm+" "+(_279==null?"<unknown>":_279.widgetId)+" "+msg+" ("+ex.toString()+")");
}});
jetspeed.widget.CreatePortletWindowResizeHandler=function(_27b,_27c){
var _27d=new jetspeed.widget.PortletWindowResizeHandle(_27b,_27c);
var doc=document;
var _27f=doc.createElement("div");
_27f.className=_27d.rhClass;
var _280=doc.createElement("div");
_27f.appendChild(_280);
_27b.rbNode.appendChild(_27f);
_27d.domNode=_27f;
_27d.build();
return _27d;
};
jetspeed.widget.PortletWindowResizeHandle=function(_281,_282){
this.pWin=_281;
_282.widget.WinScroller.call(this);
};
dojo.inherits(jetspeed.widget.PortletWindowResizeHandle,jetspeed.widget.WinScroller);
dojo.extend(jetspeed.widget.PortletWindowResizeHandle,{typeNm:"Resize",rhClass:"portletWindowResizeHandle",build:function(){
this.events=[jetspeed.ui.evtConnect("after",this.domNode,"onmousedown",this,"_beginSizing")];
},destroy:function(_283,_284,jsUI){
this._cleanUpLastEvt(_283,_284,jsUI);
jsUI.evtDisconnectWObjAry(this.events,_283);
this.events=this.pWin=null;
},_cleanUpLastEvt:function(_286,_287,jsUI){
var _289=null;
try{
jsUI.evtDisconnectWObjAry(this.tempEvents,_286);
this.tempEvents=null;
}
catch(ex){
_289=this._getErrMsg(ex,"event clean-up error",this.pWin,_289);
}
try{
_287.page.displayAllPWinIFrameCovers(true);
}
catch(ex){
_289=this._getErrMsg(ex,"clean-up error",this.pWin,_289);
}
if(_289!=null){
dojo.raise(_289);
}
},_beginSizing:function(e){
if(this._isSizing){
return false;
}
var pWin=this.pWin;
var node=pWin.domNode;
if(!node){
return false;
}
this.targetDomNode=node;
var _28d=jetspeed;
var jsUI=_28d.ui;
var _28f=dojo;
var _290=_28f.event;
var _291=_28d.docBody;
if(this.tempEvents!=null){
this._cleanUpLastEvt(_290,_28d,jsUI);
}
this._isSizing=true;
this.startPoint={x:e.pageX,y:e.pageY};
var mb=_28f.html.getMarginBox(node);
this.startSize={w:mb.width,h:mb.height};
var d=node.ownerDocument;
var _294=[];
_294.push(jsUI.evtConnect("after",_291,"onmousemove",this,"_changeSizing",_290,25));
_294.push(jsUI.evtConnect("after",_291,"onmouseup",this,"_endSizing",_290));
_294.push(jsUI.evtConnect("after",d,"ondragstart",_28d,"_stopEvent",_290));
_294.push(jsUI.evtConnect("after",d,"onselectstart",_28d,"_stopEvent",_290));
_28d.page.displayAllPWinIFrameCovers(false);
this.tempEvents=_294;
try{
e.preventDefault();
}
catch(ex){
}
},_changeSizing:function(e){
var pWin=this.pWin;
if(pWin.heightToFit){
pWin.makeHeightVariable(true,true);
}
try{
if(!e.pageX||!e.pageY){
return;
}
}
catch(ex){
return;
}
this.autoScroll(e);
var dx=this.startPoint.x-e.pageX;
var dy=this.startPoint.y-e.pageY;
var newW=this.startSize.w-dx;
var newH=this.startSize.h-dy;
var _29b=pWin.posStatic;
if(_29b){
newW=this.startSize.w;
}
if(this.minSize){
var mb=dojo.html.getMarginBox(this.targetDomNode);
if(newW<this.minSize.w){
newW=mb.width;
}
if(newH<this.minSize.h){
newH=mb.height;
}
}
pWin.resizeTo(newW,newH);
try{
e.preventDefault();
}
catch(ex){
}
},_endSizing:function(e){
var _29e=jetspeed;
var _29f=dojo;
this._cleanUpLastEvt(_29f.event,_29e,_29e.ui);
this.pWin.actionBtnSyncDefer(true,_29e,_29f);
this._isSizing=false;
}});
jetspeed.widget.ie6PostDragAddDelay=60;
jetspeed.widget.ie6PostDragRmDelay=120;
jetspeed.widget.BackgroundIframe=function(node,_2a1,_2a2){
if(!_2a1){
_2a1=this.defaultStyleClass;
}
var html="<iframe src='' frameborder='0' scrolling='no' class='"+_2a1+"'>";
this.iframe=_2a2.doc().createElement(html);
this.iframe.tabIndex=-1;
node.appendChild(this.iframe);
};
dojo.lang.extend(jetspeed.widget.BackgroundIframe,{defaultStyleClass:"ie6BackgroundIFrame",iframe:null});
if(!dojo.dnd){
dojo.dnd={};
}
dojo.dnd.Mover=function(_2a4,_2a5,_2a6,_2a7,_2a8,e,_2aa,_2ab,_2ac){
var jsUI=_2ac.ui;
var _2ae=_2ab.event;
_2ac.widget.WinScroller.call(this);
if(_2ac.widget._movingInProgress){
if(djConfig.isDebug){
_2ac.debugAlert("ERROR - Mover initiation before previous Mover was destroyed");
}
}
_2ac.widget._movingInProgress=true;
this.moveInitiated=false;
this.moveableObj=_2a8;
this.windowOrLayoutWidget=_2a4;
this.node=_2a5;
this.dragLayoutColumn=_2a6;
this.cL_NA_ED=_2a7;
this.posStatic=_2a4.posStatic;
this.notifyOnAbsolute=_2aa;
if(e.ctrlKey&&_2a4.moveAllowTilingChg){
if(this.posStatic){
this.changeToUntiled=true;
}else{
if(_2ac.prefs.windowTiling){
this.changeToTiled=true;
this.changeToTiledStarted=false;
}
}
}
this.posRecord={};
this.disqualifiedColumnIndexes={};
if(_2a6!=null){
this.disqualifiedColumnIndexes=_2a6.col.getDescendantCols();
}
this.marginBox={l:e.pageX,t:e.pageY};
var doc=this.node.ownerDocument;
var _2b0=[];
var _2b1=jsUI.evtConnect("after",doc,"onmousemove",this,"onFirstMove",_2ae);
_2b0.push(jsUI.evtConnect("after",doc,"onmousemove",this,"onMouseMove",_2ae));
_2b0.push(jsUI.evtConnect("after",doc,"onmouseup",this,"mouseUpDestroy",_2ae));
_2b0.push(jsUI.evtConnect("after",doc,"ondragstart",_2ac,"_stopEvent",_2ae));
_2b0.push(jsUI.evtConnect("after",doc,"onselectstart",_2ac,"_stopEvent",_2ae));
if(_2ac.UAie6){
_2b0.push(jsUI.evtConnect("before",doc,"onmousedown",this,"mouseDownDestroy",_2ae));
_2b0.push(jsUI.evtConnect("before",_2a8.handle,"onmouseup",_2a8,"onMouseUp",_2ae));
}
_2ac.page.displayAllPWinIFrameCovers(false);
_2b0.push(_2b1);
this.events=_2b0;
this.pSLastColChgIdx=null;
this.pSLastColChgTime=null;
this.pSLastNaturalColChgYTest=null;
this.pSLastNaturalColChgHistory=null;
this.pSLastNaturalColChgChoiceMap=null;
this.isDebug=false;
if(_2ac.debug.dragWindow){
this.isDebug=true;
this.devKeepLastMsg=null;
this.devKeepLastCount=0;
this.devLastX=null;
this.devLastY=null;
this.devLastTime=null,this.devLastColI=null;
this.devChgTh=30;
this.devLrgTh=200;
this.devChgSubsqTh=10;
this.devTimeTh=6000;
this.devI=_2ac.debugindent;
this.devIH=_2ac.debugindentH;
this.devIT=_2ac.debugindentT;
this.devI3=_2ac.debugindent3;
this.devICH=_2ac.debugindentch;
}
};
dojo.inherits(dojo.dnd.Mover,jetspeed.widget.WinScroller);
dojo.extend(dojo.dnd.Mover,{typeNm:"Mover",pSColChgTimeTh:3000,onMouseMove:function(e){
var _2b3=this.jsObj;
var _2b4=this.djObj;
var _2b5=this.UAmoz;
this.autoScroll(e);
var m=this.marginBox;
var _2b7=false;
var x=m.l+e.pageX;
var y=m.t+e.pageY;
var _2ba=this.isDebug;
var _2bb=false;
var _2bc=null,_2bd=null,_2be,_2bf,_2c0,_2c1,_2c2;
if(_2ba){
_2be=this.devI;
_2bf=this.devIH;
_2c0=this.devI3;
_2c1=this.devICH,_2c2=this.devIT;
_2bc=(new Date().getTime());
if(this.devLastX==null||this.devLastY==null){
this.devLastX=x;
this.devLastY=y;
}else{
var _2c3=(Math.abs(x-this.devLastX)>this.devLrgTh)||(Math.abs(y-this.devLastY)>this.devLrgTh);
if(!_2c3&&this.devLastTime!=null&&((this.devLastTime+this.devTimeTh)>_2bc)){
}else{
if(Math.abs(x-this.devLastX)>this.devChgTh){
this.devLastX=x;
_2bb=true;
}
if(Math.abs(y-this.devLastY)>this.devChgTh){
this.devLastY=y;
_2bb=true;
}
}
}
}
if(_2b5&&this.firstEvtAdjustXY!=null){
x=x+this.firstEvtAdjustXY.l;
y=y+this.firstEvtAdjustXY.t;
this.firstEvtAdjustXY=null;
_2b7=true;
}
_2b3.ui.setMarginBox(this.node,x,y,null,null,this.nodeLayoutInfo,_2b3,_2b4);
var _2c4=this.posRecord;
_2c4.left=x;
_2c4.top=y;
var _2c5=false;
var _2c6=this.posStatic;
if(!_2c6){
if(!_2b7&&this.changeToTiled&&!this.changeToTiledStarted){
_2c5=true;
_2c6=true;
}
}
if(_2c6&&!_2b7){
var _2c7=this.columnInfoArray;
var _2c8=_2b3.page.columns;
var _2c9=this.heightHalf;
var _2ca=_2c8.length;
var _2cb=e.pageX;
var _2cc=y+_2c9;
var _2cd=this.pSLastColChgIdx;
var _2ce=this.pSLastNaturalColChgChoiceMap;
var _2cf=null,_2d0=[],_2d1=null;
var _2d2,_2d3,_2d4,_2d5,lowY,_2d7,_2d8,_2d9,_2da;
for(var i=0;i<_2ca;i++){
_2d2=_2c7[i];
if(_2d2!=null){
if(_2cb>=_2d2.left&&_2cb<=_2d2.right){
if(_2cc>=(_2d2.top-30)||(_2ce!=null&&_2ce[i]!=null)){
_2d3=Math.min(Math.abs(_2cc-(_2d2.top)),Math.abs(e.pageY-(_2d2.top)));
_2d4=Math.min(Math.abs(_2cc-(_2d2.yhalf)),Math.abs(e.pageY-(_2d2.yhalf)));
_2d5=Math.min(Math.abs(_2cc-_2d2.bottom),Math.abs(e.pageY-_2d2.bottom));
lowY=Math.min(_2d3,_2d4);
lowY=Math.min(lowY,_2d5);
_2d8=null;
_2da=_2cf;
while(_2da!=null){
_2d9=_2d0[_2da];
if(lowY<_2d9.lowY){
break;
}else{
_2d8=_2d9;
_2da=_2d9.nextIndex;
}
}
_2d0.push({index:i,lowY:lowY,nextIndex:_2da,lowYAlign:((!_2ba)?null:(lowY==_2d3?"^":(lowY==_2d4?"~":"_")))});
_2d7=(_2d0.length-1);
if(_2d8!=null){
_2d8.nextIndex=_2d7;
}else{
_2cf=_2d7;
}
if(i==_2cd){
_2d1=lowY;
}
}else{
if(_2ba){
if(_2bd==null){
_2bd=[];
}
var _2dc=(_2d2.top-30)-_2cc;
_2bd.push(_2b4.string.padRight(String(i),2,_2c1)+" y! "+_2b4.string.padRight(String(_2dc),4,_2c1));
}
}
}else{
if(_2ba&&_2cb>_2d2.width){
if(_2bd==null){
_2bd=[];
}
var _2dc=_2cb-_2d2.width;
_2bd.push(_2b4.string.padRight(String(i),2,_2c1)+" x! "+_2b4.string.padRight(String(_2dc),4,_2c1));
}
}
}
}
var _2dd=-1;
var _2de=-1,_2df=-1;
var _2e0=null,_2e1=null,_2e2=null,_2e3=null,_2e4=null;
if(_2cf!=null){
_2d9=_2d0[_2cf];
_2dd=_2d9.index;
_2e0=_2d9.lowY;
if(_2d9.nextIndex!=null){
_2d9=_2d0[_2d9.nextIndex];
_2de=_2d9.index;
_2e1=_2d9.lowY;
_2e3=_2e1-_2e0;
if(_2d9.nextIndex!=null){
_2d9=_2d0[_2d9.nextIndex];
_2df=_2d9.index;
_2e2=_2d9.lowY;
_2e4=_2e2-_2e0;
}
}
}
var _2e5=null;
var _2e6=(new Date().getTime());
var _2e7=this.pSLastNaturalColChgYTest;
if(_2d1==null||(_2e7!=null&&Math.abs(_2cc-_2e7)>=Math.max((_2c9-Math.floor(_2c9*0.3)),Math.min(_2c9,21)))){
if(_2dd>=0){
this.pSLastNaturalColChgYTest=_2cc;
this.pSLastNaturalColChgHistory=[_2dd];
_2ce={};
_2ce[_2dd]=true;
this.pSLastNaturalColChgChoiceMap=_2ce;
}
}else{
if(_2e7==null){
this.pSLastNaturalColChgYTest=_2cc;
_2dd=_2cd;
this.pSLastNaturalColChgHistory=[_2dd];
_2ce={};
_2ce[_2dd]=true;
this.pSLastNaturalColChgChoiceMap=_2ce;
}else{
var _2e8=null;
var _2e9=this.pSLastColChgTime+this.pSColChgTimeTh;
if(_2e9<_2e6){
var _2ea=this.pSLastNaturalColChgHistory;
var _2eb=(_2ea==null?0:_2ea.length);
var _2ec=null,_2ed;
_2da=_2cf;
while(_2da!=null){
_2d9=_2d0[_2da];
colI=_2d9.index;
if(_2eb==0){
_2e8=colI;
break;
}else{
_2ed=false;
for(var i=(_2eb-1);i>=0;i--){
if(_2ea[i]==colI){
if(_2ec==null||_2ec>i){
_2ec=i;
_2e8=colI;
}
_2ed=true;
break;
}
}
if(!_2ed){
_2e8=colI;
break;
}
}
_2da=_2d9.nextIndex;
}
if(_2e8!=null){
_2dd=_2e8;
_2ce[_2dd]=true;
if(_2eb==0||_2ea[(_2eb-1)]!=_2dd){
_2ea.push(_2dd);
}
}
}else{
_2dd=_2cd;
}
if(_2ba&&_2e8!=null){
_2b4.hostenv.println(_2be+"ColChg YTest="+_2e7+" LeastRecentColI="+_2e8+" History=["+(this.pSLastNaturalColChgHistory?this.pSLastNaturalColChgHistory.join(", "):"")+"] Map={"+_2b3.printobj(this.pSLastNaturalColChgChoiceMap)+"} expire="+(_2e6-_2e9)+"}");
}
}
}
if(_2ba&&_2e5!=null){
if(this.devKeepLastMsg!=null){
_2b4.hostenv.println(this.devKeepLastMsg);
this.devKeepLastMsg=null;
this.devKeepLastCount=0;
}
_2b4.hostenv.println(_2e5);
}
var col=(_2dd>=0?_2c8[_2dd]:null);
if(_2ba){
if(this.devLastColI!=_2dd){
_2bb=true;
}
this.devLastColI=_2dd;
}
var _2f0=_2b3.widget.pwGhost;
if(_2c5){
if(col!=null){
_2b3.ui.setMarginBox(_2f0,null,null,null,m.h,this.nodeLayoutInfo,_2b3,_2b4);
_2f0.col=null;
this.changeToTiledStarted=true;
this.posStatic=true;
}
}
var _2f1=null,_2f2=false,_2f3=false;
if(_2f0.col!=col&&col!=null){
this.pSLastColChgTime=_2e6;
this.pSLastColChgIdx=_2dd;
var _2f4=_2f0.col;
if(_2f4!=null){
_2b4.dom.removeNode(_2f0);
}
_2f0.col=col;
var _2f5=_2c7[_2dd];
var _2f6=_2f5.childCount+1;
_2f5.childCount=_2f6;
if(_2f6==1){
_2c8[_2dd].domNode.style.height="";
}
col.domNode.appendChild(_2f0);
_2f3=true;
var _2f7=(_2cd!=null?((_2cd!=_2dd)?_2c7[_2cd]:null):(_2f4!=null?_2c7[_2f4.getPageColumnIndex()]:null));
if(_2f7!=null){
var _2f8=_2f7.childCount-1;
if(_2f8<0){
_2f8=0;
}
_2f7.childCount=_2f8;
if(_2f8==0){
_2c8[_2f7.pageColIndex].domNode.style.height="1px";
}
}
}
var _2f9=null,_2fa=null;
if(col!=null){
_2f9=_2b3.ui.getPWinAndColChildren(col.domNode,_2f0,true,false,true,false);
_2fa=_2f9.matchingNodes;
}
if(_2fa!=null&&_2fa.length>1){
var _2fb=_2f9.matchNodeIndexInMatchingNodes;
var _2fc=-1;
var _2fd=-1;
if(_2fb>0){
var _2fc=_2b4.html.getAbsolutePosition(_2fa[_2fb-1],true).y;
if((y-25)<=_2fc){
_2b4.dom.removeNode(_2f0);
_2f1=_2fa[_2fb-1];
_2b4.dom.insertBefore(_2f0,_2f1,true);
}
}
if(_2fb!=(_2fa.length-1)){
var _2fd=_2b4.html.getAbsolutePosition(_2fa[_2fb+1],true).y;
if((y+10)>=_2fd){
if(_2fb+2<_2fa.length){
_2f1=_2fa[_2fb+2];
_2b4.dom.insertBefore(_2f0,_2f1,true);
}else{
col.domNode.appendChild(_2f0);
_2f2=true;
}
}
}
}
if(_2bb){
var _2fe="";
if(_2f1!=null||_2f2||_2f3){
_2fe="put=";
if(_2f1!=null){
_2fe+="before("+_2f1.id+")";
}else{
if(_2f2){
_2fe+="end";
}else{
if(_2f3){
_2fe+="end-default";
}
}
}
}
_2b4.hostenv.println(_2be+"col="+_2dd+_2bf+_2fe+_2bf+"x="+x+_2bf+"y="+y+_2bf+"ePGx="+e.pageX+_2bf+"ePGy="+e.pageY+_2bf+"yTest="+_2cc);
var _2ff="",colI,_2d2;
_2da=_2cf;
while(_2da!=null){
_2d9=_2d0[_2da];
colI=_2d9.index;
_2d2=_2c7[_2d9.index];
_2ff+=(_2ff.length>0?_2c2:"")+colI+_2d9.lowYAlign+(colI<10?_2c1:"")+" -> "+_2b4.string.padRight(String(_2d9.lowY),4,_2c1);
_2da=_2d9.nextIndex;
}
_2b4.hostenv.println(_2c0+_2ff);
if(_2bd!=null){
var _300="";
for(i=0;i<_2bd.length;i++){
_300+=(i>0?_2c2:"")+_2bd[i];
}
_2b4.hostenv.println(_2c0+_300);
}
this.devLastTime=_2bc;
this.devChgTh=this.devChgSubsqTh;
}
}
},onFirstMove:function(){
var _301=this.jsObj;
var jsUI=_301.ui;
var _303=this.djObj;
var _304=this.windowOrLayoutWidget;
var node=this.node;
var _306=_304._getLayoutInfoMoveable();
this.nodeLayoutInfo=_306;
var mP=_304._getWindowMarginBox(_306,_301);
this.staticWidth=null;
var _308=_301.widget.pwGhost;
var _309=this.UAmoz;
var _30a=this.changeToUntiled;
var _30b=this.changeToTiled;
var m=null;
if(this.posStatic){
if(!_30a){
var _30d=_304.getPageColumnIndex();
var _30e=(_30d>=0?_301.page.columns[_30d]:null);
_308.col=_30e;
this.pSLastColChgTime=new Date().getTime();
this.pSLastColChgIdx=_30d;
}
m={w:mP.w,h:mP.h};
var _30f=node.parentNode;
var _310=document.getElementById(_301.id.DESKTOP);
var _311=node.style;
this.staticWidth=_311.width;
var _312=_303.html.getAbsolutePosition(node,true);
var _313=_306.mE;
m.l=_312.left-_313.l;
m.t=_312.top-_313.t;
if(_309){
if(!_30a){
jsUI.setMarginBox(_308,null,null,null,mP.h,_306,_301,_303);
}
this.firstEvtAdjustXY={l:m.l,t:m.t};
}
_311.position="absolute";
if(!_30a){
_311.zIndex=_301.page.getPWinHighZIndex()+1;
}else{
_311.zIndex=(_304._setAsTopZIndex(_301.page,_301.css,_304.dNodeCss,false));
}
if(!_30a){
_30f.insertBefore(_308,node);
if(!_309){
jsUI.setMarginBox(_308,null,null,null,mP.h,_306,_301,_303);
}
_310.appendChild(node);
var _314=jsUI.getPWinAndColChildren(_30f,_308,true,false,true);
this.prevColumnNode=_30f;
this.prevIndexInCol=_314.matchNodeIndexInMatchingNodes;
}else{
_304._updtDimsObj(false,true);
_310.appendChild(node);
}
}else{
m=mP;
}
this.moveInitiated=true;
m.l-=this.marginBox.l;
m.t-=this.marginBox.t;
this.marginBox=m;
jsUI.evtDisconnectWObj(this.events.pop(),_303.event);
var _315=this.disqualifiedColumnIndexes;
var _316=(this.isDebug||_301.debug.dragWindowStart),_317;
if(_316){
_317=_301.debugindentT;
var _318=_301.debugindentH;
var _319="";
if(_315!=null){
_319=_318+"dqCols=["+_301.objectKeys(_315).join(", ")+"]";
}
var _31a=_304.title;
if(_31a==null){
_31a=node.id;
}
_303.hostenv.println("DRAG \""+_31a+"\""+_318+((this.posStatic&&!_30a)?("col="+(_308.col?_308.col.getPageColumnIndex():"null")+_318):"")+"m.l = "+m.l+_318+"m.t = "+m.t+_319);
}
if(this.posStatic||_30b){
this.heightHalf=mP.h/2;
var _31b=this.dragLayoutColumn||{};
var _31c=jsUI.updateChildColInfo(node,_315,_31b.maxdepth,this.cL_NA_ED,(_316?1:null),_317);
if(_316){
_303.hostenv.println(_317+"--------------------");
}
this.columnInfoArray=_31c;
}
if(this.posStatic){
jsUI.setMarginBox(node,m.l,m.t,mP.w,null,_306,_301,_303);
if(this.notifyOnAbsolute){
_304.dragChangeToAbsolute(this,node,this.marginBox,_303,_301);
}
if(_30a){
this.posStatic=false;
}
}
},mouseDownDestroy:function(e){
var _31e=this.jsObj;
_31e.stopEvent(e);
this.mouseUpDestroy();
},mouseUpDestroy:function(){
var _31f=this.djObj;
var _320=this.jsObj;
this.destroy(_31f,_31f.event,_320,_320.ui);
},destroy:function(_321,_322,_323,jsUI){
var _325=this.windowOrLayoutWidget;
var node=this.node;
var _327=null;
if(this.moveInitiated&&_325&&node){
this.moveInitiated=false;
try{
if(this.posStatic){
var _328=_323.widget.pwGhost;
var _329=node.style;
if(_328&&_328.col){
_325.column=0;
_321.dom.insertBefore(node,_328,true);
}else{
if(this.prevColumnNode!=null&&this.prevIndexInCol!=null){
_321.dom.insertAtIndex(node,this.prevColumnNode,this.prevIndexInCol);
}else{
var _32a=_323.page.getColumnDefault();
if(_32a!=null){
_321.dom.prependChild(node,_32a.domNode);
}
}
}
if(_328){
_321.dom.removeNode(_328);
}
}
_325.endDragging(this.posRecord,this.changeToUntiled,this.changeToTiled);
}
catch(ex){
_327=this._getErrMsg(ex,"destroy reset-window error",_325,_327);
}
}
try{
jsUI.evtDisconnectWObjAry(this.events,_322);
if(this.moveableObj!=null){
this.moveableObj.mover=null;
}
this.events=this.node=this.windowOrLayoutWidget=this.moveableObj=this.prevColumnNode=this.prevIndexInCol=null;
}
catch(ex){
_327=this._getErrMsg(ex,"destroy event clean-up error",_325,_327);
if(this.moveableObj!=null){
this.moveableObj.mover=null;
}
}
try{
_323.page.displayAllPWinIFrameCovers(true);
}
catch(ex){
_327=this._getErrMsg(ex,"destroy clean-up error",_325,_327);
}
_323.widget._movingInProgress=false;
if(_327!=null){
_321.raise(_327);
}
}});
dojo.dnd.Moveable=function(_32b,opt){
var _32d=jetspeed;
var jsUI=_32d.ui;
var _32f=dojo;
var _330=_32f.event;
this.windowOrLayoutWidget=_32b;
this.handle=opt.handle;
var _331=[];
_331.push(jsUI.evtConnect("after",this.handle,"onmousedown",this,"onMouseDown",_330));
_331.push(jsUI.evtConnect("after",this.handle,"ondragstart",_32d,"_stopEvent",_330));
_331.push(jsUI.evtConnect("after",this.handle,"onselectstart",_32d,"_stopEvent",_330));
this.events=_331;
};
dojo.extend(dojo.dnd.Moveable,{minMove:5,enabled:true,mover:null,onMouseDown:function(e){
if(e&&e.button==2){
return;
}
var _333=dojo;
var _334=_333.event;
var _335=jetspeed;
var jsUI=jetspeed.ui;
if(this.mover!=null||this.tempEvents!=null){
this._cleanUpLastEvt(_333,_334,_335,jsUI);
_335.stopEvent(e);
}else{
if(this.enabled){
if(this.tempEvents!=null){
if(djConfig.isDebug){
_335.debugAlert("ERROR: Moveable onmousedown tempEvent already defined");
}
}else{
var _337=[];
var doc=this.handle.ownerDocument;
_337.push(jsUI.evtConnect("after",doc,"onmousemove",this,"onMouseMove",_334));
this.tempEvents=_337;
}
if(!this.windowOrLayoutWidget.posStatic){
this.windowOrLayoutWidget.bringToTop(e,false,true,_335);
}
this._lastX=e.pageX;
this._lastY=e.pageY;
this._mDownEvt=e;
}
}
_335.stopEvent(e);
},onMouseMove:function(e,_33a){
var _33b=jetspeed;
var _33c=dojo;
var _33d=_33c.event;
if(_33a||Math.abs(e.pageX-this._lastX)>this.minMove||Math.abs(e.pageY-this._lastY)>this.minMove){
this._cleanUpLastEvt(_33c,_33d,_33b,_33b.ui);
var _33e=this.windowOrLayoutWidget;
this.beforeDragColRowInfo=null;
if(!_33e.isLayoutPane){
var _33f=_33e.domNode;
if(_33f!=null){
this.node=_33f;
this.mover=new _33c.dnd.Mover(_33e,_33f,null,_33e.cL_NA_ED,this,e,false,_33c,_33b);
}
}else{
_33e.startDragging(e,this,_33c,_33b);
}
}
_33b.stopEvent(e);
},onMouseUp:function(e,_341){
var _342=dojo;
var _343=jetspeed;
this._cleanUpLastEvt(_342,_342.event,_343,_343.ui,_341);
},_cleanUpLastEvt:function(_344,_345,_346,jsUI,_348){
if(this._mDownEvt!=null){
_346.stopEvent(this._mDownEvt,_348);
this._mDownEvt=null;
}
if(this.mover!=null){
this.mover.destroy(_344,_345,_346,jsUI);
this.mover=null;
}
jsUI.evtDisconnectWObjAry(this.tempEvents,_345);
this.tempEvents=null;
},destroy:function(_349,_34a,_34b,jsUI){
this._cleanUpLastEvt(_349,_34a,_34b,jsUI);
jsUI.evtDisconnectWObjAry(this.events,_34a);
this.events=this.node=this.handle=this.windowOrLayoutWidget=this.beforeDragColRowInfo=null;
},enable:function(){
this.enabled=true;
},disable:function(){
this.enabled=false;
}});
dojo.getMarginBox=function(node,_34e,_34f){
var s=_34e||dojo.gcs(node),me=dojo._getMarginExtents(node,s,_34f);
var l=node.offsetLeft-me.l,t=node.offsetTop-me.t;
if(_34f.UAmoz){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl,t=st;
}else{
var p=node.parentNode;
if(p){
var pcs=dojo.gcs(p);
if(pcs.overflow!="visible"){
var be=dojo._getBorderExtents(p,pcs);
l+=be.l,t+=be.t;
}
}
}
}else{
if(_34f.UAope){
var p=node.parentNode;
if(p){
var be=dojo._getBorderExtents(p);
l-=be.l,t-=be.t;
}
}
}
return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};
};
dojo.getContentBox=function(node,_35a,_35b){
var s=_35a||dojo.gcs(node),pe=dojo._getPadExtents(node,s),be=dojo._getBorderExtents(node,s),w=node.clientWidth,h;
if(!w){
w=node.offsetWidth,h=node.offsetHeight;
}else{
h=node.clientHeight,be.w=be.h=0;
}
if(_35b.UAope){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo.setMarginBox=function(node,_362,_363,_364,_365,_366,_367){
var s=_366||dojo.gcs(node);
var bb=dojo._usesBorderBox(node),pb=bb?{l:0,t:0,w:0,h:0}:dojo._getPadBorderExtents(node,s),mb=dojo._getMarginExtents(node,s,_367);
if(_364!=null&&_364>=0){
_364=Math.max(_364-pb.w-mb.w,0);
}
if(_365!=null&&_365>=0){
_365=Math.max(_365-pb.h-mb.h,0);
}
dojo._setBox(node,_362,_363,_364,_365);
};
dojo._setBox=function(node,l,t,w,h,u){
u=u||"px";
with(node.style){
if(l!=null&&!isNaN(l)){
left=l+u;
}
if(t!=null&&!isNaN(t)){
top=t+u;
}
if(w!=null&&w>=0){
width=w+u;
}
if(h!=null&&h>=0){
height=h+u;
}
}
};
dojo._usesBorderBox=function(node){
var n=node.tagName;
return false;
};
dojo._getPadExtents=function(n,_375){
var s=_375||dojo.gcs(n),px=dojo._toPixelValue,l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getPadBorderExtents=function(n,_37b){
var s=_37b||dojo.gcs(n),p=dojo._getPadExtents(n,s),b=dojo._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_380,_381){
var s=_380||dojo.gcs(n),px=dojo._toPixelValue,l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(_381.UAsaf&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getBorderExtents=function(n,_389){
var ne="none",px=dojo._toPixelValue,s=_389||dojo.gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
if(!jetspeed.UAie){
var dv=document.defaultView;
dojo.getComputedStyle=((jetspeed.UAsaf)?function(node){
var s=dv.getComputedStyle(node,null);
if(!s&&node.style){
node.style.display="";
s=dv.getComputedStyle(node,null);
}
return s||{};
}:function(node){
return dv.getComputedStyle(node,null);
});
dojo._toPixelValue=function(_392,_393){
return (parseFloat(_393)||0);
};
}else{
dojo.getComputedStyle=function(node){
return node.currentStyle;
};
dojo._toPixelValue=function(_395,_396){
if(!_396){
return 0;
}
if(_396.slice&&(_396.slice(-2)=="px")){
return parseFloat(_396);
}
with(_395){
var _397=style.left;
var _398=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_396;
_396=style.pixelLeft;
}
catch(e){
_396=0;
}
style.left=_397;
runtimeStyle.left=_398;
}
return _396;
};
}
dojo.gcs=dojo.getComputedStyle;

