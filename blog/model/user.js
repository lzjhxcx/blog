//导入mongoose模块
const mongoose = require('mongoose');
//导入bcrypt模块
const bcrypt = require('bcrypt');
//引入Joi模块
const Joi = require('joi');
//设定集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});
//创建用户集合
const User = mongoose.model('User', userSchema);

// async function encodePwd() {
//     // 生成随机字符串 gen => generate 生成 salt 盐
//     let salt = await bcrypt.genSalt(10);
//     // 使用随机字符串对密码进行加密
//     let pass = await bcrypt.hash('77777777', salt)
//     console.log(pass);
//     //加密用户密码
//     User.findOneAndUpdate({ username: '牛肉干' }, {
//         username: '牛肉干',
//         email: '1234567@163.com',
//         password: pass,
//         role: 'admin',
//         state: 0
//     }).then(result => console.log(result));
// }

// encodePwd();

let validateUser = user => {
    //设置验证规则
    const schema = {
        username: Joi.string().min(2).max(20).required().error(new Error('用户名格式不正确')),
        email: Joi.string().email().required().error(new Error('邮箱格式不正确')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码格式不正确')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    return Joi.validate(user, schema);
}
module.exports = {
    User,
    validateUser
};