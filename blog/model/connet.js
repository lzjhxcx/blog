//引入mongoose模块
const mongoose = require('mongoose');
//引入config模块
const config = require('config');
const { connect } = require('../route/admin');
//连接mongodb数据库
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useUnifiedTopology: true, useNewUrlParser: true })
    // mongoose.connect('mongodb://blog:blog@localhost/blog')
    .then(() => { console.log('数据库连接成功'); })
    .catch(() => { console.log('数据库连接失败'); });
module.exports = connect;