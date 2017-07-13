<template>
    <div class="system">
        <NavHeader :headTitle="navTitle" ></NavHeader>
         <ul class="null-content">
            <img class="null-content-img" src="../../assets/images/null-system.png">
             <div class="null-content-text">还没有消息,去其他地方看看吧!</div>
         </ul>
    </div>
</template>
<style>
    .system{
        width: 100%;
        padding-top: 40px;
    }
    .system .null-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
    .system .null-content .null-content-img{
        width: 160px;
        height: 135px;
        margin-top: 100px;
    }
    .system .null-content .null-content-text{
  font-size: 14px;
        color: #909090;
        margin-top: 20px;
    }
</style>
<script>
    import  NavHeader from '../../components/navHeader'
    import { MessageBox } from 'mint-ui';
    import { mapGetters, mapActions } from 'vuex'
    import * as API from '../../store/api.js'
    import * as UTIlS from '../../common/utils'
    export default{
        data(){
            return{
                navTitle:'系统消息'

            }
        },
        components:{
            NavHeader
        }
    }
</script>
