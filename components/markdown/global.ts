import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

import Example from './Example.vue'
import Alert from './Alert.vue'
import Live from './Live.vue'
import CodeBlock from './CodeBlock.vue'
import OptionLink from './OptionLink.vue'

// Use vue composition api in the components
Vue.use(VueCompositionAPI)
Vue.component('md-example', Example)
Vue.component('md-alert', Alert)
Vue.component('md-live', Live)
Vue.component('md-code-block', CodeBlock)
Vue.component('md-option', OptionLink)
