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
        {{ main.name }}
        <button
          class="btn btn-primary float-right"
          @click="deleteMenu(main.id)"
        >
          Delete
        </button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { db } from "../../plugins/fireinit";
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
    },
    deleteMenu(id) {
      console.log(id);
      db.database()
        .ref("mainmenu")
        .child(id)
        .remove()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }
};
</script>
