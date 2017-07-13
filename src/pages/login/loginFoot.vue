<template>
    <div class="foot-Input-wrapper">
        <input class="chat-input" placeholder="请输入你的你要发送的信息" type="text" name="" @keyup.enter="send(inputMsg)"
               v-model="inputMsg">
        <span class="chat-sub" @click="send(inputMsg)">发送</span>
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
    export default {
        data () {
            return {
                inputMsg: '',
                tel: '',
                pwd: '',
                verifyCode:'',
                type: 1001,
                count: 1,
                //状态
                process: 0,

            }
        },
        computed: mapGetters({
            rspLoginCode: 'rspLoginCode',
            userEntryType: 'userEntryType'
        }),
        ready(){

        },
        methods: {

            send: function (inputMsg) {
                var _this = this;
                alert(_this.process)
                alert(inputMsg)
                if (_this.userEntryType == 2001) {//用户登录
                    if (inputMsg.length == 0) {//显示用户为空信息提示
                        _this.$store.dispatch('loginList', {
                            obj: {
                                type: 1,
                                content: getConfig.B_2_2_2
                            }
                        });
                    } else {
                        if (_this.process == 0) { //步骤1
                            // 登录流程(1)本地校验手机号码
                            _this.$store.dispatch('loginList', { //用户输入信息提示
                                obj: {
                                    type: 2,
                                    content: inputMsg
                                }
                            });
                            if (!UTIlS.checkTel(inputMsg)) {//1.1本地校验号
                                _this.$store.dispatch('loginList', {
                                    obj: {
                                        type: 1,
                                        content: getConfig.B_2_2_2
                                    }
                                });
                                return false;
                            }
                            //    登录流程(1.2)校验手机号在系统中的状态
                            API.$mobileStatus(inputMsg, res=> {
                                console.log('绑定手机号在系统中的状态' + JSON.stringify(res))

                                if (res.body.status == 100) {//未注册
                                    _this.$store.dispatch('loginList', {
                                        obj: {
                                            type: 1,
                                            content: getConfig.B_2_2
                                        }
                                    });
                                    MessageBox.confirm(getConfig.B_2_2).then(action => {
                                                       //注册步骤2获取验证码
                                            API.$downVerifyCode(inputMsg,2001,res=>{
                                                console.log('注册获取验证码'+JSON.stringify(res))

                                                    alert('请输入您的验证码')
                                                _this.$store.dispatch('loginList', {
                                                        obj:{
                                                            type:1,
                                                            content:getConfig.B_3_3
                                                        }
                                                    });

                                            })

                                        _this.tel = inputMsg;
                                        _this.inputMsg = '';
                                        _this.process = 2; //未注册
                                    });

                                } else if (res.body.status == 101) {
                                   // 已注册
                                    _this.$store.dispatch('loginList', {
                                        obj: {
                                            type: 1,
                                            content: getConfig.B_1_3
                                        }
                                    });
                                    _this.tel = inputMsg;//存第一步的手机号码和当前所处步骤
                                    _this.inputMsg = '';
                                    _this.process = 1;  //已注册

                                } else {
                                }
                            })
                        } else  if( _this.process == 1) {//登录步骤2（1登录流程）
                            _this.pwd = inputMsg
                            _this.$store.dispatch('loginList', {
                                obj: {
                                    type: 2,
                                    content: ". . . . . ."
                                }
                            });
                            _this.login(_this.tel, _this.pwd, _this.type)
                        }else if( _this.process == 2){//注册步骤2验证码校验    （2-3注册流程）
                            API.$checkVerifyCode(_this.tel,inputMsg,2001,res=>{
                                console.log('校验验证码成功'+JSON.stringify(res))
                                if (res.head.code==0) {
                                    _this.$store.dispatch('reginList', {
                                        obj:{
                                            type:1,
                                            content:'请输入您的密码'
                                        }
                                    });
                                    _this.verifyCode = inputMsg;
                                    _this.inputMsg = '';
                                    _this.process=3;//注册步骤3校验验证码成功
                                }
                            })
                        }if( _this.process == 3){
                            //注册步骤4校验验证码成功，提交注册
                            API.$login(_this.tel,_this.verifiCode,inputMsg,res=>{
                                console.log('注册成功'+JSON.stringify(res))
                            })
                        }
                    }

                } else if (_this.userEntryType == 2002) {//2新用户用户注册
                    if (inputMsg.length == 0) {//显示用户为空信息提示
                        _this.$store.dispatch('loginList', {
                            obj: {
                                type: 1,
                                content: getConfig.B_2_2_2
                            }
                        });
                    } else {
                        //注册（1）判断手机号是否存在
                        if (_this.process == 0) {//步骤1

                            _this.$store.dispatch('loginList', { //用户输入信息提示
                                obj: {
                                    type: 2,
                                    content: inputMsg
                                }
                            });
                            if (!UTIlS.checkTel(inputMsg)) {//1.1本地校验手机号码
                                _this.$store.dispatch('loginList', {
                                    obj: {
                                        type: 1,
                                        content: getConfig.B_2_2_2
                                    }
                                });
                                return false;
                            }


                            API.$mobileStatus(inputMsg, res=> {//1.1数据库校验手机号码
                                console.log('判断手机号是否存在' + JSON.stringify(res))
                                if (res.head.code == 0) {//手机号已注册
                                    _this.$store.dispatch('loginList', {
                                        obj: {
                                            type: 1,
                                            content: getConfig.B_1_3
                                        }
                                    });
                                    _this.tel = inputMsg;
                                    _this.inputMsg = '';
                                    _this.process = 1;
                                } else {//未注册 提示用户是否注册
                                    _this.$store.dispatch('loginList', {
                                        obj: {
                                            type: 1,
                                            content: getConfig.B_2_2
                                        }
                                    });
                                }
                            })
                        }
                    }

                } else {//忘记密码


                }
            },

            /////////////////////////////////////////////////////////////////////////////////用户登录
            chectMobileStatus: function (inputMsg) {//校验手机号在系统中的状态
                var _this = this;
                API.$mobileStatus(inputMsg, res=> {
                    console.log('绑定手机号在系统中的状态' + JSON.stringify(res))
                    if (res.head.code == 0) {//手机号已注册
                        _this.$store.dispatch('loginList', {
                            obj: {
                                type: 1,
                                content: getConfig.B_1_3
                            }
                        });
                        _this.tel = inputMsg;
                        _this.inputMsg = '';
                        _this.process = 1;
                    } else {//未注册 提示用户是否注册
                        _this.$store.dispatch('loginList', {
                            obj: {
                                type: 1,
                                content: getConfig.B_2_2
                            }
                        });
                    }
                })
            },
            login: function (tel, pwd, type) {//用户登录
                var _this = this;
//            var pwd= hex_md5(pwd).toUpperCase();
                API.$login(tel, pwd, type, res=> {
                    console.log('登录成功' + JSON.stringify(res))

                    if (res.head.code == 0) {
                        Toast({
                            message: '登录成功',
                            duration: 1000
                        });
//                            this.$router.push({name: 'Chatlist'});
                        this.$store.dispatch('updateUserInfo', {
                            userInfo: getConfig.B_1_6
                        });
                    } else {
                        if (res.head.code == -10015) {
                            _this.$store.dispatch('loginList', {
                                obj: {
                                    type: 1,
                                    content: getConfig.B_1_7
                                }
                            });
                        }
                    }
                })
            }

        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

    .foot-Input-wrapper {
        background-color: #f1f1f1;
        height: 40px;
        width: 100%;
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        padding: 5px 0px;
        justify-content: space-around;
        border-top: solid 1px rgba(0, 0, 0, 0.1);

    .chat-input {
        height: 100%;
        width: 75%;
        border-radius: 6px;
        outline: none;
        border: none;
        box-sizing: border-box;
        padding: 5px;
        border: solid 1px rgba(0, 0, 0, 0.1);
    }

    .chat-sub {

        background-color: #d2a056;
        height: 100%;
        width: 18%;
        border-radius: 6px;
        outline: none;
        line-height: 40px;
        text-align: center;
        color: white;
    }

    /*.primary{*/
    /*background-color: #3CAF36;*/
    /*}*/
    }
</style>
