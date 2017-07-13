<template>
    <div class="foot-Input-wrapper">
        <input class="chat-input" placeholder="请输入你的你要发送的信息" type="text" name="" @keyup.enter="send(inputMsg)" v-model="inputMsg">
        <span class="chat-sub" @click="send(inputMsg)">发送</span>
    </div>
</template>

<script>
    import * as UTIlS from '../../common/utils'
    import {hex_md5} from '../../common/md5.js'
    import * as API from '../../store/api.js'
    import { Toast, MessageBox } from 'mint-ui';
    import * as CONFIG from '../../common/config'
    var  getConfig = CONFIG.fetchConfigObj()
    //    let firIntervalId;
    //    let senIntervalId;
    //    let threeIntervalId;

    export default {
        data () {
            return {
                inputMsg:'',
                tel:'',
                pwd:'',
                verifyCode:'',
                type:2001,
                process:0,
                count:1,
            }
        },
        ready(){

        },
        methods: {

            send: function (inputMsg) {
                var  _this = this;
                alert(_this.process)
                alert(inputMsg)
                if (_this.process==0){
                    // 注册流程(1)本地校验手机号码
                    if (inputMsg.length==0){
                        _this.$store.dispatch('reginList', {
                            obj:{
                                type:1,
                                content:getConfig.B_2_2_2
                            }
                        });
                        return;
                    }
                    if(!UTIlS.checkTel(inputMsg)){
                        _this.$store.dispatch('reginList', {
                            obj:{
                                type:2,
                                content:inputMsg
                            }
                        });
                        _this.$store.dispatch('reginList', {
                            obj:{
                                type:1,
                                content:getConfig.B_2_2_2
                            }
                        });
                        return false;
                    }
                    _this.$store.dispatch('reginList', {
                        obj:{
                            type:2,
                            content:inputMsg
                        }
                    });
                    //   注册流程(2)绑定手机号在系统中的状态
                    API.$mobileStatus(inputMsg,res=>{
                        console.log('校验手机号在系统中的状态'+JSON.stringify(res))
                        if (res.body.status == 100) {//未注册
                            _this.$store.dispatch('reginList', {
                                obj: {
                                    type: 1,
                                    content: getConfig.B_2_2
                                }
                            });
                            MessageBox.confirm(getConfig.B_2_2).then(action => {
                                //注册步骤2获取验证码
                                API.$downVerifyCode(inputMsg,2001,res=>{
                                    console.log('注册获取验证码'+JSON.stringify(res))
                                    if(res.code.code==0){
                                    _this.$store.dispatch('reginList', {
                                        obj:{
                                            type:1,
                                            content:getConfig.B_3_3
                                        }
                                     });
                                    }
                                })
                                _this.tel = inputMsg;
                                _this.inputMsg = '';
                                _this.process=1;//未注册
                            });

                        } else if (res.body.status == 101) {// 已注册
                            MessageBox.confirm(getConfig.C_2_1).then(action => {

                                        _this.$store.dispatch('reginList', {
                                            obj:{
                                                type:1,
                                                content:getConfig.C_2_1
                                            }
                                        });
                                _this.tel = inputMsg;
                                _this.inputMsg = '';
                                _this.process=3;//已注册
                            });

                        } else {
                        }
                    })
                }else if(_this.process==1) {//注册流程(3)获取验证码 (1-2注册流程)

                    _this.verifiCode = inputMsg
                    _this.$store.dispatch('reginList', {
                        obj:{
                            type:2,
                            content:inputMsg
                        }
                    });
                    //注册流程（4）校验验证码
                    API.$checkVerifyCode(_this.tel,inputMsg,_this.type,res=>{
                        console.log('验证码校验成功'+JSON.stringify(res))
                        if (res.head.code==0) {

                            _this.$store.dispatch('reginList', {
                                obj:{
                                    type:1,
                                    content:getConfig.B_3_6
                                }
                            });
                            _this.verifiCode = inputMsg;
                            _this.inputMsg = '';
                            _this.process=2;
                        }
                    })
                }else if (_this.process==2) {
                    //注册流程（4）校验验证码成功，提交注册
                    API.$login(_this.tel,_this.verifiCode,inputMsg,res=>{
                        console.log('注册成功'+JSON.stringify(res))
                        if (res.head.code==0) {
                            this.$router.push({name: 'Chatlist'});
                        }
                    })
                }else  if(_this.process==3) {//已经注册去登录
                    var pwd= hex_md5(inputMsg).toUpperCase();
                    API.$login(_this.tel, pwd, 1001, res=> {
                        console.log('登录成功' + JSON.stringify(res))
                        if (res.head.code == 0) {
                            Toast({
                                message: '登录成功',
                                duration: 1000
                            });
//                            this.$router.push({name: 'Chatlist'});
                            _this.$store.dispatch('updateUserInfo', {
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
            }
        }
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
