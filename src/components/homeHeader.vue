<template>
    <div class="home-nav">

                    <router-link  to="/" >
                        <div @click="push()"  :class="isPushSle ? 'home-left-sel':''" class="home-left">
                            <a class="home-left-text">推荐</a>
                        </div>
                    </router-link>
                    <router-link to="/"  >
                        <div  @click="attention()" :class="isAttention ? 'home-right-sel':''" class="home-right">
                            <a  class="home-right-text">关注</a>
                        </div>
                    </router-link>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                isPushSle:true,
                isAttention:false

            }
        },
        components:{

        },
        methods:{
            push:function () {
                this.isPushSle = true,
                        this.isAttention = false

            },
            attention:function () {
                this.isPushSle = false,
                        this.isAttention = true
            }
        }
    }
</script>
<style>
    .home-nav{
        width:100%;
        flex-direction: row;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
    }
    .home-nav .home-left{
        width: 60px;
        align-self: center;
        text-align: center;
        height: 30px;
    }

    .home-nav .home-left .home-left-text{
        font-size: 14px;
        color: #d2a056;
        width: 60px;

    }
    .home-nav  .home-left-sel{
        border-bottom: 3px solid #d2a056;
    }
    .home-nav .home-right{
        width: 60px;
        align-self: center;
        text-align: center;
        height: 30px;
    }

   .home-nav .home-right-sel{
       border-bottom: 3px solid #d2a056;
   }
    .home-nav .home-right .home-right-text{

        font-size: 14px;
        color: #d2a056;
        width: 60px;
        text-align: center;
    }


</style>