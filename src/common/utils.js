//检查手机号码
export function checkTel(tel) {
    var reg = /^[1][3,4,5,8,7][0-9]{9}$/;
    return tel&& reg.test(tel);
}

//检查密码new
export function checkPwd(pwd) {
    var reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[0-9A-Za-z]).{6,18}$/;
    return pwd&& reg.test(pwd);
}

//检查银行卡号
export function checkBankCard(bankcard) {
    var reg = /^(\d{16}|\d{19})$/;
    return bankcard&& reg.test(bankcard);
}

// 检查邮箱
export function checkEmail(email) {

    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]{2,4})+/;
    return email&&reg.test(email);
}

//检查验证码
export function checkVerifyCode(verifyCode) {
    var reg = /^\d{6}$/;

    return verifyCode&&reg.test(verifyCode);
}

/**
 * 触发下载文件
 * @param fileName 文件名
 * @param url url
 */
export function downloadFile(fileName, url) {
    var aLink = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
    aLink.download = fileName;
    aLink.href = url;
    aLink.dispatchEvent(evt);
}

//-----------------------------------------------------localStorage
/***set
 * 保存当前用户登录的 userid
 * @param type userid
 */
export function setUserId(userId) {
  return localStorage.setItem("userId", userId);
}

// 获取当前用户登录的 userid
export function getUserId() {
  return localStorage.getItem("userId") ?localStorage.getItem("userId"):"";
}


/***set
 * 保存当前用户登录的 skey
 * @param type skey
 */
export function setSkey(skey) {
  return localStorage.setItem("skey", skey);
}

// 获取当前用户登录的 Skey
export function getSkey() {
  return localStorage.getItem("skey")?localStorage.getItem("skey"):"";
}

/***query
 * 保存当前用户登录的 query
 * @param type query
 */
export function setQuery(query) {
    return localStorage.setItem("query", query);
}

// 获取当前用户登录的 Skey
export function getQuery() {
    return localStorage.getItem("query")?localStorage.getItem("query"):"";
}


/***set
 * 保存当前用户登录的 name
 * @param type name
 */
export function setUserName(name) {
  return localStorage.setItem("userName", name);
}
// 获取用户昵称
export function getUserName() {
  return localStorage.getItem("userName")?localStorage.getItem("userName"):null;
}

/***set
 * 保存当前用户登录的 openId
 * @param type openId
 */
export function setOpenId(openId) {

  return localStorage.setItem("openId", openId);
}
// 获取当前用户登录的 OpenId oFUeYt-CuFjFZ99lagOAkTBO92nA
export function getOpenId() {
  return localStorage.getItem("openId") ? localStorage.getItem("openId") : "";
}
/***set
 * 保存当前用户登录的是否第一次进来
 * @param type openId
 */
export function setFisrtId(fisrt) {

    return localStorage.setItem("isFisrt", fisrt);
}
// 获取当前用户登录的 OpenId oFUeYt-CuFjFZ99lagOAkTBO92nA
export function getFisrtId() {
    return localStorage.getItem("isFisrt") ? localStorage.getItem("isFisrt") : "";
}


export function clearUserData(callback){
    setUserId("");
    setSkey("");
  setUserName("");
  callback();
}
//--------------------------------------------------------------------window.sessionStorage 保存对象登录注册config数据

export function saveLoginObj(key,value){
  if(typeof value =="object"){
    window.sessionStorage.setItem(key,JSON.stringify(value));
    return ;
  }
  throw new error("value type is not object ");
}

export function fetchLoginObj(key){
  var value = window.sessionStorage.getItem(key);
  if(!value){
    return [];
  }
  try{
    return JSON.parse(value);
  }catch(e){
    return [];
  }
}
//--------------------------------------------------------------------时间戳转化/
export function postNormalTime (times){//时间差计算
    if(times){
        var oDate=new Date();
        oDate.setTime(times);
        var y=oDate.getFullYear();
        var m=oDate.getMonth()+1;
        var d=oDate.getDate();

        var h=oDate.getHours();
        var mm=oDate.getMinutes();
        var s=oDate.getSeconds();
        return y+'/'+m+'/'+d+' '+h+':'+mm+':'+s;
    }
}
//--------------------------------------------------------------------时间戳转化/
export function normalTime (times){
    if(times){
        var oDate=new Date();
        oDate.setTime(times);
        var y=oDate.getFullYear();
        var m=oDate.getMonth()+1;
        var d=oDate.getDate();

        var h=oDate.getHours();
        var mm=oDate.getMinutes();
        var s=oDate.getSeconds();
        return y+'-'+m+'-'+d;
    }
}
//--------------------------------------------------------------------时间戳转化/
export function postDetailNormalTime (times){ //帖子详情时间格式
    if(times){
        var oDate=new Date();
        oDate.setTime(times);
        var y=oDate.getFullYear();
        var m=oDate.getMonth()+1;
        var d=oDate.getDate();

        var h=oDate.getHours();
        var mm=oDate.getMinutes();
        var s=oDate.getSeconds();
        return y+'/'+m+'/'+d;
    }
}
//关注提示返回成功和取消成功
export function attentionStatus (status){
    if (status == 120 ||status ==122){
       return '关注成功'
    }else {
        return '取消关注'
    }
}


export function log (path,content){
    var  isLog = true;
    if (isLog){
    console.log(path + JSON.stringify(content))
    }
}
