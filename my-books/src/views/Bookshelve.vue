<template>
  <div className="book-shelf">
    <button className="back-button">
      <router-link :to="{ path: '/' }">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </button>
    <h1 className="title">{{ bookshelf.title }}</h1>
    <div className="books">
      <div v-for="book in books" :key="book.id" className="book">
        <button className="img-book">
          <img
            v-if="book.volumeInfo.imageLinks"
            :src="book.volumeInfo.imageLinks.thumbnail"
            alt="book"
            width="100"
            @click="book.addOpen = !book.addOpen"
          />
          <div v-if="book.addOpen" class="add-book">
            <button className="button-add-book" @click="removeBook(book, bookshelf.id)">
              Remove
            </button>
            <button className="button-add-book" @click="moveBook(book, bookshelf.id, bookshelf.id === 0 ? 2 : bookshelf.id === 2 ? 3 : 0)">
              {{bookshelf.title === 'Favorites' ? 'To read' : bookshelf.title === 'To read' ? 'Reading Now' : 'Favourites'}}
            </button>
            <button className="button-add-book" @click="moveBook(book, bookshelf.id, bookshelf.id === 0 ? 3 : bookshelf.id === 2 ? 0 : 2)">
              {{bookshelf.title === 'Favorites' ? 'Reading Now' : bookshelf.title === 'To read' ? 'Favourites' : 'To read'}}
            </button>
          </div>
        </button>
        <p className="book-title">{{ book.volumeInfo.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  name: "Bookshelve",
  setup() {
    const store = useStore();
    const route = useRoute();
    const bookshelf = store.state.auth.user.bookshelves.find(
      (bookshelf) => bookshelf?.title === route.query.bookShelfTitle
    );

    const books = ref([]);

    const getBookShelves = async () => {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/mylibrary/bookshelves",
        {
          headers: {
            Authorization: `Bearer ${store.state.auth.access_token}`,
          },
        }
      );
      // console.log(response);
      return response.data;
    };

    const getVolumeInBookshelf = async (bookshelfId) => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookshelfId}/volumes`,
        {
          headers: {
            Authorization: `Bearer ${store.state.auth.access_token}`,
          },
        }
      );
      // console.log(response);
      books.value = response.data.items.map((book) => ({
        ...book,
        addOpen: false,
      }));
      // console.log(books);
      return response.data;
    };
    // console.log(bookshelf);

    async function addBook (book, bookshelfId) {
      try {
        const response = await axios.post(
          "https://www.googleapis.com/books/v1/mylibrary/bookshelves/" +
            bookshelfId +
            "/addVolume" +
            `?volumeId=${book.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${store.state.auth.access_token}`,
            },
          }
        );
        console.log('Se ha agregado el libro a la estantería');
      } catch (error) {
        console.error(error);
      }
    }

    async function removeBook (book, bookshelfId) {
      try {
        const response = await axios.post(
          "https://www.googleapis.com/books/v1/mylibrary/bookshelves/" +
            bookshelfId +
            "/removeVolume" +
            `?volumeId=${book.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${store.state.auth.access_token}`,
            },
          }
        );
        books.value = books.value.filter((b) => b.id !== book.id);
        console.log('Se ha eliminado el libro de la estantería');
      } catch (error) {
        console.error(error);
      }
    }
    async function moveBook (book, bookshelfId, toBookshelfId) {
      await removeBook(book, bookshelfId);
      await addBook(book, toBookshelfId);
    }

    (async () => {
      await getVolumeInBookshelf(bookshelf.id);
      await getBookShelves();
    })();

    return {
      bookshelf,
      books,
      addBook,
      removeBook,
      moveBook,
    };
  },
};
</script>

<style scoped>
.book-shelf {
  position: absolute;
  height: 80vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-left: 10vw;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.title {
  color: rgb(52, 49, 49);
  font-size: 50px;
}
.book {
  flex-basis: calc(33.33% - 20px);
  margin: 10px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}
.img-book {
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
}
.book-title {
  font-size: 15px;
  font-weight: bold;
  color: #3e4143;
  height: 10%;
}
.books {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* overflow-y: scroll; */
}

.add-book {
  position: absolute;
  background: white;
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.button-add-book {
  background-color: #3e4143;
  color: white;
  height: 20%;
  width: 80%;
  font-size: 10px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #3e4143;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  font-size: 16px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
