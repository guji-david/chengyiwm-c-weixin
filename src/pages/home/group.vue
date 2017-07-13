<template>
    <div class="home-group">
        <div class="home-head-bc">
            <img class="home-img" src="../../assets/images/home_recommend_icon.png">
            <div class="home-text">推荐小组</div>
        </div>

        <div class="home-sc-item">
            <!--item.background-->
            <ul class="clearfix" :style="{width:dataWidth+'px'}">
                <li v-for="(item,index) in recommendGroupList" :key="index" @click="allGroup(item.name, item.id)"
                    :style="{background: 'url('+item.background+') 0% 0% / 100% 100% no-repeat'}"
                    :class="index===groupListLength ? 'item-more':'item-bg'"
                   >

                    <div v-if="index!=groupListLength">
                        <div class="item-text" v-text="item.name"></div>
                        <div class="item-num" v-text="'关注 : ' + item.memberCount">
                        </div>
                    </div>
                    <div v-else class="item-num-more">
                        <div class="item-num-more-top">更多</div>
                        <div class="item-num-more-bom">小组</div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="home-line"></div>
        <div class="everyone-chat">
            <img class="everyone-img" src="../../assets/images/home_chat_icon.png">
            <div class="everyone-text">大家都在聊</div>
        </div>
    </div>
</template>

<script>
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    export default{
        data(){
            return {
                data: [{name: "在意财富"}, {name: "在意财富"}, {name: "在意财富"}, {name: "在意财富"}, {name: "全部小组"}],
                dataWidth: 100,
                recommendGroupList: [],//推荐小组List
                groupListLength: 0,
            }
        },
        mounted: function () {
            //获取推荐小组$recommendGroup
            this.recommendGroup();
//            this.calWidth();
        },
        methods: {
            //获取推荐小组
            recommendGroup: function () {
                var _this = this;
                API.$recommendGroup(res=> {
                    if (res.head.code == 0) {
                        UTIlS.log('获取推荐小组', res);
                        _this.recommendGroupList = res.body.list;
                        _this.recommendGroupList.push({"id": 2, "name": "", "icon": "", "backgroundImg": ""})
                        let len = _this.recommendGroupList.length;
                        _this.groupListLength = res.body.list.length - 1;
                        this.dataWidth = len * 130 + 50;
                    }
                });
            },
//            calWidth:function () {
//                let len = this.recommendGroupList.length;
//                this.dataWidth = len * 90 + 90;
//            },
            allGroup: function (name, id) {

                if (name == '') {
                    this.$router.push({name: 'allGroup'});
                } else {
                    this.$router.push({name: 'groupDetail', params: {'groupId': id}});

                }
            }
        },

//        computed:{
//            dataWidth:function () {
//                var  _this = this;
//                let len = _this.recommendGroupList.length;
//                this.dataWidth = len * 90 + 90;
//                return len * 90 + 90;
//            }
//    }

    }
</script>
<style>
    /* 清除浮动 */
    .clearfix:before, .clearfix:after {
        content: "";
        display: table;
    }

    .clearfix:after {
        clear: both;
        overflow: hidden;
    }

    .clearfix {
        zoom: 1; /* for ie6 & ie7 */
    }

    .home-group {
        width: 100%;
        background-color: white;
        border-bottom: 1px solid #eeeeee;
    }

    .home-group .home-head-bc {
        width: 100%;
        height: 35px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .home-group .home-head-bc .home-img {
        width: 14px;
        height: 13px;
        margin-left: 10px;
        margin-right: 5px;
    }

    .home-group .home-head-bc .home-text {
        font-size: 12px;
        color: #1d1d1d;
        display: inline-block;

    }

    .home-group .home-sc-item {
        width: 100%;
        border-bottom: 1px solid #eeeeee;
        overflow-x: auto;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .home-group .home-sc-item ul .item-bg{
        list-style: none;
        width: 130px;
        height: 60px;
        line-height: 60px;
        margin-left: 10px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        float: left;
    }

    .home-group .home-sc-item ul .item-more {
        list-style: none;
        width: 40px;
        height: 60px;
        margin-left: 10px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        float: left;
    }
    .home-group .home-sc-item ul .item-bg .item-text {
        width: 130px;
        margin-top: 5px;
        line-height: 20px;
        font-size: 14px;
        color: #FFFFFF;
        margin-left: 10px;
        text-align: left;
    }

    .home-group .home-sc-item ul .item-more .item-text-more {
        width: 40px;
        line-height: 30px;
        font-size: 14px;
        color: #131313;
        margin-left: 10px;
        text-align: center;
        background-color: #E4E4E4;
        border-radius: 3px 3px 0 0;
    }

    .home-group .home-sc-item ul .item-bg .item-num {
        width: 130px;
        line-height: 20px;
        margin-top: 5px;
        text-align: left;
        font-size: 9px;
        color: #FFFFFF;
        margin-left: 10px;
    }

    .home-group .home-sc-item ul .item-more .item-num-more {
        width: 40px;
        height: 60px;
        text-align: center;
        font-size: 14px;
        margin-top: -1px;
        color: #131313;
        margin-left: 10px;
        background-color: #E4E4E4;
        padding-top: 0px;
        border-radius: 3px 3px 3px 3px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    .home-group .home-sc-item ul .item-more .item-num-more .item-num-more-top {
        height: 18px;
        margin-top: 0;
        align-self: center;

    }

    .home-group .home-sc-item ul .item-more .item-num-more .item-num-more-bom {
        height: 18px;
        align-self: center;
    }

    .home-group .home-line {
        width: 100%;
        height: 5px;
        background-color: #F6F6F6;
        border-bottom: 1px solid #eeeeee;
    }

    .home-group .everyone-chat {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

    }

    .home-group .everyone-chat .everyone-img {
        width: 11px;
        height: 15px;
        margin-left: 10px;
        align-self: center;
    }

    .home-group .everyone-chat .everyone-text {
        font-size: 12px;
        color: #131313;
        margin-left: 5px;
        align-self: center;
    }
</style>