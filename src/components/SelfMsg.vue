<template>
<div class="self-wrap">
  <div name="fade" class="msg">{{msg}}</div>
  <!--<img class="fail-image" src="../assets/images/fail.png">-->
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
  props:["msg","color"]
}
</script>
<style lang='less'>
.self-wrap{
  position: relative;
  margin-top: 0;
  padding: 4px 5px 4px 5px;
  overflow: hidden;
  background-color: #f6f6f6;

  .msg{
    /*飞入动画*/
    position:relative;
    animation:selfAnimation 0.8s;
    -moz-animation:selfAnimation 0.8s;
    -webkit-animation:selfAnimation 0.8s;
    -o-animation:selfAnimation 0.8s;
    position: relative;
    right: 15px;
    float: right;
    padding: 10px;
    top: 0px;
    padding-left: 8px;
    padding-right: 8px;
    max-width: ~'calc(100% - 100px)';
    border-radius: 22px 22px 0 22px;
    background-color: #e5e5ea;
    color: #a8a8a8;
    font-size: 15px;

  }
  .fail-image{
    float: right;
    padding-right: 5px;
    width: 25px;
    height: 25px;
  }
@keyframes selfAnimation
{
  0%   {background:#e5e5ea; right:-80px; top:0px;}
  100%  {background:#e5e5ea; right:15px; top:0px;}

}

@-moz-keyframes selfAnimation /* Firefox */
{
  0%   {background:#e5e5ea; right:-80px; top:0px;}
  100%  {background:#e5e5ea; right:15px; top:0px;}

}

@-webkit-keyframes selfAnimation /* Safari and Chrome */
{
  0%   {background:#e5e5ea; right:-80px; top:0px;}
  100%  {background:#e5e5ea; right:15px; top:0px;}


}

@-o-keyframes selfAnimation /* Opera */
{
  0%   {background:#e5e5ea; right:-80px; top:0px;}
  100%  {background:#e5e5ea; right:-15px; top:0px;}

}
/*.fade-enter-active{*/
  /*opacity:1;*/
  /*background-color: red;*/
  /*width:100px;*/
  /*height:100px;*/
  /*margin-left: 100px;*/
/*}*/

/*.fade-enter{*/
  /*opacity:0;*/
  /*background-color: red;*/
  /*!*width:100px;*!*/
  /*!*height:100px;*!*/
  /*margin-left: 100px;*/
  /*margin-top: 1000px;*/
/*}*/
}
</style>
