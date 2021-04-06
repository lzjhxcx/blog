//引入用户集合
const { User, validateUser } = require('../../model/user');
//引入bcrypt模块
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    try {
        await validateUser(req.body);
    } catch (e) {

        // 验证没有通过
        // e.message
        // 重定向回用户添加页面
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        // // JSON.stringify() 将对象数据类型转换为字符串数据类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }))
    }
    // 验证当前要注册的邮箱地址是否已经注册过
    let isReg = await User.findOne({ email: req.body.email });
    if (isReg) {
        //邮箱已被注册，返回错误信息
        // return res.redirect(`/admin/user-edit?message='邮箱已经注册'`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱已经注册' }))
    } else {
        //邮箱没有注册，进行下一步，对密码进行加密处理
        //    生成随机字符串 gen => generate 生成 salt 盐
        let salt = await bcrypt.genSalt(10);
        //    使用随机字符串对密码进行加密
        req.body.password = await bcrypt.hash(req.body.password, salt);
        // 将用户信息添加到数据库中
        User.create(req.body);
        //重定向页面到用户列表页面
        res.redirect('/admin/user');

    }
}