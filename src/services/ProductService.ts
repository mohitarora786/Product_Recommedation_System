import { api } from "boot/axios";

export default {
  // getProducts(budsOrHeadphones: string) {
  //   // return api.post("auth/jwt/login", new URLSearchParams(credentials))
  //   this.fetchRecommendations(budsOrHeadphones);
  // },

  async fetchRecommendations(
    productType: string,
    connectivity: string,
    smallEars: string,
    device: string
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    return api.post(
      "/query",
      { productType, connectivity, smallEars, device },
      { headers }
    );
  },
};
