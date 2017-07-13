<template>
    <div class="foot-wrapper">
        <div @click="send(msg)" class="select-msg" v-for="item in data" v-text="item.msg"></div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg:1,
                data:[{msg:'聊点别的吧'},{msg:'你可以的，换个试试呗'}]
            }
        },

        ready(){

        },
        methods:{

            send:function (msg) {
                if (msg==1){

                    this.msg = 2

                }else {
                    this.msg=1
                }

//                this.$store.dispatch('sendMsg', {
//                    msg: msg
//                });

                setTimeout(function () {
                }, 5000)
//        for (var i = 0; i < 3 ;i++) {
//          if (i==0){
//            setTimeout(this.refresh(), 1000);
//            console.log('发送开始');
//          }else if (i==1){
//            setTimeout(this.refresh(), 16000);
//            console.log('发送开始');
//          }else {
//            setTimeout(this.refresh(), 100000);
//            console.log('发送开始');
//          }
//
//        }
//                this.flyTo("#productImg", "#aside_compare");
            },
            refresh:function (msg) {
                this.$store.dispatch('login', {
                    msg: msg
                });
            },/**
             * 发送飞入动画
             * @param from 飞入的id
             * @param target 目标飞入的id
             * @param callback 动画完成回调
             */
//            flyTo:function(from, target , callback) {
//                var flyElm = this.$(from).clone().css('opacity', '0.7');
//                flyElm.css({
//                    'z-index': 99999,
//                    'display': 'block',
//                    'position': 'absolute',
//                    'top': this.$(from).offset().top + 'px',
//                    'left': this.$(from).offset().left + 'px',
//                    'width': this.$(from).width() + 'px',
//                    'height': this.$(from).height() + 'px'
//                });
//                this.$('body').append(flyElm);
//                flyElm.animate({
//                    top: this.$(target).offset().top,
//                    left: this.$(target).offset().left,
//                    width: 50,
//                    height: 50
//                }, 'slow','swing',function(){
//                    flyElm.hide();
//                });
//            },
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less'>

    .foot-wrapper{
        background-color: #ffffff;
        height: 40px;
        width: 100%;
        flex-shrink:0;
        display: flex;
        padding: 10px 0px;
        justify-content: center;
        border-top: solid 1px rgba(0,0,0,0.1);
      .select-msg{

          background-color: #d2a056;
          padding: 10px 0;
          padding-left: 8px;
          padding-right: 8px;
          border-radius: 20px 20px 0 20px;
          margin-right: 15px;

      }
    }
</style>
