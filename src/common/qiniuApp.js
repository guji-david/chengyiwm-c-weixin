import axios from 'axios'
import {UploaderBuilder} from "qiniu4js";
import * as UTIlS from './utils'
import {Toast, MessageBox ,Indicator } from 'mint-ui';
import * as API from '../store/api'
// function getHeader() {
//   return {
//     token: UTIlS.getSkey(),
//     platformMode: "MI5",
//     imei: 'lixianjun',
//     channel: "xxx",
//     accessId: "10002",
//     versionCode: '00300',
//   };
// };

// //对对象进行排序
// function signCode (obj,methods) {
//
//   var newkey = Object.keys(obj).sort();
//   var newObj = {};
//   for (var i = 0; i < newkey.length; i++) {//排序
//     newObj[newkey[i]] = obj[newkey[i]];
//   }
//   var sortArr = [];
//   for ( var i in newObj){//转为数组
//     var str = i + "=" + newObj[i]
//     sortArr.push( str );
//   }
//
//   var appentStr = sortArr.join("&");
//   appentStr = 'c53f8ac6-b92b-4c86-a0ec-b819aec85336' + methods + appentStr;  //字符串拼接
//   console.log('加密前的数据-->'+appentStr)
//
//
//
//   var CryptoJS = require("crypto-js");  //HmacSHA1加密
//   var delHmacSHA1 =  CryptoJS.HmacSHA1(appentStr,'zaiyi*13579')
//   console.log('加密后的数据-->' + delHmacSHA1)
//   return  delHmacSHA1
// }


// export function postRequest(action, formData, successFun, errorFun) {
//
//   var instance = axios.create({
//     baseURL: 'http://123.57.31.218:8080/freeman-api',
//     timeout: 2000,
//     headers: {'Head': JSON.stringify(getHeader())}
//   });
//   instance.post(action, formData)
//       .then(function (response) {
//         successFun(response.data);
//         console.log('请求成功'+JSON.stringify(response.data));
//       }).catch(function (error) {
//     console.log('请求失败'+JSON.stringify(error));
//     // errorFun(error);
//   });
// }
// /*******************************************************************************
//  * 获取上传uptoken
//  *
//  * @param bucketName 存储在不同地方的bucket资源
//  * @param souceFun
//  *            成功回调
//  * @param errorFun
//  *            成功回调
//  */
// export function $getUploadFileSign(bucketName, souceFun, errorFun) {
//
//   var  currentTime = Date.parse(new Date());
//
//   var  signObj={'bucketName':bucketName,'uploadPlatform':1,'timeStap':currentTime}
//
//   var  delSignCode = signCode(signObj,'/common/getUploadInfo?');
//
//   var form = new FormData();
//
//   form.append('bucketName',bucketName);
//
//   form.append('uploadPlatform',1);
//
//   form.append('sign',delSignCode);
//
//   form.append('timeStap',currentTime);
//
//   postRequest("/common/getUploadInfo", form, souceFun, errorFun);
// };
export function $QiniuUpLoad(buketname,callBack) {
  //构建 uploader 实例
  let uploader = new UploaderBuilder()
    .debug(true)//开启 debug ，默认 false
    .retry(0)//设置重传次数，默认 0 ，不重传
    .auto(true)//选中文件后立即上传，默认 true
    .multiple(true)//是否支持多文件选中，默认 true
    .accept([])//过滤文件，默认无，详细配置见 http://www.w3schools.com/tags/att_input_accept.asp
    .tokenShare(false)//在一次上传队列中，是否分享 token,如果为 false 每上传一个文件都需要请求一次 Token ，默认 true
    .tokenFunc(function (setToken, task) {
      //token 获取函数， token 获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
      setTimeout(function () {
        var fun =API.$getUploadFileSign(buketname, function (res) {
          console.table(res);
          console.log("res.body.uptoken--------->"+JSON.stringify(res.body.token));
          var  uptoken = res.body.token;
          // alert('获取token'+res.body.token)
          setToken(uptoken);
        });
      }, 1000);
    }).listener({
      onReady(tasks) {
        //选择上传文件确定后,该生命周期函数会被回调。
        console.log("onReay");
      }, onStart(tasks){
        //开始上传
        console.log("onStart");
          Indicator.open();
      }, onTaskGetKey(task){
        //为每一个上传的文件指定 key,如果不指定则由七牛服务器自行处理
        console.log("onTaskGetKey"+JSON.stringify(task));

        //  return "test.png";

      }, onTaskProgress: function (task) {
        //每一个任务的上传进度,通过`task.progress`获取
        console.log("onTaskProgress"+task);

      }, onTaskSuccess(task){
        //一个任务上传成功后回调
        console.log("onTaskSuccess"+JSON.stringify(task));

      }, onTaskFail(task) {
        //一个任务在经历重传后依然失败后回调此函数
        console.log("onTaskFail"+JSON.stringify(task));

      }, onTaskRetry(task) {
        //开始重传
        console.log("onTaskRetry"+task);

      }, onFinish(task){
        //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有 HTTP 上传请求响应后回调(包括重传请求)。
        console.log("onFinish");
          Indicator.close();
        callBack(task);
      }
    }).build();

  return uploader;
}
