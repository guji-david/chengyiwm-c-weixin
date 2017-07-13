<template>
    <div class="all-group">
        <NavHeader :headTitle="navTitle"></NavHeader>
        <div class="all-group-content">
            <div class="left-list">
                <ul @click="selectItem(index,item.id)" v-for="(item,index) in categoryList" :key="index"
                    class="left-content"
                    :class="{'active': index===currentIndex}">{{item.name}}
                </ul>
            </div>
            <div class="right-list">
                <ul class="right-item" @click="groupDetail(item.id)" v-for="(item,index) in groupList">
                    <div class="right-item-left">
                        <img class="right-item-left-img" :src="item.avatar">
                    </div>
                    <div class="right-item-mid">
                        <div class="right-item-mid-title" v-text="item.name"></div>
                        <div class="right-item-mid-des" v-text="item.brief"></div>
                    </div>
                    <ul @click.stop="groupfFollow(item.id,item.followed)" v-if="!item.followed" class="attention-ac">
                        <div class="followed-left">+</div>
                        <div class="followed-right">关注</div>
                    </ul>
                        <div  v-else  @click.stop="groupfFollow(item.id,item.followed)" class="attentioned-ac" >已关注</div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import  NavHeader from '../../../components/navHeader'
    import * as API from '../../../store/api.js'
    import {Indicator, MessageBox, Toast} from 'mint-ui';
    import * as UTIlS from '../../../common/utils'
    import Vue from 'vue'
    export default{
        data(){
            return {
                groupList: [], //小组列表
                currentIndex: 0,
                navTitle: '全部小组',
                categoryList: [], //分类小组
                groupId:0,
            }
        },
        components: {
            NavHeader
        },
        mounted(){
            //获取分组列表
            this.getCategoryList()
            Indicator.open();
        },
        methods: {
            //获取分组列表
            getCategoryList: function () {
                var _this = this;
                API.$categoryList(res=> {
                    UTIlS.log('获取分组列表', res);
                    if (res.head.code == 0) {
                        _this.categoryList = res.body.list;
                        //获取小组列表
                        _this.getGroupList(res.body.list[0].id);
                        _this.groupId = res.body.list[0].id;
                    }
                })
            },
            selectItem: function (index, id) {
                var _this = this;
                _this.currentIndex = index;
                //获取小组列表
                _this.getGroupList(id);
                _this.groupId = id;
            },
            groupDetail: function (id) {

                this.$router.push({name: 'groupDetail',params:{'groupId':id}});
            },
            //获取小组列表
            getGroupList: function (groupId) {
                var _this = this;
                API.$groupList(groupId, 0, 10, res=> {
                    UTIlS.log('获取小组列表', res);
                   Indicator.close();
                    if (res.head.code == 0) {
                        _this.groupList = res.body.list;
                    }
                })
            },
            groupfFollow:function (id,followed) {
                if (!UTIlS.getSkey()){
                    this.$router.push({name: 'loginA'});
                    returnl
                }
                API.$groupfFollow(id, res=> {
                    UTIlS.log('小组关注成功', res);
                    var  _this = this;
                    if (res.head.code==0){
                        _this.getGroupList(_this.groupId);
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
                    }else  if (res.head.code==-10015||res.head.code==-10016){
                        this.$router.push({name: 'loginA'});
                        return;
                    }else {
                        Toast({
                            message:res.head.msg,

                            duration: 1000
                        });
                    }
                })
            }
        }
    }
</script>
<style  lang="less">
    @import 'allGroup.less';
</style>