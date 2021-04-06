//引入文章集合
const { Article } = require('../../model/article');
//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    //接受客户端传来的page值
    let page = req.query.page;
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //确定数据总数
    let datas = await Article.countDocuments({});
    //查询所有文章
    // let articles = await Article.find().populate('author').lean();
    let articles = await pagination(Article).page(page).size(5).display(5).populate('author').exec();
    let str = JSON.stringify(articles);
    let json = JSON.parse(str);
    // 渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: json,
        datas: datas
    });
    // res.send(articles)
}