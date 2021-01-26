<template>
  <div>
    <h1>product add</h1>
    <b-form-input
      v-model="productname"
      placeholder="Enter product name"
      class="mb-2"
    ></b-form-input>
    <b-form-select v-model="menu" class="mb-3">
      <b-form-select-option
        v-for="main in mainmenu"
        :key="main.id"
        :value="main"
        >{{ main.name }}</b-form-select-option
      >
    </b-form-select>
    <b-form-select v-model="sub" class="mb-3 mt-2">
      <b-form-select-option
        v-for="sub in selectedSubMenu"
        :key="sub.name"
        :value="sub.name"
        >{{ sub.name }}</b-form-select-option
      >
    </b-form-select>

    <input type="file" @change="addImgFile" />
    <img
      v-if="imageUrl !== ''"
      :src="imageUrl"
      class="w-25 d-block my-3"
      alt=""
    />
    <b-form-input
      v-model="productprice"
      placeholder="Enter product price"
    ></b-form-input>
    <button @click="addProduct" class="btn btn-primary mt-2">Add</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "../../plugins/fireinit";
export default {
  data: () => ({
    productname: "",
    menu: "",
    sub: "",
    productprice: "",
    images: null,
    imageUrl: "",
    itemcatagory: ""
  }),
  computed: {
    ...mapGetters(["mainmenu", "submenu"]),
    selectedSubMenu() {
      return this.submenu.filter(e => e.menuid === this.menu.id);
    }
  },
  methods: {
    addImgFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.filename = files[0].name;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;
      reader.onload = e => {
        vm.image = e.target.result;
        this.imageUrl = vm.image;
      };
      reader.readAsDataURL(file);
      this.images = file;
    },
    async addProduct() {
      if (this.menu.name && this.sub) {
        this.itemcatagory = this.sub.replace(/\s+/g, "");
      } else {
        this.itemcatagory = this.menu.name.replace(/\s+/g, "");
      }
      console.log(this.itemcatagory);
      let productinfo = {
        proname: this.productname,
        price: this.productprice
      };
      let key;
      await db
        .database()
        .ref(this.itemcatagory)
        .push(productinfo)
        .then(res => {
          key = res.key;
          return key;
        })
        .then(key => {
          return db
            .storage()
            .ref(`proimg${key}`)
            .put(this.images);
        })
        .then(fileData => {
          fileData.ref.getDownloadURL().then(url => {
            db.database()
              .ref(this.itemcatagory)
              .child(key)
              .update({ imgUrl: url });

            this.productname = "";
            this.menu = "";
            this.sub = "";
            this.productprice = "";
            this.imageUrl = "";
            this.images = null;
            this.itemcatagory = "";
            
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
