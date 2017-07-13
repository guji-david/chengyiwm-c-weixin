<template>
    <div class="topic-detail">
        <section v-show="fromType==0" class="post-Nav">
            <div class="post-Nav-bc">
                <div @click="gobBack()" class="post-Nav-left">
                    <img class="post-Nav-back" src="../../assets/images/back.png">
                </div>
                <div v-if="group" @click.stop="groupDetail(group.id)" class="post-Nav-avatar">
                    <div class="post-Nav-name" v-text="group.name"></div>
                    <img v-if="group" class="post-Nav-avatar-img" :src="group.avatar">
                </div>
            </div>
        </section>

        <section v-show="fromType==1" class="share-nav">
            <div class="share-content">
                <div class="share-left">
                    <img class="share-img" src="../../assets/images/log.png">
                    <div class="share-left-content">
                        <div class="title">在意财富</div>
                        <div class="detail">让你的钱滚起来</div>
                    </div>
                </div>
                <div @click="downApp()" class="share-right">免费下载</div>
            </div>
        </section>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <section class="topic-head">
                <div class="topic-head-left">
                    <div class="topic-title" v-text="resBody.title"></div>
                    <div class="topic-des" v-html="resBody.content"></div>
                    <ul class="btom">
                        <div class="topic-num"
                             v-text="resBody.articleCount+'篇帖子'+' · '+resBody.participantCount+'人参与'"></div>
                        <div class="topic-head-right">
                            <ul @click.stop="topicFollow()" v-if="resBody.followed" class="attention-ac">
                                <div class="followed-left">+</div>
                                <div class="followed-right">关注</div>
                            </ul>
                            <div v-else @click.stop="topicFollow()" class="attentioned-ac">已关注</div>
                        </div>
                    </ul>
                </div>

            </section>
            <section class="sel-section">
                <div @click="selectItme(index)" v-for="(item,index) in optionlist" class="option-item" :key="index">
                    <div class="item-text-bc">
                        <div class="item-text" :class="{'active': index===currentIndex}">{{item.name}}
                        </div>
                    </div>
                    <div v-show="index===0" class="item-line"></div>
                </div>
            </section>
            <section class="topic-section">

                <ul v-for="item in topicList" class="topic-cell" @click="postdetail(item.id)">
                    <div class="topic-cell-top">
                        <div @click.stop="userHome(item.author.id)" class="topic-cell-top-left">
                            <img v-if="item.author" class="topic-cell-top-left-img" :src="item.author.avatar">
                            <div v-if="item.author" class="topic-cell-top-left-name"
                                 v-text="item.author.nickname"></div>
                            <div v-if="item.createTime" class="topic-cell-top-left-tiem"
                                 v-text="delTime(item.createTime)"></div>
                        </div>
                        <div class="topic-cell-top-right" @click.stop="likes(item.id)">
                            <img v-if="item.liked" class="avatar-img" src="../../assets/images/home_licked_icon.png">
                            <img v-if="!item.liked" class="avatar-img" src="../../assets/images/home_unlicked_icon.png">
                            <div class="avatar-text" v-text="item.likeCount"></div>
                        </div>
                    </div>
                    <div class="topic-cell-mid" v-text="item.title"></div>
                    <div class="topic-cell-bom" v-text="item.brief"></div>
                </ul>
            </section>
        </mt-loadmore>
        <section class="tab-bar">
            <div class="tab-bar-bc">
                <span @click="comment()" class="tab-input">写下你的评论吧</span>
                <div class="input-right">
                    <img v-if="resBody.collected" @click="collect()" class="tab-collect-img"
                         src="../../assets/images/colected.png">
                    <img v-else @click="collect()" class="tab-collect-img" src="../../assets/images/collect.png">
                    <div :class="resBody.collected ? 'collected-num' : 'collect-num'"
                         v-text="resBody.collectionCount"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import  NavHeader from '../../components/navHeader'
    import Vue from 'vue'
    import {hex_md5} from '../../common/md5.js'
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    import {Toast, MessageBox, Indicator} from 'mint-ui';
    export default{


        data(){
            return {
                optionlist: [{name: '全部'}, {name: '精华帖'}],
                currentIndex: 0,
                datalist: [{}, {}, {}, {}, {}, {}],
                resBody: {},
                topicList: [],
                group: {},
                type: '',
                start: 0,
                offset: 10,
                allLoaded: true,
                hasNext: false,
                fromType: 0,
            }

        },
        components: {
            NavHeader

        },
        mounted(){
            //获取帖子详情数据
            this.getTopicDetail(this.$route.params.id);
            this.fromType = this.$route.params.fromType;
            this.articList(this.type, this.start, this.offset);
        },

        methods: {
            //获取帖子详情数据
            getTopicDetail: function (id) {
                API.$topicDetail(id, res=> {
                    UTIlS.log('获取话题详情', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        _this.resBody = res.body;
                        _this.group = res.body.group;
                    }
                })
            },
            articList: function (type, start, offset) {
                API.$articleList('', '', this.$route.params.id, '', '', type, start, offset, res=> {
                    UTIlS.log('获取话题详情帖子列表', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        _this.hasNext = res.body.hasNext;//是否还有更多数据
                        _this.start += _this.offset;
                        if (_this.hasNext) {
                            _this.allLoaded = false;
                        } else {
                            _this.allLoaded = true;
                        }
                        for (let i = 0; i < res.body.list.length; i++) {
                            var obj = res.body.list[i];
                            _this.topicList.push(obj);
                        }

                    }
                })
            },
            loadTop(id){
                console.log('下拉刷新');
                this.$refs.loadmore.onTopLoaded(id);
                this.topicList = [];
                this.start = 0;
                this.articList(this.type, this.start, this.offset)

            },
            loadBottom(id) {
                console.log('上拉刷新');
                this.allLoaded = false;
                if (this.hasNext) {
                    this.articList(this.type, this.start, this.offset)
                } else {
//                    Toast({
//                        message: '暂无更多数据',
//
//                        duration: 1000
//                    });
                }
                this.$refs.loadmore.onBottomLoaded(id);
            },
            selectItme: function (index) {
                this.currentIndex = index;
                var _this = this;
                _this.topicList = [];
                _this.start = 0;
                if (index == 0) {
                    _this.type = '';
                    _this.start = 0;
                } else {
                    _this.type = 0;
                    _this.start = 0;
                }
                this.articList(_this.type, _this.start, _this.offset)
            },
            likes: function (id) {

                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                    return;
                }
                Indicator.open();
                API.$articleLike(id, res=> {
                    UTIlS.log('帖子点赞成功', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        Indicator.close();
                        _this.topicList = [];
                        _this.articList(_this.type, 0, this.offset)
                    }
                })
            },
            topicFollow: function () {
                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                    return;
                }
                API.$topicFollow(this.$route.params.id, res=> {
                    UTIlS.log('小组关注成功', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        if (_this.resBody.followed) {
                            Toast({
                                message: '取消关注',
                                duration: 1000
                            });
                        } else {
                            Toast({
                                message: '关注成功',
                                duration: 1000
                            });
                        }
                        this.getTopicDetail(this.$route.params.id);
                    } else if (res.head.code == -10015 || res.head.code == -10016) {
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
            gobBack: function () {
                this.$router.go(-1);
            },
            groupDetail: function (id) {
                this.$router.push({name: 'groupDetail', params: {'groupId': id}});
            },
            collect: function () {
                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                    return;
                }
                API.$articleCollect(this.$route.params.id, res => {
                    console.log('话题收藏' + JSON.stringify(res))
                    var _this = this;
                    if (res.head.code == 0) {
                        _this.getTopicDetail(this.$route.params.id);
                        if (_this.resBody.collected) {
                            Toast({
                                message: '取消收藏',
                                duration: 1000
                            });
                        } else {
                            Toast({
                                message: '收藏成功',
                                duration: 1000
                            });
                        }

                    } else if (res.head.code == -10015|| res.head.code == -10016) {
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
            comment: function () {//评论
                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                    return;
                }
                this.$router.push({
                    name: 'publishTopic',
                    params: {topicId: this.$route.params.id, 'groupId': this.group.id, type: 0}
                });
            },
            delTime: function (time) {
                var postTime = UTIlS.postNormalTime(time);//开始时间

                var currentTime = new Date();//结束时间

                var date3 = currentTime.getTime() - (new Date(postTime)).getTime();  //时间差的毫秒数

                var days = Math.floor(date3 / (24 * 3600 * 1000)) //计算出相差天数

                //计算出小时数
                var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1 / (3600 * 1000))

                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000)//计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000))

                if (0 < days) {
                    var postTimeArr = [];
                    var postTime = UTIlS.normalTime(time);
                    postTimeArr = postTime.split("-");
                    var month = postTimeArr[1];
                    var day = postTimeArr[2];
                    if (month.length == 1) {
                        month = '0' + month;
                    }
                    if (day.length == 1) {
                        day = '0' + day;
                    }
                    return month + ' - ' + day;
                } else if (0 < hours) {
                    return hours + '小时前';
                } else if (0 < minutes) {
                    return minutes + '分钟前';
                } else {
                    return '刚刚';
                }
            },
            postdetail: function (id) {
                this.$router.push({name: 'postsDetail', params: {'id': id}});
            },
            userHome: function (id) {//他人主页

                if (id == UTIlS.getUserId()){

                    this.$router.push({name: 'myHome',params:{'id':id}});

                }else {
                    this.$router.push({name: 'othersHome',params:{'id':id}});
                }
            },
            downApp: function () {

                this.$router.push({name: 'download'});

            },
        }
    }
</script>
<style scoped lang="less">
    @import 'topicDetail.less';
</style>

