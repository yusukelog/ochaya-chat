<template>
  <div>
    <slot :user="user">{{ user.lastName }}</slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        lastName: 'ゆうすけ'
      }
    }
  }
}
</script>
