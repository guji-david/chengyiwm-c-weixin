import Vue from 'vue'
import VueRouter from 'vue-router'
import  Chatlist from  '@/pages/chatlist/chatlist'
import * as UTIlS from '../common/utils'
import  LoginIndex from  '@/pages/loginIndex/loginIndex'
// import  Login from  '@/pages/login/login'
import  Regin from  '@/pages/regin/regin'
import  Login from  '@/pages/login/login'
import  FindPwdA from  '@/pages/login/finPwdA'
import  ReginA from  '@/pages/login/reginA'
import  LoginA from  '@/pages/login/loginA'
import  UserAgreement from  '@/pages/login/userAgreement'
import  AboutWe from  '@/pages/mine/aboutWe'
import  Home from  '../pages/home/home.vue'
import  TopicDetail from  '../pages/home/topicDetail'
import  PostDetail from  '../pages/home/postDetail'
import  ReplyPost from  '../pages/home/replyPost'
import  PublishPosts from  '../pages/home/publishPosts'
import  MemberList from  '../pages/home/group/GroupMemberList'
import  AllGroup from  '../pages/home/group/allGroup'
import  GroupDetail from  '../pages/home/group/groupDetail'
import  PublishTopic from  '../pages/home/group/publishTopic'
import  GroupInfoDetail from  '../pages/home/group/groupInfoDetail'

import  ModifyInfo  from  '../pages/mine/modifyInfo.vue'
import  EditDream  from  '../pages/mine/editDream.vue'
import  UserName  from  '../pages/mine/userName.vue'

import  Download  from  '../components/download.vue'

// 我的
import  Mine from  '../pages/mine/mine.vue'
import  MyMessage  from  '../pages/mine/myMessage.vue'
import  MySystem  from  '../pages/mine/system.vue'
import  MyPosts  from  '../pages/mine/myPosts.vue'
import  MyTopic  from  '../pages/mine/myTopic.vue'
import  MyCollect  from  '../pages/mine/myCollect.vue'
import  Set  from  '../pages/mine/set.vue'
import  OthersHome from  '../pages/home/othersHome'
import  MyHome from  '../pages/mine/myHome'
import  MyAttention from  '../pages/mine/myAttention'
import  MyFan from  '../pages/mine/myFan'
import  MyNewReply from  '../pages/mine/myNewReply'
//搜索
import  Search from  '../pages/home/search/search.vue'
import  SearchResult from  '../pages/home/search/searchUserResult'
import  SearchPostResult from  '../pages/home/search/SearchPostResult'
import  Store from '../store/index'

Vue.use(VueRouter)

const routes =[
    {
        path: '/chatlist',
        name: 'chatlist',
        // meta: {
        //     requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        // },
        component: Chatlist
    },{
      path: '/loginA',
      name: 'loginA',
      component: LoginA
    },{
        path: 'download',
        name: 'download',
        component: Download
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },{
        path: '/othersHome/:id(\.*)',
        name: 'othersHome',
        component: OthersHome
    }, {
        path: '/search',
        name: 'search',
        component: Search
    }, {
        path: '/searchResult/:query(\.*)',
        name: 'searchResult',
        component: SearchResult
    }, {
        path: '/searchPostResult/:query(\.*)',
        name: 'searchPostResult',
        component: SearchPostResult
    },
    {
        path: '/topicDetail/:id(\.*)/:fromType(\.*)',
        name: 'topicDetail',
        component: TopicDetail
    },{
        path: '/postDetail/:id(\.*)/:fromType(\.*)',
        name: 'postDetail',
        component: PostDetail
    },{
        path: '/replyPost/:targetId(\.*)/:replyContent(\.*)/:type(\.*)/:articleId(\.*)',
        name: 'replyPost',
        component: ReplyPost
    },
    {
        path: '/allGroup',
        name: 'allGroup',
        component: AllGroup
    },{
        path: '/groupDetail/:groupId(\.*)',
        name: 'groupDetail',
        component: GroupDetail,
    },{
        path: '/publishPosts',
        name: 'publishPosts',
        component: PublishPosts,
    }, {
        path: '/publishTopic/:groupId(\.*)/:topicId(\.*)/:type(\.*)',
        name: 'publishTopic',
        component: PublishTopic,
    }, {
        path: '/memberList/:id(\.*)',
        name: 'memberList',
        component: MemberList
    },{
        path: '/groupInfoDetail/:groupId(\.*)',
        name: 'groupInfoDetail',
        component: GroupInfoDetail
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
        path: '/findPwdA',
        name: 'findPwdA',
        component: FindPwdA
    },{
        path: '/reginA',
        name: 'reginA',
        component: ReginA
    },{
        path: '/userAgreement',
        name: 'userAgreement',
        component: UserAgreement
    },{
        path: '/aboutWe',
        name: 'aboutWe',
        component: AboutWe
    },{
        path: '/regin',
        name: 'regin',
        component: Regin
    },{//我的，个人中心
        path: '/mine',
        name: 'Mine',
        // meta: {
        //     requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        // },
        component: Mine
    },{
        path: '/modifyInfo',
        name: 'modifyInfo',
        component: ModifyInfo
    },{
        path: '/editDream/:dream(\.*)',
        name: 'editDream',
        component: EditDream
    },{
        path: '/userName/:nickName(\.*)',
        name: 'userName',
        component: UserName
    },{
        path: '/myMessage',
        name: 'myMessage',
        component: MyMessage
    },{
        path: '/mySystem',
        name: 'mySystem',
        component: MySystem
    },{
        path: '/myPosts',
        name: 'myPosts',
        component: MyPosts
    },{
        path: '/MyTopic',
        name: 'myTopic',
        component: MyTopic
    },
    {
        path: '/myCollect',
        name: 'myCollect',
        component: MyCollect
    },{
        path: '/Set',
        name: 'set',
        component: Set
    },{
        path: '/myHome/:id(\.*)',
        name: 'myHome',
        component: MyHome
    },{
        path: '/myAttention',
        name: 'myAttention',
        component: MyAttention
    },{
        path: '/myFan',
        name: 'myFan',
        component: MyFan
    },{
        path: '/myNewReply',
        name: 'myNewReply',
        component: MyNewReply
    },{
      path: '/',
      component: Home
    },{
      path: '*',
      component: Home
    }
  ];
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior: () => ({
       y: 0
     }),
});
// router.beforeEach((to, from, next) => {
//     alert(from.path)
//     alert(to.path)
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//     // console.log(Store.getters.userInfo.isLogin)
//      alert(UTIlS.getUserId())
//     if (UTIlS.getUserId()) {  // 通过vuex state获取当前的isLogin是否存在
//       // console.log('requireAuthrequireAuth'+ Store.getters.isLogin)
//       next();
//     }else {
//       next({
//         path: '/loginA',
//         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   }else {
//     next();
//   }
// })
export default router;
