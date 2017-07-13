<template>
    <div class="group-detail">


            <div class="group-detail-head" :style="{background: 'url('+resBody.background+') 0% 0% / 100% 100% no-repeat'}">
                <img @click="goBack()" class="group-nav-detail" src="../../../assets/images/nav_back_icon.png">
                <div @click="groupInfoDetail()" class="avatar">
                    <img class="avatar-img" :src="resBody.avatar">
                    <a class="avatar-user-name" v-text="resBody.name"></a>
                </div>
                <div class="head-bom-bc">
                    <div class="des-bc">
                        <div class="head-bom-dsc" v-text="resBody.brief"></div>
                        <div class="des-line"></div>
                    </div>


                    <ul @click="groupFollow(resBody.followed)" v-if="!resBody.followed" class="attention-ac">
                        <div class="followed-left">+</div>
                        <div class="followed-right">关注</div>
                    </ul>
                    <div  v-else  @click="groupFollow(resBody.followed)" class="attentioned-ac" >已关注</div>
                </div>
            </div>
            <ul @click="groupMemberList()" class="memberList">
                <div class="memberList-left" v-text="resBody.memberCount+'个成员'"></div>
                <div class="memberList-right">
                    <ul v-for="(item,index) in groupList">
                        <img v-if="index<6" class="memberList-right-img" :src="item.avatar">
                    </ul>
                    <div class="memberList-more">···</div>
                </div>
            </ul>
            <div class="group-line"></div>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="group-to-top" v-if="toTopList.length!=0">
                <img class="group-to-top-mark" src="../../../assets/images/group_top_icon.png">
            </div>
            <ul @click="detail(item.id,item.type)" v-for="item in toTopList" class="group-to-top-item">
                <a class="item-mark">置顶</a>
                <a class="item-text" v-text="item.title"></a>
            </ul>
            <div class="group-option-bc" >
            <ul class="group-option">
                <div @click="selectItme(index)" v-for="(item,index) in optionlist"
                     :class="{'active': index===currentIndex}" class="group-option-item" :key="index">{{item.name}}
                </div>
            </ul>
                <ul class="group-option-btom" >
            <div class="group-option-btom" >
                <div class="fir">
                <div v-show="currentIndex===0" class="group-option-line-first"></div>
                </div>
                <div class="sen">
                <div v-show="currentIndex===1" class="group-option-line-sen"></div>
                </div>
                    <div class="three">
                <div v-show="currentIndex===2" class="group-option-line-three"></div>
                    </div>
            </div>
                </ul>
            </div>
            <section v-if="essenceList.length>0" v-for="item in essenceList" class="group-cell"
                     @click="detail(item.id,item.type)">
                <!--全部 -->
                <ul v-if="currentIndex==0">
                    <!--帖子下面有精华帖-->
                <ul  v-show="item.type==0">
                    <!--普通帖子-->
                <ul v-show="!item.essence" class="first-type"  >
                <ul  class="left">
                    <img class="left-img" src="../../../assets/images/group_Reply-icon.png">
                    <div class="left-num" v-text="item.commentCount"></div>
                </ul>
                <ul class="mid">
                    <div class="mid-title">
                        <span  v-text="item.title"></span>

                    </div>
                    <div class="mid-bom">
                        <img v-if="item.author" class="mid-bom-img" :src="item.author.avatar">
                        <img v-else class="mid-bom-img" src="../../../assets/images/log.png">
                        <div v-if="item.author" class="mid-bom-name" v-text="item.author.nickname"></div>
                    </div>
                </ul>
                <ul class="right">
                    <img v-if="item.thumb" class="right-img" :src="item.thumb">
                    <div v-if="item.createTime" class="right-time" v-text="delTime(item.createTime)"></div>
                </ul>
                </ul>
                    <!--精华帖子-->
                    <ul v-show="item.essence" class="first-type"  >
                        <ul  class="left">
                            <img class="left-img" src="../../../assets/images/group_Reply-icon.png">
                            <div class="left-num" v-text="item.commentCount"></div>
                        </ul>
                        <ul class="mid">
                            <div class="mid-title">
                                <span style="border: 1px solid #d2a056;font-size:9px; padding: 1px;border-radius: 2px;color: #d2a056">精</span>
                                <span  v-text="item.title"></span>

                            </div>
                            <div class="mid-bom">
                                <img v-if="item.author" class="mid-bom-img" :src="item.author.avatar">
                                <img v-else class="mid-bom-img" src="../../../assets/images/log.png">
                                <div v-if="item.author" class="mid-bom-name" v-text="item.author.nickname"></div>
                            </div>
                        </ul>
                        <ul class="right">
                            <img v-if="item.thumb" class="right-img" :src="item.thumb">
                            <div v-if="item.createTime" class="right-time" v-text="delTime(item.createTime)"></div>
                        </ul>
                    </ul>
                </ul>
                    <!--话题-->
                <ul v-show="item.type==1" class="sen-type">
                    <ul class="sen-left">
                        <div class="left-title">帖子数</div>
                        <div class="left-num" v-text="item.articleCount"></div>
                    </ul>
                    <ul class="sen-mid">
                        <div class="mid-title" v-text="item.title" ></div>
                        <div class="mid-bottom">
                            <img v-if="item.author" class="mid-bottom-img" :src="item.author.avatar ? item.author.avatar :'' ">
                            <!--<img v-else class="mid-bottom-img" src="../../../assets/images/log.png">-->
                            <div v-if="item.author" class="mid-bottom-text" v-text="item.author.nickname"></div>
                        </div>
                    </ul>
                    <ul class="sen-right">
                        <img v-if="item.thumb" class="sen-right-img" :src="item.thumb">
                        <div v-if="item.createTime" class="sen-right-time" v-text="delTime(item.createTime)"></div>

                    </ul>
                </ul>
                </ul>
                <!--精华帖-->
  <ul v-if="currentIndex==1">
      <ul v-show="item.essence" class="first-type"  >
          <ul  class="left">
              <img class="left-img" src="../../../assets/images/group_Reply-icon.png">
              <div class="left-num" v-text="item.commentCount"></div>
          </ul>
          <ul class="mid">
              <div class="mid-title">
                  <span style="border: 1px solid #d2a056;font-size:9px; padding: 1px;border-radius: 2px;color: #d2a056">精</span>
                  <span  v-text="item.title"></span>

              </div>
              <div class="mid-bom">
                  <img v-if="item.author" class="mid-bom-img" :src="item.author.avatar">
                  <img v-else class="mid-bom-img" src="../../../assets/images/log.png">
                  <div v-if="item.author" class="mid-bom-name" v-text="item.author.nickname"></div>
              </div>
          </ul>
          <ul class="right">
              <img v-if="item.thumb" class="right-img" :src="item.thumb">
              <div v-if="item.createTime" class="right-time" v-text="delTime(item.createTime)"></div>
          </ul>
      </ul>
  </ul>
                <!--话题-->
                <ul v-if="currentIndex==2">
                    <ul v-show="item.type==1" class="sen-type">
                        <ul class="sen-left">
                            <div class="left-title">帖子数</div>
                            <div class="left-num" v-text="item.articleCount"></div>
                        </ul>
                        <ul class="sen-mid">
                            <div class="mid-title" v-text="item.title" ></div>
                            <div class="mid-bottom">
                                <img v-if="item.author" class="mid-bottom-img" :src="item.author.avatar ? item.author.avatar :'' ">
                                <!--<img v-else class="mid-bottom-img" src="../../../assets/images/log.png">-->
                                <div v-if="item.author" class="mid-bottom-text" v-text="item.author.nickname"></div>
                            </div>
                        </ul>
                        <ul class="sen-right">
                            <img v-if="item.thumb" class="sen-right-img" :src="item.thumb">
                            <div v-if="item.createTime" class="sen-right-time" v-text="delTime(item.createTime)"></div>

                        </ul>
                    </ul>
                </ul>
            </section>
        </mt-loadmore>
        <!--发布弹框-->
        <section class="publish-fade">
            <div class="publish">
                <img @click="publish()" class="publish_btn" src="../../../assets/images/publish.png">

            </div>
        </section>
    </div>

