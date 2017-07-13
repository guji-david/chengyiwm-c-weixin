<template>
    <div class="my-attention">
        <NavHeader :headTitle="navTitle" ></NavHeader>

        <ul v-if="list.length==0" class="null-content">
            <img class="null-content-img" src="../../assets/images/null-attention.png">
            <div class="null-content-text">快去关注一些朋友吧~</div>
        </ul>

        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore">
            <ul v-for="item in list" class="cell">
   <div @click="userHome(item.id)" class="cell-left">
       <img class="cell-img" :src="item.avatar">
       <ul class="cell-mid">
           <div class="cell-mid-title" v-text="item.nickname"></div>
           <div class="cell-mid-des" v-text="item.slogan"></div>
       </ul>
   </div>
                <div class="cell-right">
                <ul @click="userFollow(item.id,item.followStatus)" v-if="item.followStatus === 120 || item.followStatus === 122" class="attention-ac">
                    <div class="followed-left">+</div>
                    <div class="followed-right">关注</div>
                </ul>
                <div  v-if ="item.followStatus === 123"  @click="userFollow(item.id,item.followStatus)" class="attentioned-ac" >互相关注</div>
                    <div v-if="item.followStatus === 121 "  @click="userFollow(item.id,item.followStatus)" class="attentioned-ac" >已关注</div>
                </div>
            </ul>
            </mt-loadmore>
    </div>
</template>
<script>
    import Vue from 'vue'
    import  NavHeader from '../../components/navHeader'
    import { MessageBox ,Toast, Loadmore} from 'mint-ui';
    import { mapGetters, mapActions } from 'vuex'
    import * as UTIlS from '../../common/utils'
    import * as API from '../../store/api.js'
    Vue.component(Loadmore.name, Loadmore);
    export default{
        data(){
            return{
                navTitle:'我的关注',
                list:[],
                start:0,
                offset:10,
                hasNext:false,
                allLoaded:true,
            }
        },
        components:{
            NavHeader
        },
        mounted(){
            //获取数据
            this.getList(this.start,this.offset);
        },
        methods: {
            getList:function (start,offset) {
                API.$userFollowList(UTIlS.getUserId(), start, offset, res=> {
                    UTIlS.log('我的关注列表', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        _this.hasNext = res.body.hasNext;
                        _this.start += _this.offset;
                        if (_this.hasNext) {
                            _this.allLoaded = false;
                        } else {
                            _this.allLoaded = true;
                        }
                        var delList = res.body.list;
                        for (let i = 0; i < delList.length; i++) {
                            let obj = delList[i];
                            _this.list.push(obj)
                        }
                    }
                });
            },
            loadTop(id){
                console.log('下拉刷新');
                this.$refs.loadmore.onTopLoaded(id);
                this.list =[];
                this.start =0;
                this.getList(this.start,this.offset);
            },
            loadBottom(id) {
                console.log('上拉刷新');
                this.allLoaded = false;
                if (this.hasNext) {
                    this.getList(this.start,this.offset);
                } else {
                    Toast({
                        message: '暂无更多数据',

                        duration: 1000
                    });
                }
                this.$refs.loadmore.onBottomLoaded(id);
            },


            userFollow:function (id,followStatus) {
                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                    return;
                }
                API.$userFollow(id, res=> {
                    UTIlS.log('用户关注注成功', res);
                    if (res.head.code == 0) {
                        this.list = [],
                                this.start = 0,
                        this.getList(this.start,this.offset);
                        Toast({
                            message:UTIlS.attentionStatus(followStatus),
                            duration: 1000
                        });
                    } else if (res.head.code == -10015 ||res.head.code == -10016) {
                        this.$router.push({name: 'loginA'});
                        return;
                    } else {
                        Toast({
                            message: res.head.msg,

                            duration: 1000
                        });
                    }
                })
            },
            userHome:function (id) {
                if (id == UTIlS.getUserId()){

                    this.$router.push({name: 'myHome',params:{'id':id}});

                }else {
                    this.$router.push({name: 'othersHome',params:{'id':id}});
                }
            },
        }
    }
</script>
<style  lang="less">
    @import 'myAttention.less';
.my-attention{
    width: 100%;
}
    .my-attention .null-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
    .my-attention .null-content .null-content-img{
        width: 143px;
        height:113px;
        margin-top: 100px;
    }
    .my-attention .null-content .null-content-text{
        font-size: 14px;
        color: #909090;
        margin-top: 20px;
    }

</style>