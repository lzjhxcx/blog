//导入文章集合
const { Article } = require('../../model/article');
//引入formidable模块
const formidable = require('formidable');
//引入path模块
const path = require('path');
module.exports = async(req, res) => {
    //接受文章id
    const id = req.query.id;
    console.log(id);
    // //获取客户端传来的参数
    // const { title, publishDate, cover, content } = req.body;
    // console.log(req.body);
    // await Article.updateOne({ _id: id }, {
    //         title: title,
    //         publishDate: publishDate,
    //         cover: cover,
    //         content: content
    //     })
    //重定向到用户列表页面
    // res.redirect('/admin/user')

    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //设置文件上传路径,推荐绝对路径，需要引入path模块
    form.uploadDir = path.join(__dirname, '../', '../', 'public/', 'uploads');
    //是否保留表单上传文件的文件扩展名，默认不保留，这里需要保留
    form.keepExtensions = true;
    //对表单进行解析
    form.parse(req, async(err, fields, files) => {
        //err 错误信息
        //fields 储存普通请求参数
        //files 储存上传的文件信息
        // res.send(files.cover.path.split('public')[1])
        //将文章信息存储到数据库中
        await Article.updateOne({ _id: id }, {
                title: fields.title,
                author: fields.author,
                publishDate: fields.publishDate,
                cover: files.cover.path.split('public')[1],
                content: fields.content
            })
            //插入成功后重定向到文章管理页面
        res.redirect('/admin/article');
    })
}