<template>
  <div class="base-div">
    <el-form :inline="true">
      <el-form-item label="我">
        <el-input class="setting-input" v-model="form.sender" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="对方">
        <el-input class="setting-input" v-model="form.receiver" size="mini"></el-input>
      </el-form-item>
    </el-form>

    <el-row>
      <el-card class="chat-card">
        <!-- header -->
        <div class="header" slot="header">{{ form.receiver }}</div>
        <!-- record -->
        <div class="chat-record">
          <el-scrollbar ref="scrollbar">
            <div v-for="item in record" :key="item.id">
              <div class="chat-time">{{ item.time }}</div>
              <div
                :class="item.sender === form.sender ? 'c-sender' : 'c-receiver'"
              >{{ item.message }}</div>
            </div>
          </el-scrollbar>
        </div>
        <!-- send message -->
        <div class="chat-message">
          <el-form :inline="true" :model="form" :rules="rules" ref="baseRef">
            <el-form-item prop="message">
              <el-input
                prefix-icon="el-icon-chat-line-round"
                type="text"
                autosize
                placeholder="请输入内容"
                v-model="form.message"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('baseRef')" icon="el-icon-s-promotion">发送</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { chatAlone } from '@/api/client'

export default {
  data() {
    return {
      form: {
        sender: 'c0',
        receiver: 'c1',
        message: ''
      },
      rules: {
        message: [
          { required: true, message: '请输入消息内容', trigger: 'blur' }
        ]
      },
      record: []
    }
  },
  methods: {
    onSubmit(baseRef) {
      const _this = this
      this.$refs[baseRef].validate(valid => {
        if (!valid) {
          return false
        }
        chatAlone(this.form).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.msg)
            return
          }
          let item = { ...this.form }
          item.id = res.data.body
          item.time = new Date().toLocaleString()
          this.record.push(item)
          // console.info(_this.$refs['scrollbar'].wrap)
          // window.scrollTo(0, _this.$refs['scrollbar'].wrap.scrollHeight)
        })
      })
    }
  }
}
</script>
<style scoped>
.base-div {
  text-align: center;
  color: black !important;
}
.chat-card {
  width: 35vw;
}
.chat-time {
  font-size: 12px;
  color: darkgray;
}
.c-sender {
  text-align: right;
  margin: 10px;
}
.c-receiver {
  text-align: left;
  margin: 10px;
}
.chat-record {
  height: 200px;
}
.chat-message {
  width: 100%;
  margin-top: 30px;
  margin-bottom: -20px;
}
</style>