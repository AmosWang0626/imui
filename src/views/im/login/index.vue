<template>
  <div class="base-div">
    <div class="child-div">
      <el-card class="w35vw">
        <div slot="header" class="title">
          <img style="height: 50px; margin-top: 20px" src="@/assets/logo.png" />
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
    </div>
  </div>
</template>
 
<script>
// import { getServerWS } from '@/api/server'
import { userLogin } from '@/api/client'
import { MessageType } from '@/utils/im_constant'
import { getWebsocket } from '@/utils/im_websocket'

export default {
  data() {
    return {
      websocket: null,
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
    getWebsocket().then(res => {
      this.websocket = res
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        userLogin(this.baseForm).then(res => {
          if (!res.status === 200) {
            this.$messgae.error('服务器异常')
            return
          }

          this.baseForm.command = MessageType.LOGIN_REQUEST
          this.baseForm.sender = localStorage.getItem('token')
          this.websocket.send(JSON.stringify(this.baseForm))

          const _this = this
          // 方式1 [websocket.onmessage] 指定收到服务器数据后的回调函数 [this.websocket 唯一]
          // 方式2 [websocket.addEventListener] 如果要指定多个回调函数，可以使用 addEventListener 方法
          this.websocket.onmessage = function(e) {
            const response = JSON.parse(e.data)
            if (response.command !== 2) {
              return
            }

            localStorage.setItem('token', response.token)
            localStorage.setItem('username', response.username)

            // 欢迎语
            _this.$message.success('Hello ' + response.username + ' !')
            // 跳转单聊页面
            _this.$router.push('alone')
          }
        })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.base-div {
  width: 100%;
}
.child-div {
  margin: 20px;
  display: flex;
  justify-content: center;
}
.w35vw {
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