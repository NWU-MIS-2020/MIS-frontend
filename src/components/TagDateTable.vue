<template>
  <div >
    
    <v-alert
      border="right"
      colored-border
      type="error"
      elevation="2"
      v-for="(item, index) in items" :key="index" :to="item.route" link
    >
    <v-row align="center">
        <v-col class="grow">您的课程：{{item.text}}  评价值低于预警阈值，点击后方按钮了解详情</v-col>
        <v-col class="shrink">
          <v-btn>查看详情</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
    export default {
        data: () => ({
            items: [
                { route: 'alarm1', text: '计算机组成原理' },
                { route: 'alarm2', text: '数据结构' },
            ],
        })
    }
</script>