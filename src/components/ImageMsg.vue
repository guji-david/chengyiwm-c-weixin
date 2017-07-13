<template>
    <div class="image-wrap">
        <!--<div class="msg">{{msg}}</div>-->
        <img @click="showFade()" class="msg" :src="msg">
        <div @click="showFade()" v-show="isShowFade" class="cy_modal">
            <div v-show="isShowFade" class="display-content-center"><img v-show="isShowFade"  :src="msg" class="showImg"></div>

        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isShowFade:false

            }
        },
        ready(){
            this.$el.scrollIntoView()
        },
        props:["msg"],
        methods:{
            showFade:function () {
                this.isShowFade = !this.isShowFade
            },

        }
    }
</script>
<style lang='less'>
    .image-wrap{
        position: relative;
        overflow: hidden;
        background-color:  #f6f6f6;
        padding: 8px 5px 8px 5px;

    .msg{

        position: relative;
        animation:otherAnimation 0.8s;
        -moz-animation:otherAnimation 0.8s;
        -webkit-animation:otherAnimation 0.8s;
        -o-animation:otherAnimation 0.8s;
        /*animation-fill-mode : forwards*/

        /*display: inline-flex;*/
        float: left;
        padding-left: 8px;
        padding-right: 8px;
        padding: 10px;
        left: 15px;
        max-width: ~'calc(100% - 100px)';
        background-color: #fff;
        color: #202020;
        font-size: 14px;

        border-radius: 22px 22px 22px 0px;
    }
    @keyframes otherAnimation
    {
        0%   {background:#fff; left:-80px; top:0px;}
        100%  {background:#fff; left:15px; top:0px;}

    }

    @-moz-keyframes otherAnimation /* Firefox */
    {
        0%   {background:#fff; left:-80px; top:0px;}
        100%  {background:#fff; left:15px; top:0px;}

    }

    @-webkit-keyframes otherAnimation /* Safari and Chrome */
    {
        0%   {background:#fff; left:-80px; top:0px;}
        100%  {background:#fff; left:15px; top:0px;}


    }

    @-o-keyframes myfirst /* Opera */
    {
        0%   {background:#fff; left:-80px; top:0px;}
        100%  {background:#fff; left:10px; top:0px;}
    }
    .cy_modal {
        position: fixed;
        top: 0;
        bottom:0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 10;
    .display-content-center{

        width: 100%;
        height: 150%;
        display: flex;
        flex-direction: column;
        justify-content: center;
     .showImg{
        width: 100%;

          }
       }

     }
    }
</style>
