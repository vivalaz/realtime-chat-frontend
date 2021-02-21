import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    sm: 992,
    lg: Infinity
  },
  defaultBreakpoint: 'lg'
})
