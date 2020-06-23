<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="ニックネーム"
      required
    ></v-text-field>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      登録
    </v-btn>
  </v-form>
</template>
