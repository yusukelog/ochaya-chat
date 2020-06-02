<template>
  <v-card>
    <v-card-title>スレッドの作成</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit">
        <v-text-field v-model="form.name.val" label="スレッドタイトル名" />
        <span v-show="form.name.errorMessage">
          {{ form.name.errorMessage }}
        </span>
        <v-btn type="submit" depressed dark width="100%" color="amber darken-2">
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
      return this.form.name.errorMessage
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

    async onSubmit() {
      console.log('test')
      // 認証チェック
      const user = this.$auth.currentUser
      if (!user) this.$router.push('/login')

      // 入力値チェック
      this.validateName()
      if (this.isValidateError) return

      // 登録データを準備
      const params = {
        name: this.form.name.val,
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
