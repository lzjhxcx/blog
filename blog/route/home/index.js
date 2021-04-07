//引入article集合
const { Article } = require('../../model/article');
//导入mongo-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    //接收客户端传来的page
    const page = req.query.page;
    //分页查询文章
    let articles = await pagination(Article).page(page).size(4).display(5).populate('author').exec();
    let str = JSON.stringify(articles);
    let json = JSON.parse(str);
    res.render('home/default.art', {
        articles: json
    })
}