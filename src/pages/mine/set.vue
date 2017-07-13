<template>
    <div class="set-app">
        <NavHeader :headTitle="findPwdTitle" ></NavHeader>
        <div class="content">
            <!--<div class="avatar" >-->
                <!--<div class="avatar-bg-line">-->
                    <!--<div class="avatar-left">-->
                        <!--<img class="mine-image" src="../../assets/images/mine_thumb_icon.png"/>-->
                        <!--<div class="mine-name" >给我们好评</div>-->
                    <!--</div>-->
                    <!--<div class="avatar-right">-->
                        <!--<img class="avatar-right-image" src="../../assets/images/mine-push-icon.png">-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->

            <div @click="aboutWe()" class="avatar" >
                <div class="avatar-bg-line">
                <div  class="avatar-left">
                <img class="mine-image" src="../../assets/images/mine-about-we-icon.png"/>
                <div class="mine-name" >关于我们</div>
                </div>
                <div class="avatar-right">
                <img class="avatar-right-image" src="../../assets/images/mine-push-icon.png">
                </div>
                </div>
            </div>

            <div @click="contact()" class="avatar" >
                <div class="avatar-bg-line">
                <div class="avatar-left">
                <img class="mine-image" src="../../assets/images/mine-contact-icon.png"/>
                <div class="mine-name" >联系我们</div>
                </div>
                <div class="avatar-right">
                <img class="avatar-right-image" src="../../assets/images/mine-push-icon.png">
                </div>
                </div>
            </div>

            <button v-show="isShowLogout" @click="logout()" class="logout">安全退出</button>
        </div>
    </div>
</template>

<script>


    import  NavHeader from '../../components/navHeader'
    import { MessageBox } from 'mint-ui';
    import { mapGetters, mapActions } from 'vuex'
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    export default{
//        vuex: {
//            getters: {
//                userInfo
//            },
//            actions: {
//            }
//        },
        data(){
            return{
                findPwdTitle:'设置',
                iconList:[{icon:'../../assets/images/mine_thumb_icon.png',name:'给我们好评'},
                    {icon:'../../assets/images/mine-about-we-icon.png',name:'关于我们'},
                    {icon:'../../assets/images/mine-contact-icon.png',name:'联系我们'}],
                    isShowNav:true,
                     isLogin:false,
                isShowLogout:false,
            }

        },
        computed: mapGetters({
            userId: 'userId',
          isLogin: 'isLogin'
        }),
        components:{
            NavHeader
        },
        mounted(){
            //获取数据
//            if (UTIlS.getSkey()) {
//                this.isLogin = true
//            }
            this.getAppInfo();
        },
        created: function () {
//            if (UTIlS.getSkey()) {
//                this.isLogin = false
//            }
        },
        activated: function () {
            console.log('activated')
            //判断是否微信来源
//            var ua = navigator.userAgent.toLowerCase();
//            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
//                this.isShowNav = false;
//            }else{
//                this.isShowNav = true;
//            }

        },

        methods:{
             //  退出登录
            logout:function () {
                MessageBox.confirm('确定要退出登录吗?').then(action => {
                    var  _this = this;
                    _this.$store.dispatch('logout',{
                        userInfo:{userId:'',token:''}
                    });
                    API.$sigOut(UTIlS.getUserId(),res=>{
                  if(res.head.code == 0) {
                  //清空userId
                  UTIlS.clearUserData(function (){});

                   }
                });
                    this.$router.push({name: 'Mine'});

                });
            },
            contact:function () {


                    window.location.href = 'tel:' + "4006-222-500";
            },
            aboutWe:function () {
                this.$router.push({name: 'aboutWe'});
            },
            getAppInfo: function () {

                if (UTIlS.getSkey()) {
                    this.isShowLogout = true
                }
                API.$userUpdate(UTIlS.getUserId(), res=> {

                    if (res.head.code == 0) {
                        this.isShowLogout = true

                    }else  if (res.head.code==-10015||res.head.code==-10016){
                        this.isShowLogout = false
                    }else {

                    }
                });
        }
        }
    }
</script>
<style scoped lang="less">
    @import 'set.less';
</style>