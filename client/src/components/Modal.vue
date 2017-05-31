<template>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      modelMessage: 'modelMessage',
      errorMessage: 'errorMessage'
    })
  },
  watch: {
    modelMessage(val) {
      console.log('message:', val)
    },
    errorMessage(val) {
      console.log('error', val)
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: absolute;
  left: 50%;
  top: 200px;
  width: 500px;
  height: 200px;
  margin-left: -250px;
  border-radius: 5px;
  background: #fff;
  .modal-title {
    font-size: 16px;
    text-align: center;
  }
  .modal-txt{
    padding: 30px;
    text-align: center;
  }
  .footer {
    display: flex;
    flex-flow: row;
    justify-content: center;
    .btn-cancel {
      width: 70px;
      height: 30px;
      border: 0;
      color: #fff;
      background: #eb7372;
      cursor: pointer;
    }
    .btn-confirm {
      width: 70px;
      height: 30px;
      margin-right: 10px;
      border: 0;
      color: #fff;
      background: #7bc585;
      cursor: pointer;
    }
  }
}

.slideIn-enter-active, .slideIn-leave-active {
  transition: all .3s ease-out;
  transform: scale(1);
}

.slideIn-enter, .slideIn-leave-active {
  transform: scale(0);
}

.slideIn-enter {
  transform: scale(0);
}

.slideIn-enter-active {
  transition: all .3s ease-out;
  transform: scale(1);
}
</style>
