//引入mongoose模块
const mongoose = require('mongoose');
const { connect } = require('../route/admin');
//连接mongodb数据库
mongoose.connect('mongodb://blog:blog@localhost:27017/playground', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => { console.log('数据库连接成功'); })
    .catch(() => { console.log('数据库连接失败'); });
module.exports = connect;