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
                  :value="value"
                  color="white"
                  height="100"
                  stroke-linecap="round"
                  :labels="labels"
                  line-width="2"
                  padding="16"
                  auto-draw
                  :smooth="10 || false"
                ></v-sparkline>
              </v-sheet>
            </v-hover>
          </template>
          <span>
            <b>所有课程达成度统计</b>
          </span>
        </v-tooltip>
      </v-card-text>
      <!-- 分割线 -->
      <v-card-text class="pt-0">
        <div>
          <b>所有课程评价值统计</b>
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
    <!-- 另一个图 -->
    <v-col cols="12">
    <v-card class="mx-auto text-center" max-width="600" :elevation="hover ? 12 : 2" >
      <v-card-text>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-hover v-slot:default="{ hover }">
              <v-sheet color="cyan" :elevation="hover ? 12 : 2" v-on="on">
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
            <template v-for="(statistics, i) in statistics" :list="getValue(value)"  >
              <v-col :key="i" >
                <v-card class="pa-2" outlined tile>
                  <b>{{statistics.name}}</b>
                </v-card>
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    class="pa-2"
                    outlined
                    tile
                    :elevation="hover ? 12 : 2"
                  ><font v-model="list">{{list[i]}}</font>
                  </v-card>
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
    labels: ["0.00","0.05","0.15","0.25","0.35","0.45","0.55","0.65","0.75","0.85","0.95","1.00"],
    labels1: ["1","2","3","4","5","6","7","8","9","10","11","12"],
    value: [0, 1, 2, 3, 4, 5, 20, 5, 4, 3, 2, 0],
    value1: [0.5, 0.65, 0.67, 0.79, 0.8, 0.5, 0.5,0.5, 0.4, 0.53, 0.82, 0.7],
    statistics: [
      { name: "平均值", value: 0.63 },
      { name: "及格率", value: 0.78 },
      { name: "最大值", value: 0.78 },
      { name: "最小值", value: 0.78 },
    ],
    list: [],
  }),
  methods: {
    getColor: function(statistics) {
      if (statistics.name === "平均值" || statistics.name === "中位数") {
        if (statistics.value < 0.65) {
          return "red";
        } else {
          return "black";
        }
      }
    },
    getValue: function(value){
        console.log(value)
        let min = (Math.max.apply(Math,value));
        let max = (Math.min.apply(Math,value));
        let sum = 0;
        let count = 0;
        let countIndex = 0;
        let list =  [];
        for(let i = 0; i < value.length; i++){
            sum += value[i];
            if(value[i]>=0.65){
                count += 1;
            }}
        countIndex = count/value.length;
        this.list[0] = sum/value.length;
        this.list[1] = countIndex;
        this.list[2] = max;
        this.list[3] = min;
        console.log(this.list)
        return list;
    }
  }
};
</script>


<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>