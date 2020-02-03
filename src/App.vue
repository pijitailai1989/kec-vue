<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { hostUrl , themeColor } from '@/utils/fun'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  methods: {
      ...mapMutations('home',['setThemeColor']),
  },
  mounted() {
      hostUrl && this.setThemeColor( themeColor(hostUrl) ) 
  }
}
</script>
