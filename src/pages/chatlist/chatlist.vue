<template>
    <div class="chat">
        <!--导航-->
        <NavHeader :headTitle="findPwdTitle"></NavHeader>
        <!--内容-->
        <ChatList :records="messageList"></ChatList>
        <ChatFootInput></ChatFootInput>
    </div>
</template>
<script>

    import ChatList from './ChatBody'
    import ChatFootInput from './ChatFootInput'
    import  NavHeader from './chatNav'
    import  ChatFootMsg from '../../components/ChatFootMsg'
    import * as CONFIG from '../../common/config'
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    var getConfig = CONFIG.fetchConfigObj()
    export default {
        name: 'app',
        components: {
            ChatList,
            NavHeader,
            ChatFootInput,
            ChatFootMsg
        },
        data(){
            return {
                findPwdTitle: "聊理财",
                msg: '',
                messageList: [],
                isShowNav: true
            }

        },
        mounted() {

        },
        created: function () {

        },
        activated: function () {
            console.log('activated')
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isShowNav = false;
            } else {
                this.isShowNav = true;
            }
            var _this = this;
            if (UTIlS.getUserId()) {
                _this.$store.dispatch('UserLogin', {
                    userInfo: {userId: UTIlS.getUserId(), token: UTIlS.getSkey()}
                });
            } else {
                _this.$store.dispatch('logout', {
                    userInfo: {userId: '', token: ''}
                });
            }

        },
        methods: {
            send(msg){
                this.msg = msg;
                console.log(this.msg)

            }
        }
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    html {
        height: 100%;
    }

    body {
        height: 100%;
    }

    .chat {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
    }
</style>
