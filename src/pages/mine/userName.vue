<template>
    <div class="userDream">
        <div class="top">
            <div class="nav-head">
                <div @click="goBack()" class="head-arrow">
                    <img class="nav_arrow1" src="../../assets/images/back.png"></div>
                <div class="nav-regin">编辑昵称</div>
                <div @click="save()"  :class="isEmpty?'name-gray':'name-black'" class="save-right">保存</div>
            </div>
        </div>
        <div class="edit-btom">
            <input @keyup="inupt()" v-model="content"  class="edit-btom-input" :placeholder="palceconTent">
        </div>
        <div style="display: inline-block" class="edit-num">{{wordCount}}<div style="display: inline-block">/8</div></div>
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
                palceconTent:'请填写你的昵称',
                content:'',
                isEmpty:true,
                wordCount:0,
            }
        },
        components: {},
        mounted: function () {
            if (this.$route.params.nickName.length==0){
                this.palceconTent ='请填写你的昵称'
            }else {
                this.content =this.$route.params.nickName
            }

        },
        methods:{
            save:function () {
                var _this = this;
                if(_this.content.length==0){
                    Toast({
                        message: '昵称不能为空',
                        duration: 1000
                    });
                    return;
                }
                if(_this.content.length>8){
                    Toast({
                        message: '昵称长度不能超过16个字符',
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
                API.$nicknameUpdate(UTIlS.getUserId(), _this.content, res=> {
                    if (res.head.code == 0) {
                        Toast({
                            message: '保存成功',
                            duration: 1000
                        });
                        this.$router.go(-1);
                    }else {
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
                if(this.wordCount >=8){
                    Toast({
                        message: '最多可输入8字',
                        duration: 1000
                    });
                }
            }
        },
        watch:function () {
        }
    }
</script>
<style  lang="less">
    .userDream {
        width: 100%;
        height: 100%;
    }

    .userDream .top {
        width: 100%;
        margin-top: 0;
        height: 40px;
        border-bottom: 1px solid #eeeeee;
    }

    .userDream .top .nav-head {
        width: 100%;
        margin-top: 5px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .userDream .top .nav_arrow1 {
        display: inline-block;
        width: 10%;
        margin-left: 10px;
        margin-top: 10px;
        width: 9px;
        height: 19px;
    }

    .userDream .top .nav-regin {
        width: 80%;
        margin-top: 0;
        line-height: 40px;
        text-align: center;
        color: black;
        display: inline-block;

    }
    .userDream .top .save-right{
        width: 10%;

        font-size: 14px;
        align-self: center;
        text-align: center;
    }
    .userDream .top .name-black{
        color: #252525;
    }
    .userDream .top .name-gray{
        color: gray;
    }
    .userDream .edit-btom{
        width: 95%;
        height: 40px;
        margin-top: 20px;
        border-bottom: 1px solid #1d1d1d;
        margin-left: 5%;

    }
    .userDream .edit-btom .edit-btom-input{

        width: 100%;
        height: 30px;

    }
    .userDream .edit-num{
        float: right;
        width: 50px;
        margin-top: 5px;
    }
</style>