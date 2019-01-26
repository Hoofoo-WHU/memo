import '@/css/style.styl'

import toast from '@/components/toast'

toast('这是一条消息')
setTimeout(() => {
  toast.error('失败了')
  setTimeout(() => {
    toast.success('成功了')
    setTimeout(() => {
      toast.warn('警告警告')
    }, 500)
  }, 500)
}, 500)