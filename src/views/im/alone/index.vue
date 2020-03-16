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

    <el-row class="base-chat">
      <el-card class="chat-card">
        <!-- header -->
        <div class="header" slot="header">{{ form.receiver }}</div>
        <!-- record -->
        <div class="chat-record">
          <el-scrollbar ref="scrollbar">
            <div v-for="item in record" :key="item.id">
              <div class="chat-time">{{ item.time }}</div>
              <div
                :class="item.senderId === form.sender ? 'c-sender' : 'c-receiver'"
              >{{ item.senderId }}: {{ item.message }}</div>
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
                @keyup.enter.native="onSubmit('baseRef')"
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
import { chatAlone, chatRecord } from '@/api/client'
import { MessageType } from '@/utils/im_constant'
import { getWebsocket } from '@/utils/im_websocket'

export default {
  data() {
    return {
      websocket: null,
      form: {
        sender: localStorage.token,
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
  created() {
    getWebsocket().then(res => {
      this.websocket = res
    })
    // this.chatRecord()
  },
  methods: {
    onSubmit(baseRef) {
      this.$refs[baseRef].validate(valid => {
        if (!valid) {
          return false
        }
        if (!localStorage.token) {
          this.$message.info('请先登录')
          this.$router.push('login')
          return
        }
        this.form.command = MessageType.MESSAGE_REQUEST
        this.websocket.send(JSON.stringify(this.form))

        const _this = this
        this.websocket.onmessage = function(e) {
          const response = JSON.parse(e.data)
          if (response.command !== 4) {
            return
          }

          _this.$message.success(response.username + ' : ' + response.message)
        }
      })
    },
    chatRecord() {
      if (this.form.sender && this.form.receiver) {
        let data = { sender: this.form.sender, receiver: this.form.receiver }
        chatRecord(data).then(res => {
          this.record = res.data.body
        })
      }
    }
  }
}
</script>
<style scoped>
.base-div {
  text-align: center;
  color: black !important;
}
.base-chat {
  margin-top: 40px;
  display: flex;
  justify-content: center;
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