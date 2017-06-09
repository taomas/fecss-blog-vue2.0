const User = require('../models/user')
const user = new User()
const jwt = require('koa-jwt')
import { SUCCESS_CODE, ERROR_CODE, TOKEN_ERROR_CODE } from '../config/config.js'

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
      data: {
        user: loginUser,
        token: token
      },
      statuscode: SUCCESS_CODE,
      message: '登录成功'
    }
  } else {
    ctx.body = {
      data: {},
      statuscode: ERROR_CODE,
      message: '用户名或密码错误'
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
      data: {
        user: result
      },
      statuscode: ERROR_CODE,
      message: '该用户名已被注册'
    }
  } else {
    result = await user.save(opts)
    ctx.body = {
      data: {
        user: result
      },
      statuscode: SUCCESS_CODE,
      message: '注册成功'
    }
  }
}

const queryUsers = async (ctx, next) => {
  const result = await user.queryAll()
  if (result) {
    ctx.body = {
      data: {
        result: result
      },
      statuscode: SUCCESS_CODE,
      message: '查询账户成功'
    }
  }
}

const deleteUsers = async (ctx, next) => {
  const result = user.removeAll()
  if (result) {
    ctx.body = {
      data: {
        result: result
      },
      statuscode: SUCCESS_CODE,
      message: '删除所有账户成功'
    }
  }
}

const userAuth = async (ctx, next) => {
  // 如果不是manage，直接跳过该中间件
  if (ctx.request.url.indexOf('manage') === -1) {
    return await next();
  }
  const token = ctx.request.headers.token || '';
  if (token) {
    const profile = jwt.verify(token, 'shared-secret');
    if (profile) {
      // 设置过期时间为7天
      if (Date.now() - profile.original_iat  < 7 * 24 * 60 * 60 * 1000) {
        ctx.user_token = profile;
        await next();
      } else {
        ctx.body = {
          statuscode: TOKEN_ERROR_CODE,
          message: 'token已过期'
        };
      }
    } else {
      ctx.body = {
        statuscode: TOKEN_ERROR_CODE,
        message: 'token认证失败'
      }
    }
  } else {
    ctx.body = {
      statuscode: TOKEN_ERROR_CODE,
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
