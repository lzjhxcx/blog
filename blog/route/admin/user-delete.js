//引入用户集合
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    //接受从客户端传过来的id值
    let id = req.body.id;
    //从数据库查找并删除用户
    await User.deleteOne({ _id: id });
    //重定向到用户页面
    res.redirect('/admin/user');
}