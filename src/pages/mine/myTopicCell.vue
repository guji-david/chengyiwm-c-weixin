<template>
    <div class="my-topic-cell">
        <ul  class="cell" @click.stop="postDetail(item.delFlag)">
            <div class="cell-top" v-text="item.title"></div>
            <div class="cell-mid" v-text="item.brief"></div>
            <div class="cell-bom">
                <ul class="cell-bom-left">
                    <div v-if="item.group" class="group-name" v-text="item.group.name"></div>
                    <div class="time" v-text="delTime(item.createTime)"></div>
                </ul>
                <ul class="cell-bom-right">
                </ul>
            </div>
        </ul>
    </div>
</template>
<script>
    import  NavHeader from '../../components/navHeader'
    import {Swipe, SwipeItem, MessageBox, Toast, Loadmore} from 'mint-ui';
    import {mapGetters, mapActions} from 'vuex'
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    export default{
        props: ['item'],
        data(){
            return {
            }
        },
        components: {
            NavHeader
        },
        methods:{
            delTime:function (time) {
                var postTime = UTIlS.normalTime(time);
                return  postTime;
            },
            postDetail:function (delFlag) {
                if (delFlag){
                    Toast({
                        message: '该帖子已被删除',

                        duration: 1000
                    });
                }else {
                this.$router.push({name: 'topicDetail',params:{'id':this.item.id,'fromType':0}});
                }
            },
//
        }
    }
</script>
<style lang="less">
    .my-topic-cell {
        width: 100%;

    .cell {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background-color: white;
        border-bottom: 1px solid #eeeeee;

    .cell-top {
        margin-top: 15px;
        font-size: 16px;
        color: #d2a056;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin-left: 10px;
        margin-right: 10px;
    }

    .cell-mid {
        font-size: 12px;
        color: #909090;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 6px;
    }

    .cell-bom {
        margin-bottom: 10px;
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

    .cell-bom-left {
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

    .group-name {
        margin-left: 10px;
        background-color: #E2E2E2;
        font-size: 9px;
        color: #131313;
        padding: 0.3px 2px;
    }

    .time {
        font-size: 10px;
        color: #909090;
        margin-left: 13px;

    }

    }
    .cell-bom-right {
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    }
    }
    }
</style>