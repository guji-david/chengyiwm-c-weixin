<template>
    <div class="my-post">
        <NavHeader :headTitle="navTitle" ></NavHeader>
        <ul v-if="list.length==0" class="null-content">
            <img class="null-content-img" src="../../assets/images/null-fan.png">
            <div class="null-content-text">快去小组下发表帖子吧~</div>
        </ul>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul v-for="item in list" >
            <PostCell :item="item"></PostCell>
        </ul>
</mt-loadmore>
    </div>
</template>
<script src="http://rapapi.org/rap.plugin.js?projectId=16288"></script>
<script>
    import Vue from 'vue'
    import  NavHeader from '../../components/navHeader'
    import { MessageBox ,Toast, Loadmore,Indicator} from 'mint-ui';
    import { mapGetters, mapActions } from 'vuex'
    import * as UTIlS from '../../common/utils'
    import * as API from '../../store/api.js'
    import PostCell from './myPostCell.vue'
    Vue.component(Loadmore.name, Loadmore);

    export default{
        data(){
            return{
                navTitle:'我的帖子',
                list:[],
                allLoaded:true,
                hasNext:false,
                start:0,
                offset:10,
            }
        },
        components:{
            NavHeader,
            PostCell
        },
        mounted(){
            //获取数据
            this.getPostList(this.start,this.offset);
        },
        methods: {
            getPostList: function (start,offset) {
                Indicator.open()
                API.$userArticleList(0,start ,offset, res=> {
                   UTIlS.log('我的帖子', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        Indicator.close()
                        _this.hasNext = res.body.hasNext;
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
             this.getPostList(this.start,this.offset);
            },
            loadBottom(id) {
                console.log('上拉刷新');
                this.allLoaded = false;
                if (this.hasNext) {
                    this.getPostList(this.start,this.offset);
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
<style  lang="less">
    body {
        background-color: white;
    }
.my-post{
    width: 100%;
    padding-top: 40px;
}
.my-post .null-content{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
.my-post .null-content .null-content-img{
    width: 160px;
    height: 85px;
    margin-top: 100px;
}
.my-post .null-content .null-content-text{
    font-size: 14px;
    color: #909090;
    margin-top: 20px;
}
</style>
