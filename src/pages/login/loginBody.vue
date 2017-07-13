
<template>
    <div class="reg-body">
        <mt-loadmore  bottomLoadingText="加载更多" bottomDropText="释放加载" :bottom-method="loadBottom"  >
            <template v-for="(item,index) in chatDataList" track-by="$index">
                <template >
                    <other-msg v-if="item.type==1" :msg="item.content"  ></other-msg>
                    <!--<imageMsg v-if="item.type==3" :msg="item.content" ></imageMsg>-->
                    <self-msg v-if="item.type==2" :msg="item.content" ></self-msg>

                </template>
            </template>
        </mt-loadmore>
    </div>

</template>
<script>
    //    import util from '../common/utils'
    //    import {Toast} from 'mint-ui'
    import OtherMsg from '../../components/OtherMsg'
    import SelfMsg from '../../components/SelfMsg'
    import ImageMsg from '../../components/ImageMsg.vue'
    import { mapGetters, mapActions } from 'vuex'
    export default {

//        props: ["records"],
        computed: mapGetters({
            chatDataList:'loginList'
        }),
        data() {
            return {
                topStatus: '',
            }
        },
        components:{
            OtherMsg,
            SelfMsg,
            ImageMsg
        },
        methods: {
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop() {
                console.log('下拉刷新');
            },
            loadBottom(){
                console.log('上拉加载');
            },
            allLoaded(){
                console.log('上拉加载完成');
            },
            allLoaded(){

            }

        },
        ready(){
            console.log(0)
            this.$el.scrollIntoView()
        },
        created: function () {
            console.log(1)

        },
        mounted: function () {
            console.log(2)
        },
        activated: function () {
            console.log(3)

        },
        deactivated: function () {
            console.log(4)

        },
        update:function () {
            console.log(5)

        }
    }
</script>

<style lang="less">
    /*@import 'ChatBody.less';*/
    .reg-body {
        overflow-y: scroll;
        margin-top: 1px;
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        background-color:  #f6f6f6;
        height: ~'calc(100% - 80px)';

    }

</style>

