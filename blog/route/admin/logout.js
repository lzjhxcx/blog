module.exports = (req, res) => {
    // 删除session
    req.session.destroy(function() {
        // 删除cookie
        res.clearCookie('connect.sid');
        //清除用户储存在userInfo的数据
        req.app.locals.userInfo = null;
        // 重定向到用户登录页面
        res.redirect('/admin/login');
    });
}