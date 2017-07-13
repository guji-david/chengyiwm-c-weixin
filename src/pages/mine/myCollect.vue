<template>
    <div class="collect">
        <NavHeader :headTitle="navTitle" ></NavHeader>
        <ul v-if="list.length==0" class="null-content">
            <img class="null-content-img" src="../../assets/images/null-collect.png">
            <div class="null-content-text">把喜欢的话题收藏起来以后慢慢查看吧~</div>
        </ul>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul v-for="item in list">
            <PostCell v-if ="item.type == 0" :item="item"></PostCell>
        <TopicCell v-else :item="item"></TopicCell>
        </ul>
            </mt-loadmore>
    </div>
</template>
<style>
.collect{
    padding-top: 40px;
}
.collect .null-content{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
.collect .null-content .null-content-img{
    width: 150px;
    height: 110px;
    margin-top: 100px;
}
.collect .null-content .null-content-text{
    font-size: 14px;
    color: #909090;
    margin-top: 20px;
}
</style>
<script>
    import Vue from 'vue'
    import  NavHeader from '../../components/navHeader'
    import {MessageBox , Toast, Loadmore,Indicator} from 'mint-ui';
    import { mapGetters, mapActions } from 'vuex'
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    import TopicCell from './myTopicCell.vue'
    import PostCell from './myPostCell.vue'
    Vue.component(Loadmore.name, Loadmore);
    export default{
        data(){
            return{
                navTitle:'我的收藏',
                list:[],
                allLoaded:true,
                hasNext:false,
                start:0,
                offset:10,
            }
        },
        components:{
            NavHeader,TopicCell,PostCell
        },
        mounted(){
            //获取数据
         this.getUserCollection(this.start,this.offset);
        },
        methods: {
            getUserCollection: function (start,offset) {
                Indicator.open();
                API.$userCollectionList(start,offset, res=> {
                    UTIlS.log('我的收藏',res);
                    var _this = this;
                    if (res.head.code == 0) {
                        Indicator.close()
                        _this.hasNext = res.body.hasNext;//是否还有更多数据
                        _this.start  +=_this.offset;
                        if (_this.hasNext){
                            _this.allLoaded = false;
                        }else {
                            _this.allLoaded = true;
                        }
                        var  delList = res.body.list;
                        for (let  i = 0 ;i < delList.length ; i++){
                            let  obj = delList[i];
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
                this.getUserCollection(this.start,this.offset);
            },
            loadBottom(id) {
                console.log('上拉刷新');
                this.allLoaded = false;
                if (this.hasNext) {
                    this.getUserCollection(this.start,this.offset);
                } else {
//                    Toast({
//                        message: '暂无更多数据',
//
//                        duration: 1000
//                    });
                }
                this.$refs.loadmore.onBottomLoaded(id);
            },
        }
    }
</script>
