//引入express框架
const express = require('express');
//导入path模块
const path = require('path');
//创建网站服务器
const app = express();
//引入body-parser 用来处理post请求参数
const bodyParser = require('body-parser');
//引入express-session模块
const session = require('express-session');
const { template } = require('express-art-template');
//导入dateformate
const dateFormat = require('dateformat');
//设置模板存放目录
app.set('views', path.join(__dirname, 'views'));
//渲染模板时不写后缀，默认拼接art为后缀
app.set('view engine', 'art');
//当渲染后缀为art的模板是，使用express-art-template模板引擎
app.engine('art', require('express-art-template'));
//向模板内部导入dateFormate变量
template.defaults.imports.dateFormat = dateFormat;
//导入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
//连接数据库
require('./model/connet');
// //初始化用户
// require('./model/user');
//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
//处理请求参数
app.use(bodyParser.urlencoded({ extended: false }));
//配置session
app.use(session({ secret: 'secret key' }))
    //拦截请求，判断用户的登录状态
app.use('/admin', require('./middleware/loginGuard'));
app.use('/home', home);
app.use('/admin', admin);
//错误处理中间件
app.use((err, req, res, next) => {
        // 将字符串对象转换为对象类型
        // JSON.parse() 
        const result = JSON.parse(err);
        //因为后面的参数可能不止两个，所以参数值不能写死
        let params = [];
        for (let attr in result) {
            if (attr != 'path') {
                params.push(attr + '=' + result[attr]);
            }
        }
        res.redirect(`${result.path}?${params.join('&')}`);
    })
    //监听端口
app.listen(3000);
console.log('网站服务器启动成功');