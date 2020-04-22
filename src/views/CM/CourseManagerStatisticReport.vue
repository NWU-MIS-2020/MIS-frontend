<template>
  <v-hover v-slot:default="{ hover }">
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
            <b>{{courseName}}</b>对应指标点
            <b>{{indexNo}}</b>的达成度分布情况
          </span>
        </v-tooltip>
      </v-card-text>
      <!-- 分割线 -->
      <v-card-text class="pt-0">
        <div>
          <b>{{courseName}}</b>对应指标点
          <b>{{indexNo}}</b>的达成度
        </div>
        <v-divider class="my-2"></v-divider>
        <!-- 统计量 -->
        <template>
          <v-row no-gutters>
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
  </v-hover>
</template>


<script>
export default {
  data: () => ({
    courseName: "软件工程",
    indexNo: "3-3",
    labels: [
      "0.00",
      "0.05",
      "0.15",
      "0.25",
      "0.35",
      "0.45",
      "0.55",
      "0.65",
      "0.75",
      "0.85",
      "0.95",
      "1.00"
    ],
    value: [0, 1, 2, 3, 4, 5, 20, 5, 4, 3, 2, 0],
    statistics: [
      { name: "平均值", value: 0.63 },
      { name: "及格率", value: 0.78 },
      { name: "最大值", value: 0.78 },
      { name: "最小值", value: 0.78 },
      { name: "中位数", value: 0.78 }
    ]
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