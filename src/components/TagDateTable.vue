<template>
  <div >
    
    <v-alert
      border="right"
      colored-border
      type="error"
      elevation="2"
      v-for="(item, index) in items" :key="index" :to="{name: item.route}" exact-active-class="router-link-exact-active"
      
    >
    <v-row align="center">
        <v-col class="grow">您的课程：{{item.text}}  评价值低于预警阈值，点击后方按钮了解详情</v-col>
        <v-col class="shrink">
          <v-btn @click="gotolink(item.route)">查看详情</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
    export default {
        data: () => ({
            items: [
                { route: 'details', text: '计算机组成原理' },
                { route: '2', text: '数据结构' },
            ],
        }),
         methods:{
        gotolink(route){
          this.$router.replace('/home/'+route)
        }
      }
    }
</script>