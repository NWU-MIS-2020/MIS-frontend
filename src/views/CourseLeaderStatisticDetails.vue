<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>主页</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>审核</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>毕业要求达成度评价系统 - 课程负责人</v-toolbar-title>
    </v-app-bar>

    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <template>
            <v-container class="grey lighten-5">
              <v-row no-gutters>
                <template>
                  <v-col>
                    <v-card class="pa-2" outlined tile>
                      《IT项目管理》对应指标点 3-2 的达成度分布图
                      <course-leader-spark-lines></course-leader-spark-lines>
                    </v-card>
                  </v-col>
                  <v-responsive width="100%"></v-responsive>
                </template>
                <template>
                  <v-col>
                    <v-card class="pa-2" outlined tile>
                      <br/>
                      统计量
                      <course-leader-statistic-table></course-leader-statistic-table>
                    </v-card>
                  </v-col>
                  <v-responsive width="100%"></v-responsive>
                </template>
              </v-row>
            </v-container>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CourseLeaderStatisticTable from "../components/CourseLeaderStatisticTable.vue";
import CourseLeaderSparkLines from "../components/CourseLeaderSparkLines.vue";
export default {
  props: {
    source: String
  },
  components: { CourseLeaderStatisticTable, CourseLeaderSparkLines },
  data: () => ({
    drawer: null
  })
};
</script>