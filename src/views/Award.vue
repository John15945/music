<template>
    <div class="award">
      <div class="img-1">
        <img src = '../../src/assets/award-1@2x.png' alt = "">
      </div>
      <div
        id="qrbox"
        class="wx-scan ">
        <qrcode
          class="qr-ctr"
            :value ='link+code'>
        </qrcode>
     <!--   <img
          class="qr-ctr"
          src = "../../src/assets/qr@2x.png" alt = "">-->
     <!--   <img
          class="qr-default-pos"
          :src = "qr" alt = "">-->
      </div>
      <!--生成邀请页-->
      <div
        @click="updateQR"
        class="img-2 mt-30">
        <img src = "../../src/assets/award-2@2x.png" alt = "">
      </div>
      <div class="ctn ph-40 pb-60">
        <section class="sec-1">
          <p
            class="lh-60"
            style = "text-align: left;">
            <span class="fs-13 co-1">我的邀请码：{{code}}</span>
            <button
              v-clipboard:copy = "code"
              v-clipboard:success = "onCopy"
              v-clipboard:error = "onError"
              style = "color:#00A0E9;"
              class="btn-4">复制</button>
          </p>
          <p
            class = "lh-60"
            style = "text-align: left;">
            <span class="fs-13 co-1">我的邀请链接：{{link+code}}</span>
            <button
              v-clipboard:copy = "link+code"
              v-clipboard:success = "onCopy"
              v-clipboard:error = "onError"
              style="color:#00A0E9;"
              class="btn-4">复制</button>
          </p>
        </section>
        <section class="sec-2 bgc-1 co-1 h-168 mt-67 ">
          <!--  <p class="fs-19 co-1 "><span >10</span><span>10</span></p>
            <p class="co-2"><span>容已实名好友（人）</span><span>已获得奖励（COCO）</span></p>-->
          
          <div class="sec-2-left">
              <span class="fs-19">{{a1}}</span>
              <p class="co-2">已实名好友（人）</p>
          </div>
          <div class="sec-2-right">
            <span class="fs-19">{{a2}}</span>
            <p class="co-2">已获得奖励（COCO）</p>
          </div>
        </section>
        <section class="sec-3">
          <div class="tab-head">
              <span
                class = "tab co-2 fs-15"
                :class = "{active:activeIdx==index}"
                @click = "tab(item,index)"
                v-for = "(item,index) in items">{{ item.title}}
          </span>
          </div>
          <div
            v-if="false"
            class="active-bar"></div>
            <div
              class="tab-body"
              :style="{}"
              v-if="index==activeIdx"
              v-for="(item,index) in items"
              >
              <div
                style="background-color:#262F8B;"
                class="label-head row co-2">
                <span v-for="i in title">{{ i }}</span>
              </div>
              <div
                v-if="h1.length"
                v-for="(item,idx) in tb"
                class="row">
                <template v-if="activeIdx==0">
                <span class="co-2 fs-11">{{item.RegisterEmail}}</span>
                <span class="co-2 fs-11">{{ item.TakeTimeStamp.slice(0,10) }}</span>
                <span class="co-2 fs-11">{{ item.Amount }}</span>
                </template>
                <template
                  v-else>
                  <span class = "co-2 fs-11">{{item.RegisterEmail}}</span>
                  <span class = "co-2 fs-11">{{ item.State=='yes'?'实名':'未实名' }}</span>
                  <span class = "co-2 fs-11">{{ item.ReferTimeStamp.slice(0,10) }}</span>
                </template>
              </div>
              <mu-flex
                v-if="false"
                
                justify-content = "center" style = "margin: 32px 0;">
                <mu-pagination raised
                               @change="pageChange"
                               :total = "total"
                               :page-size="pageSize"
                               :page-count="count"
                               :current.sync = "current">
                  
                </mu-pagination>
              </mu-flex>
            </div>
        </section>
        <section class="sec-4">
          <img src = "../../src/assets/arrow-left@2x.png" alt = ""><span
          class="fs-15"
          style="color:#00A0E9;">活动规则</span><img src = "../../src/assets/arrow-right@2x.png" alt = "">
        </section>
        <div class="sec-5 mt-30">
          <p
            class="co-1 fs-13"
            style="text-align: left;">
            1.成功邀请好友注册并完成实名认证，即可获得30枚coco奖励；<br>
            2.奖励将会在24小时内返至您的账户；<br>
            3.平台将严格审核实名制材料，如发现作弊行为，将取消奖励资格。</p>
          <p
            class="fs-11"
            style = "text-align: left;color: #AEAAE8;">
            * 注册即获BitCoCo专属邀请链接
            <br>
            * 仅承认使用BitCoCo官方邀请链接产生的邀请行为
            <br>
            * 官方根据实际运营情况，保留对活动规则做出修改的权利，请关注官方公告。
          </p>
        </div>
      </div>
    </div>
