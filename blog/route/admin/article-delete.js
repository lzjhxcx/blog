//导入文章集合
const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    //接受从客户端传过来的id值
    const id = req.body.id;
    // console.log(id);
    //根据id值删除文章
    await Article.findByIdAndDelete({ _id: id });
    //删除后跳转到文章页面
    res.redirect('/admin/article');
}