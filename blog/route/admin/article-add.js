//引入formidable模块
const formidable = require('formidable');
//引入path模块
const path = require('path');
//引入文章集合
const { Article } = require('../../model/article');
module.exports = (req, res) => {
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
        await Article.create({
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