</template>

<script>
  import { awardInfo, recommendHistory, awardHistory} from '../../src/data/init'
  // import QRcode from  '../../src/lib/qrcode.min'

  export default {
		name: "Award",
    data(){
    
		  return{
        code:'',
        mail:'',
		    a1:999,
        a2:888,
        message:'msg',
        inviteCode:'Dg61aK',
        link:'https://h5.bitcoco.com/',
		    active:{
		      wid:'100px',
        },
		    items:[
          {title:'奖励情况',
            data:[]
          },
          {title:'邀请记录',
            data:[]
          },
        ],
        title: [ '账号', '发放时间', '发送数量' ],
        activeIdx:0,
        tb:[
          {
            title:'892129122@qq.com',
            date:'2018-10-16',
            total:'30'
          },
          {
            title:'892129122@qq.com',
            date:'2018-10-16',
            total:'30'
          },
          {
            title:'892129122@qq.com',
            date:'2018-10-16',
            total:'30'
          },
        ],
        h1:'',
        h2:"",
        qr:require('../../src/assets/qr-default@2x.png'),
        total:20,
        current:1,
        count:9,
        pageSize:8
      }
    },
    watch:{
		  'activeIdx':function ( v1,v2 ) {
        if(v1==0){
          this.title = [ '账号', '发放时间', '发送数量' ]
          this.tb=this.h1
        }else{
          this.title= [ '账号', '实名状态', '注册时间' ]
          this.tb=this.h2
        }
      }
    },
    methods:{
      pageChange(v){
        console.log ( v);
      },
      onCopy : function ( e ) {
        // alert ( '已复制: ' + e.text )
      },
      onError: function ( e ) {
        console.log ( e )
        alert ( '复制失败' )
      },
		  tab(item,index){
		    this.activeIdx=index
      },
      updateQR(){
        this.$router.push({
          path:'/share',
          query:{
            code:this.code,
            link:this.link+this.code,
            mail:this.mail
          }
        })
      }
    },
    created(){
        this.code= this.$route.query.code
        awardInfo().then(res=>{
          console.log ( this.a1 = res.data.result.certificated_count );
          console.log ( this.a2 = res.data.result.amount );
        })
      recommendHistory({
        page : 1,
        limit: 8
      }).then(res=>{
        console.log ( this.h1 = this.tb=res.data.result.records );
      })
      awardHistory({
        page : 1,
        limit: 8
      }).then(res=>{
        this.h2 = res.data.result.records
      })
    },
    mounted(){
		 
/*
      var qrcode = new QRCode ( 'qrbox', {
        text        : 'your content',
        width       : 256,
        height      : 256,
        colorDark   : '#000000',
        colorLight  : '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      } );
      */
    }
	}
</script>

<style scoped lang="scss">
  @import "../../src/css/mixin";
  .award{
    height: auto;
    @include bis('../../src/assets/award-bg@2x.png');
    .img-1{
      width: 100%;
      height: 365px;
      img{
        width: 100%;
      }
      /*height: 800px;*/
      //@include bis();
    }
    .img-2{
      width: 466px;
      height: 120px;
    }
    .wx-scan{
      margin: 0 auto;
      width: 266px;
      height: 266px;
      .qr-ctr{
        width: 100%;
        height: auto;
      }
    }
  }
.active{
  color: #00A0E9;
  font-weight: bold;
  border-bottom: 4px solid #00A0E9 ;
  box-sizing: border-box;
}
.active-bar{
  height: 2px;
  background-color: #00A0E9;
  width: 100px;
}
  .tab-head{
    @include flex();
    .tab{
      width: 25%;
      line-height: 93px;
      margin: 0 auto;
    }
  }
  .h-168{
    height: 168px;
  }
  .sec-2{
    @include flex();
    @include borderRadius(8px);
    &-left,&-right{
      width: 50%;
    }
    &-left{
    
   
    }
    &-left{
      float: left;
    }
    &-right{
      float: right;
    }
  }
  .tab-body{
    width: 100%;
    background-color:  #222A77;
  }
  .row{
    height: 68px;
    width: 100%;
    margin: 0;
    span{
        display: block;
      line-height: 68px;
      &:nth-child(1){
        width: 40%;
      }
      &:nth-child(2) {
        width: 30%;
      }
      &:nth-child(3) {
        width: 30%;
      }
      text-align: center;
    }
  }
.sec-4{
  margin-top: 30px;
  img{
    display: inline-block;
    height: 18px;
    width: 59px;
  }
}
  .sec-5{
    padding-top: 40px;
    padding-left: 22px;
    padding-bottom: 40px;
    @include borderRadius(8px);
    background-color: #222A77;
  }
  .qr-default-pos{
    display: block;
    width: 218px;
    height: 218px;
    position: relative;
    top: -250px;
    left: 25px;
    
  }
</style>
