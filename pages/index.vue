<template>
  <v-row justify="center" class="text-center">
    <v-col cols="12" md="8">
      <div>
        <div class="headline">とくめいチャット</div>
        <div class="display-1">
          <span class="m-plus font-weight-bold">おちゃ屋トーク</span>
        </div>
        <v-img
          :src="image_src"
          alt="おちゃ屋チャット"
          max-width="110px"
          class="mx-auto my-5"
        />
      </div>
      <v-btn
        depressed
        class="ma-2"
        style="text-transform: none"
        color="amber darken-2 font-weight-bold"
        large
        dark
        @click="doLgoin"
      >
        Googleでログインする
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['checkLogin'],
  data() {
    return {
      image_src: require('~/assets/images/illustrain10-nomimono10.png')
    }
  },
  methods: {
    // ログイン処理
    doLgoin() {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$fireAuth.signInWithRedirect(provider)
    }
  }
}
</script>
