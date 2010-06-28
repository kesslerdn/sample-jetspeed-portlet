<%--
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements.  See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

--%>
<%@ page contentType="text/html" %>
<%@ page import="java.util.Collection" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="org.apache.jetspeed.ui.Jetui" %>
<%@ page import="org.apache.jetspeed.request.RequestContext" %>
<%@ page import="org.apache.jetspeed.om.page.ContentFragment" %>
<%@ page import="org.apache.jetspeed.om.page.ContentPage" %>
<%@ page import="org.apache.jetspeed.portlets.layout.ColumnLayout" %>
<%@ page import="org.apache.jetspeed.portlets.layout.LayoutCoordinate" %>
<%@ page import="org.apache.jetspeed.om.page.ContentFragment" %>
<%@ page import="org.apache.jetspeed.decoration.Decoration" %>
<%@ page import="org.apache.jetspeed.decoration.DecoratorAction" %>
<%@ page import="org.apache.jetspeed.PortalReservedParameters" %>
<%@ page import="org.apache.jetspeed.container.PortletWindow" %>
<%@ page import="javax.portlet.WindowState" %>
<%
	RequestContext rc = (RequestContext)request.getAttribute(RequestContext.REQUEST_PORTALENV);
    String content = (String)request.getAttribute("content");
    String decorator = (String)request.getAttribute("decorator");
    Boolean detached = (Boolean)request.getAttribute("detached");    
    ContentFragment fragment = (ContentFragment)request.getAttribute("fragment");
    LayoutCoordinate coordinate = (LayoutCoordinate)request.getAttribute("coordinate");
    String title = "";
    boolean showTitle = fragment.getDecoration().getTitleOption() == Decoration.TitleOption.SHOW;   
    if (showTitle && fragment.getPortletContent() != null)
        title = fragment.getPortletContent().getTitle();
    if (detached != null)
    {
    	String x = fragment.getProperty(ContentFragment.X_PROPERTY_NAME);
    	String y = fragment.getProperty(ContentFragment.Y_PROPERTY_NAME);
    	int row = fragment.getLayoutRow();
        int col = fragment.getLayoutColumn();
%>
    <div class="portal-layout-cell" x='<%=x%>' y='<%=y%>' id="<%=fragment.getId()%>" name="<%=fragment.getName()%>" column="<%=col%>" row="<%=row%>" style='position: absolute; top: <%=x%>px; left: <%=y%>px;' detached='true' locked='<%=fragment.isLocked()%>'>
<%
    }
    else
    {
%>
    <div class="portal-layout-cell" id="<%=fragment.getId()%>" name="<%=fragment.getName()%>" column="<%=coordinate.getX()%>" row="<%=coordinate.getY()%>" detached='false' locked='<%=fragment.isLocked()%>'>
<%  }  %>
        <div class="portlet <%=decorator%>">
            <div class="PTitle" >
              <div class="PTitleContent"><%=title%></div>
                <div class="PActionBar">
<%
                    Decoration.ActionsOption option = fragment.getDecoration().getActionsOption();  
                    if (option != Decoration.ActionsOption.HIDE) // TODO: HOVER, DROP DOWN not yet implemented
                    {
                        for(DecoratorAction action : (List<DecoratorAction>)fragment.getDecoration().getActions())
                        {                   
                            String target = "target='"+ action.getTarget() + "'";
                            if (action.getTarget() == null)
                                target = "";
 %>             
                 <a href="<%=action.getAction()%>" title="<%=action.getName()%>" class="action portlet-action" <%=target%>><img src="<%=request.getContextPath()%>/<%=action.getLink()%>" alt="<%=action.getAlt()%>" border="0" /></a>
<%                       } // for loop               
// FIXME: integrate close into standard actions, use security constraints on close action
if (request.getUserPrincipal() != null && fragment.getDecoration().getActions().size() > 0)
{
%>
                 <span style='cursor: pointer; z-index: 1000;' id='jetspeed-close-<%=fragment.getId()%>' title="close" class="portlet-action-close"><img src="<%=request.getContextPath()%>/decorations/images/close.gif" alt="Close" border="0" /></span>
<% if (detached != null) { %>                               
                 <span style='cursor: pointer; z-index: 1000;' id='jetspeed-detach-<%=fragment.getId()%>' title="attach" class="portlet-action-attach"><img src="<%=request.getContextPath()%>/decorations/images/attach.gif" alt="Attach" border="0" id='jetspeed-detach-img-<%=fragment.getId()%>'/></span>              
<% } else {  %>
                 <span style='cursor: pointer; z-index: 1000;' id='jetspeed-detach-<%=fragment.getId()%>' title="detach" class="portlet-action-detach"><img src="<%=request.getContextPath()%>/decorations/images/detach.gif" alt="Detach" border="0" id='jetspeed-detach-img-<%=fragment.getId()%>'/></span>              
<% } }  } %>
                </div>
              </div>
               <div class="PContentBorder">
<% if (detached != null) 
{
	PortletWindow win = rc.getPortletWindow(fragment.getId());
	if (win.getWindowState().equals(WindowState.MINIMIZED))
	{
%>		
        <div class="PContent"></div>                
<%	
	}
	else
	{
		String x = fragment.getProperty(ContentFragment.X_PROPERTY_NAME);
		String y = fragment.getProperty(ContentFragment.Y_PROPERTY_NAME);	
		String h = fragment.getProperty(ContentFragment.HEIGHT_PROPERTY_NAME);
		String w = fragment.getProperty(ContentFragment.WIDTH_PROPERTY_NAME);
		if (x == null) x = "0"; if (y == null) y = "0";
		if (h == null) h = "100"; if (w == null) w = "150";
		int top = new Double(Double.parseDouble(h)).intValue() + 17; // FIXME: hardcoded 
		double left = new Double(Double.parseDouble(w)).intValue() - 4;
%>                 
                 <div class="PContent" style='height: <%=h%>px; width: <%=w%>px;'><%=content%>                
                    <div class="resizeHandle" style='position: absolute; top: <%=top%>px; left: <%=left%>px;'></div>
<% } } else { %>
                 <div class="PContent"><%=content%>                
<% } %>                    
                 </div>
               </div>
            </div>
          </div>
     
