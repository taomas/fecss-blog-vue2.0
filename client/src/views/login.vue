<template>
  <div class="manage-container">
    <section class="manage-form">
      <h1 class="manage-home-logo ly-row-flex flex-center flex-middle">
        <router-link :to="{name: 'home'}">
          <img class="home-logo-icon" src="../assets/image/avatar.jpg" alt="" />
        </router-link>
      </h1>
      <div class="manage-login-user">
        <label class="login-user-text">用户名</label>
        <input class="manage-form-user" type="text" value="" placeholder="用户名"
          v-model="username">
      </div>
      <div class="manage-login-password">
        <label class="login-password-text">密码</label>
        <input class="manage-form-password" type="password" value="" placeholder="密码"
          v-model="password">
      </div>
      <button class="manage-btn-login" type="button"
        @click="evtUserLogin">用户登陆</button>
       <!--<button class="manage-btn-register" type="button"
        @click="evtUserRegister">用户注册</button> -->
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: '',
      modelContent: '',
      showModel: false,
      clientwidth: document.documentElement.clientWidth,
      clientheight: document.documentElement.clientHeight,
      bgimgConfig: {
        width: '',
        height: '',
        left: '',
        top: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      errorMessage: 'errorMessage'
    })
  },
  methods: {
    ...mapActions(['userRegister', 'userLogin']),
    evtUserLogin () {
      var opts = {
        username: this.username,
        password: this.password
      }
      this.userLogin(opts)
    },
    evtUserRegister () {
      var opts = {
        username: this.username,
        password: this.password
      }
      this.userRegister(opts)
    },
    evtImgAdaptor () {
      this.toogleAdaptor()
      window.onresize = this.toogleAdaptor
    },
    toogleAdaptor () {
      let clientwidth = document.documentElement.clientWidth
      let clientheight = document.documentElement.clientHeight
      if (clientwidth > 1422) {
        this.bgimgConfig.width = clientwidth
      } else {
        this.bgimgConfig.left = (clientwidth - 1422) / 2
      }
      if (clientheight > 800) {
        this.bgimgConfig.height = clientheight
      } else {
        this.bgimgConfig.top = (clientheight - 800) / 2
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.evtImgAdaptor()
    })
  }
}
</script>

<style lang="postcss">
.manage-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #389daa;
}

.manage-form {
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
  .manage-home-logo {
    width: 100%;
    height: 84px;
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
  .manage-login-user {
    width: 100%;
    height: auto;
    .login-user-text {
      display: block;
      color: #ccc;
      margin-bottom: 10px;
    }
  }
  .manage-login-password {
    width: 100%;
    height: auto;
    .login-password-text {
      display: block;
      color: #ccc;
      margin-bottom: 10px;
    }
  }
  .manage-form-user, .manage-form-password {
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
  .manage-btn-login, .manage-btn-register {
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
