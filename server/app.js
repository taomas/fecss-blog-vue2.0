const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const cors = require('kcors');
const SUCCESS_CODE = 1000000
const ERROR_CODE = 100010

const articles = require('./routes/articles');
const users = require('./routes/users');
const manage = require('./routes/manage');
const userAuth = require('./controllers/user').userAuth

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));
app.use(cors())

const db = require('./config/mongoose')();
db.on('error', console.error.bind(console, 'error: connect error!'))
db.once('open', function () {
  // 一次打开记录
  console.log('connect success!');
});

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(userAuth)
router.use('/', articles.routes(), articles.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/manage', manage.routes(), manage.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

onerror(app)
app.use(function*(){
  this.body = fs.createReadStream('not exist');
})

// app.on('error', function(err, ctx){
//   console.log('==========server error==========')
//   console.log(err)
//   // logger.error('server error', err, ctx);
//   ctx.body = {
//     data: {},
//     statuscode: ERROR_CODE,
//     message: '服务器异常',
//     exception: err
//   }
// });


module.exports = app;
