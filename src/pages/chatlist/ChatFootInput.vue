<template>

    <div class="chat-Input-wrapper">
        <input class="chat-list-input" placeholder="请输入您要查询的问题" type="text" name="" @keyup.enter="send(inputMsg)"
               v-model="inputMsg">
        <span class="chat-list-sub" @click="send(inputMsg)">发送</span>
    </div>

</template>

<script>
    import * as UTIlS from '../../common/utils'
    import {hex_md5} from '../../common/md5.js'
    import * as API from '../../store/api.js'
    import {Toast, MessageBox, Popup} from 'mint-ui';
    import * as CONFIG from '../../common/config'
    import * as types from '../../store/types'
    var getConfig = CONFIG.fetchConfigObj()

    let firIntervalId;
    let senIntervalId;
    let threeIntervalId;
    let fourthIntervalId;
    export default {
        data () {
            return {
                msg: 1,
                inputMsg: '',
                tel: '',
                pwd: '',
                type: 1001,
                process: 0,
                count: 1,
                popupVisible: true
            }
        },
        ready(){

        },
        created: function () {

            var firstid = UTIlS.getFisrtId();
            var _this = this;
            if (firstid != types.FIRST_ENTER) {
                for (var i = 0; i < 2; i++) {
                    if (i == 0) {
                        let content = getConfig.d_1_11
                        firIntervalId = setInterval(function () {
                            _this.firNumInterval(content, 1, "");

                        }, 1000);
                    }
                    if (i == 1) {
                        let content = getConfig.d_1_12
                        senIntervalId = setInterval(function () {
                            _this.setNumInterval(content, 1, "");

                        }, 2000);

                    }
                    if (i == 2) {
                        let content = getConfig.d_1_13
                        threeIntervalId = setInterval(function () {
                            _this.threeNumInterval(content, 1, "");
                        }, 3000);
                    }
                    UTIlS.setFisrtId(types.FIRST_ENTER)
                }
            } else {
                _this.$store.dispatch('chat', {
                    obj: {
                        type: 4,
                        content: '',
                        imageUrl: ''
                    }
                });
            }
        },
        methods: {

            send: function (inputMsg) {

                if (window.navigator.onLine == false) {
                    Toast({
                        message: '网络连接失败',
                        duration: 1000
                    });
                    return;
                }
                var _this = this;
                if (inputMsg.length == 0) {
                    Toast({
                        message: '请输入您要查询的问题',
                        duration: 1000
                    });
                    return;
                }
                _this.$store.dispatch('chat', {
                    obj: {
                        type: 3,
                        content: inputMsg,
                        imageUrl: ''
                    }
                });
                _this.inputMsg = "";
                var list = [];
                API.$questionSearch(inputMsg, res=> {
                    list = res.body.list;
                    for (var i = 0; i < list.length; i++) {
                        if (i == 0) {
                            let content = list[0].content;
                            let imageUrl = list[0].imageUrl;
                            let msgType = list[0].msgType;
                            firIntervalId = setInterval(function () {
                                _this.firNumInterval(content, msgType, imageUrl);

                            }, 1000);
                        }
                        if (i == 1) {
                            let content = list[1].content;
                            let imageUrl = list[1].imageUrl;
                            let msgType = list[1].msgType;
                            senIntervalId = setInterval(function () {
                                _this.setNumInterval(content, msgType, imageUrl);

                            }, 2000);
                        }
                        if (i == 2) {
                            let content = list[2].content;
                            let imageUrl = list[2].imageUrl;
                            let msgType = list[2].msgType;
                            threeIntervalId = setInterval(function () {
                                _this.threeNumInterval(content, msgType, imageUrl);
                            }, 3000);
                        }
                        if (i == 3) {
                            let content = list[3].content;
                            let imageUrl = list[3].imageUrl;
                            let msgType = list[3].msgType;
                            fourthIntervalId = setInterval(function () {
                                _this.fourthIntervalId(content, msgType, imageUrl);
                            }, 4000);
                        }
                    }
                })
            },


            firNumInterval: function (item, msgType, imageUrl) {
                var _this = this;
                _this.count--;
                if (_this.count <= 0) {
                    _this.$store.dispatch('chat', {
                        obj: {
                            type: msgType,
                            content: item,
                            imageUrl: imageUrl
                        }
                    });
                    _this.count = 1;
                    clearInterval(firIntervalId);

                }
            },
            setNumInterval: function (item, msgType, imageUrl) {
                var _this = this;
                _this.count--;
                if (_this.count <= 0) {
                    _this.$store.dispatch('chat', {
                        obj: {
                            type: msgType,
                            content: item,
                            imageUrl: imageUrl
                        }
                    });
                    _this.count = 1;
                    clearInterval(senIntervalId);
                }
            },
            threeNumInterval: function (item, msgType, imageUrl) {
                var _this = this;
                _this.count--;
                if (_this.count <= 0) {
                    _this.$store.dispatch('chat', {
                        obj: {
                            type: msgType,
                            content: item,
                            imageUrl: imageUrl
                        }
                    });
                    _this.count = 1;

                    clearInterval(threeIntervalId);
                }

            },
            fourthIntervalId: function (item, msgType, imageUrl) {
                var _this = this;
                _this.count--;
                if (_this.count <= 0) {
                    _this.$store.dispatch('chat', {
                        obj: {
                            type: msgType,
                            content: item,
                            imageUrl: imageUrl
                        }
                    });
                    _this.count = 1;

                    clearInterval(fourthIntervalId);
                }

            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

    .chat-Input-wrapper {
        display: flex;
        background-color: #ffffff;
        height: 40px;
        width: 100%;
        flex-shrink: 0;
        flex-direction: row;
        padding: 6px 0px;
        justify-content: space-around;
        align-items: center;
        border-top: solid 1px rgba(0, 0, 0, 0.1);

    }

    .chat-Input-wrapper .chat-list-input {
        height: 100%;
        width: 75%;
        border-radius: 4px;
        box-sizing: border-box;
        padding-left: 8px;
        border: solid 1px rgba(0, 0, 0, 0.1);

    }

    .chat-Input-wrapper .chat-list-sub {
        background-color: #d2a056;
        height: 100%;
        width: 18%;
        border-radius: 4px;
        outline: none;
        line-height: 40px;
        text-align: center;
        color: white;
    }

    /*.primary{*/
    /*background-color: #3CAF36;*/
    /*}*/

</style>
