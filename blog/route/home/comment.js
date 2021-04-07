//导入评论集合
const { Comment } = require('../../model/comment');
module.exports = (req, res) => {
    //接收从客户端传来的请求参数
    const { content, aid, uid } = req.body;
    //向数据库中插入评论信息
    Comment.create({
            aid,
            uid,
            content,
            date: new Date()
        })
        //跳转到文章详情页面
    res.redirect('/home/article?id=' + aid);
}