<template>
  <v-app dark>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-app-bar app class="light-green darken-1 white--text" flat>
      <h1 class="title font-weight-bold">
        <span class="m-plus">おちゃ屋チャット</span>
      </h1>
      <v-spacer />
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped right fixed>
      <v-list dense>
        <v-list-item @click.stop="">
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>スレッドの作成</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      drawer: null
    }
  }
}
</script>
