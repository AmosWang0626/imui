<template>
  <div class="base-div">
    <el-form :inline="true">
      <el-form-item label="我">
        <el-input class="setting-input" v-model="form.sender" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="切换">
        <el-switch v-model="changeFlag" @change="change"></el-switch>
      </el-form-item>
      <el-form-item label="对方">
        <el-input class="setting-input" v-model="form.receiver" size="mini"></el-input>
      </el-form-item>
      <el-button @click="connect()" type="primary" size="small">连接</el-button>
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
                :class="item.senderId === form.sender ? 'c-sender' : 'c-receiver'"
              >{{ item.sender }}: {{ item.message }}</div>
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
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export default {
  data() {
    return {
      form: {
        sender: 'amos',
        receiver: 'grace',
        message: ''
      },
      changeFlag: 0,
      stompClient: null,
      rules: {
        message: [
          { required: true, message: '请输入消息内容', trigger: 'blur' }
        ]
      },
      record: []
    }
  },
  created() {},
  methods: {
    onSubmit(baseRef) {
      const _this = this
      this.$refs[baseRef].validate(valid => {
        if (!valid) {
          return false
        }
        if (!this.stompClient || !this.stompClient.connected) {
          this.$message.warning('请先连接哟')
          return
        }
        let tempForm = { ...this.form }
        tempForm.sender = '我'
        _this.record.unshift(tempForm)
        this.stompClient.send('/app/chat/alone', JSON.stringify(this.form), {})
        this.form.message = ''
      })
    },
    connect() {
      if (this.stompClient && this.stompClient.connected) {
        this.$message('您已经连接成功了哟')
        return
      }
      const _this = this
      this.socket = new SockJS('http://localhost:8080/im-ws')
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.connect(
        {},
        frame => {
          console.info('>>>>>>', '/client/push/alone/' + this.form.sender)
          // 服务端主动返回消息
          this.stompClient.subscribe(
            '/client/push/alone/' + this.form.sender,
            tick => {
              _this.record.unshift(JSON.parse(tick.body))
            }
          )
          this.$message.success('连接成功!')
        },
        error => {
          console.error('error', error)
        }
      )
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect()
      }
    },
    change() {
      var temp = this.form.sender
      this.form.sender = this.form.receiver
      this.form.receiver = temp
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