<template>
    <div class="message">
        <NavHeader :headTitle="navTitle" ></NavHeader>
        <ul @click="system()" class="system-cell">
            <ul class="system-cell-left">
                <img class="system-img" src="../../assets/images/mine_system-icon.png">
                <div class="system-text">系统消息</div>
            </ul>
            <ul class="system-cell-right">
                <img class="right-image" src="../../assets/images/mine-push-icon.png">
            </ul>
        </ul>
        <ul @click="newMessage()" class="system-cell">
            <ul class="system-cell-left">
                <img class="system-img" src="../../assets/images/mine_news-icon.png">
                <div class="system-text">新的回复</div>
            </ul>
            <ul class="system-cell-right">
                <div  v-if="resExtra.comment" class="message-num" v-text="resExtra.comment.unreadCount"></div>
                <img class="right-image" src="../../assets/images/mine-push-icon.png">
            </ul>
        </ul>
    </div>
</template>

<script>
    import  NavHeader from '../../components/navHeader'
    import { MessageBox ,Indicator} from 'mint-ui';
    import { mapGetters, mapActions } from 'vuex'
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    export default{
        data(){
            return{
                navTitle:'我的消息',
                resExtra:{},
            }
        },
        components:{
            NavHeader
        },
        mounted(){
            //获取数据
            this.getMessageList();
        },
        methods: {
            getMessageList:function (){
                Indicator.open();
                API.$messageList(0,10, res=> {
                    Indicator.close();
                    UTIlS.log('我的消息列表',res);
                    var _this = this;
                  if (res.head.code == 0) {
                 _this.resExtra = res.body.extra;
                  }
                });
            },
            system:function () {//系统消息
                this.$router.push({name: 'mySystem'});
            } ,
            newMessage:function () {//新消息
                this.$router.push({name: 'myNewReply'});
            },

        }
    }
</script>
<style lang="less">
    .message{
        width: 100%;
        background-color: white;
        padding-top: 40px;
    }
    .message .system-cell{
        background-color: white;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
    }
    .message .system-cell .system-cell-left{
        width:50%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .message .system-cell .system-cell-left .system-img{
        width: 40px;
        height: 40px;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-left: 10px;

    }
    .message .system-cell .system-cell-left .system-text{
        font-size: 14px;
        color: #131313;
        margin-left: 10px;


    }
    .message .system-cell .system-cell-right{
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
    .message .system-cell .system-cell-right .right-image{
        width: 10px;
        height: 10px;
        margin-right: 15px;
    }
    .message .system-cell .system-cell-right   .message-num{
        margin-right: 15px;
        background-color: #F02626;
        color: white;
        font-size: 11px;
        height: 20px;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 10px;
        text-align: center;


    }
</style>