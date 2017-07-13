<template>
    <div class="search">
        <NavHeader :headTitle="navTitle" ></NavHeader>
        <ul class="search-bc">
            <div class="search-left">
                <div class="search-bc">
                    <img class="search-img" src="../../../assets/images/search_icon.png">
                    <input  @keyup="show()" v-model="query" class="search-input" placeholder="搜索用户帖子">
                </div>
            </div>
            <div @click="cancel()" class="search-right">
                <div class="cancel">取消</div>
            </div>
        </ul>
        <ul v-if="userList.length ==0 && contentList.length==0" class="null-content">
            <img class="null-content-img" src="../../../assets/images/null-search.png">
            <div class="null-content-text">很抱歉没有搜索到内容!试着换个词搜索看看?</div>
        </ul>
        <div class="search-content">

            <section  v-if="userList.length !=0" class="search-user">
                <div class="search-name">用户</div>
                <div  :class="userList.length >4 ? 'search-five-num' : 'search-num'">
                    <div @click.stop="userHome(item.id)"  v-for="( item , index ) in userList" key="index" class="item">
                        <ul  v-if="index < 4">
                        <img  class="item-img" :src="item.avatar">
                        <div  class="item-name" v-text="item.nickname"></div>
                        </ul>
                        <ul @click.stop="moreUser()"  v-if="index==4">
                            <div class="item-more-bc" >
                                <img  class="item-more" src="../../../assets/images/more_arrow.png">
                            </div>
                            <div  class="item-name" >更多</div>
                        </ul>
                    </div>
                </div>
            </section>
            <section v-if="contentList.length > 0 " class="search-post">
                <ul  @click="searchPostMore()" class="post-num">
                    <div class="post-num-left">帖子</div>
                    <div class="post-num-right">更多</div>
                </ul>
                <ul v-for="item in contentList">
                    <searchCell v-if="item.type==0" :item="item"></searchCell>
                </ul>
            </section>
        </div>
    </div>
</template>
<script>
    import  NavHeader from './searchNav.vue'
    import Vue from 'vue'
    import * as API from '../../../store/api.js'
    import * as UTIlS from '../../../common/utils'
    import {Swipe, SwipeItem, MessageBox, Toast, Loadmore} from 'mint-ui';
    import  searchCell from './searchCell.vue'
    import {mapGetters, mapActions} from 'vuex'
    export default{
        data(){
            return{
                navTitle:'搜索',
                start:0,
                offset:10,
                userList:[],
                contentList:[],
                query:'',
            }
        },
   computed: mapGetters({
       storageQuery: 'storageQuery'
    }),
        components:{
            NavHeader,
            searchCell
        },
        mounted(){
            this.qurey = this.storageQuery;
            this.start = 0;
         this.search(UTIlS.getQuery(),this.start,this.offset);
        },
        methods: {
            show:function () {//搜索结果
                UTIlS.log('搜索词'+this.query);
                this.start = 0;
                this.search(this.query,this.start,this.offset);
            },

            search:function (query,start,offset) {

                API. $commonSearch(query,start, offset, res=> {
                    UTIlS.log('搜索结果', res);
                    var  _this = this;
                    if (res.head.code==0){
                       console.log('用户个数'+res.body.extra.userList.length)
                        _this.contentList = res.body.list

                        if (res.body.extra.userList.length>5){

                           let  delList = res.body.extra.userList;
                            _this.userList = delList.slice(0,4)

                        }else {
                           _this.userList = res.body.extra.userList;
                        }

                    }else {
                        Toast({
                            message: res.head.msg,
                            duration: 1000
                        });
                    }

                });
            },
            moreUser:function () {
               this.$router.push({name: 'searchResult',params:{'query':this.query}});
                UTIlS.setQuery(this.query)
//                this.$store.dispatch('storageQuery', {query:this.query});

            },
            searchPostMore:function () {
              this.$router.push({name: 'searchPostResult',params:{'query':this.query}});
                UTIlS.setQuery(this.query)
//                this.$store.dispatch('storageQuery', {query:this.query});
            },
            cancel:function () {
                this.query = '',
                        UTIlS.setQuery('')
                this.search(this.query,this.start,this.offset);
            },
            userHome:function (id) {
                UTIlS.setQuery(this.query)
                if (id == UTIlS.getUserId()){

                    this.$router.push({name: 'myHome',params:{'id':id}});

                }else {
                    this.$router.push({name: 'othersHome',params:{'id':id}});
                }
            },
        },
    }
</script>
<style scoped lang="less">
    @import 'search.less';
</style>
