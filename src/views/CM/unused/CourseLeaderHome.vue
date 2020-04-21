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
          <v-list-item-action>
          </v-list-item-action>
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
          <course-cards-group></course-cards-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CourseCardsGroup from "../../components/CourseCardsGroup.vue"
export default {
  props: {
    source: String
  },
  components: { CourseCardsGroup},
  data: () => ({
    drawer: null
  })
};
</script>