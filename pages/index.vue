<template>
  <div class="text-center">
    <v-row>
      <v-col cols="12">
        <div>
          <div class="headline">まったりトーク</div>
          <div class="display-1">
            <span class="m-plus font-weight-bold">おちゃ屋チャット</span>
          </div>
          <v-img
            :src="image_src"
            alt="おちゃ屋チャット"
            max-width="120px"
            class="mx-auto my-5"
          />
        </div>
        <v-btn
          class="ma-2"
          style="text-transform: none"
          color="amber darken-2 font-weight-bold"
          large
          dark
          @click="doLgoin"
        >
          Twitterでログインする
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      image_src: require('~/assets/images/illustrain10-nomimono10.png')
    }
  },
  created() {
    this.readData()
  },
  methods: {
    async readData() {
      const db = firebase.firestore()
      const res = await db.doc('users/test').get()
      console.log(res.data().name)
    },
    // ログイン処理
    doLgoin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut()
    }
  }
}
</script>
