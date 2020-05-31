<template>
  <navigationLink v-slot="{ user }">
    {{ user.lastName }}
  </navigationLink>
</template>
<script>
import navigationLink from '~/components/navigationLink'
export default {
  components: {
    navigationLink
  }
}
</script>
