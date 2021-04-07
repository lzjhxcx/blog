//引入用户集合
const { User } = require('../../model/user');
//引入bcrypt模块
const bcrypt = require('bcrypt');
module.exports = async(req, res) => {
    //获取post参数，需要用到body-parser
    // res.send(req.body);
    //后台验证邮箱和密码
    let { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error.art', { msg: '邮箱或密码错误，请重试' });
    } else {
        //根据邮箱在数据库中查找
        let user = await User.findOne({ email });
        //有这个邮箱号
        if (user) {
            //密码比对成功
            let isVaild = await bcrypt.compare(password, user.password);
            if (isVaild) {
                req.app.locals.userInfo = user;
                req.session.username = user.username;
                req.session.role = user.role;
                if (user.role == 'admin') {
                    res.redirect('/admin/user');
                } else {
                    res.redirect('/home/index');
                }
            } else {
                //密码比对失败
                return res.status(400).render('admin/error.art', { msg: '邮箱或密码错误，请重试' });
            }
        }
        //没有这个邮箱 
        else {
            return res.status(400).render('admin/error.art', { msg: '邮箱或密码错误，请重试' });
        }
    }
}