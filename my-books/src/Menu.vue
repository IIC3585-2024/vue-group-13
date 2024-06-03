<template>
  <Login v-if="!store.state.auth.isLoggedIn" />
  <div
    className="menu"
    v-if="store.state.auth.isLoggedIn"
    :style="{
      transform: `translateY(${translateScreen}vh)`,
      transition: 'transform 0.3s ease-out',
    }"
  >
    <div className="options-container">
      <div className="user-info">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Google"
          width="50"
          height="50"
        />
        <p>Bienvenido, {{ store.state.auth.user.name }}</p>
      </div>
      <button @click="store.commit('logOut')" className="logout-button">
        Cerrar Sesión
      </button>
    </div>
    <div className="menu-container">
      <div className="menu-item">
        <div className="item-image">
          <img
            src="https://okdiario.com/img/2022/11/22/libros-4.jpg"
            alt="Google"
            width="100%"
            height="100%"
          />
        </div>
        <router-link
          :to="{ path: '/bookshelves', query: { bookShelfTitle: 'Reading now' } }"
        >
          <button className="item-button">Reading now</button>
        </router-link>
      </div>
      <div className="menu-item">
        <div className="item-image">
          <img
            src="https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1492202663/articles/2014/02/13/what-should-be-your-favorite-books/140213-favorite-books-lytal-tease_ae2s36"
            alt="Google"
            width="100%"
            height="100%"
          />
        </div>
        <router-link
          :to="{ path: '/bookshelves', query: { bookShelfTitle: 'Favorites' } }"
        >
          <button className="item-button">Favorites</button>
        </router-link>
        <!-- <button @click="" className="item-button">

          My Books
        </button> -->
      </div>
      <div className="menu-item">
        <div className="item-image">
          <img
            src="https://www.lanacion.com.ar/resizer/v2/credito-QS3KNYFVIFHPJLNBGX45PZCZSM.jpg?auth=50f38491ae3193337eeec020a127bcabf02e8cf5fade7ed15dd8923181e7d2a1&width=420&height=280&quality=70&smart=true"
            alt="Google"
            width="100%"
            height="100%"
          />
        </div>
        <router-link
          :to="{ path: '/bookshelves', query: { bookShelfTitle: 'To read' } }"
        >
          <button className="item-button">To read</button>
        </router-link>
      </div>
      <i class="fas fa-arrow-down down-arrow" @click="downClick"></i>
      <i class="fas fa-arrow-up up-arrow" @click="upClick" v-if="show"></i>
      <BookFinder v-if="show" class="book-finder" />
    </div>
  </div>
</template>

<script>
import BookFinder from "./components/BookFinder.vue";
import Login from "./components/Login.vue";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  name: "Menu",
  components: {
    Login,
    BookFinder,
  },
  setup() {
    const store = useStore();
    const show = ref(false);
    const translateScreen = ref(0);
    const translateMargin = ref(0);

    const downClick = () => {
      show.value = !show.value;
      translateScreen.value = show.value ? -100 : 0;
      translateMargin.value = show.value ? 100 : 0;
    };

    const upClick = () => {
      show.value = !show.value;
      translateScreen.value = show.value ? -100 : 0;
      translateMargin.value = show.value ? 100 : 0;
    };

    return {
      store,
      show,
      translateScreen,
      translateMargin,
      downClick,
      upClick,
    };
  },
  // Your component's properties, methods, etc. go here
};
</script>

<style scoped>
.menu {
  position: absolute;
  height: 80vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-left: 10vw;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  transition: height 1s ease-in-out;
}

.menu-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 80%;
  width: 100%;
  margin-top: 5%;
}

.menu-item {
  font-size: 20px;
  font-weight: bold;
  flex-basis: 27%;
  height: 70%;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
  background-color: white;
  color: black;
  position: relative;
}

.down-arrow {
  position: absolute;
  bottom: -10%;
  color: black;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.up-arrow {
  position: absolute;
  top: 115%;
  color: black;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 2s;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
}

.book-finder {
  position: absolute;
  top: 100%;
}

.item-image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
}

.item-button {
  background-color: rgb(48, 48, 48);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  height: 10%;
  font-size: 16px;
  padding: 0 20px;
  right: 25%;
  left: 26%;
  width: 50%;
  bottom: 5%;
  position: absolute;
  font-weight: bold;
}

.logout-button {
  background-color: rgb(179, 85, 85);
  color: white;
  border: none;
  border-radius: 6px;
  height: 30%;
  font-size: 15px;
  padding: 0 10px;
  font-weight: bold;
  margin-right: 3%;
}

.options-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 25%;
}

.user-info {
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding: 0 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 50%;
  margin-left: 3%;
  justify-content: space-evenly;
}
</style>
