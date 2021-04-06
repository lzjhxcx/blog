//引入用户集合
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    let id = req.query.id;
    if (id) {
        const user = await User.findOne({ _id: id });
        res.render('admin/user-edit', {
            message: req.query.message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });

    } else {
        res.render('admin/user-edit', {
            message: req.query.message,
            link: '/admin/user-edit',
            button: '提交'
        });
    }
}