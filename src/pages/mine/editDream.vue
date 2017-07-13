<template>
    <div class="editDream">
        <div class="top">
            <div class="nav-head">
                <div @click="goBack()" class="head-arrow">
                    <img class="nav_arrow1" src="../../assets/images/back.png"></div>
                <div class="nav-regin">编辑理财目标</div>
                <div @click="save()" :class="isEmpty?'eidt-gray':'eidt-black'" class="nan-right">保存</div>
            </div>
        </div>
<div class="edit-btom">
    <textarea v-model="content" @keyup="inupt()"  class="edit-btom-input" :placeholder="palceconTent"></textarea>

</div>
        <div style="display: inline-block" class="edit-num">{{wordCount}}<div style="display: inline-block">/30</div></div>
    </div>
</template>

<script>
    import  NavHeader from '../../components/navHeader'
    import * as UTIlS from '../../common/utils'
    import {hex_md5} from '../../common/md5.js'
    import * as API from '../../store/api.js'
    import {Toast, MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
                wordCount:0,
                isEmpty:true,
                content:'',
                palceconTent:'填写你的理财目标'
            }
        },
        components: {},

        mounted: function () {
            if (this.$route.params.dream.length==0){
                this.palceconTent ='填写你的理财目标'
            }else {
                this.content =this.$route.params.dream
            }

        },
        methods:{
            save:function () {
                var _this = this;
                if(_this.content.length==0){
                    Toast({
                        message: '填写你的理财目标',
                        duration: 1000
                    });
                    return;
                }
                if(window.navigator.onLine==false){
                    Toast({
                        message: '网络连接失败',
                        duration: 1000
                    });
                    return;
                }
                API.$dreamUpdate(_this.content, res=> {

                    if (res.head.code == 0) {
                        Toast({
                            message: '保存成功',
                            duration: 1000
                        });
                        this.$router.go(-1);
                    }else if (res.head.code == -10015||res.head.code == -10016) {
                        this.$router.push({name: 'loginA'});
                        return;
                    } else {
                        Toast({
                            message: res.head.msg,
                            duration: 1000
                        });
                    }
                });

            },
            goBack:function () {
                this.$router.go(-1);
            },
            inupt:function () {
                this.wordCount = this.content.length;
                if(this.wordCount.length==0){
                    this.isEmpty=true
                }else {
                    this.isEmpty=false
                }
                if(this.wordCount >=30){
                    Toast({
                        message: '最多可输入30字',
                        duration: 1000
                    });
                }
            }
        }
    }
</script>
<style >
    .editDream {
        width: 100%;
        height: 100%;
    }

    .editDream .top {
        width: 100%;
        margin-top: 0;
        height: 40px;
        border-bottom: 1px solid #eeeeee;
    }

    .editDream .top .nav-head {
        width: 100%;
        margin-top: 5px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .editDream .top .nav_arrow1 {
        display: inline-block;
        width: 10%;
        margin-left: 10px;
        margin-top: 10px;
        width: 9px;
        height: 19px;
    }

    .editDream .top .nav-regin {
        width: 80%;
        margin-top: 0;
        line-height: 40px;
        text-align: center;
        color: black;
        display: inline-block;

    }
    .editDream .top .nan-right{
        width: 10%;

        font-size: 14px;
        align-self: center;
        text-align: center;
    }
    .editDream .top .eidt-gray{
        color: gray;
    }
    .editDream .top .eidt-black{
        color: #252525;
    }
    .editDream .edit-btom{
        width: 95%;
        height: 40px;
        margin-top: 30px;
        border-bottom: 1px solid #1d1d1d;
        margin-left: 5%;

    }
    .editDream .edit-btom .edit-btom-input{

        width: 95%;

        height: 40px;
    }
    .editDream .edit-num{
        float: right;
        width: 50px;
        margin-top: 5px;
    }
</style>
