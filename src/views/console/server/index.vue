<template>
  <div class="server">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>服务端启动日志</span>
        <el-button
          style="float: right; padding: 5px;"
          @click="startServer"
          type="primary"
          plain
        >启动服务端</el-button>
      </div>
      <div class="server-log">
        <el-scrollbar>
          <div v-for="(log, index) in logsData" :key="index" class="item">{{ log }}</div>
        </el-scrollbar>
      </div>
    </el-card>
  </div>
</template>

<script>
import { startServer } from '@/utils/api'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
export default {
  data() {
    return {
      logsData: [],
      stompClient: null
    }
  },
  created() {
    this.connect()
  },
  methods: {
    startServer() {
      this.send()
      startServer().then(res => {
        this.$message.info(res.data)
      })
    },
    send() {
      if (this.stompClient && this.stompClient.connected) {
        // 请求服务端WS接口
        // this.stompClient.send('/app/serverLogs', 'AMOS')
      } else {
        this.connect()
      }
    },
    connect() {
      const _this = this
      this.socket = new SockJS('http://localhost:8080/im-ws')
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.connect(
        {},
        frame => {
          // 服务端主动返回消息
          this.stompClient.subscribe('/server/logs', tick => {
            _this.logsData.unshift(tick.body)
          })
        },
        error => {
          console.log(error)
        }
      )
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect()
      }
    }
  }
}
</script>

<style>
.server {
  display: flex;
  align-items: center;
  justify-content: center;
}

.server-log {
  font-size: 14px;
  height: 50vh;
}

.item {
  margin-bottom: 18px;
}

.el-scrollbar {
  height: 100%;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.box-card {
  width: 50vw;
  text-align: left;
}
</style>
