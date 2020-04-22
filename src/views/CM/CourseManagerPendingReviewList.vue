<template>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list rounded>
      <v-subheader>未审核列表</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="ToDetails"
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
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      item: 1,
      items: [
        { teacher: '张三', submitTime: '2020.4.12' },
        { teacher: '王二', submitTime: '2020.4.13' },
        { teacher: '李大', submitTime: '2020.4.13' },
      ],
    }),
    methods: {
      ToDetails: function () {
        this.$router.push({path: 'review_page'})
      }
    }
  }
</script>