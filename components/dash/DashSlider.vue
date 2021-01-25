<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-list dense>
        <nuxt-link :to="item.to" v-for="item in slideLink" :key="item.title">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    mini: true,
    drawer: true,
    slideLink: [
      {
        name: "add main catagory",
        to: "/dash/maincat"
      },
      {
        name: "add sub catagory",
        to: "/dash/submenu"
      }
    ]
  }),
  mounted() {
    this.$store.dispatch("collectMainMenu");
    this.$store.dispatch("collectSubMenu");
  }
};
</script>
