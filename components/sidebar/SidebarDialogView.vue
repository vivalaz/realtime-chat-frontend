<template>
  <perfect-scrollbar>
    <DialogItem :avatar="tmpAvatar"/>
    <DialogItem/>
    <DialogItem :avatar="tmpAvatar"/>
    <DialogItem :avatar="tmpAvatar"/>
    <DialogItem :avatar="tmpAvatar"/>
    <DialogItem/>
    <DialogItem/>
    <DialogItem/>
    <DialogItem/>
    <DialogItem/>
    <DialogItem/>
    <DialogItem/>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import DialogItem from '~/components/sidebar/DialogItem'

export default {
  name: 'SidebarDialogView',
  components: {
    DialogItem,
    PerfectScrollbar
  },
  data () {
    return {
      tmpAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1hRAeN0O01QvaqoytXmojoOiSEzXf-Nxb3g&usqp=CAU'
    }
  }
}
</script>
