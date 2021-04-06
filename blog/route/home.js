//引入express框架
const express = require('express');

//构建模块化路由
const home = express.Router();

home.get('/index', (req, res) => {
    res.send('欢迎来到博客首页')
});

//导出
module.exports = home;