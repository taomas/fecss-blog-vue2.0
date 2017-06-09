const router = require('koa-router')();
const user = require('../controllers/user')

router.get('/query', user.queryUsers)
  .get('/delete', user.deleteUsers)
  .post('/login', user.login)
  .post('/register', user.register);

module.exports = router;
