<template>
  <div class="sidebar">
    <perfect-scrollbar>
      <DialogItem :avatar="tmpAvatar"/>
      <DialogItem/>
      <DialogItem :avatar="tmpAvatar" active/>
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

    <footer class="sidebar-footer">
      <div>Настройки</div>
    </footer>
  </div>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import DialogItem from '~/components/sidebar/DialogItem'

export default {
  name: 'Sidebar',
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

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>

<style scoped lang="scss">

$sidebar-footer-height: 45px;

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  min-width: 320px;
  height: 100%;
  background-color: #313e4c;
  overflow: hidden;

  .ps {
    height: calc(100% - #{$sidebar-footer-height});
  }

  &-footer {
    position: relative;
    height: $sidebar-footer-height;
    width: 100%;
    background-color: #3e5162;
    box-shadow: 0 0 27px 1px rgba(34, 45, 56, 1);

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #fff;
      font-weight: 300;
      font-size: 14px;
      cursor: pointer;
      transition: background .35s ease;

      &:hover {
        background: #578ec9;
      }
    }
  }
}

</style>
