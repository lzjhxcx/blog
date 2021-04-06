//引入用户集合
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    // 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    // 接收客户端传递过来的当前页参数
    let page = req.query.page || 1;
    //确定数据总数
    let datas = await User.countDocuments({});
    //确定每一页显示的条数
    const pageSize = 5;
    //确定总的页数
    let pageTotal = Math.ceil(datas / pageSize);
    //查询起始位置
    let start = (page - 1) * pageSize;
    //查询每一页的用户信息
    let user = await User.find({}).limit(pageSize).skip(start);
    res.render('admin/user', {
        user: user,
        pageTotal: pageTotal,
        page: page,
        datas: datas
    });
}