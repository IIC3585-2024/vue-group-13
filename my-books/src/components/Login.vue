<template>
  <div className="login">
    <div className="login-left">
      <p className="login-title">Bienvenido a MyBooks</p>
      <img
        src="https://okdiario.com/img/2022/11/22/libros-4.jpg"
        alt="Google"
        width="90%"
        height="80%"
      />
    </div>
    <div className="login-right">
      <img
        src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        alt="Google"
        width="20%"
        height="5%"
      />
      <button @click="signInWithGoogle" className="login-button">
        Iniciar Sesión
      </button>
    </div>
  </div>
</template>

<script>
import { decodeCredential, googleSdkLoaded } from "vue3-google-login";
import { useStore } from "vuex";
import axios from "axios";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const signInWithGoogle = () => {
      googleSdkLoaded((google) => {
        google.accounts.oauth2
          .initCodeClient({
            scope: "email profile openid https://www.googleapis.com/auth/books",
            client_id:
              process.env.CLIENT_ID,
            redirect_uri: process.env.REDIRECT_URI,
            callback: (response) => {
              // console.log("response", response);
              if (response.code) fetchUserDataFrom(response.code);
            },
          })
          .requestCode();
      });
    };
    const fetchUserDataFrom = async (code) => {
      const { data } = await axios.post("https://oauth2.googleapis.com/token", {
        code: code,
        client_id:
          process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      });

      if (data) {
        const accessToken = data.access_token;
        // console.log("data", data);

        const userData = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const booksshelves = await axios.get(
          "https://www.googleapis.com/books/v1/mylibrary/bookshelves",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const shelves = ["Favorites", "To read", "Reading now"];
        // console.log("Bookshelves:", booksshelves.data.items);
        const bookshelves = booksshelves.data.items
          .filter((item) => shelves.includes(item.title))
          .map((item) => {
            // console.log("Item:", item.title);
            return {
              id: item.id,
              title: item.title,
              volumeCount: item.volumeCount,
            };
          });

        // console.log("Bookshelves:", bookshelves);

        const user = {
          name: userData.data.name,
          email: userData.data.email,
          picture: userData.data.picture,
          id: userData.data.id,
          bookshelves: bookshelves,
        };

        // console.log("Bookshelves:", bookshelves);

        store.commit("logIn", { user, access_token: accessToken });

        // console.log("User Data:", userData.data);
        // console.log("Access Token:", accessToken);
      }
    };

    return { signInWithGoogle };
  },
};
</script>

<style scoped>
.login {
  position: absolute;
  height: 80vh;
  width: 80vw;
  display: flex;
  flex-direction: row;
  background-color: white;
  margin-left: 10vw;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.login-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
}

.login-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
}

.login-title {
  font-size: 1em;
  font-weight: bold;
  color: #1b3cb5;
}

.login-button {
  background-color: #1b3cb5;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  font-size: 16px;
  padding: 0 20px;
  margin-top: 20px;
}
</style>
