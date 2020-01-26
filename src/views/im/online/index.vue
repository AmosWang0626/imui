<template>
  <div class="base-div">
    <div class="w50vw">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="token" prop="token" align="center"></el-table-column>
        <el-table-column label="用户名" prop="username" align="center"></el-table-column>
        <el-table-column label="登录时间" prop="createTime" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
 
<script>
import { userLogin, onlineUsers } from '@/api/client'

export default {
  data() {
    return {
      // online users
      tableData: []
    }
  },
  created() {
    this.onlineUsers()
  },
  methods: {
    onlineUsers() {
      onlineUsers().then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script> 
<style scoped>
.base-div {  
  display: flex;
  justify-content: center;
}
.w50vw {
  width: 50vw;
}
</style>
<style>
.online-table-expand {
  font-size: 0;
}
.online-table-expand label {
  width: 40%;
  color: #99a9bf;
}
.online-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>