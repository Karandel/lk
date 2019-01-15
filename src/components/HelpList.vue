<template>
  <v-container>

  </v-container>
</template>

<script>

export default {
  created () {
    this.$store.commit('setMainNavbarState', {title: 'Справка'})
  },
  name: 'HelpList'
}
</script>
