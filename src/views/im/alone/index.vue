<template>
  <div class="base-div">
    <el-form :inline="true">
      <el-form-item label="我">
        <el-input class="setting-input" v-model="sender" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="对方">
        <el-input class="setting-input" v-model="receiver" size="mini"></el-input>
      </el-form-item>
    </el-form>

    <el-row>
      <el-card class="chat-card">
        <div class="header" slot="header">{{ receiver }}</div>
        <div v-for="item in record" :key="item.id">
          <div class="chat-time">{{ item.time }}</div>
          <div :class="item.sender === sender ? 'c-sender' : 'c-receiver'">{{ item.content }}</div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sender: 'c0',
      receiver: 'c1',
      record: [
        {
          id: '1001',
          content: '你好,amos',
          sender: 'c0',
          receiver: 'c1',
          time: new Date().toLocaleString()
        },
        {
          id: '1002',
          content: '你好,grace',
          sender: 'c1',
          receiver: 'c0',
          time: new Date().toLocaleString()
        },
        {
          id: '1003',
          content: '你好,grace',
          sender: 'c1',
          receiver: 'c0',
          time: new Date().toLocaleString()
        }
      ]
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
</style>