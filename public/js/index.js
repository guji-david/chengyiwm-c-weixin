$(function () {
    "use strict";
    $('#content').artEditor({
        imgTar: '#imageUpload',
        limitSize: 5,   // 兆
        showServer: true,
        uploadUrl: 'http://localhost/PROJECT_OWN/NodeJS/artEditor/service/service.php',
        data: {},
        uploadField: 'image',
        placeholader: '<p style="color:#ccc">请输入内容(你还是新用户，发帖子需要审核)</p>',
        validHtml: ["<br/>"],
        formInputId: 'target',
        formTextId:'targetText',
        uploadSuccess: function (res) {
            // 这里是处理返回数据业务逻辑的地方
            // `res`为服务器返回`status==200`的`response`
            // 如果这里`return <path>`将会以`<img src='path'>`的形式插入到页面
            // 如果发现`res`不符合业务逻辑
            // 比如后台告诉你这张图片不对劲
            // 麻烦返回 `false`
            // 当然如果`showServer==false`
            // 无所谓咯
            console.log("uploadSuccess data:"+res);
            var result = JSON.parse(res)
            if (result['code'] == '100') {

                return result['data']['url'];
            } else {
                switch (result['code']) {
                    case '101': {
                     alert('您的图片太大，图片太大！');
                    }
                }
            }
            return false;
        },
        qiniuOption:function(fileUploadedCallback){
        var option = {
        runtimes: 'html5,flash,html4',  
        browse_button: 'imageUpload',        
        container: 'container',             
        max_file_size: '1000mb',          
        dragdrop: false,         
        chunk_size: '0mb',     
        unique_names: false,
        save_key: false,
        uptoken:'',
        domain: 'http://7xuium.com1.z0.glb.clouddn.com/',
        get_new_uptoken: false,
        auto_start: true,  //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        log_level: 5,
        init: {
            'BeforeUpload': function (up, file) {
                $("#loading").show();
                console.log("beforeUpload.....");
            },
            // 上传成功时候的回调
            'FileUploaded': function (up, file, info) {
                console.log("FileUploaded.....");
                   $("#loading").hide();
                fileUploadedCallback(up, file, info);
            },
            //上传出错时,处理相关的事情
            'Error': function (up, err, errTip) {
                  $("#loading").hide();
                console.log("Error.....");
                alert("上传失败，请重试！");
            }
        }
        };

         return option;
        },
        uploadError: function (status, error) {
            //这里做上传失败的操作
            //也就是http返回码非200的时候
            alert('网络异常' + status)
        }
    });

});
