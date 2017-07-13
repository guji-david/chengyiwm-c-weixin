<template>
    <div class="foot-btn">
        <ul class="foot-btn-bc">

            <div class="home"  >
            <div class="home-colum" @click="homeSel()" >
                <img v-if="home_sel"  class="chat-img" src="../assets/images/tab_home_sel_icon.png">
                <img v-else  class="chat-img" src="../assets/images/tab_home_icon.png">
                <a :class="home_sel ? 'home_selet':'home_nomal'" >首页</a>
            </div>
                </div>

            <div class="home"  >
                <div class="home-colum" @click="chatSel()"   >
                    <img class="chat-img" v-if="cha_sel"  src="../assets/images/tab_chat_sel_icon.png">
                    <img v-else class="chat-img"  src="../assets/images/tab_chat_icon.png">
                    <a :class="cha_sel ? 'home_selet':'home_nomal'" >聊理财</a>
                </div>
            </div>

            <div class="home" >
                <div class="home-colum" @click="mineSel()"  >
                    <img class="chat-img"  v-if="mine_sel"   src="../assets/images/tab_mine_sel_icon.png">
                    <img class="chat-img" v-else   src="../assets/images/tab_mine_icon.png">
                    <a :class="mine_sel ? 'home_selet':'home_nomal'" >我的</a>
                </div>
            </div>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                home_sel:true,
                cha_sel:false,
                mine_sel:false,
                dataList:[{img:"../assets/images/tab_home_sel_icon.png",name:"首页"},{img:"../assets/images/tab_home_sel_icon.png",name:"聊理财"},{img:"../assets/images/tab_home_sel_icon.png",name:"我的"}]
            }
        },


        methods:{
            homeSel:function () {
                this.home_sel =true;
                this.cha_sel =false;
                this.mine_sel =false;

                this.$router.push({name: 'Home'});
            },
            chatSel:function () {
                this.home_sel =true;
                this.cha_sel =false;
                this.mine_sel =false;
                this.$router.push({name: 'chatlist'});
            },
            mineSel:function () {

                this.home_sel =false;
                this.cha_sel =false;
                this.mine_sel =true;
                this.$router.push({name: 'Mine'});
            }
        }
    }
</script>

<style scoped lang='less'>
    .foot-btn{
        width: 100%;
        background-color: white;
        border-top: 1px solid #eeeeee;
        position: fixed;
        z-index: 10000;
        left: 0;
        bottom: 0;
        right: 0;
        height: 49px;
    }
    .foot-btn .foot-btn-bc{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

.foot-btn .foot-btn-bc .home{
    width: 32%;
    height: 85%;
    align-self: center;
}
.foot-btn .foot-btn-bc .home .home-colum{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;


}
    .foot-btn .foot-btn-bc .home .home-colum .chat-img{
        width: 25px;
        height: 25px;
        align-self: center;
    }

    .foot-btn .foot-btn-bc .home .home-colum .home_nomal{
        color: #777777 ;
        align-self: center;
        align-self: center;
        font-size: 10px;
    }
    .foot-btn .foot-btn-bc .home .home-colum .home_selet{
        color: #d2a056 ;
        align-self: center;
        align-self: center;
        font-size: 10px;
    }


</style>