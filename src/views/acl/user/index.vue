<template>
  <PageWrapper>
    <a-form>
      <a-row>
        <a-col :span="6">
          <a-form-item label="用户名">
            <a-input placeholder="请输入用户名" />
          </a-form-item>
        </a-col>
        <a-col :span="18">
          <a-space style="float: right">
            <a-button type="primary">查询</a-button>
            <a-button>重置</a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>

    <a-table></a-table>
  </PageWrapper>
</template>

<script setup lang="ts"></script>

<style></style>
