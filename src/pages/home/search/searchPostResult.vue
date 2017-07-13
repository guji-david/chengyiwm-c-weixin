<template>
    <div class="search-post" >
        <NavHeader :headTitle="navTitle"></NavHeader>
        <div class="search-result" v-text="'含有'+ qurey + '的帖子'"></div>

        <!--<Empty :img="img" :title="title"></Empty>-->

        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul v-for="item in list">
            <searchCell v-if="item.type==0" :item="item"></searchCell>
        </ul>
            </mt-loadmore>
    </div>
</template>
<script>
    import  searchCell from './searchCell.vue'
    import Vue from 'vue'
    import  NavHeader from '../../../components/navHeader'
    import  AttentionCell from  '../../../components/AttentionCell'
    import * as API from '../../../store/api.js'
    import { MessageBox ,Toast, Loadmore} from 'mint-ui';
    import * as UTIlS from '../../../common/utils'
    import Empty from '../../../components/EmptyPage.vue'
    Vue.component(Loadmore.name, Loadmore);
    export default{
        data(){
            return{
            list:[],
                navTitle:'搜索结果',
                start:0,
                qurey:'',
                offset:10,
                hasNext:false,
                allLoaded:true,
                img:'../../../assets/images/search_icon.png',
                title:''
            }
        },
        components:{
            searchCell,
            NavHeader,
            Empty
        },
        mounted(){

          this.getArticleSearch(this.$route.params.query,this.start,this.offset);

            this.qurey = this.$route.params.query;
        },
        methods: {
            //获取小组列表
            getArticleSearch: function (query,start,offset) {
                API.$articleSearch(query, start, offset, res=> {
                    UTIlS.log('获取小组成员列表', res);
                    console.log('个数'+res.body.list.length);
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
                })
            },
            userFollow: function (id) {
                if (!UTIlS.getSkey()){
                    this.$router.push({name: 'loginA'});
                    return;
                }
                API.$userFollow(id, res=> {
                    UTIlS.log('用户关注注成功', res);
                    if (res.head.code == 0) {
                        this.getArticleSearch(this.$route.params.query,this.start);
                    }else if (res.head.code==-10015){
                        this.$router.push({name: 'loginA'});
                        return;
                    }else {  }
                })
            },
            loadTop(id){
                console.log('下拉刷新');
                this.start=0;
                this.list =[];
                this.$refs.loadmore.onTopLoaded(id);
                this.getArticleSearch(this.$route.params.query,this.start,this.offset);
            },
            loadBottom(id) {
                console.log('上拉刷新');
                this.allLoaded = false;
                if (this.hasNext) {
                    this.getArticleSearch(this.$route.params.query,this.start,this.offset);
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
<style lang="less">
    .search-post{
        width: 100%;
        margin-top: 40px;
        z-index: 100;
        left: 0;
        top: 40px;
    }
    .search-post .search-result{

        margin-top: 0;
        font-size: 12px;
        color: #909090;
        height: 25px;
        width: 100%;
        background-color: #F6F6F6;
        padding-left: 10px;
        padding-top: 6px;
    }
</style>