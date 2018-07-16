import moment from 'moment'
import Vue from 'vue'
function register () {
  Vue.filter('fromNow', function (date) {
    let nows = moment(date).fromNow()
    date = moment(date).format('YYYY-MM-DD HH:mm');
    if (/几秒前|内/.test(nows)) {
      return '刚刚'
    }
    if (/[0-9]*(?=\s天前)/.test(nows)) {
      let t = /[0-9]*(?=\s天前)/.exec(nows)[0]
      if (t > 10) {
        return date
      }
    }
    if (/[0-9]*(?=\s月前)/.test(nows)) {
      let t = parseInt(/[0-9]*(?=\s月前)/.exec(nows)[0])
      if (t > 1) {
        return date
      }
    }
    if (/[0-9]*(?=\s年前)/.test(nows)) {
      return date
    }
    return nows.replace(/\s/g,'')
  })
}

export default {
  register: register
}
