import { defineStore } from "pinia";
import ProductService from "src/services/ProductService";
import json from "../assets/api_response.json";

export const useProductStore = defineStore("product", {
  state: () => ({
    budsOrHeadphones: "",
    wiredOrWireless: "WirelessConnectivity",
    firstQuestionAskedOrNot: 0,
    productDetails: [],
    threeDarray: [],
    filteredProducts: [],
    fitOnSmallEar: "",
    deviceType: "",
    productActivities: [],
    storeLoader: false,
    priceRange: {
      min: 50,
      max: 500,
    },
    productPriority: [],
    warningMsg: false,
    oldProducts: [],
    newProducts: [],
  }),
  getters: {},
  actions: {
    async getProducts() {
      this.storeLoader = true;
      this.oldProducts = this.productDetails[this.firstQuestionAskedOrNot];
      const response = await ProductService.fetchRecommendations(
        this.budsOrHeadphones,
        this.wiredOrWireless,
        this.fitOnSmallEar,
        this.deviceType
      );
      this.productDetails[this.firstQuestionAskedOrNot+1] = response.data;

      for (let i = 0; i < 3; i++) {
        if (
          this.productDetails[this.firstQuestionAskedOrNot+1][i].name.value == this.oldProducts[i].name.value
        ) {
          // this.productDetails[this.firstQuestionAskedOrNot][i].animation = { value: "slidezigzag" };
          this.productDetails[this.firstQuestionAskedOrNot+1][i].animation = { value: "slidezigzag" };
        } else if (
          this.productDetails[this.firstQuestionAskedOrNot+1][i].name.value != this.oldProducts[i].name.value
        ) {
          for (let j = 0; j < 3; j++) {
            if (
              this.productDetails[this.firstQuestionAskedOrNot+1][i].name.value ==
              this.oldProducts[j].name.value
            ) {
              if (i > j) {
                // console.log(this.productDetails[this.firstQuestionAskedOrNot+1][i]);
                this.productDetails[this.firstQuestionAskedOrNot+1][i].animation = { value: "slideDown" };
              } else if (i < j) {
                this.productDetails[this.firstQuestionAskedOrNot+1][i].animation = { value: "slideUp" };
              }
            } 
            else if (
              this.productDetails[this.firstQuestionAskedOrNot+1][i].name.value !=
              this.oldProducts[j].name.value
            ) {
              if (!this.productDetails[this.firstQuestionAskedOrNot+1][i].animation) {
                this.productDetails[this.firstQuestionAskedOrNot+1][i].animation = { value: "slideIn" };
              }
            }
          }
        }
      }
      this.storeLoader = false;
      this.firstQuestionAskedOrNot += 1;
      console.log("Product Details", this.productDetails);
      this.priceRange.min = this.minVal();
      this.priceRange.max = this.maxVal();
    },

     topFiveProducts() {
      this.productDetails[this.firstQuestionAskedOrNot] = json.results.bindings;
      console.log("TopFiveProducts Details", this.productDetails);
      for (let i = 0; i < this.productDetails[this.firstQuestionAskedOrNot].length; i++) {
        this.productDetails[this.firstQuestionAskedOrNot][i].animation = { value: "slideIn" };
      }
      this.priceRange.min = this.minVal();
      this.priceRange.max = this.maxVal();
    },
    minVal() {
      if (this.productDetails) {
        const prices = this.productDetails[this.firstQuestionAskedOrNot].map((product) =>
          parseFloat(product.price.value)
        );
        if(Math.min(...prices)>0){
          return Math.min(...prices) - 1;// Use Math.min to find the minimum value
        }
        else return Math.min(...prices);
      } else {
        return 0;
      }
    },
    maxVal() {
      if (this.productDetails) {
        const prices = this.productDetails[this.firstQuestionAskedOrNot].map((product) =>
          parseFloat(product.price.value)
        );
        // Use reduce to find the maximum value
        return (
          prices.reduce(
            (max, current) => (current > max ? current : max),
            prices[0]
          ) 
        );
      } else {
        return 0;
      }
    },
  },
});
