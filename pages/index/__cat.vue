<template>
  <v-app>
    <div class="d-inline-block m-4" v-for="(pro,i) in product" :key="i">
      <v-hover v-slot="{ hover }">
        <v-card class="mx-auto" color="grey lighten-4" max-width="250">
          <v-img
            :aspect-ratio="16 / 9"
            :src="pro.imgUrl"
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                style="height: 100%;"
              >
               &#2547;{{pro.price}}
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text class="pt-6" style="position: relative;">
            <v-btn
              absolute
              color="orange"
              class="white--text"
              fab
              large
              right
              top
            >
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <!-- <div class="font-weight-light grey--text title mb-2">
          For the perfect meal
        </div> -->
            <h3 class=" font-weight-light orange--text mb-2">
              {{pro.proname}}
            </h3>
            <div class="font-weight-light mb-2">
             <span class="h5"> &#2547;{{pro.price}}</span><br>
              Our Vintage kitchen utensils delight any chef.<br />
              Made of bamboo by hand
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </div>
  </v-app>
</template>
<script>
import { db } from "../../plugins/fireinit";
export default {
  data: () => ({
    product: []
  }),

  watch: {
    $route(to, from) {
      console.log(this.$nuxt._route.params._cat);
      this.prodactCatagory(this.$nuxt._route.params._cat);
    }
  },
  mounted(){
    this.prodactCatagory(this.$nuxt._route.params._cat);
  },
  methods: {
   async prodactCatagory(catagory) {
    await  db.database()
        .ref(catagory)
        .on("value", data => {
          this.product=[]
          data.forEach(e => {
            this.product.push({ ...e.val(), id: e.key });
              console.log(this.product);
          });
        })
    }
  }
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1;
  /* position: absolute; */
  width: 100%;
}
.v-application--wrap {
  display: inline-block !important;
  margin: 10px !important;
}
</style>
