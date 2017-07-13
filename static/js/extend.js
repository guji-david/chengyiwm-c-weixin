$.fn.extend({
    _opt: {
        placeholader: '<p style="color:#ccc">请输入内容(你还是新用户，发帖子需要审核)</p>',
        validHtml: [],
        limitSize: 3,
        showServer: false
    },
    artEditor: function (options) {
        var scaleH = $(window).height();
        scaleH = scaleH - 60 ;
        var _this = this,
            styles = {
                "-webkit-user-select": "text",
                "user-select": "text",
                "overflow-y": "auto",
                "text-break": "brak-all",
                "outline": "none",
                "cursor": "text",
                "min-height": "40px",
                "padding-bottom" : "50px"
            };
        $(this).css(styles).attr("contenteditable", true);
        _this._opt = $.extend(_this._opt, options);
        try {

            //此处上传七牛图片
            $("#imageUpload").click(function () {
                var APP = require("../../src/common/qiniuApp");
                var  uploader= APP.$QiniuUpLoad("chengyiwm-test",function (task) {
                    console.log("callback: "+JSON.stringify(task)+"  "+(typeof task));
                    console.log("task[0]._result: "+task[0]._result.key);
                    var     regImgUrls='http://7xuium.com1.z0.glb.clouddn.com/'+task[0]._result.key;
                    var imgUrl = regImgUrls;
                    var image = '<img src="' + imgUrl + '" style="width:90%;" /><br><br>';
                    _this.insertImage(image);
                });
                uploader.chooseFile();
            })
            _this.placeholderHandler();
            _this.pasteHandler();
        } catch (e) {
            console.log(e);
        }
        if (_this._opt.formInputId && $('#' + _this._opt.formInputId)[0]) {
            $(_this).on('input', function () {
                $('#' + _this._opt.formInputId).val(_this.getValue());
                $('#'+_this._opt.formTextId).val(_this.getText());
            });
        }
    },
    insertImage: function (src) {
        $(this).focus();
        var selection = window.getSelection ? window.getSelection() : document.selection;
        var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        if (!window.getSelection) {
            range.pasteHTML(src);
            range.collapse(false);
            range.select();
        } else {
            range.collapse(false);
            var hasR = range.createContextualFragment(src);
            var hasLastChild = hasR.lastChild;
            while (hasLastChild && hasLastChild.nodeName.toLowerCase() == "br" && hasLastChild.previousSibling && hasLastChild.previousSibling.nodeName.toLowerCase() == "br") {
                var e = hasLastChild;
                hasLastChild = hasLastChild.previousSibling;
                hasR.removeChild(e);
            }
            range.insertNode(range.createContextualFragment("<br/>"));
            range.insertNode(hasR);
            if (hasLastChild) {
                range.setEndAfter(hasLastChild);
                range.setStartAfter(hasLastChild);
            }
            selection.removeAllRanges();
            selection.addRange(range);
        }
        if (this._opt.formInputId && $('#' + this._opt.formInputId)[0]) {
            $('#' + this._opt.formInputId).val(this.getValue());
            $('#'+ this._opt.formTextId).val(this.getText());
        }
    },
    pasteHandler: function () {
        var _this = this;
        $(this).on("paste", function (e) {
            console.log(e.clipboardData.items);
            var content = $(this).html();
            console.log(content);
            valiHTML = _this._opt.validHtml;
            content = content.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(/<\/ ?tr[^>]*>/gi, "[br]").replace(/<\/ ?td[^>]*>/gi, "&nbsp;&nbsp;").replace(/<(ul|dl|ol)[^>]*>/gi, "[br]").replace(/<(li|dd)[^>]*>/gi, "[br]").replace(/<p [^>]*>/gi, "[br]").replace(new RegExp("<(/?(?:" + valiHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(new RegExp('<span([^>]*class="?at"?[^>]*)>', "gi"), "[span$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + valiHTML.join("|") + "|img|span)[^\\]]*)\\]", "gi"), "<$1>");
            if (!/firefox/.test(navigator.userAgent.toLowerCase())) {
                content = content.replace(/\r?\n/gi, "<br>");
            }
            $(this).html(content);
        });
    },
    placeholderHandler: function () {
        var _this = this;
        $(this).on('click', function () {
            if ($.trim($(this).html()) === _this._opt.placeholader) {
                $(this).html('');
            }
        })
            .on('blur', function () {
                if (!$(this).html()) {
                    $(this).html(_this._opt.placeholader);
                }
            });

        if (!$.trim($(this).html())) {
           $(this).html(_this._opt.placeholader);
        }
    },
    getValue: function () {
        return $(this).html();
    },
    setValue: function (str) {
        $(this).html(str);
    },
    getText:function () {
        return $(this).text();
    }
});
