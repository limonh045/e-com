<template>
  <div>
    <h1>add sub menu</h1>

    <b-form-select v-model="menuid" class="mb-3">
      <b-form-select-option
        v-for="main in mainmenu"
        :key="main.id"
        :value="main.id"
        >{{ main.name }}</b-form-select-option
      >
    </b-form-select>

    <b-form-input
      v-model="submenuname"
      placeholder="Enter sub name"
      class=""
    ></b-form-input>
    <button @click="addSubMenu" class="btn btn-primary">Add</button>

    <br />
    <hr />
    <br />
    <b-list-group>
      <b-list-group-item
        variant="dark"
        v-for="main in selectedSubMenu"
        :key="main.name"
      >
        {{ main.name }}
        <button class="btn btn-primary float-right" @click="deleteSubMenu(main.id)">Delete</button>
        </b-list-group-item
      >
    </b-list-group>
  </div>
</template>
<script>
import {db} from '../../plugins/fireinit'
import { mapGetters } from "vuex";
export default {
  data: () => ({
    selectedMain: null,
    menuid: "",
    submenuname: ""
  }),
  computed: {
    ...mapGetters(["mainmenu", "submenu"]),
    selectedSubMenu() {
      return this.submenu.filter(e => e.menuid === this.menuid);
    }
  },

  methods: {
    addSubMenu() {
      this.$store.dispatch("addSubMenu", {
        menuid: this.menuid,
        name: this.submenuname
      });
      this.menuid = "";
      this.submenuname = "";
    },
     deleteSubMenu(id) {
      console.log(id);
      db.database().ref('submenu').child(id).remove()
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
    }
  }
};
</script>
