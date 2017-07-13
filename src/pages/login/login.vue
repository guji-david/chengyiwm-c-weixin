<template>
    <div class="reg-foot">
        <!--导航-->
        <NavHeader :headTitle="findPwdTitle"></NavHeader>
        <!--内容-->
        <ChatList :records="messageList"></ChatList>
        <LoginFoot></LoginFoot>
    </div>
</template>

<script>

    import ChatList from './loginBody.vue'
    import LoginFoot from './loginFoot.vue'
    import  NavHeader from '../../components/navHeader'
    import  ChatFootMsg from '../../components/ChatFootMsg'
    import {hex_md5} from '../../common/md5.js'
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    import * as CONFIG from '../../common/config'
    import { mapGetters, mapActions } from 'vuex'

    var  getConfig = CONFIG.fetchConfigObj()
    export default {
        name: 'app',
        components: {
            ChatList,
            NavHeader,
            LoginFoot,
            ChatFootMsg
        },
        data(){
            return{
                findPwdTitle: "登录",
                msg:'',
                messageList:[],
                tel:'18101302506',
                pwd:'9876543',
            }
        },
        created: function () {

        },
        activated: function () {
            //欢迎语言
            let list = [];
            UTIlS.saveLoginObj("loginList", list);
            var  _this = this;
            var  loginList = {
                type:1,
                content:getConfig.B_1
            }
            _this.$store.dispatch('loginList', {
                obj:loginList
            });
        },
        methods:{


        }
    }
</script>
<style >
    *{
        margin: 0;
        padding: 0;
    }
    html {
        height: 100%;
    }

    body {
        height: 100%;
    }
    .reg-foot{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;

    }
</style>
