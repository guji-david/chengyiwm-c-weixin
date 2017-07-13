<template>
    <div class="gru-mem-list">
        <NavHeader :headTitle="navTitle"></NavHeader>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul @click.stop="otherDetail(item.id)" v-for="item in groupMemList">
            <div class="attention-content">
                <ul class="att-bc">
                    <div class="att-left">
                        <img class="att-left-img" :src="item.avatar">
                        <div class="att-left-mid">
                            <div class="att-left-mid-top" v-text="item.nickname"></div>
                            <div class="att-left-mid-bom-text">
                                <div class="att-left-mid-bom" v-text="item.articleCount+'篇帖子'"></div>
                                <div class="att-left-right" v-text="item.collectionCount+'次收藏'"></div>
                            </div>
                        </div>

                    </div>
                    <div class="att-right">
                        <ul @click.stop="userFollow(item.id,item.followStatus)" v-if="item.followStatus === 120 || item.followStatus === 122" class="attention-ac">
                            <div class="followed-left">+</div>
                            <div class="followed-right">关注</div>
                        </ul>
                        <div  v-if="item.followStatus === 121" @click.stop="userFollow(item.id,item.followStatus)" class="attentioned-ac" >已关注</div>
                        <div  v-if="item.followStatus === 123 " @click.stop="userFollow(item.id,item.followStatus)" class="attentioned-ac" >互相关注</div>
                    </div>
                </ul>
            </div>
        </ul>
            </mt-loadmore>
    </div>
</template>
<script>
    import Vue from 'vue'
    import  NavHeader from '../../../components/navHeader'
    import  AttentionCell from  '../../../components/AttentionCell'
    import * as API from '../../../store/api.js'
    import { MessageBox ,Toast, Loadmore,Indicator} from 'mint-ui';
    import * as UTIlS from '../../../common/utils'
    Vue.component(Loadmore.name, Loadmore);
    export default{
        props: ['memberList'],
        data(){
            return {
                navTitle: '小组成员',
                groupMemList: [],
                start:0,
                offset:10,
                hasNext:false,
                allLoaded:true,
            }
        },
        mounted(){
            this.getGroupList(this.$route.params.id,this.start,this.offset);
        },
        components: {
            AttentionCell,
            NavHeader
        },
        methods: {
            //获取小组列表
            getGroupList: function (groupId,start,offset) {
                API.$groupMemberList(groupId, start, offset, res=> {
                    UTIlS.log('获取小组成员列表', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        _this.hasNext = res.body.hasNext;
                        if (_this.hasNext) {
                            _this.allLoaded = false;
                        } else {
                            _this.allLoaded = true;
                        }
                        var delList = res.body.list;
                        for (let i = 0; i < delList.length; i++) {
                            let obj = delList[i];
                            _this.groupMemList.push(obj)
                        }
                    }
                })
            },
            otherDetail:function (id) {
                if (id == UTIlS.getUserId()){

                    this.$router.push({name: 'myHome',params:{'id':id}});

                }else {

                    this.$router.push({name: 'othersHome',params:{'id':id}});
                }
            },
            userFollow: function (id,followStatus) {
                if (!UTIlS.getSkey()){
                    this.$router.push({name: 'loginA'});
                    return;
                }
                Indicator.open()
                API.$userFollow(id, res=> {
                    UTIlS.log('用户关注注成功', res);
                    if (res.head.code == 0) {
                        Indicator.close()
                        this.groupMemList =[];
                        this.start = 0;
                        this.getGroupList(this.$route.params.id,this.start,this.offset);
                        Toast({
                            message:UTIlS.attentionStatus(followStatus),
                            duration: 1000
                        });
                    }else if (res.head.code==-10015||res.head.code==-10016){ 
                        this.$router.push({name: 'loginA'});
                        return;
                        UTIlS.clearUserData(function (){});
                    }else {
                        Toast({
                            message: res.head.msg,
                            duration: 1000
                        });
                    }
                })
            },
            loadTop(id){
                console.log('下拉刷新');
                this.start=0;
                this.groupMemList =[];
                this.$refs.loadmore.onTopLoaded(id);
                this.getGroupList(this.$route.params.id,this.start,this.offset);
            },
            loadBottom(id) {
                console.log('上拉刷新');
                this.allLoaded = false;
                this.start += 10;
                if (this.hasNext) {
                    this.getGroupList(this.$route.params.id,this.start,this.offset);
                } else {
                    Toast({
                        message: '暂无更多数据',

                        duration: 1000
                    });
                }
                this.$refs.loadmore.onBottomLoaded(id);
            }
        }
    }
</script>
<style scoped>
    .gru-mem-list {
        width: 100%;
        background-color: white;
     padding-top: 40px;

    }
    .gru-mem-list .att-bc {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 60px;
        border-bottom: 1px solid #eeeeee;

    }

    .gru-mem-list .att-bc .att-left {
        width: 90%;
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .gru-mem-list .att-bc .att-left .att-left-img {
        width: 40px;
        height: 40px;
        background-color: #9b9b9b;
        border-radius: 20px;
        margin-left: 10px;
        align-self: center;
        overflow: hidden;
    }

    .gru-mem-list .att-bc .att-left .att-left-mid {

        display: flex;
        width: 80%;
        height: 80%;
        flex-direction: column;
        justify-content: space-around;

    }

    .gru-mem-list .att-bc .att-left .att-left-mid .att-left-mid-top {
        font-size: 15px;
        color: #131313;
        margin-left: 15px;
        height: 40%;
        font-size: 15px;
        color: #131313;
        margin-left: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    .gru-mem-list .att-bc .att-left .att-left-mid .att-left-mid-bom-text {
        margin-left: 15px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        align-items: center;

    }

    .gru-mem-list .att-bc .att-left .att-left-mid .att-left-mid-bom-text .att-left-mid-bom {
        font-size: 15px;
        color: #131313;
        margin-left: 0px;
        height: 30%;
        font-size: 12px;
        color: #909090;

    }

    .gru-mem-list .att-bc .att-left .att-left-mid .att-left-mid-bom-text .att-left-right {
        font-size: 12px;
        color: #909090;
        margin-left: 15px;
        align-self: center;

    }

    .gru-mem-list .att-bc .att-right {
        width: 40%;
        height: 60px;
    }

    .gru-mem-list .att-bc .att-right .attention-ac{
        margin-top: 15px;
        margin-right: 8px;
        float: right;
        width: 56px;
        height: 24px;
        border: 1px solid #d2a056;
        color: #d2a056;
        border-radius: 3px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        font-size: 11px;
        align-items: center;
    }
    .gru-mem-list .att-bc .att-right .attention-ac .followed-left{
        margin-left: 5px;
    }
    .gru-mem-list .att-bc .att-right .attention-ac .followed-right{

        margin-right: 5px;
    }
    .gru-mem-list .att-bc .att-right  .attentioned-ac{
        margin-top: 15px;
        font-size: 11px;
        height: 24px;
        width: 56px;
        margin-right: 8px;
        float: right;
        color: #a1a1a1;
        border-radius: 3px;
        background-color: #eeeeee;
        text-align: center;
        align-self: center;
        padding-top: 3px;
    }


</style>