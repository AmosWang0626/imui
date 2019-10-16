<template>
  <div class="img-box">
    <div class="img-edit" @click="editAvatar">
      <i class="el-icon-edit-outline"></i>
    </div>
    <img class="img-logo" alt="Vue Logo" src="@/assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    editAvatar() {
      this.$message.info('Edit Avatar!')
    }
  }
}
</script>

<style>
.img-box {
  display: inline-block;
  position: relative;
}
.img-box img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: grey 1px dashed;
}
.img-box .img-edit {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 3px;
  background-color: #f5f7fa;
  border-radius: 50%;
}
</style>
