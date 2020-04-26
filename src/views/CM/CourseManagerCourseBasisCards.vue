<template>
    <div>
        <h1 align="center" style="padding: 20px">负责的课程</h1>
        <v-divider></v-divider>
        <div style="padding: 20px" align="center">
            <v-row>
                <v-col v-for="(offeringCourse, i) in offeringCourses" :key="i" cols="3" md="6">
                    <v-hover v-slot:default="{ hover }">
                        <v-card
                            class="mx-auto"
                            max-width="344"
                            raised
                            outlined
                            :elevation="hover ? 12 : 2"
                        >
                            <v-expansion-panels>
                                <v-expansion-panel>
                                    <v-expansion-panel-header>
                                        <v-list-item three-line>
                                            <v-list-item-content>
                                                <div
                                                    class="overline mb-4"
                                                >总学时：{{ offeringCourse.totalPeriod }}</div>
                                                <v-list-item-title
                                                    class="headline mb-1"
                                                >{{ offeringCourse.courseName }}</v-list-item-title>
                                                <v-list-item-subtitle>学分: {{offeringCourse.credit}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-divider></v-divider>
                                        <!-- 未审核列表 -->
                                        <v-list rounded>
                                            <v-subheader>指标点列表</v-subheader>
                                            <v-list-item-group
                                                v-model="defaultFocus"
                                                color="primary"
                                            >
                                                <v-list-item
                                                    v-for="(factor, i) in offeringCourse.factors"
                                                    :key="i"
                                                    @click="toReviewPage(factor)"
                                                >
                                                    <v-list-item-content>
                                                        <v-list-item-title v-text="i+1"></v-list-item-title>
                                                    </v-list-item-content>
                                                    <v-list-item-content>
                                                        <v-icon>mdi-star</v-icon>
                                                    </v-list-item-content>
                                                    <v-list-item-content>
                                                        <v-list-item-title
                                                            v-text="factor.indexNo"
                                                        ></v-list-item-title>
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
import { mapState } from "vuex";
export default {
    data: () => ({
        offeringCourses: [], // 开设课程
        courses: [], // 历史课程
        defaultFocus: 0
    }),
    created() {
        let token = localStorage.getItem("token");
        this.$axios.defaults.headers = { Authorization: token };
        this.$axios.get("user/groups/").then(response => {
            let role = response.data.groups.map(role => role.name);
            this.$store.commit("set_role", role);
            this.$store.commit("set_name", response.data.name);
            this.$store.commit("set_username", response.data.username);
            let offeringIds = []; // 开设课程的id
            // let courses = []; // 历史课程(教学班)的数据
            this.$axios
                .get("course/courses/", {
                    params: { cm_username: this.$store.state.username }
                })
                .then(response => {
                    // console.log(response);
                    for (let course of response.data.courses) {
                        offeringIds.push(course.offering_course.id);
                    }
                    offeringIds = this.dedupe(offeringIds);
                    let offeringCourses = []; // 负责的所有开设课程
                    for (let offeringId of offeringIds) {
                        this.$axios
                            .get("plan/offering_courses/", {
                                params: { id: offeringId }
                            })
                            .then(response => {
                                let offeringCourse = {
                                    coureId: offeringId,
                                    courseName:
                                        response.data.offering_courses[0].name,
                                    totalPeriod:
                                        response.data.offering_courses[0]
                                            .total_period,
                                    credit:
                                        response.data.offering_courses[0].credit
                                };
                                this.$axios
                                    .get("plan/indicator_factors/", {
                                        params: {
                                            offering_course_id: offeringId
                                        }
                                    })
                                    .then(response => {
                                        // console.log(response);
                                        let factors = []; // 该开设课程支撑的指标点们及对应的已有的评价依据
                                        for (let indicatorFactor of response
                                            .data.indicator_factors) {
                                            let factor = {
                                                courseName: offeringCourse.courseName,
                                                factorId: indicatorFactor.id,
                                                indexId:
                                                    indicatorFactor.detailed_requirement,
                                                indexNo:
                                                    indicatorFactor.rough_index +
                                                    "-" +
                                                    indicatorFactor.detailed_index,
                                                indexContent:
                                                    indicatorFactor.detailed_description,
                                                target: indicatorFactor.target,
                                                basisTemplates:
                                                    indicatorFactor.basis_templates
                                            };
                                            factors.push(factor);
                                        }
                                        offeringCourse.factors = factors;
                                    });
                                offeringCourses.push(offeringCourse);
                            });
                    }
                    // console.log(offeringCourses);
                    this.offeringCourses = offeringCourses;
                });
        });
    },
    methods: {
        toReviewPage: function(facotr) {
            sessionStorage.setItem(
                "currentFacotr",
                JSON.stringify(facotr)
            );
            // sessionStorage.setItem("currentIndex", i);
            this.$router.push({ path: "basis_templates" });
        },
        dedupe: function(array) {
            // 数组去重
            return Array.from(new Set(array));
        },
        loadDetailedRequirements: function(courseId) {
            let listLength = this.courses.length;
            let result = [];
            for (let i = 0; i < listLength; i++) {
                if (this.courses[i].courseName === courseId) {
                    result.push(this.courses[i]);
                }
            }
            return result;
        }
    },
    computed: {
        ...mapState(["evaluationValues"])
    }
};
</script>
