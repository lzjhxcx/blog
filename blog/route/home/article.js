//引入article集合
const { Article } = require('../../model/article');
//引入comment集合
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    //接收客户端传来的id值
    const id = req.query.id;
    //根据id去数据库中查找文章
    const article = await Article.findOne({ _id: id }).populate('author');
    let strArticle = JSON.stringify(article);
    let jsonArticle = JSON.parse(strArticle);
    //根据文章id去comment数据库中查找当前文章的评论信息
    const comments = await Comment.find({ aid: id }).populate('uid');
    let strComment = JSON.stringify(comments);
    let jsonComment = JSON.parse(strComment);
    // res.send(jsonComment)
    // return
    res.render('home/article.art', {
        article: jsonArticle,
        comments: jsonComment,
        isLogin: req.session.username
    })

}