<template>
  <div>
    <h1 align="center" style="padding: 20px">负责的课程</h1>
    <v-divider></v-divider>
    <div style="padding: 20px" align="center">
      <v-row>
        <v-col v-for="(course, i) in courses" :key="i" cols="3" md="6">
          <v-hover v-slot:default="{ hover }">
            <v-card class="mx-auto" max-width="344" raised outlined :elevation="hover ? 12 : 2">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-4">学时：{{ course.hour }}</div>
                        <v-list-item-title class="headline mb-1">{{ course.courseName }}</v-list-item-title>
                        <v-list-item-subtitle>学分: {{course.score}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-divider></v-divider>
                    <!-- 未审核列表 -->
                    <v-list rounded>
                      <v-subheader>未审核列表</v-subheader>
                      <v-list-item-group v-model="defaultFocus" color="primary">
                        <v-list-item
                          v-for="(item, i) in loadPendingReviewList(course.courseName)"
                          :key="i"
                          @click="toReviewPage"
                        >
                          <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title v-text="item.teacher"></v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-content>
                            <v-list-item-title v-text="item.submitTime"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    defaultFocus: 0,
    courses: [
      {
        courseName: "IT项目管理",
        hour: "54",
        score: "4.5"
      },
      {
        courseName: "软件工程",
        hour: "54",
        score: "4"
      },
      {
        courseName: "计算机网络",
        hour: "54",
        score: "3"
      },
      {
        courseName: "计算机组成原理",
        hour: "54",
        score: "4"
      }
    ],
    pendingReview: [
      {
        courseName: "软件工程",
        list: [
          { teacher: "张三", submitTime: "2020.4.12" },
          { teacher: "王二", submitTime: "2020.4.13" },
          { teacher: "李大", submitTime: "2020.4.13" }
        ]
      }
    ]
  }),
  methods: {
    toReviewPage: function() {
      this.$router.push({ path: "review_page" });
    },
    loadPendingReviewList: function(courseName) {
      let listLength = this.pendingReview.length;
      for (let i = 0; i < listLength; i++) {
        if (this.pendingReview[i].courseName === courseName) {
          return this.pendingReview[i].list;
        }
      }
    }
  }
};
</script>
