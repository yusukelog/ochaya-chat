<template>
  <v-card>
    <v-card-title>スレッドの作成</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit">
        <v-text-field v-model="form.name.val" label="タイトル名" />
        <span v-show="form.name.errorMessage">
          {{ form.name.errorMessage }}
        </span>
        <v-btn depressed dark width="100%" color="amber darken-2">
          作成する
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      form: {
        name: {
          label: '名前',
          val: null,
          errorMessage: null
        }
      }
    }
  },

  computed: {
    isValidateError() {
      return this.form.name.errorMessage || this.form.imageUrl.errorMessage
    },

    maxLength() {
      return 35
    }
  },

  methods: {
    ...mapMutations('alert', ['setMessage']),

    selectImage() {
      this.$refs.image.click()
    },

    onFileSelect(e) {
      const files = e.target.files
      if (files.length === 0) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])

      reader.addEventListener('load', () => {
        this.upload({
          localImageFile: files[0]
        })
      })
    },

    // 画像アップロード処理
    async upload({ localImageFile }) {
      const user = await this.$auth()

      // 未ログインの場合
      if (!user) this.$router.push('/login')

      // ストレージオブジェクト作成
      const storageRef = this.$fireStorage.ref()

      // ファイルのパスを設定
      const imageRef = storageRef.child(
        `images/${user.uid}/rooms/${localImageFile.name}`
      )

      // ファイルを適用してファイルアップロード開始
      const snapShot = await imageRef.put(localImageFile)
      this.form.imageUrl.val = await snapShot.ref.getDownloadURL()

      this.validateImageUrl()
    },

    validateName() {
      const { name } = this.form

      if (!name.val) {
        name.errorMessage = `${name.label}は必須入力項目です`
        return
      }

      if (name.val.length > this.maxLength) {
        name.errorMessage = `${name.label}は${this.maxLength}文字以内です。`
        return
      }

      name.errorMessage = null
    },

    validateImageUrl() {
      const { imageUrl } = this.form

      if (!imageUrl.val) {
        imageUrl.errorMessage = `${imageUrl.label}は必須入力項目です`
        return
      }

      imageUrl.errorMessage = null
    },

    async onSubmit() {
      // 認証チェック
      const user = this.$auth.currentUser
      if (!user) this.$router.push('/login')

      // 入力値チェック
      this.validateName()
      this.validateImageUrl()
      if (this.isValidateError) return

      // 登録データを準備
      const params = {
        name: this.form.name.val,
        topImageUrl: this.form.imageUrl.val,
        createdAt: this.$firebase.firestore.FieldValue.serverTimestamp()
      }

      try {
        await this.$firestore.collection('rooms').add(params)
        this.$emit('closeModal')
      } catch (e) {
        this.setMessage({ message: '登録に失敗しました。' })
      }
    }
  }
}
</script>
