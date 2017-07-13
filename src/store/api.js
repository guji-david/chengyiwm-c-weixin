/**
 * Created by lixianjun on 2017/3/2.
 */

import axios from 'axios'
import * as UTIlS from '../common/utils'

function getHeader() {
    return {
        token: UTIlS.getSkey(),
        platformMode: "MI5",
        imei: Date.parse(new Date()),
        channel: "xxx",
        accessId: "10002",
        versionCode: '00300',
    };
};
//对对象进行排序
function signCode (obj,methods) {

    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {//排序
        newObj[newkey[i]] = obj[newkey[i]];
    }
    var sortArr = [];
    for ( var i in newObj){//转为数组
        var str = i + "=" + newObj[i]
        sortArr.push( str );
    }

    var appentStr = sortArr.join("&");
    appentStr = 'c53f8ac6-b92b-4c86-a0ec-b819aec85336' + methods + appentStr;  //字符串拼接
    // console.log('加密前的数据-->'+appentStr)


    var CryptoJS = require("crypto-js");  //HmacSHA1加密
     var delHmacSHA1 =  CryptoJS.HmacSHA1(appentStr,'zaiyi*13579')
    // console.log('加密后的数据-->' + delHmacSHA1)


    return  delHmacSHA1
}

/**
 * @param 发送网络请求
 *
 * @param action方法名
 *
 * @param obj请求body参数
 *
 * @param successFun成功的回调
 *
 * @param errorFun失败的回调
 *
 * @param 2017：03：03 lixianjun
 */
