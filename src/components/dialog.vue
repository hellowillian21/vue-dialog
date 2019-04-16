<template>
  <transition name="fade">
    <div class="dialog">
      <div class="mask"></div>
      <div class="dialog-content">
        <h3 class="title">{{ modal.title }}</h3>
        <div class="content">
          <div v-if="modal.type==='text'" class="text">{{modal.text}}</div>
          <input v-if="modal.type==='input'" class="input" type="text" :value="modal.text">
        </div>
        <div class="btn-group">
          <div class="btn-cancel" @click="cancel">{{ modal.cancelButtonText}}</div>
          <div class="btn-submit" @click="submit">{{ modal.confirmButtonText }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    dialogOption: Object
  },
  data() {
    return {
      resolve: '',
      reject: '',
      promise: '', // 保存promise对象
    }
  },
  computed: {
    modal: function() {
      let options = this.dialogOption

      return {
        type: options.type || 'text',
        title: options.title || '提示',
        text: options.text || '',
        cancelButtonText: options.cancelButtonText ? options.cancelButtonText : '取消',
        confirmButtonText: options.confirmButtonText ? options.confirmButtonText : '确定'
      }
    }
  },
  methods: {
    // 取消，将promise断定为完成态
    cancel() {
      this.reject('cancel')
    },
    // 确定，将promise断定为reject状态
    submit() {
      this.resolve('submit')
    },
    // 显示confirm弹出，并创建promise对象，给父组件调用
    confirm() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      return this.promise
    }

  }
}
</script>

<style lang='scss'>

.dialog {
  position: relative;
  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s
  }
  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }
  .dialog-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    box-sizing: border-box;
    padding: 10px;
    width: 75%;
    min-height: 160px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: #fff;
    z-index: 50002;
    box-shadow: 1px 4px 10px 1px #666;
    .title {
      font-size: px2rem(24);
      font-weight: 600;
      margin: 10px 0;
    }
    .content {
      .text {
        padding-bottom: px2rem(20);
        padding-left: px2rem(20);
        text-align: left;
      }
      .input{
        -web-kit-appearance:none;
        -moz-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        font-size: px2rem(24);
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 90%;
      }
    }
    .btn-group {
      font-size: px2rem(24);
      align-self: flex-end;
      display: flex;
      margin-right: px2rem(10);
      
      .btn-cancel {
        // margin-left: px2rem(20);
        padding: px2rem(5) px2rem(10);
        background-color: #e8e8e8;
        border: 1px solid#d7d7d7;
        color: #666;
        border-radius: 4px;
      }
      .btn-submit {
        margin-left: px2rem(25);
        padding: px2rem(5) px2rem(10);
        background-color: #409eff;
        border: 1px solid#409eff;
        color: #fff;
        border-radius: 4px;
      }
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 50001;
  background: rgba(0,0,0,0.4);
}
</style>
