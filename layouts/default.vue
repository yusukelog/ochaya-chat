<template>
  <v-app dark>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-app-bar app flat class="light-green darken-1 white--text">
      <v-btn icon color="white" active-class="no-active" to="/top">
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title>
        <span class="subtitle-2 font-weight-bold m-plus">おちゃ屋チャット</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon color="white" @click.stop="drawer = !drawer">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app right>
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
      drawer: false
    }
  }
}
</script>

<style scoped>
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>
