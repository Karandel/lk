<template>
  <v-progress-linear :indeterminate="true" v-if="serverCallInProgress"></v-progress-linear>
</template>

<script>
export default {
  name: 'ProgressBar',
  computed: {
    serverCallInProgress () {
      if (this.$store.state.serverCallState === 'loading') {
        return true
      }
      return false
    }
  }
}
</script>
