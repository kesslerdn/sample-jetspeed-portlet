/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @version $Id: jetui-portal.js 933132 2010-04-12 08:03:35Z taylor $
 */

YUI.add('jetui-portal', function(Y) {

    /**
     * JetUI Portal JavaScript Framework
     *
     * @module jetui-portal
     */
    
    Y.namespace("JetUI");
    
    // JETUI_YUI must be defined outside. However, just check again not to throw exceptions.
    if (!JETUI_YUI) {
        JETUI_YUI = {};
    }
    
    /**
     * Global method definition to returns the portal singleton instance
     * @method
     */
    JETUI_YUI.getPortalInstance = function() {
        if (!JETUI_YUI._portalInstance) {
            JETUI_YUI._portalInstance = new Y.JetUI.Portal(JETUI_YUI.config);
        }
        return JETUI_YUI._portalInstance;
    };
    
    /**
     * Create a portal to represent a portal screen.
     *
     * @class JetUI.Portal
     * @extends Base
     * @param config {Object} Configuration object
     * @constructor
     */
    Y.JetUI.Portal = function() {
        Y.JetUI.Portal.superclass.constructor.apply(this, arguments);
    };
    
    Y.mix(Y.JetUI.Portal, {
        
        /**
         * The identity of the widget.
         *
         * @property JetUI.Portal.NAME
         * @type String
         * @static
         */
        NAME : 'Portal',
    	/**
    	 * Module Constants
    	 */
    	CSRE : 'CSRE',
    	SSRE : 'SSRE'                
    });
    
    Y.extend(Y.JetUI.Portal, Y.Base, {
        
        /**
         * @property portal context path
         * @type String
         */
        portalContextPath : "",
        
        /**
         * @property portal base path
         * @type String
         */
        portalServletPath : "",
        
        /**
         * @property portal page path
         * @type String
         */
        portalPagePath : "/",
        
        /**
         * @property desktopMode
         * @type Boolean
         */
        desktopMode : false,
        
        /**
         * @property jstbLeft
         * @type Object
         */
        jstbLeft : null,
        
        /**
         * @property jstbRight
         * @type Object
         */
        jstbRight : null,
        
        /**
         * @property isMoving
         * @type Boolean
         */
        isMoving : false,
        
        /**
         * @property goingUp
         * @type Boolean
         */
        goingUp : false,
        
        /**
         * @property goingRight
         * @type Boolean
         */
        goingRight : false,
        
        /**
         * @property lastY
         * @type Number
         */
        lastY : 0,
        
        /**
         * @property lastX
         * @type Number
         */
        lastX : 0,
        
        /**
         * Active window selected
         */
        activeWindow : null,
        
        /**
         * Margins (resizeHandler, PContent left margin, PContent top margin
         */
        margins: [-4, 4, 0, 17],
        
        /**
         * Modal window base z-index
         */
        modalWindowBaseZIndex : 16777271,
        
        /**
         * Screen mask element z-index
         */
        screenMaskZIndex : 16777271 - 1,
        
        /**
         * The modal panel overlay
         */
        modalPanelOverlay : null,
        
        /**
         * Construction logic executed during instantiation.
         *
         * @method initializer
         * @protected
         */
        initializer : function(cfg) {
            if (cfg) {
                this.portalContextPath = cfg.portalContextPath;
                this.portalServletPath = cfg.portalServletPath;
                this.portalPagePath = cfg.portalPagePath;
                this.margins = cfg.margins;
            }
        },
        
        /**
         * Destruction logic executed during instantiation.
         *
         * @method initializer
         * @protected
         */
        destructor : function(cfg) { 
        },
        
        booleanValue : function(s) {
            if (s == null)
            	return false;
            return (s == "" || s.toLowerCase() == "false") ? false : true;          
        },        
        
        /**
         * Toggles toolbar
         * 
         * @method toggleToolbar
         */
        toggleToolbar : function(toolbar, toggler, compareStyle) {
            var portal = JETUI_YUI.getPortalInstance();        	
            toggler.toggleClass('jstbToggle1');
            toggler.toggleClass('jstbToggle2');
            var currentStyle = toggler.getAttribute('class');
            var nodelist = toolbar.get('children');
            var state = 'normal';
            if (currentStyle == compareStyle) {
            	toolbar.setStyle('display', 'block');
            	nodelist.setStyle('display', 'block');
            } else {
                nodelist.setStyle('display', 'none');
                toolbar.setStyle('display', 'none');
                state = 'closed';
            }
            var windowId = (toolbar == portal.jstbLeft) ? 'template-top2__jstbLeft' : 'template-top2__jstbRight'; // FIXME: don't hard code template
            var uri = portal.portalContextPath + "/services/pagelayout/fragment/" + windowId + "/mod/?_type=json";
            uri += "&state=" + state;
            var config = {
                    on: { complete: portal.onStateComplete },
                    method: "PUT",
                    headers: { "X-Portal-Path" : portal.portalPagePath },
                    arguments: { complete: [ windowId ] }
                };
            var request = Y.io(uri, config);            
        },

        /**
         * Updates toolbar state
         * 
         * @method up`dateToolbar
         */        
        updateToolbar : function(toolbar, state) {
            var portal = JETUI_YUI.getPortalInstance();        	
            var uri = portal.portalContextPath + "/services/pagelayout/fragment/" + toolbar + "/mod/?_type=json";
            uri += "&state=" + state;
            var config = {
                    on: { complete: portal.onStateComplete },
                    method: "PUT",
                    headers: { "X-Portal-Path" : portal.portalPagePath },
                    arguments: { complete: [ toolbar ] }
                };
            var request = Y.io(uri, config);            
        },
        
        /**
         * Toggles a tool or window state
         *  (fragment id is option
         * @method toggleState shoot
         */
        toggleState : function(windowId) {
            var portal = JETUI_YUI.getPortalInstance();
        	var window = Y.one("[id='" + windowId + "']");
            if (!Y.Lang.isNull(window)) {
            	var state = window.data.get('state');
            	if (state == null || state == "normal") {
	                window.setStyle('display', 'none');
	                state = 'minimized';
	            } else {
	        		window.setStyle('display', 'block');
	            	state = 'normal';	            	
	            }
            	window.data.set('state', state);	        	
	            var uri = portal.portalContextPath + "/services/pagelayout/fragment/" + windowId + "/mod/?_type=json";
	            uri += "&state=" + state;
	            var config = {
	                    on: { complete: portal.onStateComplete },
	                    method: "PUT",
	                    headers: { "X-Portal-Path" : portal.portalPagePath },
	                    arguments: { complete: [ windowId ] }
	                };
	            var request = Y.io(uri, config);            
            }
        },        
        
        /**
         * @method moveToLayout moves a portlet window to layout column grid position in the browser
         * this is a client side only operation. Operates in grid (non-detached) mode.
         */
        moveToLayout : function(e) {
            var drop = e.drop.get('node'),
                drag = e.drag.get('node');
            var dragParent = drag.get('parentNode');       
            drop.appendChild(drag);
            if (dragParent.get('children').size() == 0)
            {
                //node.plug(Y.Plugin.Drag);
                var drop = new Y.DD.Drop({
                node: dragParent,
                groups: ['grid']            
                });
            }
            var i = 0;
            while (i < Y.DD.DDM.targets.length) {
                if (Y.DD.DDM.targets[i] == e.drop) {
                    Y.DD.DDM.targets.splice(i, 1);
                    break;
                }
                i++;
            }
            // I don't think this is working
            e.drop.unplug(Y.Plugin.Drop);
        },
        
        /**
         * @method moveToGrid moves a portlet window to another grid position in the browser
         * this is a client side only operation. Operates in grid (non-detached) mode.
         */
        moveToGrid : function(e) {
            var portal = JETUI_YUI.getPortalInstance();
            var drop = e.drop.get('node'),
                drag = e.drag.get('node');
            var dragParent = drag.get('parentNode');
            var dropParent = drop.get('parentNode');
            if (dropParent == portal.jstbLeft || dropParent == portal.jstbRight) {
              if (!dropParent.contains(drag)) {
                  dropParent.appendChild(drag);
              }
            } else {
                if (portal.goingUp) {
                    //Y.log("going UP");
                    // var next = drop.get('previousSibling');
                    var prev = drop.previous();
                    if (prev == null) {
                        //drag.remove();                    
                        dropParent.prepend(drag);                   
                    } else {
                        //drag.remove();
                        dropParent.insertBefore(drag, drop);
                    }
                } else {
                    var next = drop.next();
                    if (next == null) {
                        //Y.log("going down APPEND");
                        //drag.remove();
                        dropParent.appendChild(drag);
                    } else {
                        //Y.log("going down: " + next); //next.data.get('name'));
                        //drag.remove();
                        dropParent.insertBefore(drag, next);
                    }
                }
            }
            if (dragParent.get('children').size() == 0) {
                var drop = new Y.DD.Drop({
                    node: dragParent,
                    groups: ['grid']            
                });
            }                           
        },

        /**
         * @method detachPortlet detaches a portlet from a grid position and moves it to a z-order top detached window
         */
        detachPortlet : function(e) {
            var portal = JETUI_YUI.getPortalInstance();
            var actionId = e.currentTarget.getAttribute("id");
            var windowId = actionId.replace(/^jetspeed-detach-/, "");
            var window = Y.one("[id='" + windowId + "']");
            var jetspeedZone = Y.one('#jetspeedZone');
            if (!Y.Lang.isNull(jetspeedZone)) {
	    		var dragParent = window.get('parentNode');
	        	var parentColumn = dragParent.data.get('column');
	        	portal.reallocateColumn(parentColumn);
	
	        	var pos = window.get('region');
	        	var x =  pos.top + 5;
	        	var y =  pos.left + 5;
	        	window.data.set("x", x);
	            window.data.set("y", y);
	            window.setStyle('position', 'absolute');
	            window.setStyle('top', x + 'px');
	            window.setStyle('left', y + 'px');
	        	window.data.set('detached', true);
	        	window.data.set("tool", false);
	        	var drag = Y.DD.DDM.getDrag(window);
	        	drag.removeFromGroup("grid");
	        	drag.addToGroup("detached");
	        	drag.set('dragMode', 'point');
	        	var drop = Y.DD.DDM.getDrop(window);
	        	var i = 0;
	            while (i < Y.DD.DDM.targets.length) {
	                if (Y.DD.DDM.targets[i] == drop) {
	                    Y.DD.DDM.targets.splice(i, 1);
	                    break;
	                }
	                i++;
	            }
	            jetspeedZone.appendChild(window);
				if (dragParent.get("children").size() == 0)
				{
	                var drop = new Y.DD.Drop({
	                    node: dragParent,
	                    groups: ['grid']            
	                });
				}
	            var action = Y.one("[id='" + actionId + "']");
	            if (!Y.Lang.isNull(action)) {
	            	Y.Event.purgeElement("[id='" + actionId + "']", false, "click"); 
		            action.on('click', portal.attachPortlet);
		        	action.setAttribute("title", "attach");
		        	action.replaceClass("portlet-action-detach", "portlet-action-attach");
		            var imgid = actionId.replace(/^jetspeed-detach-/, "jetspeed-detach-img-");
		        	var img = Y.one("[id='" + imgid + "']");
		        	if (!Y.Lang.isNull(img))
		        	{
			        	var imgsrc = img.getAttribute("src");
				        if (imgsrc != null) {
				        	var s = imgsrc.replace("detach", "attach");
				        	img.setAttribute("src", s);
				        	img.setAttribute("alt", "Attach");
			        	}
		        	}
	            }
	            portal.addResizeHandle(window, true);
		        var uri = portal.portalContextPath + "/services/pagelayout/fragment/" + windowId + "/pos/?_type=json";
		        uri += "&x=" + x + "&y=" + y + "&layout=detach";
		        var region = window.get('region');		        
		        uri += "&w=" + (region.right - region.left) + "&h=" + (region.bottom - region.top);
		        var config = {
                      on: { complete: portal.onMoveComplete },
                      method: "PUT",
                      headers: { "X-Portal-Path" : portal.portalPagePath },
                      arguments: { complete: [ windowId ] }
                  };
		        var request = Y.io(uri, config); 
		        portal.activateWindow(window);
            }            
        },

        /**
         * @method attachPortlet attaches a portlet from a z-order top detached window to a grid position
         */
        attachPortlet : function(e) {
            var portal = JETUI_YUI.getPortalInstance();
            var actionId = e.currentTarget.getAttribute("id");
            var windowId = actionId.replace(/^jetspeed-detach-/, "");
            var window = Y.one("[id='" + windowId + "']");
            var col = window.data.get("column");
            var layout = null;
            var count = 0;
            Y.Node.all(JetuiConfiguration.layoutStyle).each(function(v, k) {
            	if (count == col) {
            		layout = v;
            	}
            	count++;
            });
            if (layout != null)
            {
            	var row = layout.get('children').size();
	            window.setAttribute("row", row);
	            window.setAttribute("detached", "false");
	        	window.data.set("row", row);
	            window.data.set("col", col);
	            window.setStyle('position', '');
	            window.setStyle('top', '');
	            window.setStyle('left', '');
	        	window.data.set('detached', false);
	        	
	            var action = Y.one("[id='" + actionId + "']");
	            if (!Y.Lang.isNull(action)) {
	            	Y.Event.purgeElement("[id='" + actionId + "']", false, "click"); 
		            action.on('click', portal.detachPortlet);
		        	action.setAttribute("title", "detach");
		        	action.replaceClass("portlet-action-attach", "portlet-action-detach");
		            var imgid = actionId.replace(/^jetspeed-detach-/, "jetspeed-detach-img-");
		        	var img = Y.one("[id='" + imgid + "']");;
		            if (!Y.Lang.isNull(img))
		        	{		            
			        	var imgsrc = img.getAttribute("src");
				        if (imgsrc != null) {
				        	var s = imgsrc.replace("attach", "detach");
				        	img.setAttribute("src", s);
				        	img.setAttribute("alt", "Detach");
			        	}
		        	}
	            }
	        	var drag = Y.DD.DDM.getDrag(window);
	        	drag.removeFromGroup("detached");
	        	drag.addToGroup("grid");
	        	drag.set('dragMode', 'intersect');
	        	var drop = Y.DD.DDM.getDrop(window);
	        	var i = 0;
	            while (i < Y.DD.DDM.targets.length) {
	                if (Y.DD.DDM.targets[i] == drop) {
	                    Y.DD.DDM.targets.splice(i, 1);
	                    break;
	                }
	                i++;
	            }
	            layout.appendChild(window);
	            var pcontent = window.one(".portlet .PContentBorder .PContent");
	            portal.removeResizeHandle(pcontent);
	            portal.removeWidthHeight(pcontent);
	            var uri = portal.portalContextPath + "/services/pagelayout/fragment/" + windowId + "/pos/?_type=json";
	            uri += "&row=" + row + "&col=" + col + "&layout=attach";
	            var config = {
	                  on: { complete: portal.onMoveComplete },
	                  method: "PUT",
	                  headers: { "X-Portal-Path" : portal.portalPagePath },
	                  arguments: { complete: [ windowId ] }
	              };
	            var request = Y.io(uri, config);
            }
        },
        
        onMoveComplete : function(id, o, args) { 
            var id = id; // Transaction ID. 
            var data = o.responseText; // Response data.
            var windowId = args.complete[0];
        },             

        onStateComplete : function(id, o, args) { 
            var id = id; // Transaction ID. 
            var data = o.responseText; // Response data.
            var windowId = args.complete[0];
        },             
        
        /**
         * @method movePortlet persist the move operation to the persistent store over restful put request
         */
        movePortlet : function(drag, e) {
            var portal = JETUI_YUI.getPortalInstance();        	
            var windowId =  drag.getAttribute('id');
            if (drag.data.get("detached") == false) {
            	var oldColumn = drag.data.get('column');
            	var oldRow = drag.data.get('row');        	
        		var dragParent = drag.get('parentNode');
            	var parentColumn = dragParent.data.get('column');
            	if (parentColumn != oldColumn)
            	{
            		this.reallocateColumn(oldColumn); // moved from different column
            		drag.data.set('column', parentColumn);
            	}
            	portal.reallocateColumn(parentColumn);
                var uri = portal.portalContextPath + "/services/pagelayout/fragment/" + windowId + "/pos/?_type=json";
                uri += "&col=" + drag.data.get('column') + "&row=" + drag.data.get('row');
                var config = {
                        on: { complete: portal.onMoveComplete },
                        method: "PUT",
                        headers: { "X-Portal-Path" : portal.portalPagePath },
                        arguments: { complete: [ windowId ] }
                    };
                var request = Y.io(uri, config);
            }    	
            else
            {
                var uri = portal.portalContextPath + "/services/pagelayout/fragment/" + windowId + "/pos/?_type=json";
                uri += "&x=" + e.target.region.top + "&y=" + e.target.region.left;
                var config = {
                        on: { complete: portal.onMoveComplete },
                        method: "PUT",
                        headers: { "X-Portal-Path" : portal.portalPagePath },
                        arguments: { complete: [ windowId ] }
                    };
                var request = Y.io(uri, config);
            }        	
            // TODO: handle toolbar moves
        },

        /**
         * @method resizePortlet persist the resize operation to the persistent store over restful put request
         */
        resizePortlet : function(node, height, width) {
            var portal = JETUI_YUI.getPortalInstance();
            var windowId =  node.getAttribute('id');            
            var uri = portal.portalContextPath + "/services/pagelayout/fragment/" + windowId + "/pos/?_type=json";
            uri += "&w=" + width + "&h=" + height;
            var config = {
                    on: { complete: portal.onMoveComplete },
                    method: "PUT",
                    headers: { "X-Portal-Path" : portal.portalPagePath },
                    arguments: { complete: [ windowId ] }
                };
            var request = Y.io(uri, config);
        },
        
        reallocateColumn : function(column) {
    	    var columns = Y.Node.all(JetuiConfiguration.layoutStyle); 
    	    columns.each(function(v, k) {
    	    	if (v.data.get('locked') == false)
    	    	{
    		    	if (v.data.get('column') == column)
    		    	{
    		    		var row = 0;
    	    			v.get('children').each(function(v,k) {
    		    			v.data.set('row', row);
    		    			row++;
    		    		}, row);
    		    	}
    	    	}
    	    });
    	},
    	
        /**
         * @method onPortletRemoveComplete
         */
        onPortletRemoveComplete : function(id, o, args) {
            var id = id; // Transaction ID.
            var data = o.responseText; // Response data. 
            var windowId = args.complete[0];
            var window = Y.one("[id='" + windowId + "']");
            if (window) {
                var parent = window.get('parentNode');
                window.remove();
                if (parent.get('children').size() == 0)
                {
                    var drop = new Y.DD.Drop({
                        node: parent,
                        groups: ['grid']            
                    });
                }
            }
        },
        
        /**
         * @method removePortlet removes a portlet from the persistent store over restful delete request
         */
        removePortlet : function(e) {
            var portal = JETUI_YUI.getPortalInstance();
            var windowId = null;
            if (e instanceof String) {
                windowId = e;
            } else {
                var windowId = e.currentTarget.getAttribute("id");
                windowId = windowId.replace(/^jetspeed-close-/, "");
            }
            var uri = portal.portalContextPath + "/services/pagelayout/fragment/" + windowId + "/?_type=json";
            var config = {
                    on: { complete: portal.onPortletRemoveComplete },
                    method: "DELETE",
                    headers: { "X-Portal-Path" : portal.portalServletPath + ":" + portal.portalPagePath },
                    arguments: { complete: [ windowId ] }
                };
            var request = Y.io(uri, config);
        },
        
        /**
         * @method createDecoratorActionNode
         */
        createDecoratorActionNode : function(decoAction) {
            var portal = JETUI_YUI.getPortalInstance();
            var node = Y.Node.create("<a class='action portlet-action'/>");
            var icon = Y.Node.create("<img border='0'/>");
            node.setAttribute("href", decoAction.action);
            if (decoAction.target) {
                node.setAttribute("target", decoAction.target);
            }
            node.setAttribute("title", decoAction.name);
            icon.setAttribute("src", portal.portalContextPath + "/" + decoAction.link);
            icon.setAttribute("alt", decoAction.alt);
            node.appendChild(icon);
            return node;
        },
        
        /**
         * @method onPortletDecorationReadComplete
         */
        onPortletDecorationReadComplete : function(id, o, args) {
            var portal = JETUI_YUI.getPortalInstance();
            var windowId = args.complete[0];
            var actionBarElem = args.complete[1];
            var existingActionElem = null;
            var childElems = actionBarElem.getElementsByTagName("*");
            if (childElems.size() > 0) {
                existingActionElem = childElems.item(0);
            }
            var result = null;

            try {
                result = Y.JSON.parse(o.responseText);
                if (!result) {
                    Y.log("Error: no data found.");
                    return;
                }
            } catch (e) {
                Y.log("Error: " + e.message);
                return;
            }
            
            var decoActions = result.decoratorActions;
            for (var i = 0; i < decoActions.length; i++) {
                var decoActionNode = portal.createDecoratorActionNode(decoActions[i]);
                if (existingActionElem) {
                    actionBarElem.insertBefore(decoActionNode, existingActionElem);
                } else {
                    actionBarElem.appendChild(decoActionNode);
                }
            }
        },
        
        /**
         * @method onPortletRenderComplete
         */
        onPortletRenderComplete : function(id, o, args) {
            var portal = JETUI_YUI.getPortalInstance();
            var id = id;
            var v = args.complete;
            var windowId = v.get("id");
            var titleElem = null;
            var actionBarElem = null;
            var closeElem = null;
            var detachElem = null;
            var contentElem = null;
            var children = v.getElementsByTagName("*");
            children.each(function(v, k) {
                if (v.hasClass("PTitleContent")) {
                    titleElem = v;
                } else if (v.hasClass("PActionBar")) {
                    actionBarElem = v;
                } else if (v.hasClass("PContent")) {
                    contentElem = v;
                } else if (/^jetspeed-close/.test("" + v.get("id"))) {
                    closeElem = v;
	            } else if (/^jetspeed-detach/.test("" + v.get("id"))) {
	                detachElem = v;
	            }                
            });
            var title = o.getResponseHeader("JS_PORTLET_TITLE");
            if (titleElem) {
                titleElem.setContent(title);
            }
            if (closeElem) {
                closeElem.setAttribute("id", "jetspeed-close-" + windowId);
                closeElem.on('click', portal.removePortlet);
            }
            if (detachElem) {
                detachElem.setAttribute("id", "jetspeed-detach-" + windowId);
                detachElem.on('click', portal.detachPortlet);
            }
            var portletContent = o.responseText;
            if (contentElem) {
                contentElem.setContent(portletContent);
            }
            
            if (actionBarElem) {
                var uri = portal.portalContextPath + "/services/pagelayout/decoration/fragment/" + windowId + "/?_type=json";
                var config = {
                        on: { complete: portal.onPortletDecorationReadComplete },
                        headers: { "X-Portal-Path" : portal.portalServletPath + ":" + portal.portalPagePath },
                        arguments: { complete: [ windowId, actionBarElem ] }
                    };
                var request = Y.io(uri, config);
            }
        },
                
        /**
         * @method addPortlet
         */
        addPortlet : function(fragment) {
            var portal = JETUI_YUI.getPortalInstance();
            var templatePanel = Y.Node.one("#jsPortletTemplate");
            var v = templatePanel.cloneNode(true);            
            v.setStyle('display', '');
            v.set("id", fragment.id);
            v.setAttribute("name", fragment.name);
            v.setAttribute("row", fragment.properties.row);
            v.setAttribute("column", fragment.properties.column);
            
            var portlet = Y.JetUI.Portlet.attach(v);
            var dragGroups = ['grid'];
            var dragMode = 'intersect';
            var dropGroups  = ['grid'];
            if (portlet.get("detached") == false) {
                var ddNav = new Y.DD.Drag({
                    node: v,
                    groups: dragGroups,
                    dragMode: dragMode
                }).plug(Y.Plugin.DDProxy, {
                     moveOnEnd: false
                });
                ddNav.addHandle(JetuiConfiguration.dragHandleStyle);
                var drop = new Y.DD.Drop({
                    node: v,
                    groups: dropGroups            
                });
            }
            var columns = [];
            Y.Node.all(JetuiConfiguration.layoutStyle).each(function(v, k) {
                var locked = v.getAttribute("locked");
                if (!locked || "false" == locked) {
                    columns.push(v);
                }
            });
            columns[parseInt(fragment.properties.column)].appendChild(v);
            
            var uri = portal.portalContextPath + "/portlet" + portal.portalPagePath + "?entity=" + fragment.id;
            var request = Y.io(uri, { on: { complete: portal.onPortletRenderComplete }, arguments: { complete: v } } );
        },

        /**
         * @method addResizeHandle
         */        
        addResizeHandle : function(v, alwaysAdd) {
            var portal = JETUI_YUI.getPortalInstance();        	
        	var pcontent = v.one(".portlet .PContentBorder .PContent");
        	var region = pcontent.get('region');
        	var rh = pcontent.one(".resizeHandle");
	    	if (Y.Lang.isNull(rh)) {
	    		if (alwaysAdd == false) {
	    			return;
	    		}
		        var rh = Y.Node.create("<div class='resizeHandle'/>");
	        	rh.setStyle('position', 'absolute');
	        	pcontent.setStyle('height', (region.bottom - region.top) + "px")
				pcontent.setStyle('width', (region.right - region.left) + "px");        				        
	        	rh.setStyle('top', (region.bottom - region.top + portal.margins[3]) + "px");
				rh.setStyle('left', (region.right - region.left + portal.margins[0]) + "px");        				        
		        pcontent.appendChild(rh);	    		
	    	}
	        rh.data = { kind: 'resize', window: v, parent: pcontent };
	        var rhDrag = new Y.DD.Drag({
	            node: rh,
	            groups: [],
	            dragMode: 'point'                    
	        }).plug(Y.Plugin.DDProxy, { 
	          	 moveOnEnd: false         	    	
	        });    
	        rhDrag.addHandle('.resizeHandle');		                	
        },

        /**
         * @method removeResizeHandle
         */        
        removeResizeHandle : function(v) {
            var resizeHandleNode = v.one(".resizeHandle");
            if (resizeHandleNode) {
                resizeHandleNode.remove();
            }
        },

        removeWidthHeight : function(v) {
	    	v.setStyle('width', '');
	    	v.setStyle('height', '');
        },
        
        /**
         * @method calculateResizeMargin
         */
        /*
        calculateResizeMargin : function(v) {
	        var mtt = null;
	        var portletNode = v.one(".portlet");
	        if (portletNode) {
                mtt = portletNode.getComputedStyle('marginTop'); // TODO: margin-top could be different from other 3 margins
                if (!Y.Lang.isNull(mtt)) {
                    mtt = parseInt(mtt);
                }
                return;
	        }
        	var portal = JETUI_YUI.getPortalInstance();
	 		var mt = (mtt*2) + portal.margins[0]; // TODO: use array index constants
	    	return mt;
        },
        */
        
        activateWindow : function(active) {
            var portal = JETUI_YUI.getPortalInstance();        	
            if (!Y.Lang.isNull(portal.activeWindow) && portal.activeWindow == active) {
            	return; // clicking on active window, do nothing
            }
        	active.setStyle('zIndex', portal.calculateNextZIndex());
            var title = active.one(".portlet .PTitle");
            if (!Y.Lang.isNull(title)) {
            	//var unselect = title.getComputedStyle('background'); // this deadended for me, was not working
            	title.replaceClass('PTitle', 'PTitleActive');
            	var drag = Y.DD.DDM.getDrag(active);
            	drag.removeHandle(".PTitle");        	
            	drag.addHandle(".PTitleActive");
                if (!Y.Lang.isNull(portal.activeWindow)) {
                	var title = portal.activeWindow.one(".portlet .PTitleActive");
                    if (!Y.Lang.isNull(title)) {                            
                    	var drag = Y.DD.DDM.getDrag(portal.activeWindow);
                    	drag.removeHandle(".PTitleActive");        	
                    	drag.addHandle(".PTitle");
                    	title.replaceClass('PTitleActive', 'PTitle');
                     }
                 }
            }
        	portal.activeWindow = active;                                    	
        },
        
        /**
         * @method calculateNextZIndex
         */                	
        calculateNextZIndex : function() {
        	var next = 10;
        	var draggablePortlets = Y.Node.all(JetuiConfiguration.portletStyle);    
            draggablePortlets.each(function(v, k) {
            	if (v.getAttribute("id") != "jsPortletTemplate")
            	{
        	        var portlet = v.data;
        	        if (portlet.get("detached") == true) {
        	        	var zi = v.getStyle('zIndex');
        	            if (!Y.Lang.isNull(zi)) {
        	            	var zi = parseInt(zi);
        	            	if (zi > next) {
        	            		next = zi;
        	            	}        	            		
        	            }

        	        }
            	}
            });            	
            return next + 1;
        },
        
        /**
         * @method setScreenMask
         */
        setScreenMask : function(mask) {
            var maskNode = Y.one("#jetspeedScreenMaskNode");
            if (!mask) {
                if (maskNode) {
                    maskNode.setStyle("display", "none");
                }
            } else {
                if (!maskNode) {
                    maskNode = Y.Node.create("<div id='jetspeedScreenMaskNode'></div>");
                    maskNode.setStyles( { "display": "none", 
                        "position": "fixed", "overflow": "hidden", "left": "0px", "top": "0px", "width": "100%", "height": "100%", "z-index": 16777270, 
                        "padding": "0px", "margin": "0px", "background": "rgba(255, 255, 255, 0.5)" } );
                    Y.one("BODY").appendChild(maskNode);
                }
                maskNode.setStyle("display", "");
            }
        },
        
        /**
         * @method showModalPanel
         */
        showModalPanel : function(headerSelector, bodySelector, footerSelector, features) {
            var portal = JETUI_YUI.getPortalInstance();
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var width = (features["width"] ? features["width"] : parseInt(windowWidth / 2));
            var height = (features["height"] ? features["height"] : parseInt(windowHeight / 2));
            var left = (features["left"] ? features["left"] : parseInt((windowWidth - width) / 2));
            var top = (features["top"] ? features["top"] : parseInt((windowHeight - height) / 2));
            var zIndex = (features["zIndex"] ? features["zIndex"] : 16777271);
            var classes = features["addClasses"];
            var modalPanelOverlay = portal.modalPanelOverlay;
            if (!modalPanelOverlay) {
                var modalOverlayNode = Y.Node.one("#_jetspeedModalPanelOverlay");
                if (!modalOverlayNode) {
                    modalOverlayNode = Y.Node.create("<div id='_jetspeedModalPanelOverlay'><div class='yui-widget-hd'></div><div class='yui-widget-bd'></div><div class='yui-widget-ft'></div></div>");
                    var domNode = Y.Node.getDOMNode(modalOverlayNode);
                    document.body.appendChild(domNode);
                    if (classes && Y.Lang.isArray(classes)) {
                        for (var i = 0; i < classes.length; i++) {
                            modalOverlayNode.addClass(classes[i]);
                        }
                    }
                    modalOverlayNode.setStyle("backgroundColor", "#eee");
                    modalOverlayNode.setStyle("borderLeft", "#fff solid 2px");
                    modalOverlayNode.setStyle("borderTop", "#fff solid 2px");
                    modalOverlayNode.setStyle("borderRight", "#aaa solid 2px");
                    modalOverlayNode.setStyle("borderBottom", "#aaa solid 2px");
                    modalOverlayNode.setStyle("padding", "10px");
                }
                modalPanelOverlay = new Y.Overlay({
                    contentBox: "#_jetspeedModalPanelOverlay",
                    xy: [windowWidth, windowHeight],
                    visible: false
                });
                portal.modalPanelOverlay = modalPanelOverlay;
            }
            if (headerSelector) {
                if (Y.Lang.isString(headerSelector) && headerSelector.match(/^#/)) {
                    modalPanelOverlay.set("headerContent", Y.Node.one(headerSelector));
                } else {
                    modalPanelOverlay.set("headerContent", headerSelector);
                }
            }
            if (bodySelector) {
                if (Y.Lang.isString(bodySelector) && bodySelector.match(/^#/)) {
                    modalPanelOverlay.set("bodyContent", Y.Node.one(bodySelector));
                } else {
                    modalPanelOverlay.set("bodyContent", bodySelector);
                }
            }
            if (footerSelector) {
                if (Y.Lang.isString(footerSelector) && footerSelector.match(/^#/)) {
                    modalPanelOverlay.set("footerContent", Y.Node.one(footerSelector));
                } else {
                    modalPanelOverlay.set("footerContent", footerSelector);
                }
            }
            modalPanelOverlay.set("zIndex", zIndex);
            modalPanelOverlay.set("width", width);
            modalPanelOverlay.set("height", height);
            portal.setScreenMask(true);
            modalPanelOverlay.render();
            modalPanelOverlay.move([left, top]);
            modalPanelOverlay.show();
        },
        
        /**
         * @method hideModalPanel
         */
        hideModalPanel : function() {
            var portal = JETUI_YUI.getPortalInstance();
            var modalPanelOverlay = portal.modalPanelOverlay;
            if (modalPanelOverlay) {
                modalPanelOverlay.hide();
            }
            portal.setScreenMask(false);
        }
        
    });

    /**
     * Create a portlet window to represent a portal window.
     *
     * @class JetUI.Portlet
     * @extends Base
     * @param config {Object} Configuration object
     * @constructor
     */
    Y.JetUI.Portlet = function(config) {
        Y.JetUI.Portlet.superclass.constructor.call(this, config);
    };
    
    Y.mix(Y.JetUI.Portlet, {
        
        /**
         * The identity of the widget.
         *
         * @property JetUI.Portlet.NAME
         * @type String
         * @static
         */
        NAME : 'Portlet',
        
        /**
         * Static property used to define the default attribute configuration of
         * the Widget.
         *
         * @property JetUI.Portlet.ATTRS
         * @type Object
         * @protected
         * @static
         */
        ATTRS: {
            "name" : { value: "undefined" }, 
            "id" : { value: "0" },
            "tool" : { value : false },
            "detached" : { value : false },
            "state" : { value : "normal" },
            "locked" : { value : false },
            "column" : { value : 0 },
            "row" : { value : 0 },
            "x" : { value : 0 },
            "y" : { value : 0 }
        }
    });

    Y.extend(Y.JetUI.Portlet, Y.Base, {
        
        /**
         * Construction logic executed during instantiation.
         *
         * @method initializer
         * @protected
         */
        initializer : function(cfg) { 
        },
        
        /**
         * Destruction logic executed during instantiation.
         *
         * @method initializer
         * @protected
         */
        destructor : function(cfg) { 
        },
        
        /**
         * @method info
         */
        info : function() {
            Y.log("name: " + this.get("name"));
            Y.log("id  : " + this.get("id"));       
            Y.log("tool  : " + this.get("tool"));     
            Y.log("detached  : " + this.get("detached"));     
            Y.log("locked  : " + this.get("locked"));     
            Y.log("col, row  : " + this.get("column") + "," + this.get("row"));     
            Y.log("x, y  : " + this.get("x") + "," + this.get("y"));     
            Y.log("---------");
        }
    });

    /**
     * Create a portlet window and attach the portlet window to the sepcified node.
     * @method attach
     */
    Y.JetUI.Portlet.attach = function(node) {
        var portal = JETUI_YUI.getPortalInstance();        	    	
        var portlet = new Y.JetUI.Portlet();
        portlet.set("name", node.getAttribute("name"));
        portlet.set("id", node.getAttribute("id"));
        var tool = portal.booleanValue(node.getAttribute("tool"));
        portlet.set("tool", tool);
        var detached = portal.booleanValue(node.getAttribute("detached"));
        portlet.set("detached", detached);
        var display = node.getStyle('display');
        if (display != null && display == 'none')
        	portlet.set("state", "minimized");
        var locked = portal.booleanValue(node.getAttribute("locked"));
        portlet.set("locked", locked);
        portlet.set("column", node.getAttribute("column"));
        portlet.set("row", node.getAttribute("row"));
        portlet.set("x", node.getAttribute("x"));
        portlet.set("y", node.getAttribute("y"));
        node.data = portlet;
        return portlet;
    };
    
    /**
     * Create a layout window to represent a layout window.
     *
     * @class JetUI.Layout
     * @extends Base
     * @param config {Object} Configuration object
     * @constructor
     */
    Y.JetUI.Layout = function(config) {
        Y.JetUI.Layout.superclass.constructor.call(this, config);
    };
    
    Y.mix(Y.JetUI.Layout, {
        
        /**
         * The identity of the widget.
         *
         * @property JetUI.Layout.NAME
         * @type String
         * @static
         */
        NAME : 'Layout',
        
        /**
         * Static property used to define the default attribute configuration of
         * the Widget.
         *
         * @property JetUI.Layout.ATTRS
         * @type Object
         * @protected
         * @static
         */
        ATTRS: {
            "name" : { value: "undefined" }, 
            "id" : { value: "0" },
            "nested" : { value : false },
            "locked" : { value : false },
            "toolbar" : { value : false },
            "column" : { value : 0 },
            "row" : { value : 0 }
        }
    });
    
    Y.extend(Y.JetUI.Layout, Y.Base, {
        
        /**
         * Construction logic executed during instantiation.
         *
         * @method initializer
         * @protected
         */
        initializer : function(cfg) { 
        },
        
        /**
         * Destruction logic executed during instantiation.
         *
         * @method initializer
         * @protected
         */
        destructor : function(cfg) { 
        },
        
        /**
         * @method info
         */
        info : function() {
            Y.log("name: " + this.get("name"));
            Y.log("id  : " + this.get("id"));       
            Y.log("nested  : " + this.get("nested"));       
            Y.log("locked  : " + this.get("locked"));       
            Y.log("toolbar  : " + this.get("toolbar"));       
            Y.log("col, row  : " + this.get("column") + "," + this.get("row"));     
            Y.log("---------");
        }
    });
    
    /**
     * Create a layout and attach the layout to the sepcified node.
     * @method attach
     */
    Y.JetUI.Layout.attach = function(node) {
        var portal = JETUI_YUI.getPortalInstance();        	    	
    	var layout = new Y.JetUI.Layout();
        layout.set("name", node.getAttribute("name"));
        layout.set("id", node.getAttribute("id"));
        layout.set("nested", false);
        var locked = portal.booleanValue(node.getAttribute("locked"));
        layout.set("locked", locked);
        var toolbar = portal.booleanValue(node.getAttribute("toolbar"));
        layout.set("toolbar", toolbar);
        layout.set("column", node.getAttribute("column"));        
        layout.set("row", 0);
        node.data = layout;
        return layout;
    };
    
}, '3.0.0', {requires:['dd', 'io', 'json', 'node', 'node-menunav', 'overlay']});