export function postRequest(action, formData, successFun, errorFun) {

        if(action.indexOf("16288") >= 0 ){
            axios.defaults.baseURL = '';
        }else {
            axios.defaults.baseURL = 'http://123.57.31.218/';
         }
    var instance = axios.create({
        // http://123.57.31.218/
        //http://101.201.253.127/
        // baseURL:'',
        timeout: 20000,
        headers: {'Head': JSON.stringify(getHeader())}
    });

    instance.post(action, formData)
        .then(function (response) {
            successFun(response.data);
            // console.log('请求成功'+JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log('请求失败'+JSON.stringify(error));
           // errorFun(error);
    });
}
/*******************************************************************************
 * 用户登录
 *
 * @param tel
 *            电话号码
 * @param pwd
 *            密码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $login(mobile, pwd,type, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'password':pwd,'type':type,'mobile':mobile,'timeStap':currentTime}

    var  delSignCode = signCode(signObj,'/user/login?');

    var form = new FormData();

    form.append('mobile',mobile);

    form.append('password',pwd);

    form.append('type',type);

    form.append('sign',delSignCode);

    form.append('timeStap',currentTime);

    postRequest("/user/login",form, souceFun, errorFun);
};
/*******************************************************************************
 * 检查手机号状态
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $mobileStatus(mobile, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'mobile':mobile,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/mobile/status?');

    var form = new FormData();

    form.append('mobile',mobile);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/mobile/status",form, souceFun, errorFun);
};

/*******************************************************************************
 * 获取验证码
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $downVerifyCode(mobile,type, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'mobile':mobile,'type':type,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/code?');

    var form = new FormData();

    form.append('mobile',mobile);

    form.append('type',type);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/code",form, souceFun, errorFun);
};
/*******************************************************************************
 * 校验验证码
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $checkVerifyCode(mobile,code,type, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'mobile':mobile,'code':code,'type':type,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/code/available?');

    var form = new FormData();

    form.append('mobile',mobile);

    form.append('code',code);

    form.append('type',type);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/code/available",form, souceFun, errorFun);
};
/*******************************************************************************
 * 注册
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $regin(mobile,code,password, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'mobile':mobile,'code':code,'password':password,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/register?');

    var form = new FormData();

    form.append('mobile',mobile);

    form.append('code',code);

    form.append('password',password);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/register",form, souceFun, errorFun);
};
/*******************************************************************************
 * 获取config数据
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
/*******************************************************************************
 * 聊理财获取数据
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $questionSearch(keyword, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'keyword':keyword,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/question/search?');

    var form = new FormData();

    form.append('keyword',keyword);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/question/search",form, souceFun, errorFun);
};
/*******************************************************************************
 * 找回密码
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $findPwd(mobile,password,code, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'mobile':mobile,'password':password,'code':code,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/password/update?');

    var form = new FormData();

    form.append('mobile',mobile);

    form.append('password',password);

    form.append('code',code);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/password/update",form, souceFun, errorFun);
};

/*******************************************************************************
 * 获取上传uptoken
 *
 * @param bucketName 存储在不同地方的bucket资源
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getUploadFileSign(bucketName, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'bucketName':bucketName,'uploadPlatform':1,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/common/getUploadInfo?');

    var form = new FormData();

    form.append('bucketName',bucketName);

    form.append('uploadPlatform',1);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/common/getUploadInfo", form, souceFun, errorFun);
};
/*******************************************************************************
 * 退出登录
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $sigOut(userId, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'userId':userId,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/logout?');

    var form = new FormData();

    form.append('userId',userId);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/logout",form, souceFun, errorFun);
};
/*******************************************************************************
 * 个人中心消息红泡提醒
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userNoticeInfo(type,souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'type':type,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/notice/info?');

    var form = new FormData();

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/notice/info",form, souceFun, errorFun);
};
/*******************************************************************************
 * 编辑昵称
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $nicknameUpdate(userId,nickname, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'userId':userId,'nickname':nickname,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/nickname/update?');

    var form = new FormData();

    form.append('userId',userId);

    form.append('nickname',nickname);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/nickname/update",form, souceFun, errorFun);
};
/*******************************************************************************
 * 用户详情
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userUpdate(userId, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'userId':userId,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/detail?');

    var form = new FormData();

    form.append('userId',userId);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/detail",form, souceFun, errorFun);
};
/*******************************************************************************
 * 他人资料
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userOtherDetail(id, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/home/detail?');

    var form = new FormData();

    form.append('id',id);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/home/detail",form, souceFun, errorFun);
};
/*******************************************************************************
 * 他人发表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $OtherArticleList(userId,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'userId':userId,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/article/list?');

    var form = new FormData();

    form.append('userId',userId);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/article/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 他人关注列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $OtherFollowList(id,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/home/follow/list?');

    var form = new FormData();

    form.append('id',id);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/home/follow/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 他人粉丝
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $OtherFanList(id,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/home/fan/list?');

    var form = new FormData();

    form.append('id',id);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/home/fan/list",form, souceFun, errorFun);
};

/*******************************************************************************
 * 我的关注列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userFollowList(id,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/follow/list?');

    var form = new FormData();

    form.append('id',id);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/follow/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 我的粉丝列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userFanList(id,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/fan/list?');

    var form = new FormData();

    form.append('id',id);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/fan/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 我的收藏
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userCollectionList(start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/collection/list?');

    var form = new FormData();

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/collection/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 我的帖子
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userArticleList(type,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'type':type,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/article/list?');

    var form = new FormData();

    form.append('type',type);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/article/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 我的消息列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $messageList(start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/message/list?');

    var form = new FormData();

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/message/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 我的消息列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $messageMommentList(start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/message/comment/list?');

    var form = new FormData();

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/message/comment/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 编辑理财目标
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $dreamUpdate(slogan, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'slogan':slogan,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/slogan/update?');

    var form = new FormData();

    form.append('slogan',slogan);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/slogan/update",form, souceFun, errorFun);
};
/*******************************************************************************
 * 修改头像
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $avatarUpdate(userId,avatarUrl, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'userId':userId,'avatarUrl':avatarUrl,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/avatar/update?');

    var form = new FormData();

    form.append('userId',userId);

    form.append('avatarUrl',avatarUrl);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/avatar/update",form, souceFun, errorFun);
};

/*************************************社区相关接口************************************************************/
/*******************************************************************************
 * banner
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $getBanner(bannerType, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'bannerType':bannerType,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/common/banner/list?');


    var form = new FormData();

    form.append('bannerType',bannerType);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/common/banner/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 推荐小组
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $recommendGroup( souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/group/recommends?');

    var form = new FormData();

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/group/recommends",form, souceFun, errorFun);
};
/*******************************************************************************
 * 推荐feed动态
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userFeeds(fetchType,minTime, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'fetchType':fetchType,'minTime':minTime,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/user/feeds?');

    var form = new FormData();

    form.append('fetchType',fetchType);

    form.append('minTime',minTime);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/user/feeds",form, souceFun, errorFun);
};
/*******************************************************************************
 * 推荐小组
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userRecommend(souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/user/recommends?');

    var form = new FormData();

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/user/recommends",form, souceFun, errorFun);
};
/*******************************************************************************
 * 关注动态
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userMoments(fetchType,minTime, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'fetchType':fetchType,'minTime':minTime,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/user/moments?');

    var form = new FormData();

    form.append('fetchType',fetchType);

    form.append('minTime',minTime);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/user/moments",form, souceFun, errorFun);
};
/*******************************************************************************
 * 获取分组列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $categoryList( souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/category/list?');

    var form = new FormData();

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/category/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 获取小组列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $groupList(categoryId,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'categoryId':categoryId,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/group/list?');

    var form = new FormData();

    form.append('categoryId',categoryId);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/group/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 获取小组成员列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $groupMemberList(id,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/group/member/list?');

    var form = new FormData();

    form.append('id',id);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/group/member/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 获取小组详情
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $groupDetail(id, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/group/detail?');

    var form = new FormData();

    form.append('id',id);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/group/detail",form, souceFun, errorFun);
};
/*******************************************************************************
 * 帖子详情
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $postDetail(id, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/article/detail?');

    var form = new FormData();

    form.append('id',id);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/article/detail",form, souceFun, errorFun);
};
/*******************************************************************************
 * 获取话题
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $topicDetail(id, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/topic/detail?');

    var form = new FormData();

    form.append('id',id);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/topic/detail",form, souceFun, errorFun);
};
/*******************************************************************************
 * 获取小组帖子（全部、置顶、精华、话题)
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $articleList(groupId,userId,topicId,top,essence,type,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'groupId':groupId,'userId':userId,'topicId':topicId,'top':top,'essence':essence,'type':type,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/article/list?');

    var form = new FormData();

    form.append('groupId',groupId);

    form.append('userId',userId);

    form.append('topicId',topicId);

    form.append('top',top);

    form.append('essence',essence);

    form.append('type',type);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);


    postRequest("/social/article/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 获取回复列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $commentList(articleId,userId,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'articleId':articleId,'userId':userId,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/article/comment/list?');

    var form = new FormData();

    form.append('articleId',articleId);

    form.append('userId',userId);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/article/comment/list",form, souceFun, errorFun);
};
/*******************************************************************************
 * 帖子点赞
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $articleLike(id, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/article/like?');

    var form = new FormData();

    form.append('id',id);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/article/like",form, souceFun, errorFun);
};
/*******************************************************************************
 * 话题收藏
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $articleCollect(id, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/article/collect?');

    var form = new FormData();

    form.append('id',id);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/article/collect",form, souceFun, errorFun);
};
/*******************************************************************************
 * 小组关注
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $groupfFollow(id, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/group/follow?');

    var form = new FormData();

    form.append('id',id);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/group/follow",form, souceFun, errorFun);
};
/*******************************************************************************
 * 话题关注
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $topicFollow(id, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/topic/follow?');

    var form = new FormData();

    form.append('id',id);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/topic/follow",form, souceFun, errorFun);
};
/*******************************************************************************
 * 用户关注
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userFollow(id, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'id':id,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/follow?');

    var form = new FormData();

    form.append('id',id);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/follow",form, souceFun, errorFun);
};
/*******************************************************************************
 * 回复帖子，发布评论
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $commentPublish(targetId,content,articleId,type, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'targetId':targetId,'content':content,'articleId':articleId,'type':type,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/comment/publish?');

    var form = new FormData();

    form.append('targetId',targetId);

    form.append('content',content);

    form.append('articleId',articleId);

    form.append('type',type);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/comment/publish",form, souceFun, errorFun);
};
/*******************************************************************************
 * 发布帖子
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $publishTopic(title,content,type,groupId,topicId,brief,thumb, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'title':title,'content':content,'type':type,'groupId':groupId,'topicId':topicId,'brief':brief,'thumb':thumb,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/social/article/publish?');

    var form = new FormData();

    form.append('title',title);

    form.append('content',content);

    form.append('type',type);

    form.append('groupId',groupId);

    form.append('topicId',topicId);

    form.append('brief',brief);

    form.append('thumb',thumb);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/social/article/publish",form, souceFun, errorFun);
};
/*******************************************************************************
 * 搜索
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $commonSearch(query,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'query':query,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/common/search?');

    var form = new FormData();

    form.append('query',query);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/common/search",form, souceFun, errorFun);
};
/*******************************************************************************
 * 用户搜索列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $userSearch(query,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'query':query,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/user/search?');

    var form = new FormData();

    form.append('query',query);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/user/search",form, souceFun, errorFun);
};
/*******************************************************************************
 * 用户搜索列表
 *
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $articleSearch(query,start,offset, souceFun, errorFun) {

    var  currentTime = Date.parse(new Date());

    var  signObj={'query':query,'start':start,'offset':offset,'timeStamp':currentTime}

    var  delSignCode = signCode(signObj,'/article/search?');

    var form = new FormData();

    form.append('query',query);

    form.append('start',start);

    form.append('offset',offset);

    form.append('sign',delSignCode);

    form.append('timeStamp',currentTime);

    postRequest("/article/search",form, souceFun, errorFun);
};