if(window.dojo){
dojo.provide("jetspeed.common");
dojo.require("dojo.io.*");
dojo.require("dojo.uri.Uri");
}
if(!window.jetspeed){
jetspeed={};
}
if(!jetspeed.url){
jetspeed.url={};
}
if(!jetspeed.om){
jetspeed.om={};
}
if(!jetspeed.widget){
jetspeed.widget={};
}
jetspeed.version={major:2,minor:1,patch:0,flag:"dev",revision:"",toString:function(){
with(jetspeed.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
jetspeed.initcommon=function(){
var _1=jetspeed;
if(!window.dojo){
var _1=jetspeed;
_1.no_dojo_load_notifying=false;
_1.no_dojo_post_load=false;
_1.pageLoadedListeners=[];
window.onload=function(){
if(!window.dojo){
var _2=jetspeed;
_2.no_dojo_load_notifying=true;
_2.no_dojo_post_load=true;
var _3=_2.pageLoadedListeners;
for(var x=0;x<_3.length;x++){
_3[x]();
}
_2.pageLoadedListeners=[];
}
};
}else{
var _5=dojo.render.html;
if(_5.ie){
_1.UAie=true;
if(_5.ie60||_5.ie50||_5.ie55){
_1.UAie6=true;
}
_1.stopEvent=function(_6,_7){
try{
_6=_6||window.event;
if(_6){
_6.cancelBubble=true;
_6.returnValue=false;
}
}
catch(ex){
if(!_7&&djConfig.isDebug){
dojo.debug("stopEvent ("+(typeof _6)+") failure: "+jetspeed.formatError(ex));
}
}
};
_1._stopEvent=function(_8){
jetspeed.stopEvent(_8);
};
}else{
if(_5.mozilla){
_1.UAmoz=true;
}else{
if(_5.safari){
_1.UAsaf=true;
}else{
if(_5.opera){
_1.UAope=true;
}
}
}
_1.stopEvent=function(_9){
_9.preventDefault();
_9.stopPropagation();
};
_1._stopEvent=function(_a){
jetspeed.stopEvent(_a);
};
}
}
};
jetspeed.addOnLoad=function(_b,_c){
if(window.dojo){
if(arguments.length==1){
dojo.addOnLoad(_b);
}else{
dojo.addOnLoad(_b,_c);
}
}else{
if(arguments.length==1){
jetspeed.pageLoadedListeners.push(_b);
}else{
if(arguments.length>1){
jetspeed.pageLoadedListeners.push(function(){
_b[_c]();
});
}
}
if(jetspeed.no_dojo_post_load&&!jetspeed.no_dojo_load_notifying){
jetspeed.callPageLoaded();
}
}
};
jetspeed.callPageLoaded=function(){
if(typeof setTimeout=="object"){
setTimeout("jetspeed.pageLoaded();",0);
}else{
jetspeed.pageLoaded();
}
};
jetspeed.getHead=function(){
var _d=jetspeed;
if(_d.docHead==null){
_d.docHead=document.head||document.getElementsByTagName("head")[0];
}
return _d.docHead;
};
jetspeed.getBody=function(){
var _e=jetspeed;
if(_e.docBody==null){
_e.docBody=document.body||document.getElementsByTagName("body")[0];
}
return _e.docBody;
};
jetspeed.formatError=function(ex){
if(ex==null){
return "";
}
var msg=" error:";
if(ex.message!=null){
msg+=" "+ex.message;
}
var _11=ex.number||ex.lineNumber||ex.lineNo;
if(_11==null||_11=="0"||_11.length==0){
_11=null;
}
var _12=ex.fileName;
if(_12!=null){
var _13=_12.lastIndexOf("/");
if(_13!=-1&&_13<(_12.length-1)){
_12=_12.substring(_13+1);
}
}
if(_12==null||_12.length==0){
_12=null;
}
var _14=ex.type;
if(_14==null||_14.length==0||_14=="unknown"){
_14=null;
}
if(_11!=null||_12!=null||_14!=null){
msg+=" ("+(_12!=null?(" "+_12):"");
msg+=(_11!=null?(" line "+_11):"");
msg+=(_14!=null?(" type "+_14):"");
msg+=" )";
}
return msg;
};
jetspeed.url.LOADING_INDICATOR_ID="js-showloading";
jetspeed.url.LOADING_INDICATOR_IMG_ID="js-showloading-img";
jetspeed.url.path={SERVER:null,JETSPEED:null,AJAX_API:null,DESKTOP:null,PORTAL:null,PORTLET:null,ACTION:null,RENDER:null,initialized:false};
jetspeed.url.pathInitialize=function(_15){
var jsU=jetspeed.url;
var _17=jsU.path;
if(!_15&&_17.initialized){
return;
}
var _18=document.getElementsByTagName("base");
var _19=null;
if(_18&&_18.length==1){
_19=_18[0].href;
}else{
_19=window.location.href;
}
var _1a=jsU.parse(_19);
var _1b=_1a.path;
var _1c="";
if(_1a.scheme!=null){
_1c+=_1a.scheme+":";
}
if(_1a.authority!=null){
_1c+="//"+_1a.authority;
}
var _1d=null;
if(djConfig.jetspeed.rootContext){
_1d="";
}else{
var _1e=-1;
for(var _1f=1;_1e<=_1f;_1f++){
_1e=_1b.indexOf("/",_1f);
if(_1e==-1){
break;
}
}
if(_1e==-1){
_1d=_1b;
}else{
_1d=_1b.substring(0,_1e);
}
}
_17.JETSPEED=_1d;
_17.SERVER=_1c;
_17.AJAX_API=_17.JETSPEED+"/ajaxapi";
_17.DESKTOP=_17.JETSPEED+"/desktop";
_17.PORTAL=_17.JETSPEED+"/portal";
_17.PORTLET=_17.JETSPEED+"/portlet";
_17.ACTION=_17.JETSPEED+"/action";
_17.RENDER=_17.JETSPEED+"/render";
_17.initialized=true;
};
jetspeed.url.parse=function(url){
if(url==null){
return null;
}
if(window.dojo&&window.dojo.uri){
return new dojo.uri.Uri(url);
}
return new jetspeed.url.JSUri(url);
};
jetspeed.url.JSUri=function(url){
if(url!=null){
if(!url.path){
var _22="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=url.toString().match(new RegExp(_22));
var _24={};
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
}else{
this.scheme=url.scheme;
this.authority=url.authority;
this.path=url.path;
this.query=url.query;
this.fragment=url.fragment;
}
}
};
jetspeed.url.JSUri.prototype={scheme:null,authority:null,path:null,query:null,fragment:null,toString:function(){
var uri="";
uri+=(this.scheme!=null&&this.scheme.length>0)?(this.scheme+"://"):"";
uri+=(this.authority!=null&&this.authority.length>0)?this.authority:"";
uri+=(this.path!=null&&this.path.length>0)?this.path:"";
uri+=(this.query!=null&&this.query.length>0)?("?"+this.query):"";
uri+=(this.fragment!=null&&this.fragment>0)?("#"+this.fragment):"";
return uri;
}};
jetspeed.url.scheme={HTTP_PREFIX:"http://",HTTP_PREFIX_LEN:"http://".length,HTTPS_PREFIX:"https://",HTTPS_PREFIX_LEN:"https://".length};
jetspeed.url.isPortal=function(){
if(window.djConfig&&window.djConfig.jetspeed){
var _26=window.djConfig.jetspeed.servletPath;
if(_26!=null&&_26.toLowerCase().indexOf("/desktop")==0){
return false;
}
}
return true;
};
jetspeed.url.isDesktop=function(){
return !jetspeed.url.isPortal();
};
jetspeed.url.servletPath=function(){
if(jetspeed.url.isPortal()){
return "/portal";
}else{
return "/desktop";
}
};
jetspeed.url.basePortalUrl=function(){
if(!jetspeed.url.path.initialized){
jetspeed.url.pathInitialize();
}
return jetspeed.url.path.SERVER;
};
jetspeed.url.basePortalDesktopUrl=function(){
if(!jetspeed.url.path.initialized){
jetspeed.url.pathInitialize();
}
return jetspeed.url.basePortalUrl()+jetspeed.url.path.JETSPEED;
};
jetspeed.url.addPath=function(url,_28){
if(_28==null||_28.length==0){
return url;
}
var _29=new jetspeed.url.JSUri(url);
var _2a=_29.path;
if(_2a!=null&&_2a.length>0){
if(_29.path.charCodeAt(_2a.length-1)==47){
if(_28.charCodeAt(0)==47){
if(_28.length>1){
_29.path+=_28.substring(1);
}
}else{
_29.path+=_28;
}
}else{
if(_28.charCodeAt(0)==47){
_29.path+=_28;
}else{
if(_28.length>1){
_29.path+="/"+_28;
}
}
}
}
var _2b=jetspeed.url.parse(_29);
return _2b.toString();
};
jetspeed.url.urlStartsWithHttp=function(url){
if(url){
var len=url.length;
var _2e=jetspeed.url.scheme.HTTPS_PREFIX_LEN;
if(len>_2e){
var _2f=jetspeed.url.scheme.HTTP_PREFIX_LEN;
if(url.substring(0,_2f)==jetspeed.url.scheme.HTTP_PREFIX){
return true;
}
if(url.substring(0,_2e)==jetspeed.url.scheme.HTTPS_PREFIX){
return true;
}
}
}
return false;
};
jetspeed.url.addQueryParameter=function(_30,_31,_32,_33){
if(_30==null){
return _30;
}
if(!_30.path){
_30=jetspeed.url.parse(_30);
}
if(_30==null){
return null;
}
if(_31==null){
return _30;
}
_30.jsQParamN=null;
if(_33){
_30=jetspeed.url.removeQueryParameter(_30,_31,false);
}
var _34=_30.query;
if(_34==null){
_34="";
}
var _35=_34.length;
if(_35>0){
_34+="&";
}
_34+=_31+"="+(_32!=null?_32:"");
_30.query=_34;
var _36=new jetspeed.url.JSUri(_30);
_30=jetspeed.url.parse(_36);
return _30;
};
jetspeed.url.removeAllQueryParameters=function(_37){
return jetspeed.url.removeQueryParameter(_37,null,true);
};
jetspeed.url.removeQueryParameter=function(_38,_39,_3a){
if(_38==null){
return _38;
}
if(!_38.path){
_38=jetspeed.url.parse(_38);
}
if(_38==null){
return null;
}
_38.jsQParamN=null;
var _3b=_38.query;
var _3c=((_3b!=null)?_3b.length:0);
if(_3c>0){
if(_3a){
_3b=null;
}else{
if(_39==null){
return _38;
}else{
var _3d=_39;
var _3e=_3b.indexOf(_3d);
if(_3e==0){
_3b=jetspeed.url._removeQP(_3b,_3c,_3d,_3e);
}
_3d="&"+_39;
while(true){
_3c=((_3b!=null)?_3b.length:0);
_3e=_3b.indexOf(_3d,0);
if(_3e==-1){
break;
}
var _3f=jetspeed.url._removeQP(_3b,_3c,_3d,_3e);
if(_3f==_3b){
break;
}
_3b=_3f;
}
if(_3b.length>0){
if(_3b.charCodeAt(0)==38){
_3b=((_3b.length>1)?_3b.substring(1):"");
}
if(_3b.length>0&&_3b.charCodeAt(0)==63){
_3b=((_3b.length>1)?_3b.substring(1):"");
}
}
}
}
_38.query=_3b;
var _40=new jetspeed.url.JSUri(_38);
_38=jetspeed.url.parse(_40);
}
return _38;
};
jetspeed.url._removeQP=function(_41,_42,_43,_44){
if(_44==-1){
return _41;
}
if(_42>(_44+_43.length)){
var _45=_41.charCodeAt(_44+_43.length);
if(_45==61){
var _46=_41.indexOf("&",_44+_43.length+1);
if(_46!=-1){
if(_44>0){
_41=_41.substring(0,_44)+_41.substring(_46);
}else{
_41=((_46<(_42-1))?_41.substring(_46):"");
}
}else{
if(_44>0){
_41=_41.substring(0,_44);
}else{
_41="";
}
}
}else{
if(_45==38){
if(_44>0){
_41=_41.substring(0,_44)+_41.substring(_44+_43.length);
}else{
_41=_41.substring(_44+_43.length);
}
}
}
}else{
if(_42==(_44+_43.length)){
_41="";
}
}
return _41;
};
jetspeed.url.getQueryParameter=function(_47,_48){
if(_47==null){
return null;
}
if(!_47.authority||!_47.scheme){
_47=jetspeed.url.parse(_47);
}
if(_47==null){
return null;
}
if(_47.jsQParamN==null&&_47.query){
var _49=new Array();
var _4a=_47.query.split("&");
for(var i=0;i<_4a.length;i++){
if(_4a[i]==null){
_4a[i]="";
}
var _4c=_4a[i].indexOf("=");
if(_4c>0&&_4c<(_4a[i].length-1)){
_49[i]=unescape(_4a[i].substring(_4c+1));
_4a[i]=unescape(_4a[i].substring(0,_4c));
}else{
_49[i]="";
}
}
_47.jsQParamN=_4a;
_47.jsQParamV=_49;
}
if(_47.jsQParamN!=null){
for(var i=0;i<_47.jsQParamN.length;i++){
if(_47.jsQParamN[i]==_48){
return _47.jsQParamV[i];
}
}
}
return null;
};
jetspeed.om.Id=function(){
var _4d="";
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isString(arguments[i])){
if(_4d.length>0){
_4d+="-";
}
_4d+=arguments[i];
}else{
if(dojo.lang.isObject(arguments[i])){
for(var _4f in arguments[i]){
this[_4f]=arguments[i][_4f];
}
}
}
}
this.id=_4d;
};
jetspeed.om.Id.prototype={getId:function(){
return this.id;
}};
if(window.dojo){
jetspeed.url.BindArgs=function(_50){
dojo.lang.mixin(this,_50);
if(!this.mimetype){
this.mimetype="text/html";
}
if(!this.encoding){
this.encoding="utf-8";
}
};
dojo.lang.extend(jetspeed.url.BindArgs,{createIORequest:function(){
var _51=new dojo.io.Request(this.url,this.mimetype);
_51.fromKwArgs(this);
return _51;
},load:function(_52,_53,_54){
try{
var _55=null;
if(this.debugContentDumpIds){
_55=((this.domainModelObject&&dojo.lang.isFunction(this.domainModelObject.getId))?this.domainModelObject.getId():((this.domainModelObject&&this.domainModelObject.id)?String(this.domainModelObject.id):""));
var _56=false;
for(var _57=0;_57<this.debugContentDumpIds.length;_57++){
if(_55.match(new RegExp(this.debugContentDumpIds[_57]))){
_56=true;
break;
}
}
if(_56){
if(dojo.lang.isString(_53)){
dojo.debug("retrieveContent ["+(_55?_55:this.url)+"] content: "+_53);
}else{
var _58=dojo.dom.innerXML(_53);
if(!_58){
_58=(_53!=null?"!= null (IE no XMLSerializer)":"null");
}
dojo.debug("retrieveContent ["+(_55?_55:this.url)+"] xml-content: "+_58);
}
}
}
if(this.contentListener&&dojo.lang.isFunction(this.contentListener.notifySuccess)){
this.contentListener.notifySuccess(_53,this.url,this.domainModelObject,_54);
}else{
_55=((this.domainModelObject&&dojo.lang.isFunction(this.domainModelObject.getId))?this.domainModelObject.getId():"");
dojo.debug("retrieveContent ["+(_55?_55:this.url)+"] no valid contentListener");
}
if(this.hideLoadingIndicator){
jetspeed.url.loadingIndicatorHide();
}
}
catch(e){
if(this.hideLoadingIndicator){
jetspeed.url.loadingIndicatorHide();
}
dojo.raise("dojo.io.bind "+jetspeed.formatError(e));
}
},error:function(_59,_5a){
try{
if(this.contentListener&&dojo.lang.isFunction(this.contentListener.notifyFailure)){
this.contentListener.notifyFailure(_59,_5a,this.url,this.domainModelObject);
}
if(this.hideLoadingIndicator){
jetspeed.url.loadingIndicatorHide();
}
}
catch(e){
if(this.hideLoadingIndicator){
jetspeed.url.loadingIndicatorHide();
}
throw e;
}
}});
jetspeed.url.retrieveContent=function(_5b,_5c,_5d,_5e){
if(!_5b){
_5b={};
}
_5b.contentListener=_5c;
_5b.domainModelObject=_5d;
_5b.debugContentDumpIds=_5e;
var _5f=new jetspeed.url.BindArgs(_5b);
if(_5b.showLoadingIndicator||(_5c&&!_5c.suppressLoadingIndicator&&_5b.showLoadingIndicator!=false)){
if(jetspeed.url.loadingIndicatorShow()){
_5f.hideLoadingIndicator=true;
}
}
dojo.io.bind(_5f.createIORequest());
};
jetspeed.url.checkAjaxApiResponse=function(_60,_61,_62,_63,_64,_65){
var _66=false;
var _67=_61.getElementsByTagName("status");
if(_67!=null){
var _68=_67[0].firstChild.nodeValue;
if(_68=="success"){
_66=_68;
}else{
if(_62&&_62.length>0){
for(var i=0;i<_62.length;i++){
if(_68==_62[i]){
_66=_68;
break;
}
}
}
}
}
if((!_66&&_63)||_65){
var _6a=dojo.dom.innerXML(_61);
if(!_6a){
_6a=(_61!=null?"!= null (IE no XMLSerializer)":"null");
}
if(_64==null){
_64="ajax-api";
}
if(_66){
dojo.debug(_64+" success  url="+_60+"  xml-content="+_6a);
}else{
dojo.raise(_64+" failure  url="+_60+"  xml-content="+_6a);
}
}
return _66;
};
jetspeed.url._loadingImgUpdate=function(_6b,_6c,_6d,doc,_6f,_70){
var _71=_6f.loadingImgProps;
if(_71){
var _72=doc.getElementById(_70.LOADING_INDICATOR_ID);
if(_72==null||!_72.style||_72.style.display=="none"){
return;
}
var _73=_71.imganimated;
var _74=doc.getElementById(_70.LOADING_INDICATOR_IMG_ID);
if(_73&&_74){
var _75=_71._imgBaseUrl;
if(_75==null){
var _76=_71.imgdir;
if(_76==null||_76.length==0){
_75=false;
}else{
_75=_6f.getLayoutRootUrl()+_76;
}
_71._imgBaseUrl=_75;
}
if(_75){
var _77=false;
if((_6b||_6d)&&!_71._stepDisabled){
var _78=_71.imgstepprefix;
var _79=_71.imgstepextension;
var _7a=_71.imgsteps;
if(_78&&_79&&_7a){
var _7b=_71._stepNext;
if(_6c||_7b==null||_7b>=_7a.length){
_7b=0;
}
var _7c=_75+"/"+_78;
if(!_6d){
_74.src=_7c+_7a[_7b]+_79;
_77=true;
_71._stepNext=_7b+1;
}else{
var _7d,_7e=Math.ceil(_7a.length/1.8);
for(var i=0;i<=_7e;i++){
_7d=new Image();
_7d.src=_7c+_7a[i]+_79;
}
}
}else{
_71._stepDisabled=true;
}
}
if(!_77&&!_6d){
_74.src=_75+"/"+_73;
}
}
}
}
};
jetspeed.url.loadingIndicatorStep=function(_80){
var _81=_80.url;
_81._loadingImgUpdate(true,false,false,document,_80.prefs,_81);
};
jetspeed.url.loadingIndicatorStepPreload=function(){
var _82=jetspeed;
var _83=_82.url;
_83._loadingImgUpdate(true,false,true,document,_82.prefs,_83);
};
jetspeed.url.loadingIndicatorShow=function(_84,_85){
var _86=jetspeed;
var _87=_86.prefs;
var _88=_86.url;
var doc=document;
if(typeof _84=="undefined"){
_84="loadpage";
}
var _8a=doc.getElementById(_88.LOADING_INDICATOR_ID);
if(_8a!=null&&_8a.style){
var _8b=null;
if(_87!=null&&_87.desktopActionLabels!=null){
_8b=_87.desktopActionLabels[_84];
}
if(_8b!=null&&_8b.length>0&&_8a.style["display"]=="none"){
_88._loadingImgUpdate(_85,true,false,doc,_87,_88);
_8a.style["display"]="";
if(_84!=null){
if(_8b!=null&&_8b.length>0){
var _8c=doc.getElementById(_88.LOADING_INDICATOR_ID+"-content");
if(_8c!=null){
_8c.innerHTML=_8b;
}
}
}
return true;
}
}
return false;
};
jetspeed.url.loadingIndicatorHide=function(){
var _8d=document.getElementById(jetspeed.url.LOADING_INDICATOR_ID);
if(_8d!=null&&_8d.style){
_8d.style["display"]="none";
}
};
}
jetspeed.widget.openDialog=function(_8e){
var _8f=jetspeed.UAmoz;
if(_8f){
_8e.domNode.style.position="fixed";
if(!_8e._fixedIPtBug){
var _90=_8e;
_90.placeModalDialog=function(){
var _91=dojo.html.getScroll().offset;
var _92=dojo.html.getViewport();
var mb;
if(_90.isShowing()){
mb=dojo.html.getMarginBox(_90.domNode);
}else{
dojo.html.setVisibility(_90.domNode,false);
dojo.html.show(_90.domNode);
mb=dojo.html.getMarginBox(_90.domNode);
dojo.html.hide(_90.domNode);
dojo.html.setVisibility(_90.domNode,true);
}
var x=(_92.width-mb.width)/2;
var y=(_92.height-mb.height)/2;
with(_90.domNode.style){
left=x+"px";
top=y+"px";
}
};
_90._fixedIPtBug=true;
}
}
_8e.show();
};
jetspeed.initcommon();

