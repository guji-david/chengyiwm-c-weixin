<template>
    <div class="empty-page">
       <img class="empty-page-img" :src="img">
        <div class="empty-page-text" v-text="title"></div>
    </div>
</template>
<style>
   .empty-page{
       width: 100%;
       height: 100%;
       margin-top: 40%;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
   }
    .empty-page .empty-page-img{
       align-self: center;
    }
    .empty-page .empty-page-text{
        font-size: 15px;
        color: #BABABA;
        margin-top: 20px;
        text-align: center;
    }
</style>
<script>

    export default{
        props: ['img','title'],
        data(){
            return{

            }
        },
        components:{

        }
    }
</script>
