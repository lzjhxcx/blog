//导入用户集合和验证规则
const { User, validateUser } = require('../../model/user');
//引入bcrypt模块
const bcrypt = require('bcrypt');
const express = require('express');
module.exports = async(req, res, next) => {
    //获取客户端传来的参数
    let { username, email, password, role, state } = req.body;
    //获取传来的id值
    let id = req.query.id;
    //根据id值查询用户数据
    let user = await User.findOne({ _id: id });
    //密码验证，如果通过进行下一步
    let isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        //密码验证成功,将修改后的用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
                username: username,
                email: email,
                state: state,
                role: role
            })
            //重定向到用户列表页面
        res.redirect('/admin/user')
    } else {
        //密码验证失败,使用next（）触发错误处理中间件
        //id值也必须要有
        next(JSON.stringify({ path: '/admin/user-edit', message: '密码错误，不能修改用户信息', id: id }));
    }
}