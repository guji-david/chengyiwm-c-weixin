<template name="fade">
    <div class="head_nav">
        <div class="nar_arr" @click="goBack()">
            <img class="nav_arrow"src="../../assets/images/back.png" >
        </div>
        <div class="nav_text" v-text="headTitle"></div>
        <div class="nav-ringht"></div>
    </div>
</template>
<script>
    export default {
        name: 'head',
        props: ['headTitle'],
        data() { //属性
            return {
            }
        },
        /**
         * 初始化工作
         */
        mounted() {

        },
        /**
         *  方法
         */
        methods: {
            goBack:function () {
               this.$router.push({name: 'Home'});
            },

        }
    }
</script>

<style scoped lang="less">
    .head_nav{
        background: white;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
    .nar_arr{
        width: 15%;
    .nav_arrow{
        width: 9px;
        height: 19px;
        margin-left: 15px;
    }

    }
    .nav_text{
        width: 70%;
        text-align: center;
        font-size: 18px;
    }
    .nav-ringht{
        width: 15%;

    }
    }
</style>
