<template>
    <div class="home-content">
        <!--头部切换条-->
        <section class="home-nav">
            <ul class="group-option">
                <ul class="group-option-left"></ul>
                <ul class="group-option-mid">
                <div @click="selectItme(index)" v-for="(item,index) in dataNavlist" class="group-option-item"
                     :key="index">
                    <div class="group-option-item-text" :class="{'active': index===currentIndex}">{{item.name}}</div>
                </div>
                </ul>
                <ul @click="search()" class="group-option-right">
                    <img class="group-option-right-img" src="../../assets/images/home_search_icon.png">
                </ul>
            </ul>
        </section>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <!--feed-->
            <section v-show="currentIndex==0" class="recommend">
                <div class="home-banner">
                    <mt-swipe>
                        <mt-swipe-item v-for="item in bannerList"><img @click="bannerClick(item.targetUrl)" class="home-banner-img"
                                                                       :src="item.imageUrl"></mt-swipe-item>
                    </mt-swipe>
                </div>
                <Group></Group>
                <!--feed动态-->
                <section>
                    <ul v-for="item in  feedsList">
                        <postCell :item="item"  v-show="item.type==0"></postCell>
                        <topicCell  :item="item" v-show="item.type==1"></topicCell>
                    </ul>
                </section>
            </section>
            <!--关注-->
            <section  v-show="currentIndex==1" class="attention">
                <div v-if="!userMomentStatus" class="att-title">
                    <img class="attention-img" src="../../assets/images/financialPeople.png">
                    <div class="attention-text">理财达人</div>
                </div>
                <div v-if="userMomentStatus" class="att-title">
                    <img class="attention-img" src="../../assets/images/home_attention_icon.png">
                    <div class="attention-text">关注动态</div>
                </div>
                <!--用户推荐列表-->
                    <ul v-if="!userMomentStatus" @click="detail()" class="att-bc" v-for="item in userRecommendList">
                        <div class="att-left">
                            <img @click="userHome(item.id)" class="att-left-img" :src="item.avatar">
                            <div class="att-left-mid">
                                <div @click="userHome(item.id)" class="att-left-mid-top" v-text="item.nickname"></div>
                                <div @click="userHome(item.id)" class="att-left-mid-bom-text">
                                    <div class="att-left-mid-bom" v-text="item.articleCount+'篇帖子'"></div>
                                    <div class="att-left-right" v-text="item.collectionCount+'次收藏'"></div>
                                </div>
                            </div>

                        </div>
                        <div class="att-right">
                            <ul @click="attention(item.id,item.followStatus)" v-if="item.followStatus === 120 || item.followStatus === 122" class="attention-ac">
                                <div class="followed-left">+</div>
                                <div class="followed-right">关注</div>
                            </ul>
                            <div  v-else  @click="attention(item.id,item.followStatus)" class="attentioned-ac" >已关注</div>

                        </div>
                    </ul>
                <!--用户关注状态-->
                <ul v-if="userMomentStatus" v-for="item in  userMomentsList">
                    <postCell :item="item" v-show ="item.type==0"></postCell>
                <topicCell :item="item" v-show ="item.type==1" ></topicCell>
                </ul>
            </section>
        </mt-loadmore>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {hex_md5} from '../../common/md5.js'
    import * as API from '../../store/api.js'
    import  NavHeader from '../../components/navHeader'
    import {Swipe,Indicator, SwipeItem, MessageBox, Toast, Loadmore} from 'mint-ui';
    import  Group from  './group.vue'
    import  TopicCell from  '../../components/TopicCell.vue'
    import  PostCell from  '../../components/PostsCell.vue'
    import  AttentionCell from  '../../components/AttentionCell.vue'
    import {mapGetters, mapActions} from 'vuex'
    import * as UTIlS from '../../common/utils'

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    Vue.component(Loadmore.name, Loadmore);

    export default{

        computed: mapGetters({
            userdata: 'userInfo'
        }),
        data(){
            return {
                dataNavlist: [{name: '推荐'}, {name: '关注'}],
                currentIndex: 0,
                bannerList: [], //bannerlist
                feedsList: [],//feeds动态
                userMomentsList: [],//关注动态
                userRecommendList: [],//用户推荐列表 ;
                userMomentStatus: false,//判断是否有用户关注状态
                minTime: 0,//分页时上传的最小时间
                userMomentsMinttime:0,
                allLoaded:true,
                hasNext: false,
                userMomentsHasNext: false,
            }
        },
        components: {
            Group,
            TopicCell,
            PostCell,
            AttentionCell,

        },
        mounted(){
            //获取banner数据
            this.getBanner();

            //当前选择item
            this.selectItme(0);
        },
        methods: {
            //获取banner数据
            getBanner: function () {
                var _this = this;
                API.$getBanner(1, res=> {
                    UTIlS.log('获取Banner', res);
                    if (res.head.code == 0) {
                        _this.bannerList = res.body.list;
                    }
                });
            },
            //获取用户关注动态
            userMoments: function (fetchType,minTime) {
                var _this = this;
                API.$userMoments(fetchType, minTime, res=> {
                    if (res.head.code == 0) {


                        var delList = res.body.list;

                        _this.userMomentsHasNext = res.body.hasNext;//是否还有更多数据

                        if (_this.userMomentsHasNext){

                            _this.allLoaded = false;

                        }else {

                            _this.allLoaded = true;
                        }
                        //获取最下时间
                        for (let i = 0; i < delList.length; i++) {
                            if (!delList[i].hotFlag){
                                _this.userMomentsMinttime = delList[i].createTime;
                            }
                        }
                        for (let i = 0; i < delList.length; i++) {
                            var delObj = delList[i];
                            delObj.userMoments = true;
                            _this.userMomentsList.push(delObj)

                        }
                        UTIlS.log('获取用户关注动态', _this.userMomentsList);
                        //判断用户是否有关注状态
                        if (_this.userMomentsList.length > 0) {
                            _this.userMomentStatus = true;
                        } else {
                            _this.userMomentStatus = false;
                        }
                    }
                });
            },
            //获取推荐用户列表
            userRecommend: function () {
                var _this = this;
                API.$userRecommend(res=> {
                    UTIlS.log('获取用户推荐列表', res);
                    if (res.head.code == 0) {
                        _this.userRecommendList = res.body.list;
                    }
                });
            },
            selectItme: function (index) {

                this.currentIndex = index;
                if (index == 0) {//feed
                    //获取用户feed动态
                    this.userFeeds(0, Date.parse(new Date()));
                } else if (index == 1) {//userMent
                    //获取用户关注动态
                    this.userMoments(0,Date.parse(new Date()));
                    //获取推荐用户列表
                    this.userRecommend();

                } else {}
            },
            //Feed刷新
            loadTop(id){

                console.log('下拉刷新');
                this.feedsList = [];

                this.userMomentsList=[];

                if (this.currentIndex == 0) {

                    this.userFeeds(0, Date.parse(new Date()));
                }else {

                    this.userMoments(0,Date.parse(new Date()));
                }


               this.$refs.loadmore.onTopLoaded(id);

            },
            loadBottom(id) {

                console.log('上拉加载');

                this.allLoaded = false;

                if (this.currentIndex == 0) {
                    if (this.hasNext) {
                        var  _this = this;
                        _this.userFeeds(1, _this.minTime);

                    } else {
//                        Toast({
//                            message: '暂无更多数据',
//
//                            duration: 1000
//                        });
                    }

                }else {
                    if (this.userMomentsHasNext) {
                        var  _this = this;
                        _this.userMoments(1,_this.userMomentsMinttime);

                    } else {
//                        Toast({
//                            message: '暂无更多数据',
//                            duration: 1000
//                        });
                    }

                }
                this.$refs.loadmore.onBottomLoaded(id);
            },
            //获取用户feed动态
            userFeeds: function (fetchType, minTime) {

                var _this = this;
                API.$userFeeds(fetchType, minTime, res=> {
                    UTIlS.log('获取feed动态', res);
                    if (res.head.code == 0) {


                        var delList = res.body.list;

                        _this.hasNext = res.body.hasNext;//是否还有更多数据

                        if (_this.hasNext){

                            _this.allLoaded = false;

                        }else {

                            _this.allLoaded = true;
                        }
                        //获取最下时间
                        var  delTimeList =[];

                        for (let i = 0; i < delList.length; i++) {

                            if (!delList[i].hotFlag){//获取hotFlag为fause的时间数组

                                var  delTime = delList[i].createTime;

                                var normalTime=UTIlS.postNormalTime(delTime);

                                var minitTime =(new Date(normalTime)).getTime();  //时间的毫秒数

                                delTimeList.push(minitTime)

                            }
                        }
                        if (delTimeList.length==0){
                            _this.minTime = 0;
                        }else {
                            var minTime =  Math.min.apply(Math, delTimeList) //从数组里面获取最小时间

//                            alert(delTimeList)
//                        alert(Math.min.apply(null, delTimeList));//最小值

                            _this.minTime = minTime;
                        }


                        for (let i = 0; i < delList.length; i++) {

                            var delObj = delList[i];

                            delObj.userMoments = false;

                            _this.feedsList.push(delObj)
                        }
                    }
                });
            },
            //发布详情
            bannerClick: function (targetUrl) {

//                var CryptoJS = require("crypto-js");
//                alert(CryptoJS.HmacSHA1("chengyi", "zaiyi*13579"))

                if (targetUrl=="zaiyi://chat"){//聊理财

                this.$router.push({name: 'chatlist'});

                }else if (targetUrl.indexOf('topic') >= 0){ //话题

                    var topicId = targetUrl.split("=");

                    this.$router.push({name: 'topicDetail',params:{'id':topicId[1],'fromType':0}});

                }else if (targetUrl.indexOf('article') >=0 ){//帖子

                   var article = targetUrl.split("=");

                    this.$router.push({name: 'postDetail',params:{'id':article[1],'fromType':0}});

                } else if (targetUrl.indexOf('group') >=0 ){//小组

                    var groupId = targetUrl.split("=");

                    this.$router.push({name: 'groupDetail', params: {'groupId': groupId[1]}});

                } else if (targetUrl.indexOf('webview') >=0 ){ //webview

                    var webId = targetUrl.split("=");
                    window.location.href =  webId[1];
                }else {

                }
            },
            //关注用户
            attention:function(id,followStatus){
                if (!UTIlS.getSkey()){
                    this.$router.push({name: 'loginA'});
                    return;
                }
                API.$userFollow(id, res=> {
                    console.log('小组关注成功' + JSON.stringify(res));
                    var  _this = this;
                    if (res.head.code==0){
                        _this.userRecommend();
                        Toast({
                            message:UTIlS.attentionStatus(followStatus),
                            duration: 1000
                        });
                    }else  if (res.head.code==-10016||res.head.code==-10015){
                        UTIlS.clearUserData(function (){});
                        this.$router.push({name: 'loginA'});
                        return;
                    }else {

                    }
                })
            },
            //用户详情
            detail:function () {

            },
            //搜索
            search:function () {
//                this.$store.dispatch('storageQuery', {query:'1'});
                UTIlS.setQuery('')
                this.$router.push({name: 'search'});
            },
            userHome:function (id) {//让人主页
                if (id == UTIlS.getUserId()){

                    this.$router.push({name: 'myHome',params:{'id':id}});

                }else {
                    this.$router.push({name: 'othersHome',params:{'id':id}});
                }
            },
        }
    }
</script>
<style scoped lang="less">
    @import 'home.less';
</style>


