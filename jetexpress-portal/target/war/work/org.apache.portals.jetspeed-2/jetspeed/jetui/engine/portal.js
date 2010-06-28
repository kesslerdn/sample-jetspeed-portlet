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
 */
//Use loader to grab the modules needed
YUI(JETUI_YUI).use('jetui-portal', 'console', 'dd', 'io', 'datatype-xml', 'dataschema-xml', 'dataschema-json', 'node', 'dom-style', function(Y) {

    var portal = JETUI_YUI.getPortalInstance();
	var config = JETUI_YUI.config;
    Y.log("Starting up JETUI " +  config.engine + " engine...");        
    
    ////////////////////////////////////////////////////    
    // setup toolbar docking area and togglers    
    var lhsToggler = Y.one('#jstbLeftToggle');
    var rhsToggler = Y.one('#jstbRightToggle');    
    portal.jstbLeft = Y.one('#jstbLeft');
	if (!Y.Lang.isNull(portal.jstbLeft)) {
   	   var currentStyle = portal.jstbLeft.getStyle('display');
       var nodelist = portal.jstbLeft.get('children');
       nodelist.setStyle('display', currentStyle);          
	}
    portal.jstbRight = Y.one('#jstbRight')
	if (!Y.Lang.isNull(portal.jstbRight)) {
   	   var currentStyle = portal.jstbRight.getStyle('display');
       var nodelist = portal.jstbRight.get('children');
       nodelist.setStyle('display', currentStyle);          
	}
    var onClickPortlet = function(e) {
        var portal = JETUI_YUI.getPortalInstance();
        portal.activateWindow(e.currentTarget);        
    }

    var onClickToggler = function(e) {
    	var id = e.target.getAttribute('id');
    	var toggler = lhsToggler;
    	var toolbar = portal.jstbLeft;
    	var compareStyle = 'jstbToggle1';
    	if (id.indexOf('Left') == -1)
    	{
    		toggler = rhsToggler;
    		toolbar = portal.jstbRight;
        	var compareStyle = 'jstbToggle2';    		
    	}
    	portal.toggleToolbar(toolbar, toggler, compareStyle);    	    	
    };
    if (!Y.Lang.isNull(lhsToggler)) {
    	lhsToggler.on('click', onClickToggler);
    }
    if (!Y.Lang.isNull(rhsToggler)) {
    	rhsToggler.on('click', onClickToggler);
    }
    ////////////////////////////////////////////////////       
    // drag and drop
    var jetspeedZone = Y.one('#jetspeedZone');
    if (!Y.Lang.isNull(jetspeedZone)) {   
	    var jzDrop = new Y.DD.Drop({
	        node: jetspeedZone,
	        groups: ['detached']        
	    });
    }    
    var jstbLeft = Y.one('#jstbLeft');
    if (!Y.Lang.isNull(jstbLeft)) {    
	    var drop = new Y.DD.Drop({
	        node: jstbLeft,
	        groups: ['toolbars']
	    });
    }
    var jstbRight = Y.one('#jstbRight');
    if (!Y.Lang.isNull(jstbRight)) {    
	    var drop = new Y.DD.Drop({
	        node: jstbRight,
	        groups: ['toolbars']        
	    });
    }
    var first = null, firstDetached = null;
	var draggablePortlets = Y.Node.all(config.portletStyle);    
    draggablePortlets.each(function(v, k) {
    	if (v.getAttribute("id") != "jsPortletTemplate")
    	{
	        var portlet = Y.JetUI.Portlet.attach(v);
	        var dragGroups = ['grid'];
	        var dragMode = 'intersect';
	        var dropGroups  = ['grid'];
	        if (portlet.get("detached") == true) {
		        dragGroups = ['detached'],	        
		        dragMode = 'point';
		        dropGroups = [];
		        portal.addResizeHandle(v, false);
		        if (firstDetached == null) {
		        	first = firstDetached = v;
		        }
	        }
	        if (portlet.get("tool") == false)
	        {
		        var ddNav = new Y.DD.Drag({
		            node: v,
		            groups: dragGroups,
		            dragMode: dragMode                    
		        }).plug(Y.Plugin.DDProxy, { 
		          	 moveOnEnd: false         	    	
		        });    
		        ddNav.addHandle(config.dragHandleStyle);
		    	var drop = new Y.DD.Drop({
		            node: v,
		            groups: dropGroups            
		        });
		    	if (first == null)
		    		first = v;
	        }	        
	        v.on('click', onClickPortlet);		        
	        // portlet.info();
    	}
    });
    
    portal.activateWindow(first);
    
    var dropLayouts = Y.Node.all(config.layoutStyle); 
    dropLayouts.each(function(v, k) {
        var layout = Y.JetUI.Layout.attach(v);
        if (v.get('children').size() == 0)
        {
	    	var drop = new Y.DD.Drop({
	        node: v,
	        groups: ['grid']            
	    	});
        }
        //layout.info();        
    });
    
    var closeWindows = Y.Node.all('.portlet-action-close');
    closeWindows.each(function(v, k) {
        v.on('click', portal.removePortlet);
    });

    var detachWindows = Y.Node.all('.portlet-action-detach');
    detachWindows.each(function(v, k) {
        v.on('click', portal.detachPortlet);
    });

    var attachWindows = Y.Node.all('.portlet-action-attach');
    attachWindows.each(function(v, k) {
        v.on('click', portal.attachPortlet);
    });
    
	Y.DD.DDM.on('drag:drophit', function(e) {
	    var portal = JETUI_YUI.getPortalInstance();
		var drop = e.drop.get('node'),
            drag = e.drag.get('node');
        if (drag.data.get("detached"))
        {        	
            if (drop == portal.jstbLeft || drop == portal.jstbRight)
            {
	        	drag.setStyle('position', '');
				drag.setStyle('top', '');
				drag.setStyle('left', '');        		
				drop.appendChild(drag);
            }
            else
            {            		
				var dragParent = drag.get('parentNode');
            	drag.setStyle('position', 'absolute');
				drag.setStyle('top', e.drag.region.top + "px");
				drag.setStyle('left', e.drag.region.left + "px");        		
				jetspeedZone.appendChild(drag);
				if (dragParent.get("children").size() == 0)
				{        	        
				    if (dragParent == portal.jstbLeft) {
						portal.toggleToolbar(dragParent, lhsToggler, "jstbToggle1");
				    }
				    else  if (dragParent == portal.jstbRight) {
				    	portal.toggleToolbar(dragParent, rhsToggler, "jstbToggle2");        	
				    }
				}              				
            }
        }
        else
        {
        }
    });
	
    Y.DD.DDM.on('drag:end', function(e) {
    	var drag = e.target;
        if (drag.target) {
            drag.target.set('locked', false);
        }
        var portal = JETUI_YUI.getPortalInstance();
        var srcNode = drag.get('node');
        if (srcNode.data.kind == 'resize') {
	        var dragParent = srcNode.data.parent; // DST: srcNode.get('parentNode');
	        var region = dragParent.get('region');
	    	var height = parseInt(dragParent.getStyle('height'));
	    	var width = parseInt(dragParent.getStyle('width'));
	        var top = height + portal.margins[3];
	        var left = width + portal.margins[0] ;
	        srcNode.setStyle('top', top + "px");
	        srcNode.setStyle('left', left + "px");
	        srcNode.set('innerHTML', '');
        	srcNode.setStyle('visibility', '');   
        	portal.resizePortlet(srcNode.data.window, height, width);
        	return;
        }
        if (drag.get('node').data.get("detached"))
        {
            drag.get('node').setStyle('visibility', '');        	
        }
        else
        {
        	drag.get('node').get('children').setStyle('visibility', '');
        }        
        //drag.get('node').setStyle('border', '');                
        drag.get('node').removeClass('moving');
        drag.get('dragNode').set('innerHTML', '');

        portal.movePortlet(drag.get('node'), e);
    });        	
    
    Y.DD.DDM.on('drag:start', function(e) {
        var portal = JETUI_YUI.getPortalInstance();
    	var drag = e.target;
        var dragNode = drag.get('dragNode');
        var srcNode = drag.get('node');
        if (srcNode.data.kind == 'resize') {
        	dragNode.set('innerHTML', '<b>...Move</b>'); //srcNode.get('innerHTML'));
        	srcNode.setStyle('visibility', 'hidden');
            var dragWindow = srcNode.data.window; //srcNode.get('parentNode');        	
            portal.activateWindow(dragWindow);                	                	
        	return;
    	}
        portal.activateWindow(srcNode);                	                	
        
        dragNode.set('innerHTML', srcNode.get('innerHTML'));

        if (drag.get('node').data.get("detached"))
        {
        	drag.get('node').setStyle('visibility', 'hidden');
            portal.activateWindow(srcNode);                	
        }
        else
        {
        	srcNode.get('children').setStyle('visibility', 'hidden');
            srcNode.addClass('moving');        	
        }
        portal.lastX = drag.mouseXY[0];
        portal.lastY = drag.mouseXY[1];
    });

    Y.DD.DDM.on('drag:drag', function(e) {
    	var drag = e.target;
        var srcNode = drag.get('node');    	
        if (srcNode.data.kind == 'resize') {
	        var dragWindow = srcNode.data.window; // DST: drag.get('node').get('parentNode');
	        var box = srcNode.data.parent.get('parentNode');
	        var content = srcNode.data.parent;
	    	var left = parseInt(dragWindow.getStyle('left'));
	    	var top =  parseInt(dragWindow.getStyle('top'));
	    	var width = (drag.mouseXY[0] - left) + "px";
	    	var height = (drag.mouseXY[1] - top) + "px";
	    	if (!Y.Lang.isNull(content)) {
		    	content.setStyle('width', width);
		    	content.setStyle('height', height);
	    	}	    	
        }
    });
    
    Y.DD.DDM.on('drag:over', function(e) {
        var portal = JETUI_YUI.getPortalInstance();
    	if (portal.isMoving)
    		return;
    	
    	var x = e.drag.mouseXY[0],
    		y = e.drag.mouseXY[1];
    	
    	if (y == portal.lastY)
    	{    		
    	}
    	else if (y < portal.lastY) {
            portal.goingUp = true;
            
        } else {
            portal.goingUp = false;
        }
    	portal.lastY = y;
        if (x < portal.lastX) {
            portal.goingRight = false;
        } else {
            portal.goingRight = true;
        }        
        portal.lastX = x;
        
        if (e.drag.get('node').data.get("detached"))
        {        
            var drop = e.drop.get('node'),
            drag = e.drag.get('node');            
            var dragParent = drag.get('parentNode');
            var dropParent = drop.get('parentNode');        	
            if (drop == portal.jstbLeft || drop == portal.jstbRight)
            {
				if (!drop.contains(drag)) {
					  drop.appendChild(drag);
				}
				// close up the toolbar leaving from
				if (dragParent.get("children").size() == 0)
				{        	        
				    if (dragParent == portal.jstbLeft) {
						portal.toggleToolbar(dragParent, lhsToggler, "jstbToggle1");
				    }
				    else  if (dragParent == portal.jstbRight) {
				    	portal.toggleToolbar(dragParent, rhsToggler, "jstbToggle2");        	
				    }
				}              
            }        	
            else // jetspeed drop zone
            {
            	//Y.log("hovering over the zone");
            }
        }
        else
        {
	    	var region = e.drop.get('node').get('region');
	    	if (e.drop.get('node').data.name == "Portlet")
	    	{
		    	var srcRegion = e.drag.get('node').get('region');
		    	if (y >= srcRegion.top && y <= srcRegion.bottom && x >= srcRegion.left && x <= srcRegion.right)
		    	{
		    		//Y.log("dragging over src");
		    	}	    	
		    	else if (y >= region.top && y <= region.bottom && x >= region.left && x <= region.right)
		    	{
		    		//Y.log("**** HIT");
		    		portal.isMoving = true;
		    		portal.moveToGrid(e); 
		    		portal.isMoving = false;
		    	}
	    	}
	    	else if (e.drop.get('node').data.name == "Layout")
	    	{
	    		portal.isMoving = true;
	    		portal.moveToLayout(e);
	    		portal.isMoving = false;
	    	}
	    	
        }
		//Y.log("x,y = " + x + "," + y);
    	
    });
    
});