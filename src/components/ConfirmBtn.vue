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
                data:[{msg:'取消'},{msg:'确认'}]
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
                setTimeout(function () {
                }, 5000)

            },
            refresh:function (msg) {
                this.$store.dispatch('login', {
                    msg: msg
                });
            },

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
