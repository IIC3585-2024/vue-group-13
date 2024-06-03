<template>
  <div className="book-finder">
    <div className="finder-container">
      <input
        type="text"
        v-model="name"
        className="input-book-finder"
        placeholder="Busca un libro"
      />
      <button @click="searchBooks(name)" className="button-book-finder">
        Search
      </button>
    </div>

    <div className="books-catalog">
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
            <button className="button-add-book" @click="addBook(book, 0)">
              Favourites
            </button>
            <button className="button-add-book" @click="addBook(book, 2)">
              To read
            </button>
            <button className="button-add-book" @click="addBook(book, 3)">
              Reading Now
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

export default {
  name: "BookFinder",
  data() {
    return {
      books: [],
      addOpen: false,
    };
  },
  methods: {
    async searchBooks(name) {
      const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes" +
          `?q=${name.split(" ").join("+")}`
      );
      const data = await response.json();
      this.books = data.items.map((book) => ({
        ...book,
        addOpen: false,
      }));
      // console.log(this.books);
    },
    async addBook(book, bookshelfId) {
      try {
        const token = this.$store.state.auth.access_token;
        // console.log(token);
        const response = await axios.post(
          "https://www.googleapis.com/books/v1/mylibrary/bookshelves/" +
            bookshelfId +
            "/addVolume" +
            `?volumeId=${book.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        book.addOpen = false;
        console.log('Se ha agregado el libro a la estantería');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.input-book-finder {
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  background-color: #5c5c5c;
  margin-left: 5%;
  border: 0;
  /* border: 2px solid #ccc; */
  border-radius: 10px;
}
.input-book-finder:focus {
  outline: none;
}
.button-book-finder {
  background-color: #5085ad;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  font-size: 16px;
  padding: 0 20px;
  margin-left: 10px;
}
.book-finder {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 90vw;
  margin-top: 20vh;
  height: 80vh;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.finder-container {
  display: flex;
  align-items: center;
  margin-top: 5%;
  width: 100%;
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
.books-catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-y: scroll;
}
.book-title {
  font-size: 15px;
  font-weight: bold;
  color: #3e4143;
  height: 10%;
}
.img-book {
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
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
</style>
