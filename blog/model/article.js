//引入mongoose
const mongoose = require('mongoose');
//创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 30,
        minlength: 3,
        require: [true, '请输入文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});
//根据规则创建集合
const Article = mongoose.model('Article', articleSchema);
//导出文章集合
module.exports = {
    Article
};