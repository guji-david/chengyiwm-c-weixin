<template>
    <div class="new-reply">
        <NavHeader :headTitle="navTitle" ></NavHeader>
        <ul v-if="list.length ==0" class="null-content">
            <img class="null-content-img" src="../../assets/images/null-system.png">
            <div class="null-content-text">还没有消息,去其他地方看看吧!</div>
        </ul>

        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul v-for=" item in list" class="cell">
           <ul class="cell-top">
               <div v-if="!item.readFlag" class="cell-top-left"></div>
               <ul v-if="item.content">
               <img @click="userHome(item.content.author.id)" v-if="item.content.author" class="cell-top-mid" :src="item.content.author.avatar">
               </ul>
               <img v-else class="cell-top-mid" src="../../assets/images/log.png">
               <div class="cell-top-rigth">
                   <div  v-if="item.content" class="name" v-text="item.content.content"></div>
                   <div v-if="item.content" class="time" v-text="delTime(item.content.createTime)"></div>
               </div>
           </ul>

            <ul v-if="item.content">
            <ul v-if="item.content.article" class="cell-mid" v-text="item.content.article.title">
            </ul>
            </ul>
            <ul @click="topicDetail(item.content.article.id)"  class="cell-btom">
                <ul v-if="item.content">
                    <span v-if="item.content.article">
                    <span v-if="item.content.article.author" style="font-size: 14px;color: #d2a056 ; margin-left: 10px" v-text="item.content.article.author.nickname"></span>
                    </span>
             <span v-if="item.content.article" class="bom-reply-content" v-text="item.content.article.title"></span>
                    </ul>
                <ul class="reply-btom">
                    <ul v-if="item.content">
                    <div v-if="item.content.article" class="group-name" v-text="item.content.article.group.name">小白理财</div>
                        </ul>
                    <div class="bottom-right">
                        <div class="bottom-see">
                            <img class="bottom-see-img" src="../../assets/images/home_read_icon.png">
                            <ul class="bottom-see-num" v-if="item.content">
                            <div v-if="item.content.article"  v-text="item.content.article.viewCount"></div>
                                </ul>
                        </div>
                        <div class="bottom-col">
                            <img class="bottom-col-see-img" src="../../assets/images/home_comment_icon.png">
                            <ul v-if="item.content" class="bottom-col-see-num">
                            <div  v-if="item.content.article"  v-text="item.content.article.commentCount"></div>
                                </ul>
                        </div>
                    </div>
                </ul>
            </ul>

        </ul>
            </mt-loadmore>
    </div>
</template>

<script>
    import Vue from 'vue'
    import  NavHeader from '../../components/navHeader'
    import { MessageBox ,Toast, Loadmore,Indicator} from 'mint-ui';
    import { mapGetters, mapActions } from 'vuex'
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    Vue.component(Loadmore.name, Loadmore);
    export default{
        data(){
            return{
                navTitle:'新增回复',
                list:[],
                allLoaded:true,
                hasNext:false,
                start:0,
                offset:10,
            }
        },
        components:{
            NavHeader
        },
        mounted(){
            //获取数据
         this.getMessageMommentList(this.start,this.offset);
        },
        methods: {
            getMessageMommentList:function (start,offset){
                Indicator.open()
                API.$messageMommentList(start,offset, res=> {

                    UTIlS.log('消息回复列表',res);
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
                this.getMessageMommentList(this.start,this.offset);
            },
            loadBottom(id) {
                console.log('上拉刷新');
                this.allLoaded = false;
                if (this.hasNext) {
                    this.getMessageMommentList(this.start,this.offset);
                } else {
//                    Toast({
//                        message: '暂无更多数据',
//                        duration: 1000
//                    });
                }
                this.$refs.loadmore.onBottomLoaded(id);
            },
            system:function () {//系统消息

            } ,
            newMessage:function () {//新消息
                this.$router.push({name: 'myNewReply'});
            },
            delTime: function (time) {

                var nomalTime=UTIlS.normalTime(time);//开始时间

                 return  nomalTime;
            },
            userHome:function (id) {
                if (id == UTIlS.getUserId()){

                    this.$router.push({name: 'myHome',params:{'id':id}});

                }else {
                    this.$router.push({name: 'othersHome',params:{'id':id}});
                }
            },
            topicDetail:function (id) {
                this.$router.push({name: 'postDetail',params:{'id':id,'fromType':0}});
            },
        }
    }

</script>
<style lang="less">

    @import 'myNewReply.less';

    .new-reply{
        width: 100%;
        padding-top: 40px;

    }
    .new-reply .null-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
    .new-reply .null-content .null-content-img{
        width: 160px;
        height: 135px;
        margin-top: 100px;
    }
    .new-reply .null-content .null-content-text{
        font-size: 14px;
        color: #909090;
        margin-top: 20px;
    }

</style>