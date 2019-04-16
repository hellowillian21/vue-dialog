<template>
  <div id="app">
    <div class="btn"  @click="showModalClick">点击弹出模态框</div>
    <Dialog v-show="showDialog" :dialogOption="dialogOption" ref="dialog"/>
  </div>
</template>

<script>
import Dialog from '@/components/dialog.vue'

export default {
  name: 'app',
  components: {
    Dialog
  },
  data() {
    return {
      showDialog: false,
      dialogOption: {
        type: 'input',
        title: '修改备注',
        text: '这是文本内容',
        cancelButtonText: '取消',
        confirmButtonText: '确定'
      }
    }
  },
  methods: {
    showModalClick() {
      this.showDialog = true
      this.$refs.dialog.confirm().then(() => {
      console.log('submit')
      this.showDialog = false;
      // do something
      }).catch(() => {
        console.log('cancel')
          this.showDialog = false;
          // do something
      })   
    }
  },
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  background: #ffffff;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin-top: 100px;
}
.btn {
  padding: 30px;
}
</style>
