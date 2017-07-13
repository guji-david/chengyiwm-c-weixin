<template>
    <div class="chat-body">
        <mt-loadmore>
            <template v-for="(item,index) in chatDataList" track-by="$index">
                <template>
                    <other-msg v-if="item.type==1" :msg="item.content"></other-msg>
                    <imageMsg v-if="item.type==2" :msg="item.imageUrl"></imageMsg>
                    <self-msg v-if="item.type==3" :msg="item.content"></self-msg>
                </template>
            </template>
            <div style="height:80px;">&nbsp;</div>
        </mt-loadmore>
        <div id="bottomTip">&nbsp;</div>
    </div>

</template>
<script>
    import OtherMsg from '../../components/OtherMsg'
    import SelfMsg from '../../components/SelfMsg'
    import ImageMsg from '../../components/ImageMsg.vue'
    import {mapGetters, mapActions} from 'vuex'
    export default {

        computed: mapGetters({
            chatDataList: 'chatlist',

        }),
        data() {
            return {
                topStatus: '',
                listlength: 0,
            }
        },


        components: {
            OtherMsg,
            SelfMsg,
            ImageMsg
        },
        methods: {},
        ready(){
            console.log(0)
            this.$el.scrollIntoView()
        },
        created: function () {
            console.log(1)

        },
        mounted: function () {
            console.log(2)
            console.log(this.chatDataList)
        },
        activated: function () {
            console.log(3)
            console.log(this.chatDataList)

        },
        deactivated: function () {
            console.log(4)

        },
        update: function () {
            console.log(5)
            console.log(this.chatDataList)

        },
        watch: {

            chatDataList(newVal, oldVal){

                document.getElementById("bottomTip").scrollIntoView(true);
                this.$el.scrollIntoView()
            }
        }
    }
</script>

<style lang="less">
    /*@import 'ChatBody.less';*/
    .chat-body {
        overflow-y: scroll;
        margin-top: 1px;
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        background-color: #f6f6f6;
        height: ~ 'calc(100% - 40px)';

    }

</style>

