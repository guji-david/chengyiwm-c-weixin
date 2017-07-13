<template>
    <div class="Info-detail">
        <NavHeader :headTitle="navTitle"></NavHeader>
        <ul  class="att-bc">
            <div class="att-left">
                <img class="att-left-img" :src="resBody.avatar" >
                <div class="att-left-mid">
                    <div class="att-left-mid-top" v-text="resBody.name"></div>
                    <div class="att-left-mid-bom" v-text="resBody.articleCount+'个帖子'+'  ' + resBody.commentCount + '个回复'">   </div>
                </div>
                <!--<div class="att-left-right">122次收藏</div>-->
            </div>
            <div  class="att-right">
                <ul @click="attention()" v-if="!resBody.followed" class="attention-ac">
                    <div class="followed-left">+</div>
                    <div class="followed-right">关注</div>
                </ul>
                <div  v-else @click="attention()" class="attentioned-ac" >已关注</div>
            </div>
        </ul>
    <ul class="Info-cell">
        <li class="item-class">
            <div v-if="resBody.category" class="Info-cell-left">分类</div>
            <div v-if="resBody.category" class="item-class-right" v-text="resBody.category.name"></div>
        </li>
        <li class="item-manage">
            <div class="item-manage-left">管理员</div>
            <div @click.stop="userHome(resBody.manager.id)" v-if="resBody.manager" class="item-manage-right">
                <img class="item-manage-right-img" :src="resBody.manager.avatar">
                <div class="item-manage-right-name" v-text="resBody.manager.nickname">管理员</div>
            </div>
        </li>
        <li @click="memberlist()" class="item-member">
            <div class="Info-cell-left">小组成员</div>
            <div  class="item-member-right" v-text="resBody.memberCount+'位成员'"></div>
        </li>
        <li class="item-Introduct">
            <div class="item-Introduct-left">小组介绍</div>
            <div class="item-Introduct-right" v-text="resBody.brief"></div>
        </li>
    </ul>
    </div>
</template>
<style>

</style>
<script>
    import  NavHeader from '../../../components/navHeader'
    import * as API from '../../../store/api.js'
    import * as UTIlS from '../../../common/utils'
    import Vue from 'vue'
    export default{
        data(){
            return{
                navTitle:'小组详情',
                resBody:'',
            }
        },
        components:{
            NavHeader
        },
        mounted(){
            //获取小组详情
            this.getGroupDetail(this.$route.params.groupId);
//            alert(this.$route.params.groupId)
          },
        methods:{
            //获取小组详情
            getGroupDetail:function (groupId) {
                var  _this = this;
                API.$groupDetail(groupId, res=> {
                UTIlS.log('获取小组详情', res);
                    if (res.head.code == 0) {
                        _this.resBody = res.body;
                    }
                })
            },
            memberlist:function () {
                this.$router.push({name: 'memberList',params:{'id':this.$route.params.groupId}});
            },
            attention:function () {
                if (!UTIlS.getSkey()){
                    this.$router.push({name: 'loginA'});
                    return;
                }
                API.$groupfFollow(this.$route.params.groupId, res=> {
                UTIlS.log('小组关注成功', res);
                    var  _this = this;
                    if (res.head.code==0){
                        _this.getGroupDetail(this.$route.params.groupId);
                    }else if (res.head.code==-10015){
                        UTIlS.clearUserData(function (){});
                        this.$router.push({name: 'loginA'});
                        return;
                    }else {

                    }
                })
            },
            userHome:function (id) {
                if (id == UTIlS.getUserId()){

                    this.$router.push({name: 'myHome',params:{'id':id}});

                }else {

                    this.$router.push({name: 'othersHome',params:{'id':id}});
                }
            },
        }
    }
</script>
<style  lang="less">
    @import 'groupInfoDetail.less';
</style>