<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="login-card">
          <div slot="header" class="title">
            <span>登录</span>
          </div>
          <el-form :model="baseForm" :rules="rules" ref="baseForm" label-width="80px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="baseForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="baseForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('baseForm')">登录</el-button>
              <el-button @click="resetForm('baseForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="online-table-expand">
                <el-form-item label="状态">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="TOKEN" prop="token"></el-table-column>
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="登录时间" prop="createTime" width="160"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import { userLogin, onlineUsers } from '@/api/client'

export default {
  data() {
    return {
      baseForm: {
        username: 'amos',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      },
      // online users
      tableData: []
    }
  },
  created() {
    this.onlineUsers()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        userLogin(this.baseForm).then(res => {
          this.$message(res.data)
          this.onlineUsers()
        })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onlineUsers() {
      onlineUsers().then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>
<style scoped>
.login-card {
  width: 35vw;
}
.title {
  text-align: center;
  font-size: 20px;
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