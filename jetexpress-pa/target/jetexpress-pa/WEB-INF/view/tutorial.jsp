<%@ page session="true" contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/portlet" prefix="portlet" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix='c'%>

<portlet:defineObjects />

<portlet:renderURL var="max" windowState='maximized' />
<portlet:renderURL var="normal" windowState='normal' />
<c:out value="${renderRequest.windowState}" />
<c:if test="${renderRequest.windowState == 'maximized'}">
  <a href='<%=normal%>'>Normal</a>
</c:if>
<c:if test="${renderRequest.windowState == 'normal'}">
  <a href='<%=max%>'>Max</a>
</c:if>