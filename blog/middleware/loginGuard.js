var guard = (req, res, next) => {
    // 判断用户访问的是不是登录页面
    // 判断用户是否登录
    // 如果用户是登录的 请求放行
    // 如果用户没有登录,将请求重定向到登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        if (req.session.role == 'normal') {
            return res.redirect('/home/index');
        }
        //如果用户是登录的 继续下一步操作
        next();
    }
}
module.exports = guard;