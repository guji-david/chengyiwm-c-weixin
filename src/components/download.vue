<template>
    <div class="download">
        <div class="downLoad-bc">
            <button class="down-btn" @click="down()"></button>
        </div>
    </div>
</template>
<style>
    .download{
width: 100%;
        height: 100%;
    }
    .download .downLoad-bc{

        height: 100%;
        height: 100%;
        background: url(../assets/images/downLoad.jpg);
        background-size: 100% 100%;
        -moz-background-size: 100% 100%; /* 老版本的 Firefox */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .download .downLoad-bc .down-btn{
        width: 80%;
        height: 120px;
        margin-top: 30%;

    }
</style>
<script>

    export default{
        data(){
            return{

            }
        },
        components:{

        },
        methods:{
            down:function () {

                window.location.href = "https://itunes.apple.com/us/app/%E5%9C%A8%E6%84%8F%E8%B4%A2%E5%AF%8C/id1211048255?l=zh&ls=1&mt=8"

            }

        }
    }
</script>
