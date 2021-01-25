<template>
  <div>
    <h1>add main menu</h1>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <button @click="addMenu" class="btn btn-primary">Add</button>
    <br />
    <hr />
    <br />

    <b-list-group>
      <b-list-group-item
        variant="dark"
        v-for="main in mainmenu"
        :key="main.name"
      >
        {{ main.name }}</b-list-group-item
      >
    </b-list-group>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    text: ""
  }),
  computed: {
    ...mapGetters(["mainmenu"])
  },
  methods: {
    addMenu() {
      this.$store.dispatch("addMainMenu", this.text);
      this.text = "";
    }
  }
};
</script>
