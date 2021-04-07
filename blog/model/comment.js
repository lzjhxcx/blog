//引入mongoose模块
const date = require('joi/lib/types/date');
const object = require('joi/lib/types/object');
const mongoose = require('mongoose');
//设定comment集合规则
const commentSchema = mongoose.Schema({
    //文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        require: true
    },
    //用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    //评论时间
    date: {
        type: Date,
        default: Date.now
    },
    //评论内容
    content: String
});
//应用规则创建集合
const Comment = mongoose.model('Comment', commentSchema);

//导出集合
module.exports = {
    Comment
}