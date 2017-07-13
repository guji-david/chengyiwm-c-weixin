<template>
    <div class="mine">
        <div class="content">
            <div class="head-bc">
                <!--未登录-->
                <button  v-if="isShowLogin || isLogin" @click="login()" class="login-btn">手机号登录</button>
                <!--登录 -->
                <ul v-else class="login-content">
                    <div class="login-top">
                        <ul class="login-top-left"></ul>
                        <ul @click="myHome()" class="login-top-ava">
                      <img  class="login-top-img" :src="resBody.avatar">
                            <div  class="login-top-text" v-text="resBody.nickname" ></div>

                        </ul>
                        <ul class="login-top-right">
                        <div @click="personCenter()" class="per-center">
                            <div style="display: inline-block;font-size: 10px;color: #FFFFFF;"> 个人中心</div>
                            <div style="display: inline-block">
                                <img style="width: 6px;height: 10px ;" src="../../assets/images/mine_pus.png">
                            </div>
                        </div>
                        </ul>
                    </div>
                    <div  class="slogan-text" v-text="resBody.slogan" ></div>
                    <div class="login-bottom">
                        <div @click="myAttention()" class="login-bottom-left">
                            <div class="follow-num" v-text="resBody.followCount"></div>
                            <div class="follow-title">关注</div>
                        </div>
                        <div @click="myFan()" class="login-bottom-right">
                            <div class="Fans-num" v-text="resBody.fanCount"></div>
                            <div class="Fans-title">粉丝</div>
                        </div>
                    </div>
                </ul>
            </div>
            <div class="head-bottom">
                <ul @click="cellClick(item.id)" class="cell" v-for="(item,index) in data " key="index">
                    <div class="cell-bc">
                        <div class="cell-left">
                    <img v-show="index==0" class="cell-img" src="../../assets/images/mine_news_icon.png">
                        <img v-show="index==1" class="cell-img" src="../../assets/images/mine-my-post_icon.png">
                        <img v-show="index==2" class="cell-img" src="../../assets/images/mine-my-topic_icon.png">
                        <img v-show="index==3" class="cell-img" src="../../assets/images/mine-my-collect_icon.png">
                        <img v-show="index==4" class="cell-img" src="../../assets/images/seting-icon.png">
                    <div class="cell-text" v-text="item.name"></div>
                        </div>
                          <ul v-if="index==0">
                              <div v-if="hasNotice"  class="right-text"></div>
                          </ul>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>
<!--v-show="isShowLogin||isLogin"-->
<script>
    import  NavHeader from '../../components/navHeader'
    import * as UTIlS from '../../common/utils'
    import {hex_md5} from '../../common/md5.js'
    import * as API from '../../store/api.js'
    import {Toast, MessageBox} from 'mint-ui';
    import {mapGetters, mapActions} from 'vuex'
    export default{
        data(){
            return {
                isShowNav: true,
                resBody:'',
                isShowLogin:false,
                hasNotice:false,
                data:[{icon:'../../assets/images/mine_news_icon.png',name:'消息',id:'myMessage'},
                    {icon:'../../assets/images/mine-my-post_icon.png',name:'我的帖子',id:'myPosts'},
                    {icon:'../../assets/images/mine-my-topic_icon.png',name:'我的话题',id:'myTopic'},
                   {icon:'../../assets/images/mine-my-collect_icon.png',name:'我的收藏',id:'myCollect'},
                    {icon:'../../assets/images/seting-icon.png',name:'设置',id:'set'}]
            }

        },
        computed: mapGetters({
            isLogin: 'isLogin'
        }),
        components: {},
        mounted(){
            //获取数据
         this.getAppInfo();
            this.userNoticeInfo()
        },
        created: function () {


        },
        activated: function () {
            console.log('activated')
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isShowNav = false;
            } else {
                this.isShowNav = true;
            }
            this.getAppInfo();
            this.isShowLogin = this.isLogin;
        },
        methods: {

            userNoticeInfo:function () {

                API.$userNoticeInfo(150, res=> {
                    UTIlS.log('获取红泡提醒', res);
                 this.hasNotice = res.body.hasNotice;

                });
            },
            getAppInfo: function () {
                API.$userUpdate(UTIlS.getUserId(), res=> {
                    UTIlS.log('更新个人信息', res);
                    var _this = this;
                    if (res.head.code == 0) {
                        _this.resBody = res.body;
                    }else  if (res.head.code==-10015||res.head.code==-10016){
                        UTIlS.clearUserData(function (){});
                        _this.isShowLogin = true;
                        _this.isLogin = true;
                        _this.$store.dispatch('logout',{
                            userInfo:{userId:'',token:''}
                        });
                    }else {

                    }
                });

                if (UTIlS.getSkey()){
                    this.isShowLogin = false;
                }else {
                    this.isShowLogin = true;
                }
            },

//            登录
            login: function () {
                this.$router.push({name: 'loginA'});
            },
            //设置
            set: function () {

            },
//            修改资料
            personCenter: function () {
                this.$router.push({name: 'modifyInfo'});
            },
            //我的关注
            myAttention:function () {
                this.$router.push({name: 'myAttention'});
            },
            //我的粉丝
            myFan:function () {
                this.$router.push({name: 'myFan'});
            },
            myHome:function () {
                this.$router.push({name: 'myHome',params:{'id':UTIlS.getUserId()}});
            },
            cellClick:function (id) {

                if (id == 'myMessage'){

                    if (!UTIlS.getSkey()) {
                        this.$router.push({name: 'loginA'});
                        return;
                    }
                    this.$router.push({name: 'myMessage'});

                }else if (id == 'myPosts'){
                    if (!UTIlS.getSkey()) {
                        this.$router.push({name: 'loginA'});
                        return;
                    }
                    this.$router.push({name: 'myPosts'});
                }else if (id == 'myTopic'){
                    if (!UTIlS.getSkey()) {
                        this.$router.push({name: 'loginA'});
                        return;
                    }
                    this.$router.push({name: 'myTopic'});
                }else if (id == 'myCollect'){
                    if (!UTIlS.getSkey()) {
                        this.$router.push({name: 'loginA'});
                        return;
                    }
                    this.$router.push({name: 'myCollect'});
                }else if (id == 'set'){
                    this.$router.push({name: 'set'});
                }else {

                }
            }
        }
    }
</script>
<style  lang="less">
    @import 'mine.less';
</style>

