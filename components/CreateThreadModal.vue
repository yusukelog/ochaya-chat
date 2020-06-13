<template>
  <v-card ref="form">
    <v-card-title>スレッドの作成</v-card-title>
    <v-card-text>
      <v-text-field
        ref="form.name.val"
        v-model="form.name.val"
        :label="form.name.label"
        :rules="[
          () => !!form.name.val || `${form.name.label}は必須入力項目です`
        ]"
        :error-messages="errorMessages"
        required
      />
      <v-btn
        depressed
        dark
        width="100%"
        color="amber darken-2"
        @click="onSubmit"
      >
        作成する
      </v-btn>
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
          label: 'スレッドタイトル名',
          val: null,
          errorMessage: null
        }
      },
      errorMessages: '',
      formHasErrors: false
    }
  },

  computed: {
    isForm() {
      return {
        'form.name.val': this.form.name.val
      }
    }
  },

  methods: {
    ...mapMutations('alert', ['setMessage']),

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
      // 認証チェック
      const user = this.$auth.currentUser
      if (!user) this.$router.push('/')

      // 入力値チェック
      this.formHasErrors = false
      Object.keys(this.isForm).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })

      if (this.formHasErrors) return false

      // 登録データを準備
      const params = {
        name: this.form.name.val,
        createdAt: this.$firebase.firestore.FieldValue.serverTimestamp()
      }

      try {
        await this.$firestore.collection('threads').add(params)
        this.$emit('closeModal')
      } catch (e) {
        this.setMessage({ message: '登録に失敗しました。' })
      }
    }
  }
}
</script>
