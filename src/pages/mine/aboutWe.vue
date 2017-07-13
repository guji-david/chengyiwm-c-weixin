<template>
    <div class="about-we">
        <NavHeader :headTitle="findPwdTitle"  ></NavHeader> <div class="about-line"></div>
        <img class="about-image" src="../../assets/images/log.png">
       <div  class="version">当前版本: 0.3.0</div>
        <div  class="name">诚壹泰合（北京）科技有限公司</div>
        <div  class="weibo">微博: 在意财富</div>
        <div  class="weibo">微信公众号: 在意财富</div>
        <div  class="weibo">合作联系邮箱: zaiyicaifu@chengyiwmi.com</div>
        <div  class="weibo">BUG反馈邮箱: zaiyicaifu@chengyiwmi.com</div>
    </div>
</template>
<style>
    .about-we{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 40px;

    }
    .about-we .about-line{
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
        margin-top: 1px;
    }
    .about-we .about-image{

        align-self: center;
        width: 83px;
        height: 88px;
        border-radius: 25px;
        margin-top: 24px;

    }
    .about-we .version{
        color: #a1a1a1;
        font-size: 14px;
        margin-top: 10px;
    }
    .about-we .name{
        color: #474747;
        font-size: 14px;
        margin-top: 24px;
    }
    .about-we .weibo{
        color: #474747;
        font-size: 14px;
        margin-top: 8px;
    }
</style>
<script>
    import  NavHeader from '../../components/navHeader'
    export default{
        data(){
            return{
                findPwdTitle:'关于在意财富'
            }
        },
        components:{
            NavHeader,
        }
    }
</script>
