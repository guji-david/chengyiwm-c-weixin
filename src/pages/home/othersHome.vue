<template>
    <div class="other-home">
        <div class="head">
            <ul class="head-top">
                <img @click="goBack()" class="back_arrow" src="../../assets/images/nav_back_icon.png">
                <ul @click="userFollow(otherDetail.id,otherDetail.followStatus)" class="attention-ac"
                    v-if="otherDetail.followStatus === 120 || otherDetail.followStatus === 122">
                    <div class="followed-left">+</div>
                    <div class="followed-right">关注</div>
                </ul>
                <div v-if="otherDetail.followStatus === 121" @click="userFollow(otherDetail.id,otherDetail.followStatus)" class="attentioned-ac">
                    已关注
                </div>
                <div v-if="otherDetail.followStatus === 123" @click="userFollow(otherDetail.id,otherDetail.followStatus)" class="attentioned-ac">
                    互相关注
                </div>
            </ul>
            <ul class="head-mid">
                <img class="head-mid-img" :src="otherDetail.avatar">
                <div class="head-mid-name" v-text="otherDetail.nickname"></div>
                <div class="head-mid-des" v-text="otherDetail.slogan"></div>
            </ul>
            <ul class="head-btom">
                <div @click="itemClick(item.id)" class="head-btom-left" v-for="(item,index) in dataSelect" key="index">
                    <div v-if="index==0" class="head-btom-left-num" v-text="otherDetail.articleCount"></div>
                    <div v-if="index==1" class="head-btom-left-num" v-text="otherDetail.followCount"></div>
                    <div v-if="index==2" class="head-btom-left-num" v-text="otherDetail.fanCount"></div>
                    <div class="head-btom-left-text" v-text="item.name"></div>
                </div>
            </ul>
            <ul class="btom-sel-arrow">
                <div class="btom-sel-bc">
                    <img v-if="selectIndex==0" class="btom-sel-arrow-img" src="../../assets/images/select_arrow.png">
                </div>
                <div class="btom-sel-bc">
                    <img v-if="selectIndex==1" class="btom-sel-arrow-img" src="../../assets/images/select_arrow.png">
                </div>
                <div class="btom-sel-bc">
                    <img v-if="selectIndex==2" class="btom-sel-arrow-img" src="../../assets/images/select_arrow.png">
                </div>
            </ul>
        </div>
        <!--发表队列-->
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <section v-if="selectIndex==0" class="btom">
                <ul v-if="otherArticleList.length ==0" class="follow-null">
                    <img class="null-content-img" src="../../assets/images/null-system.png">
                    <div class="null-content-text">他还没没有发过帖子~</div>
                </ul>

                <ul @click="publishDetail(item.id,item.type)" v-for="item in otherArticleList" class="cell">
                    <div  class="cell-top">
                        <div class="cell-top-left">
                            <img v-if="item.author" class="cell-top-left-img" :src="item.author.avatar">
                            <div v-if="item.author" class="cell-top-left-num" v-text="item.author.nickname"></div>
                        </div>
                        <div class="cell-top-right" v-text="delTime(item.createTime)">2017-01-30</div>
                    </div>
                    <div class="cell-mid">
                        <div class="cell-mid-title" v-text="item.title"></div>
                        <div class="cell-mid-des" v-text="item.brief"></div>
                    </div>
                    <div class="cell-btom">
                        <div class="group-name-bc">
                        <div v-if="item.group" class="group-name" v-text="item.group.name"></div>
                        </div>
                        <ul class="cell-bom-right">
                            <img class="conment-img" src="../../assets/images/home_comment_icon.png">
                            <div class="conment-num" v-text="item.commentCount">12</div>
                        </ul>
                    </div>
                </ul>
            </section>
            <!--关注队列-->
            <section v-if="selectIndex==1" class="follow">
                <ul v-if="otherFollowList.length ==0" class="follow-null">
                    <img class="null-content-img" src="../../assets/images/null-attention.png">
                    <div class="null-content-text">还没有消息,去其他地方看看吧!</div>
                </ul>
                <ul @click.stop="userHome(item.id)" v-for="item in otherFollowList" class="cell">
                    <div class="cell-left">
                        <img class="cell-left-img" :src="item.avatar">
                        <div class="cell-left-mid">
                            <div class="top" v-text="item.nickname"></div>
                            <div class="btom">
                                <div class="post-num" v-text="'帖子'+' ' + item.articleCount"></div>
                                <div class="fans-num" v-text="'粉丝'+' ' + item.fanCount"></div>
                            </div>
                        </div>
                    </div>
                    <div class="cell-right">
                        <ul @click.stop="userFollow(item.id,item.followStatus)" class="cell-right-ac"
                            v-if="item.followStatus === 120 || item.followStatus === 122">
                            <div class="followed-left">+</div>
                            <div class="followed-right">关注</div>
                        </ul>
                        <div v-if="item.followStatus === 121" @click.stop="userFollow(item.id,item.followStatus)"
                             class="cell-right-attentioned-ac">已关注
                        </div>
                        <div v-if="item.followStatus === 123" @click.stop="userFollow(item.id,item.followStatus)"
                             class="cell-right-attentioned-ac">互相关注
                        </div>
                    </div>
                </ul>
            </section>
            <!--粉丝队列-->
            <section v-if="selectIndex==2" class="follow">
                <ul v-if="otherFanList.length ==0" class="follow-null">
                    <img class="null-content-img" src="../../assets/images/null-system.png">
                    <div class="null-content-text">还没去其他用户关注过他~</div>
                </ul>
                <ul @click.stop="userHome(item.id)" v-for="item in otherFanList" class="cell">
                    <div class="cell-left">
                        <img class="cell-left-img" :src="item.avatar">
                        <div class="cell-left-mid">
                            <div class="top" v-text="item.nickname"></div>
                            <div class="btom">
                                <div class="post-num" v-text="'帖子'+' ' + item.articleCount"></div>
                                <div class="fans-num" v-text="'粉丝'+' ' + item.fanCount"></div>
                            </div>
                        </div>

                    </div>
                    <div class="cell-right">
                        <ul @click.stop="fanFollow(item.id,item.followStatus)" class="cell-right-ac"
                            v-if="item.followStatus === 120 || item.followStatus === 122">
                            <div class="followed-left">+</div>
                            <div class="followed-right">关注</div>
                        </ul>
                        <div v-if="item.followStatus === 121" @click.stop="fanFollow(item.id,item.followStatus)"
                             class="cell-right-attentioned-ac">已关注
                        </div>
                        <div v-if="item.followStatus === 123" @click.stop="fanFollow(item.id,item.followStatus)"
                             class="cell-right-attentioned-ac">互相关注
                        </div>
                    </div>
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
    import {Swipe, SwipeItem, MessageBox, Toast, Loadmore,Indicator} from 'mint-ui';
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
        data(){
            return {
                data: [{}, {}, {}],
                dataSelect: [{name: '发表', num: 123, id: 0}, {name: '关注', num: 23, id: 1}, {
                    name: '粉丝',
                    num: 1238,
                    id: 2
                }],
                selectIndex: 0,
                otherDetail: '',
                start: 0,
                offset: 10,
                otherArticleList: [],
                otherFollowList: [],
                otherFanList: [],
                allLoaded: true,
                articleListHasNext: false,
                followListHasNext: false,
                fanListListHasNext: false,
            }
        },
        components: {},
        mounted(){
            //获取他人资料数据
            this.getUserOtherDetail(this.$route.params.id);
            this.itemClick(0);
        },
        methods: {
            goBack: function () {
                this.$router.go(-1);
            },
            itemClick: function (id) {
                this.selectIndex = id;
                if (id == 0) {//发表
                    this.otherArticleList = [];
                    this.getOtherArticleList(this.start, this.offset)
                } else if (id == 1) {//关注
                    this.otherFollowList = [];
                    this.getOtherFollowList(this.start, this.offset);
                } else if (id == 2) {//粉丝
                    this.otherFanList = [];
                    this.getOtherFanList(this.start, this.offset);
                } else {
                }
            },
            //时间
            delTime: function (time) {
                var postTime = UTIlS.normalTime(time);
                return postTime;
            },
            //用户详情
            getUserOtherDetail: function (id) {
                API.$userOtherDetail(id, res=> {
                    UTIlS.log('他人资料数据', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        _this.otherDetail = res.body;
                    }
                });
            },
            //关注用户
            userFollow: function (id,followStatus) {
                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                    return;
                }
                Indicator.open();
                API.$userFollow(id, res=> {
                    UTIlS.log('用户关注注成功', res);
                    if (res.head.code == 0) {
                        Indicator.close();
                        this.start = 0;
                        this.otherFollowList = [];
                        this.getOtherFollowList(this.start, this.offset);
                        this.getUserOtherDetail(this.$route.params.id);
                        Toast({
                            message:UTIlS.attentionStatus(followStatus),
                            duration: 1000
                        });
                    } else if (res.head.code == -10015||res.head.code == -10016) {
                        UTIlS.clearUserData(function (){});
                        this.$router.push({name: 'loginA'});
                        return;
                    } else {
                        Toast({
                            message: res.head.msg,
                            duration: 1000
                        });
                        Indicator.close();
                    }
                })
            },
            fanFollow: function (id,followStatus) {//粉丝关注
                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                    return;
                }
                API.$userFollow(id, res=> {
                    UTIlS.log('用户关注注成功', res);
                    if (res.head.code == 0) {
                        this.start = 0;
                        this.otherFanList = [];
                        this.getOtherFanList(this.start, this.offset);
                        Toast({
                            message:UTIlS.attentionStatus(followStatus),
                            duration: 1000
                        });
                    } else if (res.head.code == -10015||res.head.code == -10016) {
                        UTIlS.clearUserData(function (){});
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
            //刷新
            loadTop(id){
                console.log('下拉刷新');
                this.$refs.loadmore.onTopLoaded(id);
                this.otherArticleList = [];
                this.otherFollowList = [];
                this.otherFanList = [];
                this.start = 0;
                if (this.selectIndex == 0) {

                    this.getOtherArticleList(this.start, this.offset)
                } else if (this.selectIndex == 1) {

                    this.getOtherFollowList(this.start, this.offset);

                } else if (this.selectIndex == 2) {

                    this.getOtherFanList(this.start, this.offset);

                } else {
                }
            },
            loadBottom(id) {
                console.log('上拉刷新');
                this.allLoaded = false;
                if (this.selectIndex == 0) {
                    if (this.articleListHasNext) {
                        this.getOtherArticleList(this.start, this.offset)

                    } else {
//                        Toast({
//                            message: '暂无更多数据',
//
//                            duration: 1000
//                        });
                    }
                }
                if (this.selectIndex == 1) {
                    if (this.followListHasNext) {
                        this.getOtherFollowList(this.start, this.offset);

                    } else {
//                        Toast({
//                            message: '暂无更多数据',
//
//                            duration: 1000
//                        });
                    }
                }
                if (this.selectIndex == 0) {
                    if (this.fanListListHasNext) {
                        this.getOtherFanList(this.start, this.offset);

                    } else {
//                        Toast({
//                            message: '暂无更多数据',
//
//                            duration: 1000
//                        });
                    }
                }
                this.$refs.loadmore.onBottomLoaded(id);
            },


            //他人发表
            getOtherArticleList: function (start, offset) {

                Indicator.open();

                API.$OtherArticleList(this.$route.params.id, start, offset, res=> {
                    UTIlS.log('他人发表列表', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        Indicator.close();
                        _this.articleListHasNext = res.body.hasNext;
                        _this.start += _this.offset;
                        if (_this.articleListHasNext) {
                            _this.allLoaded = false;
                        } else {
                            _this.allLoaded = true;
                        }
                        var delList = res.body.list;
                        for (let i = 0; i < delList.length; i++) {
                            let obj = delList[i];
                            _this.otherArticleList.push(obj)
                        }
                    }
                });
            },
            //他人关注
            getOtherFollowList: function (start, offset) {
                Indicator.open();

                API.$OtherFollowList(this.$route.params.id, start, offset, res=> {
                    UTIlS.log('他人关注列表', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        Indicator.close();
                        _this.followListHasNext = res.body.hasNext;
                        _this.start += _this.offset;
                        if (_this.followListHasNext) {
                            _this.allLoaded = false;
                        } else {
                            _this.allLoaded = true;
                        }
                        var delList = res.body.list;
                        for (let i = 0; i < delList.length; i++) {
                            let obj = delList[i];
                            _this.otherFollowList.push(obj)
                        }
                    }
                });
            },
//他人粉丝
            getOtherFanList: function (start, offset) {
                Indicator.open();
                API.$OtherFanList(this.$route.params.id, start, offset, res=> {
                    UTIlS.log('他人粉丝列表', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        Indicator.close();
                        _this.fanListListHasNext = res.body.hasNext;
                        _this.start += _this.offset;
                        if (_this.fanListListHasNext) {
                            _this.allLoaded = false;
                        } else {
                            _this.allLoaded = true;
                        }
                        var delList = res.body.list;
                        for (let i = 0; i < delList.length; i++) {
                            let obj = delList[i];
                            _this.otherFanList.push(obj)
                        }
                    }
                });
            },
            publishDetail: function (id, type) {//发表详情

                if (type == 0) {//帖子
                    this.$router.push({name: 'postDetail', params: {'id': id,'fromType':0}});
                } else {//话题
                    this.$router.push({name: 'topicDetail', params: {'id': id,'fromType':0}});
                }

            },
            userHome: function (id) {//他人资料
                //获取他人资料数据
                        this.otherArticleList = [],
                        this.otherFollowList = [],
                        this.otherFanList = [],
                        this.getUserOtherDetail(id);
                        this.itemClick(0);

//                this.$router.push({name: 'othersHome',params:{'id':id}});
            },

        }
    }
</script>
<style scoped lang="less">
    @import 'otherHome.less';
</style>
