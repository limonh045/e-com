<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <div v-for="(item, i) in items" :key="i">
        <div v-if="item.sub">
          <v-list-item @click="expan(i), (item.expan = !item.expan)">
            <v-list-item-content v-b-toggle:my-collapse>
              <v-list-item-title class="text-capitalize"
                >{{ item.name }}
                <v-icon
                  class="float-right"
                  :class="{ 'rotate-90': item.expan }"
                >
                  mdi-chevron-right</v-icon
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <div v-if="openExpan == i">
            <div v-for="(sub, i) in item.sub" :key="i">
               <nuxt-link :to="sub.name.replace(/\s+/g,'')">
              <v-list-item >
                <v-list-item-content>
                  <v-list-item-title class="ml-5 text-capitalize"
                    >{{ sub.name }} </v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
               </nuxt-link>
            </div>
          </div>
        </div>
        <div v-else>
          <nuxt-link :to="item.name.replace(/\s+/g,'')">
            <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </nuxt-link>
        </div>
      </div>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      openExpan: ""
    };
  },
  mounted() {
    this.$store.dispatch("collectMainMenu");
    this.$store.dispatch("collectSubMenu");
  },
  computed: {
    ...mapGetters(["items"])
  },
  methods: {
    expan(i) {
      this.openExpan = i;
    }
  }
};
</script>
<style scoped>
a{
  text-decoration: none !important;
}

</style>

