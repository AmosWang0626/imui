<template>
  <el-container>
    <el-aside width="210px">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-main>
          <slot name="main"></slot>
        </el-main>
      </el-container>
      <el-footer>
        <el-link href="http://www.miitbeian.gov.cn" target="_blank" type="primary">豫ICP备18017205号-2</el-link>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from './Sidebar'
import Header from './Header'

export default {
  components: {
    Sidebar,
    Header
  }
}
</script>

<style>
.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
}

.el-main {
  text-align: center;
  margin: 10px 10px 0 10px;
}
</style>
