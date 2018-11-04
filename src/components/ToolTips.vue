<template>
    <div class="tool_tops">
      {{ msg }}
    </div>
</template>

<script>
export default {
  name: "ToolTips",
  props: {
    msg: {
      type: String,
      default: '密码有6=20位字符组成，可包含大/小写dfja;lf jdsfa;lf sjdf;alf j;ldsaf '
    }
  }
}
</script>

<style lang="scss" scoped>
  .tool_tops{
    position: absolute;
    top: -90px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 514px;
    text-align: left;
    padding: 9px 16px;
    background: rgba(255, 255, 255, .9);
    border-radius: 10px;
    &:after{
      content: '';
      position: absolute;
      left: 50%;
      bottom: -20px;
      display: block;
      height: 0;
      transform: translateX(-50%);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 20px solid rgba(255, 255, 255, .9);;
    }
    .msg{
      display: inline-block;
    }
  }
</style>
