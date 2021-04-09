//引入express框架
const express = require('express');
//创建博客管理页面路由
const admin = express.Router();
//渲染登录页面
admin.get('/login', require('./admin/loginPage'));
//创建用户管理页面路由
admin.get('/user', require('./admin/userPage'));
//登录功能
admin.post('/login', require('./admin/login'));
//退出功能
admin.get('/logout', require('./admin/logout'));
//创建新增用户页面路由
admin.get('/user-edit', require('./admin/user-edit'));
//实现用户新增功能
admin.post('/user-edit', require('./admin/user-edit-fn'));
// 用户修改功能路由
admin.post('/user-modify', require('./admin/user-modify'));
//用户删除功能路由
admin.post('/user-delete', require('./admin/user-delete'));
//文章管理页面
admin.get('/article', require('./admin/article'));
//文章编辑页面
admin.get('/article-edit', require('./admin/article-edit'));
//实现文章添加功能路由
admin.post('/article-add', require('./admin/article-add'));
// 用户修改功能路由
admin.post('/article-modify', require('./admin/article-modify'));
//用户删除功能路由
admin.post('/article-delete', require('./admin/article-delete'));
//导出
module.exports = admin;