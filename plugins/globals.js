import Vue from 'vue'
import VueMarkdown from 'vue-markdown'
import Element from 'element-ui/lib/element-ui.common'
import locale from 'element-ui/lib/locale/lang/tr-TR'

Vue.use(Element, { locale })
Vue.component('vue-markdown', VueMarkdown)
