<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!--------------------------------------------------------------------------------->
<script type="text/javascript" src="<%=basePath%>js/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/bootstrap.min.js"></script>
<link rel="stylesheet" href="<%=basePath%>css/bootstrap.min.css">
<!--------------------------------------------------------------------------------->
<link rel="stylesheet" href="<%=basePath%>css/bootstrap-select.min.css">
<script type="text/javascript" src="<%=basePath%>js/bootstrap-select.js"></script>
<!--------------------------------------------------------------------------------->
<link rel="stylesheet"
	href="<%=basePath%>css/navbar/chartist-custom.css">
<link rel="stylesheet" href="<%=basePath%>css/navbar/main.css">
<link rel="stylesheet"
	href="<%=basePath%>css/navbar/font-awesome.min.css">
<link rel="stylesheet" href="<%=basePath%>css/navbar/style.css">
<link rel="stylesheet" href="<%=basePath%>css/table.css">
<!--------------------------------------------------------------------------------->
<link rel="stylesheet" href="<%=basePath%>css/toastr.css" />
<script type="text/javascript" src="<%=basePath%>js/toastr.js"></script>
<!--------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------->
<script type="text/javascript"
	src="<%=basePath%>js/loginAndLogout/login.js"></script>
<!--------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------->
<title>警务测评系统</title>
</head>
<body>
	<div class="panel" style="width: 550px; margin: 100px auto;">
		<div class="panel-heading">
			<!-- 			<div> -->
			<%-- 				<img src="<%=basePath%>img/logo.jpg" height="40px"> --%>
			<!-- 			</div> -->
			<h2 style="text-align: center;">警务测评系统</h2>
		</div>
		<div class="panel-body" style="margin: 0 0 20px 0;">
			<div class="form-group">
				<input type="email" class="form-control" id="login_username"
					placeholder="账号">
			</div>
			<div class="form-group">
				<input type="password" class="form-control" id="login_password"
					placeholder="密码">
			</div>
			<br>
			<button style="float: right;" id="button_login"
				class="btn btn-primary" onclick="login('user')">用户登录</button>

			<button style="float: right; margin-right: 10px;"
				class="btn btn-primary" onclick="login('unit')">单位登陆</button>
		</div>
	</div>
	<script type="text/javascript" src="<%=basePath%>js/user/login.js"></script>
</body>
</html>