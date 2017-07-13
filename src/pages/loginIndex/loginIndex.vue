<template>
    <div class="container">

        <div class="header">
            <button @click="preview()" class="preview">随便看看吧</button>

        </div>
        <div class="bottom">
            <img class="logo-image" src="../../assets/images/log.png">
            <div class="bottom-title">在意你在意的</div>
            <div class="bottom-btn">

                <button  @click="login()" class="bottom-login-btn">手机号登录</button>

                <button @click="reg()" class="bottom-reg-btn">注册</button>
            </div>
            <div @click="findPwd()" class="bottom-find-pwd">忘记密码</div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    import * as config from '../../common/config'
    export default{
        computed: mapGetters({
            userdata: 'userInfo'
        }),
        data(){
            return {}
        },
        methods: {
//            随便看看
            preview: function () {
                this.$router.push({name: 'Chatlist'});
            },
//登录
            login: function () {

                this.$store.dispatch('userEntryType',{
                    type:2001
                    });
                this.$router.push({name: 'login'});
            },
//            注册
            reg: function () {
                this.$router.push({name: 'regin'});
                this.$store.dispatch('userEntryType',{
                    type:2002
                });
            },
            findPwd:function () {
                this.$router.push({name: 'login'});
                this.$store.dispatch('userEntryType',{
                    type:2003
                });
            }
        },
        components: {},
        created: function () {
            console.log('created')
        },
        mounted: function () {
            console.log('mounted')
        },
        computed:function () {
            console.log('computed')
        },
        activated: function () {
            console.log('activated')
        },
        deactivated: function () {
            console.log('deactivated')
        }

    }
</script>

<style scoped lang="less">
    @import 'loginIndex.less';
</style>
