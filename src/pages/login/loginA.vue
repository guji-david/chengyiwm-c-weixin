<template>
    <div class="login-content">
        <!-- 这里是为了去除chrome自动填写账号密码造成的屎黄色输入框bug -->
        <input type="number" style="display:none"/>
        <input type="password" style="display:none"/>
        <div class="content-mid">

            <div @click="seeAciton()" class="content-top-btn">随便看看吧</div>
            <div class="content-top-bom">
            <img class="logo-image" src="../../assets/images/log.png">
            <div class="top-text">在意财富</div>
            </div>
            <div class ="phone-mid" >
                <img class="phone-mid-phone" src="../../assets/images/pr_phone_icon.png">
                <input type="number" v-model="phone" class="phone-mid-text" placeholder="请输入手机号码">
            </div>
            <div class ="pwd" >
                <img class="phone-mid-phone" src="../../assets/images/pr_password_icon.png">
                <input type="password" class="phone-mid-pwd" v-model="pwd"  placeholder="请输入密码">
            </div>
            <div  @click="loginAction()" class ="loing-btn" >登录</div>
            <div @click="finPwd()" v-model="pwd" class ="find-pwd" ><div class="find">忘记密码</div></div>
            <div class="content-bom">
            <div class="bom-line"></div>
            <div @click="regin()" class="bom-text">没有账号?<div style="color: #ffffff;  display: inline-block;">点击注册</div></div>
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
    import {mapGetters, mapActions} from 'vuex'
    export default{
        data(){
            return{
                phone:"",
                pwd:"",
                type: 1001,

            }
        },
        created: function () {
            this.ths();
        },
        watch:function () {

        },
        methods:{
            ths:function () {

            },

            loginAction:function(){
                var _this = this;
                if (_this.phone.length !=11) {//1.1本地校验号
                    Toast({
                        message: getConfig.B_2_1,
                        duration: 1000
                    });
                    return false;
                }
                //    登录流程(1.2)校验手机号在系统中的状态
                API.$mobileStatus(_this.phone, res=> {
                    if (res.body.status == 100) {//未注册
                        Toast({
                            message: getConfig.B_2_2,
                            duration: 1000
                        });
                        return;
                    } else if (res.body.status == 101||res.body.status == 102) {
                        if (!UTIlS.checkPwd(_this.pwd)){//本地校验密码
                            Toast({
                                message: getConfig.C_5_1,
                                duration: 1000
                            });
                            return;
                        }
                        var pwd= hex_md5(_this.pwd).toUpperCase();
                        API.$login(_this.phone, pwd, _this.type, res=> {
                            var  _this = this;
                            console.log('登录成功' + JSON.stringify(res))
                            if (res.head.code == 0) {
                                UTIlS.setUserId(res.body.userId);
                                UTIlS.setSkey(res.body.token);
                                _this.$store.dispatch('UserLogin',{
                                  userInfo:res.body
                               });
//                         this.$router.push({name: 'chatlist'});
                                this.$router.go(-1);
                                _this.pwd = ""
                                _this.phone=""
                            } else  {
                                Toast({
                                    message: res.head.msg,
                                    duration: 1000
                                });
                            }
                        })
                    } else {
                    }
                })
            },
            seeAciton:function () {

//                this.$router.push({name: 'chatlist'});
                this.$router.go(-1);
            },
            finPwd:function () {

              this.$router.push({name: 'findPwdA'});
            },
            regin:function(){

                this.$router.push({name: 'reginA'});
            }
         }
    }
</script>
<style scoped lang="less">
    @import 'loginA.less';
</style>
