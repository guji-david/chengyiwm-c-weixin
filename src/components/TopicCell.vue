
<template >
    <div @click="postDetail()"  class="topic-cell-content">
        <div @click.stop="otherDetail(item.author.id)" class="avatar-content">
            <img v-if="item.author" class="avatar-img" :src="item.author.avatar" >
            <img v-else="" class="avatar-img" src="../assets/images/log.png" >
            <div class="avatar-text" v-text="item.author.nickname ? item.author.nickname : '' " ></div>
        </div>
        <div class="title-content" v-text="item.title"></div>
        <div class="detail-content" v-html="brief(item.brief)"></div>
        <div class="bottom-content">
            <ul v-if="!item.userMoments">
            <div v-if="item.group" class="bottom-left"  v-text="item.group.name" ></div>
            </ul>
            <ul v-else>
            <div v-if="item.group" class="bottom-left-userMoments" v-text="item.group.name"></div>
            </ul>
            <div class="bottom-right">
                <div class="bottom-see">
                    <div class="bottom-see-title">帖子数</div>
                    <div class="bottom-see-num" v-text="item.joinCount"></div>
                </div>
                <div class="bottom-col">
                    <div  class="bottom-col-see-title">参与数</div>
                    <div class="bottom-col-see-num" v-text="item.articleCount"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as UTIlS from '../common/utils'
    export default{
        props: ['item'],
        data(){
            return {
                group:'',
            }
        },
        components: {},
        methods:{
            postDetail:function () {
            this.$router.push({name: 'topicDetail',params:{'id':this.item.id,'fromType':0}});
          },
            otherDetail:function (id) {

                if (id == UTIlS.getUserId()){

                    this.$router.push({name: 'myHome',params:{'id':id}});

                }else {
                    this.$router.push({name: 'othersHome',params:{'id':id}});
                }
            },
            brief:function (brief) {
                if (brief.length>60){
                    var  delBreif = brief.substring(0,52) ;
                    return delBreif += '。。。';
                }else {
                    return brief ;
                }
            },
            groupName:function (group) {
                console.log('this.group'+group);
                return group.name;
            }
        },

//        activated: function () {
//           this.group  = this.item.group;
//            console.log('this.group'+this.group);
//        },

        computed:{
            timeLine:function () {
                var postTime=UTIlS.postNormalTime(this.item.createTime);//开始时间

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
                    return month + '-' + day ;
                }else if (0<hours){
                    return hours+'小时前'  ;
                }else if (0<minutes){
                    return minutes+'分钟前'  ;
                }else {
                    return '刚刚' ;
                }
            },
//            names:function () {
//                this.item.group.name
//            }

        },
    }
</script>
<style scoped>
    .topic-cell-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
        background-color: white;
    }

    .topic-cell-content .avatar-content {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-top: 10px;

    }

    .topic-cell-content .avatar-content .avatar-img {
        width: 16px;
        height: 16px;
        margin-left: 10px;
        border-radius: 8px;
        background-color: #9b9b9b;
        overflow: hidden;

    }

    .topic-cell-content .avatar-content .avatar-text {
        font-size: 12px;
        color: #131313;
        margin-left: 5px;

    }

    .topic-cell-content .title-content {
        font-size: 16px;
        color: #131313;
        margin-top: 10px;
        margin-left: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .topic-cell-content .detail-content {
        color: #909090;
        font-size: 12px;
        margin-top: 5px;
        margin-left: 10px;
        line-height: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
         overflow: hidden;

    }

    .topic-cell-content .bottom-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 10px;

    }

    .topic-cell-content .bottom-content .bottom-left {
        margin-left: 10px;
        background-color: #E2E2E2;
        font-size: 9px;
        color: #131313;
        padding: 1px 2px ;


    }
    .topic-cell-content .bottom-content .bottom-left-userMoments {
        margin-left: 10px;
        background-color: #E2E2E2;
        font-size: 9px;
        color: #131313;
        padding: 1px 2px ;


    }

    .topic-cell-content .bottom-content .bottom-right {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 140px;
        margin-right: 10px;

    }

    .topic-cell-content .bottom-content .bottom-right .bottom-see {
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

    }

    .topic-cell-content .bottom-content .bottom-right .bottom-see .bottom-see-title {
        font-size: 10px;
        color: #BABABA;
        margin-right: 5px;
        align-self: center;
    }

    .topic-cell-content .bottom-content .bottom-right .bottom-see .bottom-see-num {

        font-size: 10px;
        color: #BABABA;
        align-self: center;

    }

    .topic-cell-content .bottom-content .bottom-right .bottom-col {
        width: 40%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

    }

    .topic-cell-content .bottom-content .bottom-right .bottom-col .bottom-col-see-title {
        font-size: 10px;
        color: #BABABA;
        margin-right: 5px;
        align-self: center;
    }

    .topic-cell-content .bottom-content .bottom-right .bottom-col .bottom-col-see-num {

        font-size: 10px;
        color: #BABABA;
        align-self: center;

    }
</style>