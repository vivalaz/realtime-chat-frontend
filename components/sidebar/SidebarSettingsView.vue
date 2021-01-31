<template>
  <perfect-scrollbar>
    <div class="profile-editing">
      <header>
        <div class="top-heading">
          <div class="avatar">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1hRAeN0O01QvaqoytXmojoOiSEzXf-Nxb3g&usqp=CAU"
              :alt="userName"
            >
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#313e4c"
            fill-opacity="1"
            d="M0,224L48,218.7C96,213,192,203,288,192C384,181,480,171,576,186.7C672,203,768,245,864,261.3C960,277,1056,267,1152,250.7C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </header>

      <main>
        <UserData />
      </main>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import UserData from '~/components/user/UserData'

export default {
  name: 'SidebarSettingsView',
  components: {
    UserData,
    PerfectScrollbar
  }
}
</script>

<style scoped lang="scss">

$avatar-size: 80px;

.profile-editing {
  header {
    position: relative;
    padding-bottom: 45px;
    background-color: #fff;

    .top-heading {
      position: relative;
      padding: 15px 15px 0 15px;
      z-index: 1;

      .avatar {
        margin: 0 auto;
        width: $avatar-size;
        height: $avatar-size;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;

        img {
          max-width: $avatar-size;
        }
      }
    }

    svg {
      position: absolute;
      bottom: 0;
      transform: translateY(4px);
      z-index: 0;
    }
  }

  main {
    padding: 15px;
  }
}

</style>
