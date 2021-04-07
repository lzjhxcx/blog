//引入express框架
const express = require('express');

//构建模块化路由
const home = express.Router();
//首页
home.get('/index', require('./home/index'));
//文章详情页面
home.get('/article', require('./home/article'));
//文章评论功能路由
home.post('/comment', require('./home/comment'));
//导出
module.exports = home;