import { defineStore } from 'pinia'

export const useValidateAccessTokenStore = defineStore("useValidateAccessToken", {
  state: () => ({
    validateAccessToken: false,
  }),
  actions: {
    updateValidateAccessToken(isValidate:boolean) {
      this.validateAccessToken = isValidate;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  }
});