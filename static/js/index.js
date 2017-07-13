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
  });
});


