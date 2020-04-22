<template>
<!-- 统计报表 -->
  <div style="padding: 40px">
    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="3" md="6">
        <course-manager-statistic-report></course-manager-statistic-report>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CourseManagerStatisticReport from "./CourseManagerStatisticReport.vue";
export default {
  props: {
    source: String
  },
  components: { CourseManagerStatisticReport },
  data: () => ({
    drawer: null,
    items: [
      {
        name: "IT项目管理",
        hour: "54",
        score: "4.5"
      },
      {
        name: "软件工程",
        hour: "54",
        score: "4"
      },
      {
        name: "计算机网络",
        hour: "54",
        score: "3"
      },
      {
        name: "计算机组成原理",
        hour: "54",
        score: "4"
      }
    ]
  })
};
</script>