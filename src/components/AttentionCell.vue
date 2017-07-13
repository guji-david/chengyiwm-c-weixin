<template>
    <div  class="attention-content">
        <ul @click="detail()" class="att-bc">
            <div class="att-left">
                <img class="att-left-img" :src="item.avatar">
                <div class="att-left-mid">
                    <div class="att-left-mid-top" v-text="item.nickname"></div>
                    <div class="att-left-mid-bom-text">
                    <div class="att-left-mid-bom" v-text="item.articleCount+'篇帖子'"></div>
                    <div class="att-left-right" v-text="item.collectCount+'次收藏'"></div>
                    </div>
                </div>
            </div>
            <div class="att-right">
                <div @click="attention(item.id)" class="attention-ac">关注</div>

            </div>
        </ul>
    </div>
</template>
<script>
    import {Swipe, SwipeItem, MessageBox, Toast, Loadmore} from 'mint-ui';
    import * as API from '../store/api.js'
    import * as UTIlS from '../common/utils'
    export default{
        props: ['item'],
        data(){
            return{
            }
        },
        components:{

        },
        methods:{
            attention:function(id){
                if (!UTIlS.getSkey()){
                    this.$router.push({name: 'loginA'});
                    return;
                }
                API.$userFollow(id, res=> {
                    console.log('小组关注成功' + JSON.stringify(res));
                    var  _this = this;
                    if (res.head.code==0){
                        Toast({
                            message: '关注成功',
                            duration: 1000
                        });
                    }
                })
          },
            detail:function () {
//                this.$router.push({name: 'groupDetail',params:{'groupId':this.item.id}});
            }
        }
    }
</script>
<style scoped>
    .attention-content{
        width: 100%;
        background-color: white;


    }
    .attention-content .att-bc{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content:space-between ;
        height: 60px;
        border-bottom: 1px solid #eeeeee;

    }
    .attention-content .att-bc .att-left{
        width: 60%;
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .attention-content .att-bc .att-left .att-left-img{
        width: 40px;
        height: 40px;
        background-color: #9b9b9b;
        border-radius: 20px;
        margin-left: 10px;
        align-self: center;
    }
    .attention-content .att-bc .att-left .att-left-mid{

        display: flex;
        width: 100%;
        height: 80%;
        flex-direction: column;
        justify-content: space-around;

    }
    .attention-content .att-bc .att-left .att-left-mid .att-left-mid-top{
        font-size: 15px;
        color: #131313;
        margin-left: 15px;
        height: 30%;
        font-size: 15px;
        color: #131313;
        margin-left: 15px;


    }
    .attention-content .att-bc .att-left .att-left-mid  .att-left-mid-bom-text{
        margin-left: 15px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        align-items: center;

    }

    .attention-content .att-bc .att-left .att-left-mid  .att-left-mid-bom-text .att-left-mid-bom{
        font-size: 15px;
        color: #131313;
        margin-left: 0px;
        height: 30%;
        font-size: 12px;
        color: #909090;

    }
    .attention-content .att-bc .att-left .att-left-mid  .att-left-mid-bom-text .att-left-right{
        font-size: 12px;
        color: #909090;
        margin-left: 15px;
        align-self: center;


    }
    .attention-content .att-bc .att-right{
        width: 40%;
        height: 60px;
    }
    .attention-content .att-bc .att-right .attention-ac{
        color: #d2a056;
        font-size: 11px;
        padding: 5px 10px;
        margin-right: 15px;
        float: right;
        border-radius: 5px;
        border: 1px solid #d2a056;
        margin-top: 15px;

    }
</style>