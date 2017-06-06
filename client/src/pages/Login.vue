<template>
  <div class="login-container">
    <section class="login-form">
      <div class="login-home-logo ly-row-flex flex-center flex-middle">
        <router-link :to="{name: 'home'}">
          <img class="home-logo-icon" src="../assets/image/avatar.jpg" alt="" />
        </router-link>
      </div>
      <div class="login-user">
        <label class="login-user-text">用户名</label>
        <input class="login-form-user" type="text" value="" placeholder="用户名"
          v-model="username">
      </div>
      <div class="login-login-password">
        <label class="login-password-text">密码</label>
        <input class="login-form-password" type="password" value="" placeholder="密码"
          v-model="password">
      </div>
      <button class="login-btn-login" type="button"
        @click="evtUserLogin">用户登陆</button>
        <!--
       <button class="login-btn-register" type="button"
        @click="evtUserRegister">用户注册</button>-->
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['userRegister', 'userLogin']),
    verifyLoginOpts() {
      if (this.username.length === 0) {
        return '用户名不能为空'
      }
      if (this.password.length === 0) {
        return '密码不能为空'
      }
      return ''
    },
    evtUserLogin () {
      const message = this.verifyLoginOpts()
      if (message) {
        return this.$message({
          message: message,
          type: 'warning'
        })
      }
      this.userLogin({
        username: this.username,
        password: this.password
      }).then((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
        window.setTimeout(() => {
          this.$router.push({name: 'manageList'})
        }, 300)
      }).catch((res) => {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      })
    },
    evtUserRegister () {
      const message = this.verifyLoginOpts()
      if (message) {
        return this.$message({
          message: message,
          type: 'warning'
        })
      }
      this.userRegister({
        username: this.username,
        password: this.password
      }).then((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
      }).catch((res) => {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      })
    }
  },
  created () {
  }
}
</script>

<style lang="postcss">
.login-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #389daa;
}

.login-form {
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: auto;
  transform: translate(-50%, -50%);
  padding: 30px;
  border-radius: 10px;
  background: #fff;
  .login-home-logo {
    width: 100%;
    height: auto;
    margin: 0;
    text-align: center;
    .home-logo-icon {
      width: 64px;
      height: 64px;
      border-radius: 100%;
      margin-right: 10px;
    }
    .homt-logo-text {
      font-size: 24px;
    }
  }
  .login-user {
    width: 100%;
    height: auto;
    .login-user-text {
      display: block;
      color: #ccc;
      margin-bottom: 10px;
    }
  }
  .login-login-password {
    width: 100%;
    height: auto;
    .login-password-text {
      display: block;
      color: #ccc;
      margin-bottom: 10px;
    }
  }
  .login-form-user, .login-form-password {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 38px;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: none;
  }
  .login-btn-login, .login-btn-register {
    display: block;
    width: 100%;
    height: 40px;
    color: #fff;
    border: 0;
    background: #eb7372;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
  }
}
</style>
