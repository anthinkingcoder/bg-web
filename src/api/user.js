import axios from 'axios'

export default {
  getDetail (cb) {
    axios.get('/api/user/detail', {}).then(response => {
      cb(response.data.data)
    }).catch(e => {
      cb(e)
    })
  }
}
