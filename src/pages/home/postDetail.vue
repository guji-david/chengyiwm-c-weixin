<template>
    <div class="post-detail">
        <section v-show="fromType==0" class="post-Nav">
            <div class="post-Nav-bc">
                <div @click="gobBack()" class="post-Nav-left">
                    <img class="post-Nav-back" src="../../assets/images/back.png">
                </div>
                <div @click="groupDetail(group.id)" class="post-Nav-avatar">
                    <div v-if="group" class="post-Nav-name" v-text="group.name"></div>
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
        <ul class="att-bc">
            <div @click.stop="userHome(author.id)" class="att-left">
                <img v-if="author" class="att-left-img" :src="author.avatar">
                <div class="att-left-mid">
                    <div class="att-left-mid-top" v-text="author.nickname"></div>
                    <div class="att-left-mid-bom" v-text="delNomalTime(resBody.createTime)"></div>
                </div>
            </div>
            <div @click.stop="userFollows(author.followStatus)" class="att-right">
                <ul v-if="author.followStatus === 120 || author.followStatus === 122" class="attention-ac">
                    <div class="followed-left">+</div>
                    <div class="followed-right">关注</div>
                </ul>
                <div v-if="author.followStatus === 121" class="attentioned-ac">已关注</div>
                <div v-if="author.followStatus === 123" class="attentioned-ac">互相关注</div>
            </div>
        </ul>
        <section class="post-des">
            <div class="post-des-title" v-text="resBody.title"></div>
            <div class="post-des-content" v-html="resBody.content">
            </div>
        </section>
        <ul v-if="commentList.length" class="all-reply">
            <div class="all-reply-left" v-text="'全部回复 ('+ commentList.length+ ')'"></div>
            <div class="all-reply-right">
                <!--<img class="all-reply-right-img" src="../../assets/images/posts_detail_landlord_icon.png">-->
                <!--<div class="all-reply-right-text"></div>-->
            </div>
        </ul>
        <ul class="cell-bg">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                         ref="loadmore">

                <ul v-for="item in commentList">
                    <!--回复列表1：无人评论-->
                    <section v-if="!item.targetUserId" class="post-detail-cell">
                        <img @click.stop="userHome(item.author.id)" v-if="item.author" class="cell-left"
                             :src="item.author.avatar">
                        <div class="cell-mid">
                            <div @click.stop="userHome(item.author.id)" v-if="item.author" class="cell-mid-title"
                                 v-text="item.author.nickname"></div>
                            <div @click.stop="userHome(item.author.id)" class="cell-mid-time"
                                 v-text="item.floor +'      ' + delTime(item.createTime)"></div>
                            <div class="cell-mid-des" v-text="item.content"></div>
                        </div>
                        <div v-if="isMySelf(item.author.id)" @click.stop="replyTarget(item.id,item.author.nickname)"
                             class="cell-right">
                            <img v-if="isMySelf(item.author.id)" class="cell-right-img"
                                 src="../../assets/images/group_Reply-icon.png">

                        </div>
                    </section>
                    <!--回复列表2:有人评论-->
                    <section v-if="item.targetUserId" class="comment-cell">
                        <img @click.stop="userHome(item.author.id)" v-if="item.author" class="comment-cell-left"
                             :src="item.author.avatar">
                        <ul class="comment-cell-mid">
                            <div @click.stop="userHome(item.author.id)" v-if="item.author" class="cell-mid-title"
                                 v-text="item.author.nickname"></div>
                            <div @click.stop="userHome(item.author.id)" class="cell-mid-time"
                                 v-text="item.floor+'  '  + delTime(item.createTime)"></div>
                            <div class="cell-mid-content">
                                <span style="font-size: 14px;color: #4D4D4D">回复</span>
                                <span style="color: #d2a056;font-size: 14px" v-text="'@'+item.targetNickname"></span>
                                <span style="" v-text="item.content"></span>
                            </div>
                            <div class="cell-mid-targetContent">
                                <span style="color: #d2a056;font-size: 14px" v-text="'@'+item.targetNickname"></span>
                                <span style="font-size: 14px;color: #4D4D4D">：</span>
                                <span style="" v-text="item.targetContent"></span>
                            </div>
                        </ul>
                        <ul @click.stop="replyTarget(item.id,item.author.nickname)" class="comment-cell-right">
                            <img v-if="isMySelf(item.author.id)" class="cell-right-img"
                                 src="../../assets/images/group_Reply-icon.png">
                        </ul>
                    </section>
                </ul>
            </mt-loadmore>
        </ul>
        <section class="tab-bar">
            <div class="tab-bar-bc">
                <span @click="comment()" class="tab-input">写下你的评论吧</span>
                <div class="tab-right">
                    <div class="like-bc">
                        <img v-if="resBody.liked" @click="like()" class="tab-like-img"
                             src="../../assets/images/topic_liked.png">
                        <img v-else="" @click="like()" class="tab-like-img" src="../../assets/images/topic_lick.png">
                        <div :class="resBody.liked ? 'like-num':'unlike-num'" v-text="resBody.likeCount"></div>
                    </div>
                    <div class="collect-bc">
                        <img v-if="resBody.collected" @click="collect()" class="tab-collect-img"
                             src="../../assets/images/colected.png">
                        <img v-else @click="collect()" class="tab-collect-img" src="../../assets/images/collect.png">
                        <div :class="resBody.collected ? 'colleted-num':'uncolleted-num'"
                             v-text="resBody.collectionCount"></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    import {Toast, MessageBox, Indicator} from 'mint-ui';
    import Vue from 'vue'
    export default{

        data(){
            return {
                resBody: {},
                group: {},
                author: {},
                commentList: [],
                start: 0,
                offset: 10,
                allLoaded: true,
                hasNext: false,
                fromType: 0,
            }
        },
        components: {},
        mounted(){
            //获取帖子详情
            this.getArticleDetail(this.$route.params.id);
            this.fromType = this.$route.params.fromType;
            //获取回复列表
            this.getCommentList(this.$route.params.id, this.start, this.offset);

        },
        methods: {
            getArticleDetail: function (id) {
                API.$postDetail(id, res => {
                    var _this = this
                    UTIlS.log('获取帖子详情', res);
                    if (res.head.code == 0) {
                        _this.resBody = res.body;
                        _this.group = res.body.group;
                        _this.author = res.body.author;
                    }
                })
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
                    return month + '-' + day;
                } else if (0 < hours) {
                    return hours + '小时前';
                } else if (0 < minutes) {
                    return minutes + '分钟前';
                } else {
                    return '刚刚';
                }
            },
            getCommentList: function (id, start, offset) {
                API.$commentList(id, UTIlS.getUserId(), start, offset, res=> {
                    var _this = this;
                    if (res.head.code == 0) {
                        console.log('获取回复列表' + JSON.stringify(res))
                        _this.hasNext = res.body.hasNext;//是否还有更多数据

                        if (_this.hasNext) {
                            _this.allLoaded = false;
                        } else {
                            _this.allLoaded = true;
                        }
                        for (let i = 0; i < res.body.list.length; i++) {
                            var obj = res.body.list[i];
                            _this.commentList.push(obj);
                        }
                    } else {
                        Toast({
                            message: res.head.msg,
                            duration: 1000
                        });
                    }

                })
            },
            loadTop(id){
                console.log('下拉刷新');
                this.$refs.loadmore.onTopLoaded(id);
                this.commentList = [];
                this.start = 0;
//            this.getCommentList(this.$route.params.id,this.start,this.offset);
            },
            loadBottom(id) {
                console.log('上拉刷新');
                this.allLoaded = false;
                this.start += 10;
                if (this.hasNext) {
                    this.getCommentList(this.$route.params.id, this.start, this.offset);

                } else {
//                    Toast({
//                        message: '暂无更多数据',
//
//                        duration: 1000
//                    });
                }
                this.$refs.loadmore.onBottomLoaded(id);
            },
            gobBack: function () {
                this.$router.go(-1);
            },
            comment: function () {

                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                   return;
                }
                this.$router.push({
                    name: 'replyPost',
                    params: {
                        'targetId': '',
                        'replyContent': this.author.nickname,
                        type: 0,
                        'articleId': this.$route.params.id
                    }
                });
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
                    UTIlS.log('话题收藏', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        _this.getArticleDetail(this.$route.params.id);
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

                    } else if (res.head.code == -10015||res.head.code == -10016) {
                        this.$router.push({name: 'loginA'});
                        return;
                        UTIlS.clearUserData(function (){});
                    } else {
                        Toast({
                            message: res.head.msg,
                            duration: 1000
                        });
                    }
                })

            },
            //关注该成员
            userFollows: function (followStatus) {

                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                    return;
                }
                Indicator.open();
                API.$userFollow(this.author.id, res=> {
                    UTIlS.log('用户关注注成功', res);
                    if (res.head.code == 0) {
                        Indicator.close();
                        this.getArticleDetail(this.$route.params.id);
                        Toast({
                            message:UTIlS.attentionStatus(followStatus),
                            duration: 1000
                        });
                    } else if (res.head.code == -10015||res.head.code == -10016) {
                        this.$router.push({name: 'loginA'});
                        UTIlS.clearUserData(function (){});
                        Indicator.close();
                    } else {
                        Toast({
                            message: res.head.msg,
                            duration: 1000
                        });
                        Indicator.close();
                    }
                })

            },
            like: function () {//点赞

                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                    return;
                }
                API.$articleLike(this.$route.params.id, res=> {
                    UTIlS.log('帖子点赞成功', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        this.getArticleDetail(this.$route.params.id);
                        if (_this.resBody.liked) {
                            Toast({
                                message: '取消点赞',
                                duration: 1000
                            });
                        } else {
                            Toast({
                                message: '点赞成功',
                                duration: 1000
                            });
                        }

                    } else if (res.head.code == -10015||res.head.code == -10016) {
                        UTIlS.clearUserData(function (){});
                        this.$router.push({name: 'loginA'});
                    } else {
                        Toast({
                            message: res.head.msg,
                            duration: 1000
                        });
                    }

                })
            },
            delNomalTime: function (time) {

                return UTIlS.postDetailNormalTime(time);
            },
            replyTarget: function (id, name) {//评论他人
                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                }
                this.$router.push({
                    name: 'replyPost',
                    params: {'targetId': id, 'replyContent': name, type: 1, 'articleId': this.$route.params.id}
                });
            },
            isMySelf: function (id) {//判断是不是自己的帖子
                if (id == UTIlS.getUserId()) {
                    return false;
                } else {
                    return true;
                }
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
    @import 'postDetail.less';
</style>
