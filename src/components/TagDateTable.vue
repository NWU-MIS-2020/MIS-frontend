<template>
  <div >
    
    <v-alert
      border="right"
      colored-border
      type="error"
      elevation="2"
      v-for="(item, index) in items" :key="index" :to="{name: item.route}" exact-active-class="router-link-exact-active"
      
    >
    <v-row align="center" v-if="item.indicator<0.65">
        <v-col class="grow">您的课程：{{item.name}}  评价值低于预警阈值，点击后方按钮了解详情</v-col>
        <v-col class="shrink">
          <v-btn @click="gotolink(item.route)">查看详情</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
    export default {
        /* data: () => ({
            items: [
                { route: 'details', text: '计算机组成原理' },
                { route: '2', text: '数据结构' },
            ],
        }), */

        data: () => ({
            items: [],
        }),
        created() {
            this.fetch_data()
        },
        methods: {
            fetch_data: function() {
                this.$axios
                    .get('user/student/?username=' + this.username)
                    .then(response => {
                        console.log(response)/* 
                        let newArray = [] */
                        this.items = response.data.grades
                        /* for(let i in this.details){
                            if(this.details[i].indicator<0.65)
                            this.newArray += this.details[i]
                        } */
                    })
            },
            gotolink(route){
          this.$router.replace('/home/'+route)
        }
        },
        computed: {
            username: function() {
                return this.$store.state.username
            }
        },
        mounted() {}
    }
</script>