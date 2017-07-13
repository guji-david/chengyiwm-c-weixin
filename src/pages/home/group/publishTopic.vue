<template>
    <div class="main-wrapper">
        <div class="nav">
            <div class="nav-head">
                <div @click="goBack()" class="head-arrow">
                    <img class="nav_arrow1" src="../../../assets/images/back.png"></div>
                <div class="nav-regin">发布帖子</div>
                <button  :disabled="publishDisabled" @click="publish()" class="nan-right">发布</button>
            </div>
        </div>
        <div>
            <div class="publish-article-title">
                <input type="text" id="title" style="font-size: 14px;color: #909090" class="title-input"
                       placeholder="文章标题(不超过36个字符)">
            </div>
            <div class="">
                <input type="hidden" id="target">
                <input  type="hidden" id="targetText">
                <div class="article-content" id="content">
                </div>
            </div>
            <div class="footer-btn g-image-upload-box" id="container">
                <ul class="button-list">
                    <li class="button-item">
                        <span class="upload"><i class="upload-img"></i></span>
                        <input class="input-file" id="imageUpload" type="button"
                               style="position:absolute;left:0;opacity:0;width:50px;height: 50px;">
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import $ from 'jquery'
    import '../../../../static/js/extend'
    import Vue from 'vue'
    import * as API from '../../../store/api.js'
    import * as UTIlS from '../../../common/utils'
    import {MessageBox, Toast,Indicator} from 'mint-ui';

    export default {
        name: 'hello',
        data () {
            return {
                title: '',
                content: '',
                type: '',
                groupId: '',
                topicId: '',
                brief: '',
                thumb: '',
                publishDisabled:false,
            }
        },
        mounted(){
            this.groupId = this.$route.params.groupId;
            this.topicId = this.$route.params.topicId;
            this.type = this.$route.params.type;
             this.initEditor();
        },
        components: {},
        methods: {
            publish: function () {
                var _this = this;
                _this.title = $("#title").val();
                _this.content = $("#target").val();
                _this.thumb = _this.getThumImg(_this.content);

                _this.brief = $("#targetText").val();
//        alert('brief-->'+_this.brief);
                _this.brief = _this.brief.substring(0, 200);
//         alert('thumb--》'+_this.thumb);
//           alert('发布内容' + _this.content);

                var  isEmpty =  _this.content.substring(0, 5);

                if (_this.title.length == 0) {
                    Toast({
                        message: '标题不能为空',
                        duration: 1000
                    });
                    return;
                }
                if (_this.content.length == 0) {
                    Toast({
                        message: '发布内容不能为空',
                        duration: 1000
                    });
                    return;
                }
                if (isEmpty.indexOf('<div>')>= 0||isEmpty.indexOf('&')>= 0){
                    Toast({
                        message: '发布内容不能为空',
                        duration: 1000
                    });
                    return;
                }
                Indicator.open();
                this.publishDisabled = true;
                API.$publishTopic(_this.title, _this.content, _this.type, _this.groupId, _this.topicId, _this.brief, _this.thumb, res=> {
                UTIlS.log('发布话题', res);
                    if (res.head.code == 0) {
                        Toast({
                            message: '发布成功',
                            duration: 1000
                        });
                        Indicator.close();
                        this.$router.go(-1);
                        this.publishDisabled = false;
                    }else if (res.head.code == -10015||res.head.code == -10016) {
                        UTIlS.clearUserData(function (){});
                        this.$router.push({name: 'loginA'});
                        return;
                    } else {
                        Toast({
                            message: res.head.msg,
                            duration: 1000
                        });
                        this.publishDisabled = false;
                    }

                })
            },
            goBack: function () {
                this.$router.go(-1);
            },
            initEditor() {
                $('#content').artEditor({
                    imgTar: '#imageUpload',
                    limitSize: 5,   // 兆
                    showServer: true,
                    uploadUrl: 'http://localhost/PROJECT_OWN/NodeJS/artEditor/service/service.php',
                    data: {},
                    uploadField: 'image',
                    placeholader: '<p style="color:#ccc;margin-left: 10px;margin-top: 10px;margin-right: 10px">请输入内容(你还是新用户，发帖子需要审核)</p>',
                    validHtml: ["<br/>"],
                    formInputId: 'target',
                    formTextId:'targetText',
                });
            },
            getThumImg: function (htmlContent) {

                var imgReg = /<img.*?(?:>|\/>)/gi;
                var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                var arr = htmlContent.match(imgReg);
                var thumb = "";
                if (arr && arr.length > 0) {
                    var src = arr[0].match(srcReg);
                    if (src[1]) {
                        thumb = src[1];
                        //console.log(thumb);
                    }
                }
                return thumb;
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../../../static/css/style.css";

    body {
        background: #fff;
    }

    .nav {
        width: 100%;
        height: 40px;
        background-color: white;
        border-bottom: 1px solid #eeeeee;

    }

    .nav .nav-head {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .nav .nav_arrow1 {
        display: inline-block;
        width: 10%;
        margin-left: 10px;
        margin-top: 10px;
        width: 9px;
        height: 19px;
    }

    .nav .nav-regin {
        width: 80%;
        margin-top: 0;
        line-height: 40px;
        text-align: center;
        color: black;
        display: inline-block;

    }

    .nav .nan-right {
        width: 10%;
        font-size: 14px;
        margin-right: 10px;
        align-self: center;
        text-align: center;
        color: #131313;
    }


</style>
