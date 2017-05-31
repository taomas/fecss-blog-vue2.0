const User = require('../models/user')
const user = new User()

const jwt = require('koa-jwt')

const login = async (ctx, next) => {
  const opts = ctx.request.body;
  const token = jwt.sign(JSON.stringify({
    name: opts.name,
    original_iat: Date.now()
  }), 'shared-secret');
  const result = await user.query(opts)
  const loginUser = result.length ? result[0] : ''
  if (loginUser) {
    ctx.body = {
      success: true,
      message: '用户登陆成功',
      user: loginUser,
      token: token
    }
  } else {
    ctx.body = {
      success: false,
      message: '用户名或密码错误',
      user: loginUser
    }
  }
}

const register = async (ctx, next) => {
  const opts = ctx.request.body;
  let result = await user.query({
    username: opts.username
  })
  if (result.length > 0) {
    ctx.body = {
      success: false,
      message: '该账户已存在！',
      result: result
    }
  } else {
    result = await user.save(opts)
    if (result) {
      ctx.body = {
        success: true,
        message: '注册成功',
        result: result
      }
    }
  }
}

const queryUsers = async (ctx, next) => {
  const result = await user.queryAll()
  if (result) {
    ctx.body = {
      success: true,
      message: '查询账户成功',
      result: result
    }
  }
}

const deleteUsers = async (ctx, next) => {
  const result = user.removeAll()
  if (result) {
    ctx.body = {
      success: true,
      message: '删除所有账户成功',
      result: result
    }
  }
}

const userAuth = async (ctx, next) => {
  // 如果不是admin，直接跳过该中间件
  if (ctx.request.url.indexOf('admin') === -1) {
    return await next;
  }
  var token = ctx.request.headers.token || '';
  if (token) {
    var profile = jwt.verify(token, 'shared-secret');
    if (profile) {
      // 设置过期时间为7天
      if (Date.now() - profile.original_iat  < 7 * 24 * 60 * 60 * 1000) {
        ctx.user_token = profile;
        await next;
      } else {
        ctx.status = 401;
        ctx.body = {
          success: false,
          message: 'token已过期'
        };
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: 'token认证失败'
      }
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: 'token认证失败'
    }
  }
}

module.exports = {
  login,
  register,
  queryUsers,
  deleteUsers,
  userAuth
}
