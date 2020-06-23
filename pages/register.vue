<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-card flat>
        <v-card-title>ユーザ名登録</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="onRegist" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="ユーザ名"
              required
            ></v-text-field>
            <v-btn
              depressed
              :disabled="!valid"
              color="amber darken-2"
              dark
              @click="onRegist"
            >
              登録
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || '必須項目です',
        (v) => (v && v.length <= 10) || '10字以内で入力してください'
      ]
    }
  }
}
</script>
