//引入文章集合
const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    let id = req.query.id;
    console.log(id);
    if (id) {
        const article = await Article.findOne({ _id: id });
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });

    } else {
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '提交'
        });
    }
}