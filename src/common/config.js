/**
 * Created by lixianjun on 2017/3/13.
 */
// 检查邮箱
export function saveConfigbj(key, value) {
    if (typeof value == "object") {
        window.sessionStorage.setItem(key, JSON.stringify(value));
        return;
    }
    throw new error("value type is not object ");
}

export function fetchConfigObj() {
    var configObj = {
        B_1: "你好，我是Mike，欢迎使用在意财富，请输入你的手机号码",
        B_1_3: "请输入你的密码：",
        B_1_6: "你已登录成功，正在为你跳转进应用，请稍等",

        B_2_1: "手机号输入有误，请重新输入（仅支持中国大陆11位手机号）",
        B_2_2: "该手机号尚未注册，是否立即注册",
        B_2_2_1: "你好，短信验证码已发送至你的手机，请输入验证码",
        B_2_2_2: "请重新输入你的手机号码：",

        B_3_1: "很抱歉你的密码输入有误，请重新输入",
        B_3_2: "你的密码多次输入有误，是否更改密码？",
        B_3_3: "验证码已发送至你的手机，请输入验证码",
        B_3_6: "请设置你的新密码（密码为6~16位字符，至少包含数字、字母（区分大小写）、符号中的2种",
        B_3_9: "密码不满足要求（密码为6~16位字符，至少包含数字、字母（区分大小写）、符号中的2种），请重新设置",
        B_3_5: "验证码输入错误，请重新输入",
        B_3_10_1 : "请重新输入你的验证码",
        B_3_10: "是否重新发送验证码？",

        C_1: "你好，我是 MIKE，欢迎使用在意财富，请输入你的手机号",
        C_1_4: "验证码已发送至你的手机，请输入验证码",
        C_1_7: "请设置你的密码（密码为6~16位字符，至少包含数字、字母（区分大小写）、符号中的2种）",
        C_1_10: "干的不错，你已成功注册，即将进入应用~",
        C_1_6: "验证码输入错误，请重新输入",
        C_2_1: "该手机号已注册，是否立即登录？",
        C_5_1: "密码不满足要求（密码为6~16位字符，至少包含数字、字母（区分大小写）、符号中的2种），请重新设置",
        C_3_1: "手机号输入有误，请重新输入（仅支持中国大陆11位手机号）",
        C_4_1: "请重新输入你的验证码",

        D_1_4: "你好，我是 Mike，欢迎使用在意财富，为了给你提供更好的服务，需要绑定手机号，请输入手机号",
        D_4_3: "该手机号已绑定微信，请输入新手机号",
        D_3_1: "手机号输入有误，请重新输入（仅支持中国大陆11位手机号）",
        D_1_8: "请设置你的密码（密码为6~16位字符，至少包含数字、字母（区分大小写）、符号中的2种）",
        D_1_11: "干的不错，你已绑定成功，即将进入应用~",

        D_5_1: "密码不满足要求（密码为6~16位字符，至少包含数字、字母（区分大小写）、符号中的2种），请重新设置",
        D_4_2: "你好，该手机号已注册，是否绑定?",
        D_4_4: "请重新输入手机号",
        D_4_5: "请输入密码：",
        D_4_8: "你的密码输入错误，请重新输入",
        D_4_9: "干的不错，你已成功登录，即将进入应用~",

        E_1_0: "你好，我是 Mike，请输入你的手机号",
        E_2_4: "手机号码输入有误，请重新输入",
        E_2_2: "该手机号码尚未注册，是否立即注册?",
        E_2_3: "请重新输入手机号码",
        E_1_4: "验证码已发送至你的手机，请输入验证码",
        E_3_1: "是否重新发送验证码？",

        E_1_6: "验证码输入错误，请重新输入：",
        E_3_1_1: "请重新输入你的验证码：",
        E_1_7: "请填写新密码：",
        E_4_1: "密码不满足要求（密码为6~16位字符，至少包含数字、字母（区分大小写）、符号中的2种），请重新设置",
        E_1_10: "干的不错，你已成功修改密码，即将进入应用~",

        d_1_11: "Hi，你终于来了!",
        d_1_12: "欢迎使用聊理财功能",
        d_1_13: "你可以点击下边的按钮来我说话",
    }
    var value = JSON.stringify(configObj);
    if (!value) {
        return [];
    }
    try {
        return JSON.parse(value);
    } catch (e) {
        return [];
    }
}