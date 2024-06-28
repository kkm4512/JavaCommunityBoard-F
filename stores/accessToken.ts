import { defineStore } from 'pinia'

export const useAccessTokenStore = defineStore("accessToken", {
	
  state: () => ({
    accessToken: "",
  }),
  actions: {
    updateAccessToken(accessToken: string) {
      this.accessToken = accessToken;
    },
  },
  persist: {
    storage: persistedState.localStorage
  },
});