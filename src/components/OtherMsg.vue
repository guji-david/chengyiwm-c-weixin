<template>
<div class="other-wrap">
  <div class="msg">{{msg}}</div>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  ready(){
   this.$el.scrollIntoView()
  },
  computed:function () {
    this.$el.scrollIntoView()
  },
  props:["msg"]
}
</script>
<style lang='less'>
.other-wrap{
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
    font-size: 15px;

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
}
</style>
