import '@/css/style.styl'
import * as $ from 'jquery'
import MemoManager from '@/js/MemoManager'
import ColorManager from '@/js/ColorManager'
import axios from 'axios'
import URLParams from '@/utils/URLParams'

declare let SERVICE_URL: string
axios.defaults.baseURL = SERVICE_URL
axios.defaults.withCredentials = true
axios.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.status === 403) {
    window.location.href = "http://github.com/login/oauth/authorize?client_id=f088e85d6b675b49cb30"
  }
  throw err
})
let urlParams = new URLParams(window.location)

axios.post(`/api/login/github/${urlParams['code']}`).then(() => {
  let cm = new ColorManager($('#color'))
  let mm = new MemoManager($('#memo'), cm)

  axios.get('api/memo/').then(res => {
    res.data.forEach((o: any) => {
      o.id = o.objectId
    })
    mm.push(res.data)
  })

  $('#new').on('click', async () => {
    let res = await axios.post('/api/memo/')
    mm.new(res.data.objectId)
  })

  mm.on('textchange', (e: any) => {
    axios.patch(`api/memo/${e.id}`, { text: e.text })
  })

  mm.on('colorchange', (e: any) => {
    axios.patch(`api/memo/${e.id}`, { color: e.color })
  })

  mm.on('positionchange', (e: any) => {
    axios.patch(`api/memo/${e.id}`, { position: e.position })
  })

  mm.on('remove', async (e: any) => {
    try {
      await axios.delete(`api/memo/${e.id}`)
      e.close(true)
    } catch {
      e.close(false)
    }
  })
})

