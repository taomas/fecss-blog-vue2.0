import modal from '../components/ModalDialog.vue'

export default (Vue, $root) => {
  Vue.set($root, 'MODAL', {
    show: false,
    title: '',
    content: '',
    cancel: () => {},
    confirm: () => {}
  })

  Vue.component('modal', modal)

  Vue.prototype.$Modal = {
    create (title, text, confirm, cancel) {
      console.log('create')
      $root.MODAL = {
        show: true,
        title: title,
        content: text,
        confirm: confirm,
        cancel: cancel
      }
    },
    clear () {
      $root.MODAL = {
        show: false,
        title: '',
        content: '',
        cancel: () => {},
        confirm: () => {}
      }
    }
  }
}
