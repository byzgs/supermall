<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
  
  },
};
</script>

<style scoped>
.back-top {
  position: absolute;
  bottom: 41px;
  right: 0;
  z-index: 9;
}
.back-top img {
  width: 40px;
}
</style>