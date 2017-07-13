<template>
    <div class="app">
        <NavHeader :headTitle="findPwdTitle"></NavHeader>
        <div class="content">
            <div @click="editAvatar()" class="avatar">
                <div class="avatar-bg-line">
                    <div class="avatar-left">
                        <img class="mine-image" src="../../assets/images/mine-avatar_icon.png">
                        <div class="mine-name">头像</div>
                    </div>
                    <div class="avatar-right">
                        <img class="avatar-right-head"  :src="avatar">
                        <img class="avatar-right-image" src="../../assets/images/mine-push-icon.png">
                    </div>
                </div>
            </div>
            <div @click="userName()" class="nickname">
                <div class="avatar-bg-line">
                    <div class="avatar-left">
                        <img class="mine-image" src="../../assets/images/mine-nickname_icon.png">
                        <div class="mine-name">昵称</div>
                    </div>
                    <div class="avatar-right">
                        <input  type="text" class="avatar-right-name" v-model="nickname">
                        <img class="avatar-right-image" src="../../assets/images/mine-push-icon.png">
                    </div>
                </div>
            </div>

            <div @click="aimsAction()" class="aims">
                <div  class="avatar-bg-line">
                    <div class="avatar-left">
                        <img class="mine-image" src="../../assets/images/mine-aims-icon.png">
                        <div class="mine-name">理财目标</div>
                    </div>
                    <div class="avatar-right">
                        <div   class="avatar-right-name" v-text="slogan"></div>
                        <img class="avatar-right-image" src="../../assets/images/mine-push-icon.png">
                    </div>
                </div>
            </div>
            <div class="phones">
                <div class="avatar-bg-line">
                    <div class="avatar-left">
                        <img class="mine-image" src="../../assets/images/mine-phone-icon.png">
                        <div class="mine-name">手机号码</div>
                    </div>
                    <div class="avatar-right">
                        <div v-text="phones" type="text" class="avatar-right-name">

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    let uploader;
    /**
     * 七牛对应的bucket和url枚举
     * @type {*[]}
     */
    var QINIU_BUCKET_ENUM = {
        /**产品语音*/
        "chengyiwm-product-audio": "http://audio.chengyiwm.com/",
        /**产品文档*/
        "chengyiwm-product-documents": "http://7xudc8.com1.z0.glb.clouddn.com/",
        /**测试*/
        "chengyiwm-test": "http://7xuium.com1.z0.glb.clouddn.com/",
        /**认证名片*/
        "chengyiwm-authinfo": "http://7xujx4.com2.z0.glb.qiniucdn.com/",
        /**订单*/
        "chengyiwm-order": "http://ocnihe67r.bkt.clouddn.com/"
    };

    import  NavHeader from '../../components/navHeader'
    import * as UTIlS from '../../common/utils'
    import {hex_md5} from '../../common/md5.js'
    import * as API from '../../store/api.js'
    import {Toast, MessageBox ,Indicator } from 'mint-ui';
    import * as CONFIG from '../../common/config'
    var getConfig = CONFIG.fetchConfigObj()
    export default{

        data(){
            return {
                findPwdTitle: "修改资料",
                isShowNav: true,
                phones: "",
                slogan: "",
                nickname: "",
                avatar: '',
            }
        },
        components: {
            NavHeader
        },
        mounted(){
            //获取数据
            this.getAppInfo();
        },

        created(){
            //获取数据

        },
        methods: {
//编辑昵称
            userName(){
                this.$router.push({name: 'userName',params:{'nickName':this.nickname}});

            },
            //编辑理财目标
            aimsAction(){
                this.$router.push({name: 'editDream',params:{'dream':this.slogan}});
            },
             getAppInfo: function () {
                var _this = this;

                API.$userUpdate(UTIlS.getUserId(), res=> {
                    console.log(res)
                    var _this = this;
                    if (res.head.code == 0) {
                                _this.avatar = res.body.avatar,
                               _this.slogan = res.body.slogan,
                              _this.phones = res.body.mobile,
                                 _this.nickname = res.body.nickname
                    }
                });
            },
            //编辑头像
            editAvatar:function () {
                if(window.navigator.onLine==false){
                    Toast({
                        message: '网络连接失败',
                        duration: 1000
                    });
                    return;
                }
                var  _this = this;
                var APP = require("../../common/qiniuApp");
                uploader= APP.$QiniuUpLoad("chengyiwm-test",function (task) {
                    console.log("callback: "+JSON.stringify(task)+"  "+(typeof task));
                    console.log("task[0]._result: "+task[0]._result.key);
                    var     regImgUrls=QINIU_BUCKET_ENUM['chengyiwm-test']+task[0]._result.key;
                    _this.avatar = regImgUrls;
                    //将七牛生成的url上传到后台
                    API. $avatarUpdate(UTIlS.getUserId(),regImgUrls, res=> {
                         UTIlS.log('上传图片成功', res);
                        if (res.head.code == 0) {
                            Toast({
                                message: '上传成功',
                                duration: 1000
                            });
                        }else  {
                            Toast({
                                message: res.head.msg,
                                duration: 1000
                            });
                        }
                    });
                });
                uploader.chooseFile();

            }
        },
        activated: function () {
            this.getAppInfo();

        },
    }
</script>
<style scoped lang="less">
    @import 'modifyInfo.less';
</style>

