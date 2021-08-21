<template>
  <div>
    <div  class="toast" v-show="isShow">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message="点击成功",duration=2000) {
      this.isShow = true
      this.message = message

      setTimeout(()=> {
        this.isShow = false
        this.message = ""
      },duration)
    }
  },

};
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>