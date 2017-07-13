<template>
    <div class="search-cell">
        <ul @click="publishDetail(item.id,item.type)" class="ser-cell">
            <div @click.stop="userHome(item.author.id)" class="top">
                <img v-if="item.author"  class="sear-top-img" :src="item.author.avatar">
                <div v-if="item.author" class="top-name" v-text="item.author.nickname"></div>
            </div>
            <div class="mid">
                <div :class="item.type ===0 ? 'mid-post-title' : 'mid-topic-title'" v-text="item.title"></div>
                <div class="mid-des" v-text="item.brief"></div>
            </div>
            <div class="btom">
                <div v-if="item.group" class="group-name" v-text="item.group.name"></div>
            </div>
        </ul>
    </div>
</template>
<style lang="less">
    .search-cell{
        width: 100%;
        background-color: white;
    .ser-cell{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
    .top{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-top: 10px;
        align-items: center;
    .sear-top-img{
        width: 16px;
        height: 16px;
        border-radius: 8px;
        overflow: hidden;
        background-color: #F6F6F6;
        margin-left: 10px;
    }
    .top-name{
        font-size: 12px;
        color: #131313;
        margin-left: 8px;
    }
    }
    .mid{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    .mid-post-title{
        margin-top: 10px;
        font-size: 16px;
        color: #131313;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin-left: 10px;
        margin-right: 10px;
    }
    .mid-topic-title{
        margin-top: 10px;
        font-size: 16px;
        color: #d2a056;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin-left: 10px;
        margin-right: 10px;
    }
    .mid-des{
        font-size: 12px;
        color: #909090;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 4px;
    }

    }
    .btom{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        margin-bottom: 10px;
        margin-top: 5px;
    .group-name {
        margin-left: 10px;
        background-color: #E2E2E2;
        font-size: 9px;
        color: #131313;
        padding: 0.3px 2px;
          }
        }
      }
    }
</style>
<script>
    export default{
        props: ['item'],
        data(){
            return{

            }
        },
        components:{

        },
        methods:{
            publishDetail:function (id,type) {//发表详情

                if (type==0){//帖子
                    this.$router.push({name: 'postDetail', params: {'id': id,'fromType':0}});
                }else {//话题
                    this.$router.push({name: 'topicDetail',params:{'id':id,'fromType':0}});
                }
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
