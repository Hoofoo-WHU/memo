import '@/css/style.styl'
import * as $ from 'jquery'
import MemoManager from '@/js/MemoManager'
import ColorManager from '@/js/ColorManager'
import UserManager from '@/js/UserManager'
import axios from 'axios'
import URLParams from '@/utils/URLParams'
import toast from '@/components/toast'


declare let SERVICE_URL: string
axios.defaults.baseURL = SERVICE_URL
axios.defaults.withCredentials = true
axios.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response && (err.response.status === 403 || err.response.status === 401)) {
    toast('正在跳转至GitHub登录...')
    window.location.href = `http://github.com/login/oauth/authorize?client_id=f088e85d6b675b49cb30&redirect_uri=${window.location.href.replace(/\?.*/, '')}`
  } else if (err.response && err.response.status === 400) {
    toast.error('错误的请求！')
  } else {
    toast.error('连接服务器失败，请刷新后再试！')
  }
  throw err
})
let urlParams = new URLParams(window.location)

axios.post(`/api/login/github/${urlParams['code']}`).then((res) => {
  $('body>header').addClass('active')
  toast.success('登录成功，Memo不保留登录状态，关闭页面即注销！', 3000)
  let um = new UserManager($('#user'), res.data.avatar, res.data.name)
  let cm = new ColorManager($('#color'))
  let mm = new MemoManager($('#memo'), cm)
  axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`

  axios.get('api/memo/').then(res => {
    res.data.forEach((o: any) => {
      o.id = o.objectId
    })
    mm.push(res.data)
  })

  $('#new').on('click', async () => {
    try {
      let res = await axios.post('/api/memo/')
      mm.new(res.data.objectId)
      toast.success('新建便签成功！')
    } catch {
      toast.error('新建便签失败！')
    }
  })

  mm.on('textchange', async (e: any) => {
    await axios.patch(`api/memo/${e.id}`, { text: e.text })
    toast.success('更新便签成功！')
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