</template>

<script>
    import Vue from 'vue'
    import  NavHeader from '../../../components/navHeader'
    import * as API from '../../../store/api.js'
    import * as UTIlS from '../../../common/utils'
    import {Swipe, SwipeItem, MessageBox, Toast, Loadmore,Indicator} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default{
        data(){
            return {
                optionlist: [{name: '全部'}, {name: '精华贴'}, {name: '话题'}],
                currentIndex: 0,
                resBody: '',
                groupList: [],
                toTopList: [],
                essenceList: [],
                topicId: '',
                top: '',
                essence: '',
                type: 0,
                allLoaded: true,
                hasNext: false,
                start: 0,
                offset: 10,
            }
        },
        components: {},
        mounted(){
            //获取小组详情
            this.getGroupDetail(this.$route.params.groupId);
            //获取小组列表
            this.getGroupList(this.$route.params.groupId);
            //小组帖子（置顶）$articleList
            this.getTopArticleList(this.$route.params.groupId)
            //小组帖子（全部、置顶、精华、话题）$articleList
            this.selectItme(0)
            console.log('再次重新创建');

        },

        beforeDestroy: function () {
//            this.allLoaded = true;

        },
        methods: {
            //小组帖子（置顶）
            getTopArticleList: function (groupId) {
                var _this = this;
                API.$articleList(groupId, '', '', 1, '', '',0,20, res=> {
                    console.log('获取小组帖子置顶项' + JSON.stringify(res))
                    if (res.head.code == 0) {
                        _this.toTopList = res.body.list;
                    }
                })
            },
            //获取小组详情
            getGroupDetail: function (groupId) {
                API.$groupDetail(groupId, res=> {
                    console.log('获取小组详情' + JSON.stringify(res))
                    if (res.head.code == 0) {
                        var _this = this;
                        _this.resBody = res.body;
                    }
                })
            },
            //获取小组成员列表
            getGroupList: function (groupId) {
                var _this = this;
                API.$groupMemberList(groupId, 0, 10, res=> {
                    console.log('获取组员列表' + JSON.stringify(res))
                    if (res.head.code == 0) {
                        _this.groupList = res.body.list;
                    }
                })
            },
            //全部，精华帖，话题
            selectItme: function (index) {
                this.currentIndex = index;
                var _this = this;
                _this.essenceList = [];
                _this.start = 0;
                if (index == 0) {
                    _this.topicId = '';
                    _this.top = '';
                    _this.essence = '';
                    _this.type = ''
                } else if (index == 1) {
                    _this.topicId = '';
                    _this.top = '';
                    _this.essence = 1;
                    _this.type = ''
                } else {
                    _this.topicId = '';
                    _this.top = '';
                    _this.essence = '';
                    _this.type = 1
                }
                console.log('top' + _this.top)
                console.log('essence' + _this.essence)
                console.log('type' + _this.type)
                this.getArticleList(_this.topicId, _this.top, _this.essence, _this.type, _this.start, _this.offset);
            },
            getArticleList: function (topicId, top, essence, type, start, offset) {
                Indicator.open();
                API.$articleList(this.$route.params.groupId, '', topicId, top, essence, type, start, offset, res=> {
                UTIlS.log('获取,全部，精华帖,话题', res);
                    var delList = res.body.list;
                    var _this = this;
                    if (res.head.code == 0) {

                        Indicator.close();

                        _this.hasNext = res.body.hasNext;//是否还有更多数据

                        _this.start += 10;

                        if (_this.hasNext) {

                            _this.allLoaded = false;

                        } else {

                            _this.allLoaded = true;
                        }
                        for (let i = 0; i < delList.length; i++) {
                            let obj = delList[i]
                            _this.essenceList.push(obj);
                        }
                    }
                })
            },
            loadTop(id){
                console.log('下拉刷新');
                this.$refs.loadmore.onTopLoaded(id);
                this.essenceList = [];
                this.start = 0,
                        this.getArticleList(this.topicId, this.top, this.essence, this.type, this.start, this.offset);
            },
            loadBottom(id) {
                console.log('上拉刷新');
                 this.allLoaded = false;
                if (this.hasNext) {
                    this.getArticleList(this.topicId, this.top, this.essence, this.type, this.start, this.offset);
                } else {
//                    Toast({
//                        message: '暂无更多数据',
//
//                        duration: 1000
//                    });
                }
                this.$refs.loadmore.onBottomLoaded(id);
            },

            goBack: function () {
                this.$router.go(-1);
            },
            //关注小组
            groupFollow: function (followed) {
                if (!UTIlS.getSkey()) {
                    this.$router.push({name: 'loginA'});
                    return;
                }
                API.$groupfFollow(this.$route.params.groupId, res=> {
                UTIlS.log('小组关注成功', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        this.getGroupDetail(this.$route.params.groupId);
                        this.getGroupList(this.$route.params.groupId);
                        if (followed){
                        Toast({
                            message:'取消关注',
                            duration: 1000
                        });
                        }else {
                            Toast({
                                message:'关注成功',
                                duration: 1000
                            });
                        }
                    } else if (res.head.code == -10015||res.head.code == -10016) {
                        UTIlS.clearUserData(function (){});
                        this.$router.push({name: 'loginA'});
                        return;
                    } else {

                    }
                })
            },
            groupInfoDetail: function () {
                this.$router.push({name: 'groupInfoDetail', params: {'groupId': this.$route.params.groupId}});
            },
            groupMemberList: function () {
                this.$router.push({name: 'memberList', params: {'id': this.$route.params.groupId}});
            },
            detail: function (id, type) {
                if (type == 0) {

                    this.$router.push({name: 'postDetail', params: {'id': id,'fromType':0}});

                } else {

                        this.$router.push({name: 'topicDetail', params: {'id': id,'fromType':0}});
                }
            },
            delTime: function (time) {

                var postTime=UTIlS.postNormalTime(time);//开始时间

                var currentTime=new Date();//结束时间

                var date3=currentTime.getTime()-(new Date(postTime)).getTime();  //时间差的毫秒数

                var days=Math.floor(date3/(24*3600*1000)) //计算出相差天数

                 //计算出小时数
                var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
                var hours=Math.floor(leave1/(3600*1000))

                   //计算相差分钟数
                var leave2=leave1%(3600*1000)//计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000))

                if (0<days){
                    var postTimeArr = [];
                    var postTime = UTIlS.normalTime(time);
                    postTimeArr = postTime.split("-");
                    var  month = postTimeArr[1];
                    var  day = postTimeArr[2];
                    if (month.length==1){
                        month = '0'+month;
                    }
                    if (day.length==1){
                        day = '0'+day;
                    }
                    return month + ' - ' + day ;
                }else if (0<hours){
                    return hours+'小时前'  ;
                }else if (0<minutes){
                    return minutes+'分钟前'  ;
                }else {
                    return '刚刚' ;
                }
            },
            publish: function () {
                this.$router.push({name: 'publishTopic', params: {'groupId': this.$route.params.groupId, topicId: '',type:0}});
            }
        }
    }
</script>
<style scoped  lang="less">
    @import 'groupDetail.less';
</style>