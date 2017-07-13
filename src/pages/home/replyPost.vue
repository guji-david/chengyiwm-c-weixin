<template>
    <div class="reply-content">
        <div class="top">
            <div class="nav-head">
                <div @click="goBack()" class="head-arrow">
                    <img class="nav_arrow1" src="../../assets/images/back.png"></div>
                <div class="nav-regin">发布回复</div>
                <div @click="save()"  class="nan-right">回复</div>
            </div>
        </div>

        <section class="replay-input">
            <textarea v-model="content"   class="edit-btom-input" :placeholder="placehold"></textarea>
        </section>
    </div>

</template>
<style>
.reply-content{
   width: 100%;
    height: 100%;
    background-color: white;
}
.reply-content .top {
    width: 100%;
    margin-top: 0;
    height: 40px;
    border-bottom: 1px solid #eeeeee;
}

.reply-content .top .nav-head {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.reply-content .top .nav_arrow1 {
    display: inline-block;
    width: 10%;
    margin-left: 10px;
    margin-top: 10px;
    width: 9px;
    height: 19px;
}

.reply-content .top .nav-regin {
    width: 80%;
    margin-top: 0;
    line-height: 40px;
    text-align: center;
    color: black;
    font-size: 18px;
    display: inline-block;

}
.reply-content .top .nan-right{
    width: 10%;
    font-size: 14px;
    color: #131313;
    align-self: center;
    text-align: center;
    margin-right: 10px;
}

.reply-content .replay-input{

width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

}
.reply-content .replay-input .edit-btom-input{
   width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    height: 400px;
}
</style>
<script>
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    import {Toast, MessageBox ,Indicator } from 'mint-ui';
    export default{
        data(){
            return{
                content:'',


            }
        },
        components:{

        },
        mounted(){

            //获取回复列表
        },

        methods: {
            save:function () {

                if (this.content.length ==0){
                    Toast({
                        message: '回复内容不能为空',
                        duration: 1000
                    });
                    return;
                }
//                alert(this.$route.params.targetId)
//                alert(this.$route.params.articleId)
//                alert(this.$route.params.type)
                Indicator.open();
                API.$commentPublish(this.$route.params.targetId,this.content,this.$route.params.articleId,this.$route.params.type, res =>  {
                UTIlS.log('回复帖子', res);
                    if (res.head.code == 0) {
                        Indicator.close();
                        Toast({
                            message: '回复成功',
                            duration: 1000
                        });
                        this.$router.go(-1);
                    }else if (res.head.code == -10015||res.head.code == -10016) {
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
            goBack:function () {
                this.$router.go(-1);
            },
        },
        computed:{
            placehold:function () {
                var   place= '回复'+this.$route.params.replyContent+'的帖子';
                return place;
            }
        }
    }
</script>
