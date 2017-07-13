<template>
    <div class="regin-content">
        <!-- 这里是为了去除chrome自动填写账号密码造成的屎黄色输入框bug -->
        <input type="text" style="display:none"/>
        <input type="password" style="display:none"/>
        <div class="top"> <div class="nav-head">
            <div @click="goBack()" class="head-arrow"> <img class="find-nav_arrow" src="../../assets/images/nav_back_icon.png" ></div>
            <div class="nav-regin">忘记密码</div>
            <div class="nav-regin-ringht"></div>
        </div></div>
        <div class="bom">
            <div class="bom-top"> <img class="logo-image" src="../../assets/images/log.png"></div>
            <div class="bom-btom">

                <div class="bom-btom-phone">
                    <input v-model="phone" type="number" class="bom-btom-phone-input" placeholder="请输入手机号码"></div>
                <div class="bom-btom-code">


                    <div  class="bom-btom-code-input-bc"> <input v-model="verCode" class="bom-btom-code-input" type="number"  placeholder="请输入验证码"></div>


                    <button  @click="sendCode()" :class="getVerifyCodeDisabled?'grayColor':'nomalColor'" v-text="getVerifyCodeText" :disabled="getVerifyCodeDisabled" class="bom-btom-code-btn"></button>
                </div>

                <div class="bom-btom-find-pwd">
                    <input type="password"  v-model="pwd"  class="bom-btom-find-pwd-input" placeholder="设定新密码,6-18位">
                </div>
                <div @click="confirm()"  class="bom-btom-regin">确定</div>

            </div>
        </div>
    </div>
</template>

<script>
    import * as UTIlS from '../../common/utils'
    import {hex_md5} from '../../common/md5.js'
    import * as API from '../../store/api.js'
    import {Toast, MessageBox} from 'mint-ui';
    import * as CONFIG from '../../common/config'
    var getConfig = CONFIG.fetchConfigObj()
    let intervalId;
    export default{
        data(){
            return{
                phone:"",
                verCode:"",
                pwd:"",
                type:2003,
                count: 60,
                getVerifyCodeText: "获取验证码",
                getVerifyCodeDisabled: false,
            }
        },
        methods:{
            goBack:function () {
                this.$router.go(-1);

            },
            //发送短信验证码
            sendCode:function () {
                var _this = this;
                if (!UTIlS.checkTel(_this.phone)) {//1.1本地校验
                    Toast({
                        message: getConfig.B_2_1,
                        duration: 1000
                    });
                    return false;
                }
                //获取验证码并校验
                API.$mobileStatus(_this.phone,res=> {
                    UTIlS.log('校验手机号在系统中的状态', res);
                    if (res.head.code == 0) {
                        if (res.body.status == 101||res.body.status == 102) {//只注册
                            //注册步骤2获取验证码
                            var that = this;
                            API.$downVerifyCode(_this.phone, _this.type, res=> {
                                console.log('注册获取验证码' + JSON.stringify(res))
                                if (res.head.code == 0) {
                                    Toast({
                                        message: getConfig.B_3_3,
                                        duration: 1000
                                    });
                                    that.countDown();
                                    that.getVerifyCodeDisabled = true;
                                } else {
                                    Toast({
                                        message: getConfig.E_2_2,
                                        duration: 1000
                                    });
                                }
                            })
                        } else if (res.body.status == 100) {  //未注册

                            Toast({
                                message: getConfig.B_2_2,
                                duration: 1000
                            });
                        } else if (res.body.status == 102){

                            Toast({
                                message: "该手机号已经绑定微信，请直接登录",
                                duration: 1000
                            });
                        }else {

                        }
                    }else {

                    }
                })
            },
            countDown: function() { // 倒计时
                var _this = this;
                intervalId = setInterval(function () {
                    _this.numInterval();
                },1000);

            },
            numInterval:function() {
                this.getVerifyCodeText = this.count + '秒后重发';
                this.count--;
                if (this.count <= 0) {
                    clearInterval(intervalId);
                    this.getVerifyCodeText = '获取验证码';
                    this.getVerifyCodeDisabled = false;
                    this.count=60;
                }
            },
            //确认提交
            confirm:function () {
                var  _this = this;
                if (!UTIlS.checkTel(_this.phone)) {//1.1本地校验号
                    Toast({
                        message: getConfig.B_2_1,
                        duration: 1000
                    });
                    return false;
                }
                if (_this.verCode.length<6){//本地校验验证码
                    Toast({
                        message: getConfig.C_1_6,
                        duration: 1000
                    });
                    return;
                }
                API.$checkVerifyCode(_this.phone,_this.verCode,_this.type,res=>{
                    console.log('验证码校验成功'+JSON.stringify(res))
                    if (res.head.code !=0) {
                        Toast({
                            message: getConfig.C_1_6,
                            duration: 1000
                        });
                        return;
                    }
                })
                if (!UTIlS.checkPwd(_this.pwd)){//本地校验密码
                    Toast({
                        message: getConfig.C_5_1,
                        duration: 1000
                    });
                    return;
                }
                var pwd= hex_md5(_this.pwd).toUpperCase();
                API.$findPwd(_this.phone,pwd,_this.verCode, res=> {
                    if (res.head.code == 0) {
                        UTIlS.setUserId(res.body.userId);
                        UTIlS.setSkey(res.body.token);
                        this.$router.push({name: 'loginA'});

                    }else {
                        Toast({
                            message: res.head.msg,
                            duration: 1000
                        });
                    }
                })

            }
        }

    }
</script>
<style scoped lang="less">
    @import 'findPwdA.less';
</style>
