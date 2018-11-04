<template>
    <div class="share-box"
    >
      <div class="bgc-2"></div>
      <div class="cutImg" style="overflow: hidden">
        <div class="share-img-box">
          <img ref="img" src = "../../src/assets/share@2x.png" alt = "">
        </div>
        <div class="wx-qr-share">
          <qrcode
            :options = "{ size:100}"
              id="picWrapper"
            :value = 'link+code'>
          </qrcode>
        </div>
      </div>
      <transition name="fade">
        <div v-show="showMask"
             class="function-mask"
             @click="handleCloseClick"
        >
          <div class="bottom-function">
            <a class="saveBtn btn"
               ref="saveBtn"
            >
              保存到本地相册
            </a>
            <button class="cancelBtn btn"
                 @click.stop="handleCloseClick"
            >
              取消
            </button>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import html2canvas from 'html2canvas';
  import FileSaver from 'file-saver';
	export default {
		name: "Share",
    data () {
		  return {
		    showMask: false,
        timeOutEvent: 0,
        link:'',
        code:'',
        mail:''
      }
    },
    methods: {
      handleTouchStart () {
        this.timeOutEvent =  setTimeout(() => {
          this.timeOutEvent = 0;
          this.showMask = true;
        }, 500);
        return false;
      },
      handleTouchMove () {
        clearTimeout(this.timeOutEvent);
        this.timeOutEvent = 0;
      },
      handleTouchEnd () {
		    clearTimeout(this.timeOutEvent);
      },
      handleCloseClick (e) {
        this.showMask = false;
      },
      saveImg () {
        this.screenshotsImg();
        this.showMask = false;
      },
      eventTapLong () {
        this.showMask = true;
      },
      screenshotsImg () {
        html2canvas(document.querySelector(".cutImg"),{
          backgroundColor: 'transparent',// 设置背景透明
        }).then(canvas => {
          this.canvasTurnImg(canvas)
        });
      },
      canvasTurnImg (canvas) {
        var type = 'png';
        var imgData = canvas.toDataURL(type);
        /**
         * 获取mimeType
         * @param  {String} type the old mime-type
         * @return the new mime-type
         */
        var _fixType = function(type) {
          type = type.toLowerCase().replace(/jpg/i, 'jpeg');
          var r = type.match(/png|jpeg|bmp|gif/)[0];
          return 'image/' + r;
        };
        // 加工image data，替换mime type
        imgData = imgData.replace(_fixType(type),'image/octet-stream');
        /**
         * 在本地进行文件保存
         * @param  {String} data     要保存到本地的图片数据
         * @param  {String} filename 文件名
         */
        var self = this;
        var saveFile = function(data, filename){
          // var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          // save_link.href = data;
          // save_link.download = filename;
          // var event = document.createEvent('MouseEvents');
          // event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          // save_link.dispatchEvent(event);
          // self.$refs.saveBtn.href = data;
          function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
              u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
          }
          // const file = dataURLtoFile(data, filename);
          // FileSaver.saveAs(file, "share.png");
          self.$refs.img.src = data;
          return false;
          self.$refs.saveBtn.href = file;
          self.$refs.saveBtn.download = filename;
          const event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        };
        // 下载后的文件名
        var filename = 'share' + (new Date()).getTime() + '.' + type;
        // download
        saveFile(imgData,filename);
        // console.log(filename)
      }
    },
    created(){
		  const {code, link,mail}=this.$route.query
      this.link=link
      this.code=code
      this.mail=mail
    },
    mounted () {
      this.screenshotsImg();
    }
	}
</script>

<style scoped lang="scss">
  @import "../../src/css/mixin";
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .share-box{
    height: 100%;
    width: 100%;
    z-index: 1;
    .cutImg{
      overflow: hidden;
      position: absolute;
      z-index: 9999;
      width: 8.57rem;
      height: 14.42rem;
      top: 1.693333rem;
      margin-right: calc(50% - 4.256rem);
      margin-left: calc(50% - 4.256rem);
      .share-img-box{
        position: absolute;
        z-index: 9999;
        width: 100%;
        height:auto;
        /*padding-top: 127px;*/
        img{
          margin: 0 auto;
          display: block;
          width: 640px;
          height: 1080px;
        }
      }
    }
    .function-mask{
      z-index: 99999;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, .1);
      .bottom-function{
        position: absolute;
        overflow: hidden;
        width: 100%;
        left: 0;
        bottom: 0;
        .btn{
          width:690px;
          height:114px;
          line-height: 114px;
          background:rgba(255,255,255,1);
          border-radius:24px;
          margin: 0 auto;
          font-size:34px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color: rgba(49,175,227,1);
          text-align: center;
          vertical-align: middle;
        }
        .saveBtn{
          margin-bottom: 16px;
          display: inline-block;
        }
        .cancelBtn{
          margin-bottom: 30px;
        }
      }
    }
  }
.bgc-2{
  position: absolute;
  height: 100%;
  min-height: 1800px;
  overflow-y: hidden;
  width: 100%;
  background: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
  .wx-qr-share{
    position: absolute;
    width:120px;
    height: 120px;
    background-color: #ff3620;
    top: 858px;
    left: 133px;
    z-index: 99999;
    
  }
  #picWrapper{
    width: 100%;
    height: 100%;
  }
</style>
