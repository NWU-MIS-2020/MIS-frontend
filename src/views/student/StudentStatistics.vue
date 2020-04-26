<template>
  <v-hover v-slot:default="{ hover }">
    <v-container>
    <v-col cols="12">
    <v-card class="mx-auto text-center" max-width="600" :elevation="hover ? 12 : 2">
      <v-card-text>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-hover v-slot:default="{ hover }">
              <v-sheet color="cyan" :elevation="hover ? 12 : 2" v-on="on">
                <!-- 课程达成度分布情况图 -->
                <v-sparkline
                  :value="value1"
                  color="white"
                  height="100"
                  stroke-linecap="round"
                  :labels="labels1"
                  line-width="2"
                  padding="16"
                  auto-draw
                  :smooth="10 || false"
                ></v-sparkline>
              </v-sheet>
            </v-hover>
          </template>
          <span>
            <b>最终毕业达成度统计</b>
          </span>
        </v-tooltip>
      </v-card-text>
      <!-- 分割线 -->
      <v-card-text class="pt-0">
        <div>
          <b>最终毕业达成度统计</b>
        </div>
        <v-divider class="my-2"></v-divider>
        <!-- 统计量 -->
        <template>
          <v-row no-gutters >
            <template v-for="(statistics, i) in statistics">
              <v-col :key="i">
                <v-card class="pa-2" outlined tile>
                  <b>{{statistics.name}}</b>
                </v-card>
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    class="pa-2"
                    outlined
                    tile
                    :elevation="hover ? 12 : 2"
                  ><font :color="getColor(statistics)">{{statistics.value}}</font></v-card>
                </v-hover>
              </v-col>
            </template>
          </v-row>
        </template>
      </v-card-text>
    </v-card>
    </v-col>
    
    </v-container>
  </v-hover>
</template>


<script>
export default {
  data: () => ({
    labels1: ["1","2","3","4","5","6","7","8","9","10","11","12","13"],
    value1: [],
    value2: [],
    statistics: [],
  }),
  created() {
        this.fetch_data();
        console.log("value1是什么样的")
        console.log(this.value1)
        console.log("value2是什么样的")
        console.log(this.value2.value)
        this.getValue(this.value1);
    },
  methods: {
    fetch_data: function() {
                this.$axios
                    .get('prediction/detailed_predictions/?student_username=' + this.username)
                    .then(response => {
                        let rough_pre = response.data.students.map(rough_pre => rough_pre.rough_predictions);
                        for(let i=0;i<rough_pre[0].length;i++){
                          this.value1.push(rough_pre[0][i].indicator)
                          /* this.value2[i] = rough_pre[0][i].indicator */
                        }
                       this.getValue(this.value1) 
                    })
            },
    getColor: function(statistics) {
      if (statistics.name === "平均值") {
        if (statistics.value < 0.65) {
          return "red";
        } else {
          return "black";
        }
      }
    },
    getValue: function(value){
        let min = (Math.max.apply(Math,value));
        let max = (Math.min.apply(Math,value));
        let sum = 0;
        let count = 0;
        let countIndex = 0;

        for(let i = 0; i < value.length; i++){
            sum += value[i];
            if(value[i]>=0.65){
                count += 1;
            }}
        countIndex = count/value.length;
        this.statistics = [ 
                    { name: "平均值", value: (sum/value.length).toFixed(2) },
                    {
                        name: "及格率",
                        value: (countIndex).toFixed(2)
                    },
                    { name: "最小值", value: max.toFixed(2) },
                    { name: "最大值", value: min.toFixed(2) }
                ]
        return this.statistics;
    }
  },
  computed: {
            username: function() {
                return this.$store.state.username
            }
        },
};

</script>


<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>