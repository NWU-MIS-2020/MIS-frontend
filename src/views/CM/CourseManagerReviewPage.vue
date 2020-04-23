<template>
  <div>
    <h1 align="center" style="padding: 40px">{{courseName}}的课程达成度统计数据</h1>
    <v-divider></v-divider>
    <!-- 统计报表 -->
    <div style="padding: 40px">
      <v-row>
        <v-col v-for="(item, i) in items" :key="i" cols="3" md="6">
          <course-manager-statistic-report></course-manager-statistic-report>
        </v-col>
      </v-row>
    </div>
    <!-- 审核 -->
    <!-- <h2 style="padding: 60px">审核</h2> -->
    <div align="center" style="padding: 20px">
      <!-- <p>审核</p> -->
      <v-btn-toggle v-model="defaultFocus" shaped mandatory>
        <v-btn value="left" @click.stop="passDialog = true">
          <span class="hidden-sm-and-down">通过审核</span>
          <v-icon right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
        <!-- 审核通过对话框 -->
        <v-dialog v-model="passDialog" max-width="290">
          <v-card>
            <v-card-title class="headline">提示</v-card-title>
            <v-card-text>操作不可恢复。您确定通过审核吗？</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="passDialog = false">取消</v-btn>
              <v-btn color="green darken-1" text @click="passDialog = false">确定</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn value="right" @click.stop="failDialog = true">
          <span class="hidden-sm-and-down">不通过审核</span>
          <v-icon right>mdi-cancel</v-icon>
        </v-btn>
        <!-- 审核未通过对话框 -->
        <v-dialog v-model="failDialog" max-width="290">
          <v-card>
            <v-card-title class="headline">提示</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-textarea label="审核未通过的原因*" required counter="150" class="mx-2" rows="1"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <small>*必须填写审核未通过原因</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="failDialog = false">取消</v-btn>
              <v-btn color="green darken-1" text @click="failDialog = false">确定</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn-toggle>
    </div>
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
    defaultFocus: 0,
    courseName: "软件工程",
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
    ],
    passDialog: false,
    failDialog: false
  })
};
</script>