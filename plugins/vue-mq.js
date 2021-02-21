import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    sm: 992,
    md: 768,
    lg: Infinity
  },
  defaultBreakpoint: 'lg'
})
