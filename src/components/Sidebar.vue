<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-submenu index="im">
      <template slot="title">
        <i class="el-icon-s-comment"></i>
        <span>聊天相关</span>
      </template>
      <el-menu-item index="/login">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>登录</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/alone">
        <template slot="title">
          <i class="el-icon-chat-round"></i>
          <span>单聊</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/group">
        <template slot="title">
          <i class="el-icon-chat-dot-round"></i>
          <span>群聊</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/online">
        <template slot="title">
          <i class="el-icon-view"></i>
          <span>在线</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="system">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">系统相关</span>
      </template>
      <el-menu-item index="/server">
        <template slot="title">
          <i class="el-icon-cpu"></i>
          <span slot="title">控制台</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/profile" disabled>
      <template slot="title">
        <i class="el-icon-loading"></i>
        <span slot="title">敬请期待</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<style>
.el-menu-vertical {
  height: 95vh;
  text-align: left;
}
</style>
