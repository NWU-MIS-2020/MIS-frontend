<template>
    <div>
        <h1 align="center" style="padding: 40px">《{{currentCourse.courseName}}》的课程达成度统计数据</h1>
        <v-divider></v-divider>
        <!-- 统计报表 -->
        <div style="padding: 40px">
            <v-row>
                <v-col v-for="(item, i) in currentCourse.indexes" :key="i" cols="3" md="6">
                    <course-manager-statistic-card :statistics="calculateStatistics(item)"></course-manager-statistic-card>
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
                <v-dialog v-model="passDialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">提示</v-card-title>
                        <v-card-text>操作不可恢复。您确定通过审核吗？</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="passDialog = false">取消</v-btn>
                            <v-btn color="green darken-1" text @click="acceptPassDialog()">确定</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-btn value="right" @click.stop="failDialog = true">
                    <span class="hidden-sm-and-down">不通过审核</span>
                    <v-icon right>mdi-cancel</v-icon>
                </v-btn>
                <!-- 审核未通过对话框 -->
                <v-dialog v-model="failDialog" persistent max-width="350">
                    <v-card>
                        <v-card-title class="headline">提示</v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="center">
                                    <v-col>
                                        <v-text-field
                                            label="审核未通过的原因*"
                                            v-model="failReason"
                                            :rules="failReasonRules"
                                            required
                                            :counter="150"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*必须填写审核未通过原因</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="failDialog = false">取消</v-btn>
                            <v-btn color="green darken-1" text @click="acceptFailDialog()">确定</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-btn-toggle>
        </div>
    </div>
</template>


<script>
import CourseManagerStatisticCard from "./CourseManagerStatisticCard.vue";
export default {
    components: { CourseManagerStatisticCard },
    data: () => ({
        failReason: "",
        failReasonRules: [
            v => !!v || "未通过原因不能为空",
            v => (v && v.length <= 150) || "内容不得多于150字"
        ],
        defaultFocus: 0,
        passDialog: false,
        failDialog: false,
        currentCourse: JSON.parse(sessionStorage.getItem("currentCourse"))
    }),
    methods: {
        acceptPassDialog: function() {
            this.$axios
                .put("course/courses/", {
                    courses: [
                        {
                            id: this.currentCourse.courseId,
                            review_status: "已审核"
                        }
                    ]
                })
                .then(response => {
                    console.log(response);
                    alert("提交成功");
                });
            this.passDialog = false;
            this.$router.push({ path: "course_cards" });
        },
        acceptFailDialog: function() {
            this.$axios
                .put("course/courses/", {
                    courses: [
                        {
                            id: this.currentCourse.courseId,
                            review_status: "未通过",
                            review_comment: this.failReason
                        }
                    ]
                })
                .then(response => {
                    console.log(response);
                    alert("提交成功");
                });
            this.failDialog = false;
            this.$router.push({ path: "course_cards" });
        },
        calculateStatistics: function(item) {
            let compare = function(a, b) {
                //比较函数
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            };
            let list = item.studentMarks.slice().sort(compare); // 先拷贝再排序，否则陷入死循环
            let length = list.length;
            let sum = 0.0;
            let passCounter = 0;
            let counter01 = 0,
                counter12 = 0,
                counter23 = 0,
                counter34 = 0,
                counter45 = 0,
                counter56 = 0,
                counter67 = 0,
                counter78 = 0,
                counter89 = 0,
                counter90 = 0;
            for (let value of list) {
                sum += value;
                if (value >= 0.65) passCounter++;
                if (0 <= value < 0.1) counter01++;
                else if (0.1 <= value < 0.2) counter12++;
                else if (0.2 <= value < 0.3) counter23++;
                else if (0.3 <= value < 0.4) counter34++;
                else if (0.4 <= value < 0.5) counter45++;
                else if (0.5 <= value < 0.6) counter56++;
                else if (0.6 <= value < 0.7) counter67++;
                else if (0.7 <= value < 0.8) counter78++;
                else if (0.8 <= value < 0.9) counter89++;
                else if (0.9 <= value <= 1.0) counter90++;
            }
            return {
                courseName: JSON.parse(sessionStorage.getItem("currentCourse"))
                    .courseName,
                indexNo: item.indexNo,
                indexContent: item.indexContent,
                distribution: [
                    0,
                    counter01,
                    counter12,
                    counter12,
                    counter23,
                    counter34,
                    counter45,
                    counter56,
                    counter67,
                    counter78,
                    counter89,
                    counter90
                ],
                list: [ 
                    { name: "平均值", value: (sum / length).toFixed(2) },
                    {
                        name: "及格率",
                        value: (passCounter / length).toFixed(2)
                    },
                    { name: "最大值", value: list[length - 1].toFixed(2) },
                    { name: "最小值", value: list[0].toFixed(2) },
                    {
                        name: "中位数",
                        value: (list.length % 2 == 0
                            ? (list[(length - 2) / 2] + list[length / 2]) / 2.0
                            : list[(length - 1) / 2]
                        ).toFixed(2)
                    }
                ]
            };
        }
    }
};
</script>