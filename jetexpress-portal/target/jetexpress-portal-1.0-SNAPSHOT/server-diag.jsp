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
<%-- 
This page is meant to be used for diagnostics when the portal becomes unavailable
TODO: provide other diagnostic information, Heap Usage, Number of users 
--%>
<%@page import="org.apache.jetspeed.PortalReservedParameters" session="false"%>
<%@page import="org.apache.jetspeed.request.RequestDiagnostics"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
  <title>Portal Diagnostic Information</title>
  <body>
  <%-- ensure no session is created --%>
  <% if (request.getSession(false) != null)
     {
       pageContext.setAttribute("rd",request.getSession().getAttribute(PortalReservedParameters.REQUEST_DIAGNOSTICS_ATTRIBUTE));
     } 
  %>
  <c:if test="${rd != null}">
    <h2>Request Error Diagnostics</h2>
    <table border="0">
      <tr><td><b>Error ID</b></td><td>&nbsp;&nbsp;&nbsp;</td><td><c:out value="${rd.id}"/></td></tr>
      <tr><td><b>Message</b></td><td></td><td><c:out value="${rd.errorDescription}"/></td></tr>
    <c:if test="${rd.path != null}">
      <tr><td><b>Path</b></td><td></td><td><c:out value="${rd.path}"/></td></tr>
    </c:if>
    <c:if test="${rd.userPrincipalName != null}">
      <tr><td><b>User</b></td><td></td><td><c:out value="${rd.userPrincipalName}"/></td></tr>
    </c:if>
    <c:if test="${rd.portletApplicationName != null}">
      <tr><td><b>Application</b></td><td></td><td><c:out value="${rd.portletApplicationName}"/></td></tr>
    </c:if>
    <c:if test="${rd.portletName != null}">
      <tr><td><b>Portlet</b></td><td></td><td><c:out value="${rd.portletName}"/></td></tr>
    </c:if>
    <c:if test="${rd.portletWindowId != null}">
      <tr><td><b>Window ID</b></td><td></td><td><c:out value="${rd.portletWindowId}"/></td></tr>
    </c:if>
    </table>
    <p>
      Click <a href='javascript:history.go(-1)'>here</a> to go back to the previous page.
    </p>
  </c:if>
  <c:choose>
    <%-- only show Server Status either on when already showing a RequestDiagnostics or when logged in --%>
    <c:when test="${rd != null || pageContext.request.userPrincipal != null}">
      <h3>Server Status</h3>
      <table border="0">
        <tr><td><b>Free Memory (KB)</b></td><td>&nbsp;&nbsp;&nbsp;</td><td><%= Runtime.getRuntime().freeMemory()/1024 %></td></tr>
        <tr><td><b>Total Memory (KB)</b></td><td></td><td><%= Runtime.getRuntime().totalMemory()/1024  %></td></tr>
      </table>
    </c:when>
    <c:otherwise>
      <p>Please <a href='<c:url value="/"/>'>login</a></p>
    </c:otherwise>
  </c:choose>
  </body>
</html> 
