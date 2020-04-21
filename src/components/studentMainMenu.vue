<template>
    <v-navigation-drawer :value="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
        <v-list dense>
        <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="{name: child.route}" exact-active-class="router-link-exact-active"
              
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        props: {
            drawer: null,
        },
        data: () => ({
            items: [
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: '学生',
          model: false,
          children: [
            /* { icon: 'mdi-plus', text: 'Create label' }, */
            { icon: 'mdi-contacts',text: '个人信息' , route: 'information'},
            { icon: 'mdi-magnify',text: '查询课程达成度' , route: 'rightInquire'},
            { icon: 'mdi-magnify',text: '查询指标点达成度' ,route: ''},
            { icon: 'mdi-magnify',text: '查询毕业要求达成度',route: '' },
            { icon: 'mdi-message', text: '学业预警' ,route: 'alarm1'},
          ],
        },
        /* {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: '任课老师',
          model: false,
          children: [
            { icon: 'mdi-contacts',text: '个人信息' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' },
          ],
        },
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: '导员',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' },
          ],
        }, */
      ],

            
        })
    }
</script>

<style>
    .theme--light.v-list-item.v-list-item--active {
        color: rgba(0, 0, 0, 0.87) !important;
    }

        .theme--light.v-list-item.v-list-item--active .v-icon {
            color: rgba(0, 0, 0, 0.54) !important;
        }

    .theme--light.v-list-item:before {
        background-color: inherit !important;
    }

    .theme--light.v-list-item:hover:before {
        background-color: currentColor !important;
    }

    .theme--light.router-link-exact-active {
        color: inherit !important;
    }

        .theme--light.router-link-exact-active:before {
            background-color: currentColor !important;
            color: rgba(0, 0, 0, 0.87) !important;
        }

        .theme--light.router-link-exact-active .v-icon {
            color: rgba(0, 0, 0, 0.87) !important;
        }
</style>

