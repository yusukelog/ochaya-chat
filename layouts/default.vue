<template>
  <v-app dark>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-app-bar app flat class="light-green darken-1 white--text">
      <v-btn icon color="white" active-class="no-active" to="/top">
        <div class="text-center">
          <v-icon>mdi-format-list-bulleted-square</v-icon>
          <h5>スレ一覧</h5>
        </div>
      </v-btn>
      <v-spacer />
      <v-toolbar-title>
        <span class="subtitle-2 font-weight-bold m-plus">おちゃ屋チャット</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon color="white" @click.stop="drawer = !drawer">
        <div class="text-center">
          <v-icon>mdi-cog</v-icon>
          <h5>設定</h5>
        </div>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app right>
      <v-list dense>
        <v-list-item @click.stop="openModal">
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

    <v-dialog v-model="dialog" max-width="290">
      <CreateThreadModal></CreateThreadModal>
    </v-dialog>
  </v-app>
</template>

<script>
import CreateThreadModal from '~/components/CreateThreadModal'

export default {
  components: {
    CreateThreadModal
  },

  data() {
    return {
      // footer固定しない
      fixed: false,
      // ドロワー
      drawer: false,
      dialog: false
    }
  },

  methods: {
    openModal() {
      this.dialog = true
      // ドロワーを閉じる
      this.drawer = false
    },
    closeModal() {
      this.isCreateMode = false
    }
  }
}
</script>

<style scoped>
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>
