export default ({ app }, inject) => {
  inject('webNotification', {
    requestPermission: () => {
      if (!window.Notification) {
        console.info('Браузер не поддерживает оповещения!')

        return false
      }

      if (window.Notification.permission === 'granted') {
        return true
      }

      return window.Notification.requestPermission()
    },
    notify: (title, body) => {
      if (!window.Notification) {
        console.info('Браузер не поддерживает оповещения!')
      }

      if (window.Notification.permission === 'granted') {
        return new window.Notification(title, {
          body,
          tag: 'new-message'
        })
      }
    }
  })
}
