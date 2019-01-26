import '@/css/style.styl'

import toast, { Type } from '@/components/toast'

toast('123123')
toast.error('321321', 20000)
window['toast'] = toast