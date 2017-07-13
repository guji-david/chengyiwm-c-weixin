<template>
  <div id="app">
    <FooterView  v-show="footerShow"></FooterView>
    <keep-alive>
      <transition name="slide-down">
        <router-view transition="cover"></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
  import FooterView from './components/FootTab.vue'
  import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'app',
  components:{
    FooterView,
   },
  data(){
    return {
      loading: true
    }
  },
  computed: mapGetters({
    footerShow:'footerShow'
  }),
  mounted(){
    var path=this.$route.path.substring(1);
    this.headerChange(path);
    this.footerChange(path);
  },
  watch:{
    $route(to){
      var path=to.path.substring(1);
      this.headerChange(path);
      this.footerChange(path);
    }
  },
  methods:{
    headerChange(path){
      if(path=='home' || path=='mine' || path ==''){
        this.$store.dispatch('showFooter')
      }else{
        this.$store.dispatch('hideFooter')
      }
    },
    footerChange(path){
//      if(path.indexOf('article')==-1){
//        this.$store.dispatch('showFooter');
//      }else{
//        this.$store.dispatch('hideFooter');
//      }
    }

  }

}
</script>

<style>
html,body{
  height: 100%;
  background-color: #FFFFFF;
}
#app{
  height: 100%;
}
@import './assets/css/global.less';
</style>
